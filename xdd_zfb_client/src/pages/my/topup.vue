<template>
	<view class="box my-font-16">
		<view class="my-mgt-10 my-bg-white my-pdt-10 my-pdb-10 my-pdr-25 my-pdl-25 my-pdr-5 box my-flex-row-b">
			<view class="my-flex-row-align-c">
				<view class="rec my-bg-ye"></view>
				<text class="my-mgl-8">我的余额</text>
			</view>
			<view class="my-flex-row-align-c">
				<image class="icon-i" src="/static/my/gold.png" mode=""></image>
				<text class="my-cl-ye my-mgl-8">30元</text>
			</view>
		</view>
		<view class="my-mgt-10 my-bg-white my-flex-col" style="padding: 32upx 10upx;">
			<view class="my-pdlr-20 my-flex-col">
				<view class="my-flex-row-align-c">
					<view class="rec my-bg-ye"></view>
					<text class="my-mgl-8">充值金额</text>
				</view>
				<view class="my-cl-ye my-flex-row-b my-flex-warp box">
					<view class="topup-box my-flex-row-c my-mgt-15 my-rds-5 my-font-20" :class="select===index?'my-bder-ye icon-2':'my-bder-cc'" v-for="(item,index) in topUp" :key="index" @click="ontopUp(index)">
						<text>{{item}}元</text>
					</view>
					<view class="topup-box my-flex-row-c my-mgt-15 my-rds-5 my-bder-cc my-font-17" @click="onYin">
						<input type="digit" value="" placeholder="其他金额"  placeholder-class="my-cl-ye " style="width: 134upx; text-align: center;"/>
					</view>
				</view>
			</view>
		</view>
		<view class="my-mgt-10 my-bg-white my-flex-col my-pdt-15 my-pdb-30">
			<view class="my-pdlr-25 my-flex-col">
				<view class="my-flex-row-align-c">
					<view class="rec my-bg-ye"></view>
					<text class="my-mgl-8">支付方式</text>
				</view>
				<view class="pay my-pdlr-20 my-flex-row-b  my-mgt-15" :class="item.state?'my-bder-F4':'my-bder-cc'" v-for="(item,index) in pay" :key="index" @click="onPay(index)">
					<view class="my-flex-row-align-c">
						<image :src="item.img" class="icon" style="width: 60upx;height: 60upx;" mode="aspectFit"></image>
						<text class="my-mgl-8">{{item.txt}}</text>
					</view>
					<radio-group class="my-flex-row-align-c">
						<radio color="#f8c470" :checked="item.check" class="tr" />
					</radio-group>
				</view>
				
				<view class="my-flex-row-c my-mgt-50 my-mgb-36 box">
					<view class="btn my-flex-row-c my-font-20 my-cl-white my-bg-ye my-boxsha-2">
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
	export default{
		data(){
			return{
				select:null,
				topUp:['10','20','30','40','50'],
				pay:[{
					img:'/static/my/tick.png',
					txt:'微信支付',
					check:true,
					state:true,
				},
				// {
				// 	img:'/static/my/card.png',
				// 	txt:'支付宝支付',
				// 	check:false,
				// 	state:false,
				// },
				]
			}
		},
		components: {
			loading
		},
		mounted() {
			this.open();
			setTimeout(() => {
				this.close();
			}, 2000)
		},
		methods:{
			onPay(e){
				for (let i in this.pay) {
					this.pay[i].check=false
					this.pay[i].state=false
				}
				this.pay[e].check=true
				this.pay[e].state=true
			},
			ontopUp(e){
				this.select = e
			},
			onYin(){
				this.select = null
				// console.log('ww')
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
	.box{
		width: 750upx;
	}
	.rec{
		width: 15upx;
		height: 35upx;
	}
	.icon-i{
		width: 36upx;
		height: 36upx;
	}
	.box .box{
		width: 100%;
	}
	.topup-box{
		width: 180upx;
		height: 80upx;
		position: relative;
	}
	.pay{
		width: 100%;
		height: 90upx;
		border-radius: 45upx;
	}
	.tr{
		transform: scale(0.9,0.9);
	}
	.btn{
		width: 500upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.icon-2{
		background: url(../../static/hch-position/17.png) no-repeat right bottom;
		background-size: 44upx 44upx;
	}
</style>
