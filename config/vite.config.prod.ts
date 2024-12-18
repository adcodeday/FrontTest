import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import configCompressPlugin from './plugin/compress'
import configVisualizerPlugin from './plugin/visualizer'
import configImageminPlugin from './plugin/imagemin'

export default mergeConfig(
  {
    mode: 'production', // vite生产模式
    // 插件的具体配置请查看对应的文件
    plugins: [configCompressPlugin('gzip'), configVisualizerPlugin(), configImageminPlugin()],
    build: {
      rollupOptions: {
        output: {
          // 分包策略优化
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            xgplayer: ['xgplayer'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
    server: {
      port: 9988,
      open: false, // 自动打开浏览器
      fs: {
        strict: true, // 文件读取必须是相对于根目录的绝对路径
      },
      https: false, // 关闭https
    },
  },
  baseConfig,
)
