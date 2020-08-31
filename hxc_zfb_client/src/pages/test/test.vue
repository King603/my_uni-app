<template>
	<view class="my-pd-15">
			
		<view class="my-mgt-15 box my-flex-row-c">
			<view class="btn my-flex-row-c my-bg-ye my-cl-white my-font-22 my-boxsha-2" @click="eject('QSPopup')">
				<image class="icon" src="/static/my/service.png" mode=""></image>
				<text class="my-mgl-8">联系客服</text>
			</view>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="my-bg-white my-rds-10 my-flex-col-c show1">
				<view class=" my-bg-white my-rds-10 my-flex-col-c show1">
					<image src='../../static/hch-position/监控-监控绑定.png' class="pic" mode=""></image>
					<text class="my-font-12 my-cl-33" >当前设备未绑定商户，无法进行租借！</text>
					<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15" @click="onPages">
						返回首页
					</view>
				</view>
		    </view>
		</QSPopup>
		
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>

	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	export default{
		data(){
			return{
				showBl:true,	
			}
		},
		components: {
			QSPopup,
			loading
		},
		mounted() {
			
		},
		methods:{
			onAffirm(){
				this.showBl=false
				uni.navigateBack({
					delta:1,
				})
			},
			eject(ref) {
				this.showBl=true
				this.$refs[ref].show();
			},
			onPages(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			callback() {
				// console.log("回掉");
			},
		}
	}
</script>

<style>
	.box{
		width: 690upx;
	}
	.box .box{
		width: 100%;
	}
	.txt-box{
		width: 298upx;
		color: #FFFFFF;
		height: 40upx;
		background: #CCCCCC;
	}
	.txt-center{
		line-height: 40upx;
		text-align: center;
	}
	
	.h{
		height: 255upx;
	}
	.my-absolute{
		bottom: 10upx;
	}
	.btn{
		width: 650upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.btn2{
		width: 600upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.btn1{
		margin-top: 24upx;
		margin-bottom: 43upx;
		width: 380upx;
		height: 60upx;
		border-radius: 50upx;
	}
	.circular{
		width: 15upx; 
		height: 15upx; 
		background: #FF0000;
		border-radius: 50%;
		margin-right: 14upx;
	}
	.my-mgt{
		margin-top: 150upx;
	}
	.show1{
		width: 600upx;
	}
	.pic{
		margin-top: 43upx;
		width: 212upx;
		height: 212upx;
		margin-bottom: 24upx;
	}
	
</style>
