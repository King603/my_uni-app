<template>
	<view>
		<view class="my-box">
			<view class="line-top-tip"><text>有效时间：{{startDate}}至{{endDate}}</text></view>
			<view class="line-join-tip"><text>使用小电兜用户端小程序里的扫码加入</text></view>
			<view class="line-join-tip"><text>暂不支持直接扫码</text></view>
			<view class="qrcode-img">
				<canvas canvas-id="qrcode" style="width: 150px;height: 150px; margin: auto;" />
			</view>
			<view class="line-shop-tit"><text>{{businessName}}</text></view>
		</view>
		<view class="my-box2">
			<view class="line-tit-info"><text>优惠次数：{{discountTimes}}次/天</text></view>
			<view class="line-tit-info"><text>优惠时长：{{discountDuration}}小时/次</text></view>
			<view class="line-tit-info"><text>开始时间：{{startDate}}</text></view>
			<view class="line-tit-info"><text>结束时间：{{endDate}}</text></view>
		</view>
		<view class="btn-box">
			<view class="btn-add" @click="btnRet"><text>返回</text></view>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js';
	import req from '@/util/req.js';
	export default {
		onLoad(options){
			this.businessId = options.businessId;
			this.businessName = options.businessName;
			this.discountDuration = options.discountDuration;
			this.discountTimes = options.discountTimes;
			this.endDate = options.endDate;
			this.startDate = options.startDate;
			this.whiteId=options.whiteId;
		},
		data() {
			return {
				businessId:0,
				businessName: null,
				discountDuration: 0,
				discountTimes: 0,
				endDate: null,
				startDate: null,
				whiteId: 0
			}
		},
		mounted() {
			this.make();
		},
		methods: {
			make() {
			      uQRCode.make({
			        canvasId: 'qrcode',
			        componentInstance: this,
			        text: 'https://xdd.pumi.site/user/?op=addWhiteList&whiteId='+this.whiteId,
			        size: 150,
			        margin: 10,
			        backgroundColor: '#ffffff',
			        foregroundColor: '#000000',
			        fileType: 'jpg',
			        correctLevel: uQRCode.errorCorrectLevel.H,
			        success: res => {
			          console.log(res)
			        }
			      })
			    },
			btnRet(){
				// uni.navigateTo({
				// 	url:'/pages/team/com/writeListSet?businessId='+this.businessId+"&businessName="+this.businessName
				// })
				uni.navigateBack({delta: 1});
			}
		}
	}
</script>

<style scoped>
.my-box{
	margin:auto;
	margin-top: 15rpx;
	width:714rpx;
	height:640rpx;
	background:rgba(255,255,255,1);
	box-shadow:0rpx 1rpx 10rpx 0rpx rgba(8,8,8,0.2);
	border-radius:10rpx;
}
.my-box2{
	margin:auto;
	margin-top: 15rpx;
	width:714rpx;
	height:351rpx;
	background:rgba(255,255,255,1);
	box-shadow:0rpx 1rpx 10rpx 0rpx rgba(8,8,8,0.2);
	border-radius:10rpx;
}
.line-top-tip{
	background: rgba(244, 178, 73, 1);
	height: 40rpx;
	text-align: center;
	color: #FFFFFF;
	font-size:24rpx;
	font-family:PingFang SC;
	font-weight:bold;
}
.line-join-tip{
	margin: auto;
	margin-top: 30rpx;
	text-align: center;
	font-size:30rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:#ff0000;
}
.line-shop-tit{
	margin: auto;
	margin-top: 30rpx;
	text-align: center;
	font-size:26rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
}
.qrcode-img{
	margin: auto;
	margin-top: 30rpx;
	width:155px;
	height:155px;
	border:2rpx solid rgba(243, 178, 73, 1);
}
.line-tit-info{
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	
}
.btn-box{
	height: 80rpx;
	margin-top: 30rpx;
}
.btn-add{
	margin: auto;
	background: rgba(244, 178, 73, 1);
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 44rpx;
	color: #FFFFFF;
	font-size:36rpx;
	font-family:PingFang SC;
}
</style>
