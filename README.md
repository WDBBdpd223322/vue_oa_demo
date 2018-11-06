# Vue电商后台管理项目（完整版本）

## 技术栈

- Vue
- Axios
- Element-ui
- Webpack



## 项目整体文件说明

- `build` webpack 相关配置
  - `build.js` 生产环境构建
  - `check-versions.js` 版本检查
  - `utils.js` 构建相关工具
  - `vue-loader.conf.js` vue 加载器配置
  - `webpack.base.conf.js` webpack 基础配置
  - `webpack.dev.conf.js` webpack 开发环境配置
  - `webpack.prod.conf.js` webpack 生产环境配置
- `config` Vue 基本相关配置（可修改监听端口号、打包输出内容相关等）
  - `dev.env.js` 项目开发环境配置
  - `index.js` 项目主要配置（包括端口号，打包路径）
  - `prod.env.js` 项目生产环境配置
- `node_modules` 项目依赖
- `src` 项目核心文件
  - `assets` 静态资源文件（比如全局样式，外部 js 文件）
    - `css ` 公共 css 样式
    - `imgs` 公共图片
    - `js` 自己封装的 js 文件
      - `auth.js` token 相关的 js 操作
      - `http.js` 前后台交互相关的 js 操作
  - `components` 公共组件
  - `router` 路由模块
  - `App.vue` 根组件
  - `main.js` 入口文件
- `static` 静态资源文件夹
- `.babelrc` babel 编译参数
- `.editorconfig` 代码校验配置文件
- `.eslintignore` 代码校验忽略文件
- `.gitignore` git上传忽略文件
- `.postcssrc.js` 转换 css 工具
- `index.html` 主页
- `package.json` 项目基本信息
- `README.md` 项目说明



## 项目描述

- 该项目是一个标准版电商后台管理系统（SPA），不支持注册功能。包含用户管理的 CRUD，权限管理的 CRUD，商品管理和参数的 CRUD，订单管理的 CRUD 以及图标渲染。包含 文件上传，图标下载等功能。



## 责任描述

- 使用 vue-cli + webpack 进行项目初始化及打包构建
- 使用 es6 前台模块化标准进行项目整体开发
- 使用 element-ui 进行前台视图层的渲染
- 使用 vue-router 进行路由配置及渲染，使用路由守卫进行 token 的验证
- 使用 axios 进行前后台数据交互，使用请求守卫进行 token 的携带
- 使用 element-tree-grid 进行 element-ui 的扩展，完成商品列表表格树的渲染
- 使用 vue-quill-editor 进行富文本编辑器的渲染
- 使用 echarts 进行项目图表的渲染
- 使用 git 版本管理工具进行项目管理
- ...



## 项目运行

- 克隆仓库地址到本地并下载依赖

```shell
$ git clone https://github.com/WDBBdpd223322/vue_oa_demo.git
$ cd vue_oa_demo/
$ npm i
```

- 启动项目

```shell
$ npm start
```

- 打开浏览器输入网址

```shell
http://localhost:8080 // 项目默认监听 8080 端口号
```

- 超管用户

```javascript
username: admin
password: 123456
```

