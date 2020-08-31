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
		<view class="box my-flex-col-c my-bg-white my-pdlr-25">
			<view class="my-flex-row-c box my-pdtb-10">
				<view class="my-bder-b line"></view>
				<text class="my-mglr-25 my-font-16">小电兜租借信息</text>
				<view class="my-bder-b line"></view>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>商</text>
					<text>户</text>
					<text>名</text>
					<text>称</text>
				</view>
				<text class="txt my-cl-grey">{{ device.businessName }}</text>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>设</text>
					<text>备</text>
					<text>状</text>
					<text>态</text>
				</view>
				<view class="txt my-flex-row-align-c">
					<view class="dot" :class="device.boxStatus === '离线' ? 'my-bg-red' : 'my-bg-blue'"></view>
					<text class="my-mgl-10" :class="device.boxStatus === '离线' ? 'my-cl-red' : 'my-cl-blue'">{{ device.boxStatus }}</text>
				</view>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>设</text>
					<text>备</text>
					<text>I</text>
					<text>D</text>
				</view>
				<text class="txt my-cl-grey">{{ device.deviceNo }}</text>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>充</text>
					<text>电</text>
					<text>宝</text>
				</view>
				<text class="txt my-cl-grey">可借{{ device.usableCount }}个</text>
			</view>

			<view class="my-pdtb-10 my-flex-row-align-c my-bder-b-cc box my-font-14">
				<view class="txt-box my-flex-row-b my-flex-self-s">
					<text>计</text>
					<text>费</text>
					<text>规</text>
					<text>则</text>
				</view>
				<view class="my-flex-col mgleft">
					<text class="my-cl-ye ">{{ device.unitPrice }}元/小时；</text>
					<text class="my-cl-grey ">(注:租借5分钟内归还免费，单日封顶{{ device.top }}元，支持免押金租借! 芝麻分不足550，需要支付押金{{ device.depositAmount }}元)</text>
				</view>
			</view>

			<view class="my-flex-row-c box my-mgt-20">
				<radio-group class="my-flex-row-align-c my-font-12">
					<radio color="#f8c470" :checked="checked" @click="onConsent" class="tr" />
					<text class="my-cl-grey">请阅读并同意</text>
					<text class="my-cl-ye">《服务协议》</text>
					<text class="my-cl-grey">与</text>
					<text class="my-cl-ye">《委托扣款授权书》</text>
				</radio-group>
			</view>
			<view class="my-flex-row-c box fixed" @click="onPay">
				<view class="my-flex-col-c btn my-bg-ye my-cl-white my-boxsha-2">
					<text class="my-font-16">免押金租借</text>
					<text class="my-font-12 my-mgt-5">（ 支付宝芝麻分≥550免押金租借 ）</text>
				</view>
			</view>
			<!-- 买宝功能未完成 先隐藏 -->
			<view v-show="false" class="my-flex-row-c box fixed">
				<view class="my-flex-col-c btn my-bg-ye my-cl-white my-boxsha-2" @click="onCrmpay">
					<text class="my-font-16">购买充电宝</text>
					<text class="my-font-12 my-mgt-5">（ 需支付￥99 ）</text>
				</view>
			</view>
			<view :class="showBl ? 'my-show' : 'my-hide'">
				<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
					<view class=" my-rds-10 my-flex-col-c box-show1" style="position: relative;">
						<!-- 电量不足 -->
						<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp show1" v-if="state">
							<image src="../../static/index/dianliang3x.png" class="pic1" mode=""></image>
							<view style="width: 489upx;">
								<view class="my-font-16 my-pdb-20 my-pdt-20" style="font-weight: bold; text-align: center;">非常抱歉！</view>
								<text class="my-font-12 my-cl-00">当前现存充电宝电量较低，为保障您的充电体验暂时无法租借，请您稍后租借或前往其他商户服务点租借。</text>
							</view>
							<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgt-25" @click="onPages">返回首页</view>
						</view>
						<!-- 信用分不足 -->
						<view class="" v-if="state1">
							<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp box-show1">
								<image src="../../static/hch-position/dianliang@3x.png" class="pic2" mode=""></image>
								<view style="width: 504upx;">
									<view class="my-font-16 my-pdb-15 my-pdt-10" style="font-weight: bold; text-align: center;">信用分不足！</view>
									<text class="my-font-12">亲爱的小电兜用户，很可惜您账号的信用分未能达到</text>
									<text class="my-font-12" style="color: #F3B249; margin: 0 10upx;">550</text>
									<text class="my-font-12">，暂时无法为您提供免押金服务。请缴纳设备押金</text>
									<text class="my-font-12" style="color: #F3B249; margin: 0 8upx;">99元</text>
									<text class="my-font-12">继续租借，归还设备后可随时提现押金，请您放心。</text>
								</view>
								<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgtb-15" @click="onPaymore">支付押金</view>
							</view>
							<view class="my-mgt-20 my-flex-col-c my-cl-white">
								<view class="close" @click="onClose"></view>
								<view class="my-mgt-10">狠心离开</view>
							</view>
						</view>
					</view>
				</QSPopup>
			</view>
			<!-- 绑定手机号 -->

			<!-- 订单号 -->
			<QSPopup ref="QSPopup1" type="fadeScaleHeightToLowInMiddle">
				<view class="my-bg-white my-rds-10 my-flex-col-c show1">
					<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp">
						<image src="../../static/hch-position/dianliang.png" class="pic2" mode=""></image>
						<view style="width: 489upx;">
							<view class="my-font-16 my-pdb-20 my-pdt-10" style="font-weight: bold; text-align: center;">您的订单号为</view>
							<text class="my-font-12">{{ orderNo }}</text>
						</view>
						<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgt-15" @click="onLease">确定租借</view>
					</view>
				</view>
			</QSPopup>
			<!-- 网络开小差 -->
			<view :class="showBl ? 'my-show' : 'my-hide'">
				<QSPopup ref="QSPopup2" type="fadeScaleHeightToLowInMiddle">
					<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp box-show1">
						<image src="../../static/hch-position/network.png" class="pic1 my-mgt-30" mode=""></image>
						<view class="my-flex-col-c">
							<view class="my-font-16 my-pdb-20 my-pdt-20" style="font-weight: bold; text-align: center;">非常抱歉！</view>
							<text class="my-font-12 my-mgb-25">当前网络开小差了，请重新尝试租借！</text>
						</view>
					</view>
					<view class="my-mgt-25 my-flex-col-c my-cl-white"><view class="close" @click="onClose"></view></view>
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
				<QSPopup ref="QSPopup5" type="fadeScaleHeightToLowInMiddle">
					<view class="show4 my-bg-white my-rds-10">
						<view class="my-flex-col-c  my-pd-20 my-rds-10">
							<image class="icon2" src="../../static/hch-position/phone.png" mode=""></image>
							<view style="font-weight: 500;" class="my-font-14 my-mgt-10">确定支付￥99购买一个充电宝？</view>
							<button class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white" @click="toBuy" >确定买宝</button>
						</view>
					</view>
				</QSPopup>
			</view>
		</view>
	</view>
</template>

<script>
import QSPopup from '@/components/QS-popup/QS-popup.vue';
import req from '@/util/req.js';
import CryptoJS from '@/util/CryptoJs.js';
import login from '@/util/login.js';
export default {
	components: {
		QSPopup
	},
	mounted() {},
	data() {
		return {			
			bindPhone: false,
			isLogin: false,
			showBl: true,
			checked: true,
			deviceNo: null,
			device: null,
			state: false,
			state1: true,
			appid: '',
			orderId: null,
			orderPackage: null,
			mch_id: '1561116401',
			sign_type: 'HMAC-SHA256',
			service_id: '00002000000000157466580919871181',
			nonce_str: null,
			key: 'd22645f9fa764b9b96577afa9191c38b',
			// timestamp:1589980958000,
			orderNo: null,
			list: [
				{
					content: '内容 A'
				},
				{
					content: '内容 B'
				},
				{
					content: '内容 C'
				}
			],
			current: 0,
			mytimer:null
		};
	},
	onLoad(options) {
		if (options.code == 1) {
			let str = uni.getStorageSync('qrcode');
			var deviceNo = str.split('=');
			var deviceNo2 = deviceNo[1].split('&&');
			this.deviceNo = deviceNo2[0];
			// let arr = str.split('%3D');
			// let str1 = arr.pop();
			// let result = arr.pop();
			// let arr1 = result.split('%26%26');
			// let resu = arr1.shift();
			// this.deviceNo = resu;
			// console.log(resu);
			uni.removeStorageSync('qrcode');
			// this.getDeviceNo()
		} else {
			this.deviceNo = options.deviceNo;
			console.log(this.deviceNo);
			// this.getDeviceNo()
		}
		if (uni.getStorageSync('sessionKey') !== '' && uni.getStorageSync('logged') == true) {
			this.isLogin = true;
			this.getDeviceNo();
		}else{
			this.isLogin = false;
		}
	},
	onReady() {
		// 未登录或登录失效
		this.isLogin = uni.getStorageSync('logged') || false;
		if (this.isLogin == true) {
			this.$refs['QSPopup3'].hide();
		} else {
			uni.showToast({ title: '未登录或登录失效', icon: 'none' });
			this.$refs['QSPopup3'].show();
		}
	},
	onUnload() {
		if(this.mytimer!=null)
		clearInterval(this.mytimer);
	},
	methods: {
		onCrmpay(){
			//uni.showToast({	title: '近期开放',icon: "none"});return;
			if(this.isLogin==false){
				this.$refs['QSPopup3'].show();
				return;
			}
			if(this.device==null||typeof(this.device.usableCount)=='undefined'){
				uni.reLaunch({
					url:'/pages/index/index',
					success: () => {
						uni.showToast({title:'网络异常，请重试',icon:'none'});
					}
				})
				return;
			}
			if(this.device.boxStatus==='离线'){
				uni.showToast({title:'设备离线，请换一台或稍后再试',icon:'none'});
				return;
			}
			if(this.device.usableCount<=0){
				uni.showToast({title:'没有充电宝可以购买了',icon:'none'});
				return;
			}
			this.$refs['QSPopup5'].show();
		},toBuy(){
				uni.redirectTo({
					url: "/pages/index/buyPayInfo?deviceNo="+this.device.deviceNo+"&businessName="+this.device.businessName
				})
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
								this.getDeviceNo();
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
							this.getDeviceNo();
						}
						this.avatarUrl = uni.getStorageSync('avatarUrl') || '/static/hch-position/1.jpg';
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
		nologin() {
			this.$refs['QSPopup3'].hide();
			this.$refs['QSPopup4'].show();
		},
		// 创造随机32位的字符串
		randomWord() {
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
		// 微信申请支付分，在成功回调里面进行轮询，不断更新订单状态
		onLease() {
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
									uni.reLaunch({
										url: '/pages/test/eject?slotId=' + res.data.data.slotId,
										success: () => {
											if(this.mytimer!=null)
											clearInterval(this.mytimer);
										}
									});
									// uni.showModal({
									// 	title:"租借中",
									// 	content: '您的宝在'+res.data.data.slotId+'号插槽'
									// })
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
		// 点击租借创建订单，申请预授权
		onPay() {			
			if(this.isLogin==false){
				this.$refs['QSPopup3'].show();
				return;
			}			
			if (this.device == null) {
				uni.showToast({ title: '未获取到设备信息，请重试', icon: 'none' });
				this.onPages();
				return;
			}
			if(this.device.boxStatus==='离线'){
				uni.showToast({title:'设备离线，请换一台或稍后再试',icon:'none'});
				return;
			}
			if (this.device.usableCount <= 0) {
				uni.showToast({ title: '没有充电宝可以租借了', icon: 'none' });
				return;
			}
			try {
				var bindphone = uni.getStorageSync('bindPhone');
				if (bindphone === true) {
					let params = {
						sn: this.deviceNo
					};
					uni.showLoading({ title: '请稍候', mask: true });
					req.request('POST', params, '/user/user/order', '加载中', res => {
						uni.hideLoading();
						//console.log(res.statusCode)
						if (res.statusCode === 200) {
							this.orderNo = res.data.data.orderNo;
							this.orderId = res.data.data.orderId;
							this.orderPackage = res.data.data.orderPackage;
							// console.log(this.orderId)
							// this.$refs['QSPopup1'].show()
							this.onPrepay();
						} else if (res.statusCode === 400) {
							uni.showToast({
								title: '服务器返回参数错误',
								icon: 'none'
							});
						} else if (res.statusCode === 401) {
							uni.removeStorageSync('logged');
							uni.reLaunch({
								url: '/pages/index/index',
								success: () => {
									uni.showToast({ title: '登录失效', icon: 'none' });
								}
							})
						} else if (res.statusCode === 404) {
							uni.showToast({
								title: '无法调用服务器接口',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '服务器返回其他状态码'+res.statusCode,
								icon: 'none'
							});
							//console.log('接口返回值错误');
						}
					});
				} else {
					uni.showToast({ title: '请先绑定手机', icon: 'none' });
					// 显示绑定手机
					this.$refs['QSPopup4'].show();
				}
			} catch (e) {
				uni.showToast({
					title: e,
					icon: 'none'
				});
			}
		},
		onPrepay() {
			//console.log('用户资金预授权')
			try {
				// 用户资金预授权
				my.tradePay({
					orderStr: this.orderPackage,
					success: res => {
						//console.log(res)
						var result = res.resultCode;
						if (result === '9000') {
							uni.showToast({ title: '订单处理成功' });
							this.setlxun('start');
						} else if (result === '8000') {
							uni.showToast({ title: '正在处理中' });
						} else if (result === '4000') {
							uni.showToast({ title: '订单处理失败' });
							this.setlxun('stop');
						} else if (result === '6001') {
							uni.showToast({ title: '用户中途取消' });
							this.setlxun('stop');
						} else if (result === '6002') {
							uni.showToast({ title: '网络连接出错' });
							this.setlxun('stop');
						} else if (result === '6004') {
							uni.showToast({ title: '处理结果未知' });
						} else if (result === '99') {
							uni.showToast({ title: 'iOS客户端用户点击忘记密码导致快捷界面退出' });
							this.setlxun('stop');
						}
					},
					fail: res => {
						this.setlxun('stop');
						//console.log('支付授权失败',res);
						this.$refs['QSPopup'].show();
					}
				});
			} catch (e) {
				uni.showToast({
					title: e
				});
			}
		},
		// 设置轮询
		setlxun(type) {
			if (type === 'start') {
				let params = {};
				var orderNo = this.orderNo;
				this.mytimer = setInterval(() => {
					req.request('GET', params, '/user/user/order/' + orderNo, '加载中', res => {
						if (res.statusCode === 200) {
							if (res.data.data.orderStatus === 'CREATING') {
								uni.showToast({
									title: '出宝中',
									icon: 'none'
								});
							} else if (res.data.data.orderStatus === 'UNSETTLED') {
								uni.redirectTo({
									url: '/pages/test/eject?slotId=' + res.data.data.slotId,
									success: () => {
										if(this.mytimer!=null)
										clearInterval(this.mytimer);
									}
								});
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
						}
					});
				}, 2000);
			} else {
				if(this.mytimer!=null)
				clearInterval(this.mytimer);
				//console.log('授权失败关闭定时器');
				this.onPages();
			}
		},
		// 获取设备具体信息
		getDeviceNo() {
			let params = {};
			req.request('POST', params, '/user/device/box/' + this.deviceNo, '加载中', res => {
				//console.log('设备信息');
				//console.log(res);
				if (res.statusCode === 200) {
					this.device = res.data.data;
				} else if (res.statusCode === 401) {
					uni.removeStorageSync('logged');
					uni.showToast({ title: '未登录或登录已失效', icon: 'none' });
					this.$refs['QSPopup3'].show();
					// uni.redirectTo({
					// 	url: "/pages/index/index",
					// 	success: () => {
					// 		uni.showToast({
					// 			title: '登录失效',
					// 			icon: "none"
					// 		})
					// 	}
					// })
				} else if (res.statusCode === 400) {
					uni.redirectTo({
						url: '/pages/index/index',
						success: () => {
							uni.showToast({ title: '设备不存在', icon: 'none' });
						}
					});
				} else {
					//console.log('接口返回值错误');
					uni.showToast({ title: '服务器繁忙，errcode' + res.statusCode, icon: 'none' });
				}
			});
		},

		// 返回首页
		onPages() {
			setTimeout(function() {
				uni.navigateTo({
					url: 'index'
				});
			}, 1000);
		},
		// 关闭页面离开
		onClose() {
			this.showBl = false;
			uni.navigateBack({
				delta: 1
			});
		},
		//同意《平台使用协议》
		onConsent(e) {
			let check = this.checked;
			this.checked = !check;
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
						this.getDeviceNo();
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
						this.getDeviceNo();
					}
					this.avatarUrl = uni.getStorageSync('avatarUrl') || '/static/hch-position/1.jpg';
					// this.getMap()
					// this.getUser()
				},
				error => {
					console.log('登录失败：' + error);
				}
			);
			this.$refs['QSPopup3'].hide();
		}
	}
};
</script>

<style>
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

.box .box {
	width: 100%;
}

.line {
	width: 100upx;
	height: 5upx;
}

.txt-box {
	width: 110upx;
}

.txt {
	width: 400upx;
}

.my-cl-red {
	color: red;
}

.tr {
	transform: scale(0.6, 0.6);
}

.btn {
	width: 640upx;
	height: 100upx;
	border-radius: 50upx;
}

.show1 {
	height: 656upx;
	width: 600upx;
	overflow: hidden;
}

.show4 {
	width: 550rpx;
	overflow: hidden;
}

.btn2 {
	width: 600upx;
	height: 100upx;
	border-radius: 50upx;
}

.btn1 {
	width: 380upx;
	height: 80upx;
	border-radius: 50upx;
}

.pic1 {
	width: 210upx;
	height: 200upx;
}

.pic2 {
	width: 250upx;
	height: 250upx;
	margin-top: 24upx;
}

.my-relative {
	top: -20upx;
}

.fixed {
	margin-top: 70upx;
}

.box-show1 {
	width: 600upx;
}

.close:hover {
	cursor: pointer;
}

.close {
	border: 4upx solid #ffffff;
	color: white;
	border-radius: 50%;
	/* display: flex;
		justify-content: center;	
		align-items: center; */
	line-height: 42upx;
	text-align: center;
	height: 54upx;
	width: 54upx;
}

.close::before {
	content: '\2715';
}

.v115-class-goods-scroll .wx-swiper-dot {
	width: 12upx;
	display: inline-flex;
	height: 12upx;
	justify-content: space-between;
}

.class-goods {
	padding-left: 30upx;
	padding-top: 22upx;
	padding-right: 30upx;
}

.class-swiper {
	/* transform: scale(0.95,0.95); */
}

.mgleft {
	margin-left: 80upx;
}

.class-height {
	height: 260upx;
}

.swiper-height {
	height: 300upx;
}

.icon2 {
	width: 200upx;
	height: 200upx;
}
.icon3 {
	width: 200upx;
	height: 200upx;
}
.show4-btn {
	width: 380upx;
	height: 70upx;
	line-height: 70upx;
	border-radius: 35upx;
}
button::after {
	border: none;
}
</style>
