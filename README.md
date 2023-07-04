# 项目介绍

1. 特性：
  - 使用 React Hooks 开发
  - 基于 Ant Design 体系
  - 使用 React/Redux/Antd/Typescript 等前端前沿技术开发
  - 使用流行的暗黑模式主题，支持深/浅色主题切换

2. 特点
  - 基于路由的多 tab 页签 ➕ 緩存
  - 封装实用 axios 请求
  - less ➕ css module 样式隔离
  - 使用 craco 配置基于 create-react-app 的开发环境 ➕ 优化打包
  - 使用 Ant ConfigProvider 定制主题 ➕ 全局维护两套主题色（light 和 dark 两种主题）以及全局的 root 变量以供组件引用（不过，已通过静态消费（less）导出主题变量，但没使用）
  - i18next ➕ react-i18next 国际化

3. 命令行
```
  yarn
  yarn start
  yarn build:test
  yarn build
```

4. react 路由缓存
  - 大概有几种方法：
  - 1、使用 localStorage/sessionStorage 进行页面的状态的保存，跳转页面后再进行获取，这种方法虽然可行，但是从根本来说还是从新向后台再一次请求了数据，不算最佳方案。
  - 2、react-activation，项目就使用这个插件
  - 3、react-kepper，需要将项目的 react-router 替换掉，风险较大
  - 4、react-router 自身没有路由缓存的特性，在 5.x 版本之前，我们可以基于 react-router-cache-route 来实现路由缓存功能。但是 react-router 6.x 在实现上做了比较大的变化，react-router-cache-route 没有提供相应的支持。
  - 5、可关注 React 18.x 中的官方实践Offscreen，但该 api 还完善中


