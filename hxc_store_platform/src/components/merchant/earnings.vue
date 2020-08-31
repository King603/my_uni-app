<template>
	<view class="my-flex-col-c box">
		<view class="my-flex-col box my-bg-white my-mgt-10 my-boxsha-2 my-rds-10" v-for="(item,index) in earnings" :key="index">
			<view class="my-flex-row-b box1 my-pd-10 bder-b">
				<view class="my-flex-col">
					<text class="my-font-16">{{item.business.businessName}}</text>
					<text class="my-mgt-8 my-cl-grey">创建时间：{{item.business.createDate}}</text>
				</view>
				<view class="my-flex-col-c info" @click="onInfo(index)">
					<image src="/static/team/info.png" class="icon"></image>
					<view class="my-cl-grey my-mgt-8 text"><text style="color:#F3B249;">详情</text></view>
				</view>
			</view>
			<view class="my-flex-row-b box1 bder-b">
				<view class="my-grow-1 my-pd-10 my-flex-col-c">
					<text>我的收益</text>
					<text class="my-font-16 my-mgt-5">{{item.proxyAmount}}</text>
				</view>
				<view class="my-grow-1 my-pd-10 my-flex-col-c bder-l">
					<text>商户收益</text>
					<text class="my-font-16 my-mgt-5">{{item.businessAmount}}</text>
				</view>
				<view class="my-grow-1 my-pd-10 my-flex-col-c bder-l">
					<text>总订单数</text>
					<text class="my-font-16 my-mgt-5">{{item.orderCount||0}}</text>
				</view>
				<view class="my-pdtb-10 my-flex-col-c bder-l" style="width: 25%;">
					<text class="my-font-12">总收益环比差额</text>
					<text class="my-font-16 my-mgt-5">{{item.weeklyProfitGap}}</text>
				</view>
			</view>
			<view class="my-flex-row box1 bder-b">
				<view class="my-flex-row-b">
					<view class="my-grow-1 my-pdtb-10 my-flex-col-c small-box">
						<text>分润人</text>
						<text class="my-mgt-5">{{item.profitMan||'无'}}</text>
						<view class="my-flex-row-align-c my-mgt-5">
							<image src="/static/index/phone.png" class="icon-i" mode=""></image>
							<text class="my-cl-ye my-font-11">{{item.phone}}</text>
						</view>
					</view>
					<view class="my-grow-1 my-pdtb-10 my-flex-col-c small bder-l">
						<text class="my-font-12">商家分润比例</text>
						<text class="my-font-16 my-mgt-5">{{item.business.profitScale}}%</text>
						<text class="my-font-12 my-mgt-5" v-if="item.business.standardProfit==true">标准分润比例</text>
						<text class="my-font-12 my-mgt-5" v-if="item.business.standardProfit==false">非标准分润比例</text>
					</view>
				</view>
				<view class="my-pd-10 my-flex-col bder-l two-box">
					<text>设备数量</text>
					<view class="my-flex-row-align-c my-mgt-5">
						<text>H60</text>
						<text class="my-mgl-5">座充</text>
						<text class="my-mgl-10">{{item.business.deviceList[0].count||0}}套</text>
						<text class="my-mgl-10">{{item.business.deviceList[1].count||0}}个宝</text>
					</view>
					<view class="my-flex-row-align-c my-mgt-5">
						<text>X10</text>
						<text class="my-mgl-5">线充</text>
						<text class="my-mgl-10">{{item.X10||0}}条</text>
					</view>
				</view>
			</view>
			<view class="box1 my-flex-row-b">
				<view class="small-box my-pd-10 my-flex-row-c">商户地址</view>
				<view class="my-grow-1 bder-l big my-pd-10">
					{{item.business.address}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			earnings: {
				type: Array,
				required: true
			}
		},
		components: {
	
		},
		computed: {
	
		},
		onLoad() {
	
		},
		methods: {
			onInfo(e){
				this.$emit('index',e)
			}
		}
	}
</script>

<style>
	.box{
		width: 750upx;
	}
	.box .box{
		width: 710upx;
	}
	.box1{
		width: 710upx;
	}
	.bder-b{
		border-bottom: 2upx solid #DDDDDD;
	}
	.icon{
		width: 40upx;
		height: 40upx;
	}
	.info{
		width: 60upx;
	}
	.bder-l{
		border-left: 2upx solid #DDDDDD;
	}
	.icon-i{
		width: 20upx;
		height: 20upx;
	}
	.two-box{
		width: 340upx;
	}
	.small-box{
		width: 172upx;
	}
	.small{
		width: 187upx;
	}
	.big{
		width: 530upx;
	}
</style>
