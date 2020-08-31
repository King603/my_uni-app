<template>
	<view class="my-flex-col-c box">
		<view class="box my-pd-10 my-flex-row-b">
			<view class="my-flex-row-align-c my-cl-grey">
				<text class="my-cl-grey my-font-16">共{{agency.length}}个代理</text>
				<image src="/static/team/add.png" class="icon my-mgl-10" mode="" @click="addproxy"></image>
			</view>
			<!-- <view class="my-flex-row-align-c my-cl-grey">
				<text class="my-font-16">总收益：</text>
				<text class="my-font-18">22355.78</text>
				<text class="my-font-16">元</text>
			</view> -->
		</view>
		<agency :agency="agency" @selected='onEdit' @select='onSee'></agency>
		<goTop :top="top"></goTop>
	</view>
</template>

<script>
	import agency from '@/components/agency/agency.vue'
	import goTop from '@/components/goTop/goTop.vue'
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				top:false,
				agency:[]
			}
		},
		components: {
			agency,
			goTop
		},
		computed: {
	
		},
		onLoad() {
	
		},
		onShow() {
			this.getAgencyList()
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
			// 跳转新增代理
			addproxy(){
				uni.navigateTo({
					url:"/pages/home_page/agency/public"
				})
			},
			getAgencyList(){
				let params = {
					
				}
				req.request('GET', params, '/proxy/api/proxy/sub/list', '加载中', (res) => {
					if (res.statusCode === 200) {
						this.agency=res.data.data
					}
				})
			},
			onEdit(e){
				uni.navigateTo({
					url:'/pages/team/agency-edit/index?id='+this.agency[e].proxyId+"&&proxyName="+this.agency[e].proxyName
				})
			},
			onSee(e){
				// console.log(e,1)
				uni.navigateTo({
					url:'/pages/team/junior/junior?id='+this.agency[e].proxyId
				})
			}
		}
	}
</script>

<style>
	.box {
		width: 750upx;
	}

	.icon {
		width: 40upx;
		height: 40upx;
	}
	
</style>
