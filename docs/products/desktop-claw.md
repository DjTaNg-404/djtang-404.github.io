---
title: Desktop-Claw
description: 一个常驻桌面的 AI 小伙伴，从桌宠交互延伸到轻量可控的 Agent Runtime。
sidebar_position: 2
keywords:
  - Desktop-Claw
  - 桌宠
  - AI 产品
  - Agent Runtime
  - Agent Skills
---

小的时候的情绪需求，长大后用技术实现了。

曾几何时我也是重度沉浸在 Vtuber、Vup 和虚拟偶像之中，想着未来能不能做出来一个虚拟形象，我可以不停地去跟它聊天、对话，它也能够记得我的很多事情。

随着 LLM 的发展和 Agent 的爆火，再加上自己也在这个方向上走着，我就在想，即使做不出来太漂亮的皮套，退一步，我能不能先做一个智能 AI 桌宠呢？

现在看来，应该算是初步达成了。

![Desktop-Claw GitHub 页面](/img/products/desktop-claw/github.png)

完成这个桌宠，也是有一些契机吧。当时在做另一个项目，也就是阿城（ChatTutor）的时候，就用了桌宠的这个形式。恰逢那段时间 OpenClaw 爆火，还有一堆类似的 Claw 系列产品爆火，我就在想，能不能做一个产品，表现形式就是桌宠，而内核就是 OpenClaw？等到 AI Hackathon Tutor 结束后，我就开始了 Desktop-Claw 的开发。

## 初步想法

在一开始，我的想法确实就是给 OpenClaw 套个皮，但我又不想本地部署 OpenClaw，太大太占空间了。同时当时对于 Agent 框架，我也只了解并使用过几次 LangGraph 和 LangChain，做 AI 桌宠感觉不太适合。

而这个时候发生了一件事：HelloClaw 课程开源了。

没错，就是 Datawhale 的开源课程 HelloClaw 推出了，课程里面不仅教你如何领养龙虾，同时还教你如何构造龙虾。

当即决定，学习一下构造龙虾的过程，再加上 AI，直接来做一个 Agent 出来。

## Agent Runtime

在学习完 HelloClaw 的第 2 章和第 3 章后，我就在想，直接按照这个思路开发一个适合桌宠的 Claw 产品吧，开发出来给自己玩玩也很好。因此在学习和了解过后，就实现了一个 Agent Runtime。它的设计思路我已经整理成单独文档：[轻量但可控的 Agent Runtime](/docs/agent/runtime)。

在实现的过程中，我主要强调了以下三个特点：

- 轻量
- 可控
- 可持续

这些都和上一篇 Runtime 笔记里讲的内容是一致的。然后很顺理成章地，Desktop-Claw 的 v0.0.1 版本和 v0.0.2 版本就推出了。v0.0.2 版本做了一点安全上的修改，这也是让 Codex 进行 code review 后发现的，主要是防止外部 Web 可以调用 Desktop-Claw 的接口。

## Skills 如何实现

前面的 [Agent Skills](/docs/agent/skills) 也写过，我其实很想给桌宠加入 Skills，这样才能实现除了对话之外的更多功能。然后才发现，我们一直学的都是 Skills 的具体构建，而 LLM 如何使用 Skills 的代码，其实 Claude Code、GitHub Copilot、Codex 这些 IDE 已经内部写好了。如果我想要让 Desktop-Claw 跟它们一样使用 Agent Skills，就要自己重写这些代码。

一开始我用的是 Qoder，把推理能力开到最大，让它先理解什么是 Anthropic 提出的 Agent Skills，然后再根据我们代码写一套方案，让 Desktop-Claw 也能使用 Agent Skills。后面发现它一直理解不了，所以还是让 GitHub Copilot 回归到工作流里，后续也算是成功实现了，具体未来再单独复盘一遍。

## Claude Code 泄漏带来的影响

当时 Claude Code 泄漏后，市面上就有了很多关于代码的解读。

其实我自己的一个收获就是：Agent 框架并不是越复杂越好，要做到精简、规范、可复用。

这其实是对比我的 ChatTutor 项目而产生的感悟。实际上 ChatTutor 是用一个节点做意图分解，然后再根据不同工作去调用不同的 Agent 去完成事情，可以理解成 Sub-Agent。不过这里的 Sub-Agent 的内部又各不相同。

而了解了 Claude Code 之后我发现，其实它的 Sub-Agent 的 Agent Loop 和原本的是一样的，也就是说原本那个 Agent Loop 框架是可复用的，只不过内部具体执行的 Prompt 不同，从而成为 Sub-Agent。

所以给我最大的感受就是，要做到精简、规范、可复用。

未来对于 Desktop-Claw，我认为可以再把 Agent Loop 拎出来作为一个单独的 Loop 属性，在这个 Loop 属性里属于一个 SessionEngine 对象，其实就跟 Claude Code 的 QueryEngine 一样。这样分离出来我觉得会更加清晰。

## 如何表达情绪

这个确实受限于我们的表现形式。我们只是一个悬浮球，能做的动作不多，不能像一个真正的虚拟形象一样，有行为、有表情，因此这一部分就做得很简单。

悬浮球能做的很少，所以我们就设定了四种状态：

- idle
- busy
- done
- night

平时就在 idle，而 night 会暗一些。busy 的时候周围发着亮光，然后悬浮球会放大缩小，有一种呼吸感。在 done 状态下，呼吸会没那么急促。

## Memory System 如何设计

这个也是很需要认真设计的问题。一开始也只是简单通过几个文件设计，后来由于 Karpathy 提出的知识库管理方法 LLM Wiki 爆火，我就在想，这个能不能用在我们的 Memory System 上？它对知识库进行管理，本质上就是对文档进行管理。那我们的交互行为和交互历史本身不就是文档材料吗？那应该是可以迁移的。

现在就是按照这种形式来实现的。

让 AI 总结一下对应关系：

Karpathy 三层，对应到我们的四层：

| Karpathy LLM Wiki | Desktop-Claw 对应 | 说明 |
| --- | --- | --- |
| Raw | Raw Conversation Archive（`archives/YYYY-MM-DD.json`） | 原始对话流水按天落盘，保留完整底稿 |
| Wiki | Memory Layer（self、relationship、topic、saved、source 五类结构化对象） | 从 raw 中内化出的结构化记忆 |
| Index | Index Layer（`indexes/` 下的 5 个 JSON 索引） | 先看索引再下钻到具体对象 |

Karpathy 三循环，对应到我们的实现：

| Karpathy 循环 | Desktop-Claw 实现 |
| --- | --- |
| Ingest（后台摄入整理） | `InterpretService`，对话过程中异步提取记忆，加上 `sealDay()` 日终归档 |
| Query（检索回答） | Agent Loop 中的渐进式披露：先查 index，再下钻 memory，必要时回溯 raw |
| Lint（定期维护清洗） | `MaintainService`，日终跑合并、去重、冲突检测和过时清理 |

这部分刚做好，接下来就要自己先体验一下了。
