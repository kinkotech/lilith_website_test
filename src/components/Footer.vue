<script setup lang="ts">
import LilisiLogo from '@/assets/img/lilisi-logo.png';
import bqMod from '@/assets/img/bqMod.png';
import Jubao from '@/assets/img/jubao.png';
import Youhai from '@/assets/img/youhai.png';

const list = [{
	text: '上海莉莉丝网络科技有限公司 上海市嘉定区银翔路655号1幢11层1116室'
}, {
	text: '抵制不良游戏，拒绝盗版游戏。注意自我保护, 谨防受骗上当。'
}, {
	text: '适度游戏益脑, 沉迷游戏伤身。合理安排时间, 享受健康生活。'
}, {
	text: '沪ICP备15032795号',
	href: 'http://www.beian.gov.cn/'
}, {
	text: '沪公网安备31011202012354',
	href: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202012354',
	imgUrl: bqMod
}, {
	text: '增值电信业务经营许可证：沪B2-20160037'
}, {
	text: '违规信息举报电话/客服电话：028-65231887'
}]
</script>

<template>
    <div class="footer">
		<div class="logo">
			<img :src="LilisiLogo" alt="logo">
		</div>
		<div class="footer-container">
			<p v-for="item in list" :key="item.text">
				<a :href="item.href" v-if="item.href">
					<img :src="item.imgUrl" alt="" v-if="item.imgUrl" class="icon">
					{{ item.text }}
				</a>
				<span v-else>{{ item.text }}</span>
			</p>
			<p class="flx">
				<a href="https://www.lilith.com/termofservice" class="item">服务条款</a>
				<a href="https://www.lilith.com/privacy"class="item">隐私协议</a>
			</p>
			<p>©莉莉丝游戏版权所有</p>
			<p class="flx">
				<a href="http://www.shjbzx.cn/" class="item"><img :src="Jubao" alt=""></a>
				<a href="https://www.12377.cn/" class="item"><img :src="Youhai" alt=""></a>
			</p>
		</div>
    </div>
</template>

<style lang="scss" scoped>
.footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-size: .14rem;
	background: url('@/assets/img/footer-bg.png') no-repeat;
	background-size: 100% auto;
	background-position: 0 0;
	padding-bottom: .2rem;
	.logo {
		width: 33%;
		margin: 1.9rem auto;
		margin-bottom: 0;
	}
	.footer-container {
		display: flex;
		flex-direction: column;
		font-size: .266667rem;
		color: grey;
		p {
			margin: 0.08rem auto;
			.icon {
				width: .2rem;
			}
			a {
				color: grey;
			}
			&.flx {
				display: flex;
				.item {
					width: 1.546667rem;
    			height: 0.613333rem;
					&:last-child {
						margin-left: .1rem;
					}
				}
			}
		}
	}
}
</style>