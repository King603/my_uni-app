<template>
	<view class="my-flex-col">
		<view class="my-mglr-20 my-flex-col my-relative my-bder-b-cc">
			<view class="my-flex-row">
				<view class="name my-flex-row-b my-mgt-15">
					<text>姓</text>
					<text>名</text>
				</view>
				<input type="text" :value="proxyinfos.proxyName" disabled="true" class="my-mgl-15 name  my-mgt-2" :placeholder="name"
				 placeholder-class="my-cl-b8" />
			</view>
		</view>
		<view class="my-mglr-20 my-flex-col my-relative ">
			<view class="my-flex-row-align-c my-bder-b-cc">
				<view class="name my-flex-row-b my-mgt-15">
					<text>手</text>
					<text>机</text>
					<text>号</text>
				</view>
				<input type="number" :value="proxyinfos.phone" disabled="true" class="my-mgl-15 my-mgt-2 mobile" :placeholder="mobile"
				 placeholder-class="my-cl-b8" />
			</view>
			<view>
				<text class="my-cl-b8 my-font-10">(注：请确保该联系电话真实有效)</text>
			</view>
		</view>
	    <view class="my-mglr-20 my-flex-col my-relative">
		    <view class="my-flex-row-align-c my-bder-b-cc my-mgt-5">
				<text>设置H60的分润</text>
				<input @blur="blurH60" type="digit" :value="proxyinfos.h60ProfitScale" class="my-mgl-15 my-mgt-2 my-bder-b profit my-cl-ye txt" :placeholder="h60ProfitScale"
				 placeholder-class="my-cl-b8" />
				<text>%</text>
			</view>
			<view class="annotation my-flex-row-align-c">
				<text class="my-cl-b8 my-font-10">(注：请确保所设置的分润少于自身所拥有的分润)</text>
			</view>
		</view>
		<view class="my-mglr-20 my-flex-col my-relative">
			<view class="my-flex-row-align-c my-bder-b-cc my-mgt-5">
				<text>设置X10的分润</text>
				<input type="digit" @blur="blurX10" :value="proxyinfos.x10ProfitScale" class="my-mgl-15 my-bder-b my-mgt-2 profit my-cl-ye txt" :placeholder="x10ProfitScale"
				 placeholder-class="my-cl-b8" />
				<text>%</text>
			</view>
			<view class="annotation my-flex-row-align-c">
				<text class="my-cl-b8 my-font-10">(注：请确保所设置的分润少于自身所拥有的分润)</text>
			</view>
		</view>
		<!--view class="my-mglr-20 my-flex-col my-relative">
			<view class="my-flex-row-align-c my-bder-b-cc my-mgt-5">
				<text>设置标准分润</text>
				<text class="my-mgl-5" :class="standardProfitMode===false?'my-cl-ye':'my-cl-grey'">否</text>
				<switch :checked="standardProfitMode" color="#f8c470" class="tr my-flex-row-c" @change="switchChange1" />
				<text :class="standardProfitMode===true?'my-cl-ye':'my-cl-grey'">是</text>
			</view>
			<view class="annotation my-flex-row-align-c">
				<text class="my-cl-b8 my-font-10">(注：关闭标准分润时，即等同于开启非标准分润)</text>
			</view>
		</view-->
		<view class="my-mglr-20 my-flex-col my-relative">
			<view class="my-flex-row-align-c my-bder-b-cc my-mgt-5">
				<text>下级邮箱设置</text>
				<input type="text" @blur="blurEmail" :value="proxyinfos.mail" class="my-mgl-15 my-mgt-2 e-mail" :placeholder="email"
				 placeholder-class="my-cl-b8" />
			</view>
			<view class="my-flex-row-align-c">
				<text class="my-cl-b8 my-font-10">(注：用于接收初始密码，非必填)</text>
			</view>
		</view>
		<view class="my-mglr-20 my-flex-col my-relative">
			<view class="my-flex-row-align-c my-bder-b-cc my-mgt-5">
				<text>设置为联营代理</text>
				<text class="my-mgl-5" :class="unionProxy===false?'my-cl-ye':'my-cl-grey'">否</text>
				<switch :checked="unionProxy" color="#f8c470" class="tr my-flex-row-c" @change="switchChange2" />
				<text :class="unionProxy===true?'my-cl-ye':'my-cl-grey'">是</text>
			</view>
			<text class="my-cl-b8 my-font-10">(注：联营代理无法添加下级代理)</text>
		</view>
		<!-- <view class="my-pd-10 my-flex-row-b my-relative">
			<view class="my-flex-row-align-c">
				<text>联营模式设置</text>
				<text class="my-mgl-5 my-font-11" :class="agency[id].switch===false?'my-cl-ye':'my-cl-grey'">分润模式</text>
				<switch checked="agency[id].switch" color="#f8c470" class="tr my-flex-row-c" @change="switchChange3" />
				<text class="my-font-11" :class="agency[id].switch===true?'my-cl-ye':'my-cl-grey'">租用模式</text>
			</view>
			<view class="my-flex-row-align-c">
				<text class="my-cl-b8 my-font-10" v-if="!agency[id].switch">(注：每个月收取固定比例抽成)</text>
				<text class="my-cl-b8 my-font-10" v-if="agency[id].switch">(注：每个月收取固定租金)</text>
			</view>
			<view class="my-absolute square"></view>
			<view class="my-absolute squares"></view>
		</view> -->
		<!-- <view class="my-pd-10 my-flex-row-b my-relative">
			<view class="my-flex-row-align-c" v-if="agency[id].switch">
				<text>设置租用费用</text>
				<input type="digit" value="" class="my-mgl-15 my-bder-b-ye my-mgt-2 profit" placeholder="无" placeholder-class="my-cl-b8" />
				<text>元/月</text>
			</view>
			<view class="my-flex-row-align-c" v-if="!agency[id].switch">
				<text>设置联营分成</text>
				<input type="digit" value="" class="my-mgl-15 my-bder-b-ye my-mgt-2 profit" placeholder="无" placeholder-class="my-cl-b8" />
				<text>%</text>
			</view>
			<view class="my-absolute square"></view>
			<view class="my-absolute squares"></view>
		</view>
		<view class="my-pd-10 my-flex-row-b my-relative">
			<view class="my-flex-row-align-c">
				<text class="my-cl-b8 my-font-10" v-if="agency[id].switch">(注：该代理账户的余额将会自动按月扣取所设定的费用，作为联营费用至您的账户)</text>
				<text class="my-cl-b8 my-font-10" v-if="!agency[id].switch">(注：该代理账户的余额将会自动按月扣取所设定比例抽成，作为费用至您的账户)</text>
			</view>
			<view class="my-absolute square"></view>
			<view class="my-absolute squares"></view>
		</view> -->
		<view class="my-mglr-20 my-flex-col my-relative">
			<view class="my-flex-row-align-c my-bder-b-cc my-mgt-5">
				<text>设置员工代理</text>
				<text class="my-mgl-5" :class="staffProxy===false?'my-cl-ye':'my-cl-grey'">否</text>
				<switch :checked="staffProxy" color="#f8c470" class="tr my-flex-row-c" @change="switchChange3" />
				<text :class="staffProxy===true?'my-cl-ye':'my-cl-grey'">是</text>
			</view>
			<text class="my-cl-b8 my-font-10">(注：员工代理无法添加下级代理)</text>
		</view>
		<view class="my-fmy-flex-row-c my-fixed-b">
			<view @click="onAffirm" class="my-flex-row-c btn my-bg-ye my-cl-white my-rds-5 my-font-18 my-boxsha-2">完成设置</view>
		</view>
	</view>
</template>

<script>
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				id: 0,
				name: "",
				email: "",
				mobile: "",
				h60ProfitScale: 0,
				staffProxy: false,
				standardProfitMode: false,
				unionProxy: false,
				x10ProfitScale: 0,
				agency: [],
				proxyinfos:null
			}
		},
		components: {

		},
		computed: {

		},
		onLoad(options) {
			this.id = Number(options.id) || 0;
			this.getproxyinfo();
		},
		onShow() {

		},
		methods: {
			getproxyinfo(){
				var params={
					subProxyId:this.id
				};
				req.request('GET',params,'/proxy/api/proxy/sub/'+this.id,'加载中',(res)=>{
					if(res.statusCode === 200){
						console.log(res.data.data)
						var proxyinfos=res.data.data;
						this.proxyinfos=proxyinfos;
						this.unionProxy=proxyinfos.unionProxy;
						this.staffProxy=proxyinfos.staffProxy;
					}
				})
			},
			onAffirm() {
				// if (this.name === "") {
				// 	uni.showToast({
				// 		title: "您没有填姓名哦~",
				// 		icon: "none"
				// 	})
				// }
				// if (this.mobile === "") {
				// 	uni.showToast({
				// 		title: "您没有填手机号哦~",
				// 		icon: "none"
				// 	})
				// }
				// if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
				//   uni.showToast({
				//     title: '您输入的号码有误，请重填',
				// 	icon:'none'
				//   })
				//   return false;
				// }
				    if(this.h60ProfitScale>this.proxyinfos.parentH60ProfitScale || this.proxyinfos.h60ProfitScale>this.proxyinfos.parentH60ProfitScale){
						uni.showToast({
							title:"您设置的H60分润值高于设定的"+this.proxyinfos.parentH60ProfitScale+"%的值",
							icon:"none"
						});
						return;
					}
					if(this.x10ProfitScale>this.proxyinfos.parentX10ProfitScale || this.proxyinfos.x10ProfitScale>this.proxyinfos.parentX10ProfitScale){
						uni.showToast({
							title:"您设置的x10分润值高于设定的"+this.proxyinfos.parentX10ProfitScale+"%的值",
							icon:"none"
						});
						return;
					}
					// 设置每次的分润不低于前一次的值
					if(this.h60ProfitScale<this.proxyinfos.h60ProfitScale){
						uni.showToast({
							title:"您设置的H60分润值低于之前设定的"+this.proxyinfos.h60ProfitScale+"%的值,请重新设置",
							icon:"none"
						});
						return;
					}
					if(this.x10ProfitScale<this.proxyinfos.x10ProfitScale){
						uni.showToast({
							title:"您设置的x10分润值低于之前设定的"+this.proxyinfos.x10ProfitScale+"%的值,请重新设置",
							icon:"none"
						});
						return;
					}
					let params = {
						h60ProfitScale: this.h60ProfitScale || this.proxyinfos.h60ProfitScale,
						staffProxy: this.staffProxy,
						standardProfitMode: this.standardProfitMode,
						unionProxy: this.unionProxy,
						x10ProfitScale: this.x10ProfitScale|| this.proxyinfos.x10ProfitScale,
						mail:this.email || this.proxyinfos.mail,
						phone:this.proxyinfos.phone,
						proxyName:this.proxyinfos.proxyName
					}
					req.request('PUT', params, '/proxy/api/proxy/sub/' + this.id, '加载中', (res) => {
						// console.log(res)
						if (res.statusCode === 200) {
							uni.navigateBack({
								delta: 1,
								success: (res) => {
									uni.showToast({
										title: '修改成功！',
										icon: 'success'
									})
								}
							})
						}
					})
				
			},
			blurX10(e) {
				let val = e.detail.value
				this.x10ProfitScale = Number(val)
			},
			blurH60(e) {
				let val = e.detail.value
				this.h60ProfitScale = Number(val)
			},
			blurEmail(e) {
				let val = e.detail.value
				this.email = val
			},
			blurMobile(e) {
				let val = e.detail.value
				this.mobile = val
			},
			blurName(e) {
				let val = e.detail.value
				this.name = val
			},
			switchChange1(e) {
				// console.log('switch1 发生 change 事件，携带值为', e.target.value)
				this.standardProfitMode = e.target.value
			},
			switchChange2(e) {
				this.unionProxy = e.target.value
			},
			switchChange3(e) {
				this.staffProxy = e.target.value
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
		padding-bottom: 120upx;
	}

	.name {
		width: 150upx;
	}
    .rectangle{
		width: 12upx;
		height: 12upx;
		background: #EBEBEB;
	}
	.square {
		width: 12upx;
		height: 12upx;
		transform: rotate(45deg);
		background: #EBEBEB;
	}
    
	.squares {
		width: 12upx;
		height: 12upx;
		transform: rotate(45deg);
		background: #EBEBEB;
	}

	.my-relative>.square {
		bottom: -20upx;
		left: -20upx;
	}

	.my-relative>.squares {
		bottom: -20upx;
		right: -20upx;
	}


	.profit {
		width: 60upx;
	}

	.mobile {
		width: 175upx;
	}

	.tr {
		transform: scale(0.5, 0.5);
		width: 70upx;
	}

	.e-mail {
		width: 240upx;
	}

	.btn {
		width: 660upx;
		height: 80upx;
		border-radius: 50upx;
	}

	.my-fixed-b {
		bottom: 30upx;
		left: 45upx;
	}
	.my-bder-b-cc{
		border-bottom: 2upx #CCCCCC dotted;
	}
	.txt{
		text-align: center;
		border-bottom: 2upx #f8c470 solid;
		margin-bottom: 4upx;
	}
	
</style>
