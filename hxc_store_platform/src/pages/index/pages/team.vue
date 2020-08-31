<template>
	<view class="box my-flex-col-c">
		<view class="my-bg-white box my-fixed-t" style="z-index: 999;">
			<uniStatusBar></uniStatusBar>
			<uniNav :title="title" v-if="isbusiness == false"></uniNav>
			<uniNav :title="title2" v-if="isbusiness == true"></uniNav>
		</view>

		<uniStatusBar></uniStatusBar>
		<uniNav></uniNav>

		<view class="my-mgt-50" v-if="isbusiness == false">
			<view class="box my-flex-col-c" v-for="(item, index) in tab" :key="index" @click="onTab(index)">
				<image :src="item.img" mode="aspectFill" class="pic my-mgt-30"></image>
				<text class="my-mgt-10">{{ item.txt }}</text>
			</view>
		</view>

		<view class="box box-bg" v-if="isbusiness == true">
			<view class="box my-bg-white my-font-12 pd">
				<view class="my-flex-row-b box">
					<view class="my-cl-black my-bold">代理名称：{{ proxyName }}</view>
					<view class="class-color">分润</view>
				</view>
				<view class="my-flex-row-b box class-mgt">
					<view class="my-cl-black my-bold">
						<text>设备类型：</text>
						<text class="text-mgl">{{ deviceModel }}</text>
					</view>
					<view class="class-color">{{ profitScale }}%</view>
				</view>
			</view>
			<view class="class-pdlr my-bg-white my-font-12 pd">
				<view class="my-flex-row-b" v-for="(item,index) in devicedata" :key='index'>
					<view class="my-flex-row-b class-width" style="flex:1;text-align: left;"><text>{{item.model}}{{item.deviceType}}</text></view>
					<text  style="flex:1;text-align: center;">{{item.deviceCount}}个</text>
					<view class="class-color"  style="flex:1;text-align: right;">{{item.unitPrice}}元/小时</view>
				</view>
				<!-- <view class="my-flex-row-b class-mgt">
					<view class="my-flex-row-b class-width">
						<text>H601充电宝</text>
						<text>X个</text>
					</view>
					<view class="class-color">超过2小时；1元/0.5小时</view>
				</view> -->
				<!-- X10 -->
				<!-- <view class="">
					<view class="my-flex-row-b class-mgt">
						<view class="my-flex-row-b class-width">
							<text>X10线充</text>
							<text>X个</text>
						</view>
						<view class="class-color">3元/1小时</view>
					</view>
					<view class="my-flex-row-b class-mgt">
						<view class=""></view>
						<view class="class-color">5元/2小时</view>
					</view>
					<view class="my-flex-row-b class-mgt">
						<view class=""></view>
						<view class="class-color">6元/3小时</view>
					</view>
					<view class="my-flex-row-b class-mgt">
						<view class=""></view>
						<view class="class-color">9元/5小时</view>
					</view>
					<view class="my-flex-row-b class-mgt">
						<view class=""></view>
						<view class="class-color">14元/8小时</view>
					</view>
					<view class="my-flex-row-b class-mgt">
						<view class=""></view>
						<view class="class-color">20元/12小时</view>
					</view>
				</view> -->
			</view>
			<view class="my-flex-row-b bootom-pdlr my-font-12 my-bg-white pd">
				<text>联系方式:{{ phone }}</text>
				<view class="my-flex-row-align-c">
					<view class="my-mgl-15 my-pdb-2 my-flex-row-align-c my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 class-color my-bder-ye" @click="onCall">
						<image src="/static/index/phone.png" class="icon" mode=""></image>
						<text class="my-mgl-5">呼叫</text>
					</view>
				</view>
			</view>
		</view>

		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()"><!-- <view class="test">自定义</view> --></loading>
	</view>
</template>

<script>
import loading from '@/components/xuan-loading/xuan-loading.vue';
import uniNav from '../../../components/uni-nav-bar/uni-nav-bar.vue';
import uniStatusBar from '../../../components/uni-status-bar/uni-status-bar.vue';
import req from '@/util/req.js';
export default {
	data() {
		return {
			deviceModel: null,
			proxyName: null,
			phone: null,
			noStandardProfit: null,
			noStandardProfitScale: null,
			profitScale: null,
			devicedata: null,
			isbusiness: null,
			title: '我的团队',
			title2: '代理信息',
			tab: [
				{
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/UmBkafcEbv_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.qgz544db6o0Fe13b7bf77d555d8c061a615ecfbc8ff1.png',
					txt: '我的代理'
				},
				{
					img:
						'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/tuNYhTlmGE_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.FGDZoeVPF2Nl3fdf50a8a3411864a1ebc8cf5c69fe2b.png',
					txt: '我的商户'
				}
			]
		};
	},
	components: {
		uniNav,
		uniStatusBar,
		loading
	},
	computed: {},
	onLoad() {},
	mounted() {
		this.isbusiness = uni.getStorageSync('openIdBindByBusiness');
		if (this.isbusiness === true) {
			// 获取商户的代理信息
			var params = {};
			req.request('GET', params, '/proxy/business/proxy/info', '加载中', res => {
				if (res.statusCode === 200) {
					console.log('代理信息数据', res.data.data.businessDeviceCountViews);
					this.deviceModel = res.data.data.deviceModel;
					this.proxyName = res.data.data.proxyName;
					this.phone = res.data.data.phone;
					this.noStandardProfit = res.data.data.noStandardProfit;
					this.noStandardProfitScale = res.data.data.noStandardProfitScale;
					this.profitScale = res.data.data.profitScale;
					this.devicedata = res.data.data.businessDeviceCountViews;
				}
			});
		}
	},
	methods: {
		onCall() {
			uni.makePhoneCall({
				phoneNumber: this.phone
			});
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
		onTab(e) {
			// console.log(e)
			if (e === 0) {
				uni.navigateTo({
					url: '/pages/team/agency/agency'
				});
			} else {
				uni.navigateTo({
					url: '/pages/team/com/com'
				});
			}
		}
	}
};
</script>

<style>
page {
	padding-bottom: 0;
}

.box {
	width: 100%;
}

.h {
	height: 100vh;
}

.pic {
	width: 214upx;
	height: 244upx;
}
.box-bg {
	background-color: #f2f2f2;
}
.class-color {
	color: #f3b249;
}

.class-pd {
	height: 104upx;
	padding: 19upx 32upx;
	margin-top: 7upx;
	border-bottom: 2upx solid #f2f2f2;
}
.pd {
	padding: 5upx 10upx 5upx 10upx;
}
.icon {
	width: 26upx;
	height: 26upx;
}
</style>
