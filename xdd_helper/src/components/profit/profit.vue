<template>
   <view>
	<view class="btn1">
	   	 租借收益
	</view>
	<view class="my-flex-col my-pdb-10">
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20 " >
			<text>分润比例</text>
			<text></text>
			<text>{{profit.profitScale}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>设备类型</text>
			<text></text>
			<text>{{profit.deviceType}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>商户地址</text>
			<text></text>
			<text>{{profit.businessAddress}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>商户类型</text>
			<text></text>
			<text>{{profit.businessType}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>开始时间</text>
			<text></text>
			<text>{{profit.startDate}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>结束时间</text>
			<text></text>
			<text>{{profit.endDate}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>创建时间</text>
			<text></text>
			<text>{{profit.createDate}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>订单编号</text>
			<text></text>
			<text>{{profit.orderNo}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>付款方式</text>
			<text></text>
			<text>{{profit.payType}}</text>
		</view>	
		<view class="my-flex-row-b my-pdlr-10 my-cl-a2 font-14 box my-mgt-20" >
			<text>设备编号</text>
			<text></text>
			<text  v-if="profit.allopatry==true">{{profit.deviceNo}}</text>
			<text v-if="profit.allopatry==false" style="color: red;">*{{profit.deviceNo}}</text>
		</view>	
	</view>
  </view>
</template>

<script>
	export default {
		props: {
			profit: Object,
			required: true
		},
		methods: {
			
		}
	}
</script>

<style>
.box{
		width: 100%;
	}
</style>
