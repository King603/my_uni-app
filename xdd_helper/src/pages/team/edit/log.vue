<template>
  <view class="box my-flex-col">
    <view class="box my-pd-10 my-flex-row-b">
      <text>{{agency[id].agency}}</text>
    </view>
    <view class="box my-flex-row-align-c my-bg-white" v-if="id!=='3'">
      <view
        class="tabbar-item my-pd-5 my-flex-col-c bder-l my-font-16"
        :class="ind===index?'my-bder-b-ye my-cl-ye':'my-cl-grey'"
        v-for="(item,index) in agency[id].tabbar"
        :key="index"
        @click="onTabbar(index)"
      >
        <text>{{item.tab}}</text>
        <text class="my-font-11">({{item.num}})</text>
      </view>
    </view>
    <view
      class="my-bg-white my-pdl-10 my-pdr-10 my-font-12 my-pdt-5 my-pdb-5"
      v-for="(item,index) in dev"
      :key="index"
    >
      <view class="my-flex-row-b">
        <text>设备编号：{{item.deviceNo}}</text>
        <view
          class="my-bder-ye my-rds-5 my-cl-ye my-pdl-5 my-pdr-5 my-pdt-2 my-pdb-2"
          v-if="item.belongCurrentProxy===true"
        >当前持有</view>
        <view
          class="my-bder-0f my-rds-5 my-pdl-5 my-pdr-5 my-pdt-2 my-pdb-2"
          v-if="item.belongCurrentProxy===false"
        >分配下级</view>
        <text>交易次数：{{item.usedTimes}}次</text>
      </view>
    </view>
    <goTop :top="top"></goTop>
  </view>
</template>

<script>
import goTop from "../../../components/goTop/goTop.vue";
import req from "../../../util/req.js";
export default {
  data() {
    return {
      top: false,
      proxyId: 0,
      ind: 0,
      id: 0,
      agency: [
        {
          agency: "龚勤",
          tabbar: [
            {
              tab: "H60",
              num: 58,
            },
            {
              tab: "X10",
              num: 1800,
            },
          ],
        },
        {
          agency: "吴群",
          tabbar: [
            {
              tab: "H60",
              num: 58,
            },
            {
              tab: "X10",
              num: 1000,
            },
          ],
        },
        {
          agency: "罗真雨",
          tabbar: [
            {
              tab: "H60",
              num: 100,
            },
            {
              tab: "X10",
              num: 1800,
            },
          ],
        },
        {
          agency: "卢振飞",
          tabbar: [
            {
              tab: "H60",
              num: 86,
            },
            {
              tab: "X10",
              num: 1800,
            },
          ],
        },
      ],
      dev: [],
    };
  },
  components: {
    goTop,
  },
  computed: {},
  onLoad(options) {
    this.proxyId = Number(options.id) || 0;
    // console.log(this.id)
  },
  onShow() {
    this.getLog();
  },
  onPageScroll(res) {
    this.scrollTop = res.scrollTop;
    if (this.scrollTop > 0) {
      this.top = true;
    } else {
      this.top = false;
    }
  },
  methods: {
    getLog() {
      let params = {
        pageIndex: 0,
        pageSize: 30,
      };
      req.request(
        "POST",
        params,
        "/proxy/api/proxy/sub/" + this.proxyId + "/used",
        "加载中",
        (res) => {
          // console.log(res)
          if (res.statusCode === 200) {
            this.dev = res.data.data.rows;
          }
        }
      );
    },
    onTabbar(e) {
      this.ind = e;
      switch (e) {
        case 0:
          this.getLog();
          break;
        case 1:
          this.dev = [
            {
              deviceNo: "SN:X103325567723",
              belongCurrentProxy: true,
              usedTimes: 321,
            },
            {
              deviceNo: "SN:X103325567723",
              belongCurrentProxy: true,
              usedTimes: 321,
            },
            {
              deviceNo: "SN:X103325567723",
              belongCurrentProxy: true,
              usedTimes: 321,
            },
            {
              deviceNo: "SN:X103325567723",
              belongCurrentProxy: true,
              usedTimes: 321,
            },
            {
              deviceNo: "SN:X103325567723",
              belongCurrentProxy: false,
              usedTimes: 321,
            },
            {
              deviceNo: "SN:X103325567723",
              belongCurrentProxy: false,
              usedTimes: 321,
            },
          ];
          break;
      }
    },
  },
};
</script>

<style>
.box {
  width: 100%;
}

.tabbar-item {
  width: 150upx;
}
</style>
