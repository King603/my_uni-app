<template>
	<view class="box">
		<view class="v-box">
			<view class="v-price">￥99</view>
			<view class="line"></view>
			<view class="text-line-box">
				<view>
					<text class="text-left">购宝扣费</text>
					<text class="text-right text-price">99元</text>
				</view>
				<view>
					<text class="text-left">底座编号</text>
					<text class="text-right">{{ deviceNo }}</text>
				</view>
				<view>
					<text class="text-left">商户名称</text>
					<text class="text-right">{{ businessName }}</text>
				</view>
				<view>
					<text class="text-left">商户地址</text>
					<text class="text-right">{{ businessAddress }}</text>
				</view>
				<view>
					<text class="text-left">创建时间</text>
					<text class="text-right">{{ createTime }}</text>
				</view>
			</view>
		</view>
		<view class="v-box2">
			<view class="pay-box">
				<view class="pay-tp-ico"></view>
				<view class="text-payt-tit"><text>支付方式</text></view>
			</view>
			<view class="button-wx-pay">
				<image class="wx-ico" src="../../static/hch-position/icon_wx.png" width="25px" height="23px"></image>
				<text class="wx-pay-txt">微信支付</text>
				<image class="check-ico" src="../../static/hch-position/icon_xuanzhong.png" width="24px" height="24px"></image>
			</view>
			<view class="button-pay" @click="createOrder">确定支付</view>
		</view>
	</view>
</template>

<script>
import req from '@/util/req.js';
export default {
	data() {
		return {
			deviceNo: '',
			businessName: '',
			businessAddress: '',
			createTime: '',
			mytimer: null
		};
	},
	onLoad(options) {
		//?deviceNo="+this.device.deviceNo+"&businessName="+device.businessName
		this.deviceNo = options.deviceNo || '';
		this.businessName = options.businessName || '';
		this.businessAddress = options.businessAddress || '';
		this.createTime = this.getNowDateTime();
	},
	onUnload() {
		if(this.mytimer!=null){
			clearInterval(this.mytimer)
		}
	},
	methods: {
		getNowDateTime() {
			var d = new Date();
			var ye = d.getFullYear();
			var mo = (d.getMonth() + 1).toString().padStart(2, '0');
			var da = d
				.getDate()
				.toString()
				.padStart(2, '0');
			var hh = d
				.getHours()
				.toString()
				.padStart(2, '0');
			var mm = d
				.getMinutes()
				.toString()
				.padStart(2, '0');
			var ss = d
				.getSeconds()
				.toString()
				.padStart(2, '0');
			var time = ye + '-' + mo + '-' + da + ' ' + hh + ':' + mm + ':' + ss;
			return time;
		},
		payFinish() {
			uni.redirectTo({
				url: '/pages/test/eject?typeId=1&slotId=' + 1
			});
		},
		createOrder() {
			//购宝创建订单并唤起支付
			let params = {
				hour: 0,
				sn: this.deviceNo
			};
			console.log(params);
			uni.showLoading({
				title:'请稍候',mask:true
			})
			req.request('POST', params, '/user/user/buy/order', '加载中', res => {
				uni.hideLoading();
				if (res.statusCode === 200) {
					//创建订单
					var nonceStr = res.data.data.nonceStr;
					var orderNo = res.data.data.orderNo;
					var packageValue = res.data.data.packageValue;
					var paySign = res.data.data.paySign;
					var signType = res.data.data.signType;
					var timeStamp = res.data.data.timeStamp;
					var radeNo = res.data.data.tradeNo;
					console.log(nonceStr);
					console.log(orderNo);
					console.log(packageValue);
					console.log(paySign);
					console.log(signType);
					console.log(timeStamp);
					console.log(radeNo);
					//利用以上参数唤起支付  支付完成后弹宝
					uni.requestPayment({
						timeStamp: timeStamp,
						nonceStr: nonceStr,
						package: packageValue,
						signType: signType,
						paySign: paySign,
						success: res => {
							
							let params2 = {};
							this.mytimer = setInterval(() => {
								req.request('GET', params2, '/user/user/buy/order/' + orderNo, '加载中', res => {
									if (res.statusCode === 200) {
										console.log('购宝支付后查询订单');
										console.log(res);
										if (res.data.code == 0) {
											switch (res.data.orderStatus) {
												case 'CREATING': //出宝中
													uni.showToast({
														title: '出宝中',
														icon: 'none'
													});
													break;
												case 'BUY_SUCCESS':
												uni.redirectTo({
													url: '/pages/test/eject?typeId=1&slotId=' + res.data.data.slotId,
													success: () => {
														if (this.mytimer != null) {
															clearInterval(this.mytimer);
														}
													}
												});
												break;
												case 'UNSETTLED': //租借中
													uni.showToast({
														title: '租借中',
														icon: 'none'
													});
													if (this.mytimer != null) {
														clearInterval(this.mytimer);
													}
													break;
												case 'SETTLED': //已结算
													uni.showToast({
														title: '已结算',
														icon: 'none'
													});
													if (this.mytimer != null) {
														clearInterval(this.mytimer);
													}
													break;
												case 'TIMEOUT': //订单超时
													uni.showToast({
														title: '订单超时',
														icon: 'none'
													});
													if (this.mytimer != null) {
														clearInterval(this.mytimer);
													}
													break;
												case 'FAILURE': //租借失败
													uni.showToast({
														title: '租借失败',
														icon: 'none'
													});
													if (this.mytimer != null) {
														clearInterval(this.mytimer);
													}
													break;
												default:
													console.log('购宝查询订单状态发生其他情况：');
													console.log(res.data.message);
													console.log(res.data.orderStatus);
													break;
											}
										}
										// {
										//   "code": 0,
										//   "data": {
										//     "orderStatus": "CREATING(出宝中), UNSETTLED(租借中), SETTLED(已结算), TIMEOUT(订单超时), FAILURE(租借失败)",
										//     "slotId": 0
										//   },
										//   "message": "string",
										//   "requestId": "string"
										// }
									}
								});
							}, 2000);
						},
						fail: res => {
							uni.reLaunch({
								url: '/pages/index/index',
								success: () => {
									uni.showToast({ title: '正在处理操作中断的订单，请稍后再试', icon: 'none' });
								}
							});
						}
					});
					//to do...
				} else if (res.statusCode === 401) {
					uni.removeStorageSync('logged');
					uni.redirectTo({
						url: '/pages/index/index',
						success: () => {
							uni.showToast({
								title: '登录失效',
								icon: 'none'
							});
						}
					});
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					});
					console.log('接口返回值错误');
				}
			});
		}
	}
};
</script>

<style>
page {
	background: #f0f0f0;
}
.box {
	width: 750upx;
	margin: auto;
	background-color: #f0f0f0;
}
.line {
	height: 3px;
	background: rgba(238, 238, 238, 1);
	width: 90%;
	margin: auto;
}
.v-box {
	margin: auto;
	width: 95%;
	height: 250px;
	background: #ffffff;
	border: rgba(8, 8, 8, 0.2) solid 1px;
	border-radius: 4px;
	margin-top: 8px;
}
.v-box2 {
	margin: auto;
	width: 95%;
	height: 190px;
	background: #ffffff;
	border: rgba(8, 8, 8, 0.2) solid 1px;
	border-radius: 4px;
	margin-top: 16px;
}
.v-price {
	width: 99%;
	height: 80px;
	font-size: 70px;
	font-family: PingFang SC;
	font-weight: bold;
	color: #f4b249;
	line-height: 80px;
	text-align: center;
}
.text-line-box {
	margin: auto;
	width: 90%;
	margin-top: 15px;
}
.text-left {
	height: 23px;
	font-size: 12px;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(195, 195, 195, 1);
	line-height: 23px;
}
.text-right {
	float: right;
	height: 23px;
	font-size: 12px;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(195, 195, 195, 1);
	line-height: 23px;
}
.text-price {
	color: #f4b249;
}

.pay-box {
	width: 95%;
	height: 50px;
}
.pay-tp-ico {
	float: left;
	background-color: rgba(243, 178, 73, 1);
	width: 8px;
	height: 20px;
	margin: 8px;
}
.text-payt-tit {
	float: left;
	width: 126px;
	height: 31px;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
	line-height: 36px;
}
.button-wx-pay {
	margin: auto;
	width: 80%;
	height: 50px;
	border: rgba(243, 178, 73, 1) solid 1px;
	border-radius: 40px;
}
.wx-ico {
	width: 25px;
	height: 23px;
	float: left;
	margin-top: 12px;
	margin-left: 12px;
}
.wx-pay-txt {
	float: left;
	font-family: PingFang SC;
	margin-top: 12px;
	margin-left: 10px;
	font-weight: bold;
}
.check-ico {
	width: 24px;
	height: 24px;
	float: right;
	margin-top: 10px;
	margin-right: 15px;
}
.button-pay {
	margin: auto;
	margin-top: 15px;
	text-align: center;
	font-family: PingFang SC;
	font-weight: bold;
	font-size: 24px;
	color: #ffffff;
	width: 70%;
	height: 50px;
	line-height: 50px;
	border-radius: 40px;
	background-color: #f4b249;
}
</style>
