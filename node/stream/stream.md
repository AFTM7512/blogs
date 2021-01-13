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
- `Readable`  - 可读操作;
- `Writable`  - 可写操作;
- `Duplex`    - 可读可写操作;
- `Transform` - 操作被写入数据，然后读出结果。

#### 之前我们总结过 node 的 `EventEmitter`。所有的 Stream 对象都是 EventEmitter 的实例，所以他们有自己定义的一系列事件：
- `data`    - 当有数据可读时触发;
- `end`     - 没有更多的数据可读时触发;
- `error`   - 在接收和写入过程中发生错误时触发;
- `finish`  - 所有数据已被写入到底层系统时触发。

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

#### 链式流
> 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。