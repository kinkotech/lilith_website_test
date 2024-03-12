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
	<div class="tip">
		<div class="tip-header">
			<div class="tip-top">
				<div class="top-icon">
					<img src="@/assets/img/dialog/dialog-top.png" alt="">
				</div>
			</div>
			<div class="tip-title">
				<div class="icon">
					<img src="@/assets/img/dialog/dialog-left.png" alt="">
				</div>
				<div class="text-icon">
					<img src="@/assets/img/dialog/tip-title.png" alt="">
				</div>
				<div class="icon">
					<img src="@/assets/img/dialog/dialog-right.png" alt="">
				</div>
			</div>
		</div>
		<div class="tip-box">
			<div class="p1"><img src="@/assets/img/dialog/p1.png" alt=""></div>
			<div class="p2"><img src="@/assets/img/dialog/p2.png" alt=""></div>
			<div class="p3"><img src="@/assets/img/dialog/p3.png" alt=""></div>
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

.tip {
	width: 6.8rem;
	height: 6.4rem;
	padding: 1.2rem .2rem;
	background: url('@/assets/img/dialog/dialog-bg.png') no-repeat;
	background-size: 100% auto;
	position: relative;
	margin: auto;
	.tip-header {
		width: 100%;
		position: absolute;
		top: -2.3rem;
		left: 0;
		.tip-top {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.top-icon {
				width: 2.5rem;
			}
		}

		.tip-title {
			display: flex;
			justify-content: center;
			align-items: center;

			.icon {
				width: 1.85rem;
			}

			.text-icon {
				width: 2.5rem;
				margin: .1rem .2rem;
			}
		}
	}

	.tip-box {
		width: 100%;
		height: 100%;
		padding-top: .3rem;
		background: $dialog-background-color;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.p1,.p2,.p3 {
			padding: 0;
			margin-top: .2rem;
		}
		.p1 {
			width: 3rem;
			margin-top: 0;
		}

		.p2 {
			width: 3.5rem;
		}

		.p3 {
			width: 5rem;
		}

		::v-deep .van-form {
			background: $dialog-background-color;
		}

		.van-form {
			position: relative;
			.confirm-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				bottom: -3.7rem;

				.button {
					width: 4.5rem;
					height: 1.5rem;
					background: url('@/assets/img/dialog/confirm-button.png') no-repeat;
					background-size: 100% auto;
					border: 0;
					border-radius: 0;
				}

				.text {
					color: #FFF;
					font-family: "Source Han Sans CN";
					font-size: .2rem;
					font-style: normal;
					font-weight: 700;
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