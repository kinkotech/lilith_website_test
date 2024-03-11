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
	<div class="end">
		<div class="end-box">
			<div class="title"><img src="@/assets/img/dialog/end-title.png" alt=""></div>
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

.end {
	width: 100%;
	height: 7.5rem;
	padding: 1.4rem .2rem;
	background: url('@/assets/img/dialog/dialog-bg.png') no-repeat;
	background-size: 100% 100%;
	position: relative;
	.end-header {
		width: 100%;
		position: absolute;
		top: -2.8rem;

		.end-top {
			display: flex;
			flex-direction: column;
			align-items: center;

			.top-icon {
				width: 4rem;
			}

			.text-icon {
				width: 5rem;
				margin-top: .15rem;
			}
		}

		.end-title {
			display: flex;
			justify-content: center;
			align-items: center;

			.icon {
				width: 2rem;
			}

			.text-icon {
				width: 3.2rem;
				margin: .1rem .2rem;
			}
		}
	}

	.end-box {
		width: 100%;
		height: 100%;
		padding-top: .3rem;
		background: $dialog-background-color;
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			width: 2.3rem;
			margin-top: 1.2rem;
		}

		::v-deep .van-form {
			background: $dialog-background-color;
		}

		.van-form {
			position: relative;
			margin-top: .5rem;
			.confirm-box {
				width: 100%;

				.button {
					width: 4rem;
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