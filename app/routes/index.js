// var express = require('express');
// var config = require("../../config/config.js");
// const accessTokenMiddle = require("../middlewares/accessToken.middleware.js");
// var request = require("request");
// const crypto = require("crypto");
// const weixin = require("../../config/env.config");
// const sha1 = require("sha1");
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// router.get("/mallProductDesc",function(req,res,next){
// 	var url = config.url + req.url;

// 	request(url,function(err,response,body){
// 		res.send(body);
// 	});
// });
// router.get("/weixin",accessTokenMiddle.accessToken,accessTokenMiddle.ticket,function(req,res,next){
//     console.log(req.query);
//     crypto.randomBytes(16,function(ex,buf){
//         var appId = weixin.appID;
//         var noncestr = buf.toString("hex");
//         var jsapi_ticket = req.query.ticket;
//         var timestamp = new Date().getTime();
//         timestamp = parseInt(timestamp/1000);
//         var url = req.query.url;
//         console.log("参数：");
//         console.log(noncestr);
//         console.log(jsapi_ticket);
//         console.log(timestamp);
//         console.log(url);

//         var str = ["noncestr=" + noncestr, "jsapi_ticket="+jsapi_ticket, "timestamp=" + timestamp, "url=" + url].sort().join("&");
//         console.log("字符串");
//         console.log(str);
//         var signature = sha1(str);

//         console.log("签名：");
//         console.log("signature:")
//         console.log(signature);

//         var result = {code:0,result:{appId:appId,timestamp: timestamp,nonceStr: noncestr,signature: signature}};

//         res.json(result);
//     });
// });
// module.exports = router;
