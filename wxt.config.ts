import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],

  manifest: {
    name: 'Todo List',
    description: 'A simple, fast todo list that lives in your browser.',
    permissions: ['storage'],
  },

  autoIcons: {
    baseIconPath: resolve('assets/icon.svg'),
  },

  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
