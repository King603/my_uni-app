<template>
	<view class="upload-img" :style="{
			width: width + 'rpx',
			height: height + 'rpx',
			'background-image': 'url(' + bgsrc + ')'		}"
	 @tap="handleAddNewImage">
		<image class="cover" :src="currentImage" mode="aspectFill"></image>
		<view class="plusicon">
			<slot name="icon">
				<text v-if="!choosed" class="iconfont ">&#xe8fe;</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 300
			},
			height: {
				type: Number,
				default: 190
			},
			bgsrc: {
				type: String
			}
		},
		data() {
			return {
				currentImage: '',
				choosed: false
			};
		},
		methods: {
			handleAddNewImage() {
				// const _that = this;
				// uni.chooseImage({
				// 	count: 1,
				// 	sourceType: ['album', 'camera'],
				// 	sizeType: ['compressed'],
				// 	success(res) {
				// 		_that.currentImage = res.tempFilePaths[0];
				// 		_that.choosed = true;
				// 		_that.$emit('chooseimg', {
				// 			src: _that.currentImage
				// 		});
				// 	}
				// });
				let upLoadpictureList = []
				//选择图片
				uni.chooseImage({
					count: 1, // 默认9，这里显示一次选择相册的图片数量 
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
						let tempFiles = res.tempFiles
						//把选择的图片 添加到集合里
						for (let i in tempFiles) {
							tempFiles[i]['upload_percent'] = 0
							tempFiles[i]['path_server'] = ''
							upLoadpictureList.push(tempFiles[i])
						}
						if (upLoadpictureList.length > 1) {
							upLoadpictureList.shift()
						}
						//显示
						this.upLoadpictureList = upLoadpictureList
						uni.uploadFile({
							url: 'https://proxy.haoxiangchong.com/proxy/tool/upload',
							filePath: this.upLoadpictureList[0].path,
							name: 'file',
							header: {
								'X-HXCharge-Authentication':'HXCharge Authentication Header',
							},
							success: (res) => {
								// console.log(res)
								// this.bgsrc=""
								let data = JSON.parse(res.data)
								this.currentImage = data.data;
								this.choosed = true;
								this.$emit('chooseimg', {
									src: this.currentImage
								});
							},
							fail: (res) => {
								console.log('fail');
							}
						})
					}
				})
			}
		}
	};
</script>

<style lang="scss">
	@font-face {
		font-family: "iconfont";
		src:
			url('data:application/octet-stream;base64,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') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 30px;
		color: #ddd;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-plus:before {
		content: "\e8fe";
	}

	.upload-img {
		position: relative;
		background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
		border: 1px solid #ddd;
		border-radius: 10upx;
		background-color: #F5F5F5;
		.cover {
			display: inline-block;
			width: 100%;
			height: 100%;
		}

		.plusicon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
