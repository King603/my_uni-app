let { config } = require('./config.js');
function request(method, data, url, message, success, fail) {
  uni.showNavigationBarLoading()
  try {
    let sessionKey = uni.getStorageSync("sessionKey");
    console.log('sessionkey:')
    console.log(sessionKey);
    if (sessionKey) {
      uni.request({
        url: config.apiHost + url, //这里用getapp方法获取不到
        data: data,
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'X-HXCharge-Authentication': "" + sessionKey,
          // 'XX-Device-Type': 'wxapp',
          // 'XX-Token': '' + uni.getStorageSync('token')
        },
        method: method,
        success: function (res) {
          uni.hideNavigationBarLoading()
          //console.log('这是res')
          //console.log(res)
          if (res.statusCode == 401) {
            uni.setStorageSync("isLogin", false)
            uni.removeStorageSync('openId')
            uni.removeStorageSync('openIdBindByProxy')
            uni.removeStorageSync('sessionKey')
            uni.removeStorageSync('openIdBindByBusiness')
            let msg = res.data.message.toString().indexOf('login') > 0 ? '登录超时' : res.data.message.toString();
            uni.showToast({ title: msg, icon: 'none' });
            setTimeout(function () {
              uni.reLaunch({
                url: "/pages/index/login"
              });
            }, 1000);
            // uni.showModal({
            //   title: '提示',
            //   content: res.data.message,
            //   success (res) {
            //     if (res.confirm) {
            //      uni.redirectTo({
            //      	url:"/pages/index/login"
            //      });
            //     } else if (res.cancel) {
            //      uni.redirectTo({
            //      	url:"/pages/index/login"
            //      });
            //     }
            //   }
            // }) 
          } else {
            success(res)
          }
        },
        fail: function (err) {
          uni.hideNavigationBarLoading()
          console.log('请求失败：' + err)
        },
      })
    }
  } catch (e) {

  }
}
module.exports = {
  request: request
}