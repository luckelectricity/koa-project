const Router = require('koa-router')
const requireDirectory = require('require-directory')
const errs = require('./http-exception')

class InitManage {
  static initCore(app){
    InitManage.app = app
    InitManage.InitConfig()
    InitManage.Initerrs()
    InitManage.initRequireRou()
  }
  static initRequireRou(){
    requireDirectory(module, `${process.cwd()}/app/api`, {
      visit: whenLoadModule
    })

    function whenLoadModule(rou) {
      if (rou instanceof Router) {
        InitManage.app.use(rou.routes())
      }
    }
  }

  static InitConfig(){
    const configPath = `${process.cwd()}/config/config`
    const config = require(configPath)
    global.config = config
  }
  static Initerrs(){
    global.errs = errs
  }
}
module.exports = InitManage
