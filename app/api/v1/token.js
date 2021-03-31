const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/token'
})
const { TokenValidation, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { renderBody } = require('../../lib/helper')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')

router.post('/', async (ctx) => {
  const v = await new TokenValidation().validate(ctx)
  let token;
  switch (v.get('body.type')) {
    case LoginType.TYPEEMAIL:
      token = await typeEmail(v.get('body.account'), v.get('body.pwd'))
      break;
    case LoginType.TYPEWX:
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    default:
      throw new Error('type没有处理方式')
  }
  ctx.body = {
    code: 200,
    data: {
      token
    },
    msg: 'success'
  }
})

router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const data = Auth.verifyTOken(v.get('body.token'))
  ctx.body = renderBody(200, {tokenFlag: data})
})

async function typeEmail(email,pwd) {
 const user = await User.emailLogin(email, pwd)
  return generateToken(user.id, Auth.USER)
}
module.exports = router
