const Sequelize = require('sequelize')

const {
  dbName,
  host,
  password,
  port,
  user
} = global.config.database

const sequelize  = new Sequelize(dbName,user,password,{
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define:{
    // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
    // 该值默认为 true, 
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    freezeTableName: true
  }
})

sequelize.sync({ force: false })

module.exports = {
  sequelize
}