<template>
	<view>
		<view class="box my-mgt-5 my-pd-10 my-bg-white" v-for="item in allDev" :key="item">
			<view class="my-flex-col">
				<view class="my-flex-row-align-c">
					<text>设备型号</text>
					<view class="my-mgl-8 my-pdb-2 my-pdt-2 my-pdl-5 my-pdr-5 my-rds-3 my-cl-ye bg">{{item.model}}</view>
				</view>
				<view class="my-flex-row-align-c my-mgt-5">
					<text>设备编号</text>
					<view class="my-mgl-8">{{item.devId}}</view>
				</view>
				<view class="my-flex-row-b my-mgt-5">
					<view class="my-flex-row-align-c">
						<text>可借宝数</text>
						<text class="my-mgl-8">{{item.usable}}个</text>
					</view>
					<view class="my-flex-row-align-c">
						<text>可还孔数</text>
						<text class="my-mgl-8">{{item.skgi}}个</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			allDev: Array,
			required: true
		},
		methods: {
			
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
</style>
