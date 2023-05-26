# easy-lowcode

##  🔥 最简单的低代码实现

技术栈： React18 + Vite + codeMirror + Koa2（后期将改用nestjs）

1. 实现拖拽生成组件代码的json描述的页面 √
2. 物料区、编辑区、画布区 √
4. 编辑器通信 √
5. 支持生成不同框架源代码(出码) √
6. 服务端koa2构建生成源码 √
7. H5移动端生成适配 √
8. 支持sdk加载页面，renderer解析 √
9. iframe隔离 postMessage 通信  √
10. 封装editor包 ×
11. 预览二维码 ×
12. 生产低代码组件 × 
13. 大纲树 ×
14. 低代码通信 ×
15. 自定义事件中心 ×
16. 完整的生产页面并部署 ×

##   📀 预览

[easy-lowcode](http://rreppket2.hn-bkt.clouddn.com/6b3176fd80b347b38a62377692487581_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

##   📈 文章

[简单5分钟，将lowcode低代码融入到你的中后台管理系统](https://juejin.cn/post/7115779659932893214)  
[我的低代码框架是如何生成源码的？](https://juejin.cn/post/7206955531998773309)  
[实不相瞒，看完你也能手撸一个低代码框架](https://juejin.cn/post/7202625823667404857)

## 快速开始

```js
pnpm dev
pnpm run server
```

## 如何调试sdk

```js
pnpm renderer   // 生成sdk
```

画布区的iframe是为了与编辑器解耦实现隔绝的上下文。生成sdk后，我们可以在sdk.html中默认通过public静态资源被外部访问，然后在options.ts修改对应iframeURL，在编辑器的navbar切换iframe加载。