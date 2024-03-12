<script setup lang="ts">
import { defineEmits } from 'vue';
import { showToast } from 'vant';
import Clipboard from 'clipboard';
import 'vant/es/toast/style';

const emit = defineEmits(['closePop']);

const sequenceCode = '123123'; // 序列码
const clipboard = new Clipboard('.button'); // .copy-btn为按钮元素的class名称或选择器

clipboard.on('success', (e) => {
    console.log('已复制到剪贴板！');
    showToast('序列码已复制');
    e.clearSelection(); // 清除选中文本
});

clipboard.on('error', () => {
    console.warn('无法复制到剪贴板！');
});

// 关闭弹窗
const closePop=()=>{
  //传递给父组件
  emit('closePop', false)
}

</script>

<template>
	<div class="red-envelope">
		<div class="red-envelope-box">
			<div class="title"><img src="@/assets/img/dialog/red-envelope-title.png" alt=""></div>
			<div class="sub-title"><img src="@/assets/img/dialog/red-envelope-sub-title.png" alt=""></div>
			<div class="img"><img src="@/assets/img/dialog/red-envelope.png" alt=""></div>
			<div class="sequence-code-box">
				<div class="sequence-code-img"><img src="@/assets/img/dialog/sequence-code-text.png" alt=""></div>
				<div>：</div>
				<span class="sequence-code-text">{{ sequenceCode }}</span>
			</div>
			<van-form>
				<div class="confirm-box">
					<van-button class="button" @click="closePop" :data-clipboard-text="sequenceCode"></van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.red-envelope {
	width: 100%;
	height: 11rem;
	background: url('@/assets/img/dialog/dialog-bg3.png') no-repeat;
	background-size: 100% auto;
	position: relative;
	.red-envelope-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			width: 2rem;
			margin-top: 1.7rem;
		}
		.sub-title {
			width: 3rem;
			margin-top: -.15rem;
		}
		.img {
			width: 3.4rem;
			margin-top: .1rem;
		}
		.sequence-code-box {
			display: flex;
			align-items: center;
			color: #A63A20;
			font-weight: 400;
			margin-top: -.15rem;
			.sequence-code-img {
				width: 1.1rem;
			}
			.sequence-code-text {
				text-align: center;
				font-size: .4rem;
				font-weight: bolder;
			}
		}
		.van-form {
			position: relative;

			.confirm-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				bottom: -3.5rem;

				.button {
					width: 4.5rem;
					height: 1.5rem;
					background: url('@/assets/img/dialog/sequence-code-button.png') no-repeat;
					background-size: 100% auto;
					border: 0;
					border-radius: 0;
				}
			}
		}
	}

	::v-deep .van-cell {
		padding: .1rem .3rem;
		background: $dialog-background-color;
	}
}
</style>