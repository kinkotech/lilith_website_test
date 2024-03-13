<script setup lang="ts">
import { reactive } from 'vue';
import wx from 'weixin-js-sdk';
import Clipboard from 'clipboard';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import api from '@/api';
import sha1 from "sha1";
// import wxShare from './share.js';

// //分享文案
// const shareData = {
//     title: "分享标题",
// 	link: "分享链接",
// 	imgUrl: "分享小图",
// 	desc: "分享说明"
// }
// //微信分享
// wxShare(shareData)

const state = reactive({
	ACCESS_TOKEN: '',
    jsapi_ticket: ''
})


// 第一步 获取ACCESS_TOKEN
const getWxAccessToken = async () => {
    let params = {
        grant_type: 'client_credential',
        appid: 'wxa039b9f506b604a7',
        secret: 'a654965dc956533da7e0514c46a90e99'
    }
    await api.getWxAccessToken(params).then((res) => {
        // {"access_token":"ACCESS_TOKEN","expires_in":7200}
        console.log('getWxAccessToken', res)
        state.ACCESS_TOKEN = res.ACCESS_TOKEN;
    })
}
// 第二步 获取jsapi_ticket
const getWxJsapiTicket = async () => {
    let params = {
        access_token: state.ACCESS_TOKEN,
        type: 'jsapi'
    }
    await api.getWxJsapiTicket(params).then((res) => {
        // {
        //     "errcode":0,
        //     "errmsg":"ok",
        //     "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
        //     "expires_in":7200
        // }
        console.log('getWxJsapiTicket', res)
        state.jsapi_ticket = res.ticket;
    })
}

const wxSign = (data: any) => {
    var urlN = window.location.href.split('#')[0]
    var timestampn = new Date().getTime().toString()
    var timestamp = timestampn.substring(0, 10) //生成签名的时间戳
    var nonceStr = Math.random().toString(36).substr(2) //生成签名的随机串
    var con = `jsapi_ticket=${data.ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${urlN}`
    var signature = sha1(con) //签名
    //签名处理后参数
    return {
        appId: 'wxa039b9f506b604a7',
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature
    }
}

await getWxAccessToken();
await getWxJsapiTicket();

let config = wxSign({ ticket: state.jsapi_ticket})

console.log('config', config)




const text = '邀请好友预约，免费得红包封面!-剑与远征:启程官方网站https://test-lilith.kinkotec.cn/'
const clipboard = new Clipboard('.copy-btn'); // .copy-btn为按钮元素的class名称或选择器

clipboard.on('success', (e) => {
    console.log('已复制到剪贴板！');
    showToast('复制成功');
    e.clearSelection(); // 清除选中文本
    //跟踪事件的的埋点
	(window as any).gtag('event', 'cta_click', {
		event_category: 'click',
		event_label: 'duplicate_share'
	});
});

clipboard.on('error', () => {
    console.warn('无法复制到剪贴板！');
});

// 分享
// let appId = 'wxa039b9f506b604a7';
// let timestamp: any = '';
// let nonceStr = '';
// let signature = '';
// let fxUrl = 'https://lilith.kinkotec.cn/?isInvitation=true';
// let title = '邀请好友预约，免费得红包封面!-剑与远征:启程官方网站';
// let fxImgUrl = 'https://test-lilith.kinkotec.cn/fx.png';
// wx.config({
//     debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId,         // 必填，公众号的唯一标识，填自己的！
//     timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
//     nonceStr,   // 必填，生成签名的随机串
//     signature, // 必填，签名，见附录1
//     jsApiList: [
//     'onMenuShareTimeline',
//     'onMenuShareAppMessage'
//     ]
// })

// wx.ready(function () {
//     //分享到朋友圈
//     wx.onMenuShareTimeline({
//         title,   // 分享时的标题
//         link: fxUrl,     // 分享时的链接
//         imgUrl: fxImgUrl,    // 分享时的图标
//         success: function () {
//             showToast("分享成功");
//         },
//         cancel: function () {
//             showToast("取消分享");
//         }
//     });
//     //分享给朋友
//     wx.onMenuShareAppMessage({
//         title,
//         desc: '就差你啦!助我领取《剑与远征:启程》新春红包封面点击链接[立即预约]完成...', 
//         link: fxUrl,
//         imgUrl: fxImgUrl,
//         type: 'link',
//         dataUrl: '', 
//         success: function () {
//             showToast("分享成功");
//         },
//         cancel: function () {
//             showToast("取消分享");
//         }
//     });
// })
</script>

<template>
	<div class="share">
        <div class="share-box">
            <div class="copy-btn" :data-clipboard-text="text">
                <img src="@/assets/img/copy-button.png" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.share {
    width: 100%;
    height: 100%;
    background: $dialog-background-color;
    font-family: 思源黑体(Source Han Sans);
    &-box {
        width: 100%;
        height: 100%;
        background: url('@/assets/img/share.png') no-repeat;
        background-size: 100% auto;
        position: relative;
        .copy-btn {
            position: absolute;
            bottom: 1.5rem;
            width: 5.8rem;
            left: 50%;
            margin-left: -2.9rem;
        }
    }
}
</style>
