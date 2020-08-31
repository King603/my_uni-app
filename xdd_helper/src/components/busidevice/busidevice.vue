<template>
	<view>
		<view class="box my-mgt-10 my-pdt-10 my-pdb-10 my-pdl-15 my-pdr-15 my-flex-col my-bg-white my-relative" v-for="(item,index) in busidevice"
		 :key="index">
			<view class="my-bder-b-eb my-pdb-10 my-flex-col">
				<view class="my-flex-row-b">
					<view class="my-flex-row-align-c">
						<text v-if="item.id==3">订单编号:</text>
						<text v-else>设备型号:</text>
						<text v-if="item.id==3">{{item.orderNo}}</text>
					    <view v-if="item.deviceModel" class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg" style="height: 42upx;">{{item.deviceModel}}</view>
					    <view v-if="item.model" class="my-mgl-15 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg" style="height: 42upx;">{{item.model}}</view>	
					</view>
					<view class="dot my-bg-green" v-if="item.id==3"></view>
					<view class="dot my-bg-blue" v-if="item.deviceStatus!==''&&item.deviceStatus==='在线'"></view>
					<view class="dot my-bg-danger" v-if="item.deviceStatus!==''&&item.deviceStatus==='离线'"></view>
				</view>
				<view class="my-flex-row-align-c" style="position: relative;">
					<text>设备归属:</text>
				    <view style="margin-left: 20upx;">{{item.proxyName}}</view>
					<view class="my-cl-blue" style="position: absolute;right: 0;" v-if="item.deviceStatus==='在线'">
						<text>在线</text>
					</view>
					<view class="my-cl-danger" style="position: absolute;right: 0;" v-if="item.deviceStatus==='离线'">
						<text>离线</text>
					</view>
					<view class="my-cl-green" style="position: absolute;right: 0;" v-if="item.id==3">
						<text>超时借出</text>
					</view>
				</view>
			</view>
			<view class="my-pdtb-10 my-bder-b-eb" v-if="item.deviceType=='BATTERY_BOX'">
				<view class="my-flex-col my-cl-grey">
					
					<view class="my-flex-row-b box" v-if="item.id===null">
						<text>设备编号</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.deviceNo}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.id===null">
						<text>商户名称</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.businessName||'未绑定'}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.id===null">
						<text>商户地址</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.businessAddress||'暂无地址'}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3" v-if="item.id===3">
						<text>充电宝编号</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.deviceNo}}</text>
						</view>
					</view>
					<view class="my-flex-row-b box my-mgt-3" v-if="item.id===3">
						<text>开始时间</text>
						<view class="txt my-flex-row-b">
							<text></text>
							<text class="my-word-break-1">{{item.createDate}}</text>
						</view>
					</view>
					
					<view class="my-flex-row-b box my-mgt-3">
						<text>可用宝数：{{item.borrowBatteryCount}}个</text>
						<text>可还槽数：{{item.returnBatteryCount}}个</text>
					</view>
				</view>
			</view>
			<view class="my-flex-row-b my-mgt-10">
				<text v-if="item.phone">代理电话：{{item.phone}}</text>
				<text v-if="item.proxyPhone">代理电话：{{item.proxyPhone}}</text>
				<view class="my-flex-row-align-c">
					<view v-if="item.phone" class="my-mgl-15 my-pdb-2 my-flex-row-align-c my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-ye my-bder-ye" @click="onCall(item.phone)">
						<image src="/static/index/phone.png" class="icon" mode=""></image>
						<text class="my-mgl-5">呼叫</text>
					</view>
					<view v-if="item.proxyPhone" class="my-mgl-15 my-pdb-2 my-flex-row-align-c my-pdt-2 my-pdl-5 my-pdr-5 my-rds-5 my-cl-ye my-bder-ye" @click="onCall(item.proxyPhone)">
						<image src="/static/index/phone.png" class="icon" mode=""></image>
						<text class="my-mgl-5">呼叫</text>
					</view>
                </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			busidevice: Array,
			required: true,
		},
		components: {
	
		},
		methods: {
			onCall(phonenum){
				uni.makePhoneCall({
					    phoneNumber: phonenum, 
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #f2f2f2;
	}
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
		right: 30upx;
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
