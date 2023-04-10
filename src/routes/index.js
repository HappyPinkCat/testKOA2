const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

router.get('/json', async(ctx, next) => {
    ctx.body = { //ctx.body 里是给客户端返回的内容
        title: 'koa2 json'
    }
})
router.get('/profile/:userName', async(ctx, next) => { //动态路由参数们会自动存在ctx.params对象中
    const { userName } = ctx.params //ctx: context http请求的上下文
    ctx.body = {
        title: 'this is profile page',
        userName
    }
})
router.get('/loadMore/:userName/:pageIndex', async(ctx, next) => { //动态路由参数们会自动存在ctx.params对象中
    const { userName, pageIndex } = ctx.params //ctx: context http请求的上下文
    ctx.body = {
        title: 'this is loadmore api',
        userName,
        pageIndex
    }
})
module.exports = router