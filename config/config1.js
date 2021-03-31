const config = {
    env: 'dev',
    database:{
      dbName:'island',
      host:'localhost',
      port: 3306,
      user: 'root',
      password: 'liuhuan123'
    },
  security: {
    secretKey: 'wosdjenccizkfcosmejsodmfhssldlfjihfnekasdiwn',
    expiresIn: 60*60
  },
  wx: {
    appId: '',
    appSecret: '',
    loginWxUrl: ' https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
  }
}
module.exports = config