<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { showToast } from 'vant';
import { sessionStorage } from '@/utils/storage';
import 'vant/es/toast/style';

const checked = ref(false);
const username = ref('');
const code = ref('');
const invitationCode = ref('usahdgsauxcgh');
const count = ref(60);
const counting = ref(false);

const emit = defineEmits(['closePop']);
// 关闭弹窗
const closePop=()=>{
  //传递给父组件
  emit('closePop', false)
}

// 发送验证码
const sendVerificationCode = () => {
	// 发送请求成功后开始倒计时
	counting.value = true;
	const timer = setInterval(() => {
		count.value--;
		if (count.value === 0) {
			clearInterval(timer)
			count.value = 60;
			counting.value = false;
		}
	}, 1000)
}

// 登录
const onSubmit = (values: any) => {
	if (values.number == '') {
		showToast('请输入手机号');
	} else if (values.code == '') {
		showToast('请输入验证码');
	} else if (!values.radio) {
		showToast('请先勾选隐私协议和服务条款');
	} else {
		const list = [{
			id: '001',
			num: '189****8989',
			time: '02/16 19:00'
		}, {
			id: '002',
			num: '189****8989',
			time: '02/16 19:00'
		}, {
			id: '003',
			num: '189****8989',
			time: '02/16 19:00'
		}, {
			id: '004',
			num: '189****8989',
			time: '02/16 19:00'
		}, {
			id: '005',
			num: '189****8989',
			time: '02/16 19:00'
		}, {
			id: '006',
			num: '189****8989',
			time: '02/16 19:00'
		}, {
			id: '007',
			num: '189****8989',
			time: '02/16 19:00'
		}]
		sessionStorage.set('friendsList', list)
		emit('closePop', false)
		showToast('登录成功');
	}
	console.log('submit', values);
};

</script>

<template>
	<div class="login">
		<div class="close" @click="closePop">
			<img src="@/assets/img/dialog/close.png" alt="">
		</div>
		<div class="login-header">
			<div class="login-top">
				<img src="@/assets/img/dialog/dialog-top.png" alt="" class="top-icon">
				<img src="@/assets/img/dialog/login-title-text-num.png" alt="" class="text-icon">
			</div>
			<div class="login-title">
				<img src="@/assets/img/dialog/dialog-left.png" alt="" class="icon">
				<img src="@/assets/img/dialog/login-title-text-task.png" alt="" class="text-icon">
				<img src="@/assets/img/dialog/dialog-right.png" alt="" class="icon">
			</div>
		</div>
		<div class="login-box">
			<van-form @submit="onSubmit">
				<van-cell-group inset>
					<van-field v-model="username" type="tel" name="number" placeholder="输入您的手机号" maxlength="11" />
					<van-field v-model="code" name="code" center clearable placeholder="输入验证码" maxlength="4">
						<template #button>
							<div class="send-code-icon" v-if="!counting">
								<img src="@/assets/img/dialog/code-button.png" alt="发送验证码"
									@click="sendVerificationCode">
							</div>
							<div class="send-code-disable" v-else>
								{{ `${count}s 后重新获取` }}
							</div>
						</template>
					</van-field>
					<van-field name="invitationCode" v-model="invitationCode">
						<template #input>
							<div class="invitation-code-box">
								<div class="icon">
									<img src="@/assets/img/dialog/invitation-code-label.png" alt="">
								</div>
								<div class="text">{{ invitationCode }}</div>
							</div>
						</template>
					</van-field>
					<van-field name="radio">
						<template #input>
							<van-checkbox v-model="checked">
								<template #icon="props">
									<div class="inactive"><span class="active" v-if="props.checked"></span></div>
								</template>
								<span>我已阅读理解并同意</span>
								<span class="line"><a href="https://www.lilith.com/privacy">隐私协议</a></span>
								<span>和</span>
								<span class="line"><a href="https://www.lilith.com/termofservice">服务条款</a></span>
							</van-checkbox>
						</template>
					</van-field>
				</van-cell-group>
				<div class="confirm-box">
					<van-button round block type="primary" native-type="submit" class="button"></van-button>
					<div class="text">绑定手机号登录即视为预约游戏</div>
				</div>
			</van-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login {
	width: 100%;
	height: 7.5rem;
	padding: 1.4rem .2rem;
	background: url('@/assets/img/dialog/dialog-bg.png') no-repeat;
	background-size: 100% 100%;
	position: relative;
	.close {
		position: absolute;
		right: 0;
		top: 0;
		width: .4rem;
	}
	.login-header {
		width: 100%;
		position: absolute;
		top: -3.5rem;

		.login-top {
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

		.login-title {
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

	.login-box {
		width: 100%;
		height: 100%;
		padding-top: .3rem;
		background: $dialog-background-color;

		::v-deep input {
			padding: .1rem .2rem;
			color: #A63A20;
			border: 1px solid #E5AF6B;
			border-radius: .1rem;
			font-weight: 500;
			background: #fff;
			font-size: .33rem;
		}

		::v-deep .van-form {
			background: $dialog-background-color;
		}

		.van-form {
			position: relative;

			::v-deep .van-cell-group {
				background: $dialog-background-color;
			}

			::v-deep .van-cell-group--inset {
				margin: 0;
			}

			.send-code-icon {
				width: 2.6rem;
				display: flex;
				justify-content: center;
			}

			.send-code-disable {
				padding: .1rem;
				background: #ccc;
				border-radius: .08rem;
				color: #fff;
			}

			::v-deep .van-checkbox__icon {
				display: flex;
				align-items: center;
			}

			.inactive {
				display: flex;
				align-items: center;
				justify-content: center;
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
				border: 2px solid $theme-color;
				background: $dialog-background-color;
			}

			.active {
				display: inline-block;
				width: .15rem;
				height: .15rem;
				border-radius: 50%;
				background: $theme-color;
			}

			::v-deep .van-checkbox__label span,
			a {
				color: $theme-color;
				font-family: "Source Han Sans CN";
				font-size: .26rem;
				font-style: normal;
				font-weight: 500;
				/* 200% */
				letter-spacing: 2px;

				a {
					display: inline-block;
					line-height: .2rem;
					border-bottom: 1px solid $theme-color;
				}
			}

			.invitation-code-box {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon {
					width: 1.6rem;
					display: flex;
					justify-content: center;
				}

				.text {
					flex: 1;
					margin-left: .2rem;
					padding: .17rem 0;
					text-align: center;
					background: #E5AF6B;
					border: 1.5px solid #FFF;
					border-radius: .08rem;
					color: $theme-color;
					font-size: .33rem;
					font-weight: 500;
					letter-spacing: 2.5px;
				}
			}

			.confirm-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				bottom: -4rem;

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