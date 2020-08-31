<template>
	<view class="box my-pd-10 my-flex-col">
		<view class="my-flex-row-align-c box">
			<text>请选择你想要的广告分成: </text>
			<text class="my-mgl-15 my-font-16" :class="ind===index?'my-cl-ye':''" v-for="(item,index) in num" :key="index"
			 @click="onNum(index)">
				{{item}}
			</text>
		</view>
		<text class="my-font-11 my-mgt-10 my-cl-grey">注:选择的对应的广告分成将会把此设备的收获的广告收益分配给您。</text>
		<view class="my-flex-row-align-c my-mgt-15 box">
			<text>请选择获得的广告受益时间: </text>
			<text class="my-mgl-15 my-font-16" :class="select===index?'my-cl-ye':''" v-for="(item,index) in year" :key="index"
			 @click="onYear(index)">
				{{item}}
			</text>
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="my-mgl-15 my-bder-b uni-input" :class="index!==0?'my-bder-b-ye my-cl-ye':''">{{array[index]}}</view>
			</picker>
		</view>
		<text class="my-font-11 my-mgt-10 my-cl-grey">注:选择对应的广告收益时间，你将获得该设备此时间段内的广告分成。</text>
		<view class="my-flex-row-align-c box my-mgt-15">
			<text>开通费用：</text>
			<text class="my-cl-ye">{{cost}}元</text>
		</view>
		<text class="my-font-11 my-mgt-10 my-cl-grey">注:完成付费即可开始享有该设备广告收益!</text>
		<view class="box my-flex-row-c  my-mgt-180">
			<view class="my-flex-row-c btn my-bg-ye my-cl-white my-boxsha-2" @click="onDredge('QSPopup')">
				立即开通
			</view>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="my-bg-white my-rds-10 my-flex-col-c my-pd-10 my-flex-warp show1 my-relative">
				<icon type="success" size="48" color="#f8c470"/>
				<text class="my-font-16 my-mgt-10">设备编号：DSL101912251223</text>
				<view class="my-flex-row-c show-btn my-cl-white my-bg-ye my-font-15 my-mgt-50" @click="onReturn('QSPopup')">
					返回个人页
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		data() {
			return {
				select: 0,
				ind: 0,
				num: ['20%', '30%', '50%'],
				year: ['1年', '2年'],
				array: ['其他','1个月','3个月','6个月','1年','2年','3年'],
				index:0,
				cost:20000
			}
		},
		components:{QSPopup},
		methods: {
			onReturn(ref){
				this.$refs[ref].hide()
				uni.navigateBack({
					delta:1
				})
			},
			onDredge(ref){
				this.$refs[ref].show()
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.select=null
				if(this.ind===0){
					if(this.index==0){
						this.cost=0
					}
					if(this.index==1){
						this.cost=3000
					}
					if(this.index==2){
						this.cost=8888
					}
					if(this.index==3){
						this.cost=12000
					}
					if(this.index==4){
						this.cost=20000
					}
					if(this.index==5){
						this.cost=38888
					}
					if(this.index==6){
						this.cost=50000
					}
				}
				if(this.ind===1){
					if(this.index==0){
						this.cost=0
					}
					if(this.inde==1){
						this.cost=4588
					}
					if(this.index==2){
						this.cost=10000
					}
					if(this.index==3){
						this.cost=22000
					}
					if(this.index==4){
						this.cost=38888
					}
					if(this.index==5){
						this.cost=50000
					}
					if(this.index==6){
						this.cost=68888
					}
				}
				if(this.ind===2){
					if(this.index==0){
						this.cost=0
					}
					if(this.index==1){
						this.cost=3888
					}
					if(this.index==2){
						this.cost=10000
					}
					if(this.index==3){
						this.cost=20000
					}
					if(this.index==4){
						this.cost=45888
					}
					if(this.index==5){
						this.cost=88888
					}
					if(this.index==6){
						this.cost=100000
					}
				}
			},
			onYear(e) {
				this.select = e
				this.index=0
				if(this.ind===0){
					if(e===0){
						this.cost=20000
					}
					if(e===1){
						this.cost=38888
					}
				}
				if(this.ind===1){
					if(e===0){
						this.cost=28888
					}
					if(e===1){
						this.cost=50000
					}
				}
				if(this.ind===2){
					if(e===0){
						this.cost=45888
					}
					if(e===1){
						this.cost=88888
					}
				}
			},
			onNum(e) {
				this.ind = e
				if(this.select===0){
					if(e===0){
						this.cost=20000
					}
					if(e===1){
						this.cost=28888
					}
					if(e===2){
						this.cost=45888
					}
				}
				if(this.select===1){
					if(e===0){
						this.cost=38888
					}
					if(e===1){
						this.cost=50000
					}
					if(e===2){
						this.cost=88888
					}
				}
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
		padding-bottom: 0;
	}

	.box {
		width: 100%;
	}
	.btn{
		width: 690upx;
		height: 80upx;
		border-radius: 40upx;
	}
	.show1{
		width: 550upx;
		overflow: hidden;
	}
	.show-btn{
		width: 400upx;
		height: 60upx;
		border-radius: 30upx;
	}
	.my-mgt-180{
		margin-top: 360upx;
	}
</style>
