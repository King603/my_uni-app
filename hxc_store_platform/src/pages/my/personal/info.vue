<template>
	<view class="my-flex-col-c box  my-pd-10">
		<view class=" box my-fixed-t" style="z-index: 999;">
			<uniStatusBar></uniStatusBar>
			<uniNav :title="title"></uniNav>
		</view>
		<view class="my-bg-white box">
			<uniStatusBar></uniStatusBar>
			<uniNav></uniNav>
		</view>
		<view class="my-flex-col-c box1  my-font-16 my-mglr-30" >
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
				<view class="aaa my-flex-row-b"><text>姓</text><text>名</text></view>
				<input @blur="blurName" type="text" value="" class="my-mgl-15 my-font-14 my-pd-5 txt" placeholder="李晶" />
			</view>
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
				<view class="aaa my-flex-row-b"><text>手</text><text>机</text><text>号</text></view>
				<input @blur="blurMobile" type="text" value="" class="my-cl-grey my-mgl-15 my-font-14 my-pd-5 txt" placeholder="请输入手机号" />
			</view>
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
			    <view class="aaa my-flex-row-b"><text>身</text><text>份</text><text>证</text><text>号</text></view>
				<input @blur="blurID" type="text" value="" class="  my-mgl-15 my-font-14 my-pd-5 txt" placeholder="xxxx" />
			</view>
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
				<view class="aaa my-flex-row-b"><text>用</text><text>户</text><text>名</text></view>
				<view  class="my-mgl-15 my-font-14 my-pd-5 txt" >{{item.userId}}</view>
			</view>
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
				<view class="aaa my-flex-row-b"><text>帐</text><text>号</text><text>类</text><text>型</text></view>
				 <view class="uni-list-cell-db">
				    <picker @change="bindPickerChange" :value="index" :range="array" mode = "selector">
				        <view class="my-mgl-15 my-font-14 my-pd-5 txt">{{array[index]}}</view>
				    </picker>
				</view>
			</view>
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
				 <view class="aaa my-flex-row-b"><text>银</text><text>行</text><text>卡</text><text>号</text></view>
				<input @blur="blueCardID" type="text" value="" class="  my-mgl-15 my-font-14 my-pd-5 txt" placeholder="xxxx" />
			</view>
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
				<view class="aaa my-flex-row-b"><text>邮</text><text>箱</text></view>
				<input @blur="blueEmail" type="text" value="" class=" my-mgl-15 my-font-14 my-pd-5 txt" placeholder="请输入邮箱" />
			</view>
			<view class="my-flex-row-align-c box my-mgt-10 my-bder-b-eb">
				<view class="r my-bg-ye"></view>
				<view class="aaa my-flex-row-b"><text>地</text><text>址</text></view>
				<input @blur="blurAddress" type="text" value="" class=" my-mgl-15 my-font-14 my-pd-5 txt" placeholder="xxxxx" />
			</view>
		</view>
		<view class="box my-flex-row-c my-mgt-50">
			<view class="my-flex-row-c btn my-bg-ye my-cl-white my-boxsha-2 my-font-17" @click="">
				立即修改
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				index: 0,
				array: ['商户', '代理'],
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			}
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
		padding-bottom: 0;
	}
	.box .box {
	width: 650upx;
	height: auto;
    }
	.btn{
		width: 600upx;
		height: 80upx;
	}
   .aaa{
	   width: 150upx;
   }
</style>
