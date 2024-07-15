import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import vuePlugin from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import {
  rootPath
} from './config/paths'
import pkg from './package.json'

export default defineConfig(({ command, mode }) => {
  const isDevelopment = mode === 'development'
  const isProduction = mode === 'production'

  const env = loadEnv(mode, rootPath)
  console.log(env)
  return {
    root: rootPath,
    base: '/',
    mode,
    define: {
      pkg: JSON.stringify(pkg)

    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/style/common.scss';"
        }
      },
      devSourcemap: false,
      transformer: 'postcss'
    },
    envPrefix: 'VITE_',
    publicDir: 'static',
    cacheDir: 'node_modules/.vite',
    resolve: {
      alias: {
        '@': path.resolve(rootPath, './src')
      },
      extensions: ['.jsx', '.js', 'ts', '.tsx']
    },
    server: {
      port: env.VITE_CLIENT_PORT,
      strictPort: false,
      open: true,
      proxy: {
        '/api': {
          target: `http://localhost:${env.VITE_SERVER_PORT}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: true
      }
    },
    build: {
      target: 'modules',
      outDir: 'dist',
      assetsDir: 'assets',
      assetsInlineLimit: 2048,
      cssCodeSplit: true,
      sourcemap: !!isDevelopment,
      minify: 'esbuild',
      copyPublicDir: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: 'media/[name]-[hash].[ext]'
        }
      }
    },
    plugins: [
      react(),
      // eslintPlugin(),
      vuePlugin(),
      legacy({
        targets: ['android <= 9', 'chrome <= 60', 'safari <=10', 'ios <= 10', 'edge <=13'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: true

      })
    ]
  }
})
