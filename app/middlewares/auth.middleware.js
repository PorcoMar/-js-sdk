const config = require("../../config/env.config");
const request = require("request");
const appid = config.appID;
const appsecret = config.appsecret;
/*获取code*/
exports.getCode = function(req,res,next){
    console.log("<------------------获取code----------------------->");
    console.log('--|cookies : '+ JSON.stringify(req.cookies));
    if(req.cookies.openid){
        next();
    }else{
        let back_url = escape(req.url);//解码，解决url？后面参数返回消失问题 2.req.url 获取URL
        console.log('获取的url路由参数为 ：'+back_url)
        //let redirect_uri = `http://ssl.weikeyisheng.com/getUserInfo?back_url=${back_url}`;
        let redirect_uri = `http://mall.yizhenjia.com/getUserInfo?back_url=${back_url}`;    //注意这里执行了getUserInfo路由
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `;
        console.log('重定向的url : '+url);
        //next();
        res.redirect(url);//res.redirect()重定向跳转 参数仅为URL时和res.location(url)一样
    };
};

/*获取access_token*/
exports.getAccess_token = (req,res,next)=>{
    console.log("<------------------获取snsapi_base access_token----------------------->")
    console.log(JSON.stringify(req.query))
    let code = req.query.code;
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code `;
    request(url, (err, httpResponse, body)=>{
        console.log(err);
        console.log('--||--code换取的所有信息 ：'+body);
        let result = JSON.parse(body);
        req.access_token = result.access_token;
        req.openid = result.openid;
        next();
    })
};

/*获取微信用户信息*/
exports.getUserInfo = (req,res,next)=>{
    console.log("<-----------------获取getUserInfo--------------------->")
    console.log('----->req.access_token : '+req.access_token);
    let access_token = req.access_token;
    let openid = req.openid;
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    request(url, (err,httpResponse,body)=>{
        console.log("---->--通过access_token和openid获取到的用户个人信息 :")
        console.log(body);
        let result = JSON.parse(body);
        res.cookie("openid", result.openid, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
        res.cookie("nickname", result.nickname, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
        res.cookie("headimgurl", result.headimgurl, {maxAge: 24 * 60 * 60 * 10000, httpOnly: false});
        res.cookie("unionid", result.unionid, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false})
        next();
    })
}


