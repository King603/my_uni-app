<template>
	<view class="">
	<!-- 代理端按设备搜索 -->
	<view class="my-flex-col-c box" v-if="type=='device'">
		<view class="my-mgt-10 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按设备编号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="devId" placeholder="请输入你要搜索的设备编号" @blur="onDevId" confirm-type="search" @confirm="onDevSearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box" v-if="!isBusiness">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按商户搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5" v-if="!isBusiness">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="com" placeholder="请输入你要搜索的商户名称" @blur="onCom" confirm-type="search" @confirm="onComSearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box" v-if="!isBusiness">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按代理搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5" v-if="!isBusiness">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="agency" placeholder="请输入你要搜索的代理名称" @blur="onAgency" confirm-type="search" @confirm="onAgencySearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box" v-if="isBusiness">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按时间搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="date-box my-flex-row-b my-mgt-10" v-if="isBusiness">
			<picker mode="date" @change="onBegin">
				<view class="date my-bder-cc my-flex-row-c my-rds-5">
					<image src="/static/index/date.png" mode="" class="icon-i"></image>
					<text class="my-mgl-10 my-cl-grey">{{beginDate}}</text>
				</view>
			</picker>
			<image class="icon" src="/static/index/link.png" mode=""></image>
			<picker mode="date" @change="onEnd">
				<view class="date my-bder-cc my-flex-row-c my-rds-5">
					<image src="/static/index/date.png" mode="" class="icon-i"></image>
					<text class="my-mgl-10 my-cl-grey">{{endDate}}</text>
				</view>
			</picker>
		</view>
		<view class="my-mgt-30 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按型号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="model" placeholder="请输入你要搜索的设备型号" @blur="onModel" confirm-type="search" @confirm="onModelSearch"/>
		</view>
		<view class="btn my-flex-row-c my-bg-ye my-mgt-30 my-boxsha-2" @click="onSearch('QSPopup')">
			<text class="my-cl-white my-font-18">一键搜索</text>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="content my-bg-white my-rds-10 my-pd-10 my-flex-col-c show1">
				<image src="/static/team/point.png" class="pic" mode=""></image>
				<text class="my-font-16 my-mgt-10">请输入搜索内容</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-10" @click="onOK('QSPopup')">
					好的
				</view>
			</view>
		</QSPopup>
	</view>
	
	<!-- 代理端按订单搜索 -->
	<view class="my-flex-col-c box"  v-if="type=='order'">
		<view class="my-mgt-10 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按设备编号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="orderdevid" placeholder="请输入你要搜索的设备编号" @blur="onorderdevid" confirm-type="search" @confirm="onDevSearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box" v-if="!isBusiness">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按订单编号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5" v-if="!isBusiness">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="ordernum" placeholder="请输入你要搜索的订单编号" @blur="onordernum" confirm-type="search" @confirm="onComSearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box" v-if="!isBusiness">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按代理搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5" v-if="!isBusiness">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="orderagency" placeholder="请输入你要搜索的代理名称" @blur="onorderagency" confirm-type="search" @confirm="onAgencySearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按商户搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="ordercom" placeholder="请输入你要搜索的商户名称" @blur="onordercom" confirm-type="search" @confirm="onModelSearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按时间搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="date-box my-flex-row-b my-mgt-10">
			<picker mode="date" @change="onBegin">
				<view class="date my-bder-cc my-flex-row-c my-rds-5">
					<image src="/static/index/date.png" mode="" class="icon-i"></image>
					<text class="my-mgl-10 my-cl-grey">{{beginDate}}</text>
				</view>
			</picker>
			<image class="icon" src="/static/index/link.png" mode=""></image>
			<picker mode="date" @change="onEnd">
				<view class="date my-bder-cc my-flex-row-c my-rds-5">
					<image src="/static/index/date.png" mode="" class="icon-i"></image>
					<text class="my-mgl-10 my-cl-grey">{{endDate}}</text>
				</view>
			</picker>
		</view>
		
		
		
		<!-- 一键搜索 -->
		<view class="btn my-flex-row-c my-bg-ye my-mgt-30 my-boxsha-2" @click="onSearch('QSPopup')">
			<text class="my-cl-white my-font-18">一键搜索</text>
		</view>
		<!-- 提示 -->
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="content my-bg-white my-rds-10 my-pd-10 my-flex-col-c show1">
				<image src="/static/team/point.png" class="pic" mode=""></image>
				<text class="my-font-16 my-mgt-10">请输入搜索内容</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-10" @click="onOK('QSPopup')">
					好的
				</view>
			</view>
		</QSPopup>
	</view>
	
	<!-- 商户端按订单搜索 -->
	<view class="my-flex-col-c box"  v-if="type=='businessorder'">
		<view class="my-mgt-10 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按设备编号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="orderdevid2" placeholder="请输入你要搜索的设备编号" @blur="onorderdevid2" confirm-type="search" @confirm="onDevSearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按订单编号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="ordernum2" placeholder="请输入你要搜索的订单编号" @blur="onordernum2" confirm-type="search" @confirm="onComSearch"/>
		</view>
		 
		<view class="my-mgt-30 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按时间搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="date-box my-flex-row-b my-mgt-10">
			<picker mode="date" @change="onBegin">
				<view class="date my-bder-cc my-flex-row-c my-rds-5">
					<image src="/static/index/date.png" mode="" class="icon-i"></image>
					<text class="my-mgl-10 my-cl-grey">{{beginDate}}</text>
				</view>
			</picker>
			<image class="icon" src="/static/index/link.png" mode=""></image>
			<picker mode="date" @change="onEnd">
				<view class="date my-bder-cc my-flex-row-c my-rds-5">
					<image src="/static/index/date.png" mode="" class="icon-i"></image>
					<text class="my-mgl-10 my-cl-grey">{{endDate}}</text>
				</view>
			</picker>
		</view>
		
		
		
		<!-- 一键搜索 -->
		<view class="btn my-flex-row-c my-bg-ye my-mgt-30 my-boxsha-2" @click="onSearch('QSPopup')">
			<text class="my-cl-white my-font-18">一键搜索</text>
		</view>
		<!-- 提示 -->
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="content my-bg-white my-rds-10 my-pd-10 my-flex-col-c show1">
				<image src="/static/team/point.png" class="pic" mode=""></image>
				<text class="my-font-16 my-mgt-10">请输入搜索内容</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-10" @click="onOK('QSPopup')">
					好的
				</view>
			</view>
		</QSPopup>
	</view>

    <!-- 商户端按设备搜索 -->
	<view class="my-flex-col-c box" v-if="type=='businessdevice'">
		<view class="my-mgt-10 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按设备编号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="devId2" placeholder="请输入你要搜索的设备编号" @blur="onDevId2" confirm-type="search" @confirm="onDevSearch"/>
		</view>
		<view class="my-mgt-30 my-flex-row-c box">
			<view class="my-bder-b-eb line"></view>
			<text class="my-mglr-25">按型号搜索</text>
			<view class="my-bder-b-eb line"></view>
		</view>
		<view class="search-box my-mgt-10 my-flex-row-c my-bder-cc my-rds-5">
			<image src="/static/index/search-1.png" class="icon" mode=""></image>
			<input class="search my-mgl-10" type="text" :value="model2" placeholder="请输入你要搜索的设备型号" @blur="onModel2" confirm-type="search" @confirm="onModelSearch"/>
		</view>
		<view class="btn my-flex-row-c my-bg-ye my-mgt-30 my-boxsha-2" @click="onSearch('QSPopup')">
			<text class="my-cl-white my-font-18">一键搜索</text>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="content my-bg-white my-rds-10 my-pd-10 my-flex-col-c show1">
				<image src="/static/team/point.png" class="pic" mode=""></image>
				<text class="my-font-16 my-mgt-10">请输入搜索内容</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-10" @click="onOK('QSPopup')">
					好的
				</view>
			</view>
		</QSPopup>
	</view>
</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				type:'device',
				beginDate:'开始时间',
				endDate:'结束时间',
				// 设备编号搜索
				devId:'',
				// 商户名
				com:'',
				// 代理
				agency:'',
				// 型号
				model:'',
				
				// 设备编号之订单
				orderdevid:'',
				// 订单编号
				ordernum:'',
				// 订单之代理
				orderagency:"",
				// 订单之商户
				ordercom:'',
				isBusiness:false,
				order:null,
				orderdevid2:'',
				ordernum2:'',
				model2:'',
				devId2:'',
			}
		},
		components: {
			QSPopup
		},
		onLoad(options) {
			this.isBusiness = uni.getStorageSync('openIdBindByBusiness') || false
			this.type=options.type;
			if(options.type=='order'){
				uni.setNavigationBarTitle({
					title:"搜索"
				})
			}
		},
		methods: {
			onOK(ref){
				this.$refs[ref].hide();
			},
			onSearch(ref){
				// 代理端搜索设备
				if(this.isBusiness===false && this.type==="device"){
					if(this.devId===''&&this.com===""&&this.agency===""&&this.model===""){
						this.$refs[ref].show();
					}else{
						let params = {
							pageIndex: 0,
							pageSize: 30,
							businessName:this.com,
							deviceNo:this.devId,
							proxyName:this.agency,
							deviceModel:this.model
						}
						var searchtype;
						if(this.com){
							searchtype='businessName';
						}else if(this.devId){
							searchtype='deviceNo'
						}else if(this.agency){
							searchtype='proxyName'
						}else if(this.model){
							searchtype='deviceModel'
						}
						console.log(searchtype);
						req.request('POST', params, '/proxy/proxy/device/query', '加载中', (res) => {
							// console.log(res)
							if (res.statusCode === 200) {
								this.order = res.data.data.rows
								uni.navigateTo({
									url:"/pages/home_page/search/result?order="+JSON.stringify(this.order)+"&&searchtype="+searchtype,
									success:()=> {
										this.model="",
										this.devId="",
										this.agency="",
										this.com=""
									}
								})
							}
						})
					}
				}else if(this.isBusiness===false && this.type==="order"){
					// 代理端搜索订单
					if(this.orderdevid===''&&this.ordernum===""&&this.orderagency===""&&this.ordercom===""&&this.beginDate=="开始时间"&&this.endDate=="结束时间"){
						this.$refs[ref].show();
					}else{
						var statime=this.beginDate;
						var endtime=this.endDate;
						if(this.beginDate=='开始时间'){
							statime='';
						}
						if(this.endDate=='结束时间'){
							endtime='';
						}
						let params = {
							pageIndex: 0,
							pageSize: 30,
							businessName:this.ordercom,
							deviceNo:this.orderdevid,
							orderNo:this.ordernum,
							proxyName:this.orderagency,
							endTime:endtime,
							startTime:statime,
						}
						var searchtype;
						if(this.ordercom){
							searchtype='businessName2';
						}else if(this.orderdevid){
							searchtype='deviceNo2'
						}else if(this.ordernum){
							searchtype='orderNo2'
						}else if(this.orderagency){
							searchtype='proxyName2'
						}else if(endtime&&statime){
							searchtype='time2'
						}
						console.log(searchtype)
						req.request('POST', params, '/proxy/proxy/order/query', '加载中', (res) => {
							if (res.statusCode === 200) {
								this.order = res.data.data.rows
								uni.navigateTo({
									url:"/pages/home_page/search/result?order="+JSON.stringify(this.order)+"&&searchtype="+searchtype,
									success:()=> {
										this.ordercom=''
										this.orderdevid=''
										this.ordernum=''
										this.orderagency=''
										this.beginDate='开始时间'
										this.endDate='结束时间'
									}
								})
							}
						})
					}
				}else if(this.isBusiness===true && this.type==="businessorder"){
					// 商户端按订单搜索
					if(this.orderdevid2===''&&this.ordernum2===""&&this.beginDate=="开始时间"&&this.endDate=="结束时间"){
						this.$refs[ref].show();
					}else{
						var statime=this.beginDate;
						var endtime=this.endDate;
						if(this.beginDate=='开始时间'){
							statime='';
						}
						if(this.endDate=='结束时间'){
							endtime='';
						}
						let params = {
							pageIndex: 0,
							pageSize: 30,
							endTime:endtime,
							startTime:statime,
							deviceNo:this.orderdevid2,
							orderNo:this.ordernum2,
						}
						console.log(996)
						console.log(params)
						req.request('POST', params, '/proxy/business/order/query', '加载中', (res) => {
							if (res.statusCode === 200) {
								var order = res.data.data.rows
								for (var i=0;i<order.length;i++) {
									order[i].types=20;
								}
								this.order=order;
								uni.navigateTo({
									url:"/pages/home_page/search/result?order="+JSON.stringify(this.order)+"&&searchtype=businessorder",
									success:()=> {
										this.orderdevid2=''
										this.ordernum2=''
										this.beginDate='开始时间'
										this.endDate='结束时间'
									}
								})
							}
						})
					}
				}else if(this.isBusiness===true && this.type==="businessdevice"){
					// 商户端按设备搜索
					if(this.model2===''&&this.devId2===""){
						this.$refs[ref].show();
					}else{
						let params = {
							pageIndex: 0,
							pageSize: 30,
							deviceModel:this.model2,
							deviceNo:this.devId2,
						}
						req.request('POST', params, '/proxy/business/device/query', '加载中', (res) => {
							if (res.statusCode === 200) {
								var order = res.data.data.rows
								for (var i=0;i<order.length;i++) {
									order[i].types=21;
								}
								this.order=order;
								uni.navigateTo({
									url:"/pages/home_page/search/result?order="+JSON.stringify(this.order)+"&&searchtype=businessdevice",
									success:()=> {
										this.devId2=''
										this.model2=''
									}
								})
							}
						})
					}
				}
			},
			onModel2(e){
				this.model2=e.detail.value
			},
			onDevId2(e){
				this.devId2=e.detail.value
			},
			onModel(e){
				this.model=e.detail.value
			},
			onAgency(e){
				this.agency=e.detail.value
			},
			onCom(e){
				this.com=e.detail.value
			},
			onDevId(e){
				this.devId=e.detail.value
			},
			// 订单按设备编号
			onorderdevid(e){
				this.orderdevid=e.detail.value
				console.log(e.detail.value)
			},
			// 订单按订单编号
			onordernum(e){
				this.ordernum=e.detail.value
				console.log(e.detail.value)
			},
			// 订单按代理搜索
			onorderagency(e){
				this.orderagency=e.detail.value
				console.log(e.detail.value)
			},
			// 订单按商户搜索
			onordercom(e){
				this.ordercom=e.detail.value;
				console.log(e.detail.value)
			},
			// 商户按设备编号
			onorderdevid2(e){
				this.orderdevid2=e.detail.value
				console.log(e.detail.value)
			},
			// 商户按订单编号
			onordernum2(e){
				this.ordernum2=e.detail.value
				console.log(e.detail.value)
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
				return `${year}-${month}-${day}`;
			},
			onBegin(e) {
				this.beginDate = e.target.value
				console.log('开始时间')
				console.log(e.target.value)
			},
			onEnd(e) {
				console.log('结束时间')
				this.endDate = e.target.value
				console.log(e.target.value)
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
		padding-bottom: 0;
	}

	.box {
		width: 750upx;
	}

	.line {
		width: 200upx;
		height: 5upx;
	}

	.search-box {
		width: 630upx;
		height: 60upx;
		background-color: #EEEEEE;
	}

	.date {
		width: 270upx;
		height: 50upx;
		background-color: #EEEEEE;
	}

	.date-box {
		width: 630upx;
		height: 60upx;
	}

	.icon {
		width: 50upx;
		height: 50upx;
	}

	.search {
		width: 350upx;
	}

	.icon-i {
		width: 40upx;
		height: 40upx;
	}
	
	.show1{
		width: 550upx;
		overflow: hidden;
	}
	.pic{
		width: 200upx;
		height: 200upx;
	}
	.btn{
		width: 400upx;
		height: 60upx;
		border-radius: 30upx;
	}
</style>
