<template>
	<view class="box my-flex-col">
		<view class="my-flex-row-b my-mgt-10 my-bg-white my-pdtb-10" v-for="(item,index) in detial" :key="index">
			<view class="my-font-13 my-cl-a3 my-flex-row-b " >
				<image src="../../../static/my/WD.png" class="icon my-mglr-15"></image>
				<view class="my-flex-col box1">
				     <view>{{item.withdrawalTime}}</view>
					 <text>{{item.withdrawalStatus}}</text>
				</view>
			</view>
			<view class=" my-font-22 my-cl-ye my-flex-row-b my-mgr-25" >
				{{item.amount}}元
			</view>
		</view>		
	</view>
</template>

<script>
	import req from "@/util/req.js"
	export default {
		data(){
		 return {
			detial:null,
		  }
		},
		onLoad() {
			var isbusiness=uni.getStorageSync('openIdBindByBusiness');
			if(isbusiness==true){
				console.log(67766767)
				this.getbusinesslist();
			}else{
				this.getlist();
			}
			
		},
		methods:{
			getbusinesslist(){
				var params={
					 pageIndex: 0,
					 pageSize:30
				};
				req.request('POST', params, '/proxy/business/withdrawal/record', '加载中', (res) => {
					if (res.statusCode === 200) {
						 this.detial=res.data.data.rows;
					}
				})
			},
			getlist(){
				var params={
					 pageIndex: 0,
					 pageSize:30
				};
				req.request('POST', params, '/proxy/proxy/withdrawal/record', '加载中', (res) => {
					if (res.statusCode === 200) {
						 this.detial=res.data.data.rows;
					}
				})
			}
		}
	}
	
</script>

<style>
	.box1{
		width: 315upx;
		height: 66upx;
	}
	.icon{
		width: 66upx;
		height: 66upx;
	}
</style>
