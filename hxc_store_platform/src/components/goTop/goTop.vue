<template>
	<view class="my-flex-col-c my-hdimg-c-40 my-bg-ye my-boxsha-2" v-show="top" @click="onTop" :class="topId==1?'top':'top-icon'">
		<image src="/static/go-top.png" class="my-hdimg-c-30" mode=""></image>
	</view>
</template>

<script>
	export default {
		props: {
			top: {
				type: Boolean,
				required: true
			},
			topId:{
				type: Number,
				required:true
			}
		},
		data() {
			return {

			}
		},
		components: {

		},
		computed: {

		},
		onLoad() {

		},
		methods: {
			onTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
		}
	}
</script>

<style>
	.top-icon {
		width: 80upx;
		height: 80upx;
		position: fixed;
		right: 20upx;
		bottom: 20upx;
	}
	.top{
		position: fixed;
		bottom: 140upx;
		right: 20upx;
		width: 80upx;
		height: 80upx;
	}
</style>
