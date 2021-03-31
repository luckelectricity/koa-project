const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {
  static async codeToToken(code){
    let url = util.format(
      global.config.wx.loginWxUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
      )
      let res = await axios.get(url)

      if(res.status !== 200){
        throw new global.errs.AuthFailed('openid获取失败')
      }
      let data = res.data
      if(data.errcode){
        throw new global.errs.AuthFailed(data.errmsg + data.errcode)
      }
      let user = await User.getUserToOpenId(data.openid)
      
      if(!user){
        user = await User.createUserToOpenId(data.openid)
      }
      return await generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}