const config = {
  env: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security: {
    secretKey: 'wosdjenccizkfcosmejsodmfhssldlfjihfnekasdiwn',
    expiresIn: 60 * 60
  },
  wx: {
    appId: 'wx573406ff485732d2',
    appSecret: '53df447e5289c6f8b76aacae2bc16b09',
    loginWxUrl:
      ' https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
module.exports = config
