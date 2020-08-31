<template>
	<view class="box my-flex-col-c">
		<view class="box my-pd-15 my-bg-f5">
			<image class="pic my-rds-10" src="/static/index/ad2.jpg" mode=""></image>
		</view>
		<view class="box my-flex-col-c my-bg-white my-pdlr-25">
			<view class="my-flex-row-c box my-pdtb-10">
				<view class="my-bder-b line"></view>
				<text class="my-mglr-25 my-font-16">X10线充租借</text>
				<view class="my-bder-b line"></view>
			</view>
			
			<view class="my-flex-row-align-c box my-mgr-25 my-pdb-20">
				<view style="width: 14upx; height: 32.4upx;" class="my-bg-ye"></view>
				<text class="my-font-14 my-mgl-10">设备编号 :  X1019111302348</text>
			</view>
			<view class="my-flex-row-align-c box my-mgr-25">
				<view style="width: 14upx; height: 32.4upx;" class="my-bg-ye"></view>
				<text class="my-font-14 my-mgl-10">套餐选择</text>
			</view>
			<view class="my-flex-row-r-wrap my-mgt-18 my-mgb-8 " style="width: 700upx;">
				<view class="my-flex-row-align-c my-mgb-10 my-bder-ye-light" v-for="(item,index) in tabbar" :key="index"
				 :class="select===index?'my-red':''" @click="ontabbar(index)">
					<view class=" my-flex-col-c my-bg-ye among">
						<view class="my-font-20">{{item.txt}}</view>
						<view class="my-font-16">{{item.txt1}}</view>
					</view>
				</view>
			</view>
			<view class="my-flex-row-align-c box my-mgr-25">
				<view style="width: 14upx; height: 32.4upx;" class="my-bg-ye"></view>
				<text class="my-font-14 my-mgl-10">使用说明</text>
			</view>
			<view class="my-flex-col my-font-14 my-mgt-13 my-mgb-54" style="width: 654upx; height: 149upx; align-content: flex-start">
				<text>1、请先确认充电设备上的红色指示灯已亮，直接选择需要的时长进行支付。</text>
				<text>2、支付成功后，页面将会弹出充电密码。</text>
				<text>3、在设备上输入正确的充电密码，即可开始充电。</text>
			</view>
			
			<view class="my-flex-row-c box my-mgt-20">
				<radio-group class="my-flex-row-align-c my-font-12">
					<radio color="#f8c470" :checked="checked" @click='onConsent' class="tr" />
					<text class="my-cl-grey">请阅读并同意</text>
					<text class="my-cl-ye">《服务协议》</text>
					<text class="my-cl-grey">与</text>
					<text class="my-cl-ye">《委托扣款授权书》</text>
				</radio-group>
			</view>
			<view class="my-flex-row-c box my-mgt-5">
				<view class="my-flex-col-c btn my-bg-ye my-cl-white my-boxsha-2" @click="onpay('QSPopup')">
					<text class="my-font-16">免押金租借</text>
					<text class="my-font-12 my-mgt-5">（ 微信支付分≥550免押金租借 ）</text>
				</view>
			</view>
			<view :class="showBl?'my-show':'my-hide'">
				<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
					<view class="my-bg-white my-rds-10 my-flex-col-c show1">
						<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp " v-if="isShow">
							<image src='../../static/my/tick1.png' class="pic1" mode=""></image>
							<view style="width: 489upx;">
								<view class="my-font-14 my-pdb-15 my-pdt-20" style="font-weight: bold; text-align: center;">支付成功</view>
							</view>
							<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgt-20" @click="onnewpay('QSPopup')">
								查看密码
							</view>
						</view>
						<view class="my-bg-white my-rds-10 my-flex-col-c my-flex-warp " v-else>
							<view style="width: 489upx;">
								<view class="my-font-14 my-pdb-15 my-pdt-20" style="font-weight: bold; text-align: center;">
									你的充电密码为
									<text class="my-cl-ye" style="text-decoration:underline">11221</text>
								</view>
							</view>
							<view class="my-flex-row-c btn1 my-cl-white my-bg-ye my-font-15 my-mgt-20" @click="onClose">
								{{countdown}}后关闭密码提示
							</view>
						</view>
					</view>
				</QSPopup>
			</view>
		</view>
	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue'
	export default{
		components:{
			QSPopup
		},
		data(){
			return{
				m:4,//分
				s:59,//秒
				countdown:'4min 59s',//倒计时
				timer:null,//重复执行
				isShow: true,
				checked:true,
				showBl:true,
				select: 0,
				tabbar:[{
					txt:'1h',
					txt1:'￥1.00'
				},{
					txt:'2h',
					txt1:'￥2.00'
				},{
					txt:'3h',
					txt1:'￥2.50'
				},{
					txt:'4h',
					txt1:'￥3.50'
				},{
					txt:'5h',
					txt1:'￥4.00'
				},{
					txt:'5m',
					txt1:'免费'
				}]
			}
		},
		onLoad(){
				
			},
		methods:{
			//同意《平台使用协议》
			onConsent(e) {
				let check = this.checked
				this.checked = !check
			},
			onpay(ref) {
				this.showBl=true
				this.$refs[ref].show();
			},
			ontabbar(e){
				this.select = e
			},
			onClose(){
				this.showBl=false
				uni.navigateBack({
					delta:1,
				})
			},
			onnewpay() {
				this.isShow = false;
				this.timer = setInterval(()=>{
				         this.timeCount()
				     },1000)
			},
			timeCount(){
					--this.s;
				if(this.s<0){
					--this.m;
					this.s=59;
				}
				if(this.m <= 0){
					this.showBl=false
					uni.navigateBack({
						delta:1,
					})
				}
				this.countdown =this.m+"min "+this.s+"s";
				},
			}
		}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.my-bg-f5{
		background: #F5F5F5;
	}
	.box{
		width: 750upx;
	}
	.pic{
		width: 690upx;
		height: 260upx;
	}
	.box .box{
		width: 100%;
	}
	.line {
		width: 100upx;
		height: 5upx;
	}
	.txt-box{
		width: 110upx;
	}
	.txt{
		width: 400upx;
	}
	.tr{
		transform: scale(0.6,0.6);
	}
	.btn{
		width: 640upx;
		height: 100upx;
		border-radius: 50upx;
	}
	.show1{
		height: 406upx;
		width: 600upx;
		overflow: hidden;
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
	.pic1{
		width: 105upx;
		height: 105upx;
		margin-top: 20upx;
	}
	.my-relative{
		top: -20upx;
	}
	.among{
		width: 210upx;
		height: 120upx;
		border-radius: 10upx;
		color: #FFFFFF;
	}
	.my-red{
		border: #FF0000 solid 4upx;
		border-radius: 12upx;
	}
	.my-bder-ye-light{
		border-radius: 12upx;
	}
</style>
