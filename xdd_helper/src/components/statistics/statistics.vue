<template>
	<view class="box">
		<view class="box h-hei my-flex-row-c">
			<view class="">
				<image src="../../static/index/top.png" class="icon-top"></image>
			</view>
			<view class="class-sea my-flex-row-c my-cl-a3 my-mglr-10" @click="tosearchorder">
				<image src="/static/index/search-1.png" class="icon-search" mode=""></image>
				<text class="class-font">搜索</text>
			</view>
			<view class="my-font-15 my-cl-a3" @click="tosearchorder">
				搜索
			</view>
		</view>
		<view class="box" v-for="(item,index) in statistics" :key="index">
			<view style="height: 10upx; width: 100%; background: #F2F2F2;"></view>
			<view class="my-flex-row-b box my-bder-b-eb box-btn my-pd">
					<text class="my-flex-row-align-c my-font-12 my-bold my-cl-black">订单编号：{{item.orderNo}}</text>
					<view class="my-flex-row-align-c my-mgl-15 my-font-12 my-flex-row-c my-rds-3 my-cl-ye bg">{{item.deviceModel}}</view>
				<text class="my-flex-row-align-c my-font-12 my-cl-ye">{{item.orderStatus}}</text>
			</view>
			<view class="my-flex-row-b box my-pd my-font-12 my-cl-C3 my-mgt-5">
				<view class="">
					充电宝编号
				</view>
				<view class="">
					 {{item.deviceNo}}
				</view>
			</view>
			<view class="my-flex-row-b box my-pd my-font-12 my-cl-C3 my-mgt-5">
				<view class="">
					底座编号
				</view>
				<view class="">
					 {{item.boxNo}}
				</view>
			</view>
			<view class="my-flex-row-b box my-pd my-font-12 my-cl-C3 my-mgt-5">
				<view class="">
					商户地址 
				</view>
				<view class="">
					 {{item.businessAddress}}
				</view>
			</view>
			<view class="my-flex-row-b box my-pd my-font-12 my-cl-C3 my-mgt-5 my-bder-b-eb my-pdb-5">
				<view class="">
					开始时间
				</view>
				<view class="">
					 {{item.startDate}}
				</view>
			</view>
			<view class="my-flex-row-b box my-bder-b-eb box-btn my-pd">
				<view class="my-flex-row-align-c">
				</view>
				<text class="my-font-12 my-cl-ye" v-if="item.orderStatus!=='已结算'">订单进行中...</text>
				<text class="my-font-12 my-cl-ye" v-else >收益金额：￥{{item.orderAmount || 0}}元</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			statistics: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				inputShowed: false,
			}
		},
		methods: {
			tosearchorder(){
			   uni.navigateTo({
			   	url:'/pages/home_page/search/search_dev?type=businessorder'
			   })
			}
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
	}
	
	.box {
		width: 100%;
	}
	
	.bder-tb {
		border-bottom: 2upx solid #DDDDDD;
		border-top: 2upx solid #DDDDDD;
	}
	
	.tabbar-item {
		width: 50%;
		height: 60upx;
	}
	
	.bg {
		background-color: rgba(243, 178, 73, 0.3);
		height: 28upx;
		width: 75upx;
	}
	
	.my-pd{
		padding: 0 14upx ;
	}
	
	.box-btn{
		height: 62upx;
	}
	
	.h-hei{
		height: 66upx;
	}
	
	.class-sea{
		height: 42upx;
		width: 565upx;
		background-color: #F5F5F5;
		border-radius: 10upx;
	}
	
	.icon-search {
		width: 25upx;
		height: 25upx;
		padding-right: 12upx;
	}
	
	.class-font{
		font-size: 19upx;
	}
	
	.icon-top{
		width: 35upx;
		height: 35upx;
	}
</style>
