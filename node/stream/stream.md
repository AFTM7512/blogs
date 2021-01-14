> Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

## 什么是流？
流是为 Node.js 应用程序提供动力的基本概念之一。

它们是一种以高效的方式处理读/写文件、网络通信、或任何类型的端到端的信息交换。

例如，在传统的方式中，当告诉程序读取文件时，这会将文件从头到尾读入内存，然后进行处理。
使用流，则可以逐个片段地读取并处理（而无需全部保存在内存中）。

Node.js 的 stream 模块 提供了构建所有流 API 的基础。 所有的流都是 EventEmitter 的实例。

```js
const { createServer } = require('http')
const { resolve } = require('path')
const { readFile, createReadStream } = require('fs')

createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200)
  } else if (req.url === '/') {
    // 通过 流 的形式，将文件读取后，发送到页面上
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    const stream = createReadStream(resolve(__dirname, 'home.html'))
    // 通过 pipe 将读取的内容发到页面
    stream.pipe(res)

  } else if (req.url === '/about') {
    // 读取文件后，必须是将文件读取完，才能返回。如果文件过大，则该操作会花费更多的时间。
    readFile(resolve(__dirname, 'about.html'), 'utf-8', (err, data) => {
      if (err) return
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      res.write(data)
      // 因为这里是异步，所以 res.end 不能放在外面
      res.end()
    })
  } else {
    res.statusCode = 404
    res.end()
  }
})
  .listen(3000, () => {
    console.log('http://localhost:3000');
  })


```

## Stream 的种类
- `Readable`  - 可读操作; 可以通过管道读取、但不能通过管道写入的流（可以接收数据，但不能向其发送数据）。 当推送数据到可读流中时，会对其进行缓冲，直到使用者开始读取数据为止。
- `Writable`  - 可写操作;
- `Duplex`    - 可读可写操作;
- `Transform` - 操作被写入数据，然后读出结果。
#### 之前我们总结过 node 的 `EventEmitter`。所有的 Stream 对象都是 EventEmitter 的实例，所以他们有自己定义的一系列事件：
- `data`    - 当有数据可读时触发;
- `end`     - 没有更多的数据可读时触发;
- `error`   - 在接收和写入过程中发生错误时触发;
- `finish`  - 所有数据已被写入到底层系统时触发。

### 可读流的两种模式
1. flowing
  在 flowing 模式下， 可读流自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用。
2. paused 
  在 paused 模式下，必须显式调用 stream.read() 方法来从流中读取数据片段。

#### 两种模式之间的切换
所有初始工作模式为 paused 的 Readable 流，可以通过下面三种途径切换到 flowing 模式：
##### 流从默认的暂停模式切换到流动模式可以使用以下几种方式：
1. 通过添加 data 事件监听器来启动数据监听
2. 调用 resume() 方法启动数据流
3. 调用 pipe() 方法将数据转接到另一个可写流

##### 从流动模式切换为暂停模式又两种方法：
1. 在流没有 pipe() 时，调用 pause() 方法可以将流暂停
2. pipe() 时移除所有 data 事件的监听，再调用 unpipe() 方法

### 简单是示例，创建可读流
```js
const { Readable, Writable } = require('stream')

const readStream = new Readable({
  /**
   * Readable 类中默认有 _read 方法的实现，_read 方法有一个参数 size，用来向 read 方法指定应该读取多少数据返回，
   * 不过只是一个参考数据，很多实现忽略此参数
   */
  read: (data) => {
    console.log(data);
  }
})

const writeStream = new Writable({
  write: (chunk, encoding, next) => {
    console.log(chunk.toString());
    next()
  }
})

readStream.pipe(writeStream)
/**
 * 通过 this.push 向缓冲区推送数据，缓冲区概念后面会提到，暂时理解为挤到了水管中可消费了
 * push 的内容只能是字符串或者 Buffer，不能是数字
 * push 方法有第二个参数 encoding，用于第一个参数是字符串时指定 encoding
 */
readStream.push('hello')
readStream.push('node')

```

### 常用的流操作
#### 从流中读取数据
```js
const { createReadStream } = require('fs')
const { resolve } = require('path')

readStream = createReadStream(resolve(__dirname, 'home.html'))

let data = ''
readStream.on('data', (chunk) => {
  data += chunk
  console.log('chunk:', chunk);
})

// 读取数据结束
readStream.on('end', () => {
  console.log("data:", data);
})

readStream.on('error', (err) => {
  console.log(err);
})

// 返回数据
// chunk: <Buffer 3c 21 44 4f 43 54 59 50 45 20 68 74 6d 6c 3e 0d 0a 3c 68 74 6d 6c 20 6c 61 6e 67 3d 22 65 6e 22 3e 0d 0a 3c 68 65 61 64 3e 0d 0a 20 20 3c 6d 65 74 61 ... >
// data: <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Home</title>
// </head>
// <body>
//   <h1>This is Home Page</h1>
// </body>
// </html>
```

#### 写入流
```js
const { createWriteStream } = require('fs')
const writeStream = createWriteStream('out.txt')
let data = 'hello stream'
// 使用 utf8 编码写入数据
writeStream.write(data, 'utf-8')
// 标记文件末尾
writeStream.end()

// 处理事件
writeStream.on('finish', () => {
  console.log('写入完成！');
})
writeStream.on('error', (err) => {
  console.log(err);
})
```

#### 管道流
> 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
```js
const { createReadStream, createWriteStream } = require('fs')
const { resolve }= require('path')

const readStream = createReadStream(resolve(__dirname, '孔乙己.txt'))
const writeStream = createWriteStream(resolve(__dirname, 'output.txt'))

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readStream.pipe(writeStream)
console.log('完成');
```

#### 链式流
> 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
```js
const { createReadStream, createWriteStream } = require('fs')
const { resolve } = require('path')
const { Gzip, Gunzip } = require('zlib')

createReadStream(resolve(__dirname, './孔乙己.txt'))
  .pipe(Gzip())
  .pipe(createWriteStream(resolve(__dirname, '孔乙己.txt.gz')))
```