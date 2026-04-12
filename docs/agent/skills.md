---
sidebar_position: 1
title: Agent Skills
description: 从 Function Calling 过渡到 Agent Skills，理解渐进式披露与按需激活的能力组织方式。
keywords:
    - Agent Skills
    - Function Calling
    - 工具调用
    - 渐进式披露
---

# Agent Skills

最近在开发 Desktop-Claw 这个轻量化桌面 AI 宠物时，我想给桌宠引入一些简单的文件控制能力，比如 read/write/edit，所以也需要用到 Skills。一开始我还是用了 Function Calling 技术，但想了想，还是试试 Agent Skills 吧。以前了解 Agent Skills 时，我只知道它的基础概念，也知道它是 Anthropic 提出、并被 Claude Code、VS Code、Cursor、OpenAI Codex 等多款 AI 编码工具支持或采用的开放标准。但我其实还没有完整地自己开发并使用过 Skills，因为之前还没有真正需要它的场景。现在做个人开发的兴趣逐渐起来了，也该开始接触一下了。

那么先从 Function Calling 简单说起。

## Function Calling

Function Calling 技术，实际上是补齐了大模型无法直接调用工具这一短板。现代大模型，例如 GPT-4、DeepSeek 等，原生支持 Function Calling。

LLM 的工具调用也不是魔法，本质上是：把工具的名称、描述、参数 Schema 拼入 System Prompt，让模型在输出时以结构化 JSON 的形式表示“我要调用某个工具，参数是什么”，然后由外部代码实际执行工具，再把结果以 ToolMessage 的形式返回给模型。

也就是说，模型会通过工具描述来理解工具用途，并通过参数 Schema 按格式填写参数。

所以流程可以看作如下步骤：

```text
[开发者] 把工具描述注册给模型
    ↓
[模型] 输出 tool_call JSON：{"name": "search", "args": {"query": "..."}}
    ↓
[外部代码] 实际执行工具，拿到结果
    ↓
[外部代码] 把结果作为 ToolMessage 返回给模型
    ↓
[模型] 基于工具结果生成最终回答
```

那么，Function Calling 有什么缺点呢？

Function Calling 既然要把工具描述和参数都发给大模型，那么这个过程就会占用一部分上下文长度。当需要调用的工具越多，Function Calling 占用的上下文空间就越大，留给 Memory 和 User Prompt 的空间也会越来越少，因此 Agent 的能力会受到一定程度的削减；同时还有工具选择与参数填充稳定性，以及权限与安全边界等问题。

## Agent Skills

前面已经简单介绍了什么是 Agent Skills。总的来说，Agent Skills 是一种通过标准化文件结构，把可复用的智能体能力打包成文件夹的方式，通常包含说明文档、元数据、脚本和资源文件，让不同 AI 编码工具能按相似约定发现、加载和执行这些能力。

从体验上讲，Skills 起到的是一种渐进式披露的作用。在 Function Calling 场景下，我们通常需要先把完整的工具参数提供给模型，这会消耗不少上下文空间。能不能让 Agent 更智能一点，先看少量的工具描述，等确定要用哪一个工具，再去读取相关的详细指导文档？这样既能节省单次对话的上下文长度，也避免在未调用时让多余的工具参数占用 token。总结来说，Agent Skills 通过渐进式披露实现按需加载，在节省 token 的同时，也能更好地指导 Agent 完成特定工作，而且具备可复用性。

核心来说，Agent Skills 包含三个层级：

```text
┌──────────────────────────────────────────────────────┐
│ 第 1 级：Discovery（发现）— 启动时加载                 │
│   只加载每个 skill 的 name + description              │
│   约 ~100 tokens/skill                               │
│   目的：让 Agent 知道“有哪些能力可用”                  │
│                                                      │
│ 第 2 级：Activation（激活）— 按需加载                  │
│   当任务匹配某 skill 的 description 时                 │
│   Agent 读取该 skill 的完整 SKILL.md 正文              │
│   约 < 5000 tokens                                   │
│   目的：获取详细的操作指南                            │
│                                                      │
│ 第 3 级：Execution（执行）— 深度按需                   │
│   SKILL.md 中引用的 scripts/、references/ 等文件      │
│   仅在需要时才加载                                    │
│   目的：避免一次性灌入大量参考资料                    │
└──────────────────────────────────────────────────────┘
```

Agent 在会话开始时，先读取技能目录中的轻量信息，核心是每个 Skill 的名称和描述。目标是先知道“有哪些能力可用”，而不是立刻读取所有细节。当用户提出任务后，Agent 会把任务意图与各个 Skill 的描述进行匹配。如果某个 Skill 的描述和当前任务高度相关，才会进入下一步激活。

匹配成功后，Agent 才加载对应 Skill 的完整说明内容。这一步通常会读取该 Skill 的主文档，用于获得具体执行规则、步骤和约束。Agent 按 Skill 指导去调用工具、读取额外参考资料、执行脚本。这类附加资源一般也是按需读取，不会一次性全部加载，从而减少上下文占用。

执行完成后，Agent 汇总结果返回给用户；必要时再做补充调用或二次修正。整个过程中，只有被选中的 Skill 会被深度加载，未命中的 Skill 只停留在发现层。Agent Skills 的核心不是“把所有能力预加载”，而是“先发现、再匹配、后激活、按需执行”，用分层加载来兼顾上下文效率与任务质量。

虽然不同平台在实现细节上可能会有差异，但在做 AI Coding 时，可以先让 AI 充分理解 Agent Skills 的相关概念和设计，再让它按这套思路实现对应代码。这样一来，在自建产品中也可以更顺畅地落地 Agent Skills。
