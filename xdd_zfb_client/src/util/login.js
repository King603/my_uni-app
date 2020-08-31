var req = require('./req.js');
var config = require('./config.js');
config = config.config

function userLogin() {
	let promise = new Promise((resolve, reject) => {
		// uni.login({
		// 	success: function(res) {
		// 		var code = res["code"];
		// 		let appId = config.appId
		// 		uni.getUserInfo({
		// 			provider: 'weixin',
		// 			success: (info) => {
		// 				var rawData = info['rawData'];
		// 				var signature = info['signature'];
		// 				var encryptedData = info['encryptedData'];
		// 				var iv = info['iv'];
		// 				var name = info.userInfo.nickName
		// 				uni.setStorageSync('avatarUrl',info.userInfo.avatarUrl)
		// 				uni.request({
		// 					url: config.apiHost + "/user/wechat/jscode2session",
		// 					data: {
		// 						"jsCode": code,
		// 						"nickName":name
		// 					},
		// 					dataType: 'JSON ',
		// 					method:"POST",
		// 					success: (res) => {
		// 						var resUserInfo = JSON.parse(res.data).data;
		// 						if(JSON.parse(res.data).code=="10019999"){
		// 							uni.showToast({
		// 								title:"服务器未启动或其他原因",
		// 								icon:"none"
		// 							})
		// 						}else{
		// 							resolve(res)
		// 							uni.setStorageSync('openId',resUserInfo.openId)
		// 							uni.setStorageSync('bindPhone',resUserInfo.bindPhone)
		// 							uni.setStorageSync('sessionKey',resUserInfo.sessionKey)
		// 							uni.setStorageSync('logged',resUserInfo.logged)
		// 						}
		// 					}
		// 				});
		// 			},
		// 			fail: (err) => {
			
		// 			}
		// 		})
		// 	},
		// 	fail: (err) => {
		// 		reject(err)
		// 		console.log(err)
		// 		uni.showModal({
		// 			title: '提示',
		// 			content: '授权失败，将无法进入小程序',
		// 			confirmText: '朕知道了',
		// 			showCancel: false,
		// 			success(res) {
				
		// 			}
		// 		})
		// 	}
		// })
		uni.getAuthCode({
		  scopes: 'auth_base', 
		  success: (res) => {
		    if (res.authCode) {
			  var code=res.authCode;
		      uni.getOpenUserInfo({
				   success: (res) => {
					 let userInfo = JSON.parse(res.response).response
					 var nickName=userInfo.nickName;
					 uni.setStorageSync('avatarUrl',userInfo.avatar)
					 uni.request({
					   headers:{
					       'content-type':'application/json'   
					   },
					   dataType: 'JSON',
					   method:"POST",
					   url: config.apiHost + "/user/alipay/jscode2session", 
					   data: {
					     "jsCode": code,
					     "nickName":nickName
					   },
					   success: (res) => {
					    if(res.data.code=="10019999"){
					    	uni.showToast({
					    		title:"服务器未启动或其他原因",
					    		icon:"none"
					    	})
					    }else{
							resolve(res);
							var resUserInfo=res.data.data;
							uni.setStorageSync('openId',resUserInfo.openId)
							uni.setStorageSync('bindPhone',resUserInfo.bindPhone)
							uni.setStorageSync('sessionKey',resUserInfo.sessionKey)
							uni.setStorageSync('logged',resUserInfo.logged) 
						}
					   },
					   fail: (err) => {
					   			
					   },
					 });
				   },
				   fail: (res) => {
				   	reject(res)
				   	console.log(res)
				   	uni.showModal({
				   	title: '提示',
				   	content: '授权失败，将无法进入小程序',
				   	confirmText: '朕知道了',
				   	showCancel: false,
				   	success(res) {
				   						  		 
				   	}
				     })
				   },
			  })
		    }
		  },
		});
	})
	return promise;
}


function getUserInfo(code) {
	//封装函数

}

module.exports = {
	getUserInfo: getUserInfo,
	userLogin: userLogin
}
