<template>
	<view class="">
		<view class="">
			<index v-if="page_code=='index'"></index>
			<!-- <stat v-if="page_code=='stat'"></stat> -->
			<my v-if="page_code=='my'"></my>
			<team v-if="page_code=='team'"></team>
			<medic v-if="page_code=='medic'"></medic>
			<footerNav></footerNav>
			<!-- 代理端 -->
			<view class="my-flex-col-c box" v-if="isBusiness==false">
				<view class="my-bg-white box my-fixed-t" style="z-index: 999;">
					<uniStatusBar></uniStatusBar>
					<uniNav :title="title"></uniNav>
				</view>
				<view class="my-bg-white box">
					<uniStatusBar></uniStatusBar>
					<uniNav></uniNav>
				</view>
				<view class="my-pd-10 box my-flex-col-c">
					<view class="my-flex-col-c box">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="my-font-18">{{date}}</view>
						</picker>
					</view>
					<view class="box my-flex-row-c my-mgt-10 my-bder-ye my-rds-5">
						<view class="tabbar-item my-flex-row-c my-font-16 my-grow-1" :class="ind===index?'my-cl-white my-bg-ye':'my-cl-ye'"
						 v-for="(item,index) in tabbar" :key="index" @click="onTabbar(index)">
							{{item}}
						</view>
					</view>
					<view class="qiun-charts my-mgt-10">
						<!--#ifdef MP-ALIPAY -->
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
						 :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA"
						 @touchend="touchEndLineA" v-show="seeCanvas"></canvas>
						<!--#endif-->
						<!--#ifndef MP-ALIPAY -->
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
						 @touchmove="moveLineA" @touchend="touchEndLineA" v-show="seeCanvas"></canvas>
						<!--#endif-->
					</view>
					<view class="box my-flex-row-c my-mgt-10 my-bg-white bder-b my-pdlr-10">
						<view class="tabbar-i my-flex-row-c my-font-16 my-grow-1" v-for="(item,index) in tab" :key="index" @click="onTab(index)">
							<text class="lh" :class="select===index?'my-bder-b-ye':'my-cl-grey'">{{item}}</text>
						</view>
					</view>
					<view class="my-flex-row-c box my-bg-white">
						<view class="tabbar-i bder-l my-flex-row-c my-grow-1">
							<text>累计订单</text>
							<text class="my-cl-ye <my-mgl-1></my-mgl-1>0">{{ cumulOrder }}单</text>
						</view>
						<view class="tabbar-i  my-flex-row-c my-grow-1">
							<text>累计收益</text>
							<text class="my-cl-ye my-mgl-10">{{ accumCashier }}元</text>
						</view>
						<view class="my-grow-1">
							<view class="my-pdt-2 my-pdb-2 my-flex-row-c my-bder-cc my-rds-5 my-mgr-5 my-mgl-10" @click="onSearch">
								<image src="/static/index/search-1.png" class="icon-search" mode=""></image>
								<text>搜索</text>
							</view>
						</view>
					</view>
					<order :order='order' v-if="select==0"></order>
					<order :order='order' v-if="select==1"></order>
					<!--订单一级显示 -->
					<subi :junior="junior" v-if="select==2&&!see&&isBusiness===false" @selected="onSeeMore"></subi>
					<!-- 代理端待使用下级二级显示 -->
					<view class="box my-flex-row-b my-mgt-10 my-pdlr-10 my-cl" v-if="see">
						<text>所属下级：{{junior[selected].proxyName}}</text>
						<view class="my-flex-row-align-c" @click="onReturn">
							<image src="/static/index/return.png" class="icon" mode=""></image>
							<text class="my-mgl-8">返回上一级</text>
						</view>
					</view>
					<order :order="order" v-if="see"></order>
					<view @click="loadMore" v-if="select==0||select==1" >加载更多</view>
					<view @click="loadMore2" v-if="see" >加载更多</view>
				</view>
			</view>
			<!-- 商户端 -->
			<view class="my-flex-col-b box" v-if="isBusiness==true">
				<view class="my-bg-white box my-fixed-t" style="z-index: 999;">
					<uniStatusBar></uniStatusBar>
					<uniNav :title="title"></uniNav>
				</view>
				<view class="my-bg-white box">
					<uniStatusBar></uniStatusBar>
					<uniNav></uniNav>
				</view>
				<view class="box h my-flex-row-c bder-tb my-bg-white">
					<view class="tabbar-item my-flex-row-c bder-l my-font-15 my-bold" :class="select1===index?'my-cl-ye':'my-cl-grey'" v-for="(item,index) in Nav"
					 :key="item" @click="onNav(index)">
						{{item}}
					</view>
				</view>
				<statistics class="box" v-if="select1===0" :statistics="statistics" @index='onMerInfo'></statistics>
				<profit class="box" v-if="select1===1" :profit="profit" @index="onInfo"></profit>
			</view>
			<goTop :top="top" :topId="topId"></goTop>
			<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()"></loading>
		</view>
	</view>
</template>

<script>
	import profit from "@/components/statistics/profit.vue"
	import statistics from '@/components/statistics/statistics.vue';
	import uCharts from '@/components/u-charts/u-charts.js';
	import {isJSON} from '@/common/checker.js';
	import footerNav from "@/components/footer/footer_nav.vue";
	import uniNav from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar.vue";
	import order from '@/components/order/order.vue';
	import goTop from '@/components/goTop/goTop.vue';
	import loading from '@/components/xuan-loading/xuan-loading.vue';
	import req from '@/util/req.js';
	import subi from '../../../components/sub/sub.vue';
	var canvaLineA = null;

	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			//this.curPageCount = (totalCount+ pageSize-1) / pageSize;
			return {
				curPageIndex:0,
				curPageCount:1,
				curPageSize:30,
				
				curPageIndex2:0,
				curPageCount2:1,
				
				selected: 0,
				proxyName: null,
				id: 0,
				see:false,
				junior:[],
				profit:null,
				statistics:null,
				isBusiness:false,
				select1:0,
				Nav:['订单详情','收益明细'],
				top: false,
				topId: 1,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				title: '统计',
				date: currentDate,
				tabbar: ['日', '月', '年'],
				ind: 0,
				tab: ['今日订单', '全部订单', '下级订单'],
				select: 0,//选择面板序号tab面板
				order: [],
				seeCanvas: false,
				cumulOrder: 0, // 累计订单
				accumCashier: 0, // 累计收益
			}
		},
		components: {
			uniNav,
			uniStatusBar,
			order,
			goTop,
			loading,
			statistics,
			profit,
			subi,
		},
		computed: {

		},
		mounted() {
			this.isBusiness=uni.getStorageSync('openIdBindByBusiness')||false
			this.seeCanvas = true
			if(this.isBusiness===false){
				this.$nextTick(() => {
					this.getServerData();
				});
				//this.curPageIndex=0;
				//this.order=[];
				//this.getOrderList(0, this.curPageIndex, 30, 0, 'TODAY', 'DAY');
			}else{
				this.getOrderBusiness()
			}
			
			// 获取订单列表
			this.onTab(0)
		},
		onLoad(options) {
			if (options) {
				this.ind = Number(options.ind) || 0
			}
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: (res) => {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						this.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		onShow() {
			this.getServerData();
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
			if (this.scrollTop > 0) {
				this.top = true
			} else {
				this.top = false
			}
		},
		methods: {
			//今日订单 和全部订单更多页
			loadMore(){
				console.log('loadmore....')
				this.curPageIndex++;
				var loadMoreType = uni.getStorageSync("loadMoreType");
				this.getOrderList(0, this.curPageIndex, this.curPageSize, 0, loadMoreType, 'DAY');
			},
			loadMore2(){
				//代理商订单列表更多页
				this.curPageIndex2++;
				let params={
					pageIndex: this.curPageIndex2,
					pageSize: 30,
					proxyName: this.proxyName,
				    businessName: "",
					deviceNo: "",
					endTime: "",
					orderNo: '',
					startTime:""
				}
				req.request('POST', params, '/proxy/proxy/order/query', '加载中', (res) => {
					if (res.statusCode === 200) {
						if(res.data.data.rows.length>0){
						var arr2=res.data.data.rows;
						for(var i=0;i<arr2.length;i++){
							arr2[i].types=19;
						}
						arr2.forEach(item=>{
								this.order.push(item)
							})
						}else{
							this.curPageIndex2--;
							uni.showToast({title:'没有更多数据了',icon:'none'})
						}
					}
				})
			},
			onReturn() {
				this.see = false
			},			
			onSeeMore(e){
				//代理商订单列表 第一页
				this.see = true
				this.proxyName = this.junior[e].proxyName
				this.selected = e
				let params={
					pageIndex: 0,
					pageSize: 30,
					proxyName: this.proxyName,
				    businessName: "",
					deviceNo: "",
					endTime: "",
					orderNo: '',
					startTime:""
				}
				req.request('POST', params, '/proxy/proxy/order/query', '加载中', (res) => {
					if (res.statusCode === 200) {
						var arr2=res.data.data.rows;
						for(var i=0;i<arr2.length;i++){
							arr2[i].types=19;
						}
						this.order = arr2;
					}
				})
			},
			onNav(e){
				this.select1 = e
				this.info = false
			},
			
			onSearch(e) {
				// 代理端
				if(this.isBusiness===false){
					uni.navigateTo({
						url: "/pages/home_page/search/search_dev?type=order"
						// url: "/pages/home_page/search_order/search_order"
					})
				}
			},
			onTab(e) {
				this.select = e;
				if(this.isBusiness===false){
					if (e === 0) {						
						// 获取今天订单列表
						this.curPageIndex=0;
						this.order=[];
						this.getOrderList(0, this.curPageIndex, 30, 0, 'TODAY', 'DAY');
					}					
					if (e === 1) {
						// 获取全部订单列表
						this.curPageIndex=0;
						this.order=[];
						this.getOrderList(0, this.curPageIndex, 30, 0, 'ALL', 'DAY');
						}					
					if (e === 2) {
						// 获取下级订单
						this.getSuborder('ALL');
					}
				}else{
					this.getOrderBusiness()
				}
			},
			getOrderBusiness(){
				let params = {
					pageIndex: 0,
					pageSize: 30,
				}
				req.request('POST', params, '/proxy/business/order/count/query', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.statistics = res.data.data.rows
					}
				})
			},
			onTabbar(e) {
				this.seeCanvas = false
				this.ind = e
				this.open();
					// this.close();
					this.seeCanvas = true
					this.$nextTick(() => {
						this.getServerData();
					})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}年${month}月${day}日`;
			},
			getServerData() {				
				switch(this.ind) {
				    case 0:
						this.getPolyData(5, 0, 30, 0, "ALL", "DAY", "日");
				        break;
				    case 1:
				        this.getPolyData(5, 0, 30, 0, "ALL", "MONTH", "月");
				        break;
				    case 2:
				        this.getPolyData(5, 0, 30, 0, "ALL", "YEAR", "年");
				        break;
				} 
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					dataLabel: true,
					dataPointShape: true,
					dataPointShapeType: 'hollow',
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left'
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 8,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0) + '元'
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: 340,
					height: 210,
					extra: {
						line: {
							type: 'curve'
						}
					},
				});
			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.data + '元'
					}
				});
			},
			changeData() {
				if (isJSON(this.textarea)) {
					let newdata = JSON.parse(this.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
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
			
			// 获取折线图数据,收益曲线
			getPolyData(interval, pageIndex, pageSize, proxyId, queryType, timeType, state) {
				var obj = {
					interval: parseInt(interval), // 距离当前日期时长，与timeType配合使用1日，1月，1年
					pageIndex: parseInt(pageIndex),
					pageSize: parseInt(pageSize),
					proxyId: parseInt(proxyId),
					queryType: String(queryType), // 查询类型：TODAY(今天), ALL(全部)
					timeType: String(timeType), // 查询时间类型：DAY(日), MONTH(月), YEAR(年)
				}
				
				req.request('POST', obj, '/proxy/proxy/order/revenue/curve', '加载中', (res) => {
					// console.log("res", res)
					if (res.statusCode === 200) {
						let LineA = {
							categories: [],
							series: []
						}; //创建数组
						
						let results = res.data.data.curveResults;
						if(results.length == 0) {
							LineA.categories = ["今" + state]
							LineA.series = [{
								"name": "暂无数据",
								"data": [0],
								"color": "#f8c470"
							}];
						} else {
							LineA.categories = []
							LineA.series = [{
								"name": "交易额",
								"data": [],
								"color": "#f8c470"
							}];
						
							for(var i = 0; i < results.length; i++) {
								LineA.series[0].data.push(results[i].profit);
								LineA.categories.push(results[i].timeValue + state);
							}
							this.close();
						}
						
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories = LineA.categories;
						LineA.series = LineA.series;
						// _self.textarea = JSON.stringify(LineA);
						this.showLineA("canvasLineA", LineA);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			// 获取订单列表
			getOrderList(interval, pageIndex, pageSize, proxyId, queryType, timeType) {
				
				uni.setStorageSync("loadMoreType",queryType)
				
				var obj = {
					interval,
					pageIndex,
					pageSize,
					proxyId,
					queryType,
					timeType,
				}
				
				req.request('POST', obj, '/proxy/proxy/order/count/query', '加载中', (res) => {
					if (res.statusCode === 200) {
						var arr = res.data.data.rows;
						console.log("订单订单",res.data.data.rows)
						for(var i=0;i<arr.length;i++){
							arr[i].types=19;
						}
						console.log('arr:')
						console.log(arr);
						console.log(arr.length);
						if(arr.length>0){							
							arr.forEach(item=>{
								this.order.push(item)
							})
						}else{
							this.curPageIndex--;
							uni.showToast({
								title: '没有更多数据了',
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
					this.close()
				})
				
				req.request('POST', obj, '/proxy/proxy/order/count', '加载中', (res) => {
					console.log("/proxy/proxy/order/count", res)
					if (res.statusCode === 200) {
						this.cumulOrder = res.data.data.orderCount; // 累计订单
						this.accumCashier = res.data.data.countProfit; // 累计收益
						this.curPageCount = parseInt((this.cumulOrder + pageSize-1) / pageSize)+1;//算出总页数
						//if(this.curPageIndex>0)
						//this.curPageIndex--;
						console.log('页索引：'+ this.curPageIndex +'总页数：'+this.curPageCount +'页大小：'+pageSize+ '总数：'+this.cumulOrder);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			
			// 获取下级订单概览
			getSuborder( queryType) {
				let pageIndex = 0;
				let pageSize = 1000;
				var obj = {
					pageIndex,
					pageSize,
					queryType, //	查询类型：TODAY(今天), ALL(全部)
				}
				//各级订单统计数据
				req.request('POST', obj, '/proxy/proxy/sub/order/count', '加载中', (res) => {
					console.log('/proxy/proxy/sub/order/count',res);
					if (res.statusCode === 200) {						
					  this.junior=res.data.data.rows;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
					this.close()
				})
				
				var data = {
					interval: 5,
					pageIndex: 0,
					pageSize: 1000,
					proxyId: 0,
					queryType: 'ALL',
					timeType: 'DAY',
				}
				//下级订单量总和 总金额
				req.request('POST', data, '/proxy/proxy/order/count', '加载中', (res) => {
					console.log("/proxy/proxy/order/count", res)
					if (res.statusCode === 200) {
						this.cumulOrder = res.data.data.orderCount; // 累计订单
						this.accumCashier = res.data.data.countProfit; // 累计收益
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			}
		},
		
		onReachBottom() {
			console.log("loading111111111")
		},
		onReachBottom: function () {
			console.log("loading222222222")
		}
		
	}
</script>

<style>
	page {
		padding-bottom: 200upx;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 710upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 710upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.box {
		width: 100%;
	}

	.bder-l:nth-child(2) {
		border-left: 2upx solid #DDDDDD;
	}

	.tabbar-item {
		height: 60upx;
	}

	.tabbar-i {
		height: 80upx;
	}

	.bder-b {
		border-bottom: 2upx solid #DDDDDD;
	}

	.icon-search {
		width: 40upx;
		height: 40upx;
	}

	.lh {
		line-height: 60upx;
	}
	
	.tabbar-item {
		width: 50%;
		height: 60upx;
	}
	
	.bder-tb {
		border-bottom: 2upx solid #DDDDDD;
		border-top: 2upx solid #DDDDDD;
	}
	
	.bg {
		background-color: rgba(243, 178, 73, 0.3);
		height: 28upx;
		width: 75upx;
	}
	
	.my-pd{
		padding: 0 33upx ;
	}
	
	.box-btn{
		height: 62upx;
	}
	
	.h-hei{
		height: 66upx;
	}
	
	.class-sea{
		height: 42upx;
		width: 565upx;
		background-color: #F5F5F5;
		border-radius: 10upx;
	}
	.my-cl {
		color: #c3c3c3;
	}
	.icon {
		width: 40upx;
		height: 40upx;
	}
</style>
