const Koa = require('koa')
const InitManage = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/catchError')

const app = new Koa()

// 调用顺序很重要啊
app.use(catchError)
app.use(parser())

InitManage.initCore(app)
app.listen(3000, () => {
  console.log('3000')
})
