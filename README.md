# 个人博客（Docusaurus）

这个项目用于维护个人开发者站点，包含三块内容：

- 产品发布：`/products`
- 文档：`/docs`
- 随笔：`/blog`

## 本地运行

```bash
npm install
npm start
```

默认访问地址：`http://localhost:3000`

## 生产构建

```bash
npm run build
npm run serve
```

## GitHub Pages 部署

项目已包含 GitHub Actions 工作流：

- 文件：`.github/workflows/deploy.yml`
- 触发：推送到 `main` 或 `master`

首次使用时请在仓库设置中开启：

- `Settings -> Pages -> Build and deployment -> Source: GitHub Actions`

## 首页枝叶

首页的产品、文档、随笔枝叶由 `plugins/homepage-leaves` 在构建时自动生成：

- 产品：读取 `docs/products/` 中 `homepage_featured: true` 的文档，按 `homepage_rank` 排序。
- 文档：读取非产品文档，按 frontmatter 中的 `date` 从新到旧展示。
- 随笔：读取 blog 文章，按文章日期从新到旧展示。

推荐给文档补充这些 frontmatter 字段：

```md
date: 2026-05-25
homepage_description: 显示在首页枝叶上的一句话。
```

产品文档如需固定展示在首页，额外添加：

```md
homepage_featured: true
homepage_rank: 1
```
