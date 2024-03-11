<script setup lang="ts">
import { defineEmits } from 'vue';
import { showToast } from 'vant';
import 'vant/es/toast/style';

const emit = defineEmits(['closePop']);
const sequenceCode = '12312312'; // 序列码
// 关闭弹窗
const closePop=()=>{
	showToast('序列码已复制');
  //传递给父组件
  emit('closePop', false, sequenceCode)
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
					<van-button class="button" @click="closePop"></van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.red-envelope {
	width: 100%;
	height: 14rem;
	background: url('@/assets/img/dialog/dialog-bg3.png') no-repeat;
	background-size: 100% auto;
	position: relative;
	.red-envelope-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: .3rem;
		.title {
			width: 2rem;
			margin-top: -.3rem;
		}
		.sub-title {
			width: 3rem;
			margin-top: -.1rem;
		}
		.img {
			width: 4.5rem;
			margin-top: .3rem;
		}
		.sequence-code-box {
			display: flex;
			align-items: center;
			color: #A63A20;
			font-weight: 400;
			.sequence-code-img {
				width: 1.1rem;
			}
			.sequence-code-text {
				text-align: center;
				font-size: .33rem;
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