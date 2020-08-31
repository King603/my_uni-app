<template>
	<view class="box my-flex-col-c margin">
		<image src="../../../static/my/share.png" style="width: 750upx;height: 1280upx;" @longpress="saveImg"></image>
		<button class="btn my-cl-white my-flex-row-c my-bg-ye my-font-18 my-bold" open-type="share">
			 一键分享
		</button>
	</view>
</template>

<script>
	export default{
		onLoad() {
			uni.showToast({
				title:"长按图片可保存哦",
				icon:"none",
				duration:3000
			})
		},
		methods:{
			 saveImg(){
			  var url="../../../static/my/share.png";
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
			 },
		}
	}
	
</script>

<style>
	.box{
		width: 100%;
		height: 80%;
	}
	.btn{
		position: relative;
		top: -127upx;
		width: 430upx;
		height: 80upx;
	}
</style>
