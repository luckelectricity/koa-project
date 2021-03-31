const { HttpException } = require('../core/http-exception')

const catchError = async function (ctx, next) {
  try {
    await next()
  } catch (error) {
    const env = global.config.env === 'dev'
    const httpError = error instanceof HttpException
    if (env && !httpError) {
      throw error
    }
    if (httpError) {
      ctx.body = {
        code: error.code,
        msg: Array.isArray(error.msg) ? error.msg[0] : error.msg,
        errorCode: error.errorCode,
        requestMsg: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 200

    } else {
      ctx.body = {
        code: error.code,
        msg: error.msg || '服务器报错',
        errorCode: error.errorCode || 999,
        requestMsg: `${ctx.method} ${ctx.path}`

      }
      ctx.status = error.code || 500
    }
  }
}
module.exports = catchError
