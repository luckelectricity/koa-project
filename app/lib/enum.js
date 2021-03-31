function isTypeThis(val){
  for (const key in this) {
    if (this[key] == val) {
      return true
    }
  }
  return false
}

const LoginType = {
  TYPEEMAIL: 101,
  TYPEMOBILE: 102,
  TYPEWX: 103,
  SUPERADMIN: 200,
  isTypeThis
}

module.exports = {
  LoginType
}