> 大多数 Node.js 核心 API 构建于惯用的异步事件驱动架构，其中某些类型的对象（又称触发器，Emitter）会触发命名事件来调用函数（又称监听器，Listener）。 例如，net.Server 会在每次有新连接时触发事件，fs.ReadStream 会在打开文件时触发事件，stream会在数据可读时触发事件。

从官网上的这段话，我们能获取到的信息就是，Node.js 的核心 API 是使用的一套共同的异步事件驱动，因此这个肯定会独立成一个专属的类。今天我们一起学习这个类 `EventEmitter`。


## `EventEmitter`
> 所有能触发事件的对象都是 EventEmitter 类的实例。 这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上。 事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。
### 先来一个简单的示例
```js
const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()

// 添加事件回调
eventEmitter.on('say', () => {
  console.log('say hello');
})

setTimeout(() => {
  eventEmitter.emit('say')
}, 1000)
console.log('执行结束！');

// 执行结果
// 执行结束！
// say hello
```

#### 通过观察上面的方法，可以得出的是：
1. 通过 `on` 注册事件，等同 `addListener(event, listener)`；
2. 可以异步触发监听的事件。

### 再看
```js
const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('listener1', (argv1, argv2) => {
  console.log('listener1', argv1, argv2);
})
eventEmitter.on('listener1', (argv1, argv2) => {
  console.log('listener2', argv1, argv2);
})
eventEmitter.on('listener1', (argv1, argv2) => {
  console.log('listener3', argv1, argv2);
  return 'xx'
})
// prependListener 添加 listener 函数到名为 eventName 的事件的监听器数组的开头。
eventEmitter.prependListener('listener1', (argv1, argv2) => {
  console.log('prependListener', argv1, argv2);
})

setTimeout(() => {
  eventEmitter.emit('listener1', 'argv1', 'argv2')
}, 1000)
console.log('执行结束！');

// 执行结果
// 执行结束！
// prependListener argv1 argv2
// listener1 argv1 argv2
// listener2 argv1 argv2
// listener3 argv1 argv2
```
#### 由上面的示例可以得出：
1. 同一个监听事件，可以有多个监听；
2. 同一个事件，添加监听器，是有一个监听器数组统一控制，主要体现在执行顺序上；
3. 被调用的监听器返回的任何值都将会被忽略并丢弃。
