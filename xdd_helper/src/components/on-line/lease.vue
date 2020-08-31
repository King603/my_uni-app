<template>
	<view>
		<view class="my-bg-white my-font-12 class-mgt" v-for="(item,index) in lease" :key="index">
			<view class="class-pd class-bottom">
				<view class="my-flex-row-b my-bold">
					<view class="my-flex-row-align-c">
						<text>订单编号：{{item.orderNo}}</text>
						<view class="text-icon my-flex-row-c">
							{{item.model}}
						</view>
						<!-- <text class=""></text> -->
					</view>
					<view class="icon"></view>
				</view>
				<view class="my-flex-row-b my-bold view-mgt">
					<view class="">
						设备编号：{{item.deviceNo}}
					</view>
					<view class="class-color">
						租借中
					</view>
				</view>
			</view>
			<view class="class-bottom class-two my-flex-row-b">
				<view class="">
					创建时间
				</view>
				<view class="">
					<text class="text-mgr">{{item.createDate}}</text>  
				</view>
			</view>
			<view class="my-flex-row-b bootom-pdlr my-font-12 my-bg-white">
				<text>联系方式：{{item.proxyPhone}}</text>
				<view class="my-flex-row-align-c">
					<view class="my-mgl-15 my-pdb-2 my-flex-row-align-c my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 class-color my-bder-ye" @click="onCall(item.proxyPhone)">
						<image src="/static/index/phone.png" class="icon1" mode=""></image>
						<text class="my-mgl-5">呼叫</text>
					</view>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			lease: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				 
			}
		},
		methods: {
			onCall(num){
				uni.makePhoneCall({
					phoneNumber:num
				})
			}
		}
	}
</script>

<style>
	.class-mgt{
		margin-top: 10upx;
		width: 750rpx;
	}
	
	.class-pd{
		padding: 19upx 32upx;
	}
	
	.class-box{
		height: 104upx;
	}
	
	.text-icon{
		background-color:rgba(243,178,73,.5);
		color: #F3B249;
		width: 88upx;
		height: 28upx;
		border-radius:5upx;
		margin-left: 23upx;
	}
	
	.icon{
		width: 20upx;
		height: 20upx;
		background: #F3B249;
		border-radius: 20upx;
		margin-right: 25upx;
	}
	
	.view-mgt{
		margin-top: 10upx;
	}
	
	.class-color{
		color: #F3B249;
	}
	
	.class-bottom{
		border-bottom: 2upx solid #F2F2F2;
	}
	
	.class-two{
		padding: 0 32upx;
		height: 60upx;
		color: #C3C3C3;
	}
	
	.bootom-pdlr{
		height: 62upx;
		padding: 0 32upx;
		border-bottom: 2upx solid #F2F2F2;
	}
	
	.icon1 {
		width: 26upx;
		height: 26upx;
	}
	
	.text-mgr{
		margin-right: 20upx;
	}
</style>
