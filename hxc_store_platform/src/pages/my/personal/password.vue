<template>
	<view class="my-mglr-20  input">
		<view class="my-rds-5 my-bder-cc my-mgt-10 my-flex-row">
	        <input @blur="blurName" type="text" value="" class="input my-pdl-15 my-font-14" placeholder="13222222222" />
	        <view class="my-bg-ye my-cl-white my-rds-5 input btncode " @click="">获取验证码</view>
		</view>
		<!-- 提现和登录密码-->
		<view class="my-cl-grey my-font-14 my-mgtb-30" v-if="id == 0">
			我们将验证码发送到您的手机信息中，请查阅并输入验证码后创建新的登录密码。
		</view>
		<view class="my-cl-grey my-font-14 my-mgtb-30" v-if="id == 1">
			我们将验证码发送到您的手机信息中，请查阅并输入验证码后创建新的提现密码。
		</view>
		<input @blur="blur" type="text" value="" class="input my-pdl-15 my-rds-5 my-bder-cc my-bder-cc my-mgtb-10 " placeholder="验证码" />
		<input @blur="blurpassword" type="text" value="" class="input my-pdl-15 my-font-14 my-rds-5 my-bder-cc  my-mgtb-10" placeholder="新的密码" />
		<input @blur="blurpassword" type="text" value="" class="input my-pdl-15 my-font-14 my-rds-5 my-bder-cc  my-mgtb-10" placeholder="确认密码" />
		<view class="box my-flex-row-c my-mgt-50">
			<view class="my-flex-row-c btn my-bg-ye my-cl-white my-boxsha-2 my-font-17" @click="">
				立即设置
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null
			}
		},
		
		onLoad(data) {
			console.log("data", data)
			this.id = Number(data.id);
			if (this.id === 0) {
				uni.setNavigationBarTitle({
					title: '设置登录密码',
				})
			}
			if (this.id === 1) {
				uni.setNavigationBarTitle({
					title: '设置提现密码'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
		padding-bottom: 0;
	}
	.input{
		height: 108upx;
	}
	.btncode{
		width: 208upx;
		position: relative;
		right: -133rpx;
		text-align: center;
		padding-top:37upx;
	}
</style>
