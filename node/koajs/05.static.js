const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')

const app = new Koa()

app.use(serve(path.resolve(__dirname, './public/')))

app.use(async (ctx, next) => {
  ctx.status = 200
  ctx.body = 'hello world'
})

app.listen(3008, () => {
  console.log('http://localhost:3008');
})