<template>
	<view class="my-flex-col box my-pdlr-15 my-font-16">
		<view class="my-flex-row-align-c box my-mgt-10">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt my-flex-row-b">
				<text>姓</text><text>名</text>
			</view>
			<input @blur="blurNickName" type="text" value="" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"  />
			<view class="my-cl-ye">*</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt my-flex-row-b">
				<text>手</text><text>机</text><text>号</text>
			</view>
			<input @blur="blurMobile" type="text" maxlength="11" value="" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"/>
		    <view class="my-cl-ye">*</view>
		</view>
	    <view class="my-flex-row-align-c box my-mgt-10">
	    	<view class="r my-bg-ye"></view>
	    	<view class="my-mgl-15 txt my-flex-row-b">
	    		<text>用</text><text>户</text><text>名</text>
	    	</view>
	    	<input @blur="blurName" type="text" value="" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14  my-bder-c3 my-rds-5"  />
	    	<view class="my-cl-ye">*</view>
	    </view>
		<view style="font-size: 20upx; margin-left: 190upx;color: #CCCCCC; padding-top: 10upx;">注：用户名需由英文字母与数字结合而成</view>
		
		<view class="my-flex-row-align-c box my-mgt-10">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt my-flex-row-b">
				<text>密</text><text>码</text>
			</view>
			<input @blur="blurPass" type="text" value="" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"  />
			<view class="my-cl-ye">*</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt my-flex-row-b">
				<text>邮</text><text>箱</text>
			</view>
			<input @blur="blueEmail" type="text" value="" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"  />
			<view class="my-cl-ye">*</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id==2">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt my-flex-row-b">
				<text>商</text><text>户</text><text>名</text>
			</view>
			<input @blur="blurBusinessName" type="text" value="" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"/>
			<view class="my-cl-ye">*</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id!==2">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt my-flex-row-b">
				<text>地</text><text>址</text>
			</view>
			<input @blur="blurAddress" type="text" :value="address" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"  />
			<view class="my-bg-ye addBtn2 my-mgl-5 my-flex-row-c my-rds-2" @click="onAddress">
				<image src="../../../static/team/address-2.png" class="icon"></image>
			</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id==2">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt my-flex-row-b">
				<text>地</text><text>址</text>
			</view>
			<input @blur="blurAddress" type="text" :value="address" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"  />
			<view class="my-cl-ye">*</view>
		</view>
		<view class="my-flex-row my-mgt-10" v-if="id==2">
			<view class="my-bg-ye addBtn" @click="onAddress">
				<text class="my-cl-white my-mgt-2 my-font-12">获取定位</text>
			</view>
		</view>
		<view class="my-flex-row my-mgt-10" v-if="id==2">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt1 my-flex-row-b">
				<text>商</text><text>户</text><text>类</text><text>型</text>
			</view>
			<view class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5" style="width: 300upx; height: 50upx;" >
			    <picker @change="bindPickerChange" :value="index" :range="array" mode = "selector" class="my-flex-row">
			        <view style="position: relative;">
					<view class="my-mgl-15 my-font-14 my-mgt-1 txt">{{array[index]}}</view>
					<view class="trangle"></view>
					</view>
			    </picker>
			</view>
			<view class="my-cl-ye">*</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id==2">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt1 my-flex-row-b">
				<text>身份证号码</text>
			</view>
			<view style="width: 360upx;display: inline-block;">
			<input @blur="blurIdCard" type="text" value="" class="my-bg-EDF my-mgt-2 my-mglr-15 my-font-14 my-bder-c3 my-rds-5"/>
			</view>
			<view class="my-cl-ye">*</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id==2">
			<view class="r my-bg-ye"></view>
			<view class="my-mgl-15 txt1 my-flex-row-b">
				<text>银行卡号码</text>
			</view>
			<view style="width: 335upx;display: inline-block;">
			<input @blur="blurBankCard" type="text" value="" class="my-bg-EDF my-mgt-2 my-mgl-15 my-font-14 my-bder-c3 my-rds-5"/>
		    </view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id!==2" >
			<view class="r my-bg-ye"></view>
			<text class="my-mgl-15">身份证正反面</text>
			<view class="my-cl-ye my-mgl-15">*</view>
		</view>
		<view class="my-flex-col-c my-mgt-10 box" v-if="id!==2" >
			<view class="my-flex-row-r box">
				<uploadImg :width="300" :height="200" @chooseimg="onIdFront">
				</uploadImg>
				<uploadImg :width="300" :height="200" @chooseimg="onIdReverse">
				</uploadImg>
			</view>
			<text class="my-cl-grey my-font-13 my-mgt-10" >注:请上传代理本人真实身份证正反面，用于身份核实</text>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id!==2" >
			<view class="r my-bg-ye"></view>
			<text class="my-mgl-15">银行卡正反面</text>
			<view class="my-cl-ye my-mgl-15">*</view>
		</view>
		<view class="my-flex-col-c my-mgt-10 box" v-if="id!==2" >
			<view class="my-flex-row-r box">
				<uploadImg :width="300" :height="200" @chooseimg="onCardFront">
					<image src="/static/index/card.png" mode=""></image>
				</uploadImg>
				<uploadImg :width="300" :height="200" @chooseimg="onCardReverse">
				</uploadImg>
			</view>
			<text class="my-cl-grey my-font-13 my-mgt-10" >注:请上传与代理本人身份证绑定的银行卡，用于提现收益</text>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id==2">
			<view class="r my-bg-ye"></view>
			<text class="my-mgl-15">合作协议照片</text>
			<view class="my-cl-ye my-mgl-15">*</view>
		</view>
		<view class="my-flex-col-c my-mgt-10 box mgl-18 " v-if="id==2">
			<view class="box">
				<uploadImg :width="500" :height="270" @chooseimg="onBusinessFront">
				</uploadImg>
			</view>
		</view>
		<view class="my-flex-row-align-c box my-mgt-10" v-if="id==2">
			<view class="r my-bg-ye"></view>
			<text class="my-mgl-15">商户门头照片</text>
			<view class="my-cl-ye my-mgl-15">*</view>
		</view>
		<view class="my-flex-col my-mgt-10  box mgl-18 " v-if="id==2">
			<view class=" box">
				<uploadImg :width="500" :height="270" @chooseimg="onBusinessReverse">
				</uploadImg>
			</view>
		</view>
		<!--view v-if="id===2">
			<view class="my-flex-row-align-c box my-mgt-10">
				<view class="r my-bg-ye"></view>
				<text class="my-mgl-15">营业执照、门头照片</text>
			</view>
			<view class="my-flex-col-c my-mgt-10 box">
				<view class="my-flex-row-r box">
					<uploadImg :width="300" :height="200" @chooseimg="onBusinessFront">
					</uploadImg>
					<uploadImg :width="300" :height="200" @chooseimg="onBusinessReverse">
					</uploadImg>
				</view>
				<text class="my-cl-grey my-font-13 my-mgt-10">注:请上传代理所属公司的营业执照和门头照片</text>
			</view>
		</view-->
		<view class="my-flex-col-c box my-mgt-30">
			<view class="my-flex-row-align-c">
				<view class="circle my-bder-cc my-flex-row-c" :class="agree?'my-bder-ye':'my-bder-cc'" @click="onAgree">
					<view :class="agree?'dot my-bg-ye':''"></view>
				</view>
				<text class="my-cl-grey my-font-12 my-mgl-10" v-if="id===2">点击立即成为商户，即代表默认同意<text class="my-cl-ye my-font-12">《小电兜代理合作协议》</text></text>
				<text class="my-cl-grey my-font-12 my-mgl-10" v-else>点击立即成为代理，即代表默认同意<text class="my-cl-ye my-font-12">《小电兜代理合作协议》</text></text>
			</view>
			<view class="btn my-mgt-10 my-font-18 my-cl-white my-bg-ye my-flex-row-c my-boxsha-2" @click="onMer" v-if="id===2">新增商户</view>
			<view class="btn my-mgt-10 my-font-18 my-cl-white my-bg-ye my-flex-row-c my-boxsha-2" @click="onAgency" v-else>新增代理</view>
		</view>
	</view>
</template>

<script>
	import uploadImg from "@/components/amazarashi-uploadimg/uploadImg.vue"
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				id: 2,
				agree: true,
				name: "",
				mobile: "",
				nickname: "",
				pass: "",
				email: "",
				address: "",
				address1: "",
				idFront: "",
				idReverse: "",
				cardFront: "",
				cardReverse: "",
				businessFront: "",
				businessReverse: "",
				businessName: "",
				latitude: "",
				longitude: "",
				index:0,
				array:null,
				type:"餐厅",
				current:'',
				idNumber:"",
				bankCard:""
			}
		},
		components: {
			uploadImg
		},
		computed: {

		},
		onLoad(options) {
			this.id = Number(options.id)
			if (this.id === 0) {
				uni.setNavigationBarTitle({
					title: '新增代理'
				})
			}
			if (this.id === 2) {
				uni.setNavigationBarTitle({
					title: '新增商户'
				})
			}
			// 获取商户类型 
			var params={};
			req.request('GET', params, '/proxy/business/get/business-type', '加载中',(res)=>{
				if(res.statusCode === 200){
					console.log(res.data.data)
					this.array=res.data.data;
				}
			})
		},
		methods: {
			bindPickerChange(e){
				this.index=Number(e.detail.value)
				this.type=this.array[this.index]
			},
			onType(e){
				this.current=e
				if(e===0){
					this.type="RESTAURANT"
				}else{
					this.type="HOTEL"
				}
			},
			//获取地理位置
			onAddress(e) {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						var latitude = res.latitude
						var longitude = res.longitude
						var speed = res.speed
						var accuracy = res.accuracy;
						this.getLocal(latitude, longitude)
					},
					fail: function(res) {
						console.log('fail' + JSON.stringify(res))
					}
				})
			},
			// 获取当前地理位置
			getLocal: function(latitude, longitude) {
				var that = this
				uni.chooseLocation({
					success: (res) => {
						// console.log(res, "location")
						that.hasLocation = true,
							that.location = {
								longitude: res.longitude,
								latitude: res.latitude
							},
							that.address = res.address,
							that.latitude = res.latitude,
							that.longitude = res.longitude
						var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
						var REGION_PROVINCE = [];
						var addressBean = {
							REGION_PROVINCE: null,
							REGION_COUNTRY: null,
							REGION_CITY: null,
							ADDRESS: null
						};

						function regexAddressBean(address, addressBean) {
							regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
							var addxress = regex.exec(address);
							addressBean.REGION_CITY = addxress[1];
							addressBean.REGION_COUNTRY = addxress[2];
							addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
							that.addxress = addxress
						}
						if (!(REGION_PROVINCE = regex.exec(res.address))) {
							regex = /^(.*?(省|自治区))(.*?)$/;
							REGION_PROVINCE = regex.exec(res.address);
							addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
							regexAddressBean(REGION_PROVINCE[3], addressBean);
						} else {
							addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
							regexAddressBean(res.address, addressBean);
						}
						that.ADDRESS_1_STR = addressBean.REGION_PROVINCE + " " +
							addressBean.REGION_CITY + "" +
							addressBean.REGION_COUNTRY
						that.addressBean = addressBean;
					},
					fail: function(res) {
						console.log(res);
					},
					complete: function(res) {
						// console.log(res);
					}
				});
			},
			onMer() {
				if (this.idNumber === "") {
					uni.showToast({
						title: "您没有填身份证哦~",
						icon: "none"
					})
				}
				if (this.bankCard === "") {
					uni.showToast({
						title: "您没有填银行卡哦~",
						icon: "none"
					})
				}
				if (this.name === "") {
					uni.showToast({
						title: "您没有填姓名哦~",
						icon: "none"
					})
				}
				if(this.type===""){
					uni.showToast({
						title: "您没有填商户类型哦~",
						icon: "none"
					})
				}
				if (this.address === "") {
					uni.showToast({
						title: "您没有填地址哦~",
						icon: "none"
					})
				}
				if (this.email === "") {
					uni.showToast({
						title: "您没有填邮箱哦~",
						icon: "none"
					})
				}
				if (this.nickname === "") {
					uni.showToast({
						title: "您没有填用户名哦~",
						icon: "none"
					})
				}
				if (this.mobile === "") {
					uni.showToast({
						title: "您没有填手机号哦~",
						icon: "none"
					})
				}
				if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '您输入的号码有误，请重填',
						icon: 'none'
					})
					return false;
				}
				if (this.pass === "") {
					uni.showToast({
						title: "您没有填密码哦~",
						icon: "none"
					})
				}
				if (this.businessFront === "") {
					uni.showToast({
						title: "您没有填合作协议哦~",
						icon: "none"
					})
				}
				if (this.businessReverse === "") {
					uni.showToast({
						title: "您没有填门头照片哦~",
						icon: "none"
					})
				}
				if (this.businessName === "") {
					uni.showToast({
						title: "您没有填商户名哦~",
						icon: "none"
					})
				}
				if (this.latitude === "" || this.longitude === "") {
					uni.showToast({
						title: "您没有填经纬度哦~",
						icon: "none"
					})
				}
				if (this.name !== "" && this.email !== "" && this.businessName !== ""  && this.businessReverse !==
					"" && this.latitude !== "" && this.longitude !== "" && this.address !== "" && this.pass !== "" && this.mobile !==
					"" && this.nickname !== "" && this.businessFront !== "" &&this.idNumber !== "" &&this.bankCard !== "") {
					let params = {
						addressLatitude: this.latitude,
						addressLongitude: this.longitude,
						address: this.address,
						email: this.email,
						password: this.pass,
						phone: this.mobile,
						name: this.nickname,
						userName: this.name,
						agreementUrl: this.businessFront,
						bankCardNumber:this.bankCard,
						logoUrl: this.businessReverse,
						idCardNumber:this.idNumber,
						type: this.type,
						businessName: this.businessName,
					}
					req.request('POST', params, '/proxy/business', '加载中', (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.navigateBack({
								delta: 1,
								success: () => {
									uni.showToast({
										title: "添加成功！",
										icon: "success"
									})
								}
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							})
						}
					})
				}
			},
			onAgency() {
				if (this.name === "") {
					uni.showToast({
						title: "您没有填姓名哦~",
						icon: "none"
					})
				}
				if (this.address === "") {
					uni.showToast({
						title: "您没有填地址哦~",
						icon: "none"
					})
				}
				if (this.email === "") {
					uni.showToast({
						title: "您没有填邮箱哦~",
						icon: "none"
					})
				}
				if (this.cardFront === "") {
					uni.showToast({
						title: "您没有填银行卡正面哦~",
						icon: "none"
					})
				}
				if (this.cardReverse === "") {
					uni.showToast({
						title: "您没有填银行卡反面哦~",
						icon: "none"
					})
				}
				if (this.nickname === "") {
					uni.showToast({
						title: "您没有填用户名哦~",
						icon: "none"
					})
				}
				if (this.mobile === "") {
					uni.showToast({
						title: "您没有填手机号哦~",
						icon: "none"
					})
				}
				if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '您输入的号码有误，请重填',
						icon: 'none'
					})
					return false;
				}
				if (this.pass === "") {
					uni.showToast({
						title: "您没有填密码哦~",
						icon: "none"
					})
				}
				if (this.idFront === "") {
					uni.showToast({
						title: "您没有填身份证正面哦~",
						icon: "none"
					})
				}
				if (this.idReverse === "") {
					uni.showToast({
						title: "您没有填身份证反面哦~",
						icon: "none"
					})
				}
				if (this.name !== "" && this.email !== "" && this.cardFront !== "" && this.cardReverse !== "" && this.idFront !==
					"" && this.idReverse !== "" && this.address !== "" && this.pass !== "" && this.mobile !== "" && this.nickname !==
					"") {
					let params = {
						address: this.address,
						bankCardImageBack: this.cardReverse,
						bankCardImageFront: this.cardFront,
						idCardImageBack: this.idReverse,
						idCardImageFront: this.idFront,
						mail: this.email,
						password: this.pass,
						phone: this.mobile,
						proxyName: this.nickname,
						userName: this.name
					}
					req.request('POST', params, '/proxy/api/proxy/sub/create', '加载中', (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.navigateTo({
								url: "/pages/team/agency/agency",
								success: () => {
									uni.showToast({
										title: "添加成功！",
										icon: "success"
									})
								}
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							})
						}
					})
				}
			},
			onBusinessReverse(e) {
				this.businessReverse = e.src
			},
			onBusinessFront(e) {
				this.businessFront = e.src
			},
			onCardReverse(e) {
				this.cardReverse = e.src
			},
			onCardFront(e) {
				this.cardFront = e.src
			},
			onIdReverse(e) {
				this.idReverse = e.src
			},
			onIdFront(e) {
				this.idFront = e.src
			},
			blurAddress(e) {
				let val = e.detail.value
				this.address = val
			},
			blueEmail(e) {
				let val = e.detail.value
				this.email = val
			},
			blurIdCard(e){
				let val = e.detail.value
				this.idNumber = val
			},
			blurBankCard(e){
				let val = e.detail.value
				this.bankCard = val
			},
			blurPass(e) {
				let val = e.detail.value
				this.pass = val
			},
			blurBusinessName(e) {
				let val = e.detail.value
				this.businessName = val
			},
			blurNickName(e) {
				let val = e.detail.value
				this.nickname = val
			},
			blurMobile(e) {
				let val = e.detail.value
				this.mobile = val
			},
			blurName(e) {
				let val = e.detail.value
				this.name = val
			},
			onAgree() {
				this.agree = !this.agree
			},
		}
	}
</script>

<style>
	page {
		padding-bottom: 30upx;
		background: #FFFFFF;
	}

	.box {
		width: 100%;
	}

	.txt {
		width: 178upx;
	}
    .txt1{
		width: 160upx;
	}
	.txt-address {
		width: 500upx;
	}

	.r {
		width: 8upx;
		height: 40upx;
		border-radius: 4upx;
	}

	.id {
		width: 300upx;
		height: 190upx;
		background: #F5F5F5;
	}

	.add {
		width: 60upx;
		height: 60upx;
	}

	.circle {
		width: 35upx;
		height: 35upx;
		border-radius: 50%;
		position: relative;
		top: -10upx;
	}

	.btn {
		width: 690upx;
		height: 90upx;
		border-radius: 45upx;
	}
	.my-bg-EDF{
		background: #EDECEC;
		opacity: 0.5;
	}
	.my-bder-c3{
		border: 1upx dotted #C3C3C3;
	}
	.addBtn{
		margin-left: 237upx;
		width: 286upx;
		height: 50upx;
		border-radius: 10upx;
		text-align: center;
	}
	.trangle{
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 20upx 15upx 0 15upx;;
		border-color: #A3A3A3 transparent transparent transparent;
		position: absolute;
		right:-83upx;
		top: 14upx;
	}
	.mgl-18{
		margin-left: 37upx;
	}
	.addBtn2{
		width: 75upx;
		height: 40upx;
	}
	.icon{
		width: 32upx;
		height: 32upx;
	}
</style>
