// 这个文件是vu-cli创建的项目配置文件
// 此文件中可以对整个项目打包，构建全局性的配置

// webpack 在打包时，底层用到了node.js
// 因此，在此文件中可以导入并使用node.js中的核心模块

const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// vue.config.js
module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // '@nav-bar-background-color': 'pink'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${themePath}";`
          }
        }
      }
    }
  }
}
