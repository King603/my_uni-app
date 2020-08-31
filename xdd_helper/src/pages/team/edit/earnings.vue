<template>
	<view class="box my-pd-10 my-flex-col-c">
		<view class="my-flex-row-b box">
			<text class="my-font-16 my-cl-grey">本月收益：{{profitAmountForMonth}}元</text>
			<view class="search-box my-flex-row-c my-bder-cc my-rds-5" @click="onSearch">
				<image src="/static/index/search-2.png" mode="" class="icon-i"></image>
				<text class="my-mgl-8 my-cl-grey">搜索</text>
			</view>
		</view>
		<earnings :earnings="earnings"></earnings>
		<view @click="showMore"><text>显示更多</text></view>
		<goTop :top="top"></goTop>
	</view>
</template>

<script>
	import earnings from "@/components/earnings/earnings"
	import goTop from '@/components/goTop/goTop.vue'
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				curPageIndex:0,
				curPageCount:1,
				curTotalCount:0,
				curPageSize:30,
				detailList:[],
				top: false,
				proxyId: 0,
				profitAmountForMonth:0,
				agency: [{
					agency: '龚勤',
					mobile: '13860655661',
					base: '6',
					number: 24,
					baseMedic: '6',
					line: '60',
					lineMedic: '50',
					junior: '3',
					earnings: '2245.66',
					month: '256.78',
					H60: 70,
					X10: 80,
					switch: true,
					eMail: '暂无邮箱'
				}, {
					agency: '吴群',
					mobile: '18854655678',
					base: '6',
					number: 24,
					baseMedic: '6',
					line: '60',
					lineMedic: '50',
					junior: '0',
					earnings: '245.66',
					month: '233.99',
					H60: 60,
					X10: 70,
					switch: false,
					eMail: 'ed0a555@163.com'
				}, {
					agency: '罗真雨',
					mobile: '15288876765',
					base: '6',
					number: 24,
					baseMedic: '6',
					line: '60',
					lineMedic: '50',
					junior: '4',
					earnings: '6245.33',
					month: '2343.10',
					H60: 80,
					X10: 80,
					switch: false,
					eMail: '暂无邮箱'
				}, {
					agency: '卢振飞',
					mobile: '18434655661',
					base: '6',
					number: 24,
					baseMedic: '6',
					line: '60',
					lineMedic: '50',
					junior: '2',
					earnings: '4215.26',
					month: '1223.23',
					H60: 90,
					X10: 60,
					switch: false,
					eMail: '1000555@qq.com'
				}],
				earnings: [{
					devId: 'SN:H603342346',
					model: 'H60',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 26.88
				}, {
					devId: 'SN:X103342346',
					model: 'X10',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 16.88
				}, {
					devId: 'SN:H603342346',
					model: 'H60',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 26.88
				}, {
					devId: 'SN:H603342346',
					model: 'H60',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 26.88
				}, {
					devId: 'SN:H603342346',
					model: 'H60',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 26.88
				}, {
					devId: 'SN:H603342346',
					model: 'H60',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 26.88
				}, {
					devId: 'SN:X103342346',
					model: 'X10',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 16.88
				}, {
					devId: 'SN:H603342346',
					model: 'H60',
					merchant: '华来德',
					time: '2019-12-19 18:52:53',
					earnings: 26.88
				}]
			}
		},
		components: {
			earnings,
			goTop
		},
		computed: {

		},
		onLoad(options) {
			this.proxyId = Number(options.id) || 0
			
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
			if (this.scrollTop > 0) {
				this.top = true
			} else {
				this.top = false
			}
		},
		onShow() {
			this.earnings = this.detailList;
			this.getBills()
		},
		methods: {
			showMore(){
				console.log('收益明细 下一页')
				if(this.curTotalCount<this.curPageSize){
					uni.showToast({
						title:'没有更多数据了','icon':'none'
					})
					return;
				}
				if (this.curPageIndex + 1 <= this.curPageCount)
				{
					this.curPageIndex++
				}
				else {
					uni.showToast({ title: '没有更多数据了', icon: 'none' });
					return;
				}
				this.getBills()
			},
			getBills(){
				let params = {
					"pageIndex": this.curPageIndex,
					"pageSize": this.curPageSize
				}
				console.log('收益明细数据')
				console.log(params)
				req.request('POST', params, '/proxy/api/proxy/sub/'+this.proxyId+'/bills', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.curTotalCount = res.data.data.total;
						this.curPageCount = parseInt((this.curTotalCount + this.curPageSize) / this.curPageSize); //算出总页数
						//this.earnings=res.data.data.rows,
						var list = res.data.data.rows;
						if(list.length>0){
							list.forEach(item => {
								this.detailList.push(item);
							});
							this.earnings = this.detailList;
						}else{
						this.curPageIndex--;
						uni.showToast({title: '没有更多数据了',	icon: 'none'});
					}
						this.profitAmountForMonth=res.data.profitAmountForMonth
					}
				})
			},
			onSearch() {
				uni.navigateTo({
					url: '/pages/home_page/search/search_dev'
				});
			}
		}
	}
</script>

<style>
	.box {
		width: 100%;
	}

	.search-box {
		width: 150upx;
		height: 50upx;
	}

	.icon-i {
		width: 50upx;
		height: 50upx;
	}
</style>
