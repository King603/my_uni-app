<template>
 <view>
	<view class="my-flex-col-c">
		<view class="my-mgt-50">
			<view class="box my-flex-col-c" v-for="(item,index) in tab" :key="index" @click="shareF()">
				<image :src="item.img" mode="" class="pic my-mgt-30"></image>
				<text class="my-mgt-10">{{item.txt}}</text>
			</view>
		</view>
	</view>
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
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
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
				tab: [{
					img: '/static/my/icon-8.png',
					txt: '成为代理'
				}, {
					img: '/static/my/icon-9.png',
					txt: '成为商户'
				}]
			}
		},
		props: {
			textArray: Array,
			required: true
		},
		methods: {
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
										}
           							]);
           						})
           					},
           					imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
           						// const dx = bgObj.width*0.3; 
           						return [{
           							url: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xdaPnYDVUt_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.8AeWGrfsdj8L3c896be85646579d47630995e1513e61.png',
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
           		}
           	}
        }
</script>

<style>
	page {
		background: #FFFFFF;
		padding-bottom: 0;
	}
	.pic {
		width: 240upx;
		height: 240upx;
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