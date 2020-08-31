<template>
	<view>
		<view>
			<view class="btn-box">
				<view @click="btnAdd" class="btn-add"><text>加入白名单</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import req from '@/util/req.js'
	export default {
		onLoad(options){
			//https://user.haoxiangchong.com/user/addWhiteList?op=addWhiteList&whiteId=1
			//pages/index/addWhiteList?op=addWhiteList&whiteId=1
			this.whiteId=options.whiteId;
		},
		data() {
			return {
				whiteId:0
			}
		},
		methods: {
			btnAdd(){
				let params = {whiteId:this.whiteId}
				req.request('POST', params, '/user/user/white/join', '加载中', (res) => {
					console.log(res)
					if (res.statusCode === 200) {
						if(res.data.message=='success'){
							uni.reLaunch({
								url:'/pages/index/index',
								success: () => {
									uni.showToast({title:'加入成功',icon:'none'});
								}
							})
						}else{
							uni.reLaunch({
								url:'/pages/index/index',
								success: () => {
									uni.showToast({title:res.data.message,icon:'none'});
								}
							})
						}
					} else if (res.statusCode === 400) {
						uni.reLaunch({
							url:'/pages/index/index',
							success: () => {
								uni.showToast({title:res.data.message,icon:'none'});
							}
						})
					}else if(res.statusCode===401){
						uni.reLaunch({
							url:'/pages/index/index',
							success: () => {
								uni.showToast({title:'请先登录',icon:'none'});
							}
						})
					}else if(res.statusCode===404){
						uni.reLaunch({
							url:'/pages/index/index',
							success: () => {
								uni.showToast({title:'暂未开放',icon:'none'});
							}
						})
					}else{
						console.log('接口返回值错误')
					}
				})
			}
		}
	}
</script>

<style scoped>
.btn-box{
	height: 80rpx;
	margin-top: 30rpx;
}
.btn-add{
	margin: auto;
	background: rgba(244, 178, 73, 1);
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 44rpx;
	color: #FFFFFF;
	font-size:36rpx;
	font-family:PingFang SC;
}
</style>