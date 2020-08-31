<template>
	<view class="box my-flex-col-c">
		<view class="my-flex-row-align-c box my-flex-warp my-mgt-30">
			<view class="single-box my-flex-col-c" v-for="(item,index) in iconTxt" :key="index" @click="onEditSingle(index)">
				<image :src="item.icon" class="big-icon" mode="" v-if="index!==7"></image>
				<text class="my-cl-ye my-font-15 my-mgt-10" v-if="index!==7">{{item.txt}}</text>
				<image :src="item.icon" class="big-icon" mode="" @click="show('QSPopup')" v-if="index===7"></image>
				<text class="my-cl-ye my-font-15 my-mgt-10" @click="show('QSPopup')" v-if="index===7">{{item.txt}}</text>
			</view>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="content my-bg-white my-rds-10 my-flex-row-c my-flex-warp show1">
				<image src="/static/team/point.png" class="icon my-mgt-20" mode=""></image>
				<text class="shows my-mgt-10 my-flex-row-c">您已申请解除代理身份</text>
				<text class="shows my-mgt-10 my-flex-row-c">在代理同意后您将解除和他的代理关系</text>
				<view class="my-flex-row-c my-flex-self-e my-font-18" style="width: 550upx;">
					<view class="my-grow-1 btn my-bg-ye my-cl-white my-flex-row-c my-mgtb-10" @click="onDel">
						确认
					</view>
				</view>
			</view>
		</QSPopup>

	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				showBl: true
			}
		},
		props: {
			iconTxt:{
				type: Array,
				required: true
			},
			proxyId:{
				type:null,
				required: true
			}
		},
		components: {
			QSPopup
		},
		methods: {
			onDel() {
				this.showBl = false
				let params = {
					
				}
				req.request('DELETE', params, '/proxy/api/proxy/sub/'+proxyId, '加载中', (res) => {
					// console.log(res)
					if (res.statusCode === 200) {
						uni.navigateBack({
							delta:1,
							success: () => {
								uni.showToast({
									title: res.data.massage,
									icon: "success"
								})
							}
						})
					}
				})
			},
			onClose() {
				this.showBl = false
			},
			show(ref) {
				this.showBl = true
				this.$refs[ref].show();
			},
			onEditSingle(e) {
				this.$emit("selected", e);
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.box {
		width: 750upx;
	}

	.box .box {
		width: 720upx;
	}

	.single-box {
		width: 240upx;
		height: 240upx;
	}

	.big-icon {
		width: 120upx;
		height: 120upx;
	}

	.icon {
		width: 120upx;
		height: 120upx;
	}

	.btn {
		height: 80upx;
	}

	.show1 {
		height: 400upx;
		width: 600upx;
		overflow: hidden;
	}

	.shows {
		width: 550upx;
	}
</style>
