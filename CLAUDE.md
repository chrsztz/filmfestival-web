# CLAUDE.md — 合心众响电影节网站

## 项目概述

第十二届校园电影节"合心众响"（Resonance）官方网站。设计质量是最高优先级，以电影节级别的视觉品质为标准。支持中英双语切换。

## 关键日期

- 投稿截止：`2026-03-25T23:59:59+08:00`（已过）
- 颁奖典礼：`2026-04-15T18:00:00+08:00`

## 技术栈

- **Vite 8 + React 19 + TypeScript**（strict 模式）
- **Tailwind CSS v4**：使用 `@tailwindcss/vite` 插件，所有设计变量在 `src/index.css` 的 `@theme {}` 块中定义
- **React Router v7**：`createBrowserRouter`，路由定义在 `src/router.tsx`
- **Framer Motion v12**：所有动画通过 Framer Motion 实现，Canvas 粒子除外
- **Lucide React**：图标库
- **i18n**：自建 Context 系统（`src/i18n.tsx`），`useI18n()` 获取 `locale` 和 `toggleLocale`

## 设计系统（不得随意修改）

配色从 Logo（`public/logo.png`）提取：

- 背景色系：`festival-deep` / `festival-dark` / `festival-navy` / `festival-slate`
- 主色（铜橙）：`copper-300` 至 `copper-700`，Logo 主线条色
- 辅色（橄榄绿）：`sage-300` 至 `sage-700`，Logo 交织线条色
- 暖光：`glow` / `glow-light`，Logo 中心光晕
- 文字：`text-primary` 暖白 / `text-secondary` 青灰 / `text-muted`

毛玻璃卡片：`bg-festival-navy/60 backdrop-blur-md border border-copper-500/20 rounded-xl`
铜色渐变文字：`bg-gradient-to-r from-copper-400 to-glow bg-clip-text text-transparent`
字体：中文标题 `font-serif`（Noto Serif SC），UI/正文 `font-sans`（Inter）

## 文件结构

- `src/pages/` — 页面组件
- `src/components/ui/` — 可复用 UI 组件
- `src/components/effects/` — 特效/动画组件（AnimatedLogo, ParticleField, WaveAnimation, ParallaxSection）
- `src/components/layout/` — 布局组件（RootLayout, Navbar, Footer）
- `src/data/*.json` — 静态数据，类型定义在 `src/types/index.ts`
- `src/i18n.tsx` — i18n Provider 和 hook
- `public/movies/` — 参赛作品封面图
- `public/` — 嘉宾头像等静态资源

## i18n 规范

- 所有面向用户的文字必须支持中英文
- 使用 `const { locale } = useI18n()`，通过 `locale === 'zh' ? '中文' : 'English'` 切换
- JSON 数据中英文字段命名：`title` / `titleEn`、`bio` / `bioEn` 等

## 动画规范

- 入场动画：`opacity: 0→1, y: 8→0`，duration ~0.22s（RootLayout 页面过渡已简化）
- 滚动触发：`whileInView` + `viewport={{ once: true }}`
- Logo SVG：心形波浪线条用程序化生成（`buildHeartWaveSegments`），`stroke-dasharray/dashoffset` 路径绘制
- Canvas 粒子：含黑洞吸引系统，移动端 ~50 粒子，桌面端 ~120 粒子
- Framer Motion `ease` 属性需加 `as const`

## 常用命令

```bash
npm run dev      # 开发服务器
npm run build    # 生产构建（tsc -b + vite build）
npx tsc -b       # 仅类型检查
```

## 部署

Nginx 静态部署，`root` 指向 `dist/`，需要 `try_files $uri $uri/ /index.html`。
域名通过 Cloudflare 代理，SSL 模式 Full。
