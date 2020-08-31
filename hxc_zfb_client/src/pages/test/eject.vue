<template>
	<view class="my-pd-15">
		<view class="my-flex-col-c">
			<view class="my-font-16 mgtop4" style="font-weight: bold;">
				{{typetitle}}
			</view>
			<view class="my-font-16 my-mgt-10" style="font-weight: bold;">
				请取出<text>{{slotId}}</text>号槽充电宝
			</view>
			<image :src="src[slotId-1].url" class="mgtop1"></image>
			<view class="my-font-14" style="color: #FF0000; margin-top: 87upx; font-weight: bold;">
				正在弹出中，请稍作等待不要关闭页面
			</view>
			<view class="mgtop2 my-flex-row-c my-font-12">
					<text class="my-cl-ye">注:</text>
					<text class="my-cl-33 my-pdl-10">如充电宝未正常弹出请您</text>
					<text class="my-cl-ye" @click="onCall" style="text-decoration:underline">联系客服</text>
					<text>为您解决</text>
					<image src="../../static/hch-position/客服@2x.png" style="width: 50upx; height: 50upx;"></image>
			</view>
			<view class="mgtop3 box my-flex-row-c">
				<view class="btn my-flex-row-c my-bg-ye my-cl-white my-font-22 my-boxsha-2" @click="onPages">
					<text class="">返回首页</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				typetitle:'租借成功~',
				slotId:0,
				src:[
					{url:'../../static/hch-position/bao1.png'},
					{url:'../../static/hch-position/bao2.png'},
					{url:'../../static/hch-position/bao3.png'},
					{url:'../../static/hch-position/bao4.png'},
					{url:'../../static/hch-position/bao5.png'},
					{url:'../../static/hch-position/bao6.png'}
				]
			}
		},
		onLoad(options) {
			this.slotId=options.slotId||1;
			var typeId=options.typeId||0;
			this.typetitle = typeId==0?'租借成功~':'购宝成功~';
		},
		methods:{
			//返回首页
			onPages(){
				// uni.navigateTo({
				// 	url:'../index/index'
				// })
				uni.reLaunch({
					url:'../index/index'
				})
			},
			onCall(){
				uni.makePhoneCall({
					phoneNumber:'4008-732-567'
				})
			}
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
	.btn{
		width: 650upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.mgtop1{
		margin-top: 69upx;
		width: 399upx; height: 361upx;
	}
	.mgtop2{
		margin-top: 170upx;
	}
	.mgtop3{
		margin-top: 23upx;
	}
	.mgtop4{
		margin-top: 80upx;
	}
</style>
