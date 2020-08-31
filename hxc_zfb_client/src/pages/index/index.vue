<template>
	<view class="content">
		<hchPosition ref="zoomInViewImageDom" :site="site" @st="st('QSPopup')"></hchPosition>
		<view class="box bg my-flex-row-b">
			<view class="my-flex-row-align-c">
				<view class="avater bder-r-white my-pdlr-15" @click="onGoHome">
					<image :src="avatarUrl" class="my-hdimg-c-30" mode="aspectFill"></image>
				</view>
				<view class="my-flex-row-b h my-pdl-10">
					<view class="my-flex-row-align-c" @click="onSearch">
						<image class="search" src="/static/hch-position/search.png"></image>
						<view class="my-cl-white h2 ">请输入你想要前往的网点名称</view>
					</view>
					<view class="h3 my-flex-row-s-c my-pdlr-3" @click="onNav">
						<image class="nav" style="transform:rotate(45deg);" src="../../static/hch-position/nav.png" mode="aspectFit"></image>
						<view class="my-cl-white my-font-12 my-pdr-2">导航</view>
					</view>
				</view>
			</view>
			<!-- <image class="my-mgr-10 search" src="/static/hch-position/record.png" mode="" @click="onRecord"></image> -->
		</view>
		<view class="tab2">
			<view class="tab-h bg2 my-flex-row-c">
				<view class="tab-h2 bg2 my-flex-row-b">
					<view class="my-flex-row-align-c my-pdl-7 my-pdr-15" @click="onRecord">
						<view style="width: 43upx; height: 43upx; border: 3upx solid #FFFFFF; border-radius: 50%;">
							<image class="icon" style="width: 30upx;height: 30upx;" src="/static/hch-position/record.png" mode="aspectFit"></image>
						</view>
						<view class="my-mgl-5 my-flex-col-c my-cl-white my-font-11">
							<view>历史</view>
							<view>订单</view>
						</view>
					</view>
					<view class="my-flex-row-align-c my-pdr-5 my-pdl-15" @click="onSearch">
						<view class="my-flex-col-c my-cl-white my-font-11">
							<view>附近</view>
							<view>商户</view>
						</view>
						<image class="my-mgl-5 icon" src="/static/hch-position/branch.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<image class="scan" src="/static/hch-position/scan.png" mode="" @click="onSacn"></image>
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>

		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="show1 my-rds-10">
				<view class="my-bg-white my-flex-col-c my-pd-20 my-flex-warp show1 my-relative my-rds-10">
					<image class="icon3" src="../../static/hch-position/signin.png" mode="aspectFit"></image>
					<text style="font-weight: 500;" class="my-font-14 my-mgt-10">豪想充 ~ 为您续航精彩人生</text>
					<!-- <button open-type="getUserInfo" @getuserinfo="onGetUserInfo" class='my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white'>一键登录</button> -->
                    <button class='my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white' open-type="getAuthorize" @getAuthorize="onGetAuthorize" @error="onAuthError" scope='userInfo'>一键登录</button>
					<button v-show="false" @click="nologin" class='my-font-16 my-mgt-18 show4-btn my-cl-white' style="background-color: #e3e3e3;">暂不登录</button>
				</view>
			</view>
		</QSPopup>

		<QSPopup ref="QSPopup1" type="fadeScaleHeightToLowInMiddle">
			<view class="show1 my-bg-white my-rds-10">
				<view class="my-flex-col-c  my-pd-20 my-rds-10">
					<image class="icon3" src="../../static/hch-position/phone.png" mode="aspectFit"></image>
					<view style="font-weight: 500;" class="my-font-14 my-mgt-10">绑定手机号可享受更多服务</view>
					<button class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white" open-type="getAuthorize" @getAuthorize="onGetAuthorize2" @error="onAuthError" scope='phoneNumber'>立即绑定</button>
				    <button @click="nobindphone" class='my-font-16 my-mgt-18 show4-btn my-cl-white' style="background-color: #e3e3e3;">暂不绑定手机</button>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import hchPosition from "@/components/hch-position/hch-position.vue"
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	import login from '@/util/login.js'
	import req from '@/util/req.js'
	import QQMapWX from '@/util/qqmap-wx-jssdk.min.js'
	import CryptoJS from '@/util/CryptoJs.js'
	export default {

		data() {
			return {
				store: null,
				storeData: [ //门店信息展示  id name address tel 必填
					{
						id: 1,
						name: '嘉庚体育馆',
						latitude: 24.58023061,
						longitude: 118.10388605,
						address: '嘉庚体育馆XXX1号',
						tel: '12345678900',
					}, {
						id: 2,
						name: '门店XXXXX2号',
						latitude: 24.47280,
						longitude: 118.11066,
						address: '厦门市思明区汇景商业广场XXX2号',
						tel: '12345678900',
					},
				],
				markers: [],
				isLogin: false,
				bindPhone: false,
				latitude:null,
				longitude:null,
				avatarUrl:"/static/hch-position/1.jpg",
				site:null,
				key: 'd22645f9fa764b9b96577afa9191c38b',
				b:"mch_id=1561116401&nonce_str=u0ifPLJiAFRmOJ8Aw8FCYOXp6V6ZTl6q&package=AAQTnZoAAAABAAAAAACTMg8SPwqJlXLSFVjFXiAAAABcwQVtru-5k9MmEOZJ_Pv_Nq7Cw56dNKKN5EjZKnt5jeAlMbNEL2bn2otGcWSPBLIHw801-rJOuWi_iv_EpthubQPMKAAAhrBVpnE4BdlZ0drMQ4pEhXlq9s1Odmc4cJBu_9b5pVJUPIeXf9xOjOXYwgllPI7UAsnTYnfyi28Ze8n6eLBp4orICNYFibFROS0WXkHJXdn7z2R3&sign_type=HMAC-SHA256&timestamp=1589991447000&key=d22645f9fa764b9b96577afa9191c38b"
			}
		},

		components: {
			hchPosition,
			loading,
			QSPopup

		},
		onShow() {
			// this.isLogin = uni.getStorageSync('logged') || false
			// if (this.isLogin == false) {
			// 	this.$refs['QSPopup'].show()
			// } else {
			// 	this.$refs['QSPopup'].hide()
			// 	this.bindPhone = uni.getStorageSync('bindPhone') || false
			// 	if (this.bindPhone === false) {
			// 		this.$refs['QSPopup1'].show()
			// 	} else {
			// 		this.$refs['QSPopup1'].hide()
			// 	}
			// }
		},
		mounted() {
			if(uni.getStorageSync('qrcode').length!=0){
				uni.redirectTo({
					url:'/pages/index/rentInfo?code=1'
				})
			}
			this.getUserLocation()
			this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg"
			this.isLogin = uni.getStorageSync('logged') || false
			if (this.isLogin == true) {
				login.userLogin().then((res) => {
					console.log('登录成功：' + res)
					this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg"
					this.getUserLocation()
					this.getMap()
					// this.getUser()
			        this.getMap()
				}, (error) => {
					console.log('登录失败：' + error)
				})
			}
		},
		methods: {
			nologin(){
				this.$refs['QSPopup'].hide()
				this.$refs['QSPopup1'].show()
			},
			nobindphone(){
				this.$refs['QSPopup1'].hide()
			},
			// 获取用户信息
			onGetAuthorize(res){
				 login.userLogin().then((res) => {
				 	this.bindPhone = uni.getStorageSync('bindPhone') || false
				 	if (this.bindPhone === false) {
				 		this.$refs['QSPopup1'].show()
				 	} else {
				 		this.$refs['QSPopup1'].hide()
				 	}
				 	this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg"
				 	this.getMap()
				 	// this.getUser()
				 }, (error) => {
				 	console.log('登录失败：' + error)
				 })
				 this.$refs['QSPopup'].hide()
			},
			// 获取用户信息，微信部分
			// onGetUserInfo() {
			// 	// login.userLogin()
			// 	login.userLogin().then((res) => {
			// 		console.log('登录成功：' + res)
			// 		this.bindPhone = uni.getStorageSync('bindPhone') || false
			// 		if (this.bindPhone === false) {
			// 			this.$refs['QSPopup1'].show()
			// 		} else {
			// 			this.$refs['QSPopup1'].hide()
			// 		}
			// 		this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg"
			// 		this.getMap()
			// 		// this.getUser()
			// 	}, (error) => {
			// 		console.log('登录失败：' + error)
			// 	})
			// 	this.$refs['QSPopup'].hide()
			
			// },
			// 获取用户手机号
			onGetAuthorize2(e){
				my.getPhoneNumber({
				    success: (res) => {
						var encryptedData=JSON.parse(res.response).response;
						// 绑定用户手机号
						let params = {
							encryptedData:encryptedData
						}
						req.request('POST', params, '/user/alipay/user/bind', '加载中', (res) => {
							console.log(res)
							if (res.statusCode === 200) {
								uni.showToast({title: "绑定成功",icon: "none"})
								uni.setStorageSync('bindPhone', true)
								this.$refs['QSPopup1'].hide()
							}else if (res.statusCode === 401) {
								uni.showToast({title: "登录失效",icon: "none"})
							}else {
								uni.showToast({title: "服务器返回错误"+res.statusCode,icon: "none"})
							}
						})
					
				    },
				    fail: (res) => {
				        console.log('fails',res);
				    },
				});
			},
			getMap(){
				let params = {
					distinct: 1000,
					latitude:this.latitude,
					longitude:this.longitude
				}
				req.request('POST', params, '/user/business/map', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.markers=res.data.data
						this.$refs['zoomInViewImageDom'].isshowmarkers(this.markers)
						this.markers.forEach(res=>{
							res.iconPath="/static/hch-position/shop.png"
							res.width= 48,
							res.height= 48,
							res.latitude=Number(res.addressLatitude)
							res.longitude=Number(res.addressLongitude)
							res.id=res.businessId
						})
						this.storeData=this.markers
						this.$refs['zoomInViewImageDom'].isshowstoreData(this.storeData)
					} else if (res.statusCode === 401) {
						uni.showToast({
							title: '登录失效',
							icon: "none"
						})
						uni.removeStorageSync('logged')
					}else{
						console.log('接口返回值错误')
					}
				})
			},
			onNav() {
				if (this.store === null) {
					uni.showToast({
						icon: 'none',
						title: '请选择地图上的店铺'
					})
				} else {
					let address = this.store.address
					uni.openLocation({
						latitude: Number(this.store.latitude),
						longitude: Number(this.store.longitude),
						address: address
					})
				}
			},
			st(e) {
				this.store = e
			},
			//扫码
			onSacn() {
				this.isLogin = uni.getStorageSync('logged') || false
				if (this.isLogin == false) {
					this.$refs['QSPopup'].show()
				} else {
					this.$refs['QSPopup'].hide()
					this.bindPhone = uni.getStorageSync('bindPhone') || false
					if (this.bindPhone === false) {
						this.$refs['QSPopup1'].show()
					} else {
						this.$refs['QSPopup1'].hide()
						this.getUserLocation()
						 
						uni.scanCode({
							success: (res) => {
								let result = res.result
								console.log(result)
								if(result.indexOf('?op=addWhiteList&whiteId=')>0){
									console.log('加入白名单')
								var op =	(this.getUrlParamVal(result,'op'));
								var whiteId=	(this.getUrlParamVal(result,'whiteId'));
									uni.redirectTo({
										url: "/pages/index/addWhiteList?whiteId="+ whiteId
									})
								}else{
								let array= result.split('=')
								console.log(array)
								let str = array[1].split("&&")[0]
								uni.redirectTo({
									url: "/pages/index/rentInfo?deviceNo="+ str
								})}
							}
						});
					}
				}
			},
			//历史订单
			onRecord() {
				this.isLogin = uni.getStorageSync('logged') || false
				if (this.isLogin == false) {
					this.$refs['QSPopup'].show()
				} else {
					this.$refs['QSPopup'].hide()
					this.bindPhone = uni.getStorageSync('bindPhone') || false
					if (this.bindPhone === false) {
						this.$refs['QSPopup1'].show()
					} else {
						this.$refs['QSPopup1'].hide()
						this.getUserLocation()
						uni.navigateTo({
							url: "/pages/my/record"
						})
					}
				}
				
			},
			//去搜索页面
			onSearch() {
				this.isLogin = uni.getStorageSync('logged') || false
				if (this.isLogin == false) {
					this.$refs['QSPopup'].show()
				} else {
					this.$refs['QSPopup'].hide()
					this.bindPhone = uni.getStorageSync('bindPhone') || false
					if (this.bindPhone === false) {
						this.$refs['QSPopup1'].show()
					} else {
						this.$refs['QSPopup1'].hide()
						this.getUserLocation()
						uni.navigateTo({
							url: "/pages/index/search"
						})
					}
				}
				
			},
			//去我的页面
			onGoHome() {
				this.isLogin = uni.getStorageSync('logged') || false
				if (this.isLogin == false) {
					this.$refs['QSPopup'].show()
				} else {
					this.$refs['QSPopup'].hide()
					this.bindPhone = uni.getStorageSync('bindPhone') || false
					if (this.bindPhone === false) {
						this.$refs['QSPopup1'].show()
					} else {
						this.$refs['QSPopup1'].hide()
						this.getUserLocation()
						uni.navigateTo({
							url: "/pages/my/my"
						})
					}
				}
				
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
				my.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(JSON.stringify(res))
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
				let vm = this;
				let qqmapsdk = new QQMapWX({
					key: 'OHYBZ-6333O-T2XWH-SQ6JK-4WGZF-O4BKO' //key秘钥 
				});
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						let province = res.result.ad_info.province
						let city = res.result.ad_info.city
						vm.province = province,
							vm.latitude = latitude,
							vm.longitude = longitude,
							vm.city = city,
							vm.site = res.result.address
							vm.$refs['zoomInViewImageDom'].isshowsite(vm.site)
							// console.log(vm.site)
							vm.getMap();
					},
					fail: function(res) {
						// console.log(res);
					},
					complete: function(res) {
						// console.log(res);
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	.box {
		width: 750upx;
		height: 80upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.icon {
		width: 60upx;
		height: 60upx;
	}
	.icon3 {
		width: 200upx;
		height: 200upx;
	}

	.bg2 {
		background: linear-gradient(270deg, rgb(244, 178, 73), rgb(253, 203, 123));
	}

	.search {
		width: 52upx;
		height: 52upx;
	}

	.nav {
		width: 35upx;
		height: 35upx;
	}

	.tab2 {
		width: 520upx;
		bottom: 100upx;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
	}

	.scan {
		width: 240upx;
		height: 240upx;
		position: absolute;
		left: 50%;
		bottom: 25upx;
		transform: translate(-50%, 0);
		z-index: 99;
	}

	.tab-h {
		height: 90upx;
		border-radius: 50upx;
		width: 520upx;
	}

	.tab-h2 {
		height: 70upx;
		border-radius: 35upx;
		width: 500upx;
		border: 2upx solid #F2F2F2;
		// background: rgb(244, 178, 73);
	}

	.avater {
		width: 80upx;
		height: 80upx;
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

	.h3 {
		height: 50upx;
		width: 120upx;
		border: 2upx solid #FFFFFF;
		border-radius: 50upx;
		margin-left: 50upx;
	}

	.content {
		text-align: center;
		height: 400upx;
	}

	.bder-r-white {
		// border-right: 2upx solid #FFFFFF;
	}

	.page-section {
		z-index: 0;
	}

	.store-tips {
		width: 600upx;
		height: 128upx;
		margin: 10upx auto;
		border-radius: 10upx;
		position: absolute;
		top: 100upx;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 2;
		overflow: hidden;

		.store-des-box {
			padding: 10upx;
			background: #fff;
		}

		.store-img {
			width: 100upx;
			height: 100upx;
			border-radious: 10upx;
			margin: 10upx;
			float: left;
		}

		.store-des {
			padding-top: 8upx;
			float: left;
			line-height: 1;
			font-size: 22upx;
			color: #666;
			padding-left: 20upx;

			.store-name {
				font-weight: 600;
				color: deeppink;
			}
		}

		.store-clear {
			width: 40upx;
			height: 40upx;
		}
	}

	.address-i {
		width: 40upx;
		height: 40upx;
	}

	.near-num {
		padding: 10upx 20upx;
		border-radius: 10upx;
	}

	#myMap {
		width: 100vw;
		height: 100vh;
	}

	.address-icon {
		width: 38rpx;
		height: 40rpx;
		position: absolute;
		top: 23%;
		left: 50%;
		z-index: 2;
		margin-bottom: -20upx;
		margin-left: -20upx;

	}

	.near-num {
		// padding: 10upx 20upx;
		border-radius: 10upx;
		position: absolute;
		top: 21%;
		left: 50%;
		z-index: 2;
		font-size: 24upx;
		background: #fff;
		transform: translate(-50%, 0)
	}
	
	.show4-btn{
		width: 380upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 35upx;
	}
	button::after{ border: none;}
</style>
