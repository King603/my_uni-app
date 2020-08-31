<template>
	<view class="box my-flex-col-c">
		<!-- <view class="my-flex-row-b my-bg-white my-pd-10 box">
			<view class="my-bder-grey-light my-rds-10 input-box my-flex-row-c">
				<image src="/static/index/search-2.png" class="icon-i" mode=""></image>
				<input class="my-mgl-8" type="text" value="" placeholder="请输入你要搜索的内容" />
			</view>
			<view class="my-flex-row-c search my-font-14">搜索</view>
		</view> -->
		<order :order="order"></order>
		<goTop :top="top"></goTop>
	</view>
</template>

<script>
	import goTop from '@/components/goTop/goTop.vue'
	import order from '@/components/order/order.vue'
	export default {
		data() {
			return {
				top:false,
				id: 0,
				order: null
			}
		},
		components: {
			order,
			goTop
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
			if (this.scrollTop > 0) {
				this.top = true
			} else {
				this.top = false
			}
		},
		onLoad(options) {
			this.id = Number(options.id)
			var order=JSON.parse(options.order)
			var searchtype=options.searchtype;
			var isbusiness=uni.getStorageSync('openIdBindByBusiness');
			if(isbusiness==true){
				 if(searchtype=="businessorder"){
					 this.order=order;
				 }
				 if(searchtype=="businessdevice"){
					  this.order=order;
				 }
			}else{
				// 按设备搜索
				if(searchtype=='deviceNo'||searchtype=='businessName'){
					for (var i=0;i<order.length;i++) {
						order[i].types=12;
					}
					this.order=order;
				}
				if(searchtype=='deviceModel'||searchtype=='proxyName'){
					for (var i=0;i<order.length;i++) {
						order[i].types=13;
					}
					this.order=order;
				}
				
				// 按订单搜索
				if(searchtype=='businessName2'){
					for (var i=0;i<order.length;i++) {
						order[i].types=14;
					}
					this.order=order;
				}
				if(searchtype=='deviceNo2'){
					for (var i=0;i<order.length;i++) {
						order[i].types=15;
					}
					this.order=order;
				}
				if(searchtype=='orderNo2'){
					for (var i=0;i<order.length;i++) {
						order[i].types=16;
					}
					this.order=order;
				}
				if(searchtype=='proxyName2'){
					for (var i=0;i<order.length;i++) {
						order[i].types=17;
					}
					this.order=order;
				}
				if(searchtype=='time2'){
					for (var i=0;i<order.length;i++) {
						order[i].types=18;
					}
					this.order=order;
				}
			}
			
		},
		methods: {

		}
	}
</script>

<style>
	.box {
		width: 100%;
	}

	.input-box {
		width: 600upx;
		height: 60upx;
	}

	.icon-i {
		width: 50upx;
		height: 50upx;
	}
</style>
