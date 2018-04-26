const weixinConfig = require("../../config/env.config.js");
const request = require("request");
const fs = require("fs");

//获取accessToken
exports.accessToken = function(req, res, next) {
    console.log("<------------------'获取snsapi_userinfo accessToken'----------------------->")
    var valide = isValide(); //{ code: 0, result: result.access_token } or{code:1001}
    if (valide.code === 0) {//access_token还没过期，用以前的
        req.query.access_token = valide.result;
        next();
    } else {//重新获取access_token && expire_in
        var appid = weixinConfig.appID;
        var secret = weixinConfig.appsecret;
        var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
        request(url, function(error, response, body) {
            var result = JSON.parse(body);
            var now = (new Date().getTime()); //new Date().getTime() 获得的是毫秒
            result.expires_in = now + (result.expires_in - 20)*1000 ;//expire_in一般是7200s 提前20毫秒

            req.query.access_token = result.access_token;//new access_token
            req.query.tokenExpired = result.expires_in; // 7200s
            next();
        });
    };
};

//获取ticket
exports.ticket = function(req, res, next) {
    console.log("<------------------'获取ticket'----------------------->")
    var ticketResult = isTicket();
    if (ticketResult.code === 0) {
    	console.log('已经有了ticket : '+JSON.stringify(ticketResult));
        req.query.ticket = ticketResult.result;
        next();
    } else {
        console.log("开始获取ticket");
        var access_token = req.query.access_token;
        var _tokenResult = {
            access_token: req.query.access_token,
            expires_in: req.query.tokenExpired
        }
        var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";
        request(url, function(err, response, body) {
            var result = JSON.parse(body);
            console.log(result);
            if (result.errcode == "0") {
                var now = (new Date().getTime());
                result.expires_in = now + (result.expires_in - 20) * 1000; //   改变时间为当前时间的两小时后
                fs.writeFileSync("./config/access_token.json", JSON.stringify(_tokenResult));//fs.writeFileSync:以同步的方式将data写入文件，文件已存在的情况下，原内容将被替换。
                fs.writeFileSync("./config/ticket.json", JSON.stringify(result));
                console.log('异步写入access_token ticket.json')
                req.query.ticket = result.ticket;
                next();
            };
        });
    };
};

function isValide() { //有效
    let strn = fs.readFileSync("./config/access_token.json")
    let strn2 = strn.toString()
    console.log('-=-=-=-=-||-=-=-===-=-=-==')
    console.log(typeof strn , strn )
    console.log(typeof strn2 , strn2 )
    var result = fs.readFileSync("./config/access_token.json").toString();//同步读取json文件
    if (result) {
        result = JSON.parse(result);
        var now = new Date().getTime();
        if (result.access_token && result.expires_in && now < result.expires_in) {
            console.log("access_token 还在7200s以内，没有过期");//access_token有效 expires_in应该指的是距离生成时间的7200秒后
            return { code: 0, result: result.access_token };
        } else {
            console.log("access_token 失效");
            return { code: 1001 };
        }
    } else {
        return { code: 1001 };
    };
};



function isTicket() {
    var result = fs.readFileSync("./config/ticket.json").toString();
    console.log("result:",result);
    if (result) {
        result = JSON.parse(result);
        console.log(result);
        var now = new Date().getTime();
        if (result.ticket && result.expires_in && now < result.expires_in) {
            console.log("ticket有效，沿用当前ticket.json里的ticket");
            return { code: 0, result: result.ticket };
        } else {
            console.log("ticket无效需要获取");
            return { code: 1001 };
        }
    } else {
        return { code: 1001 };
    };
}
