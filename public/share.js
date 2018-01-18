/*
* @Author: Porco_Mar
* @Date:   2017-12-29 16:29:46
* @Last Modified by:   Porco_Mar
* @Last Modified time: 2017-12-29 16:30:42
*/
function SHARE(title, desc, shareUrl, logo) {        
    wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //分享
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: logo, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                用户确认分享后执行的回调函数
                alert("分享成功！");
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            },
            fail: function(err) {
                alert("分享失败");
            }
        });
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: logo, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
        },
        cancel: function () {
        // 用户取消分享后执行的回调函数
        }
        });
        wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: logo, // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
            }
        });
    });
    wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //alert("Error");
    });
}  