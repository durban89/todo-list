# Todo List

一个简洁、快速的浏览器待办清单扩展。基于 **WXT + React + TypeScript + Tailwind CSS v4** 构建。

## 功能

- 添加 / 删除 / 编辑（双击）待办事项
- 标记完成 / 取消完成
- 过滤视图：全部 / 进行中 / 已完成
- 一键清除已完成事项
- 基于 `browser.storage` 持久化，关闭浏览器后数据不丢失
- 扩展图标实时显示未完成数量角标
- 图标按多尺寸自动生成（`@wxt-dev/auto-icons`）

## 技术栈

| 技术 | 说明 |
| --- | --- |
| [WXT](https://wxt.dev) | 下一代 Web 扩展框架 |
| [React 19](https://react.dev) | UI 库 |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 |
| [Tailwind CSS v4](https://tailwindcss.com) | 原子化 CSS（通过 `@tailwindcss/vite` 插件） |
| [@wxt-dev/storage](https://wxt.dev/storage.html) | 类型安全的存储 API |
| [@wxt-dev/auto-icons](https://wxt.dev/auto-icons.html) | 自动生成多尺寸图标 |

## 目录结构

```
.
├─ assets/
│  ├─ icon.svg          # 图标源文件，构建时自动生成各尺寸
│  └─ tailwind.css      # Tailwind 入口
├─ components/          # 可复用 UI 组件
│  ├─ TodoFilters.tsx
│  ├─ TodoInput.tsx
│  └─ TodoItem.tsx
├─ entrypoints/
│  ├─ background.ts     # 后台脚本（更新图标角标）
│  └─ popup/
│     ├─ index.html
│     ├─ main.tsx
│     └─ App.tsx
├─ hooks/
│  └─ useTodos.ts       # 待办状态管理与持久化
├─ utils/
│  └─ todos.ts          # 类型定义与存储
├─ wxt.config.ts
└─ tsconfig.json
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发模式（自动打开浏览器并加载扩展）
npm run dev

# 生产构建
npm run build
```

构建产物位于 `.output/chrome-mv3`。

### 手动加载扩展

1. 打开 `chrome://extensions`
2. 开启右上角「开发者模式」
3. 点击「加载已解压的扩展程序」，选择 `.output/chrome-mv3` 目录

## 可用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | Chrome 开发模式 |
| `npm run dev:firefox` | Firefox 开发模式 |
| `npm run build` | 构建 Chrome 版本 |
| `npm run build:firefox` | 构建 Firefox 版本 |
| `npm run zip` | 打包 Chrome 版本用于发布 |
| `npm run compile` | TypeScript 类型检查 |

## License

This project is licensed under the GNU Affero General Public License v3.0 only (AGPL-3.0-only). See [LICENSE](LICENSE) for details.
