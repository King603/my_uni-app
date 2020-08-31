<template>
  <view class="my-pd-15 my-flex-col">
    <view class="my-flex-row-align-c">
      <text>设置冻结金额：</text>
      <input @blur="blurFreezeAmount" type="digit" value class="my-mgl-10 my-bder-b freeze" />
      <text class="my-mgl-5">元</text>
    </view>
    <view class="my-flex-row-align-c my-mgt-10">
      <text class="my-font-11 my-flex-self-s my-cl-grey lh">注：</text>
      <text class="my-font-11 my-cl-grey lh">下级代理只能提现超出冻结以外部分，冻结金后期可以进行修改。</text>
    </view>
    <view class="my-flex-row-align-c my-mgt-10">
      <text>设置自动扣款金额：</text>
      <input @blur="blurAutoDeductAmount" type="digit" value class="my-mgl-10 my-bder-b freeze" />
      <text class="my-mgl-5">元</text>
    </view>
    <view class="my-flex-row-align-c my-mgt-10">
      <text class="my-font-11 my-flex-self-s my-cl-grey lh">注：</text>
      <text class="my-font-11 my-cl-grey lh">该代理账户的余额将会优先自动扣款至您的账户，直至自动扣款金额减少至0为止。</text>
    </view>
    <view class="my-flex-row-align-c my-mgt-10">
      <text>设置提现手续费：</text>
      <input @blur="blurWithdrawScale" type="digit" value class="my-mgl-10 my-bder-b freeze" />
      <text class="my-mgl-5">%</text>
    </view>
    <view class="my-flex-row-align-c my-mgt-10">
      <text class="my-font-11 my-flex-self-s my-cl-grey lh">注：</text>
      <text class="my-font-11 my-cl-grey lh">该代理账户的余额将会优先自动扣款至您的账户，直至自动扣款金额减少至0为止。</text>
    </view>
    <view class="my-flex-row-c box">
      <view
        class="my-mgt-15 my-font-16 my-cl-white my-flex-row-c my-boxsha-2 my-bg-ye btn"
        @click="onAmend"
      >确认修改</view>
    </view>
  </view>
</template>

<script>
import req from "../../../util/req.js";
export default {
  data() {
    return {
      freezeAmount: 0,
      autoDeductAmount: 0,
      withdrawScale: 0,
      id: 0,
    };
  },
  components: {},
  computed: {},
  onLoad(options) {
    this.id = Number(options.id) || 0;
  },
  onShow() {},
  methods: {
    blurWithdrawScale(e) {
      let val = e.detail.value;
      this.withdrawScale = Number(val) / 100;
    },
    blurAutoDeductAmount(e) {
      let val = e.detail.value;
      this.autoDeductAmount = Number(val);
    },
    blurFreezeAmount(e) {
      let val = e.detail.value;
      this.freezeAmount = Number(val);
    },
    onAmend() {
      uni.showModal({
        title: "确认修改",
        content: "是否确认修改？",
        cancelText: "否",
        confirmText: "是",
        success: (res) => {
          if (res.cancel) {
            // 用户点击了取消属性的按钮
          } else if (res.confirm) {
            // 用户点击了确定属性的按钮
            this.edit = false;
            let params = {
              freezeAmount: this.freezeAmount,
              autoDeductAmount: this.autoDeductAmount,
              withdrawScale: this.withdrawScale,
            };
            req.request(
              "PUT",
              params,
              "/proxy/api/proxy/sub/" + this.id + "/withdraw",
              "加载中",
              (res) => {
                // console.log(res)
                if (res.statusCode === 200) {
                  uni.navigateBack({
                    delta: 1,
                    success: (res) => {
                      uni.showToast({
                        title: "修改成功！",
                        icon: "success",
                      });
                    },
                  });
                }
              }
            );
          }
        },
        fail() {},
        complete() {},
      });
    },
  },
};
</script>

<style>
page {
  background: #ffffff;
}

.box {
  width: 100%;
}

.freeze {
  width: 100upx;
}

.lh {
  line-height: 40upx;
}

.btn {
  width: 500upx;
  height: 80upx;
  border-radius: 40upx;
}
</style>
