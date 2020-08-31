<template>
  <view class="box my-pd-10 my-flex-col">
    <view class="box my-flex-row-align-c">
      <text>是否给此代理商开通广告权限</text>
    </view>
    <text class="my-font-11 my-pdtb-15 my-cl-grey">注：开通下级代理商的广告权限后，下级代理商将会得到部分广告分成。</text>
    <view class="box my-flex-row-align-c">
      <text>设置广告分成：</text>
      <input type="text" value class="my-bder-b my-mgl-5" />
      <text class="my-mgl-5">%</text>
    </view>
    <text class="my-font-11 my-pdtb-15 my-cl-grey">注：代理将会得到部分您设置的广告分成。</text>
    <view class="my-flex-row-c box my-mgt-25">
      <view
        class="btn my-bg-ye my-cl-white my-flex-row-c my-boxsha-2"
        @click="onSet('QSPopup')"
      >设置分成</view>
    </view>
    <view :class="showBl?'my-show':'my-hide'">
      <QSPopup ref="QSPopup" type="fadeScaleHeightToLowInMiddle">
        <view class="content my-bg-white my-rds-10 my-flex-row-c my-flex-warp show1">
          <image src="/static/team/point.png" class="icon" mode></image>
          <text>您还没有开通广告权限，无法分配给下级。</text>
          <view class="my-flex-row-c my-flex-self-e my-font-18" style="width: 550upx;">
            <view class="my-grow-1 btn1 my-bg-ye my-cl-white my-flex-row-c" @click="onAffirm">确认</view>
            <view class="my-grow-1 btn1 my-flex-row-c my-cl-ye" @click="onClose">取消</view>
          </view>
        </view>
      </QSPopup>
    </view>
  </view>
</template>

<script>
import QSPopup from "../../../components/QS-popup/QS-popup.vue";
export default {
  data() {
    return {
      showBl: true,
    };
  },
  components: {
    QSPopup,
  },
  computed: {},
  onLoad(options) {},
  onShow() {},
  methods: {
    onAffirm() {
      this.showBl = false;
      uni.navigateBack({ delta: 1 });
    },
    onClose() {
      this.showBl = false;
    },
    onSet(ref) {
      this.showBl = true;
      this.$refs[ref].show();
    },
  },
};
</script>

<style>
page {
  background: #ffffff;
  padding-bottom: 0;
}
.box {
  width: 100%;
}
input {
  width: 100upx;
}
.btn {
  width: 500upx;
  height: 80upx;
  border-radius: 40upx;
}
.icon {
  width: 120upx;
  height: 120upx;
}
.btn1 {
  height: 80upx;
}
.show1 {
  height: 350upx;
  width: 550upx;
  overflow: hidden;
}
</style>
