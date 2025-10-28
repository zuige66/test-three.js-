# 项目介绍

本项目是基于 Three.js 的 3D 场景演示项目，用于学习和实践 Three.js 相关的 3D 渲染技术。

## 环境要求

- Node.js（建议版本 14+）
- npm 或 yarn

## 复刻与使用步骤

### 1. 克隆项目

打开终端，执行以下命令克隆项目到本地：

```bash
git clone https://github.com/zuige66/test-three.js.git
cd test-three.js
```

### 2. 安装依赖

在项目根目录执行以下命令安装所需依赖：

```bash
npm install
# 或使用 yarn
yarn install
```

### 3. 启动开发服务器

执行以下命令启动本地开发服务器：

```bash
npm run dev
# 或使用 yarn
yarn dev
```

然后在浏览器中访问 `http://localhost:3000`（具体端口以终端输出为准）即可查看项目运行效果。

### 4. 构建生产版本

如果需要构建生产版本，执行以下命令：

```bash
npm run build
# 或使用 yarn
yarn build
```

构建完成后，生成的文件会存放在 `dist` 目录中，可将该目录下的文件部署到服务器上。