<template>
	<view>
		<view class="my-flex-col-b my-bg-white my-relative my-mgb-5" v-for="(item,index) in agency" :key="index">
			<view class="my-flex-row-b box my-pd-10">
				<view class="my-flex-row-align-c" @click="onSee(index)">
					<text>{{item.proxyName}}</text>
					<text class="my-mgl-10 phone">{{item.phone}}</text>
				</view>
				<view class="my-flex-row-align-c" @click="onEdit(index)">
					<image src="/static/team/edit.png" class="icon" mode=""></image>
					<text class="my-mgl-10">编辑</text>
				</view>
			</view>
			<view class="my-absolute my-flex-row-b box graph">
				<view class="und"></view>
				<view class="und"></view>
			</view>
			<view class="graph-ver my-absolute my-flex-row-c box">
				<view class="my-flex-row-b box-center">
					<view class="ver"></view>
					<view class="ver"></view>
				</view>
			</view>
			<view class="graph-bias my-absolute my-flex-row-c box">
				<view class="my-flex-row-align-c box-center">
					<view class="bias tr2"></view>
					<view class="bias tr1"></view>
				</view>
			</view>
			<view class="bder-b my-flex-row-b box my-pd-10" @click="onSee(index)">
				<view class="my-flex-row-align-c my-grow-1">
					<image class="icon-img" src="/static/index/charger.png" mode=""></image>
					<text class="my-font-15 my-flex-self-e my-mgl-10">{{item.proxyDeviceSampleViews[0].model||'无'}}</text>
				</view>
				<view class="my-flex-col-c my-grow-1">
					<text class="my-font-15">{{item.proxyDeviceSampleViews[0].total||0}}个</text>
					<text>底座</text>
				</view>
				<view class="my-flex-col-c my-grow-1">
					<text class="my-font-15">{{item.proxyDeviceSampleViews[0].chargeTotal||0}}个</text>
					<text>充电宝数</text>
				</view>
				<view class="my-flex-col-c my-grow-1">
					<text class="my-font-15">{{item.proxyDeviceSampleViews[0].distributionTotal||0}}套</text>
					<text>已铺货数</text>
				</view>
			</view>
			<view class="my-absolute my-flex-row-b box graph1">
				<view class="und"></view>
				<view class="und"></view>
			</view>
			<view class="graph-ver1 my-absolute my-flex-row-c box">
				<view class="my-flex-row-b box-center">
					<view class="ver"></view>
					<view class="ver"></view>
				</view>
			</view>
			<view class="graph-bias1 my-absolute my-flex-row-c box">
				<view class="my-flex-row-align-c box-center">
					<view class="bias tr1"></view>
					<view class="bias tr2"></view>
				</view>
			</view>
			<view class="my-flex-row-b box my-pd-10 my-pdb-10" @click="onSee(index)">
				<view class="my-flex-row-align-c my-grow-1">
					<image class="icon-img tr3" src="/static/index/plug.png" mode=""></image>
					<text class="my-font-15 my-flex-self-e my-mgl-10">{{item.proxyDeviceSampleViews[1].model||'无'}}</text>
				</view>
				<view class="my-flex-row-b my-grow-1 my-mgl-30">
					<view class="my-flex-col-c my-grow-1">
						<text class="my-font-15">{{item.proxyDeviceSampleViews[1].total||0}}条</text>
						<text>线充</text>
					</view>
					<view class="my-flex-col-c my-grow-1" style="width: 25%;">
						<text class="my-font-15">{{item.proxyDeviceSampleViews[1].distributionTotal||0}}条</text>
						<text>已铺货数</text>
					</view>
				</view>
			</view>
			<view class="my-flex-row-b box my-pd-10" @click="onSee(index)">
				<view class="my-flex-row-align-c">
					<text>下级代理总数</text>
					<!-- <text class="my-mgl-10 my-cl-ye my-font-16">{{item.junior}}个</text> -->
					<text class="my-mgl-10 my-cl-ye my-font-16">未显示</text>
				</view>
				<view class="my-flex-row-align-c">
					<text>总收益</text>
					<!-- <text class="my-mgl-10 my-cl-ye my-font-16">{{item.earnings}}元</text> -->
					<text class="my-mgl-10 my-cl-ye my-font-16">未显示</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			agency: Array,
			required: true
		},
		methods: {
			onEdit(e){
				this.$emit("selected", e);
			},
			onSee(e){
				this.$emit("select", e);
			}
		}
	}
</script>

<style>
	.icon-img{
		width: 60upx;
		height: 60upx;
	}
	.graph{
		top: 80upx;
		left: 0;
	}
	.graph-ver{
		top: 50upx;
		left: 0;
	}
	.graph-bias{
		top: 35upx;
		left: 0;
	}
	.phone{
		width: 300rpx;
	}
	.graph1{
		top: 320upx;
		left: 0;
	}
	.graph-ver1{
		top: 320upx;
		left: 0;
	}
	.graph-bias1{
		top: 362upx;
		left: 0;
	}
	.und{
		width: 325upx;
		height: 2upx;
		background-color: #DDDDDD;
	}
	.ver{
		width: 2upx;
		height: 30upx;
		background-color: #DDDDDD;
	}
	.box-center{
		width: 100upx;
	}
	.tr1{
		transform: rotate(30deg);
	}
	.tr2{
		transform: rotate(-30deg);
	}
	.bias{
		width: 60upx;
		height: 2upx;
		background-color: #DDDDDD;
	}
	.tr3{
		transform: rotate(90deg);
	}
	.bder-b {
		border-bottom: 2upx solid #DDDDDD;
	}
</style>
