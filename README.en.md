# Todo List

A simple, fast browser extension for managing your to-do list. Built with **WXT + React + TypeScript + Tailwind CSS v4**.

## Features

- Add, delete, and edit to-do items (double-click to edit)
- Mark items as complete or active
- Filter items by status: all, active, or completed
- Clear all completed items with one click
- Persist data with `browser.storage`, so your to-dos remain available after closing the browser
- Show the number of active items on the extension icon in real time
- Automatically generate icons in multiple sizes with `@wxt-dev/auto-icons`

## Tech Stack

| Technology | Description |
| --- | --- |
| [WXT](https://wxt.dev) | Next-generation web extension framework |
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type-safe JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS, integrated through the `@tailwindcss/vite` plugin |
| [@wxt-dev/storage](https://wxt.dev/storage.html) | Type-safe storage API |
| [@wxt-dev/auto-icons](https://wxt.dev/auto-icons.html) | Automatic multi-size icon generation |

## Project Structure

```
.
├─ assets/
│  ├─ icon.svg          # Source icon; resized variants are generated during the build
│  └─ tailwind.css      # Tailwind CSS entry point
├─ components/          # Reusable UI components
│  ├─ TodoFilters.tsx
│  ├─ TodoInput.tsx
│  └─ TodoItem.tsx
├─ entrypoints/
│  ├─ background.ts     # Background script (updates the icon badge)
│  └─ popup/
│     ├─ index.html
│     ├─ main.tsx
│     └─ App.tsx
├─ hooks/
│  └─ useTodos.ts       # To-do state management and persistence
├─ utils/
│  └─ todos.ts          # Types and storage utilities
├─ wxt.config.ts
└─ tsconfig.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server and load the extension in a browser
npm run dev

# Create a production build
npm run build
```

Build output is generated in `.output/chrome-mv3`.

### Load the Extension Manually

1. Open `chrome://extensions`.
2. Enable **Developer mode** in the top-right corner.
3. Click **Load unpacked** and select the `.output/chrome-mv3` directory.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Chrome development mode |
| `npm run dev:firefox` | Start the Firefox development mode |
| `npm run build` | Build the Chrome extension |
| `npm run build:firefox` | Build the Firefox extension |
| `npm run zip` | Package the Chrome extension for distribution |
| `npm run compile` | Run the TypeScript type check |

## License

This project is licensed under the GNU Affero General Public License v3.0 only (AGPL-3.0-only). See [LICENSE](LICENSE) for details.
