const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model{

}
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})

class Sentence extends Model {}
Movie.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})

class Music extends Model {}
Movie.init(
  { ...classicFields, url: Sequelize.STRING },
  {
    sequelize,
    tableName: 'music'
  }
)

module.exports = {
  Movie,
  Sentence,
  Music
}
