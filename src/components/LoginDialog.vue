<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import { showToast } from 'vant';
import { storage, sessionStorage } from '@/utils/storage';
import 'vant/es/toast/style';

const checked = ref(false);
const username = ref('');
const code = ref('');
const invitationCode = ref('usahdgsauxcgh');
const count = ref(60);
const counting = ref(false);

const props = defineProps({
	// 是否是被邀请人
	isInvitation: {
		type: String,
		default: 'false'
	}
})

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
	const phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;

	if (values.number == '') {
		showToast('请输入手机号');
	} else if (!phoneReg.test(values.number) && values.number.length != 11) {
		showToast('手机号格式错误');
	} else if (values.code == '') {
		showToast('请输入验证码');
	} else if (values.code.length !== 6) {
		showToast('验证码错误');
	} else if (!values.radio) {
		showToast('请先勾选服务条款和隐私协议');
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
		sessionStorage.set('friendsList', list);
		storage.set('token', 'token-test')
		emit('closePop', false)
		showToast('登录成功');
	}
	// 测试toast，正式开发需按照接口异常结果返回对应toast内容
	setTimeout(() => {
		showToast('系统繁忙，请稍后重试');
	}, 1000)
	setTimeout(() => {
		showToast('操作频繁，请稍后重试');
	}, 2000)
	setTimeout(() => {
		showToast('请重新发送验证码');
	}, 3000)

	console.log('submit', values);
	//跟踪事件的的埋点
	(window as any).gtag('event', 'cta_click', {
		event_category: 'click',
		event_label: 'mobile_auth'
	});
};

</script>

<template>
	<div class="login">
		<div class="close" @click="closePop">
			<img src="@/assets/img/dialog/close.png" alt="">
		</div>
		<div class="login-header">
			<div class="login-top">
				<div class="top-icon">
					<img src="@/assets/img/dialog/dialog-top.png" alt="">
				</div>
				<div class="text-icon">
					<img src="@/assets/img/dialog/login-title-text-num.png" alt="">
				</div>
			</div>
			<div class="login-title">
				<div class="icon">
					<img src="@/assets/img/dialog/dialog-left.png" alt="">
				</div>
				<div class="text-icon">
					<img src="@/assets/img/dialog/login-title-text-task.png" alt="">
				</div>
				<div class="icon">
					<img src="@/assets/img/dialog/dialog-right.png" alt="">
				</div>
			</div>
		</div>
		<div class="login-box">
			<van-form @submit="onSubmit">
				<van-cell-group inset>
					<van-field v-model="username" type="tel" name="number" placeholder="输入您的手机号" maxlength="11" />
					<van-field v-model="code" name="code" center clearable placeholder="输入验证码" maxlength="6">
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
					<van-field name="invitationCode" v-model="invitationCode" v-if="props.isInvitation === 'true'">
						<template #input>
							<div class="invitation-code-box">
								<div class="icon">
									<img src="@/assets/img/dialog/invitation-code-label.png" alt="">
								</div>
								<div class="text">{{ invitationCode }}</div>
							</div>
						</template>
					</van-field>
					<van-field name="radio" class="radio-box">
						<template #input>
							<van-checkbox v-model="checked">
								<template #icon="props">
									<div :class="props.checked ? 'active' : 'inactive'"></div>
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
	width: 6.8rem;
	height: 6.4rem;
	padding: 1.2rem .2rem;
	background: url('@/assets/img/dialog/dialog-bg.png') no-repeat;
	background-size: 100% auto;
	position: relative;
	margin: auto;
	.close {
		position: absolute;
		right: 0;
		top: 0;
		width: .4rem;
	}
	.login-header {
		width: 100%;
		position: absolute;
		top: -2.6rem;
		left: 0;
		.login-top {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.top-icon {
				width: 2.5rem;
			}
			.text-icon {
				width: 4rem;
				margin-top: -.04rem;
			}
		}

		.login-title {
			margin-top: -.1rem;
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

	.login-box {
		width: 100%;
		height: 100%;
		padding-top: .23rem;
		background: $dialog-background-color;

		::v-deep input {
			padding: 0 .2rem;
			height: .72rem;
			line-height: .72rem;
			color: #A63A20;
			border: 1.5px solid #E5AF6B;
			border-radius: .1rem;
			font-weight: 500;
			background: #fff;
			font-size: .33rem;
		}
		.radio-box {
			margin-top: -.15rem;
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
				width: 2.1rem;
				display: flex;
				justify-content: center;
			}

			.send-code-disable {
				padding: .02rem .05rem;
				background: #ccc;
				border-radius: .08rem;
				color: #fff;
				font-size: .33rem;
			}

			::v-deep .van-checkbox__icon {
				display: flex;
				align-items: center;
			}

			.inactive,.active {
				width: .3rem;
				height: .3rem;
			}
			.inactive {
				background: url('@/assets/img/radio.png') no-repeat;
				background-size: 100% 100%;
			}

			.active {
				background: url('@/assets/img/radio-select.png') no-repeat;
				background-size: 100% 100%;
			}

			::v-deep .van-checkbox__label span,
			a {
				color: $theme-color;
				font-family: "Source Han Sans CN";
				font-size: .26rem;
				font-weight: 500;
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
					width: 1.2rem;
					display: flex;
					justify-content: center;
				}

				.text {
					flex: 1;
					margin-left: .2rem;
					height: .72rem;
					padding: .05rem 0;
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
				bottom: -3.5rem;

				.button {
					width: 4.5rem;
					height: 1.2rem;
					background: url('@/assets/img/dialog/confirm-button.png') no-repeat;
					background-size: 100% auto;
					border: 0;
					border-radius: 0;
				}

				.text {
					margin-top: .15rem;
					display: inline-block;
					color: #FFF;
					font-family: "Source Han Sans CN";
					font-size: .24rem;
					font-weight: 900;
				}
			}
		}
	}

	::v-deep .van-cell {
		padding: .14rem .3rem;
		background: $dialog-background-color;
		&:first-child{
			padding-top: 0;
		}
	}
	::v-deep input::placeholder {
		color: #A63A20;
	}
	::v-deep .van-cell:after{
		border: 0
	}
}
</style>