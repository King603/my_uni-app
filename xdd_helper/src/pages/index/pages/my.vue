<template>
	<view class="">
		<view class="" style="index:999">
			<view class="my-bg-white box my-fixed-t" style="z-index: 999;">
				<uniStatusBar></uniStatusBar>
				<uniNav :title="isBusiness==true?title1:title"></uniNav>
			</view>
			<view class="my-bg-white box">
				<uniStatusBar></uniStatusBar>
				<uniNav></uniNav>
			</view>
			<view class="box my-pdlr-10 my-mgt-10">
				<view class="box my-bg-ye">
					<view :class="isBusiness==true?'my-pd-10 bder-b-f5 my-relative my-flex-col box bgc-sh':'my-pd-10 bder-b-f5 my-relative my-flex-col box'">
						<view class="my-absolute my-hdimg-c-80 my-flex-row-c my-bg-white">
							<image src="/static/logo.png" class="my-hdimg-c-75" mode=""></image>
						</view>
						<view class="my-flex-row-b">
							<view class="my-flex-row-align-c">
								<view class="my-pdl-10 my-pdr-10 my-pdt-2 my-pdb-2 my-cl-ye my-bg-white my-font-12 my-rdsl-5">
									<text v-if="isBusiness==false">代理</text>
									<text v-else class="color-sh">商户</text>
								</view>
								<view :class="isBusiness==false?'circle-box my-flex-row-c my-bg-ye my-mgr-10 my-absolute':'circle-box my-flex-row-c my-bg-blue my-mgr-10 my-absolute'">
									<view class="circle my-bg-white my-flex-row-c">
										<image :src="isBusiness==false?'/static/my/vip.png':'/static/my/vip2.png'" class="icon-i" mode=""></image>
									</view>
								</view>
							</view>
							<view class="my-flex-row-align-c">
								<!-- <image src="/static/my/edit.png" class="icon" @click="onInfo"></image> -->
								<image src="/static/my/set.png" class="icon my-mgl-15" v-if="onchoose" @click="onChoose"></image>
								<!--点击设置后显示-->
								<image src="/static/my/set2.png" class="icon my-mgl-15 " v-else @click="onChoose"></image>
							</view>
						</view>
						<view class="my-flex-row-align-c my-mgt-5">
							<view class="rectangle my-bg-white"></view>
							<text class="my-cl-white my-mgl-8">{{personal.name}}</text>
						</view>
					</view>
					<!--点击设置后显示-->
					<view v-if="!onchoose" style="width: 100%; height: 100%; position: relative; top:0">
						<view style="width: 100%; height: 100%; position: absolute;top: 0;" @click="this.onchoose = true"></view>
						<view style=" position: absolute; top: -80upx; right: 240upx;">
							<view class="bubble-i"></view>
							<view class="bubble my-bg-white my-flex-col-c my-cl-a3 font-11">
								<view class="my-flex-row boder-b my-pdb-5" @click="onExit">
									<image src="../../../static/my/exit.png" class="icon-li my-mgr-5"></image>
									<text>退出当前登录</text>
								</view>
								<view class="my-flex-row boder-b my-pdtb" @click="onPassword" data-id="0">
									<image src="../../../static/my/pedit.png" class="icon-li my-mgr-5"></image>
									<text>修改登录密码</text>
								</view>
								<view class="my-flex-row  my-pdt-2" @click="onPassword" data-id="1">
									<image src="../../../static/my/wdrecord.png" class="icon-li my-mgr-5"></image>
									<text>设置提现密码</text>
								</view>
							</view>
						</view>
					</view>
					<view :class="isBusiness==true?'my-pd-10 box my-flex-col bgc-sh':'my-pd-10 box my-flex-col'">
						<view class="my-flex-row-b box">
							<view class="my-flex-row-align-c">
								<view class="rectangle my-bg-white"></view>
								<text class="my-cl-white my-mgl-8">账户余额</text>
							</view>
							<view class="my-flex-row-align-c" @click="onRecord">
								<image src="/static/my/record.png" class="icon" mode=""></image>
								<text class="my-cl-white my-mgl-8 my-flex-self-e">记录</text>
							</view>
						</view>
						<view class="my-flex-row-b my-mgt-25">
							<view class="my-flex-col my-cl-white">
								<text class="my-font-24">￥{{personal.balance||'0.00'}}</text>
								<text class="my-mgt-25">累计收益：￥{{personal.profitAmount||'0.00'}}</text>
								<view class="my-flex-row-b my-mgt-10 btn-box">
									<view class="btn my-rds-5 my-bder-f2 my-flex-row-c" @click="onWithrawal">
										<image src="/static/my/money1.png" class="icon1 my-pdr-10" mode=""></image>
										提现
									</view>
									<view class="btn my-rds-5 my-bder-f2 my-flex-row-c" @click="onRecharge">
										<image src="/static/my/money2.png" class="icon1 my-pdr-10" mode=""></image>
										充值
									</view>
								</view>
							</view>
							<image src="/static/my/wallet.png" class="pic" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<mySwiper :swiper="swiper" v-if="isBusiness==false"></mySwiper>
			<mySwiper :swiper="swiper1" v-else></mySwiper>
			<fourOptions :textArray="textArray" @index="onIndex" v-if="isBusiness==false"></fourOptions>
			<fourOptions :textArray="textArray1" @index="onIndex" v-else></fourOptions>
			<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
				<!-- <view class="test">自定义</view> -->
			</loading>
		</view>
	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import uniNav from "../../../components/uni-nav-bar/uni-nav-bar.vue";
	import uniStatusBar from "../../../components/uni-status-bar/uni-status-bar.vue"
	import mySwiper from '../../../components/my-swiper/my.vue'
	import fourOptions from '@/components/four-options/my-four.vue'
	import req from '@/util/req.js';
	export default {
		data() {
			return {
				personal:null,
				isBusiness:false,
				title: '我的',
				title1:'个人页',
				swiper: ['https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/UByGVWiCOx_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.SdX2EwXCNqHcedd0dcd8b2c278f870f785c30d11d4b7.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/UByGVWiCOx_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.SdX2EwXCNqHcedd0dcd8b2c278f870f785c30d11d4b7.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/UByGVWiCOx_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.SdX2EwXCNqHcedd0dcd8b2c278f870f785c30d11d4b7.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/UByGVWiCOx_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.SdX2EwXCNqHcedd0dcd8b2c278f870f785c30d11d4b7.png'
				],
				swiper1: ['https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/GOPfqppryG_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.xrLTOVJEg3Ev9383215f667cc747bea5b69269699da8.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/GOPfqppryG_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.xrLTOVJEg3Ev9383215f667cc747bea5b69269699da8.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/GOPfqppryG_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.xrLTOVJEg3Ev9383215f667cc747bea5b69269699da8.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/GOPfqppryG_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.xrLTOVJEg3Ev9383215f667cc747bea5b69269699da8.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/GOPfqppryG_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.xrLTOVJEg3Ev9383215f667cc747bea5b69269699da8.png'
				],
				textArray: [{
					icon: '/static/my/icon-1.png',
					txt: '关于我们'
				}, {
					icon: '/static/my/icon-2.png',
					txt: '快速分享'
				}, {
					icon: '/static/my/icon-3.png',
					txt: '型号说明'
				}, {
					icon: '/static/my/icon-4.png',
					txt: '招商广告'
				}, {
					icon: '/static/my/icon-5.png',
					txt: '合伙加盟'
				}, {
					icon: '/static/my/icon-6.png',
					txt: '专享客服'
				}, {
					icon: '/static/my/icon-7.png',
					txt: '广告收益'
				}, {
					icon: '/static/my/reward.png',
					txt: '奖励设置'
				}],
				textArray1: [{
					icon: '/static/my/icon-1.png',
						txt: '关于我们'
					}, {
						icon: '/static/my/icon-2.png',
						txt: '快速分享'
					}, {
						icon: '/static/my/icon-3.png',
						txt: '型号说明'
					}, {
						icon: '/static/my/icon-4.png',
						txt: '招商广告'
					}, {
						icon: '',
						txt: ''
					}, {
						icon: '/static/my/icon-6.png',
						txt: '专享客服'
					}, {
						icon: '/static/my/icon-7.png',
						txt: '广告收益'
					}, {
						icon: '',
						txt: ''
				}],
				onchoose: true
			}
		},
		components: {
			uniNav,
			uniStatusBar,
			mySwiper,
			fourOptions,
			loading
		},
		mounted() {
			this.isBusiness = uni.getStorageSync('openIdBindByBusiness') || false
			if (this.isBusiness === true) {
				this.getPersonal()
			}else{
				this.getproxypersonal()
			}
			// this.open();
			// setTimeout(()=>{
			// 	this.close();
			// },2000)
		},
		computed: {

		},
		onLoad() {
            
           	 
		},
		onShow() {

		},
		methods: {
			onExit(){
				let params = {}
				req.request('POST', params, '/proxy/logout', '加载中', (res) => {
					if (res.statusCode === 200) {
						uni.navigateTo({
							url:"/pages/index/login",
							success: () => {
								uni.setStorageSync('isLogin',false)
							}
						})
					}
				})
			},
			getPersonal() {
				let params = {}
				req.request('POST', params, '/proxy/business/personal', '加载中', (res) => {
					if (res.statusCode === 200) {
						this.personal = res.data.data
					}
				})
			},
			getproxypersonal(){
				let params = {}
				req.request('POST', params, '/proxy/personal', '加载中', (res) => {
					if (res.statusCode === 200) {
						this.personal = res.data.data;
						uni.setStorageSync("balance",res.data.data.balance)
					}
				})
			},
			onRecord() {
				uni.navigateTo({
					url: "/pages/my/personal/recordDetial"
				})
			},
			onIndex(e) {
				if (e === 0) {
					uni.navigateTo({
						url: "/pages/my/service/about"
					})
				}
				if (e === 1) {
					uni.navigateTo({
						url: "/pages/my/service/share"
					})
				}
				if (e === 2) {
					uni.navigateTo({
						url: "/pages/my/service/model"
					})
				}
				if (e === 3) {
					uni.navigateTo({
						url: "/pages/my/service/ad"
					})
				}
				if (e === 4 && this.isBusiness==false) {
					uni.navigateTo({
						url: "/pages/my/service/join"
					})
				}
				if (e === 7 && this.isBusiness==false) {
					uni.navigateTo({
						url: "/pages/my/service/getTV"
					})
				}
			},
			onIndex1(e) {
				if (e === 0) {
					uni.navigateTo({
						url: "/pages/my/service/about"
					})
				}
				if (e === 1) {
					uni.navigateTo({
						url: "/pages/my/service/share"
					})
				}
				if (e === 2) {
					uni.navigateTo({
						url: "/pages/my/service/model"
					})
				}
				if (e === 3) {
					uni.navigateTo({
						url: "/pages/my/service/ad"
					})
				}
			},
			onWithrawal() {
				uni.navigateTo({
					url: "/pages/my/personal/withdrawal"
				})
			},
			onInfo() {
				uni.navigateTo({
					url: "/pages/my/personal/info"
				})
			},
			onRecharge() {
				uni.navigateTo({
					url: "/pages/my/personal/recharge"
				})
			},
			onPassword(e) {
				if (e.currentTarget.dataset.id == "0") {
					uni.navigateTo({
						url: "/pages/my/personal/password?id=" + 0
					})
				}
				if (e.currentTarget.dataset.id == "1") {
					uni.navigateTo({
						url: "/pages/my/personal/password?id=" + 1
					})
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
			onChoose() {
				if (this.onchoose) {
					this.onchoose = false;
				} else {
					this.onchoose = true;
				}
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 150upx;
		background: #F2F2F2;
	}

	.pop {
		position: absolute;
		height: 10upx;
		width: 180upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		right: 6upx;
		top: 80upx;
	}

	.popLi {
		color: #C3C3C3;
		border-bottom: 2upx dashed #C3C3C3;
	}

	.icon1 {
		height: 40upx;
		width: 40upx;
	}

	.box {
		width: 100%;
	}

	.bder-b-f5 {
		border-bottom: 2px solid #F5F5F5;
	}

	.my-pdt-2 {
		padding-top: 4upx;
	}

	.my-pdb-2 {
		padding-bottom: 4upx;
	}

	.my-rdsl-5 {
		border-top-left-radius: 20upx;
		border-bottom-left-radius: 20upx;
	}

	.circle-box {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		top: 12upx;
		left: 97upx;
		z-index: 20;
	}

	.circle {
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
	}

	.icon-i {
		width: 40upx;
		height: 40upx;
	}

	.icon {
		width: 50upx;
		height: 50upx;
	}

	.rectangle {
		width: 18upx;
		height: 35upx;
	}

	.pic {
		width: 240upx;
		height: 210upx;
	}

	.btn-box {
		width: 380upx;
	}

	.btn {
		width: 180upx;
		height: 60upx;
	}
	
	.btn1{
		width: 174upx;
		height: 60upx;
	}

	.bg {
		background-color: rgba(255, 255, 255, 0.3);
	}
	
	.bg1 {
		background-color: #00B4FF;
	}

	.my-hdimg-c-80 {
		left: 50%;
		top: 135upx;
		transform: translate(-50%, -50%);
	}
	
	.my-hdimg-c-95 {
		width: 186upx;
		height: 186upx;
		left: 50%;
		top: 135upx;
		transform: translate(-50%, -50%);
	}
	
	.my-hdimg-c-90{
		width: 176upx;
		height: 176upx;
	}

	.bubble-i {
		position: relative;
		bottom: -10upx;
		left: 210upx;
		width: 22upx;
		height: 20upx;
		border-width: 10upx;
		border-style: solid;
		border-color: transparent;
		border-bottom-width: 30upx;
		border-bottom-color: currentColor;
		color: #FFFFFF;
	}

	.bubble {
		position: absolute;
		width: 250upx;
		height: 170upx;
		border-radius: 10upx;
		background-color: currentColor;
		color: #FFFFFF;
	}

	.icon-li {
		width: 28upx;
		height: 28upx;
		padding-top: 8upx;
	}

	.boder-b {
		border-bottom: 2upx dotted #A3A3A3;
	}

	.my-pdtb {
		padding-top: 4upx;
		padding-bottom: 4upx;
	}
	
	.circle1{
		width: 108upx;
		height: 44upx;
	}
	
	.bderwhi{
		border: 4upx solid #FFFFFF;
	}
	.color-sh{
		color: #00C0EC;
	}
	.bgc-sh{
		background-color: #00BFEB;
	}
</style>
