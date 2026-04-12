---
sidebar_position: 2
title: 流式输出：从 HTTP 到 SSE 再到 WebSocket
description: 从 HTTP、SSE 到 WebSocket，梳理 LLM 流式输出在前后端中的实现路径与取舍。
keywords:
    - HTTP
    - SSE
    - WebSocket
    - 流式输出
    - 前后端通信
---

# 流式输出：从 HTTP 到 SSE 再到 WebSocket

## 什么是流式输出

流式输出，即是指不等 LLM 全部生成完，就边生成边传输显示。

当我们问 LLM 问题：“子棠是个什么样的人？”

假设使用传统方法，即不流式的范式：LLM 花 5 秒生成完整回答，你盯着空白屏幕等 5 秒，然后突然一大段文字全部出现。

而用流式输出：LLM 生成“我”，立刻推到屏幕；生成“会”，推到屏幕；生成“以……”，继续推到屏幕。你几乎 0 延迟就能看到第一个字。

那么，这个过程是如何实现的呢？先看一个大纲图：

```text
┌──────────┐    SSE     ┌─────────────┐   WebSocket   ┌──────────┐
│ LLM 服务  │ ========> │ Backend 后端  │ ============> │ 前端 UI   │
│(DeepSeek) │  第一段流   │ (Node.js)   │   第二段流     │ (React)  │
└──────────┘            └─────────────┘               └──────────┘
```

接下来分别进行简单的解释。

## HTTP

HTTP 是互联网最基础的通信协议。可以把这个过程想象成寄信：

```text
客户端（浏览器）                    服务器
    │                               │
    │── 请求（Request）──────────→  │   "我要看首页"
    │                               │   （服务器处理……）
    │  ←─────────── 响应（Response）─│   "给你，这是首页 HTML"
    │                               │
    │        连接关闭，各回各家        │
```

也就是说，当客户端有需求的时候，写一封信给服务器。服务器收到需求后，回信给客户端。

这里的核心特征为：

- 一问一答：客户端发送一个请求，服务器回应一个响应，结束。
- 无状态：每次请求都是独立的，服务器不会记得上一次请求相关内容。
- 客户端主动：永远是客户端先开口，服务器不能主动找客户端。

但是这个状态下是存在局限的。假设我们的 LLM 使用普通的 HTTP 返回结果：

```text
客户端 → POST /chat  { "message": "子棠是个什么样的人" }
…
                ………等了 5 秒…………

      ← 200 OK  { "reply": "我会以最中立...子棠是一个..." }
```

那么这个过程，就需要先等 LLM 把整段话生成完，客户端才能收到响应。对于用户而言，这 5 秒的空白等待期间，体验会非常差。

## SSE：服务器单向持续推送

SSE 的全称是 Server-Sent Events，它是 HTTP 的一个“变体”。

本质上还是一个 HTTP 请求和响应，但响应不会结束，服务器持续往里写数据。

```text
客户端                              服务器
    │                               │
    │── GET /stream ──────────────→ │   "我要订阅事件"
    │                               │
    │  ←── data: 第一条消息 ─────── │   响应开始了，但不结束
    │  ←── data: 第二条消息 ─────── │   继续写……
    │  ←── data: 第三条消息 ─────── │   继续写……
    │  ←── data: [DONE] ────────── │   "我说完了"
    │                               │
    │        连接关闭                 │
```

可以用听广播来理解这个过程。当我们打开收音机，电台持续播报，我们只能听，但是不能对着收音机说话。

这里的核心特征有：

- 单向流：只有服务器往客户端推，客户端不能在这条流上回话。
- 本质是 HTTP：用的还是普通 HTTP 连接，不需要特殊协议支持。
- 文本格式：每条消息以 `data:` 开头，消息之间用空行分隔。

所以一般使用 curl 去调用 LLM API 的时候，只需要简单地将 `stream` 设置为 `true` 即可，因为本质上还是一个 HTTP。

```text
后端 → POST deepseek.com/v1/chat/completions  { stream: true }

    ← data: {"choices":[{"delta":{"content":"让"}}]}
    ← data: {"choices":[{"delta":{"content":"我"}}]}
    ← data: {"choices":[{"delta":{"content":"看看"}}]}
    ← data: [DONE]
```

所以后端每收到一个 `data:` 事件，就拿到一个字，再立刻转发给前端。

## WebSocket：双向持续通道

WebSocket 是一个完全不同的协议。它借助 HTTP 做一次握手，然后升级为一条独立的双向通道。

```text
客户端                              服务器
    │                               │
    │── HTTP GET /ws ─────────────→ │  "我想升级到 WebSocket"
    │  ←── 101 Switching Protocols  │  "同意，升级了"
    │                               │
    │   ═══════════════════════════  │  现在是 WebSocket 连接了
    │                               │
    │──→ "用户发了条消息"             │  客户端随时可以发
    │  ←── "AI 回了个字"              │  服务器也随时可以发
    │  ←── "AI 又回了个字"            │
    │──→ "用户取消了"                │  客户端又发了
    │  ←── "已取消"                  │
    │                               │
    │   连接一直开着，直到某一方关闭   │
```

我们可以用打电话类比。当我们拨通电话后，双方随时可以说话，不需要每次说话前重新拨号，可以相互进行交流。

WebSocket 的核心特征有：

- 双向：两端都能随时发消息，不需要等对方先说。
- 持久：连接一旦建立，就一直开着，而不像 HTTP 一问一答就断。
- 低开销：建立后不需要 HTTP 头部等冗余信息，每条消息都很轻量。

如果用 SSE，前端只能“听”，没法主动发消息，也没法取消任务。如果用普通 HTTP，每个 token 都要单独发一个请求，太浪费了。

为什么 LLM API 用 SSE 而不用 WebSocket？因为够用了。LLM 调用就是“我问一次，你持续回答”，不需要双向。SSE 基于 HTTP，更简单、兼容性更好、部署也更容易。

## WebSocket 握手：从 HTTP “升级”

WebSocket 连接的建立只有一步：借用 HTTP 做一次特殊握手，然后整条连接“变身”为 WebSocket 协议。

### 第一步：客户端发起升级请求

```text
GET /ws HTTP/1.1
Host: 127.0.0.1:3721
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
```

这看着还是个 HTTP 请求，但有几个特殊头部：

- `Connection: Upgrade` 和 `Upgrade: websocket` 告诉服务器：我不想继续用 HTTP 了，咱们换 WebSocket。
- `Sec-WebSocket-Key` 是一个随机值，用于防止缓存代理误处理。

### 第二步：服务器同意升级

```text
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

服务器返回 `101`，表示“同意升级”。`Sec-WebSocket-Accept` 是对客户端 Key 做哈希运算后的验证值，证明服务器确实理解 WebSocket 协议，而不是一个普通 HTTP 服务器随便返回的内容。

### 第三步：升级完成，HTTP 退场

从此刻开始，这条 TCP 连接上跑的不再是 HTTP，而是 WebSocket 的二进制帧协议。HTTP 的使命结束了，它只负责完成握手。

```text
                    握手阶段（HTTP）       ┃   数据传输阶段（WebSocket）
                                         ┃
客户端 ──GET /ws (Upgrade)──→ 服务器      ┃   客户端 ←──→ 服务器
      ←──101 Switching──                 ┃   （双向自由通信）
                                         ┃
       ↑ 只有这一次是 HTTP               ┃   ↑ 之后全是 WebSocket 帧
```

## HTTP vs WebSocket 对比

| 特性 | HTTP（传统方式） | WebSocket |
| --- | --- | --- |
| 建立连接 | 每次请求都有请求头开销 | 只握手一次，之后帧头极小 |
| 服务器推送 | 不行，必须客户端先问 | 随时可以推 |
| 取消请求 | 不方便，需要开新请求去取消 | 直接在同一连接上发 `task.cancel` |
| 多窗口同步 | 需要轮询或额外方案 | 每个窗口一条 WS 连接，广播一次全到 |
| 流式 token | 需要用 SSE 或轮询 | 直接在双向通道上逐个推 |
| 心跳保活 | 不支持，连接用完就断 | 内置 `ping/pong` 帧 |
