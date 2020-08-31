<template>
	<view class="my-flex-col my-bg-white">
		<view class="my-flex-row-c my-font-16 my-mgt-10 my-bold">
             <text>{{profit.businessName}}</text>
		</view>
		<view class="my-cl-ye my-font-30 my-flex-row-c my-mgtb-25">
			{{profit.amount}}
		</view>
		<profit :profit="profit"></profit>
		<view class="btn my-bg-ye my-font-24 my-cl-white my-flex-row-c my-mgl-25 my-mgtb-30" @click="onBack">
			<text class="my-flex-row-align-c ">返回上一级</text>
		</view>
	</view>
</template>

<script>
	import profit from '@/components/profit/profit.vue';
	import req from "@/util/req.js";
	export default {
		data() {
			return {
				order:null,
				profit:null,
				box: [{
					businessName:'华莱士酒店',
					earnings:'+3.56'
			}]
				
				}
			},
			components: {
			profit
		},  
		onLoad(options) {
			this.order=options.order;
			this.getorder();
		},
		methods: {
			getorder(){
				var params={
					orderNo:this.order
				}
			req.request('POST', params, '/proxy/proxy/order/'+this.order, '加载中', (res) => {
				if (res.statusCode === 200) {
					console.log('order',res.data.data);
					this.profit=res.data.data;
				}
			})
			},
			onBack(){
				uni.navigateBack({
				})
			}
			  
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.btn1{
		position: absolute;
		padding: 5upx 20upx;
		right: 50upx;
		top:20upx ;
		height: 50upx;
		width: auto;
		border: #A3A3A3 2upx solid;
		border-radius: 30upx;
		color: #A3A3A3;
	}
</style>
