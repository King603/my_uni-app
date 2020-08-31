<template>
	<view class="box my-flex-col-c">
		<view class="box class-goods my-bg-f5">
			<swiper
				class="v115-class-goods-scroll swiper-height"
				:indicator-dots="true"
				:autoplay="true"
				:interval="3000"
				:duration="1000"
				indicator-color=""
				indicator-active-color="rgba(244, 178, 73, .5)"
				:circular="true"
			>
				<swiper-item class="class-height">
					<image
						class="pic my-rds-5 class-swiper"
						src="https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xrBvRvRdqi_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.uWv0gwb6Chcmb16d15235e9ed063ddd36f9f8e899271.png"
						mode="aspectFit"
					></image>
				</swiper-item>
				<swiper-item>
					<image
						class="pic my-rds-5 class-swiper"
						src="https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xrBvRvRdqi_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.uWv0gwb6Chcmb16d15235e9ed063ddd36f9f8e899271.png"
						mode="aspectFit"
					></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="line-char-c">
			<view class="sub-box-line"  >
				<view class="sub-title">
					<text style="margin-right: 30rpx;"></text>
					<text>X30线充租借</text>
					<text style="margin-left: 30rpx;"></text>
				</view>
			</view>
			<view class="dev-no-info"  >
				<view class="title-icon-small"></view>
				<text>设备编号：{{ lineDeviceNo }}</text>
			</view>
			<view class="dev-no-info"  >
				<view class="title-icon-small"></view>
				<text style="margin-top:-10rpx; ">收费详情：</text>
			</view>
			<view style="height: 420rpx;">
				<view class="tc-list-box" @click="doSelect('3分钟')">					 
					<view class="time-val"><text >3m</text></view>
					<view class="time-price"><text >免费</text></view>
				</view>
				<view class="tc-list-box" @click="doSelect('3小时')">
					<view class="time-val"><text>3H</text></view>
					<view class="time-price"><text>¥2.00</text></view>
				</view>
				<view class="tc-list-box" @click="doSelect('8小时')">
					<view class="time-val"><text>8H</text></view>
					<view class="time-price"><text>¥5.00</text></view>
				</view>
				<view class="tc-list-box" @click="doSelect('12小时')">
					<view class="time-val"><text>12H</text></view>
					<view class="time-price"><text>¥8.00</text></view>
				</view>
			</view>
			<view class="dev-no-info"  >
				<view class="title-icon-small"></view>
				<text style="margin-top:-10rpx; ">使用说明：</text>
			</view>
			<view class="use-detail-info" > 
				<view><text>1、请先确认充电设备上的红色指示灯已亮，直接选择需要的时长进行支付。</text></view>
				<view><text>2、支付成功后，页面将会弹出充电密码。</text></view>
				<view><text>3、在设备上输入正确的充电密码，即可开始充电。</text></view>
			</view>
			<view style="margin-top: 100rpx; clear: both;">
				<image @click="agree" src="../../static/my/icon_xuanzhong.png" style="width: 25rpx; height: 25rpx;"></image>
				<text>请阅读并同意</text>
				<text style="color:#f4b249;">《服务协议》</text>
				<text>与</text>
				<text style="color:#f4b249;">《委托扣款授权书》</text>
			</view>
			<view >
				<view class="btn-submit-pay" @click="doLinePay" >
					<view class="btn-submit-pay-line1">{{subtext}}</view>
					<view class="btn-submit-pay-line2">（芝麻分>=550免押金充电）</view>
				</view>
			</view>
		</view>
	
	<QSPopup ref="QSPopup1" type="fadeScaleHeightToLowInMiddle">
		<view class="show4 my-bg-white my-rds-10">
			<view class="my-flex-col-c  my-pd-20 my-rds-10">
				<image class="icon2" src="../../static/my/tick1.png" mode=""></image>
				<view style="font-weight: 500;" class="my-font-14 my-mgt-10">支付成功</view>
				<button class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white" @click="getPwds">查看密码</button>
			</view>
		</view>
	</QSPopup>
	
	<QSPopup ref="QSPopup2" type="fadeScaleHeightToLowInMiddle">
		<view class="show4 my-bg-white my-rds-10">
			<view class="my-flex-col-c  my-pd-20 my-rds-10">
				<image class="icon2" src="../../static/my/tick1.png" mode=""></image>
				<view style="font-weight: 500;" class="my-font-14 my-mgt-10"><text>您的充电密码为：</text><text class="pwd-text">{{pwdtext}}</text></view>
				<button class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white">{{ssNumber}}s 后关闭密码提示</button>
			</view>
		</view>
	</QSPopup>
	
	<QSPopup ref="QSPopup3" type="fadeScaleHeightToLowInMiddle">
		<view class="show1 my-rds-10">
			<view class="my-bg-white my-flex-col-c my-pd-20 my-flex-warp show1 my-relative my-rds-10">
				<image class="icon3" src="../../static/hch-position/signin.png" mode="aspectFit"></image>
				<text style="font-weight: 500;" class="my-font-14 my-mgt-10">小电兜 ~ 为您续航精彩人生</text>
				<!-- <button open-type="getUserInfo" @getuserinfo="onGetUserInfo" class='my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white'>一键登录</button> -->
				<button
					class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white"
					open-type="getAuthorize"
					@getAuthorize="onGetAuthorize"
					@error="onAuthError"
					scope="userInfo"
				>
					一键登录
				</button>
				<button @click="nologin" class="my-font-16 my-mgt-18 show4-btn my-cl-white" style="background-color: #e3e3e3;">暂不登录</button>
			</view>
		</view>
	</QSPopup>
	
	<QSPopup ref="QSPopup4" style="" type="fadeScaleHeightToLowInMiddle">
		<view class="show1 my-bg-white my-rds-10">
			<view class="my-flex-col-c  my-pd-20 my-rds-10">
				<image class="icon3" src="../../static/hch-position/phone.png" mode="aspectFit"></image>
				<view style="font-weight: 500;" class="my-font-14 my-mgt-10">绑定手机号可享受更多服务</view>
				<button
					class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white"
					open-type="getAuthorize"
					@getAuthorize="onGetAuthorize2"
					@error="onAuthError"
					scope="phoneNumber"
				>
					立即绑定
				</button>
				<button @click="nobindphone" class="my-font-16 my-mgt-18 show4-btn my-cl-white" style="background-color: #e3e3e3;">暂不绑定手机</button>
			</view>
		</view>
	</QSPopup>
	
	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import req from '@/util/req.js';
	import login from '@/util/login.js';
	export default {
	components: {
		QSPopup
	},
	onLoad(options) {
		console.log('onLoad监听页面加载');
		this.lineDeviceNo = options.lineDeviceNo;
		
	},
	onReady() {
		console.log('onReady监听页面初次渲染完成');
		this.sessionKey = uni.getStorageSync('sessionKey') || ''
		this.isLogin = uni.getStorageSync('logged') || false
		if (this.sessionKey==''||this.isLogin == false) {
			this.$refs['QSPopup3'].show()
		} else {
			this.$refs['QSPopup3'].hide()
		}
	},
	onShow() {
		console.log('onShow监听页面显示');
	},
	onHide() {
		console.log('onHide监听页面隐藏');
	},
	onUnload() {
		console.log('onUnload监听页面卸载');
	},
	
	data() {
		return {
			lineDeviceNo: null,
			subtext:'免押金充电',
			bindPhone:false,
			isLogin:false,
			sessionKey:'',
			orderId:'',
			orderNo:'',
			orderPackage:'',
			mch_id:'',
			nonce_str:'',
			sign_type: 'HMAC-SHA256',
			key: 'd22645f9fa764b9b96577afa9191c38b',
			pwdtext:'',
			mytimer:null,
			mytimer2:null,
			ssNumber:300,
		};
	},
	methods: {
		agree(){
			uni.showToast({ title:'您必须同意相关协议才能继续租借',icon:'none' })
		},
		doSelect(str){
			this.subtext = '免押金充电'+str;
		},
		doLinePay(){
			if(this.subtext=='免押金充电'){
				uni.showToast({
					title:'请先选择要充电的套餐',
					icon:'none'
				})
				return;
			}
			
			let params = {hour:'1',sn:this.lineDeviceNo};
			req.request('POST', params, '/user/user/order', '加载中', res => {
				switch(res.statusCode){
					case  200 :
					
				this.orderId = res.data.orderId;
				this.orderNo = res.data.orderId;
				this.orderPackage = res.data.orderId;
				
				this.onLease();
				
				
				
					
					
					break;
					case 401:
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
					break;
					default :
					uni.showToast({
						title: res.data.message + ' errcode:' + res.statusCode,
						icon: 'none'
					});
					break;
				}
			})
			
			
			
			
		},
		onLease(){
			var orderNo = this.orderNo;
			this.randomWord();
			// console.log(this.nonce_str)
			var timestamp = Date.parse(new Date());
			var a = 'mch_id=' + this.mch_id + '&nonce_str=' + this.nonce_str + '&package=' + this.orderPackage + '&sign_type=HMAC-SHA256&timestamp=' + timestamp;
			// console.log(a)
			var b = a + '&key=' + this.key;
			var sign = CryptoJS.HmacSHA256(b, this.key)
				.toString()
				.toUpperCase();
			wx.openBusinessView({
				businessType: 'wxpayScoreUse',
				extraData: {
					mch_id: this.mch_id,
					package: this.orderPackage,
					timestamp: '' + timestamp,
					nonce_str: this.nonce_str,
					sign_type: 'HMAC-SHA256',
					sign: sign
				},
				success(res) {
					//console.log(res, 111);
					// let _this=this
					let params = {};
					//console.log(orderNo);
					this.mytimer = setInterval(() => {
						req.request('GET', params, '/user/user/order/' + orderNo, '加载中', res => {
							if (res.statusCode === 200) {
								if (res.data.data.orderStatus === 'CREATING') {
									//console.log(111);
									uni.showToast({
										title: '出宝中',
										icon: 'none'
									});
									//if(this.mytimer!=null)
									// clearInterval(this.mytimer)
								} else if (res.data.data.orderStatus === 'UNSETTLED') {
									if(this.mytimer!=null)
									clearInterval(this.mytimer)
									this.pwdtext = res.data.slotId;
									this.$refs['QSPopup1'].show(); 
									this.mytimer2 = setIntervalsetInterval(() => {
										this.ssNumber--;
										if(this.ssNumber<=0){
											clearInterval(this.ssNumber);
											this.$refs['QSPopup1'].hide();
											this.$refs['QSPopup2'].hide();
										}
									})
								} else if (res.data.data.orderStatus === 'SETTLED') {
									uni.showToast({
										title: '已结算',
										icon: 'none'
									});
									if(this.mytimer!=null)
									clearInterval(this.mytimer);
								} else if (res.data.data.orderStatus === 'TIMEOUT') {
									uni.showToast({
										title: '订单超时',
										icon: 'none'
									});
									if(this.mytimer!=null)
									clearInterval(this.mytimer);
								} else {
									uni.showToast({
										title: '租借失败',
										icon: 'none'
									});
									if(this.mytimer!=null)
									clearInterval(this.mytimer);
								}
							} else {
								if(this.mytimer!=null)
								clearInterval(this.mytimer);
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								});
								this.onPages();
							}
						});
					}, 2000);
				},
				fail(res) {
					//console.log(res, 222);
					this.$refs['QSPopup'].show();
					uni.showToast({
						title: res,
						icon: 'none'
					});
				}
			});
		},
		randomWord(){
			var chars = [
				'0',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'A',
				'B',
				'C',
				'D',
				'E',
				'F',
				'G',
				'H',
				'I',
				'J',
				'K',
				'L',
				'M',
				'N',
				'O',
				'P',
				'Q',
				'R',
				'S',
				'T',
				'U',
				'V',
				'W',
				'X',
				'Y',
				'Z',
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z'
			];
			var nums = '';
			for (var i = 0; i < 32; i++) {
				var id = parseInt(Math.random() * 61);
				nums += chars[id];
			}
			this.nonce_str = nums;
		},
		getPwds(){
			this.$refs['QSPopup2'].show(); 
		},
		// 获取手机号
		getPhoneNumber(e) {
			try {
				let params = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				};
				//console.log('eee', e);
				req.request('POST', params, '/user/user/bind', '加载中', res => {
					//console.log(res);
					if (res.statusCode === 200) {
						uni.showToast({title: '绑定成功',icon: 'none'});
						uni.setStorageSync('bindPhone', true);
						this.$refs['QSPopup4'].hide();
					}else if(res.statusCode === 401){
						uni.showToast({title: '登录失效',icon: 'none'});
					}else{
						uni.showToast({title: '服务器返回错误'+res.statusCode,icon: 'none'});
					}
				});
			} catch (e) {
				uni.showToast({
					title: e,
					icon: 'none'
				});
			}
		},
		// 获取用户信息
		onGetUserInfo() {
			login.userLogin().then(
				res => {
					//console.log('登录成功：' + res);
					var bindPhone = uni.getStorageSync('bindPhone');
					//console.log('dianhua', bindPhone);
					if (bindPhone.length == 0 || bindPhone == false) {
						this.$refs['QSPopup4'].show();
					} else {
						this.$refs['QSPopup4'].hide();
						this.bindPhone = uni.getStorageSync('bindPhone');
					}
				},
				error => {
					console.log('登录失败：' + error);
				}
			);
			this.$refs['QSPopup3'].hide();
		},
		// 获取用户手机号
		onGetAuthorize2(e) {
			try {
				my.getPhoneNumber({
					success: res => {
						var encryptedData = JSON.parse(res.response).response;
						// 绑定用户手机号
						let params = {
							encryptedData: encryptedData
						};
						//uni.showToast({ title: '处理中', icon: 'none' });
						req.request('POST', params, '/user/alipay/user/bind', '加载中', res => {
							//console.log(res);
							if (res.statusCode === 200) {
								uni.showToast({
									title: '绑定成功',
									icon: 'none'
								});
								uni.setStorageSync('bindPhone', true);
								this.$refs['QSPopup4'].hide();
							}else if(res.statusCode === 401){
						uni.showToast({title: '登录失效',icon: 'none'});
					}else{
						uni.showToast({title: '服务器返回错误'+res.statusCode,icon: 'none'});
					}
						});
					},
					fail: res => {
						//console.log('fails', res);
						uni.showToast({
							title: '请先绑定手机',
							icon: 'none'
						});
					}
				});
			} catch (e) {
				//console.log(e);
				uni.showToast({
					title: '手机绑定错误',
					icon: 'none'
				});
			}
		},
		nobindphone() {
			this.$refs['QSPopup4'].hide();
		},
		// 获取用户信息
		onGetAuthorize(res) {
			try {
				login.userLogin().then(
					res => {
						var bindPhone = uni.getStorageSync('bindPhone');
						if (bindPhone.length == 0 || bindPhone == false) {
							this.$refs['QSPopup4'].show();
						} else {
							this.$refs['QSPopup4'].hide();
							this.bindPhone = uni.getStorageSync('bindPhone');
						}
					},
					error => {
						//console.log('登录失败：' + error)
					}
				);
				this.$refs['QSPopup3'].hide();
			} catch (e) {
				//console.log(e);
				uni.showToast({
					title: e,
					icon: 'none'
				});
			}
		},
		nologin(){
			
		}
	}
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
text{
	font-weight: 400;
	font-family:PingFang SC;
}
.time-val{
	margin-top: 15rpx;
	width: 210rpx;
	height: 50rpx;
	font-size:30rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:50rpx;
	text-align: center;
}
.time-price{
	width: 210rpx;
	height: 50rpx;
	font-size:30rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:50rpx;
	text-align: center;
}
.tc-list-box{
	margin-top: 10rpx;
	margin-left: 10rpx;
	width:210rpx;
	height:120rpx;
	background:rgba(244,178,73,1);
	border-radius:5px;
	float: left;
}
.line-char-c {
	margin: auto;
	width: 660rpx;
	height: 900rpx;
	background: #ffffff;
}
.use-detail-info{
	font-weight: 400;
	font-size:28rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(57,57,57,1);
}
.title-icon-small {
	position:relative;
	top: 5rpx;
	width: 8rpx;
	height: 30rpx;
	background: #f4b24a;
	border-radius: 4rpx;
	float: left;
	margin-right: 20rpx;
}
.dev-no-info {
	width: 660rpx;
	height: 60rpx;
	line-height: 40rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #3a3a3a;
	float: left;
}
.sub-box-line {
	margin: auto;
	width: 500rpx;
	height: 60rpx;
	margin-top: 30rpx;
}
.sub-title {
	margin: auto;
	text-align: center;
	width: 300rpx;
	height: 31rpx;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(0, 0, 0, 1);
	line-height: 36rpx;
}
.sub-line-line {
	width: 100rpx;
	height: 2rpx;
	background: rgba(245, 245, 245, 1);
	border: 1rpx solid rgba(245, 245, 245, 1);
}
.btn-submit-pay-line1 {
	margin: auto;
	text-align: center;
	height: 50rpx;	
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 70rpx;
}
.btn-submit-pay-line2 {
	margin: auto;
	text-align: center;
	height: 40rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 40rpx;
}
.btn-submit-pay {
	margin: auto;
	width: 640rpx;
	height: 100rpx;
	background: rgba(244, 178, 74, 1);
	border-radius: 50rpx;
}

page {
	background: #ffffff;
}
.my-bg-f5 {
	background: #f5f5f5;
}
.box {
	width: 750upx;
}
.pic {
	width: 670upx;
	height: 260upx;
	padding-left: 10upx;
}
.class-goods {
	padding-left: 30upx;
	padding-top: 22upx;
	padding-right: 30upx;
}
.v115-class-goods-scroll .wx-swiper-dot {
	width: 12upx;
	display: inline-flex;
	height: 12upx;
	justify-content: space-between;
}
.swiper-height {
	height: 300upx;
}
.class-height {
	height: 260upx;
}

	.show4{
		width: 550rpx;
		overflow: hidden;
	}
	.icon2 {
		width: 150upx;
		height: 150upx;
	}
	.icon3 {
		width: 150upx;
		height: 150upx;
	}
	.show4-btn {
		width: 380upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 35upx;
	}
	.pwd-text{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(244, 178, 74, 1);
		line-height:36rpx;
		
	}
</style>
