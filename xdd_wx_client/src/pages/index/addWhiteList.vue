<template>
	<view>
		<view>
			<view class="btn-box">
				<view @click="btnAdd" class="btn-add"><text>加入白名单</text></view>
			</view>
			<QSPopup ref="QSPopupLogin" type="fadeScaleHeightToLowInMiddle">
				<view class="show4 my-rds-10">
					<view class="my-bg-white my-flex-col-c my-pd-20 my-flex-warp show4 my-relative my-rds-10">
						<image class="icon2" src="../../static/hch-position/signin.png" mode=""></image>
						<text style="font-weight: 500;" class="my-font-14 my-mgt-10">小电兜 ~ 为您续航精彩人生</text>
						<button open-type="getUserInfo" @getuserinfo="onGetUserInfo" class='my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white'>一键登录</button>
					</view>
				</view>
			</QSPopup>
			<QSPopup ref="QSPopupBind" type="fadeScaleHeightToLowInMiddle">
				<view class="show4 my-bg-white my-rds-10">
					<view class="my-flex-col-c  my-pd-20 my-rds-10">
						<image class="icon2" src="../../static/hch-position/phone.png" mode=""></image>
						<view style="font-weight: 500;" class="my-font-14 my-mgt-10">绑定手机号可享受更多服务</view>
						<button class="my-bg-F3 my-font-16 my-mgt-18 show4-btn my-cl-white" open-type="getPhoneNumber"
					 @getphonenumber="getPhoneNumber">立即绑定</button>
					</view>
				</view>
			</QSPopup>
		</view>
	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	import req from '@/util/req.js';
	import login from '@/util/login.js'
export default {
	components: {
		QSPopup
	},
	onLoad(options) {
		this.whiteId = options.whiteId;		
		this.sessionKey = uni.getStorageSync('sessionKey') || ''
		this.isLogin = uni.getStorageSync('logged') || false
		if (this.sessionKey==''||this.isLogin == false) {
			this.$refs['QSPopupLogin'].show()
		} else {
			this.$refs['QSPopupLogin'].hide()
		}
	},
	data() {
		return {
			whiteId: 0,
			bindPhone:false,
			isLogin:false,
			sessionKey:''			
		};
	},
	methods: {
		btnAdd() {
			let params = { whiteId: this.whiteId };
			req.request('POST', params, '/user/user/white/join', '加载中', res => {
				console.log(res);
				if (res.statusCode === 200) {
					if (res.data.message == 'success') {
						uni.reLaunch({
							url: '/pages/index/index',
							success: () => {
								uni.showToast({ title: '加入成功', icon: 'none' });
							}
						});
					} else {
						uni.reLaunch({
							url:'/pages/index/index',
							success: () => {
								uni.showToast({title:res.data.message,icon:'none'});
							}
						})
					}
				} else if (res.statusCode === 400) {
					uni.reLaunch({
						url:'/pages/index/index',
						success: () => {
							uni.showToast({title:'参数错误，请重试',icon:'none'});
						}
					})
				} else if (res.statusCode === 401) {
					uni.reLaunch({
						url: '/pages/index/index',
						success: () => {
							uni.showToast({ title: '请先登录', icon: 'none' });
						}
					});
				} else if (res.statusCode === 404) {
					uni.reLaunch({
						url:'/pages/index/index',
						success: () => {
							uni.showToast({title:'暂未开放',icon:'none'});
						}
					})
				} else {
					console.log('接口返回值错误');
				}
			});
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
					uni.setStorageSync('bindPhone', true);
					this.$refs['QSPopupBind'].hide();
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
					this.$refs['QSPopupBind'].show()
				} else {
					this.$refs['QSPopupBind'].hide()
					this.bindPhone = uni.getStorageSync('bindPhone')
				}
			}, (error) => {
				//console.log('登录失败：' + error)
			})
			this.$refs['QSPopupLogin'].hide()			
		}catch(e){
			//console.log(e);
			uni.showToast({
				title: e,
				icon: "none"
			})
		}},
	}
};
</script>

<style scoped>
.btn-box {
	height: 80rpx;
	margin-top: 30rpx;
}
.btn-add {
	margin: auto;
	background: rgba(244, 178, 73, 1);
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 44rpx;
	color: #ffffff;
	font-size: 36rpx;
	font-family: PingFang SC;
}

	.show4{
		width: 550rpx;
		overflow: hidden;
	}
	.icon2 {
		width: 200upx;
		height: 200upx;
	}
</style>
