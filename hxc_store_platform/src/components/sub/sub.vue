<template>
	<view class="box my-mgt-10">
		<view class="box my-pd-10 my-flex-row-b my-bg-white my-bder-b-eb" v-for="(item,index) in junior" :key="index" @click="onSeeMore(index)">
			<view class="my-flex-col">
				<view class="my-flex-row-align-c">
					<view class="my-flex-row-b txt">姓名</view>
					<text class="my-mgl-8">{{item.proxyName}}</text>
				</view>
				<view class="my-flex-row-align-c my-mgt-5">
					<view class="my-flex-row-b txt">手机号</view>
					<text class="my-mgl-8">{{item.proxyPhone}}</text>
				</view>
				<view class="my-flex-row-align-c my-mgt-5">
					<view class="my-flex-row-b txt">拥有设备</view>
					<view class="my-mgl-8 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye my-bder-ye">{{item.model}}</view>
				</view>
			</view>
			<view class="my-hdimg-c-60 my-cl-white my-flex-col-c my-bg-ye">
				<!-- <text class="my-font-20">{{item.orderCount}}单</text> -->
				<text class="my-font-20" v-if="item.orderCount">{{item.orderCount}}单</text>
				<text v-if="item.deviceCount">{{item.deviceCount}}</text>
				<text v-if="item.deviceCount">设备数</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			junior: Array,
			required: true
		},
		onLoad(){
		},
		methods:{
			onSeeMore(e){
				// console.log(e)
				this.$emit('selected',e)
			}
		}
	}
</script>

<style>
	.box {
		width: 100%;
	}

	.box .box {
		width: 750upx;
	}

	.txt {
		width: 120upx;
	}

	.bg {
		background-color: rgba(243, 178, 73, 0.3);
	}
</style>
