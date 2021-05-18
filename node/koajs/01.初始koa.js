// 导入 koa， koa2.x 中，koa 是一个类，需要用大写开头
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  console.log(ctx);
  // { 
  //   request: // koa 封装的 request 对象
  //   { 
  //     method: 'GET',
  //     url: '/favicon.ico',
  //     header:
  //      { host: 'localhost:3000',
  //        connection: 'keep-alive',
  //        pragma: 'no-cache',
  //        'cache-control': 'no-cache',
  //        'sec-ch-ua':
  //         '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
  //        'sec-ch-ua-mobile': '?0',
  //        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  //        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  //        'sec-fetch-site': 'same-origin',
  //        'sec-fetch-mode': 'no-cors',
  //        'sec-fetch-dest': 'image',
  //        referer: 'http://localhost:3000/',
  //        'accept-encoding': 'gzip, deflate, br',
  //        'accept-language': 'zh-CN,zh;q=0.9' } 
  //       },
  //   response: { // koa 封装的 response 对象
  //     status: 404,
  //     message: 'Not Found',
  //     header: [Object: null prototype] {} 
  //   },
  //   app: { subdomainOffset: 2, proxy: false, env: 'development' },
  //   originalUrl: '/favicon.ico',
  //   req: '<original node req>', // 原生属性中 request 对象
  //   res: '<original node res>', // 原生属性中的 response 对象
  //   socket: '<original node socket>' 
  // }
  ctx.body = `<h2>hello world</h2>`
})

app.listen('3000', () => {
  console.log('running in the http://localhost:3000')
})