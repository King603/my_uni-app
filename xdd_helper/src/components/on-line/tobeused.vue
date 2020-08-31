<template>
	<view>
		<view class="class-pd my-bg-white class-mgt my-font-12" v-for="(item,index) in tobeused" :key="index">
			<view class="my-flex-row-b">
				<view class="my-flex-row-align-c">
					<text>充电宝编号：{{item.deviceNo}}</text>
					<view class="text-icon my-flex-row-c">
						{{item.model}}
					</view>
					<!-- <text class=""></text> -->
				</view>
				<view class="icon"></view>
			</view>
			<view class="my-flex-row-b view-mgt">
				<view class="">
					设备归属：{{item.proxyName}}
				</view>
				<view class="class-color">
					待使用
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tobeused: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
 
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.class-mgt{
		margin-top: 10upx;
		width: 750rpx;
	}
	
	.class-pd{
		padding: 19upx 33upx;
	}
	
	.icon{
		width: 20upx;
		height: 20upx;
		background: #F3B249;
		border-radius: 20upx;
		margin-right: 25upx;
	}
	
	.text-icon{
		background-color:rgba(243,178,73,.5);
		color: #F3B249;
		width: 88upx;
		height: 28upx;
		border-radius:5upx;
		margin-left: 23upx;
	}
	
	.class-color{
		color: #F3B249;
	}
	
	.view-mgt{
		margin-top: 10upx;
	}
</style>
