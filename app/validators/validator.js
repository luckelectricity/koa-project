const { LinValidator, Rule } = require('../../core/lin-validator')
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')

// 校验参数是否为正整数
class ValidationInteger extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isInt', '参数必须为正整数', { min: 1 })
      // new Rule ('isNotEmpty', '必须传入参数')
    ]
  }
}

class UserValidation extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '请输入正确的邮箱')
    ]
    this.nickname = [
      new Rule("isLength", "昵称长度必须在2~10之间", 2, 10)
    ]
    this.password = [
      new Rule(
        "matches",
        "密码长度必须在6~22位之间，包含字符、数字和 _ ",
        /^[A-Za-z0-9_*&$#@]{6,22}$/
      )
    ]
    this.confirm_password = this.password
  }
  validateConfirmPassword(data) {
    if (!data.body.password || !data.body.confirm_password) {
      throw new Error("两次输入的密码不一致，请重新输入")
    }
    let ok = data.body.password === data.body.confirm_password;
    if (!ok) {
      throw new Error("两次输入的密码不一致，请重新输入");
    }
  }
  async validateEmail(data) {
    const email = data.body.email
    const hasEmail = await User.findOne({
      where: {
        email
      }
    })
    if (hasEmail) {
      throw new Error('该邮箱已注册')
    }
  }

}

class TokenValidation extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '账号必须大于6位，小于32位', { min: 6, max: 32 })
    ]
    this.pwd = [
      new Rule('isOptional'),
      new Rule('isLength', '密码必须大于6位，小于32位', { min: 6, max: 32 })
    ]
  }
  validateType(val) {
    if (!val.body.type) {
      throw new Error('type是必传参数')
    }
    if (!LoginType.isTypeThis(val.body.type)) {
      throw new Error('type不合法')
    }
  }
}

class NotEmptyValidator extends LinValidator{
  constructor(){
    super()
    this.token = [
      new Rule('isLength', '不能为空', {min:1})
    ]
  }
}

module.exports = { ValidationInteger, UserValidation, TokenValidation, NotEmptyValidator }
