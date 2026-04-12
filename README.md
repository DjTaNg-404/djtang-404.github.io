# 个人博客（Docusaurus）

这个项目用于维护个人开发者站点，包含三块内容：

- 产品发布：`/products`
- 技术文档：`/docs`
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
