import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'wp-mortgage-calculator/web-component',
    emptyOutDir: true,
    sourcemap: true,

    rolldownOptions: {
      input: 'vite.build.collector.js',

      output: {
        entryFileNames: 'web-component.js',
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'dist/mortgage-calculator/browser/styles.css',
          dest: 'assets',
          rename: { stripBase: 3 },
        },
      ],
    }),
  ],
});
