import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [
      vue({
        refTransform: true, // 开启ref转换
      }),
      vueI18n({
        include: resolve(__dirname, './src/locales/**'),
      }),
      AutoImport({
        dts: resolve(__dirname, './src/types/auto-imports.d.ts'),
        resolvers: [ElementPlusResolver()],
      }),
      Components({ resolvers: [ElementPlusResolver()] }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @use "@/styles/variables.scss" as *;
        $staticUrl:"${process.env.VITE_STATIC_URL}";
        `,
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      // https: true,
      // host: true,
      // proxy: {
      //   '/api': {
      //     target: 'Your API Server Endpoint',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path: any) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
  })
}
