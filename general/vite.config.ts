import federation from '@originjs/vite-plugin-federation';
import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    typescriptPaths({
      preserveExtensions: true,
    }),
    typescript({
      sourceMap: false,
      declaration: true,
      outDir: 'dist/types',
    }),
    react(),
    federation({
      name: 'general',
      filename: 'remoteEntry.js',
      exposes: {
        './Title': './src/components/Title',
      },
      shared: ['react', 'react-dom'],
    }),

    {
      name: 'vite-plugin-notify-host-on-rebuild',
      apply(config, { command }) {
        return Boolean(command === 'build' && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch('http://localhost:8080/__fullReload');
          } catch (e) {
            console.log(e);
          }
        }
      },
    },
  ],
  server: {
    cors: true, // Allow cross-origin requests
  },
  build: {
    modulePreload: false,
    sourcemap: process.env.NODE_ENV === 'production' ? false : true,
    minify: process.env.NODE_ENV === 'production' ? true : false,
    cssCodeSplit: false,
  },
});

// import federation from '@originjs/vite-plugin-federation';
// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     federation({
//       name: 'app',
//       remotes: {
//         eroe: 'http://localhost:8081/assets/remoteEntry.js',
//       },
//       shared: ['react', 'react-dom'],
//     }),
//     {
//       name: 'vite-plugin-reload-endpoint',
//       configureServer(server) {
//         server.middlewares.use((req, res, next) => {
//           if (req.url === '/__fullReload') {
//             server.hot.send({ type: 'full-reload' });

//             res.end('Full reload triggered');
//           } else {
//             next();
//           }
//         });
//       },
//     },
//   ],
//   build: {
//     modulePreload: false,
//     target: 'esnext',
//     minify: false,
//     cssCodeSplit: false,
//   },
// });

// _______________________________________
// server: {
//   port: 8080,
// },
// resolve: {
//   alias: {
//     '@': path.resolve(__dirname, 'src'),
//   },
// },
// css: {
//   preprocessorOptions: {
//     scss: {
//       api: 'modern-compiler',
//     },
//   },
// },
// });
