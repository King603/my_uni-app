var req = require('./req.js');
var config = require('./config.js');
config = config.config

function userLogin() {
  let promise = new Promise((resolve, reject) => {
    uni.login({
      success: function (res) {
        console.log(res)
        var code = res.code;
        // console.log('loginCode:', res.code)
        //2.小程序调用uni.getUserInfo得到rawData, signatrue, encryptData.
        // getUserInfo(code)
        let appId = config.appId
        uni.getUserInfo({
          provider: 'weixin',
          success: (info) => {
            // console.log(info)
            var rawData = info['rawData'];
            // console.log(rawData)
            var signature = info['signature'];
            var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
            var iv = info['iv'];
            // console.log(rawData)
            //小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            uni.request({
              // url: config.apiHost + '/api/login/douniLogin', //my_url此处填写你封装的url
              url: config.apiHost + "/proxy/wechat/jscode2session",
              data: {
                jsCode: code,
              },
              dataType: 'JSON ',
              method: "POST",
              success: (res) => {
                let data = JSON.parse(res.data);
                console.log("data: ", data.data, "code: " + data.code)
                // uni.setStorageSync('isLogin',true)
                if (data.code === "10019999") {
                  uni.showToast({
                    title: "服务器未启动或其他原因",
                    icon: "none"
                  })
                } else {
                  var resUserInfo = data.data;
                  resolve(res)
                  console.log(4444)
                  console.log(resUserInfo)
                  uni.setStorageSync('openId', resUserInfo.openId)
                  uni.setStorageSync('openIdBindByProxy', resUserInfo.loggedProxy)
                  uni.setStorageSync('sessionKey', resUserInfo.sessionKey)
                  uni.setStorageSync('openIdBindByBusiness', resUserInfo.loggedBusiness)
                }
                // var user = resUserInfo.user
                // var token = resUserInfo.token
                // var inviteCode = resUserInfo.invite_code
                // var isNew = resUserInfo.is_new
                // uni.setStorageSync('sessionKey', resUserInfo.sessionKey)
                // //生成session后发起请求，获取用户的信息并缓存
                // uni.setStorageSync('userId', user);
                // uni.setStorageSync('token', token);
                // console.log(JSON.parse(res.data).data)
                // uni.setStorageSync('inviteCode', inviteCode);
                // uni.navigateBack({
                //   delta: 1
                // })
              }
            });
          },
          fail: (err) => {

            console.log('授权失败的原因', err)
          }
        })
      },
      fail: (err) => {
        reject(err)
        console.log(err)
        uni.showModal({
          title: '提示',
          content: '授权失败，将无法进入小程序',
          confirmText: '朕知道了',
          showCancel: false,
          success(res) {
            // 点击一键登录，去授权页面
          }
        })
      }
    })
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
