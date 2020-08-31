<template>
	<view class="">
		<view v-show="!isLogin" class="my-pd-10">
			<button class="my-bg-gradient-ye my-cl-white" open-type="getAuthorize" @getAuthorize="onGetAuthorize" @error="onAuthError" scope='userInfo'>立即登录</button>
		</view>
		<view class="box my-flex-col-c" v-show="isLogin">
			<view class="avatar-box bg my-pd-10 my-flex-col-c my-cl-white">
				<image :src="avatarUrl" class="my-hdimg-c-70"></image>
				<view class="my-flex-row-align-c my-mgt-10">
					<view v-show="!edit"><text>{{user.nickname||'暂无姓名'}}</text></view>
					<view v-show="edit"><input type="text" @blur="blurNickName" :value="nickname" class="w180 my-bder-b-white"/></view>
					<!-- <image class="icon my-mgl-8" src="/static/my/edit.png" mode="" @click="onEdit"></image> -->
				</view>
				<text class="my-mgt-3">{{user.phoneNumber||'暂无手机号'}}</text>
				<view class="my-flex-row-b box my-mgt-15">
					<view class="my-flex-col-c three" :class="index===1?'bder-lr':''" v-for="(item,index) in tab" :key="index" @click="onTab(index)">
						<image class="icon-i" :src="item.img" mode="aspectFit"></image>
						<text class="my-mgt-5">{{item.txt}}</text>
					</view>
					<view v-if="msgList" class="dot my-bg-danger my-absolute"></view>
				</view>
				<view class="box1 my-pd-5 my-flex-row-c my-rds-10 my-bg-ye my-mgt-29">
					<!-- <view class="box1 my-rds-5 my-bder-fontcl-grey"></view> -->
				</view>
			</view>
			<view class="box2 my-pd-10 my-bg-white my-boxsha-2 mgt my-rdsb-10 my-flex-row-b">
				<view class="my-flex-col-c my-grow-1 bder-r-ye">
					<text class="my-cl-ye my-font-30 my-mgt-10">{{user.balance}}</text>
					<text class="my-cl-grey my-mgt-10">我的余额（元）</text>
				</view>
				<view class="my-flex-col-c my-grow-1" @click="onTopUp">
					<image class="img" src="../../static/hch-position/wallet3x.png" mode="aspectFit"></image>
					<text class="my-cl-grey my-mgt-10">余额充值</text>
				</view>
				<view class="my-flex-col-c my-grow-1" @click="onRecord">
					<image class="img" src="/static/my/record.png" mode="aspectFit"></image>
					<text class="my-cl-grey my-mgt-10">消费记录</text>
				</view>
			</view>
			<view style="height: 668upx;" class="box2 my-pdlr-15 my-bg-white my-mgt-15 my-rds-5 my-boxsha-2 my-flex-col">
				<view class="my-flex-row-b my-pdtb-15 bder-b box3" v-for="(item,index) in tabbar" :key="index" @click="onTabbar(index)">
					<view class="my-flex-row-align-c">
						<image class="icon-i" :src="item.img" mode="aspectFit"></image>
						<text class="text-i my-mgl-15 my-font-15" style="font-weight: bold;">{{item.txt}}</text>	
					</view>
					<!-- <image class="icon-i1 my-mgr-10" src="/static/my/right.png" mode=""></image> -->
				</view>
				<view v-if="color" class="white" @click="change">{{options}}</view>
				<view  v-if="!color" class="black" >{{options}}</view>
			</view>
			
			
		</view>
		
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import login from '@/util/login.js'
	import req from '@/util/req.js'
	export default {
		data() {
			return {
				color:true,
				options:null,
				isLogin: false,
				edit:false,
				nickname:'',
				tab: [{
					img: '/static/my/pig.png',
					txt: '我的积分'
				}, {
					img: '/static/my/msg.png',
					txt: '我的消息'
				}, {
					img: '/static/my/cust.png',
					txt: '专属客服'
				}],
				tabbar:[{
					img:'/static/my/feedback.png',
					txt:'问题反馈'
				},{
					img:'/static/my/manua.png',
					txt:'帮助手册'
				}
				// ,{
				// 	img:'/static/my/wallet.png',
				// 	txt:'押金提现'
				// }
				,{
					img:'/static/my/set.png',
					txt:'系统设置'
				}],
				avatarUrl:"/static/hch-position/1.jpg",
				user:null,
				msgList:false
			}
		},
		components: {
			loading
		},
		computed: {

		},
		onLoad() {

		},
		mounted() {
			this.options = uni.getStorageSync('options')
			this.isLogin = uni.getStorageSync('logged') || false
			
			if (this.isLogin == true) {
				login.userLogin().then((res) => {
					console.log('登录成功：' + res)
					this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg"
					this.getUser()
					this.getMsg()
				}, (error) => {
					console.log('登录失败：' + error)
				})
			}
			// this.open();
			// setTimeout(() => {
			// 	this.close();
			// }, 2000)
		},
		methods: {
			change(){
				this.color=!this.color;
			},
			getMsg(){
				let params = {
					pageIndex:0,
					pageSize:30
				}
				req.request('POST', params, '/user/system/msg/list', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.msg=res.data.data.rows
						if(this.msg.length>0){
							this.msgList=true
						}
					}
				})
			},
			blurNickName(e){
				this.nickname=e.detail.value
			},
			onEdit(){
				this.edit=!this.edit
				if(this.edit===false){
					let params = {
						nickname:this.nickname
					}
					req.request('POST', params, '/user/user/update', '加载中', (res) => {
						if (res.statusCode === 200) {
							this.user.nickname=this.nickname
							uni.showToast({
								title:'修改成功！',
								icon:"none"
							})
						}
					})
				}
			},
			onGetAuthorize(res){
				// login.userLogin()
				login.userLogin().then((res) => {
					console.log('登录成功：' + res)
					this.isLogin = uni.getStorageSync('logged') || false
					this.avatarUrl=uni.getStorageSync('avatarUrl')||"/static/hch-position/1.jpg"
					this.getUser()
					this.getMsg()
				}, (error) => {
					console.log('登录失败：' + error)
				})
			},
			getUser(){
				let params = {
					
				}
				req.request('GET', params, '/user/user/get', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.user=res.data.data
					}
				})
			},
			onTopUp(){
				// uni.navigateTo({
				// 	url:"/pages/my/topup"
				// })
				uni.showToast({
					title:'此功能暂未开放',
					icon:'none'
				})
			},
			onTab(e){
				if(e===0){
					uni.showToast({
							title:'此功能暂未开放',
							icon:'none',
							duration:2000
						})
					// uni.navigateTo({
					// 	url:"/pages/my/integral"
						
					// })
				}
				if(e===1){
					uni.navigateTo({
						url:"/pages/my/message"
					})
				}
				if(e===2){
					uni.showToast({
							title:'此功能暂未开放',
							icon:'none',
							duration:2000
						})
				}
			},
			onTabbar(e){
				if(e===0){
					uni.navigateTo({
						url:"/pages/my/feedback"
					})
				}
				if(e===1){
					uni.navigateTo({
						url:"/pages/my/help"
					})
				}
				if(e===2){
					uni.showToast({
							title:'此功能暂未开放',
							icon:'none',
							duration:2000
						})
				}
			},
			onRecord(){
				uni.navigateTo({
					url:"/pages/my/record"
				})
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

		}
	}
</script>

<style>
	.box {
		width: 750upx;
	}
	.avatar-box {
		width: 750upx;
		height: 500upx;
	}
    .box2{
		width: 668upx;
	}
	.box3:nth-child(3) .icon-i{
		width: 50upx !important;
		height: 50upx !important;
		margin-left: 10upx;
	}
	.box3:nth-child(3) .text-i{
		padding-left: 5upx;
	}
	.box3:nth-child(1) .icon-i{
		width: 68upx !important;
		height: 68upx !important;
		margin-right: -5upx;
	}
	.mgt{
		margin-top: -45upx;
	}
	.three {
		width: 250upx;
		height: 111upx;
	}
	.w180{
		width: 180upx;
	}
	.my-bder-b-white{
		border-bottom: #FFFFFF solid 1rpx;
	}
	.icon {
		width: 27upx;
		height: 27upx;
	}
	.dot{
		top:300upx;
		left: 400upx;
	}
	.icon-i {
		width: 60upx;
		height: 60upx;
		margin-left: 5upx;
	}
	/* .icon-i:nth-child(3){
		width: 50upx !important;
		height: 50upx !important;
	}
	.icon-i:nth-child(1){
		width: 70upx !important;
		height: 70upx !important;
	} */
	.icon-i1{
		width: 21upx;
		height: 33upx;
	}

	.bder-lr {
		border-left: 2upx solid #FFFFFF;
		border-right: 2upx solid #FFFFFF;
	}
	.bder-b{
		border-bottom: 2upx dashed #A3A3A3;
	}
	.boxsha {
		box-shadow: 0rpx 0rpx 10rpx 4rpx #808080;
	}

	.box1 {
		width: 690rpx;
	}
	.bder-r-ye{
		border-right: 2upx dashed rgb(253, 203, 123);
	}
	.img{
		width: 100upx;
		height: 100upx;
	}
	.my-mgt-29{
		margin-top: 29upx !important;
	}
	.white{
		color: #FFFFFF;
	}
	.black{
		color: #000000;
	}
	
</style>
