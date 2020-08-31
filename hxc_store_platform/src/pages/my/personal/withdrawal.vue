<template>
	<view class="my-mgt-10 my-mglr-30">
	<view class="my-mgt-1 float my-flex-row-align-c" @click="tobell">
		账单
		<image src="/static/my/bill.png" class="icon my-pdl-10" mode=""></image>	
	</view>
	<view class="my-pdt-30 my-mgb-25 my-bold my-font-16">提现金额</view>
	<view class="box-w">
		<!-- <view >{{item.withdrawal}}</view> -->
		<view style="display: flex;align-items: center;">
			<input class="my-cl-ye my-font-20 my-bold" type="text" value="" @blur="moneys" style="text-align: center;"></input>
			<text class="my-cl-ye my-font-20 my-bold" style="display: inline-block;">元</text>
		</view>
		<view class="my-cl-a2 my-font-15 my-flex-row-align-c my-bder-t my-bold">
			<view class="dot my-bg-ye my-mgr-10"></view>
			可提现余额：
			<view class="my-cl-ye">{{balance}}元</view>
		</view>
		<view class="my-cl-a3 my-font-12" >
			<view :class="frozen?'my-show':'my-hide'">
				注：您有<view class="my-cl-ye">{{item.money1}}</view>的余额冻结，当余额金额达到冻结金额时将会被优先扣除。
			</view>
			<view :class="parterner?'my-show':'my-hide'">
				注：您为尊敬的联营合伙人，您的余额将会冻结<view class="my-cl-ye">{{item.money2}}</view>的租赁费用并在每个月的10号进行自动扣除。
			</view>
		</view>
		<view class="my-flex-row-c my-mgt-86 btn my-bg-ye my-cl-white my-boxsha-2 my-font-17" @click="onSet('QSPopup')">
				提现
		</view>
	</view>
	<view :class="showBl?'my-show':'my-hide'">
	    <QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
	        <view class="my-bg-white my-rds-10 my-flex-col-c show1">
	           <!-- <view class="btn1 my-bder-ye my-flex-row-c my-mgt-10 my-font-15">
	                <image src="../../../static/my/phone.png" class="icon my-mglr-5"></image>
	                <input placeholder-class="my-cl-a2" type="text" placeholder="153XXXX4093" />
	            </view>
	            <view class="btn1 my-bder-ye my-flex-row-c my-mgt-10 my-font-15">
	                <image src="../../../static/my/verify.png" class="icon my-mglr-5"></image>
	                <input placeholder-class="my-cl-a2" type="text" placeholder="请输入验证码" />
	            </view>
	            <view class="my-cl-ye btn1 my-flex-row-b">
	                <view></view>
	                <view @click="onSet2('QSPopup')">获取验证码>></view>
	            </view> -->
				<view class="my-flex-row-c">
					<image src="../../../static/my/success.png" class="success_profit"></image>
				</view>
				<view class="my-flex-row-c">					 
					<text class="success">提现成功</text>
				</view>
	            <view class="my-flex-row-c ">
	                <view class=" btn1 my-bg-ye my-cl-white my-flex-row-c my-mgt-10 my-font-15" @click="onAffirm">
	                    返回上级
	                </view>                        
	            </view>
	        </view>
	     </QSPopup>
	</view>
	<!-- 以下提现成功是在余额冻结时的提现 正常提现是要输入验证码 -->
	<!-- <view :class="showBl?'my-show':'my-hide'">
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="my-bg-white my-rds-10 my-flex-col-c show1">
				<image src="/static/QSpop/OK.png" class="icon2 my-mgb-10" mode=""></image>
				<text>提现成功</text>
				<view class="my-flex-row-c ">
					<view class=" btn1 my-bg-ye my-cl-white my-flex-row-c my-mgt-10 my-font-15" @click="onAffirm">
						返回上一级
					</view>						
				</view>
			</view>
		</QSPopup>
	</view> -->
  </view>
</template>

<script>
import QSPopup from '@/components/QS-popup/QS-popup.vue';
import req from '@/util/req.js';
	export default {
		data() {
			return {
				balance:null,
				showBl:true,
				withdraw:0,
			}
		},
		components: {
			QSPopup
		},
		computed: {
	
		},
		onLoad(options) {
			var isBusiness = uni.getStorageSync('openIdBindByBusiness') || false
			if (isBusiness === true) {
				this.getPersonal()
			}else{
				this.getproxypersonal()
			}
			// this.balance=uni.getStorageSync("balance");
		},
		onShow() {
	
		},
		methods: {
			getPersonal() {
				let params = {
			
				}
				req.request('POST', params, '/proxy/business/personal', '加载中', (res) => {
					if (res.statusCode === 200) {
						this.balance = res.data.data.balance
					}
				})
			},
			getproxypersonal(){
				let params = {
				
				}
				req.request('POST', params, '/proxy/personal', '加载中', (res) => {
					if (res.statusCode === 200) {
						this.balance = res.data.data.balance
					}
				})
			},
			tobell(){
				uni.navigateTo({
					url: "/pages/my/personal/recordDetial"
				})
			},
			// 提现金额
			moneys(e){
				console.log(e.detail.value)
				this.withdraw=e.detail.value;
			 
			},
			onAffirm(){
				this.showBl=false
				// uni.navigateBack({
				// 	delta:1,
				// })
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			onClose(){
				this.showBl=false
			},
			onSet(ref) {
				var money1=parseFloat(this.withdraw)
				var money2=parseFloat(this.balance)
				if(money2<money1){
					uni.showToast({
						title:"提现金额超过余额，请重新输入",
						icon:"none"
					})
					return;
				}
				if(money1==0){
					uni.showToast({
						title:"提现金额不能为0元",
						icon:"none"
					})
					return;
				}
				var isbusiness=uni.getStorageSync("openIdBindByBusiness");
				if(isbusiness==false){
					let params = {
					   amount:money1
					}
					req.request('POST', params, '/proxy/proxy/withdrawal', '加载中', (res) => {
						if (res.statusCode === 200) {
							console.log('提现成功！！！！')
							this.showBl=true
							this.$refs[ref].show(); 
						}
					})
				}else{
					let params = {
					   amount:money1
					}
					req.request('POST', params, '/proxy/business/withdrawal', '加载中', (res) => {
						if (res.statusCode === 200) {
							console.log('商户提现成功！！！！')
							this.showBl=true
							this.$refs[ref].show(); 
						}
					})
				}
				
			},
		}
	}	
</script>

<style >
	page {
		background: #FFFFFF;
		padding-bottom: 0;
	}
	.box-w{
		width: 488upx;
	}
	.icon{
		width: 40upx;
		height: 40upx;
	}
	.float{
		float: right;
		margin-right:10upx ;
	}
	.show1{
		height: 406upx;
		width: 600upx;
		overflow: hidden;
	}
	.btn1{
		width: 400upx;
		height: 60upx;
		border-radius: 50upx;
	}
	.icon2{
		width: 120upx;
		height: 120upx;
	}
	.success{
		font-size: 24upx;
		margin: 27upx 0 17upx 0;
	}
	.success_profit{
		width: 100upx;
		height:100upx;
	}
</style>
