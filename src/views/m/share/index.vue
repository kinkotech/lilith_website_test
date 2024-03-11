<script setup lang="ts">
import Clipboard from 'clipboard';
import { showToast } from 'vant';
import 'vant/es/toast/style';

const text = '邀请好友预约，免费得红包封面!-剑与远征:启程官方网站https://test-lilith.kinkotec.cn/'
const clipboard = new Clipboard('.copy-btn'); // .copy-btn为按钮元素的class名称或选择器

clipboard.on('success', (e) => {
    console.log('已复制到剪贴板！');
    showToast('复制成功');
    e.clearSelection(); // 清除选中文本
});

clipboard.on('error', () => {
    console.warn('无法复制到剪贴板！');
});

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
