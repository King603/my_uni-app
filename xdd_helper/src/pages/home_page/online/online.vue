<template>
	<view>
		<view class="box my-flex-col-c" v-if="id !== '4'">
			<view class="box h my-flex-row-c bder-tb my-bg-white" v-if="id !== '3'">
				<view
					class="tabbar-item my-flex-row-c bder-l my-font-16"
					:class="ind === index ? 'my-cl-ye' : 'my-cl-grey'"
					v-for="(item, index) in tabbar"
					:key="index"
					@click="onTabbar(index)"
				>
					{{ item }}
				</view>
			</view>
			<view class="box h1 my-flex-row-c my-bg-white my-pd-15" v-if="!search && !isBusiness">
				<view class="tab-item my-flex-row-c bder-l" :class="select === index ? 'my-cl-ye' : 'my-cl-grey'" v-for="(item, index) in tab" :key="index" @click="onTab(index)">
					{{ item }}
				</view>
				<view class="tab-item my-flex-row-c bder-l-dd">
					<view class="my-pdt-2 my-pdb-2 my-pdl-10 my-pdr-10 my-flex-row-align-c my-bg-ye my-rds-5" @click="onSearch">
						<image src="/static/index/search.png" class="icon" mode=""></image>
						<text class="my-mgl-5 my-cl-white">搜索</text>
					</view>
				</view>
			</view>
			<view class="box h1 my-flex-row-c my-bg-white my-pd-15" v-if="search">
				<view class="my-flex-row-c">
					<view class="my-pdt-2 my-pdb-2 search-box my-flex-row-c my-bg-ye my-rds-5" @click="onSearch">
						<image src="/static/index/search.png" class="icon" mode=""></image>
						<text class="my-mgl-5 my-cl-white">搜索</text>
					</view>
				</view>
			</view>

			<!-- 代理端在线设备待使用本人 -->
			<order :order="order" v-if="ind === 1 && !isBusiness && select == 0 && id == 1"></order>
			<view @click="showMore1" v-show="ind === 1 && !isBusiness && select == 0 && id == 1"><text>查看更多</text></view>
			<!-- 代理端在线设备待使用下级 -->
			<order :order="order" v-if="ind === 1 && !isBusiness && select == 1 && id == 1 && see"></order>
			<view @click="showMore1" v-show="ind === 1 && !isBusiness && select == 1 && id == 1 && see"><text>查看更多</text></view>
			<!-- 代理端在线设备租借中本人 -->
			<order :order="order" v-if="ind === 0 && !isBusiness && select == 0 && id == 1"></order>
			<view @click="showMore1" v-show="ind === 0 && !isBusiness && select == 0 && id == 1"><text>查看更多</text></view>
			<!-- 代理端在线设备租借中下级 -->
			<order :order="order" v-if="ind === 0 && !isBusiness && select == 1 && id == 1 && see"></order>
			<view @click="showMore1" v-show="ind === 0 && !isBusiness && select == 1 && id == 1 && see"><text>查看更多</text></view>
			<!-- 代理端待使用下级一级显示 -->
			<subi :junior="junior" v-if="ind === 1 && select == 1 && !see && !isBusiness" @selected="onSeeMore"></subi>
			<!-- 代理端租借中下级一级显示 -->
			<subi :junior="junior" v-if="ind === 0 && select == 1 && !see && !isBusiness" @selected="onSeeMore"></subi>

			<!-- 代理端离线设备本人 -->
			<order :order="order" v-if="ind === 0 && !isBusiness && id == 2"></order>
			<!-- <view v-show="ind === 0 && !isBusiness && id == 2"><text>查看更多</text></view> -->
			<!-- 代理端离线设备下级 -->
			<order :order="order" v-if="ind === 1 && !isBusiness && id == 2"></order>
			<view @click="showMore1" v-show="ind === 1 && !isBusiness && id == 2"><text>查看更多</text></view>

			<!-- 代理端超时设备本人 -->
			<order :order="order" v-if="select === 0 && !isBusiness && id == 3"></order>
			<view @click="showMore1" v-show="select === 0 && !isBusiness && id == 3"><text>查看更多</text></view>
			<!-- 代理端超时设备下级 -->
			<order :order="order" v-if="select === 1 && !isBusiness && id == 3"></order>
			<view @click="showMore1" v-show="select === 1 && !isBusiness && id == 3"><text>查看更多</text></view>

			<!-- 商户端在线设备租借中 -->
			<lease :lease="lease" v-if="ind === 0 && isBusiness"></lease>
			<!-- 商户端在线设备待使用 -->
			<tobeused :tobeused="tobeused" v-if="ind === 1 && isBusiness"></tobeused>

			<!-- 代理端待使用下级二级显示 -->
			<view class="box my-flex-row-b my-mgt-10 my-pdlr-10 my-cl" v-if="see">
				<text>所属下级：{{ junior[selected].proxyName }}</text>
				<view class="my-flex-row-align-c" @click="onReturn">
					<image src="/static/index/return.png" class="icon" mode=""></image>
					<text class="my-mgl-8">返回上一级</text>
				</view>
			</view>
			<!-- <order :order="order" v-if="see"></order> -->
		</view>
		<!-- id=4全部设备有设备统计 -->
		<view class="my-flex-col-c box" v-else>
			<!-- 设备统计页 -->
			<view class="my-pd-10 box" v-if="!seeDev" @click="onSeeDev">
				<view class="my-bg-white my-flex-col-c box my-rds-5">
					<view class="box my-flex-col-c my-pdtb-10 bder-b"><text class="my-font-16">设备统计</text></view>
					<view class="box my-flex-row-c">
						<view class="my-flex-row-c" style="width: 33.33%;">
							<image class="icon-img" src="/static/index/charger.png" mode=""></image>
							<text class="my-font-15 my-flex-self-e my-mgl-10">H60</text>
						</view>
						<view class="my-flex-col-c h4 my-grow-1 bder-l">
							<text class="my-font-15">{{ pedestal || 0 }}</text>
							<text>底座数</text>
						</view>
						<view class="my-flex-col-c h4 my-grow-1 bder-l1">
							<text class="my-font-15">{{ powerbank || 0 }}</text>
							<text>充电宝数</text>
						</view>
					</view>
					<view class="box my-flex-row-c bder-tb">
						<view class="my-flex-row-c" style="width: 33.33%;">
							<image class="icon-img" src="/static/index/plug.png" mode=""></image>
							<text class="my-font-15 my-flex-self-e my-mgl-10">X10</text>
						</view>
						<view class="my-flex-row-c h4 my-grow-1">
							<view class="my-flex-col-c h4" style="width: 50%;"></view>
							<view class="my-flex-col-c h4 bder-l1" style="width: 50%;"></view>
						</view>
						<view class="my-flex-col-c h4" style="width: 33.33%;">
							<text class="my-font-15">{{ USB || 0 }}</text>
							<text>充电线数</text>
						</view>
					</view>
					<view class="my-flex-col-c my-pdtb-10" @click="onSeeDev"><text class="my-cl-grey">查看设备详情 >></text></view>
				</view>
			</view>
			<view class="box" v-if="seeDev && isBusiness == false">
				<!-- 一级导航栏 -->
				<view class="box h my-flex-row-c bder-tb my-bg-white">
					<view
						class="tabbar-item my-flex-row-c bder-l my-font-16"
						:class="ind === index ? 'my-cl-ye' : 'my-cl-grey'"
						v-for="(item, index) in tabbar"
						:key="index"
						@click="onTabbar(index)"
					>
						{{ item }}
					</view>
				</view>
				<!-- 二级导航栏 -->
				<view class="box h1 my-flex-row-c my-bg-white my-pd-15">
					<view
						class="tab-item my-flex-row-c bder-l"
						:class="select === index ? 'my-cl-ye' : 'my-cl-grey'"
						v-for="(item, index) in tab"
						:key="index"
						@click="onTab(index)"
					>
						{{ item }}
					</view>
					<view class="tab-item my-flex-row-c bder-l-dd">
						<view class="my-pdt-2 my-pdb-2 my-pdl-10 my-pdr-10 my-flex-row-align-c my-bg-ye my-rds-5" @click="onSearch">
							<image src="/static/index/search.png" class="icon" mode=""></image>
							<text class="my-mgl-5 my-cl-white">搜索</text>
						</view>
					</view>
				</view>

				<!-- 全部设备我的设备已铺货 -->
				<order :order="order" v-if="ind === 0 && select == 0 && isBusiness == false"></order>
				<!-- 全部设备我的设备未铺货 -->
				<order :order="order" v-if="ind === 0 && select == 1 && isBusiness == false"></order>
				<!-- 全部设备下级设备已铺货 -->
				<order :order="order" v-if="ind === 1 && select == 0 && isBusiness == false"></order>
				<!-- 全部设备下级设备未铺货 -->
				<order :order="order" v-if="ind === 1 && select == 1 && isBusiness == false && see"></order>

				<!-- 全部设备下级设备未铺货，一次显示 -->
				<subi :junior="junior" v-if="ind === 1 && !see" @selected="onSeeMore"></subi>
				<view class="box my-flex-row-b my-mgt-10 my-pdlr-10 my-cl" v-if="see">
					<text>所属下级：{{ junior[selected].proxyName }}</text>
					<view class="my-flex-row-align-c" @click="onReturn">
						<image src="/static/index/return.png" class="icon" mode=""></image>
						<text class="my-mgl-8">返回上一级</text>
					</view>
				</view>
			</view>
			<!-- 商户端全部设备 -->
			<view class="" v-if="seeDev && isBusiness == true">
				<view class="box">
					<view class="box h-hei my-flex-row-c" style="background-color: #FFFFFF;">
						<view class=""><image src="/static/index/top.png" class="icon-top"></image></view>
						<view class="class-sea my-flex-row-c my-cl-a3 my-mglr-10" @click="tosearchorder">
							<image src="/static/index/search-1.png" class="icon-search" mode=""></image>
							<text class="class-font">搜索</text>
						</view>
						<view class="my-font-15 my-cl-a3" @click="tosearchorder">搜索</view>
					</view>
				</view>
				<busidevice :busidevice="busidevice"></busidevice>
			</view>
		</view>
		<goTop :top="top"></goTop>
		<!-- 商户端离线设备 -->
		<busidevice :busidevice="busidevice" v-if="isBusiness === true && id === '2'"></busidevice>
		<!-- 商户端超时设备 -->
		<busidevice :busidevice="busidevice" v-if="isBusiness === true && id === '3'"></busidevice>
	</view>
</template>

<script>
import lease from '../../../components/on-line/lease.vue'
import tobeused from '../../../components/on-line/tobeused.vue'
import order from '../../../components/order/order.vue'
import busidevice from '../../../components/busidevice/busidevice.vue'
import subi from '../../../components/sub/sub.vue'
import allDev from '../../../components/all-dev/all-dev.vue'
import goTop from '../../../components/goTop/goTop.vue'
import req from "../../../util/req.js"
export default {
  data() {
    return {
      curPageIndex1: 0,
      curPageCount1: 1,
      curTotalCount1: 0,
      curPageSize: 1000,
      // 底座
      pedestal: null,
      // 充电宝
      powerbank: null,
      seeDev: false,
      powerBank: null,
      powerBank2: null,
      USB: 0,
      selected: null,
      allDev: [],
      see: false,
      tabbar: ['租借中', '待使用'],
      ind: 0,
      tab: ['本人', '下级'],
      select: 0,
      search: false,
      top: false,
      id: 0,
      order: [],
      junior: [],
      proxyId: null,
      isBusiness: false,
      busidevice: [],
      lease: [],
      tobeused: [],
    }
  },
  components: {
    order,
    subi,
    allDev,
    goTop,
    busidevice,
    lease,
    tobeused,
  },
  onLoad(options) {
    this.id = options.id
    this.isBusiness = uni.getStorageSync('openIdBindByBusiness') || false
    switch (parseInt(this.id)) {
      case 1:// id=1:代理端在线设备
        uni.setNavigationBarTitle({
          title: '在线设备'
        });
        this.search = false;
        if (this.isBusiness === false) {
          // 代理端首次进入默认请求
          console.log("代理租借中本人");
          this.getproxydevice();
        } else {
          // 商户端
          this.getLease();
        }
        break;
      case 2:
        this.search = true;
        if (this.isBusiness === false) {
          this.tabbar = ['我的设备', '下级设备'];
          this.getDeviceOFF('SELF');
        } else {
          this.tabbar = ['我的设备'];
          this.getBusinessDeviceOFF();
        }
        uni.setNavigationBarTitle({
          title: '离线设备'
        });
        break;
      case 3:// 超时设备
        this.search = false;
        uni.setNavigationBarTitle({
          title: '超时设备'
        });
        // 代理端超时设备，首次默认请求本人
        if (this.isBusiness === false) {
          this.overtimedevice('SELF');
        } else {
          this.search = true;
          this.getBusinessDeviceTimeout();
        }
        break;
      case 4:// 代理端全部设备
        this.search = true;
        this.tabbar = ['我的设备', '下级设备'];
        this.tab = ['已铺货', '未铺货'];
        // 代理端
        if (this.isBusiness === false) {
          // 获取全部设备的设备个数，要累加
          this.getCount();
          // 下级代理设备统计，有一个底座
          // this.getAgency()
          // 首次进入，我的设备已绑定
          this.getAgencyBind("SELF");
          uni.setStorageSync('AgencyBindKey', "SELF");
        } else {
          this.seeDev = true;
          // 商户端获取全部设备
          this.getCount();
        }
        uni.setNavigationBarTitle({
          title: '全部设备'
        });
        break;
    }
  },
  onShow() {

  },
  onReady() {

  },
  onPageScroll(res) {
    this.scrollTop = res.scrollTop
    if (this.scrollTop > 0) {
      this.top = true
    } else {
      this.top = false
    }
  },
  methods: {
    showMore1() {
      console.log('设备列表 下一页')
      if (this.curTotalCount1 < this.curPageSize) {
        uni.showToast({ title: '没有更多数据了', 'icon': 'none' })
        return;
      }
      if (this.curPageIndex1 + 1 <= this.curPageCount1) {
        this.curPageIndex1++
      }
      else {
        uni.showToast({ title: '没有更多数据了', icon: 'none' });
        return;
      }
      var agencyBindKey = uni.getStorageSync('AgencyBindKey')
      this.getAgencyBind(agencyBindKey)
    },
    tosearchorder() {
      uni.navigateTo({
        url: "/pages/home_page/search/search_dev?type=businessdevice"
      })
    },
    // 超时设备
    overtimedevice(type) {
      var params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
        proxyId: '',
        queryType: type
      }
      req.request('POST', params, '/proxy/proxy/device/over-time/order', '加载中', (res) => {
        if (res.statusCode === 200) {
          if (type == 'SELF') {
            var arr = res.data.data.rows;
            for (var i = 0; i < arr.length; i++) {
              arr[i].types = 7;
            }
            this.order = arr;
          } else {
            var arrs = res.data.data.rows;
            for (var i = 0; i < arrs.length; i++) {
              arrs[i].types = 8;
            }
            this.order = arrs;
          }
        }
      })

    },
    // 代理端在线设备租借中下级一次请求
    getproxydevicenext() {
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
      }
      req.request('POST', params, '/proxy/proxy/sub/device/order/count', '加载中', (res) => {
        if (res.statusCode === 200) {
          console.log("代理端在线设备租借中下级")
          console.log(res.data.data.rows[0].proxyName)
          if (res.data.data.rows[0].proxyName != undefined) {
            this.junior = res.data.data.rows
          }
        }
      })
    },
    // 代理端在线设备租借中本人
    getproxydevice() {
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
      }
      req.request('POST', params, '/proxy/proxy/device/order', '加载中', (res) => {
        if (res.statusCode === 200) {
          console.log("代理端在线设备租借中本人")
          var waitdevice = res.data.data.rows;
          for (var i = 0; i < waitdevice.length; i++) {
            waitdevice[i].types = 1;
          }
          this.order = waitdevice;
        }
      })
    },
    // 代理端在线设备待使用本人与待使用下级
    getproxydevicewait(proxyId, type) {
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
        proxyId: proxyId,
        queryType: type
      }
      req.request('POST', params, '/proxy/proxy/device/wait', '加载中', (res) => {
        if (res.statusCode === 200) {
          console.log("代理端在线设备待使用本人")
          console.log(type)
          if (type == "SELF") {
            var waitdevice = res.data.data.rows;
            for (var i = 0; i < waitdevice.length; i++) {
              waitdevice[i].types = 3;
            }
            this.order = waitdevice
          } else {
            var waitdevice2 = res.data.data.rows;
            for (var i = 0; i < waitdevice2.length; i++) {
              waitdevice2[i].types = 4;
            }
            console.log('4434', waitdevice2)
            this.order = waitdevice2
          }

        }
      })
    },
    // 商户租借中接口
    getLease() {
      this.search = true;
      if (this.isBusiness === false) { } else {
        let params = {
          pageIndex: 0,
          pageSize: this.curPageSize,
        }
        req.request('POST', params, '/proxy/business/device/lease', '加载中', (res) => {
          if (res.statusCode === 200) {
            console.log('商户租借中数据', res.data.data.rows)
            this.lease = res.data.data.rows
          }
        })
      }
    },
    // 代理设备统计接口，
    getCount() {
      if (this.isBusiness === false) {
        let params = {

        }
        req.request('GET', params, '/proxy/proxy/device/count', '加载中', (res) => {
          if (res.statusCode === 200) {
            var powerBank = res.data.data.deviceCountViews;
            console.log(powerBank)
            for (var i = 0; i < powerBank.length; i++) {
              if (powerBank[i].model == 'H60') {
                for (var j = 0; j < powerBank[i].modelCountViews.length; j++) {
                  if (powerBank[i].modelCountViews[j].deviceType == '底座') {
                    this.pedestal = powerBank[i].modelCountViews[j].count;
                  }
                }
              }
              if (powerBank[i].model == 'H601') {
                for (var k = 0; k < powerBank[i].modelCountViews.length; k++) {
                  if (powerBank[i].modelCountViews[k].deviceType == '充电宝') {
                    this.powerbank = powerBank[i].modelCountViews[k].count;
                  }
                }
              }
            }
          }
        })
      } else {
        // 商户端获取全部设备
        var params = {
          "deviceModel": "",
          "deviceNo": "",
          "pageIndex": 0,
          "pageSize": 30
        }
        req.request('POST', params, '/proxy/business/device/query', '加载中', (res) => {
          if (res.statusCode === 200) {
            console.log("商户的全部设备", res.data.data.rows)
            this.busidevice = res.data.data.rows
          }
        })
      }
    },
    // 下级代理设备统计接口，第一次显示
    getAgency() {
      if (this.isBusiness === false) {
        let params = {
          pageIndex: 0,
          pageSize: this.curPageSize
        }
        req.request('POST', params, '/proxy/proxy/sub/device/count', '加载中', (res) => {
          // console.log(res)
          if (res.statusCode === 200) {
            if (res.data.data.rows.length != 0) {
              this.junior = res.data.data.rows
            }
          }
        })
      }
    },
    // 代理端全部我的已绑定设备
    getAgencyBind(type) {
      console.log(type);
      let params = {
        pageIndex: this.curPageIndex1,
        pageSize: this.curPageSize,
        proxyId: "",
        queryType: type
      }
      req.request('POST', params, '/proxy/proxy/device/bind', '加载中', (res) => {
        if (res.statusCode === 200) {
          if (res.data.data.rows.length == 0) {
            this.curPageIndex1--;
            if (this.curPageIndex1 <= 0) this.curPageIndex1 = 0;
            uni.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          } else {

            if (type == 'SELF') {
              var alldevice = res.data.data.rows;
              for (var i = 0; i < alldevice.length; i++) {
                alldevice[i].types = 9;
              }
              this.order = alldevice;
            } else {
              var alldevices = res.data.data.rows;
              for (var i = 0; i < alldevices.length; i++) {
                alldevices[i].types = 10;
              }
              this.order = alldevices;
            }
          }

        }
      })
    },
    // 代理端全部我的未绑定设备
    getAgencyUnbind() {
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
        proxyId: "",
        queryType: "SELF"
      }
      req.request('POST', params, '/proxy/proxy/device/unbind', '加载中', (res) => {
        // console.log(res)
        if (res.statusCode === 200) {
          var arr = res.data.data.rows;
          for (var i = 0; i < arr.length; i++) {
            arr[i].types = 11;
          }
          this.order = arr
        }
      })
    },
    // 代理端离线设备我的设备
    getDeviceOFF(type) {
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
        proxyId: "",
        queryType: type
      }
      req.request('POST', params, '/proxy/proxy/device/off-line', '加载中', (res) => {
        if (res.statusCode === 200) {
          if (type === 'SELF') {
            var arr = res.data.data.rows;
            for (var i = 0; i < arr.length; i++) {
              arr[i].types = 5;
            }
            this.order = arr;
          } else {
            var arr2 = res.data.data.rows;
            for (var i = 0; i < arr2.length; i++) {
              arr2[i].types = 6;
            }
            this.order = arr2;
          }

        }
      })
    },
    // 商户端获取离线设备
    getBusinessDeviceOFF() {
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
      }
      req.request('POST', params, '/proxy/business/device/off-line', '加载中', (res) => {
        // console.log(res)
        if (res.statusCode === 200) {
          this.busidevice = res.data.data.rows
        }
      })
    },
    // 商户端超时设备
    getBusinessDeviceTimeout() {
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
      }
      req.request('POST', params, '/proxy/business/device/timeout', '加载中', (res) => {
        // console.log(res)
        if (res.statusCode === 200) {
          var alllist = res.data.data.rows;
          for (var i = 0; i < alllist.length; i++) {
            alllist[i].id = 3;
          }
          this.busidevice = alllist;
        }
      })
    },

    onSeeDev() {
      this.seeDev = true
    },
    onSearch(e) {
      if (this.isBusiness == true) {
        uni.navigateTo({
          url: "/pages/home_page/search/search_dev?type=businessdevice"
        })
      } else {
        uni.navigateTo({
          url: "/pages/home_page/search/search_dev?type=device"
        })
      }
    },

    onTabbar(e) {
      // ind:租借中与待使用
      this.ind = e
      // console.log(this.ind)
      this.select = 0
      this.see = false
      this.more = false
      // console.log(this.id)
      if (this.isBusiness === false) {
        if (this.id === '1') {
          // 代理端在线设备租借中本人
          if (this.ind === 0 && this.select === 0) {
            this.getproxydevice();
          }
          // 代理端在线设备待使用本人
          if (this.ind === 1 && this.select === 0) {
            this.getproxydevicewait("", "SELF");
          }
        }
        if (this.id === '2') {
          if (this.ind === 0) {
            this.getDeviceOFF('SELF')
          }
          if (this.ind === 1) {
            this.getDeviceOFF('SUBORDINATE')
          }
        }
        if (this.id === '4') {
          if (this.ind === 0 && this.select === 0) {
            this.getAgencyBind("SELF")
            uni.setStorageSync('AgencyBindKey', "SELF")
          }
          if (this.ind === 1 && this.select === 0) {
            this.getAgencyBind("SUBORDINATE")
            uni.setStorageSync('AgencyBindKey', "SUBORDINATE")
          }
        }
      } else {
        // 商户在线设备
        if (this.id === '1') {
          console.log(this.ind)
          if (this.ind === 0) {
            // 商户在线设备租借中
            this.getLease()
          }
          if (this.ind === 1) {
            // 商户在线设备待使用中
            let params = {
              pageIndex: 0,
              pageSize: this.curPageSize,
            }
            req.request('POST', params, '/proxy/business/device/unused', '加载中', (res) => {
              if (res.statusCode === 200) {
                this.tobeused = res.data.data.rows
              }
            })
          }
        }
      }
    },
    // 待使用下级count
    getproxydevicewaitcount() {
      this.order = null
      let params = {
        pageIndex: 0,
        pageSize: this.curPageSize,
      }
      req.request('POST', params, '/proxy/proxy/sub/wait/device/count', '加载中', (res) => {
        if (res.statusCode === 200) {
          var arr = res.data.data.rows;
          // for(var i=0;i<arr.length;i++){
          // 	arr[i].types=4;
          // }
          if (arr.length != 0) {
            this.junior = arr;
          }

        }
      })
    },
    onTab(e) {
      // 二级导航栏点击事件:本人与下级
      this.select = e
      this.see = false
      // 代理端首页4个头部点击
      if (this.isBusiness === false) {
        if (this.id === '1') {
          // 代理端在线设备使用中本人
          if (this.ind === 0 && this.select === 0) {
            this.getproxydevice();
          }
          // 代理端在线设备待使用本人
          if (this.ind === 1 && this.select === 0) {
            this.getproxydevicewait("", "SELF");
          }
          // 下级点击，代理端在线设备待使用下级
          if (this.ind === 1 && this.select === 1) {
            this.getproxydevicewaitcount();
          }
          // 下级点击，代理端在线设备租借中下级
          if (this.ind === 0 && this.select === 1) {
            this.getproxydevicenext();
          }
        }
        if (this.id === '3') {
          if (this.select === 0) {
            this.overtimedevice('SELF')
          }
          if (this.select === 1) {
            this.overtimedevice('SUBORDINATE')
          }
        }
        if (this.id === '4') {
          if (this.ind === 1 && this.select === 1) {
            this.getAgency()
          }
          // 下级已铺货
          if (this.ind === 1 && this.select === 0) {
            this.getAgencyBind("SUBORDINATE")
            uni.setStorageSync('AgencyBindKey', "SUBORDINATE")
          }
          // 本人已铺货
          if (this.ind === 0 && this.select === 0) {
            this.getAgencyBind("SELF")
            uni.setStorageSync('AgencyBindKey', "SELF")
          }
          if (this.ind === 0 && this.select === 1) {
            this.getAgencyUnbind()
          }
        }
      }
    },
    // 一次显示点击显示更多
    onSeeMore(e) {
      this.selected = e
      let ind = this.ind
      let select = this.select
      this.see = true
      this.proxyId = this.junior[e].proxyId
      if (this.isBusiness === false) {
        if (this.id == 1) {
          if (ind === 0 && select === 1) {
            console.log("租借中下级二级显示")
            let params = {
              pageIndex: 0,
              pageSize: this.curPageSize,
              proxyId: this.proxyId,
              queryType: "SUBORDINATE"
            }
            req.request('POST', params, '/proxy/proxy/device/order', '加载中', (res) => {
              if (res.statusCode === 200) {
                var arr2 = res.data.data.rows;
                for (var i = 0; i < arr2.length; i++) {
                  arr2[i].types = 2;
                }
                this.order = arr2;
              }
            })
          }
          if (ind === 1 && select === 1) {
            console.log('待使用下级二级显示页面')
            let params = {
              pageIndex: 0,
              pageSize: this.curPageSize,
              proxyId: this.proxyId,
              queryType: "SUBORDINATE"
            }
            req.request('POST', params, '/proxy/proxy/device/wait', '加载中', (res) => {
              if (res.statusCode === 200) {
                var arr2 = res.data.data.rows;
                for (var i = 0; i < arr2.length; i++) {
                  arr2[i].types = 4;
                }
                this.order = arr2;
              }
            })
          }
        }
        // 代理离线设备接口
        if (this.id == 2) {
          let params = {
            pageIndex: 0,
            pageSize: this.curPageSize,
            proxyId: this.proxyId,
            queryType: "SUBORDINATE"
          }
          req.request('POST', params, '/proxy/proxy/device/off-line', '加载中', (res) => {
            // console.log(res)
            if (res.statusCode === 200) {
              this.order = res.data.data.rows
            }
          })
        }
        if (this.id == 4) {
          if (ind === 1 && select === 1) {
            let params = {
              pageIndex: 0,
              pageSize: this.curPageSize,
              proxyId: this.proxyId,
              queryType: "SUBORDINATE"
            }
            req.request('POST', params, '/proxy/proxy/device/unbind', '加载中', (res) => {
              // console.log(res)
              if (res.statusCode === 200) {
                var arr = res.data.data.rows;
                for (var i = 0; i < arr.length; i++) {
                  arr[i].types = 11;
                }
                this.order = arr;
              }
            });
          }
        }
      }
    },
    onReturn() {
      this.see = false
    }
  }
}
</script>

<style>
page {
	background-color: #ffffff;
}
.box {
	width: 100%;
}

.search-box {
	width: 590upx;
}

.h {
	height: 90upx;
}

.tabbar-item {
	width: 50%;
	height: 70upx;
}

.bder-tb {
	border-bottom: 2upx solid #dddddd;
	border-top: 2upx solid #dddddd;
}

.bder-b {
	border-bottom: 2upx solid #dddddd;
}

.bder-l:nth-child(2) {
	border-left: 2upx solid #dddddd;
}

.bder-l1 {
	border-left: 2upx solid #dddddd;
}

.h1 {
	height: 80upx;
}

.h2 {
	height: 50upx;
}

.h3 {
	height: 0;
}

.tab-item {
	width: 240upx;
}

.bder-l-dd {
	border-left: 2upx solid #dddddd;
}

.icon {
	width: 40upx;
	height: 40upx;
}

.top {
	opacity: 1;
	transition: all 3s;
}

.my-cl {
	color: #c3c3c3;
}

.bg-f5 {
	background-color: #f5f5f5;
}

.tra {
	opacity: 0;
	transition: all 3s;
}

.icon-img {
	width: 80upx;
	height: 80upx;
}

.h4 {
	height: 150upx;
}
.box {
	width: 100%;
}

.bder-tb {
	border-bottom: 2upx solid #dddddd;
	border-top: 2upx solid #dddddd;
}

.tabbar-item {
	width: 50%;
	height: 60upx;
}

.bg {
	background-color: rgba(243, 178, 73, 0.3);
}

.my-pd {
	padding: 0 14upx;
}

.box-btn {
	height: 62upx;
}

.h-hei {
	height: 66upx;
}

.class-sea {
	height: 42upx;
	width: 565upx;
	background-color: #f3b149;
	border-radius: 10upx;
}

.icon-search {
	width: 30upx;
	height: 30upx;
	padding-right: 12upx;
}

.class-font {
	font-size: 24upx;
	color: #ffffff;
}

.icon-top {
	width: 35upx;
	height: 35upx;
}
</style>
