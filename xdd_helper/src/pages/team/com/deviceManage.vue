<template>
	<view>
		<view class="my-flex-col">
			<image src="../../../static/team/banner.png" style="width: 750upx;height: 300upx;"></image>
			<view class="my-flex-col radius-b my-bg-white">
				<view class="my-flex-row-c ">
					<view class="my-bder-b line"></view>
					<text class="my-mglr-25 my-font-18">底座信息</text>
					<view class="my-bder-b line"></view>
				</view>
				<view class="my-font-14 my-cl-a3 my-pdlr-20 my-flex-col">
					<view class="my-flex-row my-pdt-10 my-pdr-30"><text class="my-pdr-30">底座编号：</text><text>{{deviceinfo.boxNo}}</text></view>
					<view class="my-flex-row my-pdt-10 my-pdr-30"><text class="my-pdr-30">设备状态：</text><text>{{deviceinfo.deviceStatus}}</text></view>
					<view class="my-flex-row my-pdt-10 my-pdr-30"><text class="my-pdr-30">计费信息：</text><text>{{deviceinfo.unitPrice}}元/小时</text></view>
					<view class="my-flex-row my-pdt-10 my-pdr-30"><text class="my-pdr-30">激活时间：</text><text>{{deviceinfo.activationTime}}</text></view>
					<view class="my-flex-row my-pdtb-10 "><text class="my-pdr-30">商户名称：</text><text>{{deviceinfo.businessName}}</text></view>
					<view class="my-flex-row my-pdtb-10 "><text class="my-pdr-30">ICCID：</text><text>{{deviceinfo.iccid}}</text></view>
				</view>
			</view>
			<view class="my-flex-row-c box my-bg-white">
				<view class="btn1 my-bg-ye my-cl-white my-flex-row-c mg" @click="btnWriteList">
					<text class="my-flex-row-align-c">白名单</text>
				</view>
				<view class="btn1 my-bg-ye my-cl-white my-flex-row-c mg">
					<text class="my-flex-row-align-c">流量充值</text>
				</view>
				<view class="btn1 my-bg-ye my-cl-white my-flex-row-c mg" @click="onOut(true,2)">
					<text class="my-flex-row-align-c">全部弹出</text>
				</view>
				<view class="btn1 my-bg-ye my-cl-white my-flex-row-c mg">
					<text class="my-flex-row-align-c">操作记录</text>
				</view>
			</view>
			<view class="radius-t my-flex-col-align-c my-bg-white box1 my-font-12">
				<view class="my-flex-row my-mglr-5 my-bder-b-ye">
					<text class="txt1  my-pdtb-10">槽位</text>
					<text class="txt1  my-pdtb-10">电量</text>
					<text class="txt2  my-pdtb-10">充电宝编号</text>
					<text class="txt1  my-pdtb-10">弹宝</text>
				</view>
				<!-- <manage :manage="manage"></manage> -->
				<view class="my-flex-row my-mglr-5 my-bder-b-ye" v-for="(item,index) in deviceinfo.boxSlotResults" :key="item">
					<text class="txt1  my-pdtb-10">{{item.slotId}}</text>
					<text class="txt1  my-pdtb-10">{{item.electric}}%</text>
					<text class="txt2  my-pdtb-10" :class="item.id===1?'':'my-cl-red'">{{item.batteryNo}}<text class="my-cl-red" v-if="item.id===2">*</text></text>
					<view class="txt1 my-flex-row-c">
						<view class="my-cl-white my-font-10 btn2 my-flex-col-c" :class="item.popup===true?'my-bg-ye':'my-bg-a3'" @click="onOut(item.popup,1,item.slotId)">弹宝</view>
					</view>
				</view>
			</view>
			<view class="my-cl-a3 my-font-10 my-bg-white my-pdt-5 my-pdl-15"  style="text-align: right;">
				注：带<text style="color: red;">“*”</text>充电宝为他人设备不可弹出。
			 <view style="width: 100%;">
			<view class="btn1 my-bg-ye my-cl-white my-flex-row-c mg" style="text-align: center;margin: auto; font-size: 28rpx;" @click="getdevicedetail(1)">
				<text class="my-flex-row-align-c">刷新</text>
			</view>
			</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import req from "@/util/req.js";
	export default {
		data() {
			return {
				deviceNo:null,
				deviceinfo:null,
				manage: [{
					id:1,
					slot: '1号',
					state: '正常',
					buttery: '100',
					deviceNo: 'H6012456789'
					
				},{
					id:2,
					slot: '2号',
					state: '正常',
					buttery: '80',
					deviceNo: 'H6012456789'
					
				}],
				baseInfo: [{
					baseNo: 'H6024501551',
					deviceState: '在线',
					charge: '2元/小时',
					activateTime: '2020-03-02 17:00',
					network: '靓仔烤鱼',
				}],
			}
		},
		onLoad(options) {
			console.log(options.deviceNo)
			this.deviceNo=options.deviceNo;
			this.getdevicedetail();
		},
		methods:{
			btnWriteList(){
				console.log(212121212);
				//uni.showToast({title:"近期开放",icon:'none'});return;
				uni.navigateTo({
					url:'/pages/team/com/writeListSet?businessId='+this.deviceinfo.businessId+"&businessName="+this.deviceinfo.businessName
				})
			},
			// 单个与全部弹宝
			onOut(checked,type,num){
				if(checked){
					var params={
						boxNo:this.deviceinfo.boxNo,
						slotIds:[]
					}
					if(type==1){ 
						params.slotIds.push(num);
						console.log("我是单个弹出数据",params);
					}else if(type==2){
						var arr2=this.deviceinfo.boxSlotResults;
						for (var i=0;i<arr2.length;i++) {
							if(arr2[i].popup==true){
								params.slotIds.push(arr2[i].slotId);
							}
						}
						console.log("我是全部弹出数据",params);
					}
					req.request('POST', params, '/proxy/proxy/popup/device', '加载中', (res) => {
						if (res.statusCode === 200) {
							 if(type==1){
								 uni.showToast({
								 	title:num+"号槽位的充电宝已弹出"
								 });
							 }
							 if(type==2){
								 uni.showToast({
								 	title:"全部充电宝已弹出"
								 })
							 }
						}
						this.getdevicedetail();
					})
				}else{
				   // 点击无法弹出
				}
			},
			getdevicedetail(num){
				let params = {
					 boxNo:this.deviceNo
				}
				req.request('POST', params, '/proxy/proxy/device/box/detail/'+this.deviceNo, '加载中', (res) => {
					if (res.statusCode === 200) {
					  console.log(res.data.data)				  
					  this.deviceinfo=res.data.data;
					  if(num==1){
						  uni.showToast({
						  	title:'刷新成功',
						  })
					  }
					}
				})
			},
		},
	}
</script>

<style>
	.radius-b {
		border-bottom-right-radius: 15upx;
		border-bottom-left-radius: 15upx;
		border-color: #CCCCCC;
	}
	.radius-t {
		border-top-right-radius: 15upx;
		border-top-left-radius: 15upx;
		border-color: #CCCCCC;
	}

	.line {
		width: 150upx;
		height: 5upx;
	}
	.btn {
		width: 170upx;
		height: 80upx;
		border-radius: 10upx;
		margin-left: 40upx;
		margin-right: 40upx;
	}
	.btn1 {
		width: 140upx;
		height: 66upx;
		border-radius: 10upx;
	}
	.btn2 {
		width: 70upx;
		height: 40upx;
		border-radius: 10upx;
	}
	.my-bder-b {
		border-color: #f8c470;
		border-width: 6upx;
	}
    .my-cl-red{
	    color: red;
    }
	.box {
		margin-top: 10upx;
		width: 750upx;
		height: 190upx;
	}

	.box1 {
		width: 750upx;
		margin-top: 10upx;
	}

	.txt {
		text-align: center;
	}

	.txt1 {
		width: 100upx;
		text-align: center;
	}

	.txt2 {
		width: 300upx;
		text-align: center;
	}
	.my-bg-a3{
		background-color: #A3A3A3;
	}
	.mg{
		margin-left: 10upx;
		margin-right: 10upx;
	}
</style>
