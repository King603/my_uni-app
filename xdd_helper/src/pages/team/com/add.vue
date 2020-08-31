<template>
	<view class="my-flex-col-c">
		<view class="my-flex-col-c img-box my-mgt-10 h">
			<image :src='mydata.logoUrl' class="no-pic" style="width: 100%;" mode="widthFix"></image>
		</view>
		<text class="my-cl-grey my-pd-5 my-font-12">注：请上传商户的店面照片</text>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-row-c" @click="onSelect">
			<text>选择现有商户</text>
			<image class="my-mgl-8 icon" src="/static/team/onclick.png" mode=""></image>
		</view>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c">
			<view class="my-flex-row-c box my-mgb-15">
				<text class="my-font-16">商户信息</text>
				<!-- <image src="/static/team/edit-2.png" class="icon my-flex-self-e" mode="" @click="onCancel"></image> -->
			</view>
			<view class="box my-flex-col-c">
				<view class="my-flex-row box my-cl-grey my-mgb-15">
					<view class="text my-flex-row-b"><text>商</text><text>户</text><text>名</text><text>称</text></view>
					<input class="input-txt my-mgl-30 my-bder-b" type="text" :value="mydata.businessName" disabled="true"/>
				</view>
				<view class="my-flex-row box my-cl-grey my-mgb-15">
					<view class="text my-flex-row-b my-flex-self-s"><text>商</text><text>户</text><text>地</text><text>址</text></view>
					<input class="input-txt my-mgl-30 my-bder-b" type="text" :value="mydata.address" disabled="true"/>
				</view>
				<view class="my-flex-row box my-cl-grey my-mgb-15">
					<view class="text my-flex-row-b"><text>联</text><text>系</text><text>人</text></view>
					<input class="input-txt my-mgl-30 my-bder-b" type="text" :value="mydata.name" disabled="true"/>
				</view>
				<view class="my-flex-row box my-cl-grey my-mgb-15">
					<view class="text my-flex-row-b"><text>联</text><text>系</text><text>电</text><text>话</text></view>
					<input class="input-txt my-mgl-30 my-bder-b" type="text" :value="mydata.phone" disabled="true"/>
				</view>
			</view>
		</view>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c my-mgtb-15">
			<text class="my-font-16">商户分润</text>
			<view class="box my-flex-col-c">
				<!-- <view class="my-flex-row box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>商</text><text>户</text><text>分</text><text>润</text><text>金</text><text>额</text></view>
					<input class="w-100 my-mgl-30 my-bder-b" type="digit" value="" placeholder="请输入金额" placeholder-class="my-cl-grey" /><text>元</text>
				</view> -->
				<view class="my-flex-row box my-cl-grey my-mgt-5">
					<view class="txt my-flex-row-align-c">
						<text :class="mydata.noStandardProfit===true?'my-cl-ye':'my-cl-grey'">非标准分润</text>
						<switch :checked="!mydata.noStandardProfit" color="#f8c470" class="tr my-mglr-10 my-flex-row-c" disabled="true"/>
						<text :class="mydata.noStandardProfit===false?'my-cl-ye':'my-cl-grey'">标准分润</text>
					</view>
				</view>
				<view class="my-flex-row box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>分</text><text>润</text><text>比</text><text>例</text></view>
					<input class="w-100 my-mgl-30 my-bder-b" type="digit" :value="mydata.profitScale" disabled="true" /><text>%</text>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>查</text><text>看</text><text>订</text><text>单</text><text>权</text><text>限</text></view>
					<view class="txt my-flex-row-align-c">
						<text :class="mydata.orderPermission===true?'my-cl-ye':'my-cl-grey'">开</text>
						<switch :checked="mydata.orderPermission" color="#f8c470" class="tr my-mglr-10 my-flex-row-c" disabled="true" />
						<text :class="mydata.orderPermission===false?'my-cl-ye':'my-cl-grey'">关</text>
					</view>
				</view>
			</view>
		</view>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c my-mgtb-15">
			<text class="my-font-16">收费设置</text>
			<view class="box my-flex-col-c">
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>计</text><text>费</text><text>单</text><text>价</text></view>
					<view class="txt my-flex-col">
						<view class="txt my-flex-row-align-c">
							<text>H60</text>
							<input class="my-mgl-30 my-bder-b w-100" type="digit" :value="business[0].unitPrice" disabled="true"/><text>元/小时</text>
						</view>
					</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>封</text><text>顶</text><text>值</text></view>
					<!-- <input type="digit" value="" class="txt my-flex-row-align-c" placeholder="请输入金额"></input><text>元</text> -->
					<view class="txt my-flex-row-align-c">
						<input type="digit" :value="business[0].top" class="txt1 my-bder-b my-flex-row-align-c" disabled="true"></input>
						<text>元</text>
					</view>
				</view>
			</view>
			
			<!-- <view class="box my-flex-col-c">
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>计</text><text>费</text><text>单</text><text>价</text></view>
					<view class="txt my-flex-col">
						<view class="txt my-flex-row-align-c">
							<text>X10</text>
							<input class="my-mgl-30 my-bder-b w-100" type="digit" :value="business.unitPrice" disabled="true"/><text>元/小时</text>
						</view>
					</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>封</text><text>顶</text><text>值</text></view>
					<view class="txt my-flex-row-align-c">
						<input type="digit" :value="business.top" class="txt1 my-bder-b my-flex-row-align-c" disabled="true"></input>
						<text>元</text>
					</view>
				</view>
			</view> -->
			
			
			
		</view>
		<view class="my-mgt-15 btn1 my-bg-ye my-font-16 my-cl-white my-flex-row-c" @click="onMedic">铺设</view>
		<goTop :top="top"></goTop>
	</view>
</template>

<script>
	import req from "@/util/req.js"
	import goTop from "@/components/goTop/goTop"
	export default {
		data() {
			return {
				index: 0,
				edit: false,
				top: false,
				addxress: [],
				switchOrder: false,
				switchSta: false,
				deviceIds: [],
				deviceType: "",
				select:0,
				mydata:null,
				business:null
			}
		},
		components: {
			goTop
		},
		computed: {

		},
		onShow() {
			var pages = getCurrentPages(); 
			var currPage = pages[pages.length - 1]; //当前页面 
			this.mydata=currPage.mydata;
			console.log(this.mydata);
			if(this.mydata!=null){
				this.getbisness();
			}
		},
		onLoad(options) {
			this.deviceType = options.deviceType
			this.deviceIds = options.deviceIds.split(',')
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
			// 获取选中商户的具体信息
			getbisness(){
				var params={
					businessId:this.mydata.id
				};
				req.request('GET',params, '/proxy/business/'+this.mydata.id, '加载中',(res)=>{
					if(res.statusCode === 200){
						this.business=res.data.data.deviceList;
						// 用户设置信息
					}
				})
			},
			onSelect() {
				uni.navigateTo({
					url: "/pages/medic/com?deviceIds=" + this.deviceIds + "&&deviceType=" + this.deviceType
				})
			},
			onMedic() {
				// 铺货
				var data = {
					deviceNos: this.deviceIds,
					deviceType: this.deviceType,
					userId:this.mydata.id,
					userType: "BUSINESS"
				}
				req.request('POST', data, '/proxy/proxy/distribute/device', '加载中', (res) => {
					if (res.statusCode === 200) {
						uni.redirectTo({
							url: "/pages/index/index",
							success: () => {
								uni.showToast({
									title: "铺设成功！",
									icon: "none"
								})
							}
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			// 获取当前地理位置
			getLocal: function(latitude, longitude) {

				var that = this
				uni.chooseLocation({
					success: function(res) {
						// console.log(res, "location")

						hasLocation: true,
						that.location = {
							longitude: res.longitude,
							latitude: res.latitude
						},
						that.address = res.address,
						that.wd = res.latitude,
						that.jd = res.longitude
						// console.log(that.data.location)
						//         var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
						//         var REGION_PROVINCE = [];
						//         var addressBean = {
						//           REGION_PROVINCE: null,
						//           REGION_COUNTRY: null,
						//           REGION_CITY: null,
						//           ADDRESS: null
						//         };

						//         function regexAddressBean(address, addressBean) {
						//           regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
						//           var addxress = regex.exec(address);
						//           addressBean.REGION_CITY = addxress[1];
						//           addressBean.REGION_COUNTRY = addxress[2];
						//           addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
						//           that.addxress= addxress
						//           // console.log(that.data.addxress, 111);
						//         }
						//         if (!(REGION_PROVINCE = regex.exec(res.address))) {
						//           regex = /^(.*?(省|自治区))(.*?)$/;
						//           REGION_PROVINCE = regex.exec(res.address);
						//           addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
						//           regexAddressBean(REGION_PROVINCE[3], addressBean);
						//         } else {
						//           addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
						//           regexAddressBean(res.address, addressBean);
						//         }
						//         that.setData({
						//           ADDRESS_1_STR: addressBean.REGION_PROVINCE + " " +
						//             addressBean.REGION_CITY + "" +
						//             addressBean.REGION_COUNTRY
						//         });
						// that.setData(addressBean);
						// that.getCode()
						// console.log(that.data.addressBean)
					},
					fail: function(res) {
						console.log(res);
					},
					complete: function(res) {
						// console.log(res);
					}
				});
			},
			//获取地理位置
			onAddress(e) {
				let vm = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						// console.log(JSON.stringify(res))
						var latitude = res.latitude
						var longitude = res.longitude
						var speed = res.speed
						var accuracy = res.accuracy;
						vm.getLocal(latitude, longitude)
						// console.log(this.addxress)
					},
					fail: function(res) {
						console.log('fail' + JSON.stringify(res))
					}
				})
			},
			onNav() {
				uni.openLocation({
					latitude: this.mer[this.index].latitude,
					longitude: this.mer[this.index].longitude,
					name: this.mer[this.index].mer,
					address: this.mer[this.index].address
				})
			},
			
			switchChange: function(e) {
				this.switchOrder = e.target.value
			},
			switchChangeSta: function(e) {
				this.switchSta = e.target.value
			},
		}
	}
</script>

<style>
	page {
		padding-bottom: 30upx;
	}

	.img-box {
		width: 750upx;
		background: #C3C3C3;
	}

	.box {
		width: 100%;
	}

	.tr {
		transform: scale(0.5, 0.5);
		width: 70upx;
	}

	.h {
		height: 300upx;
	}

	.no-pic {
		width: 100upx;
	}

	.icon {
		width: 50upx;
		height: 50upx;
	}

	.txt {
		width: 480upx;
	}

	.txt1 {
		width: 150upx;
	}

	.text {
		width: 180upx;
	}

	.w-100 {
		width: 180upx;
	}

	.btn {
		width: 220upx;
		height: 60upx;
		border-radius: 30upx;
	}

	.btn1 {
		width: 420upx;
		height: 80upx;
		border-radius: 40upx;
	}

	.input-txt {
		width: 320upx;
	}

	.my-absolute {
		bottom: 0;
		left: 0;
	}

	.w-50 {
		width: 50upx;
	}
</style>
