<template>
  <view class="my-flex-col-c box">
    <view class="box my-pd-10 my-flex-row-b">
      <view class="my-flex-row-align-c my-cl-grey">
        <text class="my-cl-grey my-font-16">共{{total}}个设备</text>
      </view>
      <view class="my-flex-row-align-c my-cl-grey">
        <text class="my-font-16">总收益：</text>
        <text class="my-font-18">{{totalRevenue}}</text>
        <text class="my-font-16">元</text>
      </view>
    </view>
    <order :order="order"></order>
    <view
      class="my-flex-col-c top-icon my-hdimg-c-40 my-bg-ye my-boxsha-2"
      v-show="top"
      @click="onTop"
    >
      <image src="/static/go-top.png" class="my-hdimg-c-30" mode></image>
    </view>
  </view>
</template>

<script>
import order from "@/components/order/order.vue";
import req from "@/util/req.js";
export default {
  data() {
    return {
      proxyId: 0,
      order: [],
      top: false,
      totalRevenue: 0,
      total: 0,
    };
  },
  components: {
    order,
  },
  computed: {},
  onPageScroll(res) {
    this.scrollTop = res.scrollTop;
    this.top = this.scrollTop > 0;
  },
  onLoad(options) {
    this.proxyId = Number(options.id) || 0;
  },
  onShow() {
    this.getProxy();
  },
  methods: {
    getProxy() {
      let params = {
        pageIndex: 0,
        pageSize: 30,
      };
      req.request(
        "POST",
        params,
        "/proxy/api/proxy/sub/" + this.proxyId,
        "加载中",
        (res) => {
          // console.log(res.data)
          if (res.statusCode === 200) {
            var arr = res.data.data.rows;
            for (var i = 0; i < arr.length; i++) {
              arr[i].types = 21;
            }
            this.order = arr;
            this.total = res.data.total;
            this.totalRevenue = res.data.totalRevenue;
          }
        }
      );
    },
    onTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
  },
};
</script>

<style>
.box {
  width: 750upx;
}

.top-icon {
  width: 80upx;
  height: 80upx;
  position: fixed;
  right: 20upx;
  bottom: 20upx;
}
</style>
