<template>
	<view class="my-flex-col-c box">
		<view class="my-bg-white box my-fixed-t" style="z-index: 999;">
			<uniStatusBar></uniStatusBar>
			<uniNav :title="title"></uniNav>
		</view>
		<view class="my-bg-white box">
			<uniStatusBar></uniStatusBar>
			<uniNav></uniNav>
		</view>
		<mySwiper :swiper="swiper"></mySwiper>
		<fourOptions :textArray="textArray" v-if="isbusiness===false"></fourOptions>
		<fourOptions :textArray="textArray1" v-if="isbusiness===true"></fourOptions>
		<loading
		   ref="loading"
		   :custom="false"
		   :shadeClick="true"
		   :type="1"
		   @callback="callback()">
		        <!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import mySwiper from '../../../components/my-swiper/index.vue'
	import uniNav from "../../../components/uni-nav-bar/uni-nav-bar.vue";
	import uniStatusBar from "../../../components/uni-status-bar/uni-status-bar.vue"
	import fourOptions from "../../../components/four-options/index.vue"
	export default {
		data() {
			return {
				isbusiness:false,
				swiper: ['https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/LLIXiAaknx_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.RbsCyTuifsYhe1905b8537725ee1d93408e7cc8cc068.png',
					'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/LLIXiAaknx_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.RbsCyTuifsYhe1905b8537725ee1d93408e7cc8cc068.png'
				],
				title: '首页',
				textArray1: [{
					txt: '设备',
					single: [{
						icon: '/static/index/icon-11.png',
						txt: '设备在线',
						id: 1
					}, {
						icon: '/static/index/icon-12.png',
						txt: '设备离线',
						id: 2
					}, {
						icon: '/static/index/icon-13.png',
						txt: '超时借出',
						id: 3
					}, {
						icon: '/static/index/icon-34.png',
						txt: '设备报修',
						id: 4
					}]
				}],
				textArray: [{
					txt: '设备',
					single: [{
						icon: '/static/index/icon-11.png',
						txt: '设备在线',
						id: 1
					}, {
						icon: '/static/index/icon-12.png',
						txt: '设备离线',
						id: 2
					}, {
						icon: '/static/index/icon-13.png',
						txt: '超时借出',
						id: 3
					}, {
						icon: '/static/index/icon-14.png',
						txt: '全部设备',
						id: 4
					}]
				}, {
					txt: '管理',
					single: [{
						icon: '/static/index/icon-21.png',
						txt: '添加代理',
						id: 5
					}, {
						icon: '/static/index/icon-22.png',
						txt: '添加商户',
						id: 6
					}, {
						icon: '/static/index/icon-23.png',
						txt: '设备订购',
						id: 7
					}, {
						icon: '/static/index/icon-24.png',
						txt: '设备报修',
						id: 8
					}]
				}],
			}
		},
		components: {
			mySwiper,
			uniNav,
			uniStatusBar,
			fourOptions,
			loading
		},
		mounted() {
			this.isbusiness=uni.getStorageSync("openIdBindByBusiness");
		},
		computed: {

		},
		methods: {
			close:function(){
			    this.$refs.loading.close();
			},
			open:function(){
			    this.$refs.loading.open();
			},
			callback(){
			    // console.log("回掉");
			},
		}
	}
</script>

<style>
	.box {
		width: 100%;
	}

	.bottom-box {
		width: 690upx;
	}
</style>
