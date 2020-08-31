<template>
	<view>
		<view  class="box my-mgt-5 my-pdt-10 my-pdb-10 my-pdr-10 my-flex-row-b my-bg-white my-font-12 " v-for="(item,index) in branch" :key="index">
			<image :src="item.logoUrl" class="pic rdsr my-mgl-10" mode=""></image>
			<view class="my-flex-col txt-box" >
				<!-- <view class="my-flex-row-b" style="position: absolute; margin-left: 250upx;">
					<text></text>
					<view class="my-flex-row-align-c bgcl" style="position: relative; right: 0; top: 8upx;">
						<image class="nav my-mgl-5" src="/static/hch-position/nav.png" mode=""></image>
						<text class="my-cl-white my-mgl-5 my-font-11" @click="onNav">距您{{item.distance}}Km</text>
					</view>
				</view> -->
				<view class="my-flex-row-r my-cl-grey my-mgt-5">
					<view class="my-flex-row-align-c">
						<text class="my-flex-self-s txt">商户类型</text>
						<text class="my-mgl-10 txt1" v-if="item.businessType=='RESTAURANT'">餐厅</text>
						<text class="my-mgl-10 txt1" v-else>酒店</text>
					</view>
					<view class="class-good">
						<view class="my-flex-row-align-c bgcl" style="position: relative; right: 0;">
							<image class="nav my-mglr-3" src="/static/hch-position/nav.png" mode=""></image>
							<text class="my-cl-white  my-font-11" @click="onNav">距您{{item.distance}}M</text>
						</view>
					</view>	
				</view>
				<view class="my-flex-row-align-c my-cl-grey my-mgt-5">
					<text class="my-flex-self-s txt">商户名称</text>
					<text class="my-mgl-10 txt1">{{item.businessName}}</text>
				</view>
				<!-- <view class="my-flex-row-align-c my-cl-grey my-mgt-5">
					<text class="my-flex-self-s txt">营业时间</text>
					<text class="my-mgl-10 txt1">{{item.time}}</text>
				</view> -->
				<view class="my-flex-row-align-c my-cl-grey my-mgt-5">
					<text class="my-flex-self-s txt">商户地址</text>
					<text class="my-mgl-10 txt1">{{item.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			branch:{
				type:Array,
				required: true
			}
		},
		methods:{
			onNav() {
				uni.getLocation({
					type: 'wgs84',
					success (res) {
						uni.openLocation({
							latitude : Number(res.latitude),
							longitude : Number(res.longitude)
						})
					}
				});
			}
		}
	}
</script>

<style>
	.box{
		width: 750upx;
	}
	.pic{
		width: 279upx;
		height: 164upx;
	}
	.rdsr{
		/* border-top-right-radius: 15upx;
		border-bottom-right-radius: 15upx; */
		border-radius: 15upx;
	}
	.txt-box{
		width: 400upx;
	}
	.txt{
		width: 115upx;
	}
	.txt1{
		width: 270upx;
	}
	.nav{
		width: 35upx;
		height: 35upx;
	}
	.bgcl{
		background-image: linear-gradient(#F4B249,#FDCB7B);
		border-radius: 50upx 0 0 50upx;
	}
	.class-good{
		height: 39upx;
		position: absolute; 
		right: 0;
	}
</style>
