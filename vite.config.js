import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        seleb: resolve(__dirname, 'seleb.html'),
        selebNews: resolve(__dirname, 'seleb-news.html'),
        film: resolve(__dirname, 'film.html'),
        musik: resolve(__dirname, 'musik.html'),
        pop: resolve(__dirname, 'pop.html'),
        kpop: resolve(__dirname, 'kpop.html'),
        jpop: resolve(__dirname, 'jpop.html'),
        tpop: resolve(__dirname, 'tpop.html'),
        cpop: resolve(__dirname, 'cpop.html'),
        watch: resolve(__dirname, 'watch.html'),
        watchDetail: resolve(__dirname, 'watch-detail.html'),
        detail: resolve(__dirname, 'detail.html'),
        beauty: resolve(__dirname, 'beauty.html'),
        fashion: resolve(__dirname, 'fashion.html'),
        food: resolve(__dirname, 'food.html'),
        travel: resolve(__dirname, 'travel.html'),
        viral: resolve(__dirname, 'viral.html'),
        pedia: resolve(__dirname, 'pedia.html'),
        snap: resolve(__dirname, 'snap.html'),
        insertVideo: resolve(__dirname, 'insert-video.html'),
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
