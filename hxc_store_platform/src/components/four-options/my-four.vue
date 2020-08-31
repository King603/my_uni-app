<template>
	<view class="box my-pdlr-10">
		<view class="box my-pd-15 my-flex-row-b my-flex-warp my-bg-white my-boxsha-2">
			<view v-for="(item,index) in textArray" :key="index">
				<view class="single-box my-mgt-15 my-flex-col-c" v-if="index!==5&&index!==6" @click="onSingle(index)">
					<image class="icon" :src="item.icon" mode=""></image>
					<text class="my-mgt-5">{{item.txt}}</text>
				</view>
				<view class="single-box my-mgt-15 my-flex-col-c" v-if="index===5" @click="onService('QSPopup')">
					<image class="icon" :src="item.icon" mode=""></image>
					<text class="my-mgt-5">{{item.txt}}</text>
				</view>
				<view class="single-box my-mgt-15 my-flex-col-c" v-if="index===6" @click="onEarnings('QSPopup1')">
					<image class="icon" :src="item.icon" mode=""></image>
					<text class="my-mgt-5">{{item.txt}}</text>
				</view>
			</view>
		</view>
		<QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
			<view class="content my-bg-white my-rds-10 my-flex-col-c my-flex-warp show1 my-relative">
				<image src="/static/my/ser.png" class="pic my-absolute" mode=""></image>
				<view class="btn">
					
				</view>
				<text class="my-font-16" style="z-index: 100;">客服热线：4008-732-567</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-50" @click="onCall">
					一键拨打
				</view>
			</view>
		</QSPopup>
		<QSPopup ref="QSPopup1" type="fadeScaleHeightToLowInMiddle">
			<view class="content my-bg-white my-rds-10 my-flex-col-c my-flex-warp show1 my-relative">
				<image src="/static/team/point.png" class="pic my-absolute" mode=""></image>
				<view class="btn"></view>
				<view class="btn"></view>
				<text style="z-index: 100;">你还未开通广告收益权限！</text>
				<view class="my-flex-row-c btn my-cl-white my-bg-ye my-font-15 my-mgt-50" @click="onDredge">
					立即开通
				</view>
			</view>
		</QSPopup>
		<!-- 
		<view class="content">
			<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
				<view class="flex_column">
					<view class="backgroundColor-white padding1vh border_radius_10px">
						<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
					</view>
					<view class="my-flex-row-c marginTop2vh">
						<button type="primary" class="my-bg-white my-cl-08" size="default" @tap.prevent.stop="share()">分享图片</button>
					</view>
				</view>
			</view>
			 -->
			<!-- <button type="primary" @tap="shareFc()">生成海报</button> -->
			<!-- 
			<view class="hideCanvasView">
				<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
			</view>
			 -->
		</view>
	</view>
</template>

<script>
	import _app from '@/util/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/util/QS-SharePoster/QS-SharePoster.js';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				backgroundImage:'/static/my/1.jpg',
			}
		},
		props: {
			textArray: Array,
			required: true
		},
		components:{
			QSPopup
		},
		methods: {
			onDredge(){
				uni.navigateTo({
					url:"../../pages/my/service/dredge",
					success:()=>{
						this.$refs['QSPopup1'].hide()
					}
				})
			},
			onSingle(e){
				this.$emit('index',e)
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif
			
				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			},
			async shareF() {
				try {
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						backgroundImage:'/static/my/1.jpg',
						posterCanvasId: this.canvasId,
						delayTimeScale: 20, //延时系数
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const font1=bgObj.width*0.09
							const font2=bgObj.width*0.07
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([
									// {
									// 	type: 'custom',
									// 	setDraw(Context) {
									// 		Context.setFillStyle('black');
									// 		Context.setGlobalAlpha(0.3);
									// 		Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
									// 		Context.setGlobalAlpha(1);
									// 	}
									// },
									// {
									// 	type: 'image',
									// 	url: '/static/my/white.png',
									// 	dx: bgObj.width * 0.33,
									// 	dy: bgObj.height*0.29,
									// 	infoCallBack(imageInfo) {
									// 		return {
									// 			dWidth: bgObj.width * 0.34, 
									// 			dHeight: bgObj.width * 0.34,
									// 		}
									// 	}
									// },
									{
										type: 'text',
										fontStyle: 'italic',
										text: '扫码关注',
										size: font1,
										color: 'white',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: textLength*0.88,
												dy: lineHeight *7
											}
										}
									},
									{
										type: 'text',
										fontStyle: 'italic',
										text: '“豪想充”',
										size: font2,
										color: 'white',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: textLength*0.87,
												dy: lineHeight *10
											}
										}
									},
									{
										type: 'text',
										text: '推荐人：罗真雨',
										fontStyle: 'italic',
										size: fontSize,
										color: 'white',
										alpha: 1,
										textAlign: 'centre',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: textLength*1.05,
												dy: bgObj.height-lineHeight * 2.3
											}
										}
									},
									{
										type: 'text',
										text: '豪想充信息科技',
										size: fontSize,
										color: 'white',
										alpha: 1,
										textAlign: 'center',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: bgObj.width*0.5,
												dy: bgObj.height - lineHeight
											}
										}
									},
									{
										type: 'qrcode',
										text: '呼朋唤友，有钱有益',
										size: bgObj.width * 0.24,
										dx: bgObj.width * 0.375,
										dy: bgObj.height*0.675
									},{
									}
								]);
							})
						},
						imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
							// const dx = bgObj.width*0.3; 
							return [{
								url: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/NsKSWjFyEK_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.uW1whlv6H1Mn3c896be85646579d47630995e1513e61.png',
								dx:0,
								dy: 0,
								infoCallBack(imageInfo) {
									// let scale = bgObj.width*0.2 / imageInfo.height;
									return {
										
										dWidth: bgObj.width,	
										dHeight: bgObj.height,
										// roundRectSet: {	// 圆角矩形
										// 	r: imageInfo.width*.1
										// }
									}
								}
							}]
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						},
						/* setDraw: ({Context, bgObj, type, bgScale}) => {
							Context.setFillStyle('black');
							Context.setGlobalAlpha(0.3);
							Context.fillRect(0, bgObj.height - bgObj.height*0.2, bgObj.width, bgObj.height*0.2);
						} */
					});
					console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			async shareFc() {
				try {
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						posterCanvasId: this.canvasId,
						delayTimeScale: 20, //延时系数
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'custom',
										setDraw(Context) {
											Context.setFillStyle('black');
											Context.setGlobalAlpha(0.3);
											Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
											Context.setGlobalAlpha(1);
										}
									},
									// {
									// 	type: 'image',
									// 	url: '/static/3.jpg',
									// 	dx,
									// 	dy: bgObj.height - bgObj.width * 0.25,
									// 	infoCallBack(imageInfo) {
									// 		let scale = bgObj.width * 0.2 / imageInfo.height;
									// 		return {
									// 			circleSet: {
									// 				x: imageInfo.width * scale / 2,
									// 				y: bgObj.width * 0.2 / 2,
									// 				r: bgObj.width * 0.2 / 2
									// 			}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
									// 			dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
									// 			dHeight: bgObj.width * 0.2,
									// 			roundRectSet: { // 圆角矩形
									// 				r: imageInfo.width * .1
									// 			}
									// 		}
									// 	}
									// },
									{
										type: 'text',
										fontStyle: 'italic',
										text: '呼朋唤友，有钱有益',
										size: fontSize,
										color: 'white',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width - textLength - fontSize,
												dy: bgObj.height - lineHeight * 3
											}
										}
									},
									{
										type: 'text',
										text: '罗真雨',
										fontStyle: 'italic',
										size: fontSize,
										color: 'white',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: bgObj.width - textLength - fontSize,
												dy: bgObj.height - lineHeight * 2
											}
										}
									},
									{
										type: 'text',
										text: '豪想充信息科技',
										size: fontSize,
										color: 'white',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: bgObj.width - textLength - fontSize,
												dy: bgObj.height - lineHeight
											}
										}
									},
									{
										type: 'qrcode',
										text: '呼朋唤友，有钱有益',
										size: bgObj.width * 0.2,
										dx: bgObj.width * 0.05,
										dy: bgObj.height - bgObj.width * 0.25
									}
								]);
							})
						},
						/* qrCodeArray: ({bgObj, type, bgScale}) => {
							return [{
								text: '你好，我是取舍',
								size: bgObj.width*0.2,
								dx: bgObj.width*0.05,
								dy: bgObj.height - bgObj.width*0.25
							}]
						},
						imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
							const dx = bgObj.width*0.3; 
							return [{
								url: '/static/3.jpg',
								dx,
								dy: bgObj.height - bgObj.width*0.25,
								infoCallBack(imageInfo) {
									let scale = bgObj.width*0.2 / imageInfo.height;
									return {
										circleSet: {
											x: imageInfo.width * scale/2,
											y: bgObj.width*0.2/2,
											r: bgObj.width*0.2/2
										},	// 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
										dWidth: imageInfo.width * scale,	// 因为设置了圆形图片 所以要乘以2
										dHeight: bgObj.width*0.2,
										roundRectSet: {	// 圆角矩形
											r: imageInfo.width*.1
										}
									}
								}
							}]
						},
						textArray: ({bgObj, type, bgScale}) => {
							const fontSize = bgObj.width*0.045;
							const lineHeight = bgObj.height*0.04;
							return [{
								fontStyle: 'italic',
								text: '取舍',
								size: fontSize,
								color: 'white',
								alpha: .5,
								textAlign: 'left',
								textBaseline: 'middle',
								infoCallBack(textLength) {
									_app.log('index页面的text的infocallback ，textlength:' + textLength);
									return {
										dx: bgObj.width - textLength - fontSize,
										dy: bgObj.height - lineHeight*3
									}
								}
							}
							, {
								text: '取舍',
								fontWeight: 'bold',
								size: fontSize,
								color: 'white',
								alpha: .75,
								textAlign: 'left',
								textBaseline: 'middle',
								infoCallBack(textLength) {
									return {
										dx: bgObj.width - textLength - fontSize,
										dy: bgObj.height - lineHeight*2
									}
								}
							}, {
								text: '取舍',
								size: fontSize,
								color: 'white',
								alpha: 1,
								textAlign: 'left',
								textBaseline: 'middle',
								infoCallBack(textLength) {
									return {
										dx: bgObj.width - textLength - fontSize,
										dy: bgObj.height - lineHeight
									}
								}
							},
							]
						}, */
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						},
						/* setDraw: ({Context, bgObj, type, bgScale}) => {
							Context.setFillStyle('black');
							Context.setGlobalAlpha(0.3);
							Context.fillRect(0, bgObj.height - bgObj.height*0.2, bgObj.width, bgObj.height*0.2);
						} */
					});
					console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			onService(ref) {
				this.$refs[ref].show();
			},
			onEarnings(ref){
				uni.showToast({
					title:"功能暂未开放",
					icon:"none"
				})
				// this.$refs[ref].show();
			},
			onCall(){
				uni.makePhoneCall({
					// 手机号
					    phoneNumber: '4008-732-567', 
				})
			},
		}
	}
</script>

<style>
	.box {
		width: 750upx;
		height: auto;
	}

	.box .box {
		width: 710upx;
		height: auto;
	}

	.line {
		width: 100upx;
		height: 5upx;
	}

	.single-box {
		width: 150upx;
		height: auto;
	}

	.icon {
		width: 75upx;
		height: 75upx;
	}
	.show1{
		height: 350upx;
		width: 550upx;
		overflow: hidden;
	}
	.pic{
		width: 200upx;
		height: 200upx;
		left: 50%;
		top: 135upx;
		transform: translate(-50%, -50%);
	}
	.btn{
		width: 400upx;
		height: 60upx;
		border-radius: 30upx;
	}
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
