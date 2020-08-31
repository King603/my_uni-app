<template>
	<view class="box my-flex-col-c">
		<view class="box my-flex-col-c my-boxsha-2 my-rds-5 my-pd-10 my-mgt-15 my-bg-white" v-for="item in textArray" :key="item">
			<view class="my-flex-row-c">
				<view class="my-bder-b-cc line"></view>
				<text class="my-mgl-10 my-mgr-10">{{item.txt}}</text>
				<view class="my-bder-b-cc line"></view>
			</view>
			<view class="my-flex-row-b box my-pd-15">
				<view class="single-box my-flex-col-c" v-for="(item,index) in item.single" :key="item.id" @click="onSingle(item.id)">
					<image class="icon" :src="item.icon" mode=""></image>
					<text class="my-mgt-5">{{item.txt}}</text>
				</view>
			</view>
			<view class="my-flex-row-c my-font-12 class-color" @click="alldevice" v-if="isbusiness">
				 查看全部设备 >>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			textArray: Array,
			required: true
		},
		created:function(){
			  var isbusiness=uni.getStorageSync("openIdBindByBusiness");
			  this.isbusiness=isbusiness;
			},
			data(){
				return{
	               isbusiness:null
				}
			},
		methods: {
			alldevice(){
					uni.navigateTo({
						url:"/pages/home_page/online/online?id="+4
					})
				},
			onSingle(e) {
				// console.log(e)
				if (e === 1 || e === 2 || e === 3) {
					uni.navigateTo({
						url: "/pages/home_page/online/online?id=" + e
					})
				}
				if(e === 4){
					if(this.isbusiness===true){
						uni.navigateTo({
							url: "/pages/home_page/feedback" 
						})
					}else{
						uni.navigateTo({
							url: "/pages/home_page/online/online?id=" + e
						})
					}
				}
				if (e === 5) {
					uni.navigateTo({
						url: "/pages/home_page/agency/public?id=" + 0,
					})
				}
				if (e === 6) {
					uni.navigateTo({
						url: "/pages/home_page/agency/public?id=" + 2
					})
				}
				if (e === 7) {
					uni.showToast({
						title:"此功能暂未开放",
						icon:"none"
					})
					// uni.navigateTo({
					// 	url: "../../pages/team/com/deviceManage" 
					// })
				}
				if (e === 8) {
					uni.navigateTo({
						url: "/pages/home_page/feedback" 
					})
				}
			}
		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: auto;
	}

	.box .box {
		width: 690upx;
		height: auto;
	}

	.line {
		width: 100upx;
		height: 5upx;
	}

	.single-box {
		width: 120upx;
		height: auto;
	}

	.icon {
		width: 75upx;
		height: 75upx;
	}
	.bder-b{
		border-bottom: 2upx solid #F2F2F2;
	}
	.class-color{
		color: #C3C3C3;
		height: 60upx;
		line-height: 60upx;
	}
</style>
