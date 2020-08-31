<template>
	<view class="my-flex-col-c">
	<!-- 	<view class="my-flex-col-c img-box h" v-if="com.img">
			<image src="/static/no-pic.png" class="no-pic" mode="widthFix"></image>
		</view> -->
		<image :src="com.logoUrl" class="img-box" mode=""></image>
		<!-- 非编辑区 -->
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c" v-if="!edit">
			
			<view class="my-flex-row-b box" style="margin-bottom: 10upx;">
				<text></text>
				<text class="my-font-16">商户信息</text>
				<image src="/static/team/edit-1.png" class="icon my-flex-self-e" mode="" @tap="onEdit"></image>
			</view>
			<view class="box my-flex-col-c">
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>商</text><text>户</text><text>名</text><text>称</text></view>
					<view class="txt">{{com.businessName}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>商</text><text>户</text><text>地</text><text>址</text></view>
					<view class="txt">{{com.address}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>商</text><text>户</text><text>类</text><text>型</text></view>
					<view class="txt">{{com.type}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>联</text><text>系</text><text>人</text></view>
					<view class="txt">{{com.name}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>联</text><text>系</text><text>电</text><text>话</text></view>
					<view class="txt">{{com.phone}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-white my-mgt-5">
					<view class="text"></view>
					<view class="txt my-flex-row-b">
						<view class="btn my-bg-ye my-flex-row-c" @click="onCall">
							<image src="/static/team/phone.png" class="icon" mode=""></image>
							<text class="my-mgl-8">一键联系</text>
						</view>
						<view class="btn my-bg-ye my-flex-row-c" @click="onNav">
							<image src="/static/team/nav.png" class="icon" mode=""></image>
							<text class="my-mgl-8">一键导航</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c" v-if="!edit">
			<text class="my-font-16">商户分润</text>
			<view class="box my-flex-col-c">
				<!-- 				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>商</text><text>户</text><text>分</text><text>润</text><text>金</text><text>额</text></view>
					<view class="txt">{{com.benefit}}元</view>
				</view> -->
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>商</text><text>户</text><text>分</text><text>润</text><text>金</text><text>额</text></view>
					<view class="txt">{{profitAmount}}元</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s" v-if="com.noStandardProfit==false"><text>标</text><text>准</text><text>分</text><text>润</text></view>
					<view class="text my-flex-row-b my-flex-self-s" v-if="com.noStandardProfit==true"><text>非</text><text>标</text><text>准</text><text>分</text><text>润</text></view>
					<view class="txt">{{com.profitScale}}%</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>查</text><text>看</text><text>订</text><text>单</text><text>权</text><text>限</text></view>
					<view class="txt my-flex-row-align-c">
						<text :class="com.orderPermission===false?'my-cl-ye':'my-cl-grey'">关</text>
						<switch :checked="com.orderPermission" disabled color="#f8c470" class="tr my-mglr-10 my-flex-row-c" />
						<text :class="com.orderPermission===true?'my-cl-ye':'my-cl-grey'">开</text>
					</view>
				</view>
			</view>
		</view>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c" v-if="!edit" style="position: relative;">
			<text class="my-font-16">收费设置</text>
			<view class="box my-flex-col-c">
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>累</text><text>计</text><text>收</text><text>益</text></view>
					<view class="txt">{{amount}}元</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>计</text><text>费</text><text>单</text><text>价</text></view>
					<view class="txt my-flex-col">
						<view class="txt">
							<text>{{deviceprice[0].deviceModelName || ''}}</text>
							<text class="my-mgl-15-1">{{unitPrice}}元/小时</text>
						</view>
					</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>日</text><text>封</text><text>顶</text><text>值</text></view>
					<view class="txt my-flex-row-align-c">
						<text>{{deviceprice[0].deviceModelName || ''}}</text>
						<text class="my-mgl-15-1">{{topPrice}}元</text>
					</view>
				</view>
			</view>
			<!-- 线充收费设置 -->
			<!-- <view class="box my-flex-col-c" v-if="deviceList[0].otherBatteryNoList.length!==0"> -->
			<!-- 	<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>计</text><text>费</text><text>单</text><text>价</text></view>
					<view class="txt my-flex-col">
						<view class="txt">
							<text>X10</text>
						</view>
					</view>
				</view> -->
			<!-- 	<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>日</text><text>封</text><text>顶</text><text>值</text></view>
					<view class="txt my-flex-row-align-c">
						{{com.capping}}元
					</view>
				</view> -->
				<!-- x10多值区 -->
			<!-- <view style="width: 63upx;height: 120upx;"></view> -->
				<!-- <view style="position: absolute;right:0%;top:189upx;text-align: center;">
					<view class="my-flex-row-b box my-cl-grey my-mgt-5">
						<view class="text my-flex-row-b my-flex-self-s"></view>
						<view class="txt my-flex-col">
							<view class="txt">
								<view class="" v-for="item in price" :key='item'>
									  <view class="my-cl-grey">
										 {{item}}
									  </view>
								</view>
							</view>
						</view>
					</view>
				</view> -->
			<!-- </view> -->
		</view>
		<view class="my-mgt-5 my-pdt-10 my-bg-white box my-flex-col-c" v-if="!edit">
			<text class="my-font-16">设备信息</text>
			
			<!-- h60设备信息 -->
			<view class="box my-flex-col-c my-pd-10 my-bder-b-cc" v-for="item in deviceList" :key="item">
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>设</text><text>备</text><text>型</text><text>号</text></view>
					<view class="txt">{{item.deviceModelName}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>铺</text><text>货</text><text>时</text><text>间</text></view>
					<view class="txt">{{item.createDate}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view v-if="index==0" class="text my-flex-row-b"><text>设</text><text>备</text><text>编</text><text>号</text></view>
					<view v-if="index!=0" class="text my-flex-row-b"><text></text><text></text><text></text><text></text></view>
					<view class="txt serve">
					{{item.deviceNo}}
					<image v-if="item.deviceModelName=='H60'" src="/static/team/serve.png" class="icon" mode="aspectFill" style="margin-left: 60upx;" @click="toserve(item.deviceNo)"></image>
					</view>
				</view>
			</view>
			<!-- h601设备信息 -->
	<!-- 		<view class="box my-flex-col-c my-pd-10 my-bder-b-cc"  v-for="items in deviceList" :key="items">
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>设</text><text>备</text><text>型</text><text>号</text></view>
					<view class="txt">H601</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>铺</text><text>货</text><text>时</text><text>间</text></view>
					<view class="txt">{{items.createDate}}</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5" v-for="(item2,idx) in items.batteryNoList" :key="index">
					<view v-if="idx==0" class="text my-flex-row-b"><text>设</text><text>备</text><text>编</text><text>号</text></view>
					<view v-if="idx!=0" class="text my-flex-row-b"><text></text><text></text><text></text><text></text></view>
					<view class="txt">{{item2}}</view>
				</view>
			</view> -->
			<!-- x10设备信息 -->
		<!-- 	<view class="box my-flex-col-c my-pd-10 my-bder-b-cc">
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>设</text><text>备</text><text>型</text><text>号</text></view>
					<view class="txt">
						   X10
					<text style="margin-left: 300upx;">租借次数</text>
					</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>铺</text><text>货</text><text>时</text><text>间</text></view>
					<view class="txt">2020.5.26 15:30:34 12345</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5" v-for="(itm,index) in test2">
					<view v-if="index==0" class="text my-flex-row-b"><text>设</text><text>备</text><text>编</text><text>码</text></view>
					<view v-if="index!=0" class="text my-flex-row-b"><text></text><text></text><text></text><text></text></view>
					<view class="txt">
						 {{itm.NO}}
						<text style="margin-left: 120upx;color:#F3B249">{{itm.time}}次</text>
					</view>
				</view>
			</view> -->
		</view>
		<view class="my-mgt-15 btn1 my-bg-ye my-font-16 my-cl-white my-flex-row-c" @click="onTab(index)" v-if="!edit">
			回收设备
		</view>
         <!-- 编辑区 -->
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c" v-if="edit">
			<view class="my-flex-row-b box" style="margin-bottom: 10upx;">
				<text></text>
				<text class="my-font-16">商户信息</text>
				<image src="/static/team/edit-2.png" class="icon my-flex-self-e" mode="" @tap="onCancel"></image>
			</view>
			<view class="box my-flex-col-c">
				<view class="my-flex-row box my-cl-grey">
					<view class="text my-flex-row-b"><text>商</text><text>户</text><text>名</text><text>称</text></view>
					<input class="input-txt my-mgl-30 " type="text" @blur="blurBusinessName" :value="businessName"
					 :placeholder="com.businessName" placeholder-class="my-cl-grey" />
				</view>
				<view class="my-flex-row box my-cl-grey">
					<view class="text my-flex-row-b my-flex-self-s"><text>商</text><text>户</text><text>地</text><text>址</text></view>
					<input class="input-txt my-mgl-30 " @blur="blurAddress" type="text" :value="address||com.address" :placeholder="com.address"
					 placeholder-class="my-cl-grey" disabled="true"/>
				</view>
				
				
				<!-- 商户类型 选择-->
				<view class="my-flex-row box my-cl-grey">
					<view class="text my-flex-row-b my-flex-self-s" style="width: 130upx;"><text>商</text><text>户</text><text>类</text><text>型</text></view>
					
					<picker @change="bindPickerChange" :value="index" :range="array" mode = "selector" class="my-flex-row">
					    <view style="position: relative;">
						<!-- <view class="my-mgl-15 my-font-14 my-mgt-1 txt">{{array[index]}}</view> -->
						<input class="input-txt my-mgl-30 " type="text" :value="array[index]" :placeholder="com.address"
						 placeholder-class="my-cl-grey" disabled="true"/>
						<view class="trangle" style="right: 190upx;"></view>
						</view>
					</picker>
				</view>
				 
				
				
				<view class="my-flex-row box my-cl-grey">
					<view class="text my-flex-row-b"><text>联</text><text>系</text><text>人</text></view>
					<input class="input-txt my-mgl-30" @blur="blurName" type="text" :value="name" :placeholder="com.name"
					 placeholder-class="my-cl-grey" />
				</view>
				<view class="my-flex-row box my-cl-grey">
					<view class="text my-flex-row-b"><text>联</text><text>系</text><text>电</text><text>话</text></view>
					<input class="input-txt my-mgl-30" @blur="blurPhone" type="text" :value="phone" :placeholder="com.phone"
					 placeholder-class="my-cl-grey" />
				</view>
				<!-- <view class="my-flex-row box my-cl-grey">
					<view class="text my-flex-row-b"><text>定</text><text>位</text></view>
					<text class="input-txt my-mgl-30">{{address||com.address}}</text>
				</view> -->
		
				<view class="my-flex-row-b box my-cl-white my-mgt-5">
					<view class="text"></view>
					<view class="txt" style="text-align: right;">
						<!-- <view class="btn my-bg-ye my-flex-row-c" @click="onCall">
							<image src="/static/team/delete.png" class="icon" mode=""></image>
							<text class="my-mgl-8">删除商户</text>
						</view> -->
						<view class="btn my-bg-ye my-flex-row-c" @click="onAddress">
							<image src="/static/team/location.png" class="icon" mode=""></image>
							<text class="my-mgl-8">重新定位</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c" v-if="edit">
			<text class="my-font-16">商户分润</text>
			<view class="box my-flex-col-c">
				<!-- <view class="my-flex-row box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>商</text><text>户</text><text>分</text><text>润</text><text>金</text><text>额</text></view>
					<input class="w-100 my-mgl-30 my-bder-b" type="digit" value="" :placeholder="com.benefit" placeholder-class="my-cl-grey" /><text>元</text>
				</view> -->
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="txt my-flex-row-align-c">
						<text :class="com.noStandardProfit===false?'my-cl-ye':'my-cl-grey'">标准分润</text>
						<switch :checked="com.noStandardProfit" color="#f8c470" class="tr my-mglr-10 my-flex-row-c" @change="switchChanges" />
						<text :class="com.noStandardProfit===true?'my-cl-ye':'my-cl-grey'">非标准分润</text>
					</view>
				</view>
				
				
				<view class="my-flex-row box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s" v-if="com.noStandardProfit==false"><text>标</text><text>准</text><text>分</text><text>润</text></view>
					<view class="text my-flex-row-b my-flex-self-s" v-if="com.noStandardProfit==true"><text>非</text><text>标</text><text>准</text><text>分</text><text>润</text></view>
					<input class="w-50 text my-bder-b my-flex-row-align-c" type="digit" @blur="blurProfit" :value="profit" :placeholder="com.profitScale"
					 placeholder-class="my-cl-grey" /><text>%</text>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>查</text><text>看</text><text>订</text><text>单</text><text>权</text><text>限</text></view>
					<view class="txt my-flex-row-align-c">
						<text :class="com.orderPermission===false?'my-cl-ye':'my-cl-grey'">关</text>
						<switch :checked="com.orderPermission" color="#f8c470" class="tr my-mglr-10 my-flex-row-c" @change="switchChange" />
						<text :class="com.orderPermission===true?'my-cl-ye':'my-cl-grey'">开</text>
					</view>
				</view>
			</view>
		</view>
		<view class="my-mgt-5 my-pd-10 my-bg-white box my-flex-col-c" v-if="edit">
			<text class="my-font-16">收费设置</text>
			<view class="box my-flex-col-c">
				<!-- <view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>累</text><text>计</text><text>收</text><text>益</text></view>
					 <view class="txt">{{amount}}元</view>
				</view> -->
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>计</text><text>费</text><text>单</text><text>价</text></view>
					<view class="txt my-flex-col">
						<view class="txt my-flex-row-align-c">
							<text>H60</text>
							<input class="w-50 my-mgl-30 my-bder-b" v-model="unitPrice" @blur="blurUnitPrice" type="digit" value="" :placeholder="com.H60"
							 placeholder-class="my-cl-grey" /><text>元/小时</text>
						</view>
						<!-- <view class="txt my-flex-row-align-c">
							<text>X10</text>
							<input class="w-50 my-mgl-30 my-bder-b" type="digit" value="" :placeholder="com.X10" placeholder-class="my-cl-grey" /><text>元/小时</text>
						</view> -->
					</view>
				</view>
				<view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>封</text><text>顶</text><text>值</text></view>
					<view class="txt my-flex-row-align-c">
						<input @blur="blurTop" type="digit" v-model="topPrice" value="" class="w-50 text my-bder-b my-flex-row-align-c" :placeholder="com.capping"></input>
						<text>元</text>
					</view>
				</view>
				
				<!-- <view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b my-flex-self-s"><text>计</text><text>费</text><text>单</text><text>价</text></view>
					<view class="txt my-flex-col">
						<view class="txt my-flex-row-align-c">
							<text>X10</text>
							 <view style="position: relative;">
							 <input @click="showlists" type="text" :value="first.name" disabled="true" style="text-align: center;" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"/>
							 <view :class="showlist===false?'trangle':'trangle2'" @click="showlists"></view>
							 <view class="alllist" v-if="showlist">
							 <view class="list" v-for="(item,index) in prices" :key="item">
							 	<text :class="item.isselect===true?'color_select':''" style="width: 100%;" @click="showselect(index)">{{item.name}}</text>
							 </view>
							 </view>
							 </view>
						</view>
					</view>
				</view> -->
				<!-- <view class="my-flex-row-b box my-cl-grey my-mgt-5">
					<view class="text my-flex-row-b"><text>封</text><text>顶</text><text>值</text></view>
					<view class="txt my-flex-row-align-c">
						<input @blur="blurTop2" type="digit" value="" class="w-50 text my-bder-b my-flex-row-align-c" :placeholder="com.capping"></input>
						<text>元</text>
					</view>
				</view>
				<view style="width: 10upx;height:230upx;"></view> -->
			</view>
		</view>
		<view class="my-mgt-15 btn1 my-bg-ye my-font-16 my-cl-white my-flex-row-c" @click="onAmend" v-if="edit">保存</view>
		<goTop :top="top"></goTop>
	</view>
</template>

<script>
	import goTop from "../../../components/goTop/goTop"
	import req from "../../../util/req.js"
	export default {
		data() {
			return {
				deviceprice:[],
				parentProfitScale:null,
				array:null,
				amount:null,
				first:null,
				showlist:false,
				profitAmount:null,
				index: 0,
				edit: false,
				top: false,
				mer: [],
				addxress: [],
				com: [],
				id: 0,
				longitude: null,
				latitude: null,
				address: "",
				address1: "",
				name: "",
				phone: "",
				profit:null,
				unitPrice: "",
				topPrice: "",
				topPrice2:'',
				deviceList:[],
				price:[
					'1元/1小时',
					'4元/2小时',
					'5元/3小时',
					'6元/5小时',
					'8元/8小时',
					'12元/12小时',
				],
				prices:[
					{"name":'1元/1小时',"isselect":false},
					{"name":'4元/2小时',"isselect":false},
					{"name":'5元/3小时',"isselect":false},
					{"name":'6元/5小时',"isselect":false},
					{"name":'8元/8小时',"isselect":false},
					{"name":'12元/12小时',"isselect":false},
				]
			}
		},
		components: {
			goTop
		},
		computed: {

		},
		onLoad(options) {
			// console.log(options)
			this.id = Number(options.id) || 0
      // 获取商户类型
      var params={};
      req.request('GET', params, '/proxy/business/get/business-type', '加载中',(res)=>{
      	if(res.statusCode === 200){
      		console.log(res.data.data)
      		this.array=res.data.data;
      	}
      })
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
			if (this.scrollTop > 0) {
				this.top = true
			} else {
				this.top = false
			}
		},
		onShow() {
			this.getBuiness()
		},
		methods: {
			// pick选择商户类型
			bindPickerChange(e){
				this.index=Number(e.detail.value)
				this.type=this.array[this.index]
			},
			// 设备管理
			toserve(index){
				uni.navigateTo({
					url:"/pages/team/com/deviceManage?deviceNo="+index
				})
			},
			showselect(index){
				this.prices[index].isselect=!this.prices[index].isselect;
			},
			// 显示列表
			showlists(){
				this.showlist=!this.showlist;
				var sure=[];
				for (var i=0;i<this.prices.length;i++) {
					if(this.prices[i].isselect==true){
						sure.push(this.prices[i]);
						this.first=sure[0];
				     }
			    };
				if(this.first.isselect==false){
					this.first={'name':"请选择单价"}
				}
				
			},
			// H60封顶值
			blurTop(e) {
				let val = e.detail.value
				this.topPrice = val
			},
			// H60单价值
			blurUnitPrice(e) {
				let val = e.detail.value
				this.unitPrice = val
			},
			// X10封顶值
			blurTop2(e) {
				let val = e.detail.value
				this.topPrice2 = val
			},
			blurProfit(e) {
				let val = e.detail.value
				this.profit = val
			},
			blurPhone(e) {
				let val = e.detail.value
				this.phone = val
			},
			blurName(e) {
				let val = e.detail.value
				this.name = val
			},
			blurType(e) {
				let val = e.detail.value
				this.type = val
			},
			blurBusinessName(e) {
				let val = e.detail.value
				this.businessName = val
			},
			blurAddress(e) {
				let val = e.detail.value
				this.address1 = val
			},
			getBuiness() {
				let params = {

				}
				req.request('GET', params, '/proxy/business/' + this.id, '加载中', (res) => {
					if (res.statusCode === 200) {
						this.com = res.data.data.business
						// 分润金额
						this.profitAmount=res.data.data.profitAmount
						// 标准分润极限值
						if(res.data.data.parentProfitScale){
						this.parentProfitScale=res.data.data.parentProfitScale
						}
						this.amount=res.data.data.amount;
						this.deviceList=res.data.data.deviceList
						// 获取H60的封顶值和单价
						var arrs=this.deviceList;
						var arr2=[];
						for(var i=0;i<arrs.length;i++){
							if(arrs[i].deviceModelName=='H60'){
								arr2.push(arrs[i]);
							}
						}
						this.deviceprice=arr2;
						if(arr2.length>0){
							this.unitPrice = arr2[0].unitPrice||0;
							this.topPrice = arr2[0].top||0;
						}else{
							this.unitPrice = '0';
							this.topPrice = '0';
						}
						console.log(this.unitPrice);
						console.log(this.topPrice);
						// 选择商户类型
						for (var i=0;i<this.array.length;i++) {
							if(this.com.type==this.array[i]){
								this.index=i;
							}
						}
					}
				})
			},
			onTab() {
				uni.navigateTo({
					url: "/pages/team/edit/alone-dev?type=" + 1+'&&id='+this.id
				})
			},
			onCancel() {
				this.edit = false
			},
			onEdit() {
				this.edit = true
			},
			onInfo(e) {
				this.$emit('index', e)
			},
			onCall() {
				let mobile = this.com.phone
				uni.makePhoneCall({
					// 手机号
					phoneNumber: mobile,
				})
			},
			onNav() {
				uni.openLocation({
					latitude: Number(this.com.addressLatitude),
					longitude: Number(this.com.addressLongitude),
					name: this.com.businessName,
					address: this.com.address
				})
			},
			onAmend() {
				var sure=[];
				for (var i=0;i<this.prices.length;i++) {
					if(this.prices[i].isselect==true){
						sure.push(this.prices[i])
					}
				};
				uni.showModal({
					title: '确认修改',
					content: '是否确认修改？',
					cancelText: '否',
					confirmText: '是',
					success: res => {
						if (res.cancel) {
							// 用户点击了取消属性的按钮

						} else if (res.confirm) {
							// 用户点击了确定属性的按钮
							let params = {
								address:this.address||this.com.address,
								addressLatitude:this.latitude||this.com.addressLatitude,
								addressLongitude:this.longitude||this.com.addressLongitude,
								businessName:this.businessName||this.com.businessName,
								businessType:this.type||this.com.type,
								chargeList:[
									// H60数据
									{
									model:'H60',
									top:this.topPrice,
									unitPrice:this.unitPrice
								},
								// X10数据
								// {
								// 	model:'X10',
								// 	top:this.topPrice2,
								// 	unitPrice:sure
								// },
								],
								name:this.name||this.com.name,
								// 是否是非标准分润类型
								noStandardProfit: this.com.noStandardProfit,
								// 标准分润比例
								profitScale:this.profit||this.com.profitScale,
								// 非标准分润比例
								noStandardProfitScale:this.profit||this.com.profitScale,
								// 查看订单权限
								orderPermission:this.com.orderPermission,
								phone:this.phone||this.com.phone
							}
							// 标准分润,设置的分润值最多不超过返回的分润极限值
							if(this.com.noStandardProfit==false && this.profit>this.parentProfitScale){
								uni.showToast({
									title:"标准分润的设置范围为0--"+this.parentProfitScale+"%,请重新设置",
									icon:"none"
								});
								return;
							}
							// 非标准分润,分润值0--100%
							if(this.com.noStandardProfit==true && this.profit>100 || this.com.noStandardProfit==true && this.profit<0){
								uni.showToast({
									title:"非标准分润的设置范围为0--100%,请重新设置",
									icon:"none"
								});
								return;
							}
							console.log("数据返回的分润值")
							console.log(this.com.profitScale)
							console.log('提交的数据')
							console.log(params)
							console.log('提交的数据')
							req.request('POST', params, '/proxy/business/update/' + this.id, '加载中', (res) => {
								if (res.statusCode === 200) {
									console.log(res)
									uni.showToast({
										title: '修改成功！',
										icon: 'success'
									});
									this.edit = false;
									this.getBuiness()
								}
							})
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 获取当前地理位置
			getLocal: function(latitude, longitude) {

				var that = this
				uni.chooseLocation({
					success: function(res) {
						// console.log(res, "location")

						hasLocation: true,
						that.location = {
							longitude: res.longitude,
							latitude: res.latitude
						},
						that.address = res.address,
						that.latitude = res.latitude,
						that.longitude = res.longitude
						// console.log(that.data.location)
						//         var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
						//         var REGION_PROVINCE = [];
						//         var addressBean = {
						//           REGION_PROVINCE: null,
						//           REGION_COUNTRY: null,
						//           REGION_CITY: null,
						//           ADDRESS: null
						//         };

						//         function regexAddressBean(address, addressBean) {
						//           regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
						//           var addxress = regex.exec(address);
						//           addressBean.REGION_CITY = addxress[1];
						//           addressBean.REGION_COUNTRY = addxress[2];
						//           addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
						//           that.addxress= addxress
						//           // console.log(that.data.addxress, 111);
						//         }
						//         if (!(REGION_PROVINCE = regex.exec(res.address))) {
						//           regex = /^(.*?(省|自治区))(.*?)$/;
						//           REGION_PROVINCE = regex.exec(res.address);
						//           addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
						//           regexAddressBean(REGION_PROVINCE[3], addressBean);
						//         } else {
						//           addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
						//           regexAddressBean(res.address, addressBean);
						//         }
						//         that.setData({
						//           ADDRESS_1_STR: addressBean.REGION_PROVINCE + " " +
						//             addressBean.REGION_CITY + "" +
						//             addressBean.REGION_COUNTRY
						//         });
						// that.setData(addressBean);
						// that.getCode()
						// console.log(that.data.addressBean)
					},
					fail: function(res) {
						console.log(res);
					},
					complete: function(res) {
						// console.log(res);
					}
				});
			},
			//获取地理位置
			onAddress(e) {
				let vm = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						// console.log(JSON.stringify(res))
						var latitude = res.latitude
						var longitude = res.longitude
						var speed = res.speed
						var accuracy = res.accuracy;
						vm.getLocal(latitude, longitude)
						// console.log(this.addxress)
					},
					fail: function(res) {
						console.log('fail' + JSON.stringify(res))
					}
				})
			},
            // 是否允许查看订单
			switchChange: function(e) {
				this.com.orderPermission = !this.com.orderPermission 
			},
			// 分润类型
			switchChanges: function(e) {
				this.com.noStandardProfit = !this.com.noStandardProfit
				console.log(this.com.noStandardProfit)
				console.log(this.parentProfitScale)
			},
		}
	}
</script>

<style>
	page {
		padding-bottom: 30upx;
	}

	.img-box {
		width: 750upx;
	    height: 375upx;
	}

	.box {
		width: 100%;
	}

	.tr {
		transform: scale(0.5, 0.5);
		width: 70upx;
	}

	.h {
		height: 300upx;
	}

	.no-pic {
		width: 100upx;
	}

	.icon {
		width: 50upx;
		height: 50upx;
	}

	.txt {
		width: 480upx;
	}

	.text {
		width: 180upx;
	}

	.w-100 {
		width: 100upx;
	}

	.btn {
		width: 220upx;
		height: 60upx;
		border-radius: 30upx;
	}

	.btn1 {
		width: 420upx;
		height: 80upx;
		border-radius: 40upx;
	}

	.input-txt {
		width: 100%;
	}

	.my-absolute {
		bottom: -5%;
		right: 4%;
	}

	.w-50 {
		width: 50upx;
	}
	.serve{
		display: flex;
		flex-direction:row;
		align-items: center;
	}
	.trangle{
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 20upx 15upx 0 15upx;;
		border-color: #A3A3A3 transparent transparent transparent;
		position: absolute;
		right: 41upx;
		top:12upx;
	}
	.trangle2{
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0upx 15upx 20upx 15upx;;
		border-color:  transparent transparent #A3A3A3 transparent;
		position: absolute;
		right: 41upx;
		top:12upx;
	}
	.my-bg-EDF{
		background: #EDECEC;
		opacity: 0.5;
	}
	.my-bder-c3{
		border: 1upx dotted #C3C3C3;
	}
	.list{
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 300upx;
		margin-top: 10upx;
	}
	.alllist{
		border: 1upx solid #e3e3e3;
		text-align: center;
		right: 31upx;
		position: absolute;
	}
	.color_select{
		background-color: #FFA500;
	}
</style>
