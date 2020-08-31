<template>
	<view class="swiper">
		<swiper circular indicator-dots="true" indicator-color='rgba(249,122,123,1)' autoplay indicator-active-color='rgba(241,178,74,1)'
		 class="my-rds-10" style='height:100%;'>
			<swiper-item v-for='(item,index) in swiper' class="swiper my-flex-row-c" :key='index'>
				<image :src="item" mode="widthFix" class="banner my-rds-15"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			swiper: Array,
			required: true

		},
		components: {

		},
		computed: {

		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>
	.swiper {
		width: 750rpx;
		height: 340rpx;
	}

	.banner {
		width: 690rpx;
		margin-top: -40upx;
	}

	.active {
		opacity: 1;
		z-index: 10;
		height: 300rpx;
		width: 630rpx;
		top: 7%;
		transition: all 0.2s ease-in 0s;
	}

	.aa {
		transform: scale(0.9, 0.9)
	}

	.ill {
		width: 25%;
	}
</style>
