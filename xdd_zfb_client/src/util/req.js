var config = require('./config.js')
config = config.config
function request(method, data, url, message, success, fail) {
	uni.showNavigationBarLoading()
	uni.request({
		url: config.apiHost + url, //这里用getapp方法获取不到
		data: data,
		header: {
			'content-type': 'application/json;charset=UTF-8',
			'X-HXCharge-Authentication': "" + uni.getStorageSync("sessionKey"),
			// 'XX-Device-Type': 'wxapp',
			// 'XX-Token': '' + uni.getStorageSync('token')
		},
		method: method,
		success: function(res) {
			uni.hideNavigationBarLoading();
			if (res.statusCode == 401) {
				uni.reLaunch({
					url: '/pages/index/index',
					success: () => {
						let msg = res.data.message.toString().indexOf('login') > 0 ? '登录超时' : res.data.message.toString();
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}
				})
			}
			success(res);
		},
		fail: function(err) {
			uni.hideNavigationBarLoading();
			uni.hideLoading();
			console.log('请求失败:');
			console.log(err);
			let msg = err.data.message.toString().indexOf('login') > 0 ? '登录超时' : err.data.message.toString();
			uni.showToast({
				title: msg,
				icon: 'none'
			});
		},
	})
}
module.exports = {
	request: request
}