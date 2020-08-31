<template>
	<view class="box my-font-16">
		<view class="my-mgt-10 my-bg-white my-pdt-10 my-pdb-10 my-pdr-25 my-pdl-25 box my-flex-row-b">
			<view class="my-flex-row-align-c">
				<view class="rec my-bg-ye"></view>
				<text class="my-mgl-8">我的余额</text>
			</view>
			<view class="my-flex-row-align-c">
				<image class="icon-i" src="/static/my/gold.png" mode=""></image>
				<text class="my-cl-ye my-mgl-8">30元</text>
			</view>
		</view>
		<view class="my-mgt-10 my-bg-white my-flex-col my-pdtb-10">
			<view class="my-pdlr-25 my-flex-col">
				<view class="my-flex-row-align-c">
					<view class="rec my-bg-ye"></view>
					<text class="my-mgl-8">充值金额</text>
				</view>
				<view class="my-cl-ye my-flex-row-b my-flex-warp box">
					<view class="topup-box my-flex-row-c my-mgt-15 my-rds-5" :class="select===index?'my-bder-ye icon-2':'my-bder-cc'" @click="onTopUp(index)" v-for="(item,index) in topUp"
					 :key="index">
						<text>{{item}}元</text>
					</view>
					<view class="topup-box my-flex-row-c my-mgt-15 my-rds-5 my-bder-cc" @click="onNull" >
						<input type="digit" @blur="blurMoney" value="" placeholder="其他金额" placeholder-class="my-cl-ye" style="width: 128upx;" />
					</view>
				</view>
			</view>
		</view>
		<view class="my-mgt-10 my-bg-white my-flex-col my-pdt-10 my-pdb-30 box1">
			<view class="my-pdlr-25 my-flex-col">
				<view class="my-flex-row-align-c">
					<view class="rec my-bg-ye"></view>
					<text class="my-mgl-8">支付方式</text>
				</view>
				<view class="pay my-pdlr-20 my-flex-row-b my-bder-cc my-mgt-15" v-for="(item,index) in pay" :key="index" @click="onPayWay(index)">
					<view class="my-flex-row-align-c">
						<image :src="item.img" class="icon-i" mode=""></image>
						<text class="my-mgl-8">{{item.txt}}</text>
					</view>
					<radio-group class="my-flex-row-align-c">
						<radio color="#f8c470" :checked="item.check" class="tr" />
					</radio-group>
				</view>

				<view class="my-flex-row-c my-mgt-50 box">
					<view class="btn my-flex-row-c my-font-20 my-cl-white my-bg-ye my-boxsha-2" @click="onPay">
						立即充值
					</view>
				</view>
			</view>
		</view>
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				select: null,
				topUp: ['100', '200', '500', '1000', '2000'],
				pay: [{
					img: '/static/my/tick.png',
					txt: '微信支付',
					check: true
				}, {
					img: '/static/my/card.png',
					txt: '银行卡支付',
					check: false
				}],
				isBusiness:false,
				money:100,
			}
		},
		onLoad(){
			this.isBusiness=uni.getStorageSync('openIdBindByBusiness')||false
		},
		components: {
			loading
		},
		mounted() {
			// this.open();
			// setTimeout(() => {
			// 	this.close();
			// }, 2000)
		},
		methods: {
			onNull(){
				this.select = null
			},
			onTopUp(e){
				this.select=e
				this.money=Number(this.topUp[e])
			},
			blurMoney(e){
				this.select=e
				this.money=Number(e.detail.value)
			},
			onPay() {
				if (this.pay[0].check === true&&this.isBusiness===false) {
					let params = {
						amount: this.money,
						orderType: "RECHARGE"
					}
					req.request('POST', params, '/proxy/pay/unified-order', '加载中', (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							let data = res.data.data
							uni.requestPayment({
								'timeStamp': "" + data.timeStamp,
								'nonceStr': data.nonceStr,
								'package': data.packageValue,
								'signType': data.signType,
								'paySign': data.paySign,
								success: (res) => {
									uni.showToast({
										title:"充值成功！请稍等！",
										icon:"none"
									})
								},
								fail: (res) => {
									console.log(res)
								}
							})
						}
					})
				}
			},
			onPayWay(e) {
				for (let i in this.pay) {
					this.pay[i].check = false
				}
				this.pay[e].check = true
			},
			close: function() {
				this.$refs.loading.close();
			},
			open: function() {
				this.$refs.loading.open();
			},
			callback() {
				// console.log("回掉");
			},
		}
	}
</script>

<style>
	.box {
		width: 750upx;
	}

	.rec {
		width: 15upx;
		height: 35upx;
	}

	.icon-i {
		width: 36upx;
		height: 36upx;
	}

	.box .box {
		width: 100%;
	}

	.topup-box {
		width: 180upx;
		height: 80upx;
	}

	.pay {
		width: 100%;
		height: 90upx;
		border-radius: 45upx;
	}

	.tr {
		transform: scale(0.9, 0.9);
	}

	.btn {
		width: 500upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.icon-2{
	  background: url(../../../static/my/choosed.jpg) no-repeat right bottom;
	  background-size: 44upx 44upx;
	 }
</style>
