<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['closePop']);
// 关闭弹窗
const closePop=()=>{
  //传递给父组件
  emit('closePop', false)
}

</script>

<template>
	<div class="scan">
		<div class="scan-box">
			<div class="title"><img src="@/assets/img/dialog/scan-title.png" alt=""></div>
			<div class="img"><img src="@/assets/img/dialog/qcode.png" alt=""></div>
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

.scan {
	width: 100%;
	height: 7.5rem;
	background: url('@/assets/img/dialog/dialog-bg2.png') no-repeat;
	background-size: 100% auto;
	position: relative;
	.scan-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: .3rem;
		.title {
			width: 4rem;
		}
		.img {
			width: 3rem;
			margin-top: .3rem;
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
					background: url('@/assets/img/dialog/confirm-button.png') no-repeat;
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