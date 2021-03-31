const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Tree extends Model {}
Tree.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    key_id: Sequelize.STRING,
    def: Sequelize.TEXT,
    edef: Sequelize.TEXT,
    ename: Sequelize.TEXT,
    name: Sequelize.STRING,
    parent: Sequelize.STRING,
    parent_id: Sequelize.STRING
  },
  {
    sequelize,
    tableName: 'tree'
  }
)

module.exports = {
  Tree
}
