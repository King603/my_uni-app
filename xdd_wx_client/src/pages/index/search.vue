<template>
	<view>
		<view class="box1 bg my-flex-row-b">
			<view class="my-flex-row-align-c">
				<view class="avater my-pdlr-15 bder-r-white" @click="onGoHome">
					<image :src="avatarUrl"  class="my-hdimg-c-30" mode=""></image>
				</view>
				<view class="my-flex-row-b h my-pdl-10">
					<view class="my-flex-row-align-c">
						<image class="search" src="/static/hch-position/search.png"></image>
						<view class="my-cl-white h2">
							<input type="text" @blur="blurName" :value="name" class="my-cl-white" placeholder="请输入你想要前往的网点名称" placeholder-class="my-cl-white" />
						</view>
					</view>
					<view class="h3 my-flex-row-s-c my-pdlr-3" @click="onNav">
						<image class="nav" style="transform:rotate(45deg);" src="../../static/hch-position/nav.png" mode=""></image>
						<view class="my-cl-white my-font-12 my-pdr-2">导航</view>
					</view>	
				</view>
			</view>
		</view>
		<branch :branch="branch"></branch>
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import branch from '@/components/branch/branch.vue'
	import req from '@/util/req.js'
	import QQMapWX from '@/util/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				branch:[],
				latitude:null,
				longitude:null,
				businessName:"",
				avatarUrl:"/static/hch-position/1.jpg"
			}
		},
		mounted() {
			this.getUserLocation();
			this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg";
			// this.open();
			// setTimeout(() => {
			// 	this.close();
			// }, 2000)
			
		},
		components: {
			loading,branch
		},
		methods: {
			blurName(e){				
				this.businessName=e.detail.value;
				this.getNear();
			},
			getNear(){
				let params = {
					businessName: this.businessName,
					distinct:1000,
					latitude:this.latitude,
					longitude:this.longitude,
					pageIndex:0,
					pageSize:30
				}
				req.request('POST', params, '/user/business/near', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.branch=res.data.data.rows
						this.branch.forEach(res=>{
							res.distance=res.distance.toFixed(2)
						})
					}
				})
			},
			//历史订单
			onRecord(){
				uni.navigateTo({
					url:"/pages/my/record"
				})
			},
			//去我的页面
			onGoHome() {
				uni.navigateTo({
					url: "/pages/my/my"
				})
			},
			close: function() {
				this.$refs.loading.close();
			},
			open: function() {
				this.$refs.loading.open();
			},
			callback() {
				// console.log("回掉");
			},
			onNav() {
				uni.getLocation({
					type: 'wgs84',
					success (res) {
						uni.openLocation({
							latitude : Number(res.latitude),
							longitude : Number(res.longitude)
						})
					}
				});
			},
			getUserLocation: function() {
				let vm = this;
				wx.getSetting({
					success: (res) => {
						// console.log(JSON.stringify(res))
						// res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
						// res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
						// res.authSetting['scope.userLocation'] == true    表示 地理位置授权
						if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
							wx.showModal({
								title: '请求授权当前位置',
								content: '需要获取您的地理位置，请确认授权',
								success: function(res) {
									if (res.cancel) {
										wx.showToast({
											title: '拒绝授权',
											icon: 'none',
											duration: 1000
										})
									} else if (res.confirm) {
										wx.openSetting({
											success: function(dataAu) {
												if (dataAu.authSetting["scope.userLocation"] == true) {
													wx.showToast({
														title: '授权成功',
														icon: 'success',
														duration: 1000
													})
													//再次授权，调用wx.getLocation的API
													vm.getLocation();
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'none',
														duration: 1000
													})
												}
											}
										})
									}
								}
							})
						} else if (res.authSetting['scope.userLocation'] == undefined) {
							//调用wx.getLocation的API
							vm.getLocation();
						} else {
							//调用wx.getLocation的API
							vm.getLocation();
						}
					}
				})
			},
			// 微信获得经纬度
			getLocation: function() {
				let vm = this;
				wx.getLocation({
					type: 'gcj02',
					success: function(res) {
						// console.log(JSON.stringify(res))
						var latitude = res.latitude
						var longitude = res.longitude
						var speed = res.speed
						var accuracy = res.accuracy;
						vm.getLocal(latitude, longitude)
					},
					fail: function(res) {
						// console.log('fail' + JSON.stringify(res))
					}
				})
			},
			// 获取当前地理位置
			getLocal(latitude, longitude) {
				this.latitude = latitude;
				this.longitude = longitude;
				this.getNear();
				// let vm = this;
				// let qqmapsdk = new QQMapWX({
				// 	key: 'OHYBZ-6333O-T2XWH-SQ6JK-4WGZF-O4BKO' //key秘钥 
				// });
				// qqmapsdk.reverseGeocoder({
				// 	location: {
				// 		latitude: latitude,
				// 		longitude: longitude
				// 	},
				// 	success: function(res) {
				// 		let province = res.result.ad_info.province
				// 		let city = res.result.ad_info.city
				// 		vm.province = province,
				// 			vm.latitude = latitude,
				// 			vm.longitude = longitude,
				// 			vm.city = city,
				// 			vm.site = res.result.address
				// 			vm.getNear()
				// 	},
				// 	fail: function(res) {
				// 		// console.log(res);
				// 	},
				// 	complete: function(res) {
				// 		// console.log(res);
				// 	}
				// });
			},
		},
		onShow() {

		}
	}
</script>

<style lang="scss">
	page{
		padding-top: 80upx;
	}
	.box1 {
		width: 750upx;
		height: 80upx;
		position: fixed;
		top: 0;
		left: 0;
	}

	.avater {
		width: 80upx;
		height: 60upx;
	}

	.search {
		width: 52upx;
		height: 52upx;
	}
	
	.h {
		height: 50upx;
		width: 580upx;
		border: 2upx solid #FFFFFF;
		margin-left: 50upx;
		border-radius: 0 25upx 25upx 0;
	}
	
	.h2 {
		width: 325upx;
		font-size: 24upx;
		margin-left: 10upx;
		padding-left: 10upx;
	}
	
	.h3{
		height: 50upx;
		width: 120upx;
		border: 2upx solid #FFFFFF;
		border-radius: 50upx;
		margin-left: 50upx;
	}
	
	.nav{
		width: 35upx;
		height: 35upx;
	}
</style>
