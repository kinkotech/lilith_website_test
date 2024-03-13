<script setup lang="ts">
import { ref, reactive } from 'vue';
import wx from 'weixin-js-sdk';
import Clipboard from 'clipboard';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import api from '@/api';
import {useRouter} from 'vue-router';

const router = useRouter();
const route = router.currentRoute.value;

// 正常情况下我们默认query中的参数都是string类型。
let isInvitation = ref(route.query.isInvitation as string); // 通过地址参数判断，是否是被邀请人

const state = reactive({
    appId: '',
    timestamp: 0,
    nonceStr: '',
    signature: '',
	text: '邀请好友预约，免费得红包封面!-剑与远征:启程官方网站https://test-lilith.kinkotec.cn/?isInvitation=true',
	desc: '就差你啦!助我领取《剑与远征:启程》新春红包封面点击链接[立即预约]完成...',
    fxUrl: location.href + '?isInvitation=true',
    title: '邀请好友预约，免费得红包封面!-剑与远征:启程官方网站',
    fxImgUrl: 'https://test-lilith.kinkotec.cn/share.png'
})

const clipboard = new Clipboard('.copy-btn'); // .copy-btn为按钮元素的class名称或选择器

// 重定向到活动页面
if (isInvitation.value == 'true') {
    router.push('/?isInvitation=true')
}

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
const share = (params: any) => {
    let { appId, timestamp, nonceStr, signature, title, fxUrl, fxImgUrl, desc } = params;
    console.log('params', params)

    wx.config({
        debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId,        // 必填，公众号的唯一标识，填自己的！
        timestamp: Number(timestamp), // 必填，生成签名的时间戳，刚才接口拿到的数据
        nonceStr,   // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList: [
        'updateTimelineShareData',
        'updateAppMessageShareData'
        ]
    })

    wx.ready(function () {
        // “分享到朋友圈”及“分享到QQ空间”
        wx.updateTimelineShareData({
            title,   // 分享时的标题
            link: location.href + '?isInvitation=true',     // 分享时的链接
            imgUrl: 'https://test-lilith.kinkotec.cn/share.png',    // 分享时的图标
            success: function () {
                console.log("分享成功");
            },
            cancel: function () {
                console.log("取消分享");
            }
        });
        // “分享给朋友”及“分享到QQ”
        wx.updateAppMessageShareData({
            title,
            desc: '就差你啦!助我领取《剑与远征:启程》新春红包封面点击链接[立即预约]完成...', 
            link: location.href + '?isInvitation=true',
            imgUrl: 'https://test-lilith.kinkotec.cn/share.png',
            success: function () {
                console.log("分享成功");
            },
            cancel: function () {
                console.log("取消分享");
            }
        });
    })
}

// 分享接口
const getShareParam = async () => {
    let params = {
        // url: encodeURIComponent(location.origin + '/?isInvitation=true')
        // url: location.origin + '/?isInvitation=true'
        url: location.href + '?isInvitation=true'
    }
    await api.getShare(params).then(res => {
        console.log('getShare', res)
        state.appId = res.APP_ID;
        state.timestamp = res.timestamp;
        state.nonceStr = res.nonceStr;
        state.signature = res.signature;
        share(state)
    })
}
getShareParam()


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
#app {
    width: 100%;
}
.share {
    width: 10rem;
    height: 100%;
    // margin: 0 auto;
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
