<template>
	<view class="box my-flex-col-c">
		<view class="box class-goods my-bg-f5">
			<swiper class="v115-class-goods-scroll swiper-height" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			 indicator-color="" indicator-active-color="#f4b249" :circular="true">
				<swiper-item class="class-height">
					<image class="pic my-rds-5 class-swiper" src="https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xrBvRvRdqi_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.uWv0gwb6Chcmb16d15235e9ed063ddd36f9f8e899271.png"
					 mode=""></image>
				</swiper-item>
				<swiper-item>
					<image class="pic my-rds-5 class-swiper" src="https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xrBvRvRdqi_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.uWv0gwb6Chcmb16d15235e9ed063ddd36f9f8e899271.png"
					 mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="box my-flex-col-c my-bg-white my-pdlr-25">
			<view class="my-flex-row-c box my-pdtb-10">
				<view class="my-bder-b line"></view>
				<text class="my-mglr-25 my-font-16">豪想充租借信息</text>
				<view class="my-bder-b line"></view>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>商</text>
					<text>户</text>
					<text>名</text>
					<text>称</text>
				</view>
				<text class="txt my-cl-grey">{{device.businessName}}</text>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>设</text>
					<text>备</text>
					<text>状</text>
					<text>态</text>
				</view>
				<view class="txt my-flex-row-align-c">
					<view class="dot" :class="device.boxStatus==='离线'?'my-bg-red':'my-bg-blue'"></view>
					<text class="my-mgl-10" :class="device.boxStatus==='离线'?'my-cl-red':'my-cl-blue'">{{device.boxStatus}}</text>
				</view>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>设</text>
					<text>备</text>
					<text>I</text>
					<text>D</text>
				</view>
				<text class="txt my-cl-grey">{{device.deviceNo}}</text>
			</view>

			<view class="my-pdtb-10 my-flex-row-b my-bder-b-cc box">
				<view class="txt-box my-flex-row-b">
					<text>充</text>
					<text>电</text>
					<text>宝</text>
				</view>
				<text class="txt my-cl-grey">可借{{device.usableCount}}个</text>
			</view>

			<view class="my-pdtb-10 my-flex-row-align-c my-bder-b-cc box my-font-14">
				<view class="txt-box my-flex-row-b my-flex-self-s">
					<text>计</text>
					<text>费</text>
					<text>规</text>
					<text>则</text>
				</view>
				<view class="my-flex-col mgleft">
					<text class="my-cl-ye ">
						{{device.unitPrice}}元/小时；</text>
					<text class="my-cl-grey ">(注:租借5分钟内归还免费，单日封顶{{device.top}}元，支持免押金租借! 支付分不足550，需要支付押金{{device.depositAmount}}元)</text>
				</view>
			</view>

			<view class="my-flex-row-c box my-mgt-20">
				<radio-group class="my-flex-row-align-c my-font-12">
					<radio color="#f8c470" :checked="checked" @click='onConsent' class="tr" />
					<text class="my-cl-grey">请阅读并同意</text>
					<text class="my-cl-ye">《服务协议》</text>
					<text class="my-cl-grey">与</text>
					<text class="my-cl-ye">《委托扣款授权书》</text>
				</radio-group>
			</view>
			<view class="my-flex-row-c box fixed">
				<view class="my-flex-col-c btn my-bg-ye my-cl-white my-boxsha-2" @click="onPay">
					<text class="my-font-16">免押金租借</text>
					<text class="my-font-12 my-mgt-5">（ 微信支付分≥550免押金租借 ）</text>
				</view>
			</view>
			<view v-show="true" class="my-flex-row-c box fixed">
				<view class="my-flex-col-c btn my-bg-ye my-cl-white my-boxsha-2" @click="onCrmpay">
					<text class="my-font-16">购买充电宝</text>
					<text class="my-font-12 my-mgt-5">（ 需支付￥99 ）</text>
				</view>
			</view>
			<view :class="showBl?'my-show':'my-hide'">
				<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
					<view class=" my-rds-10 my-flex-col-c box-show1" style="position: relative;">
						<!-- 电量不足 -->
						<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp show1" v-if="state">
							<image src='../../static/index/dianliang3x.png' class="pic1" mode=""></image>
							<view style="width: 489upx;">
								<view class="my-font-16 my-pdb-20 my-pdt-20" style="font-weight: bold; text-align: center;">非常抱歉！</view>
								<text class="my-font-12 my-cl-00">
									当前现存充电宝电量较低，为保障您的充电体验暂时无法租借，请您稍后租借或前往其他商户服务点租借。
								</text>
							</view>
							<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgt-25" @click="onPages">
								返回首页
							</view>
						</view>
						<!-- 信用分不足 -->
						<view class="" v-if="state1">
							<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp box-show1">
								<image src='../../static/hch-position/dianliang@3x.png' class="pic2" mode=""></image>
								<view style="width: 504upx;">
									<view class="my-font-16 my-pdb-15 my-pdt-10" style="font-weight: bold; text-align: center;">信用分不足！</view>
									<text class="my-font-12">
										亲爱的豪想充用户，很可惜您账号的信用分未能达到
									</text>
									<text class="my-font-12" style="color: #F3B249; margin: 0 10upx;">550 </text>
									<text class="my-font-12">
										，暂时无法为您提供免押金服务。请缴纳设备押金
									</text>
									<text class="my-font-12" style="color: #F3B249; margin: 0 8upx;"> 99元 </text>
									<text class="my-font-12">
										继续租借，归还设备后可随时提现押金，请您放心。
									</text>
								</view>
								<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgtb-15" @click="onPaymore">
									支付押金
								</view>
							</view>
							<view class="my-mgt-20 my-flex-col-c my-cl-white">
								<view class="close" @click="onClose"></view>
								<view class="my-mgt-10">
									狠心离开
								</view>
							</view>
						</view>

					</view>
				</QSPopup>
			</view>

			<!-- 订单号 -->
			<QSPopup ref="QSPopup1" type="fadeScaleHeightToLowInMiddle">
				<view class="my-bg-white my-rds-10 my-flex-col-c show1">
					<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp">
						<image src='../../static/hch-position/dianliang.png' class="pic2" mode=""></image>
						<view style="width: 489upx;">
							<view class="my-font-16 my-pdb-20 my-pdt-10" style="font-weight: bold; text-align: center;">您的订单号为</view>
							<text class="my-font-12">
								{{orderNo}}
							</text>
						</view>
						<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgt-15" @click="onLease">
							确定租借
						</view>
					</view>
				</view>
			</QSPopup>
			<!-- 网络开小差 -->
			<view :class="showBl?'my-show':'my-hide'">
				<QSPopup ref="QSPopup2" type="fadeScaleHeightToLowInMiddle">
					<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp box-show1">
						<image src='../../static/hch-position/network.png' class="pic1 my-mgt-30" mode=""></image>
						<view class="my-flex-col-c">
							<view class="my-font-16 my-pdb-20 my-pdt-20" style="font-weight: bold; text-align: center;">非常抱歉！</view>
							<text class="my-font-12 my-mgb-25">
								当前网络开小差了，请重新尝试租借！
							</text>
						</view>
					</view>
					<view class="my-mgt-25 my-flex-col-c my-cl-white">
						<view class="close" @click="onClose"></view>
					</view>
				</QSPopup>
				
				<QSPopup ref="QSPopup3" type="fadeScaleHeightToLowInMiddle">
					<view class="show4 my-rds-10">
						<view class="my-bg-white my-flex-col-c my-pd-20 my-flex-warp show4 my-relative my-rds-10">
							<image class="icon2" src="../../static/hch-position/signin.png" mode=""></image>
							<text style="font-weight: 500;" class="my-font-14 my-mgt-10">豪想充 ~ 为您续航精彩人生</text>
							<button open-type="getUserInfo" @getuserinfo="onGetUserInfo" class='my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white'>一键登录</button>
						</view>
					</view>
				</QSPopup>
				
				<QSPopup ref="QSPopup4" type="fadeScaleHeightToLowInMiddle">
					<view class="show4 my-bg-white my-rds-10">
						<view class="my-flex-col-c  my-pd-20 my-rds-10">
							<image class="icon2" src="../../static/hch-position/phone.png" mode=""></image>
							<view style="font-weight: 500;" class="my-font-14 my-mgt-10">绑定手机号可享受更多服务</view>
							<button class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white" open-type="getPhoneNumber"
						 @getphonenumber="getPhoneNumber">立即绑定</button>
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
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	import req from '@/util/req.js'
	import CryptoJS from '@/util/CryptoJs.js'
	import login from '@/util/login.js'
	export default {
		components: {
			QSPopup
		},
		
		mounted() {
			this.onGetUserInfo();
			// this.$refs['QSPopup2'].show()
		},
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
				mch_id: "1561116401",
				sign_type: 'HMAC-SHA256',
				service_id: '00002000000000157466580919871181',
				nonce_str: null,
				key: 'd22645f9fa764b9b96577afa9191c38b',
				// timestamp:1589980958000,
				orderNo: null,
				list: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mytimer:null
			}
		},
		onLoad(options) {//页面加载
			if (options.q) {
				//console.log(options)
				let str = options.q
				let arr = str.split('%3D')
				let str1=arr.pop()
				let result = arr.pop()
				let arr1 = result.split('%26%26')
				let resu = arr1.shift() 
				this.deviceNo = resu
				//console.log(resu)
				// this.getDeviceNo()
			} else {
				this.deviceNo = options.deviceNo
				//console.log(this.deviceNo)
				// this.getDeviceNo()
			}
			if (uni.getStorageSync('sessionKey') !== "" && uni.getStorageSync('logged') == true) {
				this.getDeviceNo()
			} else {
				// 未登录或登录失效
				this.isLogin = uni.getStorageSync('logged') || false
				if (this.isLogin == false) {
					this.$refs['QSPopup3'].show()
				} else {
					this.$refs['QSPopup3'].hide()
				}
				// uni.redirectTo({
				// 	url: "/pages/index/index"
				// })
			}
			// if (this.orderId !== null) {
			// 	this.$refs['QSPopup1'].show()
			// }
		},onReady() {
		// 未登录或登录失效
		this.isLogin = uni.getStorageSync('logged') || false;
		if (this.isLogin == false) {
			uni.showToast({ title: '未登录或登录已失效', icon: 'none' });
			this.$refs['QSPopup3'].show();
			//this.onPages();
		} else {
			this.$refs['QSPopup3'].hide();
		}
	},		
		onUnload() {
			if(this.mytimer!=null){
			clearInterval(this.mytimer);}
		},
		methods: {
			onCrmpay(){
				//uni.showToast({	title: '近期开放',icon: "none"});return;
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
			},
			toBuy(){
				uni.redirectTo({
					url: "/pages/index/buyPayInfo?deviceNo="+this.device.deviceNo+"&businessName="+this.device.businessName
				})
			},
			randomWord() {
				var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
					'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
					'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
				];
				var nums = "";
				for (var i = 0; i < 32; i++) {
					var id = parseInt(Math.random() * 61);
					nums += chars[id];
				}
				this.nonce_str = nums
			},
			onLease() {
				try{
				var orderNo = this.orderNo
				this.randomWord()
				// console.log(this.nonce_str)
				var timestamp = Date.parse(new Date())
				var a = 'mch_id=' + this.mch_id + '&nonce_str=' + this.nonce_str + '&package=' + this.orderPackage +
					'&sign_type=HMAC-SHA256&timestamp=' + timestamp
				// console.log(a)
				var b = a + "&key=" + this.key
				// console.log(b)
				//console.log((CryptoJS.HmacSHA256(b, this.key).toString()).toUpperCase())
				var sign = (CryptoJS.HmacSHA256(b, this.key).toString()).toUpperCase();
				//uni.showToast({title: '准备进入支付分',icon: "none"})
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
					success(res) {//开始租借
					//uni.showToast({title: '准备生成订单',icon: "none"})
					//console.log(res, 111)
						// let _this=this
						let params = { }
						//console.log(orderNo)
						this.mytimer = setInterval(() => {
							req.request('GET', params, '/user/user/order/' + orderNo, '加载中', (res) => {
								if (res.statusCode === 200) {
									if (res.data.data.orderStatus === "CREATING") {
										//console.log(111)
										uni.showToast({
											title: '出宝中',
											icon: 'none'
										})
										// if(this.mytimer!=null){
										// clearInterval(this.mytimer);}
									} else if (res.data.data.orderStatus === "UNSETTLED") {
										uni.redirectTo({
											url: "/pages/test/eject?slotId=" + res.data.data.slotId,
											success: () => {
												if(this.mytimer!=null){
												clearInterval(this.mytimer);}
											}
										})
										// uni.showModal({
										// 	title:"租借中",
										// 	content: '您的宝在'+res.data.data.slotId+'号插槽'
										// })

									} else if (res.data.data.orderStatus === "SETTLED") {
										uni.showToast({
											title: '已结算',
											icon: "none"
										})
										if(this.mytimer!=null){
										clearInterval(this.mytimer);}
									} else if (res.data.data.orderStatus === "TIMEOUT") {
										uni.showToast({
											title: '订单超时',
											icon: "none"
										})
										if(this.mytimer!=null){
										clearInterval(this.mytimer);}
									} else {
										uni.showToast({
											title: '租借失败',
											icon: "none"
										})
										if(this.mytimer!=null){
										clearInterval(this.mytimer);}
									}

								} else {
									if(this.mytimer!=null){
									clearInterval(this.mytimer);}
									uni.showToast({
										title: res.data.message,
										icon: "none"
									})
								}
							})
						}, 2000)						 
					},
					fail(res) {
						//console.log(res, 222);
						uni.reLaunch({
							url:'/pages/index/index',
							success: () => {
								uni.showToast({title:'正在处理操作中断的订单，请稍后再试',icon:'none'});
							}
						})
						//this.$refs['QSPopup'].show()
					}
				})
			}catch(e){
				console.error(e);
				uni.showToast({
					title: e,
					icon: "none"
					})				
				}
			},
			onPay() {
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
					uni.showToast({title:'没有充电宝可以租借了',icon:'none'});
					return;
				}
				try{					
				let params = {
					sn: this.deviceNo
				}
				uni.showLoading({title: '请稍候',mask:true});
				req.request('POST', params, '/user/user/order', '加载中', (res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						this.orderNo = res.data.data.orderNo
						this.orderId = res.data.data.orderId
						this.orderPackage = res.data.data.orderPackage
						// console.log(this.orderId)
						// this.$refs['QSPopup1'].show()
						//uni.showToast({ title: '租借处理中', icon: "none" })
						this.onLease()
					}  else if (res.statusCode === 401) {
						uni.removeStorageSync('logged')
						uni.redirectTo({
							url: "/pages/index/index",
							success: () => {
								uni.showToast({
									title: '登录失效',
									icon: "none"
								})
							}
						})
					}else{
						uni.showToast({
							title: res.data.message+' errcode:'+res.statusCode,
							icon: "none"
						})
						//console.log('接口返回值错误')
					}
				})
			}catch(e){
				//console.log(e);
				uni.showToast({
					title: e,
					icon: "none"
				})
			}},
			getDeviceNo() {
				let params = {}
				req.request('POST', params, '/user/device/box/' + this.deviceNo, '加载中', (res) => {
					//console.log(res)
					if (res.statusCode === 200) {
						this.device = res.data.data
					} else if (res.statusCode === 401) {						
						uni.removeStorageSync('logged')
						// uni.redirectTo({
						// 	url: "/pages/index/index",
						// 	success: () => {
						// 		uni.showToast({
						// 			title: '登录失效',
						// 			icon: "none"
						// 		})
						// 	}
						// })
					    this.$refs['QSPopup3'].show()
					}else if(res.statusCode===400){						
						uni.redirectTo({
							url: "/pages/index/index",
							success: () => {
								uni.showToast({
									title: '设备不存在',
									icon: "none"
								})
							}
						})
					}else{
						//console.log('接口返回值错误')
					}
				})
			},
			//同意《平台使用协议》
			onConsent(e) {
				let check = this.checked
				this.checked = !check
			},
			onpay(ref) {
				this.showBl = true
				this.$refs[ref].show();
			},
			onPaymore() {},
			onPages() {
				uni.navigateTo({
					url: 'index'
				})
			},
			onClose() {
				this.showBl = false
				uni.navigateBack({
					delta: 1,
				})
			},
			// 获取手机号
			getPhoneNumber(e) {
				try{				
				let params = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				}
				//console.log('eee',e)
				req.request('POST', params, '/user/user/bind', '加载中', (res) => {
					//console.log(res)
					if (res.statusCode === 200) {
						uni.showToast({
							title: "绑定成功",
							icon: "none"
						})
						uni.setStorageSync('bindPhone', true)
						this.$refs['QSPopup4'].hide()
						this.getDeviceNo()
					}
				})
			}catch(e){
				//console.log(e);
				uni.showToast({
					title: e,
					icon: "none"
				})
			}},
			// 获取用户信息
			onGetUserInfo() {
				try{
				login.userLogin().then((res) => {
					//console.log('登录成功：' + res)
					var bindPhone = uni.getStorageSync('bindPhone')
					//console.log('dianhua',bindPhone)
					if (bindPhone.length==0 || bindPhone==false) {
						this.$refs['QSPopup4'].show()
					} else {
						this.$refs['QSPopup4'].hide()
						this.bindPhone = uni.getStorageSync('bindPhone')
						this.getDeviceNo()
					}
					this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg"
					// this.getMap()
					// this.getUser()
				}, (error) => {
					//console.log('登录失败：' + error)
				})
				this.$refs['QSPopup3'].hide()			
			}catch(e){
				//console.log(e);
				uni.showToast({
					title: e,
					icon: "none"
				})
			}},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.my-bg-f5 {
		background: #F5F5F5;
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
		color: red
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
	.show4{
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
	/* 	position: fixed;
		bottom: 80upx; */
		margin-top: 70upx;
	}

	.box-show1 {
		width: 600upx;
	}

	.close:hover {
		cursor: pointer;
	}

	.close {
		border: 4upx solid #FFFFFF;
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
		content: "\2715";
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
	
	.class-height{
		height: 260upx;
	}
	.swiper-height{
		height: 300upx;
	}
	.icon2 {
		width: 200upx;
		height: 200upx;
	}
</style>
