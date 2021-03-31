const Router = require('koa-router')
const { UserValidation } = require('../../validators/validator')
const { User } = require('../../models/user')
const router = new Router({
  prefix: '/v1/user'
})
const {renderBody} = require('../../lib/helper')


router.post('/register', async (ctx) => {
  const v = await new UserValidation().validate(ctx)
  const user = {
    email: v.get('body.email'),
    nickname: v.get('body.nickname'),
    password: v.get('body.password')
  }
  await User.create(user)
  ctx.body = renderBody(200, user, '注册成功')
})

module.exports = router
