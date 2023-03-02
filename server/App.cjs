/**
 * 前端构建文件依赖树，给后端以生成对应的文件并请求返回
 */
const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
var cors = require('koa2-cors');
const index = require('./routes/index.cjs')

const app = new Koa()

app.use(cors({
  origin: 'http://127.0.0.1:5173'
}))
onerror(app)

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

/**
 * routes
 */
app.use(index.routes(), index.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen('7001', () => {
  console.log("7001");
})
