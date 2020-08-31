<template>
	<view>
		<view class="QS-tabs-box">
			<!-- <QSTabs 
			ref="tabs" 
			:tabs="tabs"
			animationMode="line1" 
			:current="current" 
			@change="change" :duration="0.5"
			backgroundColor="#FFFFFF" activeColor="#F3B249"
			lineColor="#f1505c"
			swiperWidth="750">
			</QSTabs> -->
		</view>
		<view class="my-flex-row-c my-cl-grey" v-if="!orderList">
			暂无订单记录
		</view>
		<!-- <order id="order" :order="order"></order> -->
		<swiper v-else
			:style="{height:hieghtS+'px'}" 
			:current="swiperCurrent" 
			@transition="transition"
			@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<scroll-view scroll-y style="height: 100%;width: 100%;" >
						<order id="order" :order="order"></order>
					</scroll-view>
				</swiper-item>
		</swiper>
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	import order from '@/components/order/order.vue'
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import req from '@/util/req.js'
	const Sys = uni.getSystemInfoSync();
	const wH = Sys.windowHeight;
	let n = 1;
	const tabs =['全部订单'];
	export default {
		components: {
			QSTabs,order,loading
		},
		
		onShow() {
			uni.getSystemInfo({
				//获取手机信息
					success: res => {
						// res一各种参数
						console.log(res); //手机各种参数
						// let height = Number(this.hieghtS)
						this.hieghtS = res.windowHeight; //设置父元素高度home swiper不会自适应高度 需要设置固定高度 结合下边样式flex布局 header_ box footer 高度自适应动态设置swiper高度
						// let info = uni.createSelectorQuery().select('.swiper'); //获取某个元素的信息
						// info.boundingClientRect(data => {
						// //data一各种参数
						// console.log(data); //获取元素宽度
						// this.hieghtS = data.height;
						// console.log(this.hieghtS,'213');
						// }).exec();
				}
			});
			console.log(this.hieghtS)
		},
		// onShow() {
		// 	const query = wx.createSelectorQuery();
		// 	query.select('#swiper').boundingClientRect(function (res){
		// 	  console.log(res);
		// 	  this.height=this.windowHeight-this.statusBarHeight-this.navigationBarHeight
		// 	}).exec();
		// 	uni.getSystemInfo({
		// 	    success: function (res) {
		// 	        console.log(res.model);
		// 	        console.log(res.pixelRatio);
		// 	        console.log(res.windowWidth);
		// 	        console.log(res.windowHeight);
		// 	        console.log(res.language);
		// 	        console.log(res.version);
		// 	        console.log(res.platform);
		// 			console.log(res.screenHeight);
		// 	    },
				
		// 	});
		// 	this.height=this.windowHeight-this.statusBarHeight-this.navigationBarHeight
		// },
		data() {
			return {
				hieghtS:'',
				tabs:[...tabs],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				order: [{
					orderId: 'H602019010613184',
					state: 0,
					model: 'X10',
					sub: '',
					dev_id: 'SN: H601911302352',
					merchant: '华德莱餐厅',
					address: '福建省厦门市集美区海蛎文创空间旁边',
					start_time: '2019-12-13 12:31:31',
					cost:'6.00'
				}, {
					orderId: 'H602019010613184',
					state: 1,
					model: 'H60',
					sub: '',
					dev_id: 'SN: H601911302352',
					merchant: '华德莱餐厅',
					address: '福建省厦门市集美区海蛎文创空间旁边',
					start_time: '4h',
					cost:'6.00'
				},{
					orderId: 'H602019010613184',
					state: 1,
					model: 'X10',
					sub: '',
					dev_id: 'SN: H601911302352',
					merchant: '华德莱餐厅',
					address: '福建省厦门市集美区海蛎文创空间旁边',
					start_time: '4h',
					cost:'6.00'
				}, {
					orderId: 'H602019010613184',
					state: 1,
					model: 'H60',
					sub: '',
					dev_id: 'SN: H601911302352',
					merchant: '华德莱餐厅',
					address: '福建省厦门市集美区海蛎文创空间旁边',
					start_time: '4h',
					cost:'6.00'
				}],
				orderList:false
			}
		},
		mounted() {
			this.getHistory()
			this.open();
			setTimeout(() => {
				this.close();
			}, 2000)
		},
		methods: {
			 getElementHeight(element) {
			                setTimeout(()=>{
			                    let query = uni.createSelectorQuery().in(this);
			                    query.select(element).boundingClientRect();
			                    query.exec((res) => {
			                        if (!res) {//如果没获取到，再调一次
			                            this.getElementHeight();
			                        }else {
			                            this.swiperHeight = res[0].height;
			                        }
			                    })
			                },20)
						},
			getHistory(){
				let params = {
					pageIndex:0,
					pageSize:30
				}
				req.request('POST', params, '/user/user/order/history', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.order=res.data.data.rows
						if(this.order.length>0){
							this.orderList=true
						}
					}
				})
			},
			change(index) {
				this.swiperCurrent = index;
				if(index===0){
					this.order= [{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					}, {
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					},{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					}, {
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					}]
				}
				if(index===1){
					this.order= [{
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					},{
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					}]
				}
				if(index===2){
					this.order= [{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					},{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					}]
				}
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: { current }}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				if(current===0){
					this.order= [{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					}, {
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					},{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					}, {
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					}]
				}
				if(current===1){
					this.order= [{
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					},{
						orderId: '23566885',
						state: 1,
						model: 'H60',
						sub: '',
						dev_id: 'H325512789751',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 10:23:11',
						cost:'6.00'
					}]
				}
				if(current===2){
					this.order= [{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					},{
						orderId: '16787645',
						state: 1,
						model: 'X10',
						sub: '',
						dev_id: 'X235567789091',
						merchant: '华德莱餐厅',
						address: '福建省厦门市集美区海蛎文创空间旁边',
						start_time: '2019-12-13 12:31:31',
						cost:'6.00'
					}]
				}
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

<style scoped>
	page{
		padding-bottom: 40upx;
	}
	.QS-tabs-box{
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: white;
	}
	.scroll-items{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 40rpx;
	}
	.scroll-item{
		margin-top: 15rpx;
		padding: 25rpx;
		background-color: white;
		border-radius: 8rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		border: 1px solid #f8f8f8;
	}
	.scroll-item-image-box{
		flex-grow: 0;
	}
	.scroll-item-text-box{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: bold;
		margin-left: 15rpx;
	}
	.scroll-item-image{
		border-radius: 4rpx;
		width: 180rpx;
		height: 150rpx;
	}
	
</style>
