<script setup lang="ts">
import { ref, reactive } from 'vue';
import { storage, sessionStorage } from '@/utils/storage';
import {useRouter} from 'vue-router';

import Footer from '@/components/pc/Footer.vue';
import LoginDialog from "@/components/LoginDialog.vue";
import ScanDialog from '@/components/ScanDialog.vue';
import TipDialog from '@/components/TipDialog.vue';
import EndDialog from '@/components/EndDialog.vue';
import RedEnvelopeDialog from '@/components/RedEnvelopeDialog.vue';

import Login from '@/assets/img/login.png';
import Logo from '@/assets/img/logo.png';
import User from '@/assets/img/user.png';
import RedEnvelope from '@/assets/img/red-envelope.png';
import ClaimNow from '@/assets/img/claim-now.png';
import ClaimNowDisabled from '@/assets/img/claim-now-disabled.png';
import InviteNow from '@/assets/img/invite-now.png';
import Qcode from '@/assets/img/qcode.png';
import Title from '@/assets/img/title.png';
import RuleTitle from '@/assets/img/rule-title.png';

import { logoList, ruleList } from '@/common/data';
import "./index.scss";

const router = useRouter();
const route = router.currentRoute.value;

// 弹窗变量
const showLogin = ref(false);
const showScan = ref(false);
const showTip = ref(false);
const showEnd = ref(false);
const showRedEnvelope = ref(false);

const nick = ref('微信昵称');

// 正常情况下我们默认query中的参数都是string类型。
let isInvitation = ref(route.query.isInvitation as string); // 通过地址参数判断，是否是被邀请人

const state = reactive({
	token: storage.get('token') || '',
	// 开发环境用于效果测试。正式环境通过接口获取
	list: sessionStorage.get('friendsList') || [] // 邀请人数
})

// 打开登录窗口
const showLoginPopup = () => {
	showLogin.value = true;
	//跟踪事件的的埋点
	(window as any).gtag('event', 'cta_click', {
		event_category: 'click',
		event_label: 'login'
	});
}
// 关闭登录窗口
const closeLoginPop = (val: boolean, token: string, list: string[]) => {
	// 模拟接口取数据，暂时存在sessionStorage
	state.token = token
	state.list = list;

	showLogin.value = val;
	// 添加弹窗进行测试，正式开发需删除
	if (isInvitation.value == 'true') {
		showTip.value = true;
	}
}
// 打开扫码窗口
const showScanPopup = () => {
	showScan.value = true;
}
// 关闭扫码窗口
const closeScanPop = (val: boolean) => {
	showScan.value = val
}
// 关闭温馨提示窗口
const closeTipPop = (val: boolean) => {
	showTip.value = val
}
// 关闭温馨提示窗口
const closeEndPop = (val: boolean) => {
	showEnd.value = val
}
// 关闭获得红包的窗口
const closeRedEnvelopePop = (val: boolean, sequenceCode: string) => {
	showRedEnvelope.value = val;
}
// 立即邀请
const inviteNow = () => {
	if(!state.token) {
		showLogin.value = true;
	} else {
		// 添加活动结束弹窗的测试
		if (isInvitation.value == 'true') {
			showEnd.value = true
		} else {
			router.push('/share')
		}
		
	}
	//跟踪事件的的埋点
	(window as any).gtag('event', 'cta_click', {
		event_category: 'click',
		event_label: 'invite_friends'
	});
}

//跟踪页面的埋点	
(window as any).gtag('event', 'page_view', {
    page_path: 'p_' + document.title,
    page_title: 'p_' + document.title
});
// 社媒
const socialMedia = (name: string) => {
	let event_label = '';
	switch (name) {
		case 'bilibili':
			event_label = 'share_bilibili';
			break;
		case 'wx':
			event_label = 'share_wechat';
			break;
		case 'tap':
			event_label = 'share_taptap';
			break;
		case 'dy':
			event_label = 'share_douyin';
			break;
		default:
			event_label = 'share_lilith';
			break;
	}
	(window as any).gtag('event', 'cta_click', {
		event_category: 'click',
		event_label: event_label
	});
}
// 立即领取
const claimNow = () => {
	//跟踪事件的的埋点
	(window as any).gtag('event', 'cta_click', {
		event_category: 'click',
		event_label: 'claim_cdkey'
	});
	if(!state.token) {
		showLoginPopup()
	} else {
		// 添加温馨提示弹窗的测试
		if (isInvitation.value == 'true') {
			showTip.value = true;
		} else {
			showRedEnvelope.value = true;
		}
		
	}

	
}

</script>

<template>
	<div class="activity">
		<div class="top">
			<div class="header">
				<div class="logo">
					<img :src="Logo" alt="logo">
				</div>
				<div class="login-btn" @click="showLoginPopup" v-if="!state.token">
					<img :src="Login" alt="登录">
					
				</div>
				<div class="user-box" v-else>
					<div class="user-img">
						<img :src="User" alt="登录">
					</div>
					<div class="nick-name">{{ nick }}</div>
				</div>
			</div>
			<div class="top-title-left">
				<img src="@/assets/img/top-title-left.png" alt="">
			</div>
			<div class="top-title-right">
				<img src="@/assets/img/top-title-right.png" alt="">
			</div>
			<div class="top-title">
				<img src="@/assets/img/top-title.png" alt="">
			</div>
			<div class="top-sub-title">
				<img src="@/assets/img/top-sub-title.png" alt="">
			</div>
		</div>
		<div class="main">
			<div class="red-envelope-box">
				<div class="fireworks">
					<img src="@/assets/img/fireworks.png" alt="">
				</div>
				<img :src="RedEnvelope" alt="红包" class="red-envelope" @click="showLoginPopup">
			</div>
			<div class="claim-now-box">
				<!--  v-if="isInvitation == 'true'"仅用测试代码，正式开发需删除 -->
				<img :src="ClaimNowDisabled" alt="立即领取" class="claim-now-btn" v-if="isInvitation == 'true' || state.list.length < 3">
				<img :src="ClaimNow" alt="立即领取" class="claim-now-btn" @click="claimNow" v-if="isInvitation !== 'true' && state.list.length >= 3">
				
			</div>
			<div class="claim-text-box">
				<p>2024年2月5日11:00 - 2024年2月14日23:59</p>
			</div>
			<div class="friends-list-box">
				<ul class="list">
					<li class="header item">
						<div class="item-con">我的好友</div>
						<div class="item-con">时间</div>
					</li>
					<li>
						<div class="blank-con" v-if="state.list.length == 0 || isInvitation == 'true'">
							<p>您还未成功邀请新玩家进行预约，</p>
							<p>继续加油吧！</p>
						</div>
						<ul class="list-con" v-else>
							<li v-for="item in state.list" :key="item.id" class="item">
								<div class="item-con">{{ item.num }}</div>
								<div class="item-con">{{ item.time }}</div>
							</li>
						</ul>
					</li>
				</ul>
				<img :src="InviteNow" alt="立即邀请" class="invite-now-btn" @click="inviteNow">
				<div class="text">已邀请{{ isInvitation == 'true' ? 0 : state.list.length }}/3</div>
			</div>
			<div class="welfare-top-box">
				<div class="title-img">
					<img :src="Title" alt="">
				</div>
				<div class="qcode-img" @click="showScanPopup">
					<img :src="Qcode" alt="二维码">
				</div>
				<div class="welfare-bottom-box">
					<ul class="logo-list">
						<li v-for="item in logoList" :key="item.id" class="item" @click="socialMedia(item.name)">
							<a :href="item.hrefUrl" v-if="item.hrefUrl">
								<img :src="item.icon" alt="logo" :class="item.name + '-icon'">
							</a>
							<img :src="item.icon" alt="" :class="item.name + '-icon'" v-else @click="showScanPopup">
						</li>
					</ul>
				</div>
			</div>
			<div class="use-title-box">
				<div class="fireworks">
					<img src="@/assets/img/fireworks_02.png" alt="">
				</div>
				<div class="star">
					<img src="@/assets/img/star.png" alt="">
				</div>
				<div class="title-top">
					<img src="@/assets/img/dialog/dialog-top.png" alt="">
				</div>
				<div class="title">
					<div class="icon">
						<img src="@/assets/img/dialog/dialog-left.png" alt="">
					</div>
					<div class="text-icon">
						<img src="@/assets/img/use-title.png" alt="">
					</div>
					<div class="icon">
						<img src="@/assets/img/dialog/dialog-right.png" alt="">
					</div>
				</div>
				<div class="text-box">
					<p>用户领取封面后，在手机微信中打开发红包界面前往“红包封面”-“选择封面”即可使用。</p>
				</div>
			</div>
			<div class="tips-box">
				<div class="money">
					<img src="@/assets/img/money.png" alt="">
				</div>
				<div class="fireworks">
					<img src="@/assets/img/fireworks_03.png" alt="">
				</div>
				<div class="title-top">
					<img src="@/assets/img/dialog/dialog-top.png" alt="">
				</div>
				<div class="title">
					<div class="icon">
						<img src="@/assets/img/dialog/dialog-left.png" alt="">
					</div>
					<div class="text-icon">
						<img src="@/assets/img/tip-title.png" alt="">
					</div>
					<div class="icon">
						<img src="@/assets/img/dialog/dialog-right.png" alt="">
					</div>
				</div>
				<div class="text-box">
					<p>用户成功领取封面后，可在3个月内无限次使用。超过3个月后，已领取的封面将自动失效，无法再次使用。已发送的红包展示不会收到影响。</p>
				</div>
			</div>
			<div class="rule-box">
				<div class="fireworks">
					<img src="@/assets/img/fireworks_04.png" alt="">
				</div>
				<div class="title-img">
					<img :src="RuleTitle" alt="">
				</div>
				<ul class="list">
					<li v-for="item in ruleList" :key="item.text" class="item">{{ item.text }}</li>
				</ul>
			</div>
			<Footer></Footer>
		</div>
		
		<!-- 登录弹窗 -->
		<van-dialog width="100%" v-model:show="showLogin" :showConfirmButton="false">
			<LoginDialog @closePop="closeLoginPop" :isInvitation="isInvitation"></LoginDialog>
		</van-dialog>
		<!-- 扫码弹窗 -->
		<van-dialog width="100%" v-model:show="showScan" :showConfirmButton="false">
			<ScanDialog @closePop="closeScanPop"></ScanDialog>
		</van-dialog>
		<!-- 活动温馨提示 -->
		<van-dialog width="100%" v-model:show="showTip" :showConfirmButton="false">
			<TipDialog @closePop="closeTipPop"></TipDialog>
		</van-dialog>
		<!-- 活动结束 -->
		<van-dialog width="100%" v-model:show="showEnd" :showConfirmButton="false">
			<EndDialog @closePop="closeEndPop"></EndDialog>
		</van-dialog>
		<!-- 获得红包封面 -->
		<van-dialog width="100%" v-model:show="showRedEnvelope" :showConfirmButton="false">
			<RedEnvelopeDialog @closePop="closeRedEnvelopePop"></RedEnvelopeDialog>
		</van-dialog>
	</div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
