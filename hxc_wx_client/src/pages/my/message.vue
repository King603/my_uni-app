<template>
	<view class="my-pd-15">
		<view class="my-flex-row-c my-cl-grey" v-if="!msgList">
			暂无消息
		</view>
			<view v-else class="my-flex-col box" v-for="(item,index) in msg" :key="index" @click="onTab(index)">
				<view class="my-flex-row-c my-pdtb-20">
					<text class="my-font-12 txt-box my-rds-5 txt-center">{{item.createDate}}</text>
				</view>
				<view class="my-flex-col my-bg-white my-mgt-5 my-rds-5 my-pdlr-20 h">
					<view class="my-flex-row-b my-mgt-10 my-mgb-5 my-cl-33">
						<text class="my-font-16">通知</text>
						<!-- 三目运算 -->
						<!-- <text :class="item.read===false?'circular':''"></text> -->
						<!--  -->
					</view>
						<!-- <text style="text-indent: 2em;" class="my-font-12 my-cl-grey">{{item.txt}}</text> -->
						<text style="text-indent: 2em;" class="my-font-12 my-cl-grey">{{item.content}}</text>
				</view>
				<!-- 下 -->
			
			</view>
			<view class="my-mgt my-flex-row-c">
				<text class="my-cl-ye my-font-12">注:</text>
				<text class="my-cl-33 my-font-12 my-pdl-10">如有订单疑问请您联系客服为您解决</text>
			</view>
		<view class="my-mgt-15 box my-flex-row-c">
			<view class="btn my-flex-row-c my-bg-ye my-cl-white my-font-22 my-boxsha-2" @click="eject('QSPopup')">
				<image class="icon" src="/static/my/service.png" mode=""></image>
				<text class="my-mgl-8">联系客服</text>
			</view>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="my-bg-white my-rds-10 my-flex-col-c show1">
					<image src='../../static/my/ser.png' class="pic" mode=""></image>
					<!-- <view class="btn2">	
					</view> -->
					<text class="my-font-16 mgtop">客服热线：4008-732-567</text>
					<view class="my-flex-row-c btn1 mgtb my-cl-white my-bg-ye my-font-15" @click="onCall">
						一键拨打
					</view>
		    </view>
		</QSPopup>
		
		<loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>

	</view>
</template>

<script>
	import loading from '@/components/xuan-loading/xuan-loading.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	import req from '@/util/req.js'
	export default{
		data(){
			return{
				showBl:true,
				select:null,
				// tab:[{
				// 	time:'2020年01月15日 13:47',
				// 	txt:'尊敬的客户，您已成功归还豪想充H60充电宝，归还地点华德莱餐厅。',	
				// 	txt2:'本次订单编号为2020011514754，开始于2020年01月15日  12：51分；累计时长56分钟；共产生2.00元费用。',
				// 	read:false
				// },{
				// 	time:'2020年01月15日 13:47',
				// 	txt:'尊敬的客户，您已成功归还豪想充H60充电宝，归还地点华德莱餐厅。',
				// 	txt2:'本次订单编号为2020011514754，开始于2020年01月15日  12：51分；累计时长56分钟；共产生2.00元费用。',
				// 	read:false
				// }
				msg:[],
				// ,{
				// 	time:'2020年01月15日 13:47',
				// 	txt:'尊敬的客户，您已成功归还豪想充H60充电宝，归还地点华德莱餐厅。',	
				// 	txt2:'本次订单编号为2020011514754，开始于2020年01月15日  12：51分；累计时长56分钟；共产生2.00元费用。',
				// 	read:false
				// }
				// ]
				msgList:false
			}
		},
		components: {
			uniPopup,
			loading,
			QSPopup
			
		},
		mounted() {
			this.getMsg()
		},
		methods:{
			getMsg(){
				let params = {
					pageIndex:0,
					pageSize:30
				}
				req.request('POST', params, '/user/system/msg/list', '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						this.msg=res.data.data.rows
						if(this.msg.length>0){
							this.msgList=true
						}
					}
				})
			},
			onTab(e){
				this.tab[e].read=true;
			},
			onAffirm(){
				this.showBl=false
				uni.navigateBack({
					delta:1,
				})
			},
			eject(ref) {
				this.showBl=true
				this.$refs[ref].show();
			},
			onCall(){
				uni.makePhoneCall({
					phoneNumber:'4008-732-567'
				})
			},
			callback() {
				// console.log("回掉");
			},
		}
	}
</script>

<style>
	.box{
		width: 690upx;
	}
	.box .box{
		width: 100%;
	}
	.txt-box{
		width: 298upx;
		color: #FFFFFF;
		height: 40upx;
		background: #CCCCCC;
	}
	.txt-center{
		line-height: 40upx;
		text-align: center;
	}
	
	.h{
		height: 255upx;
	}
	.my-absolute{
		bottom: 10upx;
	}
	.btn{
		width: 650upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.btn2{
		width: 600upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.btn1{
		width: 380upx;
		height: 60upx;
		border-radius: 50upx;
	}
	.circular{
		width: 15upx; 
		height: 15upx; 
		background: #FF0000;
		border-radius: 50%;
		margin-right: 14upx;
	}
	.show1{
		/* height: 406upx; */
		width: 600upx;
	}
	.pic{
		width: 205upx;
		height: 211upx;
		margin-top: 30upx;
		/* left: 50%;
		top: 135upx;
		transform: translate(-50%, -50%); */
		opacity: 0.5;
	}
	.mgtop{
		margin-top: 25upx;
	}
	.mgtb{
		margin: 30upx 0 44upx 0;
	}
</style>
