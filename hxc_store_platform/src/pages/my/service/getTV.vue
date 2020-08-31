<template>
 <view>
	<view class="my-flex-col-c box ">
		<view class="my-mgt-10 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25 my-bold my-cl-black">广告电视编号</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class=" my-mgl-10" type="text" placeholder="请输入你要获取的电视设备编号"/>
		</view>	
	</view>
	<view class="my-cl-black my-bold my-flex-col-c my-font-15">
		<image src="../../../static/my/scan.png" class="my-flex-col-c icon1"></image>
		<text>扫码获取</text>
	</view>
	<view class="box my-font-13 my-cl-a3 my-mgt-25 my-flex-row-c">
		<text>设备编号:</text>
		<input class="my-bder-b-cc" type="text"   confirm-type="search"  />
		
	</view>
	<view class=" my-flex-col-c btn my-bg-ye my-cl-white my-boxsha-2 my-font-17" >
			下一步
	</view>
 </view>	
</template>

<script>
</script>

<style>
	page {
		background: #FFFFFF;
		padding-bottom: 0;
	}
	.box {
		width: 750upx;
	}
	
	.line {
		width: 200upx;
		height: 5upx;
	}
	
	.search-box {
		width: 630upx;
		height: 60upx;
		background-color: #EEEEEE;
	}
	.icon {
		width: 50upx;
		height: 50upx;
	}
	.icon1{
		margin-top: 106upx;
		width: 260upx;
		height:260upx;
		padding-bottom: 10upx;
	}
	.btn{
		margin-left: 75upx;
		margin-top: 100upx;
	}
</style>
