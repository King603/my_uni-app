<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="myMap" style="width: 100%;height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="markers"
				 show-location enable-scroll @tap="bindtap" @markertap="callouttap" @regionchange="regionchange" @updated="updated">
				</map>
			</view>
				<view :class="showBl?'my-show':'my-hide'">
					<QSPopup ref="QSPopup11" type="fadeScaleHeightToLowInMiddle">
						<view class="my-bg-white my-rds-10 box-show1">
							<view class="my-flex-row-align-c show2">
								<image src="../../static/hch-position/pinpaiicon@2x.png" class="pic"></image>
								<text class="my-font-16 my-cl-33">商户名称-{{store.businessName}}</text>
							</view>
							<view class=" my-flex-row-align-c my-font-14 my-cl-90" style="margin-top: 37upx;">
								<image src="../../static/hch-position/1021@3x.png" class="pic1"></image>
								<view class="my-flex-row icon-pic" style="padding-top: 22upx;">
									<view class="" style="width: 140upx;">出发地址：</view>
									<view class="" style="width: 360upx;">
										{{site}}
									</view>
								</view>	
							</view>
							<view class="icon1" ></view>
							<view class="icon2"></view>
							<view class="my-flex-row-align-c my-font-14 my-cl-90 ">
								<image src="../../static/hch-position/102@3x.png" class="pic1"></image>
								<view class="my-flex-row icon-pic" style="padding-top: 22upx;">
									<view class="" style="width: 140upx;">终点地址：</view>
									<view class="" style="width: 360upx;">
										{{store.address}}
									</view>
								</view>
							</view>
							<view class="my-flex-col-c my-font-15 my-cl-3B" style=" margin-top: 44upx;">
								<view>是否导航到商户-{{store.address}}</view>
								<view class="my-mgt-13 my-flex-row-align-c">
									<view class="">
										<text>租借充电宝</text>
									</view>
									<view class="my-mgl-20">
										<text>距您</text>
										<text class="my-cl-F3">{{store.distance}}M</text>
									</view>
									
								</view>
							</view>
							<view class="my-flex-row-b my-pd-20 my-mgt-10">
								<view class="cancel my-font-14" @click="onClose">取消</view>
								<view class="navn my-font-14" @click="onNav">立即导航</view>
							</view>
						</view>
					</QSPopup>
				</view>
				
			<!-- <view class="store-tips">
				<cover-view class="store-des-box" v-if="storeFlag" @tap="storeDesEvn"> -->
					<!-- <cover-image class="store-img" src="/static/hch-position/1.jpg"></cover-image> -->
					<!-- <cover-view class="store-des">
						<cover-view class="store-name">{{store.name}}</cover-view>
						<cover-view class="store-address my-mgt-5">地址:{{store.address}}</cover-view>
						<cover-view class="store-tel my-mgt-5">电话:{{store.tel}}</cover-view>
					</cover-view>
				</cover-view> -->
				<!-- <cover-image v-if="storeAdFlag" class="store-ad" src="/static/hch-position/ad.jpg"></cover-image> -->
				<!-- <cover-image v-if="storeAdFlag" class="store-clear" @tap="hideAd" src="/static/hch-position/clear.png"></cover-image> -->
			<!-- </view> -->
			<!-- <cover-view class="near-num my-flex-row-align-c" style="z-index: 11;">
				<cover-image class="my-mgr-10 address-i" src="/static/hch-position/address.png"></cover-image>
				<cover-view>距离最近的门店{{distanceL}}千米</cover-view>
			</cover-view> -->
		</view>
	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	export default {
		components:{
			QSPopup
		},
		props: {
			storeData: {
				type: Array,
				required: true
			},
			markers: {
				type: Array,
				required: true
			},
			site:{
				type:null,
				required:true
			}
		},
		data() {
			return {
				store: {},
				storeFlag: false,
				showBl:true,
				storeAdFlag: true,
				distanceL: 0, //附近店门的距离
				//          storeData:[
				// 	{
				// 		id:1,
				// 		name:'门店1号',
				// 		address:'厦门市思明区汇景商业广场XXX1号',
				// 		tel:'12345678900',
				// 	},{
				// 		id:2,
				// 		name:'门店2号',
				// 		address:'厦门市思明区汇景商业广场XXX2号',
				// 		tel:'12345678900',
				// 	},
				// ],
				latitude:null,
				longitude:null,
				//         markers: [
				// {
				// id:1,
				//             latitude: 24.4483294023427,
				//             longitude: 118.08479034393311,
				//             iconPath: '/static/hch-position/门店.png',
				// callout:{
				// 	content:"门店1号店",
				// 	borderRadius:10,
				// 	padding:10,
				// 	display:"ALWAYS",
				// }
				//         }, {
				// id:2,
				//             latitude: 24.45580,
				//             longitude: 118.12266,
				//             iconPath: '/static/hch-position/门店.png',
				// callout:{
				// 	content:"门店2号店",
				// 	borderRadius:10,
				// 	padding:10,
				// 	display:"ALWAYS",
				// }
				//         }],
				controls: [

				]
			}
		},
		methods: {
			
			// 点击了门店信息
			storeDesEvn() {
				uni.showToast({
					title: '自己自定义跳门店详情页介绍',
					duration: 2000,
					icon: 'none'
				});
			},
			// 点击气泡
			callouttap(e) {
				
				this.storeFlag = true;
				this.storeAdFlag = false;
				for (let i = 0; i < this.storeData.length; i++) {
					const ele = this.storeData[i];
					if (ele.id == e.markerId) {
						this.store = ele;
						this.latitude=ele.addressLatitude;
						this.longitude=ele.addressLongitude;
						// this.$emit('stores',ele)
						break;
					}
				}
				let distance = Number(this.store.distance)
				this.store.distance=distance.toFixed(2)
				this.$emit('st',this.store)
				this.showBl=true;
				this.$refs['QSPopup11'].show();
			},
			onClose(){
				this.showBl=false
				uni.navigateBack({
					delta:1,
				})
			},
			// 点击地图
			bindtap(id) {
				this.storeFlag = false;
				// this.storeAdFlag=true;
				
			},
			// 隐藏广告图片
			hideAd() {
				this.storeAdFlag = false;
			},
			updated() {
				let _this = this;
				wx.getLocation({
					type: 'gcj02', //返回可以用于wx.openLocation的经纬度
					success: function(res) {
						_this.latitude = res.latitude;
						_this.longitude = res.longitude;
						_this.nearDistance(_this.markers, _this.latitude, _this.longitude)
					},
					fail: function(res) {
						console.log(res);
					}
				})
			},
			// 改变视野时改变经纬度
			regionchange(e) {
				console.log(99)
				let _this = this;
				// 使用 wx.createMapContext 获取 map 上下文
				var mapCtx = wx.createMapContext('myMap', this)
				mapCtx.getCenterLocation({
					success: function(res) {
						_this.centerLatitude = res.latitude;
						_this.centerLongitude = res.longitude;
						_this.nearDistance(_this.markers, _this.centerLatitude, _this.centerLongitude)
					},
					fail: function(res) {
						console.log(res);
					}
				}) //获取当前地图的中心经纬度
			},
			// 两点间距离
			distance(la1, lo1, la2, lo2) {
				var La1 = la1 * Math.PI / 180.0;
				var La2 = la2 * Math.PI / 180.0;
				var La3 = La1 - La2;
				var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
					Lb3 / 2), 2)));
				s = s * 6378.137; //地球半径
				s = Math.round(s * 10000) / 10000;
				return s
			},
			// 计算最近的距离
			nearDistance(array, centerLatitude, centerLongitude) {
				let temp = []
				for (let i = 0, l = array.length; i < l; i++) {
					const element = array[i];
					let d = this.distance(element.latitude, element.longitude, centerLatitude, centerLongitude);
					temp.push(d)
				};
				this.distanceL = Math.min.apply(null, temp);
			},
			// 获取地理位置
			getLocationInfo(){  
				uni.getLocation({
					type: 'wgs84',
					success (res) {
						// console.log(res);
					}
				});
				
			},
			
			onNav() {
				 uni.openLocation({
				 	latitude : Number(this.latitude),
				 	longitude : Number(this.longitude),
				 	
				 })
			}


		},
		onShow() {

		},
		onReady() {
			uni.getLocation({
				type: 'wgs84',
				success (res) {
					// console.log(res);
				}
			});
		},
	}
</script>

<style lang="scss">
	.page-body{
		position: absolute;
		width: 750upx;
		top: 0;
		left: 0;
	}
	.box {
		width: 750upx;
		height: 80upx;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.h {
		height: 60upx;
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
		top: 400upx;
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
			position: absolute;
			top:200upx;
			left: 50upx;
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
	.box-show1{
		width: 611upx;
		
	}
	.pic{
		width: 48upx;
		height: 48upx;
		padding-left: 33upx;
		padding-right: 17upx;
	}
	.pic1{
		width: 50upx;
		height: 50upx;
		padding-left: 34upx;
		padding-right: 16upx;
	}
	.show2{
		justify-content: flex-start;
		height: 105upx;
		border-bottom: 2upx dashed #F3B249;
		border-radius:  20upx 20upx 0 0;
	}
	.cancel{
		width: 240upx;
		height: 68upx;
		background-color: #3288F9;
		border-radius: 50upx;
		color: #FFFFFF;
		line-height: 68upx;
		box-shadow: 0 6upx 8upx 2upx #3288F9;
	}
	.navn{
		width: 240upx;
		height: 68upx;
		background-color: #F3B249;
		border-radius: 50upx;
		color: #FFFFFF;
		line-height: 68upx;
		box-shadow: 0 6upx 8upx 2upx #F3B249;
	}
	.icon1{
		width: 5upx;
		height: 5upx;
		background: #BBC6C7;
		border-radius: 50%;
		margin-left: 58upx;
		margin-bottom: 12upx;
		// margin-top: 4upx;
	}
	.icon2{
		width: 5upx;
		height: 5upx;
		background: #BBC6C7;
		border-radius: 50%;
		margin-left: 58upx;
		// margin-bottom: 4upx;
	}
	.icon-pic{
		height: 80upx;
		text-align: left;
	}
</style>
