# Ethan — 个人主页 Demo

一个可以直接部署到 GitHub Pages 的单文件个人主页。采用米白、墨绿与青柠绿配色，兼顾桌面与手机显示。

## 内容与交互

- 个人主页首屏、项目展示、关于与 GitHub 联系入口。
- 原生 Canvas 点阵环，随指针轻微转动。
- 信号实验室：调整正弦波振幅和频率，并恢复初始参数。
- 轨道练习：调节几何动画速度、暂停与继续。
- 灵感备忘录：三条可替换的示例笔记。
- 手机导航、键盘操作、原生对话框和减少动态效果支持。

项目和个人介绍均为明确标注的演示内容，不代表已发表研究或真实履历。联系方式仅链接到已提供的 GitHub 账号，没有预设邮箱。

## 本地查看

下载 `index.html`，直接用现代浏览器打开即可。页面不依赖外部脚本、字体或图片，也不需要安装包或运行构建命令。

## 修改内容

所有 HTML、CSS、JavaScript 与 SVG 图形都在 `index.html` 中：

- 搜索 `EDIT:`，找到配色、首页文案和项目内容的位置。
- `:root` 中的 `--bg`、`--ink`、`--accent` 控制主要颜色。
- 修改 `hero-title`、`hero-description` 和 `about-section` 里的个人介绍。
- 替换三个 `project-card` 的标题、简介与交互内容。
- 修改 `https://github.com/EthanW-17` 可更换 GitHub 联系入口。

## GitHub Pages

仓库： https://github.com/EthanW-17/EthanW-17.github.io

在仓库 Settings → Pages 中，将 Source 设置为 **Deploy from a branch**，选择 **main** 分支、**/(root)** 目录并保存。部署成功后，个人站点地址为：

https://ethanw-17.github.io/

`.nojekyll` 用于让 GitHub Pages 直接发布静态文件。

## 文件说明

- `index.html`：完整网站。
- `.nojekyll`：静态发布标记。
- `README.md`：本说明。

网站没有服务器端服务，不收集报名数据，也没有账号系统。浏览器中显示的波形属于交互示意，坐标为归一化坐标，不是测量数据；轨道为几何动画，不是天体物理仿真。
