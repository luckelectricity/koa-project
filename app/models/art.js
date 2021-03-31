const {
  Movie,
  Sentence,
  Music
} = require('../models/classic')

class Art {
  static async getData(id, type){
    const flow = {
      where: {
        id
      }
    }
    let art = null
    switch (type) {
      case 100:
        art = await Movie.findOne(flow)
        break
      case 200:
        art = await Music.findOne(flow)
        break
      case 300:
        art = await Sentence.findOne(flow)
        break
      case 400:
        break
      default:
        throw new Error('错误')
    }
    return art
  }
}

module.exports = {
  Art
}
