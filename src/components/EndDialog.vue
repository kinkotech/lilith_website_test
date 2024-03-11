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
			<div class="confirm-button"><img src="@/assets/img/dialog/confirm-button.png" alt="" @click="closePop"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.end {
	width: 100%;
	height: 6.3rem;
	padding: 1.2rem .2rem;
	background: url('@/assets/img/dialog/dialog-bg.png') no-repeat;
	background-size: 100% auto;
	position: relative;
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
			margin-top: .8rem;
		}
		.confirm-button {
			width: 4rem;
			margin-top: .3rem;
		}
	}
}
</style>