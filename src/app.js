const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler——页面上显示
onerror(app)

// middlewares
app.use(bodyparser({ //能parser这几种格式
    enableTypes: ['json', 'form', 'text']
}))
app.use(json()) //解析完转成对象形式 可以访问了
app.use(logger()) //封装好的用于打印log的
app.use(require('koa-static')(__dirname + '/public')) //把public目录注册成static了，public里头可以当静态资源访问

app.use(views(__dirname + '/views', { //注册ejs否则当成静态文件对待了，#TODO 那react的话咋整
    extension: 'ejs'
}))

// logger——重复了
// app.use(async(ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling——控制台打印error
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app