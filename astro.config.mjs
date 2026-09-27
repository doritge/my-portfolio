// @ts-check
import { defineConfig } from 'astro/config';
import rehypeFigureCaption from './src/lib/rehype-figure-caption.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeFigureCaption],
  },
});
