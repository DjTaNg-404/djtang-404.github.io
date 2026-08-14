---
name: "DjTang (子棠)"
description: "一棵以现代纸墨承载产品实验、技术沉淀与个人随笔的知识树。"
colors:
  paper: "#f3f0e8"
  paper-raised: "#faf8f2"
  paper-deep: "#ebe7dc"
  ink: "#1f2a28"
  ink-soft: "#46514e"
  ink-faint: "#59635f"
  line: "#d3cfc3"
  line-strong: "#aca99f"
  indigo: "#285d59"
  indigo-soft: "rgba(40, 93, 89, 0.2)"
typography:
  display:
    fontFamily: "Noto Serif SC Variable, Noto Serif SC, Source Han Serif SC, Songti SC, Georgia, serif"
    fontSize: "clamp(2.6rem, 7vw, 5.4rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Noto Serif SC Variable, Noto Serif SC, Source Han Serif SC, Songti SC, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Noto Serif SC Variable, Noto Serif SC, Source Han Serif SC, Songti SC, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.6vw, 1.65rem)"
    fontWeight: 650
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Noto Sans SC Variable, Noto Sans SC, Source Han Sans SC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.86
    letterSpacing: "normal"
  label:
    fontFamily: "Noto Sans SC Variable, Noto Sans SC, Source Han Sans SC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 650
    lineHeight: 1.6
    letterSpacing: "0.06em"
rounded:
  inline-code: "0.28rem"
  compact: "0.3rem"
  menu: "0.35rem"
  control: "0.45rem"
  code-block: "0.5rem"
  navbar: "0.75rem"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.paper-raised}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.375rem 1.5rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-raised}"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.375rem 1.5rem"
    height: "2.75rem"
  navbar:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.navbar}"
    padding: "0.1rem 0.5rem"
    width: "min(68rem, calc(100% - 1.6rem))"
  social-control:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.circle}"
    size: "2.75rem"
  social-control-hover:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.indigo}"
    rounded: "{rounded.circle}"
    size: "2.75rem"
  tree-leaf:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "0.15rem 0 1.05rem"
  mechanism-node:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.compact}"
    padding: "0.6rem 0.8rem"
    height: "2.75rem"
  year-ring:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.indigo}"
    rounded: "{rounded.circle}"
    size: "2.6rem"
  reading-surface:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
    width: "72ch"
  pagination-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "0"
    height: "4.5rem"
---

# Design System: DjTang (子棠)

## Overview

**Creative North Star: "一棵安静生长的个人知识树"**

这是一个 modern paper-and-ink knowledge tree：用纸灰承载内容，以近墨色建立阅读秩序，仅让青黛标记正在生长、被选中或值得继续深入的位置。气质安静、现代、编辑感、克制且个人化；首页负责表达生长，产品、文档与随笔内页则退后成为稳定的阅读载体。

视觉识别来自线、留白、排版和有限的树形语法，而非装饰性容器。spine / branch 组织路径，node 标记阶段，leaf label 承载内容；年轮只属于 Blog archive，roots 只属于首页与 footer。任何扩展都应先判断它是否帮助读者理解结构，再决定是否使用这些形态。

**Key Characteristics:**

- 纸灰与近墨色构成低噪声、长时间可读的编辑表面。
- 单一青黛只表示 active / growth，稀少性本身就是语义。
- spine、branch、node、leaf label 构成可复用的知识树语法。
- 页面默认 flat / open，以细线、间距和字阶代替卡片堆叠。
- 首页允许一次性的生长表达，内页保持静止和内容优先。

## Colors

配色是一套温和纸面、冷静墨色与单一青黛的窄调色板；所有结构线都低于文字层级，青黛永远承担信息状态而不是装饰填充。

### Primary

- **生长青黛** (`indigo`): 用于 active navigation、重点项目、链接、焦点环、spine 的生长起点和关键 node；不要把它扩散成大面积品牌背景。
- **青黛晕圈** (`indigo-soft`): 仅用于重点 node 的窄环、选区或代码高亮等低强度反馈，不能成为玻璃、渐变或氛围光。

### Neutral

- **主纸面** (`paper`): 首页、阅读页和开放式内容区域的默认底色。
- **抬升纸面** (`paper-raised`): 不透明 navbar、按钮和机制节点的轻微明度区分，不表示独立卡片层级。
- **深纸面** (`paper-deep`): footer、表头与滚动槽等结构性底层。
- **主墨** (`ink`): 标题、强调正文与最高信息层级。
- **柔墨** (`ink-soft`): 正文、导航默认态和大部分辅助说明。
- **淡墨** (`ink-faint`): 元信息和低优先级标签；在主纸面与抬升纸面上均保持至少 4.5:1 对比度。
- **细线** (`line`): 阅读分隔、侧栏、表格与 leaf 下边界。
- **强线** (`line-strong`): spine、branch、控件边界和年轮次级圆环。

### Named Rules

**The Single Indigo Rule.** 青黛只表示 active、growth 或明确可交互状态；同一屏幕不再引入第二种强调色。

**The Honest Paper Rule.** 纸面只通过真实的纯色层级表达，不添加假纸纹、grain、墨点、毛笔 SVG 或仿古印章。

## Typography

**Display Font:** Noto Serif SC Variable（回退至 Noto Serif SC、Source Han Serif SC、Songti SC、Georgia、serif）
**Body Font:** Noto Sans SC Variable（回退至 Noto Sans SC、Source Han Sans SC、PingFang SC、系统无衬线）

字体由 Fontsource 5.3.0 自托管。可变宋体提供编辑感、人物感与章节重量，可变黑体负责长文和界面信息；两者共同保持中文优先的清晰度，而不是借英文字体制造风格。

### Hierarchy

- **Display** (650，流体字阶，约 1.04 行高，紧字距): 首页姓名、产品总览与随笔归档的页面级标题。
- **Headline** (650，流体字阶，1.08 行高): 产品名称及其他高权重内容标题。
- **Title** (650，流体字阶): homepage leaf、文章列表与分页标题。
- **Body** (400，1rem，1.86 行高): 文档和博客正文；阅读表面最大行长为 72ch。
- **Label** (650，约 0.8rem，0.06em 字距): 年份、项目顺序、机制节点与辅助动作。

### Named Rules

**The Serif Leads Rule.** 宋体只负责标题、论点和导航品牌名；正文、标签与控件始终由黑体保持扫描效率。

## Layout

整体采用居中窄幅编辑布局：navbar 上限为 68rem，产品总览为 66rem，首页知识树为 58rem，正文阅读列为 72ch。垂直节奏以 0.5rem、0.75rem、1rem、1.5rem、2rem 与 3rem 为主要步进，页面段落使用 `clamp()` 在桌面与移动端之间自然收放。

首页桌面端以中轴 spine 和左右交替 branch 展开，700px 以下转为左侧单轴、所有 leaf 向右展开；产品页在 760px 以下把横向机制链变为纵向链；Blog archive 的年份列在 700px 以下转成水平分隔。全局 navbar 在 996px 以下切换为不透明的侧栏导航，阅读列在该断点释放为 100% 宽度。表格在 600px 以下允许横向滚动。

所有交互控件以 2.75rem（44px）为最低目标尺寸；移动侧栏链接使用 3rem 高度。开放式排版优先于卡片容器，结构由单像素线、留白和对齐建立。

## Elevation & Depth

系统默认 flat / open，不使用卡片阴影，也明确移除代码块阴影。深度主要来自三种纸面明度、细线和前后留白。唯一常规抬升是完全不透明的 navbar，它以 hairline 边界和轻微向下的柔和阴影与内容分离；重点 node 的同心环是状态强调，不是 elevation。

### Shadow Vocabulary

- **Navbar soft offset** (`0 0.45rem 1.4rem rgba(31, 42, 40, 0.07)`): 只用于不透明 navbar 的轻微悬置。
- **Active node ring** (`0 0 0 0.28rem var(--paper), 0 0 0 0.34rem var(--indigo-soft)`): 只用于首页或产品树中被确认的主节点。

### Named Rules

**The Flat-by-Default Rule.** 普通内容、阅读表面、leaf、机制链和分页都保持平面；除 navbar 与 active node ring 外不增加阴影。

## Shapes

形态以一像素直线、开放边界和小半径控件为主。0.28–0.5rem 的轻圆角只服务内联代码、菜单、按钮、机制节点与代码块；navbar 使用 0.75rem 作为系统中最大的常规容器圆角。圆形保留给头像、social control、tree node 和 Blog 年轮，不能扩张为 generic icon tiles。

树形语法必须保持语义边界：spine / branch 表示路径，node 表示阶段，leaf label 表示内容；年轮只用于 Blog archive，roots 只用于 homepage / footer。

### Named Rules

**The Tree Grammar Rule.** 不把年轮、roots 或树节点当作可随意复制的装饰 motif；每一种形态只出现在它已定义的语义位置。

## Components

组件整体 refined and restrained：状态通过青黛、单像素边界和字重变化表达，线、留白、排版优先于容器。

### Buttons

- **Shape:** 紧凑轻圆角（0.45rem），最低高度 2.75rem。
- **Primary:** 青黛实底、抬升纸面文字，650 字重；hover 转为主墨实底。
- **Secondary:** 抬升纸面、强线边界与主墨文字；hover 只把边界和文字切为青黛。
- **Focus:** 所有按钮继承 2px 青黛 focus ring 和 3px outline offset。

### Navigation

- **Navbar:** 居中、不透明抬升纸面，0.75rem 圆角，hairline 边界与唯一的 ambient shadow。链接默认柔墨，hover / active 为青黛；active 项底部增加一条 1px 青黛短线。
- **Mobile:** 996px 以下进入不透明侧栏；不使用 backdrop blur，菜单项至少 3rem 高。
- **Docs navigation:** 默认透明且开放，嵌套层级用 1px 细线；active 项不铺色，只以青黛和较高字重表示。

### Social Icon Control

2.75rem 圆形、1px 强线边界，默认柔墨；hover 转为抬升纸面、青黛边界与青黛图标。小红书与 ModelScope 使用项目内已经确认的官方 SVG path，必须原样保留，不纳入可重绘的通用 icon system。

### Homepage Tree / Leaf

首页 spine 是 1px 纵向线，branch 左右交替连接圆形 node；leaf 本身开放、无卡片底和无阴影，只以底部细线结束。hover 将细线和动作文字转为青黛；首要产品可以使用青黛 node ring、标题和“第一项目”标签。spine 只在首页首次载入时以 `cubic-bezier(0.16, 1, 0.3, 1)` 生长一次，内容从第一帧起可见；reduced-motion 下关闭动画。

### Product Mechanism

机制使用可横向滚动的节点链：每个节点是抬升纸面、1px 强线、小圆角和 44px 最低高度，节点之间以细线箭头连接。移动端转为纵向链。首要产品只允许第一个机制节点使用青黛边界和文字。

### Blog Year Ring

年份标记由三层同心圆与一条细线组成，外环和中心点使用青黛，中环使用强线；年份以淡墨小号宋体标在其下。年轮只出现在 Blog archive，不迁移到文档、产品或通用导航。

### Reading Surface

文档和博客文章使用透明开放表面、72ch 最大行长与 1.86 正文行高。二级标题前保留 3rem 空间，三级标题前保留 2.2rem；引用只用 1px 青黛左线，代码块无阴影，表格通过纸面层级和细线区分。

### Pagination

分页链接保持透明、无圆角、无侧边框，仅用顶部 1px 细线和至少 4.5rem 高度划分阅读流。hover 只把顶线切为青黛；分页标题使用宋体主墨。

## Do's and Don'ts

### Do:

- **Do** 让青黛只标记 active、growth、focus 或明确的下一步。
- **Do** 用 1px 线、开放留白和宋黑体层级组织页面，而不是先添加容器。
- **Do** 保持 44px 最低交互目标、2px 青黛 focus ring 与 72ch 阅读列。
- **Do** 在两种纸面上使用淡墨时维持至少 4.5:1 对比度。
- **Do** 保留小红书与 ModelScope 官方 SVG path 的原始几何。

### Don't:

- **Don't** 制作 generic SaaS dashboard、card wall、generic icon tiles 或截图堆砌。
- **Don't** 使用玻璃模糊、渐变字、假纸纹、grain、墨点、doodle、毛笔 SVG 或仿古印章。
- **Don't** 把青黛当作普遍装饰，或为同一层级再增加第二种强调色。
- **Don't** 在 navbar 与 active node ring 之外增加 elevation 或阴影。
- **Don't** 在 Blog archive 之外使用年轮，或在 homepage / footer 之外使用 roots。
