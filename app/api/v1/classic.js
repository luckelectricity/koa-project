const Router = require('koa-router')
const { ValidationInteger } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
  prefix: '/v1/classic'
})

router.get('/latest', new Auth(8).m, async (ctx) => {
    ctx.body = {
      code: 200,
      data: ctx.auth,
      msg: 'success'
    }
  })

router.post('/v1/:id/a/b', async (ctx,next) => {
  const params = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body
  const v = await new ValidationInteger().validate(ctx)
  const id = v.get('path.id')
  ctx.body = {
    id: id,
    params,
    query,
    header,
    body
  }
})

module.exports = router
