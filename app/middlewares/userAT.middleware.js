// // 用户小程序Access_Token
// var config = require('../../config/env.config');
// const request = require("request");
// const fs = require("fs");

// // 判断access_token是否存在
// function isValide() {
//     var result = fs.readFileSync("./config/user_access_token.json").toString();
//     if (result) {
//         result = JSON.parse(result);
//         var now = new Date().getTime();
//         if (result.access_token && result.expires_in && now < result.expires_in) {
//             console.log("access_token is valide");
//             return { code: 0, result: result.access_token };
//         } else {
//             console.log("access_token is not valide");
//             return { code: 1001 };
//         }
//     } else {
//         return { code: 1001 };
//     };
// }

// exports.accessToken = function(req, res, next) {
//     var valide = isValide();
//     if (valide.code === 0) {
//         req.query.access_token = valide.result;
//         next();
//     } else {
//         var appid = config.userAppID;
//         var secret = config.userAppSecret;
//         var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
//         request(url, function(error, response, body) {
//             var result = JSON.parse(body);
//             var now = (new Date().getTime());
//             result.expires_in = now + (result.expires_in - 20)*1000 ;
//             fs.writeFileSync("./config/user_access_token.json", JSON.stringify(result));

//             req.query.access_token = result.access_token;
//             req.query.tokenExpired = result.expires_in;
//             next();
//         });
//     };
// };