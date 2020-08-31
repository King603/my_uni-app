<template>
  <view class="my-font-14 my-mgtb-10">
    <view class="my-flex-col">
      <view class="my-flex-row">
        <text class="box1">代理：</text>
        <text class="box2">{{proxyName}}</text>
      </view>
      <view class="my-flex-col my-bg-white">
        <view class="my-flex-row">
          <text class="box1">商户数量</text>
          <text class="box2">{{businessList.length}}户</text>
        </view>
        <view class="my-flex-row my-mgr-5">
          <text class="box1">铺货设备</text>
          <text class="box3">H60~{{deviceList[0].count||0}}套</text>
          <text class="box3">X10~{{deviceList[1].count||0}}条</text>
        </view>
      </view>
      <view
        class="my-flex-col"
        v-for="(item,index) in list"
        :key="index"
        :class="index % 2 == 1 ? 'my-bg-white' : ''"
      >
        <view class="my-flex-row">
          <text class="box1">商户名称</text>
          <text class="box2">{{item.mer}}</text>
        </view>
        <view class="my-flex-row">
          <text class="box1">联系电话</text>
          <text class="box2">{{item.phone}}</text>
        </view>
        <view class="my-flex-row">
          <text class="box1">铺货设备</text>
          <text class="box3">H60~{{item.H60}}套</text>
          <text class="box3">X10~{{item.X10}}套</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import req from "../../../util/req.js";
export default {
  data() {
    return {
      index: 0,
      list: [],
      proxyId: 0,
      proxyName: "",
      deviceList: null,
      businessList: null,
    };
  },
  onLoad(options) {
    this.proxyName = options.proxyName;
    this.proxyId = Number(options.id) || 0;
  },
  onShow() {
    this.getBusiness();
  },
  methods: {
    getBusiness() {
      var param = {
        pageIndex: 0,
        pageSize: 30,
      };
      req.request(
        "POST",
        param,
        "/proxy/business/list/" + this.proxyId,
        "加载中",
        (res) => {
          if (res.statusCode === 200) {
            this.businessList = res.data.data.businessList.data.rows;
            this.deviceList = res.data.data.deviceList;
          }
        }
      );
    },
  },
};
</script>

<style>
.box1 {
  width: 150upx;
  text-align: center;
  margin-top: 20upx;
  margin-right: 30upx;
}

.box2 {
  margin-left: 30upx;
  margin-top: 20upx;
}

.box3 {
  margin-left: 30upx;
  margin-top: 20upx;
  letter-spacing: 10upx;
  margin-bottom: 20upx;
}
</style>
