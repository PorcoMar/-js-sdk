
//const redis = require("redis");
//const redisClient = redis.createClient();

// **
// 
const express = require('express');
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const querystring = require('querystring');
const url = require('url');
const cheerio = require('cheerio')


const indexjs = require("../workJS/workJS").indexTest
const callBack = require("../workJS/workJS").callBack
const nodeAPI = require("../workJS/nodeAPI").api

const REQUEST = require('../utils/request').requestList
router.get("/", authMiddleware.getCode, (req,res,next)=>{
    console.log("<------------------'/'----------------------->")
    res.sendFile(path.join(__dirname, "../views/index.html"));
})
router.get("/userList", authMiddleware.getCode, (req,res,next)=>{
    //res.send("userList");
    res.sendFile(path.join(__dirname,"../views/userList.html")) //可以改不用重新启动服务
    //res.sendFile(path.join(__dirname,"../../public/html/userList.html"))//不建议这么写，前端模版从public／index.html进入
});
// router.get("/second", authMiddleware.getCode,authMiddleware.getAccess_token, (req,res,next)=>{ //我后来发现这样写没什么必要，因为在'/'时已经获取到了所有信息并存在cookie中了
router.get("/second", authMiddleware.getCode, (req,res,next)=>{ //写authMiddleware.getCode在这里的原因是cookies失效时重新获取cookie
    console.log("<------------------'/second'----------------------->")
    console.log('--获取路径--')
    console.log(req.url)

    console.log('--获取path和参数--')
    req.query.abc = 'pppppp'
    console.log(req.query)

    console.log('--获取路由当前安装的url路径--')
    console.log(req.baseUrl)
    
    console.log('--获取主体和cookies--')
    console.log(req.cookies) 
    console.log(req.body)

    console.log('--获取主机名/ip--')
    console.log(req.hostname)
    console.log(req.ip)

    console.log('--获取请求路径--')
    console.log(req.path)

    console.log('--获取协议路径--')
    console.log(req.protocol)

    console.log('--获取当前匹配的路由--')
    console.log(req.route)

    let result = indexjs();
    console.log("-------->|这是workJS的引用内容的结果")
    console.log(result)
    res.render('second', { name: req.cookies.nickname,list:result, cookie:req.cookies,});
})
router.get("/callBack", authMiddleware.getCode, (req,res,next)=>{
    let back = callBack()
    console.log(back)
    res.render("callBack",{name:"this is callBack",list:back})
});

router.get('/forth', authMiddleware.getCode, (req,res,next) => { //输入 ： /forth?name=porco&sex=male
    console.log('<---------------/forth-------------------->')
    const api = nodeAPI(req,res,next);
        
//render
    res.render('forth',{})
})

router.get("/getUserInfo",authMiddleware.getAccess_token, authMiddleware.getUserInfo, (req,res,next)=>{
    console.log("<------------------'/getUserInfo'----------------------->")
    console.log('----->|查询的url字符串参数 ：'+JSON.stringify(req.query));
    let back_url = req.query.back_url;
    for(let item in req.query){
        if(item !== "back_url" && item !== "code" && item !== "state"){
            back_url += `&${item}=${req.query[item]}`;
        };
    };
    console.log('---->|重新筛选路径back_url : '+back_url);
    res.redirect(back_url);
});


const crypto = require("crypto");
const sha1 = require("sha1");
const accessTokenMiddle = require("../middlewares/accessToken.middleware.js");
const weixin = require("../../config/env.config");

router.get("/weixin",accessTokenMiddle.accessToken,accessTokenMiddle.ticket,function(req,res,next){
    console.log("<------------------'/weixin'----------------------->")
    console.log('----->| req.query : '+JSON.stringify(req.query));
    crypto.randomBytes(16,function(ex,buf){
        var appId = weixin.appID;
        var noncestr = buf.toString("hex");
        var jsapi_ticket = req.query.ticket;
        var timestamp = new Date().getTime();
        timestamp = parseInt(timestamp/1000);
        var url = req.query.url;
        console.log("参数 ：");
        console.log(noncestr);
        console.log(jsapi_ticket);
        console.log(timestamp);
        console.log(url);

        var str = ["noncestr=" + noncestr, "jsapi_ticket="+jsapi_ticket, "timestamp=" + timestamp, "url=" + url].sort().join("&");
        console.log("待混淆加密的字符串 ： ");
        console.log(str);
        var signature = sha1(str);

        console.log("微信sdk签名signature ：");
        console.log(signature);

        var result = {code:0,result:{appId:appId,timestamp: timestamp,nonceStr: noncestr,signature: signature}};

        res.json(result); //res.json 等同于将一个对象或数组传到给res.send()
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