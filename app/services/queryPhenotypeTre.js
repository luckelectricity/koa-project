const axios = require('axios')
const { Tree } = require('../models/tre')
var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块
async function queryPhenotypeTre(data) {
  let res = await axios.post(
    'https://rare.genomcan.cn/rare-service/rare/search/queryPhenotypeTree',
    data
  )
  return res.data
}
async function queryPhenotypeTre2(data1) {
  let res = await axios.post(
    'https://rare.genomcan.cn/rare-service/rare/search/queryPhenotypeTree',
    data1
  )
  let data = res.data
  if(data.code == 1){
     await creatFile(data, data1.id)
    for (let index = 0; index < data.items.length; index++) {
      const element = data.items[index];
      // element.parent_id = data1.id
      //  try {
      //   //  Tree.create(element)
      //  } catch (error) {
      //    console.log(error)
      //  }
      if(element.parent == 1){
        await queryPhenotypeTre2({ id: element.id, from: 0 })
      }
    }
  }
}
class QueryTre {
  static async getTre(filename) {
    // let res = await queryPhenotypeTre({})
    // if(res.code == 1){
    //   await creatFile(res, '1')
    //   for (let i = 0; i < res.items.length; i++) {
    //     const element = res.items[i];
    //     // element.parent_id = ''
    //     // try {

    //     //   // Tree.create(element)
    //     // } catch (error) {
    //     //   console.log(error);
    //     // }
    //     await queryPhenotypeTre2({id: element.id, from: 0})
    //   }
    // }
    // return res
    walk(path.join(__dirname, `../../${filename}`))
  }
}

async function creatFile(data,id) {
    //把data对象转换为json格式字符串
    var content = JSON.stringify(data);

    //指定创建目录及文件名称，__dirname为执行当前js文件的目录
    var file = path.join(__dirname, `../../data/${id}.json`)

    //写入文件
    await fs.writeFile(file, content, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('文件创建成功，地址：' + file);
    });
}

var walk = function(dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function(file) {
    if (/\.DS_Store$/.test(file)) {
      console.log(file)
    } else {
      file = dir + '/' + file
      // var stat = fs.statSync(file)
      // if (stat && stat.isDirectory()) results = results.concat(walk(file))
      // else results.push(file)
      const jsonData = fs.readFileSync(file, 'utf-8')
      var test1 = JSON.parse(jsonData)
      test1.items.forEach(ele => {
        ele.key_id = ele.id
        delete ele.id
        try {
          Tree.create(ele)
        } catch (error) {
          console.log(error)
        }
      })
    }
  })
  // return results
}

module.exports = {
  QueryTre
}
