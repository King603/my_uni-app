<template>
	<view>
		<sudoku :iconTxt="iconTxt" :proxyId="proxyId" @selected='onEditSingle'></sudoku>
	</view>
	<!-- <QSPopup ref="QSPopup1" type="fadeScaleHeightToLowInMiddle">
		<view class="content my-bg-white my-rds-10 my-flex-col-c my-flex-warp show1 my-relative">
			<image src="/static/team/point.png" class="pic my-absolute" mode=""></image>
			<view class="btn"></view>
			<view class="btn"></view>
			<text style="z-index: 100;">你还未开通广告收益权限！</text>
			<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-50" @click="onDredge">
				立即开通
			</view>
		</view>
	</QSPopup>
	<QSPopup ref="QSPopup1" type="fadeScaleHeightToLowInMiddle">
		<view class="content my-bg-white my-rds-10 my-flex-col-c my-flex-warp show1 my-relative">
			<image src="/static/team/point.png" class="pic my-absolute" mode=""></image>
			<view class="btn"></view>
			<view class="btn"></view>
			<text style="z-index: 100;">你还未开通广告收益权限！</text>
			<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-50" @click="onDredge">
				立即开通
			</view>
		</view>
	</QSPopup> -->
</template>
<script>
	import sudoku from '@/components/sudoku/sudoku.vue'
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				proxyId: 0,
				proxyName:"",
				agency: [],
				iconTxt: [{
					icon: '/static/team/1.png',
					txt: '分配设备'
				}, 
				// {
				// 	icon: '/static/team/2.png',
				// 	txt: '收回设备'
				// }, 
				{
					icon: '/static/team/3.png',
					txt: '收益明细'
				}, 
				{
					icon: '/static/team/4.png',
					txt: '修改代理'
				}, 
				// {
				// 	icon: '/static/team/5.png',
				// 	txt: '广告权限'
				// }, 
				{
					icon: '/static/team/6.png',
					txt: '设备日志'
				}, 
				{
					icon: '/static/team/7.png',
					txt: '商户列表'
				}, 
				{
					icon: '/static/team/8.png',
					txt: '删除代理'
				}, 
				// {
				// 	icon: '/static/team/9.png',
				// 	txt: '提现规则'
				// },
				]
			}
		},
		components: {
			sudoku,
			
		},
		computed: {

		},
		onLoad(options) {
			this.proxyId = Number(options.id) || 0
			this.proxyName=options.proxyName
			// console.log(this.id)
		},
		methods: {
			
			onEditSingle(e) {
				// 分配设备
				if (e === 0) {
					uni.navigateTo({
						url: "/pages/team/edit/alone-dev?type=" + 0+"&&proxyId="+ this.proxyId
					})
				}
				// 收回设备
				// if (e === 1) {
				// 	uni.navigateTo({
				// 		url: "/pages/team/edit/alone-dev?type=" + 1
				// 	})
				// }
				// 收益明细
				if (e === 1) {
					uni.navigateTo({
						url: "/pages/team/edit/earnings?id=" + this.proxyId
					})
				}
				// 修改代理
				if (e === 2) {
					uni.navigateTo({
						url: "/pages/team/edit/amend-agency?id=" + this.proxyId
					})
				}
				// 广告权限
				// if (e === 4) {
				// 	uni.navigateTo({
				// 		url: "/pages/team/edit/adv-per"
				// 	})
				// }
				// 设备日志
				if(e===3){
					uni.navigateTo({
						url:"/pages/team/edit/log?id=" +this.proxyId
					})
				}
				// 商户列表
				if (e ===4) {
					uni.navigateTo({
						url: '/pages/team/edit/list?id='+this.proxyId+"&&proxyName="+this.proxyName,
					})
				}
				// 删除代理
				if (e === 5) {
					uni.showModal({
						title: '确认删除',
						content: '是否确认删除该代理？',
						cancelText: '否',
						confirmText: '是',
						success: res => {
							if (res.cancel) {
								// 用户点击了取消属性的按钮

							} else if (res.confirm) {
								// 用户点击了确定属性的按钮
								var params={
									subProxyId:this.proxyId
								}
								req.request('DELETE', params, '/proxy/api/proxy/sub/' + this.proxyId, '加载中',(res)=>{
									if(res.statusCode === 200){
										uni.showModal({
											title:"您已申请解除代理身份，在代理同意后您将解除和他的代理关系"
										})
									}else{
										uni.showToast({
											title:res.data.message,
											icon:"none"
										})
									}
								})
								this.edit=false;
								uni.navigateBack({
									delta:1,
									success:res=>{
										
									}
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				// 提现规则
				// if (e === 8) {
				// 	uni.navigateTo({
				// 		url: '/pages/team/edit/withdrawal-rules?id='+this.proxyId
				// 	})
				// }
			}
		}
	}
</script>

<style>
	.single-box {
		width: 240upx;
		height: 240upx;
	}

	.big-icon {
		width: 120upx;
		height: 120upx;
	}
</style>
