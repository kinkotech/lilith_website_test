<script setup lang="ts">
import { ref } from 'vue';
import Footer from '@/components/Footer.vue';
import LoginDialog from "@/components/LoginDialog.vue";
import Login from '@/assets/img/login.png';
import Logo from '@/assets/img/logo.png';
import RedEnvelope from '@/assets/img/red-envelope.png';
import ClaimNow from '@/assets/img/claim-now.png';
import InviteNow from '@/assets/img/invite-now.png';
import Qcode from '@/assets/img/qcode.png';
import Title from '@/assets/img/title.png';
import Wx from '@/assets/img/wx.png'
import Dy from '@/assets/img/dy.png';
import Tap from '@/assets/img/tap.png';
import Bilibili from '@/assets/img/bilibili.png';
import UseTitle from '@/assets/img/use-title.png';
import TipTitle from '@/assets/img/tip-title.png';
import RuleTitle from '@/assets/img/rule-title.png';
import "./index.scss";


const show = ref(true);
const people = ref(3);

const list = ref([{
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
}])

const logoList = [{
	id: '001',
	icon: Wx,
	name: 'wx'
}, {
	id: '002',
	icon: Dy,
	name: 'dy',
	hrefUrl: 'https://www.douyin.com/user/MS4wLjABAAAAvNiUf-jWyStihk35nRZm1nObd8mDYnaD47ywQPl5NPzGL0SQNR8Iwq4t2kvX9j58?previous_page=app_code_link'
}, {
	id: '003',
	icon: Tap,
	name: 'tap',
	hrefUrl: 'https://www.taptap.cn/app/241042'
}, {
	id: '004',
	icon: Bilibili,
	name: 'bilibili',
	hrefUrl: 'https://space.bilibili.com/3493138475780593?spm_id_from=333.337.0.0'
}]

const ruleList = [{
	text: '活动时间:2024年2月5日11：00至2024年2月14日23：59'
}, {
	text: '活动期间内，每成功邀请1位新玩家预约公测，即可获得1次助力。成功邀请3位新玩家预约公测后，即可领取新年限定红包封面（已预约的玩家不计入）'
}, {
	text: '红包封面每人仅可领取一次，不可重复领取'
}, {
	text: '该红包封面为微信红包封面（非实物），完成领取条件后复制序列码，打开微信聊天页面-点击右下方“＋”选择红包-点击红包封面-点击右上角添加-粘贴领取序列码即可'
}, {
	text: '红包封面有效期：成功领取封面后，可在3个月（自然月）内无限次使用，有效期截止日当天24点前均可使用。超过有效期后，已领取的封面将自动失效，无法再次使用。其中，已发送的红包展示不会受到影响'
}, {
	text: '活动期间如出现问题，或对活动流程有疑问，可以保存活动页面中的二维码，前往微信添加“启程福利官-小程”进行咨询'
}, {
	text: '本次活动《剑与远征：启程》官方拥有活动最终解释权'
}]


const showPopup = () => {
	show.value = true;
}


</script>

<template>
	<div class="activity">
		<div class="top">
			<div class="header">
				<img :src="Logo" alt="logo" class="logo">
				<img :src="Login" alt="登录" @click="showPopup" class="login-btn">
			</div>
		</div>
		<div class="main">
			<div class="red-envelope-box">
				<img :src="RedEnvelope" alt="红包" class="red-envelope">
			</div>
			<div class="claim-now-box">
				<img :src="ClaimNow" alt="立即领取" class="claim-now-btn">
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
						<ul class="list-con">
							<li v-for="item in list" :key="item.id" class="item">
								<div class="item-con">{{ item.num }}</div>
								<div class="item-con">{{ item.time }}</div>
							</li>
						</ul>
					</li>
				</ul>
				<img :src="InviteNow" alt="立即邀请" class="invite-now-btn">
				<div class="text">已邀请{{ people }}/3</div>
			</div>
			<div class="welfare-top-box">
				<img :src="Title" alt="" class="title-img">
				<img :src="Qcode" alt="二维码" class="qcode-img">
			</div>
			<div class="welfare-bottom-box">
				<ul class="logo-list">
					<li v-for="item in logoList" :key="item.id" class="item">
						<a :href="item.hrefUrl">
							<img :src="item.icon" alt="logo" :class="item.name + '-icon'">
						</a>
					</li>
				</ul>
			</div>
			<div class="use-title-box">
				<img :src="UseTitle" alt="" class="title-img">
			</div>
			<div class="use-text-box">
				<p>用户领取封面后，在手机微信中打开发红包界面前往“红包封面”-“选择封面”即可使用。</p>
			</div>
			<div class="tips-box">
				<img :src="TipTitle" alt="" class="title-img">
			</div>
			<div class="rule-box">
				<p>用户成功领取封面后，可在3个月内无限次使用。超过3个月后，已领取的封面将自动失效，无法再次使用。已发送的红包展示不会收到影响。</p>
				<img :src="RuleTitle" alt="" class="title-img">
				<ul class="list">
					<li v-for="item in ruleList" :key="item.text" class="item">{{ item.text }}</li>
				</ul>
			</div>
		</div>
		<Footer></Footer>
		<!-- 登录弹窗 -->
		<van-dialog v-model:show="show" :showConfirmButton="false">
			<LoginDialog></LoginDialog>
		</van-dialog>
	</div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
