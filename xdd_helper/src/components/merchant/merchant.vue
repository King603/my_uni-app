<template>
	<view class="my-flex-col-c box">
		<view class="my-flex-col box my-bg-white my-mgt-10 my-boxsha-2" v-for="(item,index) in mer" :key="index" @click="onInfo(index)">
			<view class="my-flex-col box1 my-pd-10 my-bder-b-cc">
				<view class="box my-flex-row-b">
					<text>{{item.mer}}</text>
					<!-- <view class="my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg" v-if="item.type===0">标准分润：{{item.profit}}%</view> -->
					<view class="my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg" >标准分润：{{item.profitScale}}%</view>
				</view>
				<view class="my-flex-row-align-c my-mgt-5">
					<image src="/static/team/address.png" class="icon my-flex-self-s"></image>
					<view class="my-cl-grey my-mgl-5 text">{{item.address}}</view>
				</view>
			</view>
			<view class="my-pd-10">
				<text>商户类型：</text>
				<text>{{item.type}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mer: {
				type: Array,
				required: true,
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
	.box1 {
		width: 710upx;
	}
	.box1 .box{
		width: 100%;
	}
	.bg {
		background-color: rgba(243, 178, 73, 0.3);
	}
		
	.icon{
		width: 40upx;
		height: 40upx;
	}
	.text{
		width: 620upx;
	}
</style>
