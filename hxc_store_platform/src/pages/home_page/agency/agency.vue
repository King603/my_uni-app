<template>
	<view class="my-flex-col-c">
		<view class="my-mgt-50">
			<view class="box my-flex-col-c" v-for="(item,index) in tab" :key="index" @click="onTab(index)">
				<image :src="item.img" mode="" class="pic my-mgt-30"></image>
				<text class="my-mgt-10">{{item.txt}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [{
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/XgkKEufYJj_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.tIbpcmS0li7ibed78720bc36d304aa8154ce9dc89117.png',
					txt: '添加对私代理'
				}, {
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/ulbkYrnhpm_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.yLayk9WaliWLb575136bf8f432af0a40cd03e1ce5ca1.png',
					txt: '添加对私代理'
				}]
			}
		},
		components: {

		},
		computed: {

		},
		onLoad() {

		},
		methods: {
			onTab(e) {
				uni.navigateTo({
					url: '/pages/home_page/agency/public?id=' + e
				})
			}
		}
	}
</script>

<style>
	.pic {
		width: 240upx;
		height: 240upx;
	}
</style>
