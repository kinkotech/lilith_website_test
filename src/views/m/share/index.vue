<script setup lang="ts">
import { ref, reactive } from 'vue';
import wx from 'weixin-js-sdk';
import Clipboard from 'clipboard';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import api from '@/api';

const state = reactive({
    appId: '',
    timestamp: 0,
    nonceStr: '',
    signature: '',
	text: '邀请好友预约，免费得红包封面!-剑与远征:启程官方网站https://test-lilith.kinkotec.cn/',
	desc: '就差你啦!助我领取《剑与远征:启程》新春红包封面点击链接[立即预约]完成...',
    fxUrl: 'https://lilith.kinkotec.cn/?isInvitation=true',
    title: '邀请好友预约，免费得红包封面!-剑与远征:启程官方网站',
    fxImgUrl: 'https://test-lilith.kinkotec.cn/fx.png'
})

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

// 分享接口
const getShareParam = async () => {
    await api.getShare().then(res => {
        console.log(res)
        state.appId = res.APP_ID;
        state.timestamp = res.timestamp;
        state.nonceStr = res.nonceStr;
        state.signature = res.signature;
    })
}
await getShareParam()

let { appId, timestamp, nonceStr, signature, title, fxUrl, fxImgUrl, desc } = state;
console.log(state)

// 分享
wx.config({
    debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId,        // 必填，公众号的唯一标识，填自己的！
    timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
    nonceStr,   // 必填，生成签名的随机串
    signature, // 必填，签名，见附录1
    jsApiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
    ]
})

wx.ready(function () {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title,   // 分享时的标题
        link: fxUrl,     // 分享时的链接
        imgUrl: fxImgUrl,    // 分享时的图标
        success: function () {
            showToast("分享成功");
        },
        cancel: function () {
            showToast("取消分享");
        }
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
        title,
        desc, 
        link: fxUrl,
        imgUrl: fxImgUrl,
        type: 'link',
        dataUrl: '', 
        success: function () {
            showToast("分享成功");
        },
        cancel: function () {
            showToast("取消分享");
        }
    });
})
</script>

<template>
	<div class="share">
        <div class="share-box">
            <div class="copy-btn" :data-clipboard-text="state.text">
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
