import wx from 'weixin-js-sdk';

export default function (opts) {
    let { config, data, success, cancel } = opts
    wx.config({
        debug: false, //开启调试模式
        appId: config.appId, //公众号的唯一标识
        timestamp: config.timestamp, //生成签名的时间戳
        nonceStr: config.nonceStr, //生成签名的随机串
        signature: config.signature, //签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'checkJsApi'] //需要使用的JS接口列表
    })
    wx.ready(function () {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: data.title, // 分享标题
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.imgUrl, // 分享图标
            success: function (res) {
                success && success(res)
            },
            cancel: function (res) {
                cancel && cancel(res)
            }
        })

        // 分享给朋友
        wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.imgUrl, // 分享图标
            desc: data.desc, // 描述
            success: function (res) {
                success && success(res)
            },
            cancel: function (res) {
                cancel && cancel(res)
            }
        })

        wx.hideMenuItems({
            menuList: [
                'menuItem:editTag',
                'menuItem:delete',
                'menuItem:copyUrl',
                'menuItem:originPage',
                'menuItem:openWithQQBrowser',
                'menuItem:openWithSafari',
                'menuItem:share:email',
                'menuItem:share:brand',
                'menuItem:share:qq',
                'menuItem:share:weiboApp',
                'menuItem:share:facebook',
                'menuItem:share:QZone'
            ]
        })
    })
}

//是否显示分享
// export function showWxShare(is) {
//     if (typeof WeixinJSBridge == 'undefined') {
//         if (document.addEventListener) {
//             if (is === true) {
//                 document.addEventListener(
//                     'WeixinJSBridgeReady',
//                     function () {
//                         WeixinJSBridge.call('showOptionMenu')
//                     },
//                     false
//                 )
//             } else {
//                 document.addEventListener(
//                     'WeixinJSBridgeReady',
//                     function () {
//                         WeixinJSBridge.call('hideOptionMenu')
//                     },
//                     false
//                 )
//             }
//         } else if (document.attachEvent) {
//             if (is === true) {
//                 document.attachEvent('WeixinJSBridgeReady', function () {
//                     WeixinJSBridge.call('showOptionMenu')
//                 })
//                 document.attachEvent('onWeixinJSBridgeReady', function () {
//                     WeixinJSBridge.call('showOptionMenu')
//                 })
//             } else {
//                 document.attachEvent('WeixinJSBridgeReady', function () {
//                     WeixinJSBridge.call('hideOptionMenu')
//                 })
//                 document.attachEvent('onWeixinJSBridgeReady', function () {
//                     WeixinJSBridge.call('hideOptionMenu')
//                 })
//             }
//         }
//     } else {
//         if (is === true) {
//             WeixinJSBridge.call('showOptionMenu')
//         } else {
//             WeixinJSBridge.call('hideOptionMenu')
//         }
//     }
// }
