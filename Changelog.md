## v 1.0.5

[https://taro-docs.jd.com/taro/docs/next/react#onready-](https://taro-docs.jd.com/taro/docs/next/react#onready-)
taro的组件并非对应小程序组件，所以 onReady 的触发是页面 onReady 生命周期的触发

fix: 页面优先显示，某些事件触发后canvas组件显示，canvas无法渲染的问题
