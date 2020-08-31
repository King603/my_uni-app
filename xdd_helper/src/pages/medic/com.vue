<template>
	<view>
		<merChant :mer="mer" @index="onSelect"></merChant>
		<goTop :top="top"></goTop>
		<!-- <QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="my-bg-white my-rds-10 my-flex-col-c my-pd-10 my-flex-warp show1 my-relative">
				<text>您所要铺设的商户</text>
				<text class="my-font-16 my-mgt-10">{{mer[index].mer}}</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-50" @click="onMedic('QSPopup')">
					一键铺设
				</view>
			</view>
		</QSPopup> -->
	</view>
</template>

<script>
	import merChant from '@/components/merchant/merchant.vue'
	import goTop from '@/components/goTop/goTop.vue'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import req from '@/util/req.js';
	export default {
		data() {
			return {
				top: false,
				// mer: [{
				// 	mer: '海蛎文创空间',
				// 	type: 0,
				// 	profit: '80.00',
				// 	address: '厦门市集美区区政府旁边海蛎文创空间',
				// 	earnings: '8888.66'
				// }],
				mer: [],
				index: 0,
				deviceIds: [],
				deviceType: "",
				mers:[]
			}
		},
		onLoad(options) {
			this.deviceType = options.deviceType
			this.deviceIds = options.deviceIds.split(',')
		},
		components: {
			goTop,
			merChant,
			QSPopup
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
			if (this.scrollTop > 0) {
				this.top = true
			} else {
				this.top = false
			}
		},

		onReady() {
			var data = {
				"pageIndex": 0,
				"pageSize": 30
			}
			req.request('POST', data, '/proxy/business/list', '加载中', (res) => {
				console.log("/proxy/business/list", res)
				if (res.statusCode === 200) {
					if (res.data.data.rows.length == 0) {
						uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
					} else {
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
						this.mers=res.data.data.rows;
					}
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				}
			})
		},

		methods: {
			onSelect(e) {
				this.index = e
				uni.navigateBack({
					delta:1
				})
				var pages = getCurrentPages(); 
				var prevPage = pages[pages.length - 2]; //上一个页面 
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去 
				prevPage.mydata=this.mers[e];
				console.log(this.index)
				// this.$refs['QSPopup'].show()
			}
		}
	}
</script>

<style>
	.show1 {
		width: 550upx;
		overflow: hidden;
	}

	.btn {
		width: 400upx;
		height: 60upx;
		border-radius: 30upx;
	}
</style>
