<template>
	<view>
		<view class="box my-flex-col-c" >
			<view class="box h my-flex-row-c bder-tb my-bg-white" >
				<view class="tabbar-item my-flex-row-c bder-l my-font-16" :class="ind===index?'my-cl-ye':'my-cl-grey'" v-for="(item,index) in tabbar"
				 :key="index" @click="onTabbar(index)">
					{{item}}
				</view>
			</view>
			<order :order="order" v-if="ind===0"></order>
			<subi :junior="todayorder" v-if="ind===1"></subi>
		</view>
	</view>
</template>

<script>
	import order from '@/components/order/order.vue'
	import subi from '@/components/sub/sub.vue'
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				seeDev: false,
				USB: 0,
				selected: null,
				see: false,
				tabbar: ['今日订单', '全部订单'],
				ind: 0,
				select: 0,
				todayorder:[],
				order: [{
					orderId: '16787645',
					state: 0,
					model: 'X10',
					sub: '',
					dev_id: 'X235567789091',
					merchant: '华德莱餐厅',
					address: '福建省厦门市集美区海蛎文创空间旁边',
					start_time: '2019-12-13 12:31:31',
					contact: '13625611111'
				}, {
					orderId: '23566885',
					state: 0,
					model: 'H60',
					sub: '',
					dev_id: 'H325512789751',
					merchant: '华德莱餐厅',
					address: '福建省厦门市集美区海蛎文创空间旁边',
					start_time: '2019-12-13 10:23:11',
					contact: '18255611111'
				}],
				todayorder: [{
					proxyName: '罗真雨',
					proxyPhone: '13645623556',
					model: ['X10', 'H60'],
					state: 0,
					orderCount: 50
				}, {
					proxyName: '卢振飞',
					proxyPhone: '18258811231',
					model: ['H60'],
					state: 0,
					orderCount: 30
				}]
			}
		},
		components: {
			order,
			subi,
		},
		methods:{
			onTabbar(index){
				this.ind=index;
			},
			// // 下级全部订单
			getSuborder(pageIndex, pageSize, queryType) {
				var obj = {
					pageIndex,
					pageSize,
					queryType, //	查询类型：TODAY(今天), ALL(全部)
				}
				var that=this;
				req.request('POST', obj, '/proxy/proxy/sub/order/count', '加载中', (res) => {
					console.log("/proxy/proxy/sub/order/count", res)
					if (res.statusCode === 200) {
			            if(obj.queryType=="ALL"){
							console.log("下级全部订单",res.data.data)
							that.order = res.data.data.rows;
						}else if(obj.queryType=="TODAY"){
							console.log("下级今日订单",res.data.data)
							that.todayorder = res.data.data.rows;
						}
						
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
		},
		onLoad() {
			// 获取下级全部订单
			// this.getSuborder(0, 30, 'ALL');
			// 获取下级今日订单
			// this.getSuborder(0, 30, 'TODAY'); 
		}
			}
</script>

<style>
	.box {
		width: 100%;
	}
	
	.search-box {
		width: 590upx;
	}
	
	.h {
		height: 90upx;
	}
	
	.tabbar-item {
		width: 50%;
		height: 70upx;
	}
	
	.bder-tb {
		border-bottom: 2upx solid #DDDDDD;
		border-top: 2upx solid #DDDDDD;
	}
	
	.bder-b {
		border-bottom: 2upx solid #DDDDDD;
	}
	
	.bder-l:nth-child(2) {
		border-left: 2upx solid #DDDDDD;
	}
	
	.bder-l1 {
		border-left: 2upx solid #DDDDDD;
	}
	
	
	.h1 {
		height: 80upx;
	}
	
	.h2 {
		height: 50upx;
	}
	
	.h3 {
		height: 0;
	}
	
	.tab-item {
		width: 240upx;
	}
	
	.bder-l-dd {
		border-left: 2upx solid #DDDDDD;
	}
	
	.icon {
		width: 40upx;
		height: 40upx;
	}
	
	.top {
		opacity: 1;
		transition: all 3s;
	}
	
	.my-cl {
		color: #c3c3c3;
	}
	
	.bg-f5 {
		background-color: #f5f5f5;
	}
	
	.tra {
		opacity: 0;
		transition: all 3s;
	}
	
	.icon-img {
		width: 80upx;
		height: 80upx;
	}
	
	.h4 {
		height: 150upx;
	}
</style>
