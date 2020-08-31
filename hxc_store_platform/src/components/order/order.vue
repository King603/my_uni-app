<template>
	<view>
		<view class="box my-mgt-10 my-pdt-10 my-pdb-10 my-pdl-15 my-pdr-15 my-flex-col my-bg-white my-relative" v-for="(item,index) in order"
		 :key="index">
			<view class="my-bder-b-eb my-pdb-10 my-flex-col" @click="orderdetail(item.orderNo,item.types,item.orderStatus)">
				<view class="my-flex-row-b">
					<view class="my-flex-row-align-c">
						<text v-if="item.types==15">设备编号：{{item.deviceNo}}</text>
						<text v-if="item.types==16 || item.types==19">订单编号：{{item.orderNo}}</text>
						<text v-if="item.types==17">代理名称：{{item.proxyName}}</text>
						<text v-if="item.types==18">开始时间：{{item.startDate}}</text>
						<text v-if="item.types==1 || item.types==2 || item.types==7 || item.types==8 || item.types==20">订单编号：{{item.orderNo}}</text>
						<text v-if="item.types==3 || item.types==4 || item.types==5 || item.types==6 || item.types==9 || item.types==10 || item.types==11 || item.types==13 || item.types==21">设备型号:</text>
						<text v-if="item.types==12 || item.types==14">商户名称:{{item.businessName}}</text>
						<!-- 图标 -->
						<view v-if="item.types==1 || item.types==2 || item.types==3 || item.types==4 || item.types==5 || item.types==6 || item.types==7 || item.types==8 || item.types==9 || item.types==10 || item.types==11 || item.types==13 || item.types==14 || item.types==15 || item.types==16 || item.types==17 || item.types==18 || item.types==19 || item.types==20 || item.types==21" class="my-mgl-15 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg">{{item.model || item.deviceModel}}</view>
					</view>
					<text class="my-cl-ye" style="width:142upx;text-align: right;" v-if="item.types==1 ||item.types==2">租借中</text>
					<text class="my-cl-ye" style="width:142upx;text-align: right;" v-if="item.types==3 || item.types==4">待使用</text>
					<text class="my-cl-ye" style="width:142upx;text-align: right;" v-if="item.types==7 || item.types==8 || item.types==14 || item.types==15 || item.types==16 || item.types==17 || item.types==18 || item.types==19 || item.types==20">{{item.orderStatus}}</text>
					<!-- 离线+圈 ,无判断-->
					<text style="color:#FF0000;" v-if="item.types===5"><text class="dot my-bg-danger"></text>离线</text>
					<!-- 在线+圈，有判断-->
					<text style="color:#00F0FF;" v-if="item.types===9 && item.deviceStatus==='在线'"><text class="dot my-bg-blue" style="right: 100upx;top: 29upx;"></text>在线</text>
					<!-- 离线+圈，有判断 -->
					<text style="color:#FF0000;" v-if="item.types===9 && item.deviceStatus==='离线'"><text class="dot my-bg-danger" style="right: 100upx;top: 29upx;"></text>离线</text>
					
					<!-- 离线圈无判断-->
					<view class="dot my-bg-danger" style="right: 100upx;" v-if="item.types==6"></view>
					<!-- 离线无判断-->
					<view class="my-cl-danger" v-if="item.types==6">
						<text>离线</text>
					</view>
					<!-- 离线圈有判断-->
					<view class="dot my-bg-danger" v-if="item.types==10 && item.deviceStatus=='离线' || item.types==12 && item.deviceStatus=='离线' || item.types==13 && item.deviceStatus=='离线' || item.types==21 && item.deviceStatus=='离线'"></view>
					<!-- 在线圈有判断-->
					<view class="dot my-bg-blue" v-if="item.types==10 && item.deviceStatus=='在线' || item.types==12 && item.deviceStatus=='在线' || item.types==13 && item.deviceStatus=='在线' || item.types==21 && item.deviceStatus=='在线'"></view>
					<!-- 
					<text class="my-cl-ye" v-if="item.state===2&&item.status===null">归还</text>
					<text class="my-cl-ye" v-if="item.state===3&&item.status===null">完成</text>
					 -->
				</view>
				<view class="my-flex-row-b">
				<text v-if="item.types==10 || item.types==12 || item.types==13 || item.types==21">设备归属：{{item.proxyName}}</text>
				<!-- 离线有判断-->
				<view class="my-cl-danger" v-if="item.types==10 && item.deviceStatus=='离线' || item.types==12 && item.deviceStatus=='离线' || item.types==13 && item.deviceStatus=='离线' || item.types==21 && item.deviceStatus=='离线'">
					<text>离线</text>
				</view>
				<!-- 在线有判断-->
				<view class="my-cl-blue" v-if="item.types==10 && item.deviceStatus=='在线' || item.types==12 && item.deviceStatus=='在线' || item.types==13 && item.deviceStatus=='在线' || item.types==21 && item.deviceStatus=='在线'">
					<text>在线</text>
				</view>
				</view>
			</view>
			<view class="my-pdtb-10 my-bder-b-eb"  @click="orderdetail(item.orderNo,item.types,item.orderStatus)">
				<view class="my-flex-col my-cl-grey">
					<view class="my-flex-row-b box" v-if="item.types==1  || item.types==2 || item.types==3 || item.types==4 ||item.types===5 || item.types==6 || item.types==7 || item.types==8 || item.types==9 || item.types==10 || item.types==11 || item.types==12 || item.types==13 || item.types==14 || item.types==16 || item.types==17 || item.types==18 || item.types==19 || item.types==20">
						<view class="my-flex-row-b box my-mgt-3" v-if="item.types==11">设备编号:{{item.deviceNo}}</view>
						<text v-if="item.types!=11">设备编号:</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1" v-if="item.types!=11">{{item.boxNo || item.deviceNo}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.types==20 || item.types==21">
						<text>设备编号</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.deviceNo}}</text>
						</view>
					</view>
					
					
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.types==14 ||item.types==15 ||item.types==17 || item.types==18">
						<text>订单编号</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.orderNo}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.types==14 || item.types==18">
						<text>代理名称</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.proxyName}}</text>
						</view>
					</view>
					
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.types==12 ||item.types==13">
						<text>设备型号</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.deviceModel}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.types==1 || item.types==2 || item.types==3 || item.types==4 || item.types===5 || item.types==6 || item.types==7 || item.types==8 || item.types==9 || item.types==10 || item.types==15 || item.types==16 ||item.types==17 || item.types==18 || item.types==19 || item.types==21">
						<text>商户名称</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.businessName||'未绑定'}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.types==1 || item.types==2 || item.types==3 || item.types==4 || item.types===5 || item.types==6 || item.types==7 || item.types==8 || item.types==9 || item.types==10 || item.types==12 || item.types==13 || item.types==14 || item.types==15 || item.types==16 ||item.types==17 || item.types==18 || item.types==19 || item.types==20 || item.types==21">
						<text>商户地址</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.businessAddress||'暂无地址'}}</text>
						</view>
					</view>
					<view class="my-flex-row-b box my-mgt-3" v-if="item.types==1 || item.types==2 || item.types==7 || item.types==8 || item.types==14 || item.types==15 || item.types==16 ||item.types==17 || item.types==19 || item.types==20">
						<text>创建时间</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.startDate}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.deviceType=='BATTERY_BOX'&& item.types==3 || item.deviceType=='BATTERY_BOX'&& item.types==4 ||item.deviceType=='BATTERY_BOX'&& item.types==5 || item.deviceType=='BATTERY_BOX'&& item.types==6 || item.deviceType=='BATTERY_BOX'&& item.types==9 || item.deviceType=='BATTERY_BOX'&& item.types==10 || item.types==11 || item.deviceType=='BATTERY_BOX'&& item.types==12 || item.deviceType=='BATTERY_BOX'&& item.types==13 || item.deviceType=='BATTERY_BOX'&& item.types==21">
						<text>可用宝数：{{item.borrowBatteryCount}}个</text>
						<text>可还槽数：{{item.returnBatteryCount}}个</text>
					</view>
					
				</view>
			</view>
			
			<view class="my-flex-row-b my-mgt-10" v-if="item.types==7 || item.types==8" style="position: relative;">
				<text v-if="item.profitAmount" class="my-cl-ye" style="position: absolute;right: 0;">{{item.profitAmount}}</text>
				<text v-else class="my-cl-ye" style="position: absolute;right: 0;">暂无分账</text>
			</view>
			
			<view class="my-flex-row-b my-mgt-10" v-if="item.types==20" style="position: relative;">
				<text v-if="item.orderStatus=='已结算'" class="my-cl-ye" style="position: absolute;right: 0;">收益金额：￥{{item.orderAmount || 0}}元</text>
				<text v-if="item.orderStatus=='租借中'" class="my-cl-ye" style="position: absolute;right: 0;">订单进行中...</text>
			</view>
			
			<view class="my-flex-row-b my-mgt-10" v-if="item.types==5 || item.types==6">
				<text >最后在线时间：{{item.businessPhone}}</text>
			</view>
			
			<view class="my-flex-row-b my-mgt-10" v-if="item.types==3&&item.deviceType=='BATTERY_BOX' || item.types==9&&item.deviceType=='BATTERY_BOX' || item.types==10&&item.deviceType=='BATTERY_BOX' || item.types==12 || item.types==13">
				<text v-if="item.types!=12&&item.types!=13">商户电话：{{item.businessPhone}}</text>
				<text v-if="item.types==12 ||item.types==13">联系方式：{{item.phone}}</text>
				<view class="my-flex-row-align-c">
					<view v-if="item.types!=12&&item.types!=13" class="my-mgl-15 my-pdb-2 my-flex-row-align-c my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-ye my-bder-ye" @click="onCall(item.businessPhone)">
						<image src="/static/index/phone.png" class="icon" mode=""></image>
						<text class="my-mgl-5">呼叫</text>
					</view>
					<!-- <view class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-ye my-bder-ye" v-if="item.id===1||item.id===3&&item.state===2||item.state===3" @click="onSet('QSPopup')">申请退款</view> -->
					<view v-if="item.types!=10&&item.deviceType=='BATTERY_BOX'" class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-blue my-bder-blue" @click="onDeviceManage(item.deviceNo)">管理</view>
					<!-- <view class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-ye my-bder-ye" v-if="item.status===1">扣款</view> -->
					<!-- <view class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-blue my-bder-blue" v-if="item.id===2">上线</view> -->
                </view>
			</view>
			
			<view class="my-flex-row-b my-mgt-10" v-if="item.types==21">
				<text v-if="item.types==21">代理电话：{{item.phone}}</text>
				<view class="my-flex-row-align-c">
					<view v-if="item.types==21" class="my-mgl-15 my-pdb-2 my-flex-row-align-c my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-ye my-bder-ye" @click="onCall(item.phone)">
						<image src="/static/index/phone.png" class="icon" mode=""></image>
						<text class="my-mgl-5">呼叫</text>
					</view>
			    </view>
			</view>
			
		</view>
		<!-- <view :class="showBl?'my-show':'my-hide'">
			<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
				<view class="my-bg-white my-rds-10 my-flex-col-c show1">
					<image src="../../static/team/back.png" class="icon2 my-mgb-10" mode=""></image>
					<input placeholder-class="my-cl-a2 box2" type="text" placeholder="退款理由" />
					<view class="my-flex-row-c ">
						<view class=" btn1 my-bg-ye my-cl-white my-flex-row-c my-mgt-10 my-font-15" @click="onAffirm">
							确定申请
						</view>						
					</view>
				</view>
			</QSPopup>
		</view> -->
		<go-top ></go-top>
	</view>
</template>

<script>
	import goTop from '@/components/goTop/goTop.vue';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
		import req from '@/util/req.js';
	export default {
		props: {
			order: Array,
			required: true,
			showBl:true
		},
		components: {
			QSPopup,goTop
		},
		data() {
			return {
				top: true
			}
		},
		methods: {
			orderdetail(order,type,state){
				if(order!=null&&type==19&&state=='已结算'){
					uni.navigateTo({
						url:"/pages/stat/bill?order="+order
					})
				}
			},
			onDeviceManage(deviceNo){
				uni.navigateTo({
					url:"/pages/team/com/deviceManage?deviceNo="+deviceNo
					
				})
			},
			onCall(phonenum){
				uni.makePhoneCall({
					    phoneNumber: phonenum, 
				})
			},
			onAffirm(){
				this.showBl=false
				uni.navigateBack({
					delta:1,
				})
			},
			onClose(){
				this.showBl=false
			},
			onSet(ref) {
				this.showBl=true
				this.$refs[ref].show();
			},
		}
	}
</script>

<style>
	.box {
		width: 750upx;
	}

	.bg {
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
	.dot{
		position: absolute;
		right: 33upx;
	}
	.dot1{
		position: absolute;
		right: 100upx;
	}
	.icon2{
		height: 90upx;
		width: 90upx;
	}
	.box2{
		width: 320upx;
		height: 120upx;
	}
	
</style>
