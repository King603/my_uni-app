<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}	
</script>

<style>
	/*每个页面公共css */
	@import "./static/css/app.css";
	page {
	  background-color: #f2f2f2;
	  font-size: 28upx;
	  color: #333;
	  padding-bottom: 10upx;
	}
	.bg {
		background: linear-gradient(180deg, rgb(244, 178, 73), rgb(253, 203, 123));	
	}
	.icon{
		width: 50upx;
		height: 50upx;
	}
	
	.show1{
		width: 550upx;
		overflow: hidden;
	}
	.show3-btn{
			 width: 275upx;
			 text-align: center;
	}
	.show1-btn {
	  width: 200upx;
	  border-radius: 40upx;
	  text-align: center;
	}
	.show1-txt{
		width: 510upx;
	}
	.show2-btn{
			 width: 550upx;
			 text-align: center;
	}
</style>
