const bcrypt = require('bcryptjs')

const { sequelize } = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const { AuthFailed } = require('./../../core/http-exception')

class User extends Model {
  static async emailLogin(account, pwd){
    const user = await User.findOne({
      where:{
        email: account
      }
    })
    if(!user) {
      throw new AuthFailed('账号不存在')
    }
    const isPwd = bcrypt.compareSync(pwd, user.password)
    if(!isPwd){
      throw new AuthFailed('密码错误，请重新输入！')
    }
    return user
  }
  static async getUserToOpenId(openId){
    let user = await User.findOne({
      where:{
        openId
      }
    })
    return user
  }
  static async createUserToOpenId(openId) {
    let user = await User.create({
      openid: openId
    })
    return user
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true                  
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: { 
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue('password', pwd)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
},{
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}