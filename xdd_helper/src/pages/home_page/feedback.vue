<template>
  <view class="my-flex-col-c box my-pd-15">
    <view class="my-flex-row-c box">
      <view class="my-bder-b-cc line"></view>
      <text class="my-mglr-25 my-font-16">问题反馈</text>
      <view class="my-bder-b-cc line"></view>
    </view>
    <view class="box my-flex-row-align-c">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">请选择您遇到的问题类型</text>
    </view>
    <view class="box my-flex-row-b my-flex-warp mgtop">
      <view
        style="align-content: flex-start"
        class="title my-rds-5 my-flex-row-c my-bder-DE"
        v-for="(item,index) in fault"
        :key="index"
        :class="index==select?'my-bder-ye-light imges':''"
        @click="onFault(index)"
      >{{item.title}}</view>
    </view>
    <view class="box my-flex-row-align-c">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">请详细描述您遇到的问题</text>
    </view>
    <view class="box my-bder-DE my-rds-5 my-font-12">
      <textarea
        value
        placeholder="您遇到的问题是......"
        @blur="questiondetail"
        placeholder-class="my-cl-c3"
        class="txt-box my-rds-10 my-pd-10"
      />
    </view>
    <view class="box my-flex-row-align-c">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">请填写问题设备的编号</text>
    </view>
    <view class="code my-rds-5 my-flex-row-align-c my-bder-DE">
      <view class="w-65 h my-font-12 my-pd-10 my-flex-row-align-c">
        <input
          type="text"
          :value="devId"
          @blur="getdeviceid"
          placeholder="设备编号"
          placeholder-class="my-cl-a3"
        />
      </view>
    </view>
    <view class="box my-flex-row-align-c">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">请填写您的电话号码</text>
    </view>
    <view class="code my-bder-DE my-flex-row-align-c my-rds-5 my-pd-10 my-font-12">
      <input type="text" value @blur="getphone" placeholder="电话号码" placeholder-class="my-cl-a3" />
    </view>
    <view class="box my-flex-row-align-c">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">请填写您的寄件单号</text>
    </view>
    <view class="code my-bder-DE my-flex-row-align-c my-rds-5 my-pd-10 my-font-12">
      <input type="text" value @blur="getorder" placeholder="寄件单号" placeholder-class="my-cl-a3" />
    </view>
    <view class="box my-flex-row-align-c">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">请填写您的收货地址</text>
    </view>
    <view class="code my-bder-DE my-flex-row-align-c my-rds-5 my-pd-10 my-font-12">
      <input type="text" value @blur="getaddress" placeholder placeholder-class="my-cl-a3" />
    </view>
    <view class="box my-flex-row-align-c">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">售后地址</text>
    </view>
    <view class="code my-bder-DE my-flex-row-b my-rds-5 my-pd-10 my-font-12">
      <input
        type="text"
        value
        placeholder="福建厦门集美软件园三期B20栋5楼"
        @blur="getafteraddress"
        placeholder-class="my-cl-a3"
      />
      <view class="my-flex-col-c btn1 my-rds-5 my-bg-ye my-cl-white" @click="copyaddress">一键复制</view>
    </view>
    <view class="box my-flex-row-align-c my-mgt-10">
      <text class="my-cl-ye my-pdt-8 my-font-20">*</text>
      <text class="my-cl-a3 my-pdl-7 my-font-12">上传照片（帮助我们更快为您解决问题）</text>
    </view>
    <view class="box my-flex-row-b my-mgb-10">
      <uImg
        ref="upimg"
        :canUploadFile="true"
        :limit="limitNum"
        :uploadFileUrl="uploadFileUrl"
        :heaer="header"
        :fileKeyName="name"
        :uImgList.sync="uImgList"
        @uploadSuccess="uploadSuccess"
      ></uImg>
    </view>
    <view
      class="btn my-mgt-15 my-bg-ye my-boxsha-2 my-font-20 my-flex-row-c my-cl-white"
      @click="onUpFile"
    >立即提交</view>
    <loading ref="loading" :custom="false" :shadeClick="true" :type="1" @callback="callback()">
      <!-- <view class="test">自定义</view> -->
    </loading>
  </view>
</template>

<script>
import uImg from "@/components/uploadImg/uploadImg.vue";
import loading from "@/components/xuan-loading/xuan-loading.vue";
import req from "@/util/req.js";
let toast = (msg) => {
  uni.showToast({
    title: msg,
    icon: "none",
  });
};
export default {
  data() {
    return {
      msg: "",
      fault: [
        {
          title: "无法充电",
          state: false,
        },
        {
          title: "借出失败",
          state: false,
        },
        {
          title: "归还失败",
          state: false,
        },
        {
          title: "弹宝失败",
          state: false,
        },
        {
          title: "主机故障",
          state: false,
        },
        {
          title: "订单问题",
          state: false,
        },
      ],
      limitNum: 6,
      uploadFileUrl:
        "https://a3.dns06.net.cn/app/index.php?i=2&c=entry&a=wxapp&do=Upload_qiniu_b&m=jzwx_a", //替换成你的后端接收文件地址
      name: "", //上传的名字
      header: {
        // 如果需要header，请上传
      },
      uImgList: [],
      newlist: null,
      devId: "",
      select: null,
      question: null,
      deviceid: null,
      phonenum: null,
      order: null,
      address: null,
      afteraddress: "福建厦门集美软件园三期B20栋5楼",
    };
  },
  components: {
    uImg,
    loading,
  },
  computed: {},
  mounted() {
    this.open();
    setTimeout(() => {
      this.close();
    }, 2000);
  },
  methods: {
    // 选择报修问题
    onFault(e) {
      this.select = e;
      console.log("报修问题", e);
    },
    // 问题详细描述
    questiondetail(e) {
      this.question = e.detail.value;
    },
    // 设备编号
    getdeviceid(e) {
      this.deviceid = e.detail.value;
      console.log(this.deviceid);
    },
    // 电话号码
    getphone(e) {
      this.phonenum = e.detail.value;
      console.log(this.phonenum);
    },
    // 获取寄件单号
    getorder(e) {
      this.order = e.detail.value;
      console.log(this.order);
    },
    // 获取收货地址
    getaddress(e) {
      this.address = e.detail.value;
      console.log(this.address);
    },
    // 获取售后地址
    getafteraddress(e) {
      if (e.detail.value.length !== 0) {
        this.afteraddress = e.detail.value;
      }
      console.log(this.afteraddress);
    },
    // 一键复制地址
    copyaddress() {
      var that = this;
      uni.setClipboardData({
        data: that.afteraddress,
        success: function (res) {
          uni.showToast({
            title: "一键复制成功",
          });
        },
      });
    },
    uploadSuccess(result) {
      //上传成功的回调处理
      toast(result.statusCode == 200 ? "上传成功" : "上传失败");
    },
    // 提交报修
    onUpFile() {
      switch (null) {
        case this.select: // 报修类型
          uni.showToast({
            title: "请选择报修类型",
            icon: "none",
          });
          return;
        case this.question: // 问题描述
          uni.showToast({
            title: "请填写问题设备的编号",
            icon: "none",
          });
          return;
        case this.deviceid: // 设备编号
          uni.showToast({
            title: "请填写问题设备的编号",
            icon: "none",
          });
          return;
        case this.phonenum: // 电话号码
          uni.showToast({
            title: "请填写您的手机号",
            icon: "none",
          });
          return;
        case this.order: // 寄件单号
          uni.showToast({
            title: "请填写您的寄件单号",
            icon: "none",
          });
          return;
        case this.address: // 收货地址
          uni.showToast({
            title: "请填写您的寄件单号",
            icon: "none",
          });
          return;
      }
      this.$refs.upimg.upload();
      if (this.uImgList.length === 0) {
        uni.showToast({
          title: "请上传图片",
          icon: "none",
        });
        return;
      }
      console.log("图片", this.uImgList);
      // var arrs=this.uImgList;
      uni.uploadFile({
        url: "https://xdd.pumi.site/proxy/tool/upload",
        filePath: this.uImgList[0],
        name: "file",
        header: {
          "X-HXCharge-Authentication": "HXCharge Authentication Header",
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          this.newlist = data.data;
          console.log("转换", this.newlist);
          var isbusiness = uni.getStorageSync("openIdBindByBusiness");
          if (isbusiness == false) {
            // 代理端报修
            this.toproxyrepaire();
          } else {
            // 商户端报修
            this.tobusinessrepaire();
          }
        },
        fail: (res) => {
          console.log("fail");
        },
      });
    },
    // 代理端报修
    toproxyrepaire() {
      var params = {
        address: this.address,
        deliverNumber: this.order,
        deviceNo: this.deviceid,
        phoneNumber: this.phonenum,
        remark: this.question,
        reportPicUrl: this.newlist,
        reportType: this.fault[this.select].title,
      };
      req.request(
        "POST",
        params,
        "/proxy/fault-report/proxy",
        "加载中",
        (res) => {
          if (res.statusCode === 200) {
            uni.showToast({
              title: "报修成功",
              icon: "none",
            });
            uni.navigateBack({});
          }
        }
      );
    },
    // 商户端报修
    tobusinessrepaire() {
      var params = {
        address: this.address,
        deliverNumber: this.order,
        deviceNo: this.deviceid,
        phoneNumber: this.phonenum,
        remark: this.question,
        reportPicUrl: this.newlist,
        reportType: this.fault[this.select].title,
      };
      req.request(
        "POST",
        params,
        "/proxy/fault-report/business",
        "加载中",
        (res) => {
          if (res.statusCode === 200) {
            uni.showToast({
              title: "报修成功",
              icon: "none",
            });
            uni.navigateBack({});
          }
        }
      );
    },

    close: function () {
      this.$refs.loading.close();
    },
    open: function () {
      this.$refs.loading.open();
    },
    callback() {
      // console.log("回掉");
    },
  },
};
</script>

<style>
page {
  padding-bottom: 0;
}

.box {
  width: 750upx;
  background-color: #ffffff;
}

.box .box {
  width: 100%;
}
.txt-box {
  width: 690upx;
  height: 185upx;
}
.line {
  width: 200upx;
  height: 5upx;
}
.h {
  height: 80upx;
}
.btn {
  width: 650upx;
  height: 100upx;
  border-radius: 50upx;
}
.title {
  width: 309upx;
  height: 77upx;
}
.code {
  width: 100%;
  height: 77upx;
  overflow: hidden;
}
.w-65 {
  width: 65%;
}
.w-35 {
  width: 35%;
}
.imges {
  background-image: url(../../static/index/fb-choose.jpg);
  background-repeat: no-repeat;
  background-position: left top;
  background-origin: content-box;
  padding: 15upx;
  background-size: 50upx;
}
.mgtop view:nth-child(3),
.mgtop view:nth-child(4),
.mgtop view:nth-child(5),
.mgtop view:nth-child(6) {
  margin-top: 30upx !important;
}
.my-bder-DE {
  border: 2upx solid #dedede;
}
.btn1 {
  width: 200upx;
  height: 80upx;
  margin-right: -22upx;
}
</style>