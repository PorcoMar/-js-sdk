
//const redis = require("redis");
//const redisClient = redis.createClient();

// **
// 
var express = require('express');
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
var router = express.Router();

var indexjs = require("../workJS/workJS").indexTest
var callBack = require("../workJS/workJS").callBack
router.get("/", authMiddleware.getCode, (req,res,next)=>{
    //res.send("home");
    res.sendFile(path.join(__dirname, "../views/index.html"));
})
router.get("/userList", authMiddleware.getCode, (req,res,next)=>{
    //res.send("userList");
    res.sendFile(path.join(__dirname,"../views/userList.html")) //可以改不用重新启动服务
    //res.sendFile(path.join(__dirname,"../../public/html/userList.html"))//不建议这么写，前端模版从public／index.html进入
});
router.get("/second", authMiddleware.getCode, (req,res,next)=>{
    let result = indexjs();
    console.log("//////////////")
    console.log(result)
    res.render('second', { name: 'this is /second' ,list:result});
})
router.get("/callBack", authMiddleware.getCode, (req,res,next)=>{
    let back = callBack()
    console.log(back)
    res.render("callBack",{name:"this is callBack",list:back})
});


router.get("/getUserInfo",authMiddleware.getAccess_token, authMiddleware.getUserInfo, (req,res,next)=>{
    console.log(req.query);
    let back_url = req.query.back_url;
    for(let item in req.query){
        if(item !== "back_url" && item !== "code" && item !== "state"){
            back_url += `&${item}=${req.query[item]}`;
        };
    };
    console.log(back_url);
    res.redirect(back_url);
});


const crypto = require("crypto");
const sha1 = require("sha1");
const accessTokenMiddle = require("../middlewares/accessToken.middleware.js");
const weixin = require("../../config/env.config");

router.get("/weixin",accessTokenMiddle.accessToken,accessTokenMiddle.ticket,function(req,res,next){
    console.log("这是req.query里面的参数=>>>>>>>>>>>>>>>>>>>");
    console.log(JSON.stringify(req.query));
    crypto.randomBytes(16,function(ex,buf){
        var appId = weixin.appID;
        var noncestr = buf.toString("hex");
        var jsapi_ticket = req.query.ticket;
        var timestamp = new Date().getTime();
        timestamp = parseInt(timestamp/1000);
        var url = req.query.url;
        console.log("参数：");
        console.log(noncestr);
        console.log(jsapi_ticket);
        console.log(timestamp);
        console.log(url);

        var str = ["noncestr=" + noncestr, "jsapi_ticket="+jsapi_ticket, "timestamp=" + timestamp, "url=" + url].sort().join("&");
        console.log("字符串");
        console.log(str);
        var signature = sha1(str);

        console.log("签名：");
        console.log("signature:")
        console.log(signature);

        var result = {code:0,result:{appId:appId,timestamp: timestamp,nonceStr: noncestr,signature: signature}};

        res.json(result);
    });
});


// router.get("/set", (req, res, next)=>{
//     redisClient.set("username", "liuwenchao");
//     res.send("hello world");
// });

// router.get("/get", (req, res, next)=>{
//     redisClient.get("username", (err, result)=>{
//         res.send(result);
//     });
// });

module.exports = router;