<template>
	<view class="box my-pd-15">
		<view class="box my-flex-row-align-c">
			<image class="pic" src="/static/my/help.png" mode=""></image>
			<text class="my-mgl-8 my-font-16">电兜百科</text>
		</view>
		<view class="box my-flex-col my-bg-white my-mgt-5 my-rds-5 my-pdlr-10 my-relative h">
			<view class="my-flex-col box" v-for="(item,index) in tab" :key="index" @click="onTab(index)">
				<view class="my-flex-row-b bder-b my-pdtb-8">
					<text class="my-font-16 txt-box">{{item.question}}</text>
					<image class="icon my-flex-self-s" :class="select===index?'tr2':'tr1'" src="/static/my/bottom.png" mode=""></image>
				</view>
				<view class="my-flex-row-b bder-b" :class="select===index?'h2 my-pdtb-8':'h1'">
					<text class="my-font-14 my-cl-grey">{{item.answer}}</text>
				</view>
			</view>
		</view>
		<view class="box my-mgt-5 my-rds-5 my-pdlr-10 my-flex-row-c">
			<text class="my-cl-grey my-font-11">如以上百科答案，仍未解决您问题请通过下方按钮联系客服。</text>
		</view>
		<view class="my-mgt-15 box my-flex-row-c">
			<view class="btn my-flex-row-c my-bg-ye my-cl-white my-font-22 my-boxsha-2">
				<image class="icon" src="/static/my/service.png" mode=""></image>
				<text class="my-mgl-8">联系客服</text>
			</view>
		</view>
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import req from '@/util/req.js'
	export default{
		data(){
			return{
				select:null,
				tab:[]
			}
		},
		components: {
			loading
		},
		mounted() {
			this.open();
			setTimeout(() => {
				this.close();
			}, 2000)
		},
		onShow() {
			this.getQuestions()
			
		},
		methods:{
			getQuestions(){
				let params = {
					
				}
				req.request('POST', params, '/user/questions', '加载中', (res) => {
					console.log(res)
					if (res.statusCode === 200) {
						this.tab=res.data.data
					}
				})
			},
			onTab(e){
				this.select=e
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

<style>
	.box{
		width: 750upx;
		height: auto;
	}
	.box .box{
		width: 100%;
	}
	.txt-box{
		width: 630upx;
	}
	.pic{
		width: 60upx;
		height: 60upx;
	}
	.bder-b{
		border-bottom: 2upx dashed rgb(253, 203, 123);
	}
	.my-pdtb-8{
		padding: 16upx 0 16upx 0;
	}
	
	.h1{
		height: 0;
		opacity: 0;
		transition: all 0.5s;
	}
	.h2{
		height: auto;
		opacity: 1;
		transition: all 0.5s;
	}
	.tr1{
		transform: rotate(0);
		transition: all 0.5s;
	}
	.tr2{
		transform: rotate(-180deg);
		transition: all 0.5s;
	}
	
	.my-ab{
		position: absolute;
		bottom: 10upx;
	}
	.btn{
		width: 650upx;
		height: 100upx;
		border-radius: 50upx;
	}
</style>
