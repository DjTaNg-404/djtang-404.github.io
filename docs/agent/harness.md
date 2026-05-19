---
sidebar_position: 3
title: Coding Agent Harness：从 Patch、Replace 到 Hashline
description: 阅读 Can Bölük 的 Harness Problem 一文，整理 Coding Agent 编辑工具、Hashline 与 Benchmark 的启发。
keywords:
  - Coding Agent
  - Harness
  - Hashline
  - apply_patch
  - str_replace
---

# Coding Agent Harness：从 Patch、Replace 到 Hashline

这篇笔记整理自 Can Bölük 的文章《I Improved 15 LLMs at Coding in One Afternoon. Only the Harness Changed》，重点关注 Coding Agent 的编辑接口、Hashline 方案和 Harness 对模型表现的影响。

:::note 阅读信息

- 原文链接：[The Harness Problem](https://blog.can.ac/2026/02/12/the-harness-problem/)
- 作者：Can Bölük
- 阅读日期：2026.05.19
- 主题标签：Harness、Coding Agent

:::

## 核心问题

同一个模型，在不同 Harness 下的表现也会有所不同。

这里的 Harness 可以理解为模型和真实开发环境之间的“执行外壳”：它决定模型如何读取代码、搜索代码、表达修改意图，以及这些修改最终如何落到文件里。

也就是说，Coding Agent 的能力并不只取决于模型本身，还取决于外部工具接口是否足够稳定、清晰、可验证。

## 编辑工具

以编辑工具为例，Codex 使用 `apply_patch`，属于补丁式修改。它会给出类似于 `git diff` 的补丁文本：

```diff
*** Begin Patch
*** Update File: app.js
@@
- return "world";
+ return "hello";
*** End Patch
```

`diff` 指的是“代码改动说明”或“差异补丁”。它不是完整文件，而是一种描述“哪里删掉、哪里新增、哪里替换”的文本格式。

像上面的语句，就是需要将原文件中的：

```js
return "world";
```

替换成：

```js
return "hello";
```

而 Claude Code 以及其他工具大多使用 `str_replace`，也就是精确文本替换。不同工具在细节处理上可能有所不同，例如 Gemini 加了一些空白模糊搜索能力。刚才的例子如果用 `str_replace` 表达，工具调用形式可能类似于：

```json
{
  "file": "app.js",
  "old_string": "return \"world\";",
  "new_string": "return \"hello\";"
}
```

Cursor 则单独训练了一个神经网络，用来把草稿编辑正确合并进文件里。

所以只看“如何编辑文件”这个功能，目前也并不存在一个公认的最佳方案。

## Hashline

文章里提出了 Hashline。核心做法是：当模型读取文件或 grep 代码时，不只是返回代码行，而是带上 `行号 + 哈希值`。

例如：

```js
1:a3|function hello() {
2:f1|  return "world";
3:0e|}
```

这样在进行文本替换时，就可以带上行号和哈希值，精确找到替换位置。

例如：

- 替换第 `2:f1` 行
- 替换从 `1:a3` 到 `3:0e` 的范围
- 插入到 `3:0e` 之后

如果在某一次命令之后文本发生变化，导致 hash 值不再匹配，那么就说明上下文已经变了。此时 Harness 可以拒绝编辑，避免破坏文件。

也就是说，Hashline 并不是单纯依赖行号定位，而是在行号之外加了一个内容 hash，让模型拥有稳定、可验证的编辑锚点。

当文件在读取和编辑之间发生变化时，Harness 可以通过 hash 判断模型引用的行是否仍然是原来的内容。如果不是，就拒绝修改，避免因为行号漂移或内容变化而改错位置。

## Benchmark

作者设计了 benchmark，用来测试不同模型在三种编辑工具 Patch、Replace、Hashline 下的表现。

具体的 benchmark 构造方法是：

1. 从 React 代码库随机抽一个文件

   这样测试对象是真实项目代码，而不是玩具代码。

2. 人为制造一个可逆的 bug

   比如把操作符换掉、把布尔值翻转、制造 off-by-one 错误、删除 optional chaining、改掉标识符名字，或者删除 guard clause。

3. 把这个错误包装成自然语言任务

   不是直接告诉模型 diff，而是用普通英文描述问题，例如：

   > 某个 early return 被删除了，请恢复它。

4. 让不同模型使用不同编辑工具去修

   每个模型分别用 patch、replace、hashline 等方式编辑文件。

5. 比较最终文件是否恢复到原始正确版本

   Agent 停止后，把修复后的文件和原始文件对比，判断成功率。

最后的测试结果覆盖了 16 个模型和 3 种编辑工具，结论非常明确：对几乎所有模型来说，patch 都是表现最差的格式；hashline 对多数模型能追平或超过 replace；越弱的模型从 hashline 中获得的收益越大。具体数值可以查看原文。

## 我的理解

这篇文章最有启发的地方在于：有些时候并不是模型不能理解任务，而是解决任务的手段和工具接口不够稳定，导致模型无法可靠地把意图落到文件里。

换句话说，Coding Agent 的失败不一定只是“模型不够聪明”，也可能是 Harness 让模型很难准确表达和执行修改。

这也解释了为什么同一个模型在不同 Coding Agent 产品里的体感会差很多。模型能力是底座，但编辑接口、上下文呈现方式、文件定位方式、冲突检测机制，都会影响最终表现。

所以除了继续关注模型能力进步，探索 Harness 工程也很重要。让模型更好地表达意图、使用工具、完成修改，本身就是一个高杠杆方向。

作者并不是在说 Hashline 一定是终极方案，而是在证明：Harness 是一个真实、可测量、并且会显著影响 Coding Agent 表现的变量。
