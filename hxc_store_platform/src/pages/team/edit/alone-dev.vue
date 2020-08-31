<template>
	<!-- <view class="box my-flex-col-c">
		<view v-if="!see">
			<view class="my-flex-row-b my-pd-10 box">
				<view class="my-bder-grey-light my-rds-10 input-box my-flex-row-c">
					<image src="/static/index/search-2.png" class="icon-i" mode=""></image>
					<input class="my-mgl-8" @blur="blurDeviceNo" type="text" value="" placeholder="请输入要搜索的设备编号" />
				</view>
				<view class="my-flex-row-c search my-font-18" @click="onSearch">搜索</view>
			</view>
			<goTop :top="top" :topId="topId"></goTop>
			<swiper class='scroll-x my-bg-white my-flex-row-align-c' display-multiple-items="3">
				<swiper-item v-for='(item,index) in tab' :key='index' @click="onTab(index)">
					<view class="swiper-box my-flex-row-c" :class="select===index?'my-bder-b-ye':''">{{item}}</view>
				</swiper-item>
			</swiper>
			<view class="box my-bg-white my-flex-row-b my-bder-b-cc my-pd-10" v-for="(item,index) in dev" :key="index">
				<view class="trs" v-if="type==1" @click="onDev(index)">
					<radio :checked="item.check" color="#888888" v-if='item.distributeStatus==="可分配"' />
					<radio :checked="item.check" color="#f8c470" v-else />
				</view>
				<view class="trs" v-else @click="onDev(index)">
					<label>
						<checkbox value="" :checked="item.check" @click="changeinfo(index)"/>
					</label>
				</view>
				<text>设备SN码</text>
				<text>{{item.deviceNo}}</text>
				<view v-if="type===0">
					<text :class="item.allot==='不可分配'?'my-cl-ye':'my-cl-grey'">{{item.distributeStatus}}</text>
				</view>
				<view v-if="type===1">
				    <text class="my-cl-grey" style="margin-right: 50upx;">{{item.type}}</text>
					<text class="my-cl-ye">可回收</text>
				</view>
			</view>
      <view class="my-flex-row-c my-pd-15 my-fixed-b box" v-if="type===2">
				<view class="btn my-bg-ye my-cl-white my-font-16 my-flex-row-c my-boxsha-2" @click="onConfirm">批量铺设</view>
			</view>
			<view class="my-flex-row-r my-pd-15 my-fixed-b box" v-if="type===0||type===1">
				<view class="btn my-bg-ye my-cl-white my-font-16 my-flex-row-c my-boxsha-2" @click="onConfirm">确认{{type===0?'分配':'回收'}}</view>
				<view class="btn my-bg-ye my-cl-white my-font-16 my-flex-row-c my-boxsha-2" @click="onBatch" v-if="type!=1">批量{{type===0?'分配':'回收'}}</view>
			</view>
		</view>
	</view> -->
</template>

<script>
// 	import req from "@/util/req.js"
// 	import goTop from '@/components/goTop/goTop.vue'
// 	export default {
// 		data() {
// 			return {
// 				id:null,
// 				top: false,
// 				topId: 1,
// 				see: false,
// 				type: 0,
// 				proxyId: null,
// 				deviceModel: 'H60',
// 				deviceNo: "",
// 				deviceType: "BATTERY_BOX",
// 				order1: [],
// 				order2: [],
// 				deviceIds: [],
// 				tab: ['H60座充', 'H601充电宝', 'X10线充'],
// 				select: 0,
// 				// 设备
// 				dev: [],
// 				// 商户底座数据
// 				businessbox:null,
// 				// 商户充电宝数据
//         businessbatter:null,
//         businessX10:null,
// 			}
// 		},
// 		components: {
// 			goTop
// 		},
// 		computed: {

// 		},
// 		onLoad(options) {
// 			this.isBusiness=uni.getStorageSync('openIdBindByBusiness')||false
// 			this.type = Number(options.type)
// 			this.id = Number(options.id)
// 			this.proxyId = Number(options.proxyId)
// 			if (this.type === 1) {
// 				uni.setNavigationBarTitle({
// 					title: '回收设备'
// 				});
// 				this.getbusinessdevice();
// 			}else if(this.type === 2) {
// 				uni.setNavigationBarTitle({
// 					title: '铺设设备'
//         });
//         switch(0){
//           case 0:
//             this.deviceType = 'BATTERY_BOX'
//             this.deviceModel = "H60"
//             this.dev = this.businessbox;
//             break;
//           case 1:
//             this.deviceType = 'BATTERY'
//             this.deviceModel = "H601"
//             this.dev = this.businessbatter;
//             break;
//           case 2:
//             this.deviceType = 'BATTERY_BOX'
//             this.deviceModel = "X10"
//             this.dev = this.businessX10;
//             break;
//         }
        
//         req.request('POST', params, '/proxy/proxy/distribute/device/search', '加载中', (res) => {
//           res.data.data.rows.forEach((list,i)=>{
//             if(list.distributeStatus=="已分配")this.check2=true;
//             // this.onDev(i)
//           })
//           this.onSearch();
//         });
        
// 			}
// 		},
// 		onPageScroll(res) {
// 			this.scrollTop = res.scrollTop
// 			if (this.scrollTop > 0) {
// 				this.top = true
// 			} else {
// 				this.top = false
// 			}
// 		},
// 		methods: {
// 			changeinfo(index){
// 				this.dev[index].check=!this.dev[index].check;
// 			},
// 			// 回收设备获取商户设备信息
// 			getbusinessdevice(){
// 				let params = {
				
// 				};
// 				req.request('GET', params, '/proxy/business/' + this.id, '加载中', (res) => {
// 					if (res.statusCode === 200) {
// 						var allbusiness=res.data.data.deviceList;
// 						var allH60=[];
//             var allH601=[];
//             var allX10=[]
//             console.log('all',allbusiness)
//             allbusiness.forEach(business=>{
//               switch(business.deviceModelName){
//                 case 'H60':
//                   business.check=false;
// 								  allH60.push(business);
//                   break;
//                 case 'H601':
//                   business.check=false;
// 								  allH601.push(business);
//                   break;
//                 case "X10":
//                   business.check=false;
//                   allX10.push(business);
//                   break;
//                 default: throw "暂无此类型";
//               }
//             })
// 					  this.businessbox=allH60;
//             this.businessbatter=allH601;
//             this.businessX10=allX10;
//             this.dev=allH60;
// 					}
// 				})
// 			},
// 			blurDeviceNo(e) {
// 				let val = e.detail.value
// 				this.deviceNo = val
// 			},
//             // 搜索铺货设备
// 			onSearch() {
// 				let params = {
// 					deviceModel: this.deviceModel,
// 					deviceNo: this.deviceNo,
// 					deviceType: this.deviceType,
// 					pageIndex: 0,
// 					pageSize: 30
//         }
//         // req.request('GET', params, '/proxy/business/' + this.id, '加载中', (res) => {
//         //   console.log(res);
//         //   let devId=res.data.data.business.id;
//         //   if(devId==this.id){
//             req.request('POST', params, '/proxy/proxy/distribute/device/search', '加载中', (res) => {
// 				    	if (res.statusCode === 200) {
//                 let SearchBusiness = [];
//                 console.log(res);
//                 let devList = res.data.data.rows;

//                   devList.forEach(dev=>{
//                     console.log(dev);
//                     if(dev.deviceType==this.deviceType){
//                       console.log(dev)
//                       SearchBusiness.push(dev)
//                     }
//                   })


// 				    		this.dev = SearchBusiness;
//                 this.dev.forEach((res) => {
// 				    			res.check2=false;
// 				    			res.check = this.type==1?res.distributeStatus === '可分配':!res.distributeStatus === '可分配';
// 				    		})
// 				    	}
//             })
//         //   }
//         // });
// 			},
// 			// 导航栏点击搜索设备
// 			onTab(e) {
// 				this.select = e
//         switch(e){
//           case 0:
//             this.deviceType = 'BATTERY_BOX'
//             this.deviceModel = "H60"
//             if (this.type==1) this.dev = this.businessbox;
//             else this.onSearch();
//             break;
//           case 1:
//             this.deviceType = 'BATTERY'
//             this.deviceModel = "H601"
//             if (this.type==1) this.dev = this.businessbatter;
//             else this.onSearch();
//             break;
//           case 2:
//             this.deviceType = 'BATTERY_BOX'
//             this.deviceModel = "X10"
//             if (this.type==1) this.dev = [];
//             else this.onSearch();
//             break;
//         }
// 			},
// 			onDev(e) {
// 					this.dev[e].check = !this.dev[e].check
// 				if (this.type==1) {
// 					this.dev[e].check2 = !this.dev[e].check2
// 					console.log(this.dev[e].check2)
// 				}
// 			},
// 			onBatch(e) {
// 				uni.navigateTo({
// 					url: "/pages/team/edit/batch?type=" + this.type
// 				})
// 			},
// 			onConfirm() {
// 				// type=0代理分配设备
// 				if (this.type === 0 && this.proxyId !== null) {
					
// 					this.dev.forEach((res) => {
// 						if (res.check === true && res.distributeStatus === "可分配") {
// 							this.deviceIds.push(res.deviceNo)
// 						}
// 					})
// 					if(this.deviceIds.length!==0){
// 						var data = {
// 							deviceNos: this.deviceIds,
// 							deviceType: this.deviceType,
// 							userId: this.proxyId,
// 							userType: "PROXY"
// 						}
// 						req.request('POST', data, '/proxy/proxy/distribute/device', '加载中', (res) => {
// 							if (res.statusCode === 200) {
// 								uni.redirectTo({
// 									url: "/pages/index/index",
// 									success: () => {
// 										uni.showToast({
// 											title: "铺设成功！",
// 											icon: "none"
// 										})
// 									}
// 								})
// 							}
// 						})
// 					}
// 				}
// 				// type=1回收设备
// 				if (this.type === 1) {
// 					var resetdevice=[];
// 					 this.dev.forEach((res) => {
// 					 	if (res.check === true) {
// 					 		resetdevice.push(res.deviceNo)
// 					 	}
// 					 })
// 					 console.log(this.dev)
// 					 console.log("这是可回收的装备")
// 					 console.log(resetdevice)
// 					 console.log("这是可回收的装备")
// 					 if (resetdevice.length === 0) {
// 					 	uni.showToast({
// 					 		title: "请选择设备",
// 					 		icon: "none"
// 					 	})
// 					 }else{
// 						 console.log(this.deviceType)
// 						 let params={"recoverViews":[{
// 							 deviceNos:resetdevice,
// 							 deviceType:this.deviceType
// 						 }]};
// 						 req.request('POST',params, '/proxy/business/recover/device', '加载中', (res) => {
// 						 	if (res.statusCode === 200) {
// 						 		uni.showToast({
// 						 			title:"回收成功",
// 						 		});
// 						 		uni.navigateBack({
// 						 			delta:1
// 						 		})
// 						 	}
// 						 })
// 					 }
// 				}
// 				// type=2铺货
// 				if (this.type === 2) {
//           console.log(this.dev)
// 					this.dev.forEach((res) => {
// 						if (res.check === true && res.distributeStatus === "可分配") {
// 							this.deviceIds.push(res.deviceNo)
// 						}
//           })
//           console.log(1222,this.deviceIds)
// 					if (this.deviceIds.length === 0) {
// 						uni.showToast({
// 							title: "请选择设备",
// 							icon: "none"
// 						})
// 					} else {
// 						uni.navigateTo({
// 							url: "/pages/team/com/add?deviceIds=" + this.deviceIds + "&&deviceType=" + this.deviceType,
// 							success: () => {
// 								this.deviceIds = []
// 							}
// 						})
// 					}
// 				}
//       }
// 		}
// 	}
</script>

<style>
	/* .box {
		width: 750upx;
	}

	.input-box {
		width: 600upx;
		height: 60upx;
	}

	.icon-i {
		width: 50upx;
		height: 50upx;
	}

	.search {
		width: 100upx;
		height: 50upx;
	}

	.scroll-x {
		width: 100%;
		height: 60upx;
	}

	.swiper-box {
		height: 50upx;
	}

	.trs {
		transform: scale(0.8, 0.8);
	}

	.btn {
		width: 300upx;
		height: 80upx;
		border-radius: 40upx;
	} */
</style>




<template>
	<view class="box my-flex-col-c">
		<view v-if="!see">
			<view class="my-flex-row-b my-pd-10 box">
				<view class="my-bder-grey-light my-rds-10 input-box my-flex-row-c">
					<image src="/static/index/search-2.png" class="icon-i" mode=""></image>
					<input class="my-mgl-8" @blur="blurDeviceNo" type="text" value="" placeholder="请输入要搜索的设备编号" />
				</view>
				<view class="my-flex-row-c search my-font-18" @click="onSearch">搜索</view>
			</view>
			<goTop :top="top" :topId="topId"></goTop>
			<swiper class='scroll-x my-bg-white my-flex-row-align-c' display-multiple-items="3">
				<swiper-item v-for='(item,index) in tab' :key='index' @click="onTab(index)">
					<view class="swiper-box my-flex-row-c" :class="select===index?'my-bder-b-ye':''">{{item}}</view>
				</swiper-item>
			</swiper>
			<view class="box my-bg-white my-flex-row-b my-bder-b-cc my-pd-10" v-for="(item,index) in dev" :key="index">
				<view class="trs" v-if="type!=1" @click="onDev(index)">
					<radio :checked="item.check" color="#f8c470" v-if='item.distributeStatus==="可分配"' />
					<radio :checked="item.check" color="#888888" v-else />
					<!-- <label>
						<checkbox value="" :checked="item.check" v-if='item.distributeStatus==="可分配"'/>
						<checkbox value="" :checked="item.check" v-else />
					</label> -->
				</view>
				
				<view class="trs" v-if="type==1" @click="onDev(index)">
					<!-- <radio :checked="item.check" color="#888888" v-if='item.distributeStatus==="可分配"' />
					<radio :checked="item.check" color="#f8c470" v-else /> -->
					<label>
						<checkbox value="" :checked="item.check" @click="changeinfo(index)"/>
					</label>
				</view>
				
				<text>设备SN码</text>
				<text>{{item.deviceNo}}</text>
				<view v-if="type===0">
					<text :class="item.allot==='不可分配'?'my-cl-ye':'my-cl-grey'">{{item.distributeStatus}}</text>
				</view>
				<view v-if="type===1">
				    <text class="my-cl-grey" style="margin-right: 50upx;">{{item.type}}</text>
					<text class="my-cl-ye">可回收</text>
				</view>
			</view>
			<view class="my-flex-row-c my-pd-15 my-fixed-b box" v-if="type===2">
				<view class="btn my-bg-ye my-cl-white my-font-16 my-flex-row-c my-boxsha-2" @click="onConfirm">批量铺设</view>
			</view>
			<view class="my-flex-row-r my-pd-15 my-fixed-b box" v-if="type===0||type===1">
				<view class="btn my-bg-ye my-cl-white my-font-16 my-flex-row-c my-boxsha-2" @click="onConfirm">确认{{type===0?'分配':'回收'}}</view>
				<view class="btn my-bg-ye my-cl-white my-font-16 my-flex-row-c my-boxsha-2" @click="onBatch" v-if="type!=1">批量{{type===0?'分配':'回收'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import req from "@/util/req.js"
	import goTop from '@/components/goTop/goTop.vue'
	export default {
		data() {
			return {
				id:null,
				top: false,
				topId: 1,
				see: false,
				type: 0,
				proxyId: null,
				deviceModel: 'H60',
				deviceNo: "",
				deviceType: "BATTERY_BOX",
				order1: [],
				order2: [],
				deviceIds: [],
				tab: ['H60座充', 'H601充电宝', 'X10线充'],
				select: 0,
				// 设备
				dev: [],
				// 商户底座数据
				businessbox:null,
				// 商户充电宝数据
				businessbatter:null,
			}
		},
		components: {
			goTop
		},
		computed: {

		},
		onLoad(options) {
			this.isBusiness=uni.getStorageSync('openIdBindByBusiness')||false
			this.type = Number(options.type)
			this.id = Number(options.id)
			this.proxyId = Number(options.proxyId)
			if (this.type === 1) {
				uni.setNavigationBarTitle({
					title: '回收设备'
				});
				this.getbusinessdevice();
			}else if(this.type === 2) {
				uni.setNavigationBarTitle({
					title: '铺设设备'
        })
        this.onSearch()
			}
			// if(this.isBusiness===true){
				
			// }else{
				
			// }
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
			changeinfo(index){
				this.dev[index].check=!this.dev[index].check;
			},
			// 回收设备获取商户设备信息
			getbusinessdevice(){
				let params = {
				
				};
				req.request('GET', params, '/proxy/business/' + this.id, '加载中', (res) => {
					if (res.statusCode === 200) {
						var allbusiness=res.data.data.deviceList;
						var allH60=[];
						var allH601=[];
						console.log('all',allbusiness)
						for(var i=0;i<allbusiness.length;i++){
							if(allbusiness[i].deviceModelName==='H60'){
								allbusiness[i].check=false;
								allH60.push(allbusiness[i])
								
							}else if(allbusiness[i].deviceModelName==='H601'){
								allbusiness[i].check=false;
								allH601.push(allbusiness[i])
							}
						}
						console.log('323213',allH60)
						console.log('666666',allH601)
					    this.businessbox=allH60;
            this.businessbatter=allH601;
            this.dev=allH60;
					}
				})
			},
			blurDeviceNo(e) {
				let val = e.detail.value
				this.deviceNo = val
			},
            // 搜索铺货设备
			onSearch() {
				let params = {
					deviceModel: this.deviceModel,
					deviceNo: this.deviceNo,
					deviceType: this.deviceType,
					pageIndex: 0,
					pageSize: 30
				}
				req.request('POST', params, '/proxy/proxy/distribute/device/search', '加载中', (res) => {
					if (res.statusCode === 200) {
				    if (res.statusCode === 200) {
              let SearchBusiness = [];
              console.log(res);
              let devList = res.data.data.rows;
              devList.forEach(dev=>{
                console.log(dev);
                if(dev.deviceType==this.deviceType){
                  console.log(dev)
                  SearchBusiness.push(dev)
                }
              })
				    	this.dev = SearchBusiness;
              this.dev.forEach((res)=>{
                res.check2=false;
						  	res.check = this.type==1?res.distributeStatus === '可分配':!(res.distributeStatus === '可分配');
              })
				    }
					}
				})
			},
			// 导航栏点击搜索设备
			onTab(e) {
				this.select = e
				if (e === 0) {
					this.deviceType = 'BATTERY_BOX'
					this.deviceModel = "H60"
					if(this.type==1){
					  this.dev = this.businessbox; 	 
					}else{
					  this.onSearch()
					}
				}
				if (e === 1) {
					this.deviceType = 'BATTERY'
					this.deviceModel = "H601"
					if(this.type==1){
					   this.dev = this.businessbatter; 	 
					}else{
					  this.onSearch()
					}
				}
				if (e === 2) {
					this.deviceType = 'BATTERY_BOX'
					this.deviceModel = "X10"
					if(this.type==1){
					   this.dev=[];
					}else{
					  this.onSearch()
					}
				}
			},
			onDev(e) {
				if (this.dev[e].distributeStatus === "可分配") {
					this.dev[e].check = !this.dev[e].check
				}
				if (this.type==1 && this.dev[e].distributeStatus === "已分配") {
					this.dev[e].check2 = !this.dev[e].check2
					console.log(this.dev[e].check2)
				}
				 
				
			},
			onBatch(e) {
				uni.navigateTo({
					url: "/pages/team/edit/batch?type=" + this.type
				})
			},
			onConfirm() {
				// type=0代理分配设备
				if (this.type === 0 && this.proxyId !== null) {
					console.log(this.dev)
					this.dev.forEach((res) => {
						if (res.check === true && res.distributeStatus === "可分配") {
							this.deviceIds.push(res.deviceNo)
						}
					})
					if(this.deviceIds.length!==0){
						var data = {
							deviceNos: this.deviceIds,
							deviceType: this.deviceType,
							userId: this.proxyId,
							userType: "PROXY"
						}
						req.request('POST', data, '/proxy/proxy/distribute/device', '加载中', (res) => {
							if (res.statusCode === 200) {
								uni.redirectTo({
									url: "/pages/index/index",
									success: () => {
										uni.showToast({
											title: "铺设成功！",
											icon: "none"
										})
									}
								})
							}
						})
					}
				}
				// type=1回收设备
				if (this.type === 1) {
					var resetdevice=[];
					 this.dev.forEach((res) => {
					 	if (res.check === true) {
					 		resetdevice.push(res.deviceNo)
					 	}
					 })
					 console.log(this.dev)
					 console.log("这是可回收的装备")
					 console.log(resetdevice)
					 console.log("这是可回收的装备")
					 if (resetdevice.length === 0) {
					 	uni.showToast({
					 		title: "请选择设备",
					 		icon: "none"
					 	})
					 }else{
						 console.log(this.deviceType)
						 var params={"recoverViews":[{
							 deviceNos:resetdevice,
							 deviceType:this.deviceType
						 }]};
						 req.request('POST',params, '/proxy/business/recover/device', '加载中', (res) => {
						 	if (res.statusCode === 200) {
						 		uni.showToast({
						 			title:"回收成功",
						 		});
						 		uni.navigateBack({
						 			delta:1
						 		})
						 	}
						 })
					 }
				}
				// type=2铺货
				if (this.type === 2) {
					this.dev.forEach((res) => {
						if (res.check === true && res.distributeStatus === "可分配") {
							this.deviceIds.push(res.deviceNo)
						}
						
					})
					if (this.deviceIds.length === 0) {
						uni.showToast({
							title: "请选择设备",
							icon: "none"
						})
					} else {
						uni.navigateTo({
							url: "/pages/team/com/add?deviceIds=" + this.deviceIds + "&&deviceType=" + this.deviceType,
							success: () => {
								this.deviceIds = []
							}
						})
					}
				}
			}
		}
	}
</script>

<style>
	.box {
		width: 750upx;
	}

	.input-box {
		width: 600upx;
		height: 60upx;
	}

	.icon-i {
		width: 50upx;
		height: 50upx;
	}

	.search {
		width: 100upx;
		height: 50upx;
	}

	.scroll-x {
		width: 100%;
		height: 60upx;
	}

	.swiper-box {
		height: 50upx;
	}

	.trs {
		transform: scale(0.8, 0.8);
	}

	.btn {
		width: 300upx;
		height: 80upx;
		border-radius: 40upx;
	}
</style>
