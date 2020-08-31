<template>
	<view class="my-flex-col-c box">
		<view class="box h my-flex-row-c my-bg-white" v-if="id===0">
			<view class="tabbar-item my-flex-row-c bder-l my-font-16" :class="ind===index?'my-cl-ye':'my-cl-grey'" v-for="(item,index) in tabbar"
			 :key="index" @click="onTabbar(index)">
				{{item}}({{earnings.length}})
			</view>
		</view>
		<merChant v-if="ind===0" :mer="mer" @index='onMerInfo'></merChant>
		<view @click="showMore1" style="height: 100rpx;line-height: 100rpx;" v-show="ind===0"><text>显示更多</text></view>
		<earnings v-if="ind===1&&info===false" :earnings="earnings" @index="onInfo"></earnings>
		<view @click="showMore2" style="height: 100rpx;line-height: 100rpx" v-show="ind===1&&info===false"><text>显示更多</text></view>
		<view class="my-flex-col-c my-pdlr-10 box" v-if="ind===1&&info===true">
			<view class="my-flex-row-b box my-pdtb-10 my-cl-grey">
				<text>{{earnings[select].mer}}</text>
				<view class="my-flex-row-align-c" @click="onReturn">
					<image src="/static/index/return.png" class="icon" mode=""></image>
					<text>返回上一级</text>
				</view>
			</view>
			<uniCalendar @changeDate="changeDate" class="my-bg-white" :mode="2" :businessIds="businessIds" :insert="true" :lunar="true" :select="select" :earning="earning" :datePrice="datePrice"
			 :howManyMonth="1"></uniCalendar>
			<view class="my-mgt-30 my-flex-row-c box">
				<view class="line my-bder-b"></view>
				<text class="my-mglr-15">按月份查看</text>
				<view class="line my-bder-b"></view>
			</view>
			<view class="my-mgt-15 my-flex-col box1">
				<text>1.此数据只代表此商户当前月份的营收数据。</text>
				<text class="my-mgt-5">2.日期下面显示的数据，为此商户当日的营收。</text>
				<text class="my-mgt-5">3.只能筛选查看一整个月的商户收益。</text>
			</view>
		</view>
		<goTop :top="top"></goTop>
	</view>
</template>

<script>
	import merChant from '@/components/merchant/merchant.vue'
	import goTop from '@/components/goTop/goTop.vue'
	import earnings from '@/components/merchant/earnings.vue'
	import uniCalendar from '@/components/njzz-calendar/njzz-calendar.vue'
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				curPageIndex1:0,
				curPageIndex2:0,
				curPageCount1:1,
				curPageCount2:1,
				curPageSize:30,
				curTotalCount1:0,
				curTotalCount2:0,
				top: false,
				info: false,
				select: 0,
				tabbar: ['商户列表', '商户收益明细'],
				id: 0,
				ind: 0,
				seeInfo: 0,
				mer: [],
				earnings: [],
				datePrice: [{
					date: '2019-12-01',
					price: '33.44'
				}, {
					date: '2019-12-02',
					price: '39.64'
				}, {
					date: '2019-12-03',
					price: '55.95'
				}, {
					date: '2019-12-04',
					price: '55.95'
				}, {
					date: '2019-12-05',
					price: '55.95'
				}, {
					date: '2019-12-06',
					price: '55.95'
				}],
				businessIds:[]
			}
		},
		components: {
			merChant,
			goTop,
			earnings,
			uniCalendar
		},
		computed: {

		},
		onLoad(options) {
			this.id = Number(options.id) || 0
			if (this.id === 1) {
				this.mer = []
				// uni.setNavigationBarTitle({
				//	title: '下级商户列表'
				//})
			}
		},
		onShow() {
			this.getBusinessList()
			this.getBusinessBillList()
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
			showMore1(){
				console.log('商户列表 下一页')
				if(this.curTotalCount1<this.curPageSize){
					uni.showToast({title:'没有更多数据了','icon':'none'})
					return;
				}
				if (this.curPageIndex1 + 1 <= this.curPageCount1)
				{
					this.curPageIndex1++
				}
				else {
					uni.showToast({ title: '没有更多数据了', icon: 'none' });
					return;
				}
				this.getBusinessList()
			},
			showMore2(){
				console.log('商户收益明细 下一页')
				if(this.curTotalCount2<this.curPageSize){
					uni.showToast({title:'没有更多数据了','icon':'none'})
					return;
				}
				if (this.curPageIndex2 + 1 <= this.curPageCount2)
				{
					this.curPageIndex2++
				}
				else {
					uni.showToast({ title: '没有更多数据了', icon: 'none' });
					return;
				}
				this.getBusinessBillList()
			},
			getBusinessBill() {
				//收益明细列表
				var myDate = new Date()
				var data = {}
				req.request('GET', data, '/proxy/business-bill/'+this.businessIds[this.select]+'?year='+ myDate.getFullYear()+'&&month=' + (myDate.getMonth() + 1), '加载中', (res) => {
					// console.log("/proxy/business-bill", res)
					if (res.statusCode === 200) {
						this.earning = res.data.data
						// console.log(this.earning)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			changeDate(e){
				console.log(e)
				this.pickerData=e
				var data = {
					
				}
				req.request('GET', data, '/proxy/business-bill/'+this.businessIds[this.select]+'?year='+ e.list[0][e.indexList[0]]+'&&month=' +e.list[1][e.indexList[1]], '加载中', (res) => {
					// console.log("/proxy/business-bill", res)
					if (res.statusCode === 200) {
						this.earning = res.data.data
						console.log(this.earning)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			getBusinessBillList() {
				var data = {
					"pageIndex": this.curPageIndex2,
					"pageSize": this.curPageSize
				}
				req.request('POST', data, '/proxy/business-bill/list', '加载中', (res) => {
					// console.log("/proxy/business-bill", res)
					if (res.statusCode === 200) {
						if (res.data.data.rows.length == 0) {
							this.curPageIndex2--;
							if(this.curPageIndex2<=0)this.curPageIndex2=0;
							uni.showToast({
								title: '暂无数据',
								icon: 'none'
							})
						}else{
						this.earnings = res.data.data.rows
						this.earnings.forEach(res=>{
							this.businessIds.push(res.business.id)
							// console.log(this.businessIds)
						})}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			getBusinessList() {
				//商户列表
				var data = {
					"pageIndex": this.curPageIndex1,
					"pageSize": this.curPageSize
				}
				req.request('POST', data, '/proxy/business/list', '加载中', (res) => {
					// console.log("/proxy/business/list", res)
					if (res.statusCode === 200) {						
						if (res.data.data.rows.length == 0) {
							this.curPageIndex1--;
							if(this.curPageIndex1<=0)this.curPageIndex1=0;
							uni.showToast({
								title: '暂无数据',
								icon: 'none'
							})
						} else {
							this.curTotalCount1 = res.data.data.total;
							this.curPageCount1 = parseInt((this.curTotalCount1 + this.curPageSize) / this.curPageSize); //算出总页数
							var arr = [];
							for (var i = 0; i < res.data.data.rows.length; i++)[
								arr.push({
									id: res.data.data.rows[i].id,
									mer: res.data.data.rows[i].businessName,
									type: res.data.data.rows[i].type,
									profitScale: res.data.data.rows[i].profitScale,
									address: res.data.data.rows[i].address,
									earnings: res.data.data.rows[i].profitScale
								})
							]
							this.mer = arr;
						}
					console.log('页索引 '+this.curPageIndex1+'总页数 '+this.curPageCount1+'总数量 '+this.curTotalCount1)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			onTabbar(e) {
				this.ind = e
				this.info = false
			},
			onInfo(e) {
				// console.log(e)
				this.info = true
				this.select = e
			},
			onReturn() {
				this.info = false
			},
			onMerInfo(e) {
				// console.log(e)
				if (this.id === 0) {
					uni.navigateTo({
						url: "/pages/team/com/info?id=" + this.mer[e].id
					})
				}
			}
		}
	}
</script>

<style>
	.box {
		width: 100%;
	}

	.h {
		height: 90upx;
	}

	.box1 {
		width: 540upx;
	}

	.icon {
		width: 40upx;
		height: 40upx;
	}

	.tabbar-item {
		width: 50%;
		height: 70upx;
	}

	.line {
		width: 200upx;
		height: 5upx;
	}
</style>
