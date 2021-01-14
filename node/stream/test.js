// const { createServer } = require('http')
// const { resolve } = require('path')
// const { readFile, createReadStream } = require('fs')

// createServer((req, res) => {
//   if (req.url === '/favicon.ico') {
//     res.writeHead(200)
//   } else if (req.url === '/') {
//     res.writeHead(200, {
//       'Content-Type': 'text/html; charset=utf-8'
//     })
//     const stream = createReadStream(resolve(__dirname, 'home.html'))
//     stream.pipe(res)
//     // res.end()
//   } else if (req.url === '/about') {
//     readFile(resolve(__dirname, 'about.html'), 'utf-8', (err, data) => {
//       if (err) return
//       res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8'
//       })
//       res.write(data)
//       res.end()
//     })
//   } else {
//     res.statusCode = 404
//     res.end()
//   }

  
// })
//   .listen(3000, () => {
//     console.log('http://localhost:3000');
//   })

// 从流中读取数据
// const { createReadStream } = require('fs')
// const { resolve } = require('path')

// readStream = createReadStream(resolve(__dirname, 'home.html'))

// let data = ''
// readStream.on('data', (chunk) => {
//   data += chunk
//   console.log('chunk:', chunk);
// })

// readStream.on('end', () => {
//   console.log("data:", data);
// })

// readStream.on('error', (err) => {
//   console.log(err);
// })

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

// 写入流
// const { createWriteStream } = require('fs')
// const writeStream = createWriteStream('out.txt')
// let data = 'hello stream'

// writeStream.write(data, 'utf-8')

// writeStream.end()

// writeStream.on('finish', () => {
//   console.log('写入完成！');
// })

// writeStream.on('error', (err) => {
//   console.log(err);
// })

// 管道流
// const { createReadStream, createWriteStream } = require('fs')
// const { resolve }= require('path')

// const readStream = createReadStream(resolve(__dirname, '孔乙己.txt'))
// const writeStream = createWriteStream(resolve(__dirname, 'output.txt'))
// readStream.pipe(writeStream)
// console.log('完成');

// 链式操作
// const { createReadStream, createWriteStream } = require('fs')
// const { resolve } = require('path')
// const { Gzip, Gunzip } = require('zlib')

// createReadStream(resolve(__dirname, './孔乙己.txt'))
//   .pipe(Gzip())
//   .pipe(createWriteStream(resolve(__dirname, '孔乙己.txt.gz')))

// 创建可读流
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