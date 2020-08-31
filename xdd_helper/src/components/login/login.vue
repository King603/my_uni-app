<template>
	<view class="">
		<view class="bg">
			<uniStatusBar></uniStatusBar>
			<uniNav :backgroundColor="backgroundColor" :title="title" :color="color"></uniNav>
			<image src="https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xNpYhdjWXj_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.YubDGfi9l2AE6dc2aa03fc5fd4d48f5507c7ab1064cc.png" mode="widthFix"></image>
		</view>
		<view class="mgt my-pd-15 my-flex-col-c">
			<view class="pd my-rds-15 my-boxsha-2 box my-flex-col-c my-bg-white" v-show="!wxLogin">
				<view class="my-flex-row-align-c my-mgt-15 my-font-16">
					1.请先微信授权登录
				</view>
				<view class="my-flex-row-align-c my-mgt-15 my-font-16">
					2.输入账号密码再登录
				</view>
				<view class="my-flex-row-align-c my-mgt-15 my-font-11 my-cl-grey">
					（注：1.微信账户可绑定多个账号，后面登录为上一次登录的账号2.本小程序仅供赛欣计算机科技运营商使用，需登录）
				</view>
			</view>
			<view class="pd my-rds-15 my-boxsha-2 box my-flex-col-c my-bg-white" v-show="wxLogin">
				<view class="my-flex-row-align-c">
					<image src="/static/login/user.png" class="icon"></image>
					<input class="my-mgl-20 my-font-16" placeholder-class="my-cl-grey" type="text" placeholder="请输入用户名" value=""  v-model="userId" />
				</view>
				<view class="my-flex-row-align-c my-mgt-25" style="margin-left:45upx;">
					<image src="/static/login/password.png" class="icon"></image>
					<input
						class="my-mgl-20 my-font-16"
						placeholder-class="my-cl-grey"						
						v-model="pass"
						placeholder="请输入密码"
						type="text"
						v-show="seen"
					/>
					<input
						class="my-mgl-20 my-font-16"
						placeholder-class="my-cl-grey"						
						v-model="pass"
						placeholder="请输入密码"
						type="password"
						v-show="!seen"
					/>
					<view v-show="seen" @click="changeeyes"><img src="/static/my/open_eye.png" class="icon" /></view>
					<view v-show="!seen" @click="changeeyes"><img src="/static/my/close_eye.png" class="icon" /></view>
				</view>
				<view class="my-flex-row-align-c my-mgt-25">
					<label class="radio my-flex-row-align-c">
						<radio @click="onSelect(index)" v-for="(item,index) in select" :key="index" :class="index===0?'':'my-mgl-25'" color="#f8c470" :checked="item.check">{{item.name}}</radio>
					</label>
				</view>
			</view>
			<button open-type="getUserInfo" class="btn my-bg-ye my-cl-white my-boxsha-2 my-font-20 my-flex-row-c" :loading="loading"
			 @click="onGetUserInfo(e)" v-show="!wxLogin">授权登录</button>
			<!-- <view class="btn-box my-flex-col-c"> -->
			<button class="btn my-bg-ye my-cl-white my-font-20 my-boxsha-2 my-flex-row-c" :loading="loading" @click="onLogin"
			 v-show="wxLogin">立即登录</button>
			<!-- </view> -->
			<!-- <view class="my-mgt-10" :class="hide===true?'my-block':'my-hide'">
				<text class="my-cl-ye" @click="onForget">忘记密码</text>
			</view> -->
		</view>
		<view class="btm my-flex-col-c">
			<view class="my-flex-row-align-c">
				<radio-group class="my-flex-row-align-c">
					<radio color="#f8c470" :checked="checked" @click='onConsent' :class="hide===true?'my-block':'my-hide'" class="tr" />
					<!-- <text class="my-cl-ye my-mgl-8 my-font-15" @click="onClause" :class="hide===true?'my-block':'my-hide'">阅读并同意《平台使用协议》</text> -->
					<text class="my-cl-ye my-mgl-8 my-font-15" :class="hide===true?'my-block':'my-hide'">阅读并同意《平台使用协议》</text>
				</radio-group>
			</view>
		</view>
		<view class="bottom my-flex-col-c my-pd-10">
			<text class="my-cl-b8 my-mgt-20">福建赛欣计算机科技有限公司</text>
		</view>
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from "@/components/xuan-loading/xuan-loading.vue"
	import uniNav from "../uni-nav-bar/uni-nav-bar.vue";
	import uniStatusBar from "../uni-status-bar/uni-status-bar.vue"
	import req from "@/util/req.js"
	import login from "@/util/login.js"
	export default {
		data() {
			return {
				seen: false,
				eyes:"password",
				userId: "",
				pass: "",
				user: [{
					url: "/static/login/user.png",
					txt: "请输入用户名"
				}, {
					url: "/static/login/password.png",
					txt: "请输入密码"
				}],
				txt: '立即登录',
				checked: true,
				loading: false,
				select: [{
					name: '代理',
					check: true
				}, {
					name: '商户',
					check: false
				}],
				hide: true,
				backgroundColor: "#F6BF65",
				title: '电兜秘书',
				color: '#FFFFFF',
				aaaa: 22222,
				login: false,
				wxLogin: false,
				type:'PROXY'
			}
		}, mounted: function () {
			this.userId = uni.getStorageSync('userId')||'';
			this.onGetUserInfo();
		},
		components: {
			uniNav,
			uniStatusBar,
			loading
		},
		onLoad() {
           var islogins=uni.getStorageSync("isLogin");
		   if(islogins){
			   this.wxLogin=false
		   }else{
			   this.wxLogin=true
		   }
		},
		methods: {
			changeeyes(){
				this.seen = !this.seen;
			},
			onSelect(e){
				this.select.forEach((res)=>{
					res.check=false
				})
				this.select[e].check=true
				if(e===0){
					this.type='PROXY'
				}else{
					this.type='BUSINESS'
				}
			},
			onGetUserInfo() {
				login.userLogin().then((res) => {
					console.log('登录成功：' + res)
					this.wxLogin = true
					if (uni.getStorageSync('isLogin') === true) {
						uni.navigateTo({
							url: "/pages/index/index",
							success: () => {
								this.wxLogin=false
							}
						})
					}
				}, (error) => {
					console.log('登录失败：' + error)
				})
			},
			onLogin(e) {
				if (this.userId == '') {
					uni.showToast({title: '请输入用户名',icon: 'none'});
					return;
				}
				if (this.pass == '') {
					uni.showToast({title: '请输入密码',icon: 'none'});
					return;
				}
				uni.setStorageSync('userId',this.userId)
				this.open()
				let params = {
					loginName: this.userId,
					openId: uni.getStorageSync('openId'),
					password: this.pass,
					userType:this.type
				}
				//return;
				// console.log(params)
				try{				
				req.request('POST', params, '/proxy/login', '加载中', (res) => {
					
					var userinfo=res.data.data;
					if (res.statusCode === 200) {
						uni.navigateTo({
							url: "/pages/index/index",
							success: () => {
								this.wxLogin=false
								uni.setStorageSync('isLogin',true)
								uni.setStorageSync("openIdBindByProxy",userinfo.loggedProxy)
								uni.setStorageSync("openIdBindByBusiness",userinfo.loggedBusiness)
							    uni.setStorageSync('openId',userinfo.openId)
							    uni.setStorageSync('sessionKey',userinfo.sessionKey)
							 
							}
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
					//this.close()
				})	
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			blurUser(e) {
				let val = e.detail.value
				// console.log(val)
				this.userId = val
			},
			blurPass(e) {
				let val = e.detail.value
				console.log(val)
				this.pass = val
			},
			close: function() {
				this.$refs.loading.close();
			},
			open: function() {
				this.$refs.loading.open();
				setTimeout(() => {
				    this.close();				 
				   }, 2000);
			},
			callback() {
				// console.log("回掉");
			},
			//同意《平台使用协议》
			onConsent(e) {
				let check = this.checked
				this.checked = !check
			},
			onClause(e) {
				uni.navigateTo({
					url: '/pages/deal/login/login',
				});
			},
		}
	}
</script>

<style>
	.bg {
		background: linear-gradient(0deg, rgb(243, 178, 73), rgb(248, 196, 112));
		height: 580upx;
	}

	.mgt {
		margin-top: -190upx;
	}

	.box {
		width: 100%;
	}

	/* .h {
		height: 300upx;
	} */

	.icon {
		width: 50upx;
		height: 50upx;
	}

	.btn {
		width: 350upx;
		border-radius: 50upx;
		border: none !important;
		margin-top: -40upx;
		height: 90upx;

	}
	button::after{
	border:none;
	}

	/* 	.btn-box{
		width: 350upx;
		border-radius: 50upx;
		border: none;
		margin-top: -40upx;
		height: 80upx;
		overflow: hidden;
	}
 */
	.bottom {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
	}
  
	.btm {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 40upx;
		left: 0;
		z-index: 111;
	}

	.pd {
		padding: 40upx 40upx 80upx 40upx;
	}

	.tr {
		transform: scale(0.8, 0.8);
	}
</style>
