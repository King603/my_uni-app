<template>
	<view class="box my-flex-col-c">
		<view class="my-flex-col-c box my-mgt-10" v-for="(item,index) in dev" :key="index">
			<text class="my-font-16">{{item.title}}</text>
			<image :src="item.url" class="pic my-mgt-10" mode="widthFix"></image>
			<view class="my-flex-row-align-c my-mgt-10">
				<image :src="item.icon" class="icon" :class="index===1?'tr':''" mode=""></image>
				<text class="my-mgl-8">设备型号：{{item.model}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dev: [{
					title: '六口座充',
					url: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/TLuStWyYeV_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.Zi9m0vgHkHd66a0e6b49834f53dd63f4b3a7ede73ab6.png',
					icon: '/static/index/charger.png',
					model: 'H60'
				}, {
					title: '智能线充',
					url: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/XuJZZuhcPs_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.gtaY7up6x1Hma6bf3a0d6e331bc6fcc4ad565fb0cb8b.png',
					icon: '/static/index/plug.png',
					model: 'X10'
				}]
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
		padding-bottom: 0;
	}

	.box {
		width: 100%;
	}

	.pic {
		width: 360upx;
	}

	.icon {
		width: 40upx;
		height: 40upx;
	}

	.tr {
		transform: rotate(90deg);
	}
</style>
