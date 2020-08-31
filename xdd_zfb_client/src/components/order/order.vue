<template>
	<view>
		<view class="box my-mgt-10 my-pdt-10 my-pdb-10 my-pdl-15 my-pdr-15 my-flex-col my-bg-white my-relative" v-for="(item,index) in order"
		 :key="index">
			<!-- 上 -->
			<view class="my-bder-b-eb my-pdb-10 my-flex-col">
				<view class="my-flex-row-b">
					<view class="my-flex-row-align-c">
						<text  style="margin-right: 30upx;">订单编号</text>{{item.orderNo}}
						<!-- <view class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg1">{{item.model}}</view> -->
					</view>
					<!-- <text class="my-cl-06 circular" v-if="item.state===0"></text>
					<text class="my-cl-ye circular1" v-if="item.state===1"></text> -->
				</view>
				<view class="my-flex-row-b my-mgt-5">
					<view class="my-flex-row-align-c">
						<text class="my-cl-00 my-font-14" style="margin-right: 30upx;">设备编号</text>{{item.deviceNo}}
						<!-- <view class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg1">{{item.model}}</view> -->
					</view>
					<!-- <text class="my-cl-06 my-font-12" v-if="item.state===0">超时借出</text>
					<text class="my-cl-ye my-font-12" v-if="item.state===1">订单完成</text> -->
					<text class="my-cl-ye my-font-12">{{item.orderStatus}}</text>
				</view>
			</view>
			<!-- 中 -->
			<view class="my-pdtb-10 my-bder-b-eb my-font-12">
				<view class="my-flex-col my-cl-grey">
					<view class="my-flex-row-b box my-pdb-2">
						<!-- <text v-if="item.state===0">超时扣费</text>
						<text v-if="item.state===1">订单费用</text> -->
						<text>订单费用</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<!-- <text class="my-word-break-1 my-cl-ye">{{item.cost}}元</text> -->
							<!-- <text class="my-cl-06" v-if="item.state===0">{{item.cost}}元</text>
							<text class="my-cl-ye" v-if="item.state===1">{{item.cost}}元</text> -->
							<text class="my-cl-ye">{{item.orderAmount}}元</text>
						</view>
					</view>
					<view class="my-flex-row-b box my-mgt-3 my-pdb-2">
						<text>商户名称</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.businessName}}</text>
						</view>
					</view>
					<view class="my-flex-row-b box my-mgt-3 my-pdb-2">
						<text>商户地址</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.businessAddress}}</text>
						</view>
					</view>
					<!-- <view class="my-flex-row-b box my-mgt-3" v-if="item.state===0||item.state===3"> -->
						<view class="my-flex-row-b box my-mgt-3">
						<text>开始时间</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.startDate}}</text>
						</view>
					</view>
					<!-- <view class="my-flex-row-b box my-mgt-3" v-if="item.state===1||item.state===3"> -->
						<view class="my-flex-row-b box my-mgt-3">
						<text>租借时长</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.userTime}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 下 -->
			<view class="my-flex-row-align-c box my-mgt-5" @click="onCall">
				<image class="Cts" src="../../static/my/ser.png"></image>
				<text style="font-size: 24upx; color: #A3A3A3; padding-left: 10upx;">如有疑问，请您拨打客服热线。</text>
				<!-- <view class="txt my-flex-row-b"> -->
					
					<!-- <text class="my-word-break-1 my-cl-ye" style="font-size: 24upx;">4008-732-567</text> -->
				<!-- </view> -->
			</view>
			<!-- <view class="my-flex-row-b my-mgt-5">
				<text></text>
				<text class="my-cl-ye">合计：{{item.cost}}元</text>
			</view> -->
		</view>
		<!-- <view :class="showBl?'my-show':'my-hide'">
			<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
				<view class="my-bg-white my-rds-10 my-flex-col-c my-cl-ye my-pdtb-20 box-show1">
					4008-732-567
				</view>
				<view class="my-mgt-25 my-flex-col-c my-cl-white" >
					<view class="close" @click="onClose"></view>
				</view>
			</QSPopup>
		</view> -->
	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	export default {
		props: {
			order: Array,
			required: true
		},
		data(){
			return{
				showBl:true,
			}
		},
		components:{
			QSPopup
		},
		methods: {
			// onCall(ref) {
			// 	this.showBl=true;
			// 	this.$refs['QSPopup'].show();
			// },
			onCall(){
				uni.makePhoneCall({
					phoneNumber:'4008-732-567'
				})
			},
			onClose(){
				this.showBl=false
				uni.navigateBack({
					delta:1,
				})
			},
		}
	}
</script>

<style>
	.box {
		width: 750upx;
	}

	.bg1 {
		background-color: rgba(243, 178, 73, 0.3);
	}

	.box .box {
		width: 100%;
	}

	.txt {
		width: 515upx;
	}

	.icon {
		width: 30upx;
		height: 30upx;
	}

	.w {
		width: 80upx;
		height: 1upx;
	}
	
	.circular{
		width: 20upx; 
		height: 20upx; 
		/* border: 3upx solid #00665E; */
		background: #00665E;
		border-radius: 50%;
		margin-right: 45upx;
	}
	.circular1{
		width: 20upx; 
		height: 20upx; 
		/* border: 3upx solid #F4B249; */
		background: #F4B249;
		border-radius: 50%;
		margin-right: 45upx;
	}
	.Cts{
		width: 30upx;
		height: 30upx;
	}
	
	.box-show1{
		width: 600upx;
	}
	.close:hover{cursor:pointer;}
	.close {
		border: 4upx solid #FFFFFF;
		color: white;
		border-radius: 50%;
		/* display: flex;
		justify-content: center;	
		align-items: center; */
		line-height: 42upx;
		text-align: center;
		height: 54upx;
		width: 54upx;
	}
	
	.close::before {
		content: "\2715";
	}
</style>
