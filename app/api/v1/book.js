const Router = require('koa-router')
const router = new Router()
const { Auth } = require('../../../middlewares/auth')

router.get('/v1/book/latest', new Auth().m, (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      content: '人生不能像做菜，把所有的料准备好才下锅',
      fav_nums: 0,
      id: 1,
      image: 'http://127.0.0.1:5000/images/movie.7.png',
      index: 7,
      like_status: 0,
      pubdate: '2018-06-22',
      title: '李安<<饮食男女>>',
      type: 100,
    },
  }
})

  module.exports = router
