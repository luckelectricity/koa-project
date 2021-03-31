const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth{
  constructor(level){
    this.level = level
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }
  get m(){
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      let decode
      if(!userToken || !userToken.name){
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError'){
          errMsg = 'token过期'
        }
       throw new global.errs.Forbbiden(errMsg)
      }
      if (this.level > decode.scope) {
        throw new global.errs.Forbbiden('权限不足')
      }
      ctx.auth = {
        id: decode.uid,
        scope: decode.scope
      }
      
      await next()
    }
  }
  static verifyTOken(token){
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}
