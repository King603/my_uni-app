<template>
	<view class="my-flex-col-c box">
		<view class="my-bg-white box my-fixed-t" style="z-index: 999;">
			<uniStatusBar></uniStatusBar>
			<uniNav :title="title"></uniNav>
		</view>
		<view class="my-bg-white box">
			<uniStatusBar></uniStatusBar>
			<uniNav></uniNav>
		</view>
		<view class="my-mgt-30">
			<view class="box my-flex-col-c" v-for="(item,index) in tab" :key="index" @click="onTab(index)">
				<image :src="item.img" mode="" class="pic my-mgt-30"></image>
				<text class="my-mgt-10 my-font-16">{{item.title}}</text>
				<text class="my-mgt-10 my-cl-grey">{{item.txt}}</text>
			</view>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="my-bg-white my-rds-10 my-pd-10 my-flex-col-c show1">
				<icon type="success" size="48" color="#f8c470"/>
				<text class="my-font-16 my-mgt-10">已扫描成功</text>
				<text class="my-cl-grey my-mgt-10 my-font-12">设备编号：{{devId}}</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-10" @click="onOK('QSPopup')">
					立即铺设
				</view>
			</view>
		</QSPopup>
		<loading
		   ref="loading"
		   :custom="false"
		   :shadeClick="true"
		   :type="1"
		   @callback="callback()">
		        <!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import uniNav from "../../../components/uni-nav-bar/uni-nav-bar.vue";
	import uniStatusBar from "../../../components/uni-status-bar/uni-status-bar.vue"
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		data() {
			return {
				title: '铺货',
				tab: [{
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/SGRSTGgFUf_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.QvX2ERS63Ehu4da90bc32df1e1e7f4792636ac64a92c.png',
					title: '扫码铺货',
					txt:'扫描设备二维码，立即铺设设备'
				}, {
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xwiRaZpEeH_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.mGVLvy5IpSwr9e8a4415eeac3b7f44c039cd8f6c7b52.png',
					title: '批量铺设',
					txt:'批量选择，更快完成设备铺设'
				}],
				devId:'',
				type:'',
				deviceIds:[]
			}
		},
		components: {
			uniNav,
			uniStatusBar,
			QSPopup,
			loading
		},
		mounted() {
			// this.open();
			// setTimeout(()=>{
			// 	this.close();
			// },2000)
		},
		computed: {
	
		},
		onLoad() {
	
		},
		methods: {
			onOK(ref){
				uni.navigateTo({
					url: "/pages/team/com/add?deviceIds=" + this.deviceIds + "&&deviceType=" + this.type,
					success: () => {
						this.deviceIds = []
						this.type=''
						this.$refs['QSPopup'].hide();
					}
				})
				// uni.showToast({
				// 	title:"铺设成功！"
				// })
			},
			onTab(e){
				if(e===0){
					uni.scanCode({
					    success:(res)=> {
							let result = res.result
							let array= result.split('=')
							// console.log(array)
							let str = array.pop()
							let dev = array.pop()
							let devArray = dev.split('&&')
							let devNo = devArray.shift()
							this.deviceIds.push(devNo)
					        this.devId= devNo
							this.type=str
							this.$refs['QSPopup'].show();
					    }
					});
				}
				if(e===1){
					uni.navigateTo({
						url:"/pages/team/edit/alone-dev?type="+2
					})
				}
			},
			close:function(){
			    this.$refs.loading.close();
			},
			open:function(){
			    this.$refs.loading.open();
			},
			callback(){
			    // console.log("回掉");
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF!important;
		padding-bottom: 0;
	}
	.box{
		width: 100%;
	}
	.pic {
		width: 240upx;
		height: 240upx;
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
