<template>
	<view class="box my-flex-col-c">
		<view class="box my-flex-col over-hide my-mgt-8" v-for="(item,index) in earnings" :key="index">
			<view class="my-pd-10 my-bg-white my-flex-row-b box my-bder-b-cc my-relative">
				<view class="my-flex-row-align-c">
					<text>设备编码</text>
					<text class="my-mgl-10">{{item.deviceNo}}</text>
				</view>
				<view class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg">{{item.modelName}}</view>
				<view class="my-absolute square"></view>
				<view class="my-absolute squares"></view>
			</view>
			<view class="my-pd-10 my-bg-white my-flex-row-b box">
				<view class="my-flex-col">
					<view class="my-flex-row-align-c">
						<text>商户名称</text>
						<text class="my-mgl-10">{{item.businessName}}</text>
					</view>
					<view class="my-flex-row-align-c my-mgt-5">
						<text>订单编号</text>
						<text class="my-mgl-10">{{item.orderNo}}</text>
					</view>
					<view class="my-flex-row-align-c my-mgt-5">
						<text>支付时间</text>
						<text class="my-mgl-10">{{item.payTime}}</text>
					</view>
				</view>
				<text class="my-font-20 my-cl-ye">+{{item.profitAmount}}￥</text>
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
		data() {
			return {
	
			}
		},
		components: {
	
		},
		computed: {
	
		},
		onLoad() {
	
		},
		methods: {
			
		}
	}
</script>

<style>
	.over-hide{
		overflow: hidden;
	}
	.box{
		width: 750upx;
	}
	.box .box{
		width: 710upx;
	}
	.bg {
		background-color: rgba(243, 178, 73, 0.3);
	}
	.square {
		width: 40upx;
		height: 40upx;
		bottom: -20upx;
		left: -20upx;
		transform: rotate(45deg);
		background: #EBEBEB;
	}
	
	.squares {
		width: 40upx;
		height: 40upx;
		bottom: -20upx;
		right: -20upx;
		transform: rotate(45deg);
		background: #EBEBEB;
	}
</style>
