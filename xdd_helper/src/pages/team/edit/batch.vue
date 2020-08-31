<template>
	<view class="box my-flex-col-c">
		<view class="my-mgt-10 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">起始设备编号</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-2.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" value="" placeholder="请输入你要分配的起始设备编号" v-if="type===0"/>
			<input class="search my-mgl-10" type="text" value="" placeholder="请输入你要回收的起始设备编号" v-if="type===1"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">末尾设备编号</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-2.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" value="" placeholder="请输入你要分配的末尾设备编号" v-if="type===0"/>
			<input class="search my-mgl-10" type="text" value="" placeholder="请输入你要回收的末尾设备编号" v-if="type===1"/>
		</view>
		<view class="btn my-flex-row-c my-bg-ye my-boxsha-2" @click="onBatch">
			<text class="my-cl-white my-font-18">批量{{type===0?'分配':'回收'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0
			}
		},
		components: {

		},
		computed: {

		},
		onLoad(options) {
			this.type = Number(options.type)
			if (this.type === 0) {
				uni.setNavigationBarTitle({
					title: '批量分配'
				})
			}
			if (this.type === 1) {
				uni.setNavigationBarTitle({
					title: '批量回收'
				})
			}
		},
		onShow() {

		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
			if (this.scrollTop > 0) {
				this.top = true
			} else {
				this.top = false
			}
		},
		methods: {
			onBatch(){
				if(this.type===0){
					uni.showToast({
						title:'分配成功',
						icon:"success"
					})
				}
				if(this.type===1){
					uni.showToast({
						title:'回收成功',
						icon:"success"
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.box {
		width: 750upx;
	}
	
	.line {
		width: 200upx;
		height: 5upx;
	}
	
	.search-box {
		width: 630upx;
		height: 60upx;
		background-color: #EEEEEE;
	}
	.icon {
		width: 50upx;
		height: 50upx;
	}
	
	.search {
		width: 400upx;
	}
	.btn{
		width: 630upx;
		height: 80upx;
		border-radius: 40upx;
		margin-top: 100upx;
	}
</style>
