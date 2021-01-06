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
  return 'xx' // 设置返回值
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

### 再看
```js
const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('say', () => {
    console.log(111);
  })
  .on('say', () => {
    console.log(222);
  })

setTimeout(() => {
  eventEmitter.emit('say')
}, 1000)
console.log('执行结束！');

// 执行结束！
// 111
// 222
```
#### 由上面的示例可以得出：
1. 返回对 EventEmitter 的引用，以便可以链式调用。

#### 接下来看
```js
const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()

// setMaxListeners 为特定事件设置监听数量
eventEmitter.setMaxListeners(3)
  .on('say', () => {
    console.log(111);
  })
  .on('say', () => {
    console.log(222);
  })
  .on('say', () => {
    console.log(333);
  })
  .on('say', () => {
    console.log(444);
  })

// 获取特定事件的监听器连接数
console.log(eventEmitter.listenerCount('say'))

setTimeout(() => {
  eventEmitter.emit('say')
}, 1000)
console.log('执行结束！');

// 4
// 执行结束！
// (node:7748) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 4 say listeners added. Use emitter.setMaxListeners() to increase limit
// 111
// 222
// 333
// 444
```
#### 由上面的示例可以得出：
1. 如果为特定事件添加了超过了设置的监听器数量，则 EventEmitter 会打印一个警告。 这有助于发现内存泄露。
2. listenerCount('listenerName') 获取特定事件的监听器连接数

### 最后看
```js
const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.emit('error')
// events.js:189
//     throw err; // Unhandled 'error' event
//     ^

// Error [ERR_UNHANDLED_ERROR]: Unhandled error. (undefined)
//     at EventEmitter.emit (events.js:187:17)
//     at Object.<anonymous> (C:\Users\admin\Desktop\blogs\node\demo.js:71:14) 
//     at Module._compile (internal/modules/cjs/loader.js:778:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
//     at Module.load (internal/modules/cjs/loader.js:653:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:585:3)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)      
//     at startup (internal/bootstrap/node.js:283:19)
//     at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
```
### 总结：
1. EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
2. 所以我们最好先定义一个 `eventEmitter.on('error', callback)`


### `EventEmitter` 的常用方法
1. `once(event, listener)`: 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
2. `removeListener(event, listener)`: 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。 它接受两个参数，第一个是事件名称，第二个是回调函数名称。
3. `removeAllListeners([event])`: 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
4. `listeners(event)`: 返回指定事件的监听器数组。
