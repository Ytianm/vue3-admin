import vue from '@vitejs/plugin-vue'
const path = require('path')

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  server: {
    proxy: {
      // string shorthand
      // '/api': 'http://172.16.6.196:8080',
      // // with options
      '/api': {
        target: 'http://172.16.6.196:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}

