<template>
	<view class="box my-flex-col-c">
		<view class="box my-flex-row-b my-bg-white my-pd-10" :class="index===0?'':'my-mgt-5'" v-for="(item,index) in ad" :key="index">
			<image :src="item.img" class="pic my-rds-10" mode="aspectFill"></image>
			<view class="txt-box my-flex-col-b">
				<view class="my-flex-col txt my-mgl-8">
					<text class="my-font-16 my-bold">文案：</text>
					<text class="my-txt-in-2 my-font-11 my-pdt-5" v-for="(item,index) in item.txt" :key="index">{{item}}</text>
				</view>
				<view class="my-flex-row-b my-cl-white box">
					<view class="btn my-bg-blue my-flex-row-c" @click="shareFc(index)">
						<image src="/static/my/save.png" class="icon" mode=""></image>
						<text class="my-mgl-8">保存图片</text>
					</view>
					<view class="btn my-bg-ye my-flex-row-c" @click="onCopy(index)">
						<image src="/static/my/copy.png" class="icon" mode=""></image>
						<text class="my-mgl-8">复制文章</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
				<view class="flex_column">
					<view class="backgroundColor-white padding1vh border_radius_10px">
						<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
					</view>
					<view class="flex_row marginTop2vh">
						<button type="primary" class="my-bg-white my-cl-08" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
						<button type="primary" class="my-bg-white my-cl-08" size="mini" @tap.prevent.stop="share()">分享图片</button>
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
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				ad: [{
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/ZoAtnOarRA_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.SHn7rTNKa5o8c08d9d381681e699697b3e490480ceaf.png',
					txt: ['想赚钱你就来!', '世界那么大，你不来，怎么知道你有多厉害!', '面向全国招商无门槛，小投资、高收益，创业首选。'],
					text:111
				}, {
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/GlhuhxoeiY_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.J12Urauj1OT4206cb795256a29399f4e01a34cae681e.png',
					txt: ['行业臻品，全网首发。', '行业独创臻品拥有全国千人推广团队，更快完成商业布点。', '面向全国招商无门槛，小投资、人可加、人人可商', '自主研发产品，质量有保证，可远程更新系统，不断提升产品竞争力。'],
					text:222
				}, {
					img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/WJOHqakhtb_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.RKOEFPh5sbze3c97e34339277bcfdffe95cc609b80d2.png',
					txt: ['追逐梦想，不负韶华。', '小电兜与你一起为梦想奔跑，为梦想而战。', '-起再续精彩人生!'],
					text:333
				}],
				img: 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/ZoAtnOarRA_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.SHn7rTNKa5o8c08d9d381681e699697b3e490480ceaf.png'
			}
		},
		methods: {
			onCopy(e) {
				uni.setClipboardData({
					 data: ''+this.ad[e].txt,
				});
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
			async shareFc(e) {
				if (e === 0) {
					this.img = 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/ZoAtnOarRA_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.SHn7rTNKa5o8c08d9d381681e699697b3e490480ceaf.png'
				}
				if (e === 1) {
					this.img = 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/xPmQQREOWW_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.I0ol0gAxZXbua552cc0cd91e651f7d773c8d782a7a48.png'
				}
				if (e === 2) {
					this.img = 'https://haoxiangchong.oss-cn-shenzhen.aliyuncs.com/WJOHqakhtb_wx023ed2d5e1a87230.o6zAJs5b-NeM9YlE0KCOW3BfXCAY.RKOEFPh5sbze3c97e34339277bcfdffe95cc609b80d2.png'
				}
				try {
					var url=this.img;
					 uni.getImageInfo({
					  src: url,
					  success:(res)=> {
					   let path = res.path;
					   uni.saveImageToPhotosAlbum({
					    filePath:path,
					    success:(res)=> { 
					     console.log(res);
					    },
					    fail:(res)=>{
					     console.log(res);
					    }
					   })
					  },
					  fail:(res)=> {
					   console.log(res);
					  }
					 })
					// const d = await getSharePoster({
					// 	_this: this, //若在组件中使用 必传
					// 	type: 'testShareType',
					// 	backgroundImage: '/static/my/1.jpg',
					// 	posterCanvasId: this.canvasId,
					// 	delayTimeScale: 20, //延时系数
					// 	drawArray: ({
					// 		bgObj,
					// 		type,
					// 		bgScale
					// 	}) => {
					// 		const dx = bgObj.width * 0.3;
					// 		const fontSize = bgObj.width * 0.045;
					// 		const font1 = bgObj.width * 0.09
					// 		const font2 = bgObj.width * 0.07
					// 		const lineHeight = bgObj.height * 0.04;
					// 		//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
					// 		return new Promise((rs, rj) => {
					// 			rs([
					// 				// {
					// 				// 	type: 'custom',
					// 				// 	setDraw(Context) {
					// 				// 		Context.setFillStyle('black');
					// 				// 		Context.setGlobalAlpha(0.3);
					// 				// 		Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
					// 				// 		Context.setGlobalAlpha(1);
					// 				// 	}
					// 				// },

					// 			]);
					// 		})
					// 	},
					// 	imagesArray: ({
					// 		bgObj,
					// 		type,
					// 		bgScale
					// 	}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
					// 		// const dx = bgObj.width*0.3; 
					// 		return [{
					// 			url: this.img,
					// 			dx: 0,
					// 			dy: 0,
					// 			infoCallBack(imageInfo) {
					// 				// let scale = bgObj.width*0.2 / imageInfo.height;
					// 				return {

					// 					dWidth: bgObj.width,
					// 					dHeight: bgObj.height,
					// 					// roundRectSet: {	// 圆角矩形
					// 					// 	r: imageInfo.width*.1
					// 					// }
					// 				}
					// 			}
					// 		}]
					// 	},
					// 	setCanvasWH: ({
					// 		bgObj,
					// 		type,
					// 		bgScale
					// 	}) => { // 为动态设置画布宽高的方法，
					// 		this.poster = bgObj;
					// 	},
					// 	/* setDraw: ({Context, bgObj, type, bgScale}) => {
					// 		Context.setFillStyle('black');
					// 		Context.setGlobalAlpha(0.3);
					// 		Context.fillRect(0, bgObj.height - bgObj.height*0.2, bgObj.width, bgObj.height*0.2);
					// 	} */
					// });
					// console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
					// this.poster.finalPath = d.poster.tempFilePath;
					// this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
		}

	}
</script>

<style>
	.box {
		width: 100%;
	}

	.pic {
		width: 280upx;
		height: 400upx;
	}

	.txt-box {
		width: 420upx;
		height: 400upx;
	}

	.btn {
		width: 200upx;
		height: 60upx;
		border-radius: 30upx;
	}

	.txt {
		width: 420upx;
		height: 320upx;
	}

	.icon {
		width: 40upx;
		height: 40upx;
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
