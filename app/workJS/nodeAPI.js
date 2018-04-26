const crypto = require("crypto");
const url = require("url")
const querystring = require('querystring')
const cheerio = require('cheerio')
const utility = require('utility')

const api = (req,res,next) => {
//*this is crypto
  crypto.randomBytes(6,(err, buf) => { //(size, callBack) => {}
  if (err) throw err;
      console.log('--------->>>>生成随机数')
      console.log(`buf.length = ${buf.length},buf.toString('hex') = ${buf.toString('hex')}`)
  })

//querystring
  console.log('--------->>>>这是测试querystring解析与格式化 URL 查询字符串')
  console.log('req.query-----'+JSON.stringify(req.query))
  console.log('req.path-----'+req.path)
  console.log('req.url-----'+req.url)
  console.log(url.parse(req.url))//如果req.url : /forth?name=porco&sex=male  则url.parse(req.url) : Url {protocol: null,slashes: null,auth: null,host: null,port: null,hostname: null,hash: null,search: '?name=porco&sex=male',query: 'name=porco&sex=male',pathname: '/forth',path: '/forth?name=porco&sex=male',href: '/forth?name=porco&sex=male' }
  console.log(querystring.parse(url.parse(req.url).query)) //querystring.parse（str）把name=porco&&sex=male 解析成{name: 'porco', '': '', sex: 'male' }

  console.log('参数为'+url.parse(req.url).query || '')
  let escapeStr = querystring.escape(req.url || '')
  console.log(escapeStr + '对给定的 str 进行 URL 编码。') //对给定的 str 进行 URL 编码。
  console.log(querystring.unescape(escapeStr)+ ' 对给定的 str 进行 URL 解码。')
  

//<<<检测cheerio cheerio是node中的jquery，精简了包含了dom
  console.log('--------->>>>检测cheerio')
  $ = cheerio.load('<h2 class="title">这是cheerio操作dom生成的字符</h2>',{decodeEntities: false});//decodeEntities:false转为中文
  $('h2.title').text('通过cheerio改变后的值，参数decodeEntities: false解决了乱码的问题');
  $('h2').addClass('welcome');
  console.log($.html())

// utility 加密
  console.log('--------->>>>utility 加密')
  let name = '我是porcoMar'
  let sha1Value = utility.sha1(name) //  混淆加密
  let md5Value = utility.md5(name)    //md5加密
  console.log(`name=${name},sha1Value=${sha1Value},md5Value=${md5Value}`)


}
module.exports = {
  api:api
}
