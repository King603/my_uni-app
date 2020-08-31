<template>
	<view class="">
		<view class="calendar">
			<view class="calenHead-tradition" v-if="mode=='2'">
				<picker class="dateBox" mode="multiSelector" :range="pickerData.list" :value="pickerData.indexList" @change="bindPickerChange">
					<text class="font-big">{{nowMonth.month}}月</text>
					<text class="font-small">{{nowMonth.year}}年</text>
					<uni-icons type="arrowdown" size="10"></uni-icons>
				</picker>
				<text class="reset my-font-13 my-cl-ye" @tap="reset">返回本月</text>
			</view>
			<view class="my-flex-row-b my-font-13 my-cl-ye my-pdl-10 my-pdr-10 my-pdb-10">
				<text>本月总额：{{allmoney || 0}}元</text>
				<text>我的收益：{{allmoney || 0}}元</text>
			</view>
			<!-- <scroll-view class="calenHead" scroll-x v-if="mode=='1'">
				<view class="headItem" v-for="(date,index) in monthList" :key="index" :class="[current==index?'active':'']" @tap="headItemTap(index)">
					<text>{{date.getMonth()+1}}月</text>
					<text class="calen-text-orange" v-if="monthDatePrice[index].length">&yen;{{monthDatePrice[index][0].price}}</text>
					<text class="calen-text-small" v-if="monthDatePrice[index].length">起</text>
					<text class="calen-text-orange" v-if="!monthDatePrice[index].length">暂无团期</text>
				</view>
			</scroll-view> -->
			<!-- 顶部周列表 -->
			<view class="weekBar">
				<view class="weekItem" v-for="(item,index) in weekSort" :key="index">
					{{item}}
				</view>
			</view>
			<!-- 日期列表 -->
			<view class="dayBox">
				<view class="day" v-for="(item,index) in space" :key="index"></view>
				<view class="day" :class="[getDateStr(item.date)==getDateStr(dayActive.date)?'active':'']" v-for="(item,index) in dayList"
				 :key="index" @tap="selectDate(item)">
					<view class="my-font-13" :class="[isToday(item.date)?'today':'']">{{isToday(item.date) ? "今天" : item.date.getDate()}}</view>
					<view class="calen-text-orange my-mgt-5">{{item.price?'&yen;'+item.price:''}}</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="my-flex-col-c my-cl-black my-bold">
			<view class="my-mgt-30 my-flex-row-c box">
				<view class="line class-my-bder-b"></view>
				<text class="class-mglr my-font-14">按月份查看</text>
				<view class="line class-my-bder-b"></view>
			</view>
			<view class="my-mgt-15 my-flex-col my-font-12">
				<text>1.此数据只代表此商户当前月份的营收数据。</text>
				<text class="my-mgt-5">2.日期下面显示的数据，为此商户当日的营收。</text>
				<text class="my-mgt-5">3.只能筛选查看一整个月的商户收益。</text>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue"
	import req from "@/util/req.js"
	// import {uniIcons} from "../uni-icons"
	export default {
		components: {
			uniIcons
		},
		name: "Zcalendar",
		props: {
			profit: {
				type: null,
				required: true
			},
			themeColor: { //主题色  并没有用到  留给以后用吧
				type: String,
				default: "#ff625a"
			},
			// datePrice: {
			// 	type: Array,
			// 	default: () => []
			// },
			howManyMonth: { //包含当月共显示几个月
				type: String,
				default: "6"
			},
			defaultSelect: { //默认选择的日期
				type: String,
				default: ""
			},
			businessIds: {
				type: Array,
				required: true
			},
			mode: {
				type: String,
				default: "2" //1:固定月份列表  2:传统日历模式(自由选择日期)
			}
		},
		data() {
			return {
				moneylist:null,
				allmoney:null,
				today: {}, //今天日期
				weekSort: ["日", "一", "二", "三", "四", "五", "六"],
				current: 0, //当前选中的月份下标  团期模式
				nowMonth: {},
				dayActive: {}, //选中的日期  {date:date,price:string}  date需要自己格式化  method提供了 getDateStr(date)
				monthList: [], //月份列表 明确的说是 存放的是date对象
				space: 0, //周几占位个数  例如 周二占位2个,
				earning:null,
				datePrice:[]
			}
		},
		mounted() {
			this.today = new Date();
			this.nowMonth = {
				year: this.today.getFullYear(),
				month: (this.today.getMonth() + 1 < 10) ? "0" + (this.today.getMonth() + 1) : this.today.getMonth() + 1
			}
			console.log('时间1',this.today)
			console.log('时间2',this.nowMonth)
			this.getBusinessBill()
			this.setMonthList()
			this.dayActive = this.getDefaultData(this.defaultSelect)
			
		},
		computed: {
			monthDatePrice: function() {
				//过滤出 每个月份的团期价格list 并且按照对象内的价格排序  以用来显示当前月份xxxx金额起,用于mode1
				let map = {}
				let _that = this;
				this.monthList.forEach((date, i) => {
					let list = _that.datePrice.filter(item => new Date(item.date).getFullYear() == date.getFullYear() && new Date(
						item.date).getMonth() == date.getMonth()).sort(function(a, b) {
						return a.price - b.price
					})
					map[i] = list
				})
				return map
			},
			dayList: function() {
				let list = [];
				let _that = this;
				let date = this.mode == "1" ? this.monthList[this.current] : this.mode == "2" ? new Date(this.nowMonth.year + "-" +
					this.nowMonth.month + "-01") : new Date();
				if (this.monthList.length) {
					list = this.getEveryDay(date)
					let num = list[0].date.getDay();
					// _that.space = num;
				}
				// 将日期与金额整合
				console.log('日期数据',list)
				console.log('日期jine数据',this.moneylist)
				var mlist=this.moneylist;
				for(var i=0;i<list.length;i++){
					for(var j=0;j<mlist.length;j++){
						if(mlist[j].timeValue==i){
							list[i-1].price=mlist[j].profit;
						}
					}
				}
				
				
				
				return list
			},
			pickerData: function() {
				let now = new Date().getFullYear();
				//可选择前/后多少年
				let beforeYears = 2;
				let afterYears = 0;
				let list = []; //用来选择的数据
				let indexList = []; //默认选中的下标list
				let yearList = [];
				let monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
				for (let i = now - beforeYears; i <= now + afterYears; i++) {
					yearList.push(i.toString())
				}
				list.push(yearList)
				list.push(monthList)
				indexList.push(yearList.indexOf("" + this.nowMonth.year)) //我也不知道为什么 .toString()报错
				indexList.push(monthList.indexOf("" + this.nowMonth.month))
				let map = {
					indexList: indexList,
					list: list
				}
				return map;
			}
		},
		methods: {
			// 请求商户每月收益详情
			getBusinessBill() {
			    var time=this.nowMonth.year+'-'+this.nowMonth.month+'-'+'01'+' 00:00:00'
				var data = {
                     time:time
				}
				req.request('POST', data, '/proxy/business/order/revenue/detail', '加载中', (
					res) => {
					// console.log("/proxy/business-bill", res)
					if (res.statusCode === 200) {
						console.log(res.data.data)
						var money=res.data.data;
						var allmoney=0;
						for(var i=0;i<money.length;i++){
							allmoney+=money[i].profit;
						}
						this.allmoney=allmoney;
						this.moneylist=res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			
			isToday(date) {
				return date.getFullYear() == this.today.getFullYear() && date.getMonth() == this.today.getMonth() && date.getDate() ==
					this.today.getDate()
			},
			
			
			
			headItemTap(index) {
				this.current = index
			},
			getDefaultData(d) { //设置初始值
				let list = this.datePrice.filter(item => item.date == d);
				let obj = {};
				if (list.length > 0) { //逻辑依旧是保证没有团期（价格）的不能选中
					obj = {
						date: new Date(list[0].date),
						price: list[0].price
					}
				}
				return obj;
			},
		
			getDateStr(date) { //当前年 月 日
				if (date) {
					let year = date.getFullYear();
					let month = (date.getMonth() + 1).toString();
					let day = (date.getDate()).toString();
					if (month.length == 1) {
						month = "0" + month;
					}
					if (day.length == 1) {
						day = "0" + day;
					}
					let dateTime = year + "-" + month + "-" + day;
					return dateTime;
				}
			},
			getNextMonth(date, num) { //获取下几个月 第一天
				let now = new Date(date);
				let ds = new Date(now.setDate(1))
				ds = new Date(ds.setMonth(ds.getMonth() + num));
				let year = ds.getFullYear();
				let mon = ds.getMonth() + 1;
				let day = ds.getDate();
				let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + "01";
				let newDate = new Date(s)
				return newDate;
			},
			setMonthList() {
				let list = []
				let now = new Date() //以当前月份为第一个月   如果需要自定义开始月份修改这个就行
				for (let i = 0; i < this.howManyMonth; i++) {
					let month = this.getNextMonth(now, i)
					this.monthList.push(month)
				}
			},
			getEveryDay(date) { //获取月份每一天 date对象
				let _that = this;
				let dayArry = [];
				let d = date;
				let lastDay = new Date(d.getFullYear(), d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1, 0).getDate()
				for (let k = 1; k <= lastDay; k++) {
					let price = 0;
					_that.datePrice.forEach(item => {
						if (item.day == Number(_that.getDateStr(new Date(date.getFullYear(), date.getMonth(), k)).substring(_that.getDateStr(new Date(date.getFullYear(), date.getMonth(), k)).length-2))) {
							price = item.amount
						}
					})
					dayArry.push({
						date: new Date(date.getFullYear(), date.getMonth(), k),
						price: price
					});
				}
				return dayArry;
			},
			selectDate(data) { //选择日期
				//多选模式请在这改造
				/* this.$set(this.dayActive,"date",date) */
				if (data.price) {
					this.dayActive = {
						date: data.date,
						price: data.price
					}
					let map = this.getSelectData()
					this.$emit('changeDate', map)
				}
			},
			getSelectData() { //获取最终结果
				let map = {
					date: this.getDateStr(this.dayActive.date),
					price: this.dayActive.price
				}
				return map;
			},
			// 月份选择
			bindPickerChange(e) {
				//传统日历模式选择日期
				this.nowMonth.year = this.pickerData.list[0][e.detail.value[0]]
				this.nowMonth.month = this.pickerData.list[1][e.detail.value[1]]
				this.getBusinessBill()
				this.$emit('changeDate', this.pickerData)
			},
			// 返回本月
			reset() {
				this.nowMonth.year = this.today.getFullYear()
				this.nowMonth.month = this.today.getMonth() + 1
				this.dayActive = {}
				this.$emit('changeDate', {})
				this.getBusinessBill();
			}
		}
	}
</script>

<style lang="scss">
	.calendar {
		font-size: 22upx;
		color: #333333;
		border: 1px solid #d7d7d7;
		font-weight: 600;
		border-left: 0;
		border-right: 0;

		//日历中用到的小字体
		.calen-text-small {
			font-size: 16upx;
		}

		.calen-text-orange {
			color: #e58252;
		}

		.calenHead-tradition {
			position: relative;
			vertical-align: bottom;
			height: 80upx;
			line-height: 80upx;
			background: #f8f8f8;

			.dateBox {
				line-height: 80upx;
				display: inline-block;
				height: 80upx;
				padding: 0 40upx;

				&:after {
					border: 0;
				}

				.font-big {
					font-size: 38upx;
					margin-right: 10upx;
				}

				.font-small {
					font-size: 18upx;
				}
			}

			.reset {
				color: #4a77e6;
				font-weight: 400;
				float: right;
				padding: 0 30upx;
			}
		}

		.calenHead {
			display: flex;
			align-items: flex-start;
			white-space: nowrap;

			.headItem {
				display: inline-block;
				flex-shrink: 0;
				width: 215upx;
				height: 65upx;
				text-align: center;
				line-height: 65upx;
				position: relative;

				&.active {
					background-color: #e8e8e8;

					&:before {
						content: "";
						width: 16upx;
						height: 16upx;
						background: #6e7480;
						transform: rotate(45deg);
						display: block;
						position: absolute;
						bottom: -8upx;
						left: 50%;
						margin-left: -8upx;
					}
				}

				&:after {
					content: "";
					width: 1px;
					height: 28upx;
					display: inline-block;
					background: #e8e8e8;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -14upx;
				}
			}
		}

		.weekBar {
			background-color: #6e7480;
			display: flex;
			align-items: flex-start;

			.weekItem {
				height: 44upx;
				width: 14.28%;
				line-height: 44upx;
				text-align: center;
				color: #FFFFFF;
			}
		}

		.dayBox {
			display: flex;
			width: 100%;
			flex: 1;
			flex-direction: row;
			flex-wrap: wrap;

			.day {
				width: 14.285%;
				flex-wrap: nowrap;
				height: 106upx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				border-bottom: 1px solid #d7d7d7;
				margin-bottom: -1px;

				/* 偷懒的方法  负边距使border重合*/
				&.active {
					background: #f77333 !important;
					color: #FFFFFF !important;

					view {
						color: #FFFFFF !important;
					}
				}

				.today {
					color: #f77333;
				}

				view {
					height: 30upx;
				}
			}
		}
	}
	
	.line {
		width: 100upx;
		height: 5upx;
	}
	
	.box {
		width: 100%;
	}
	
	.box1 {
		width: 492upx;
	}
	
	.class-mglr{
		padding: 0 74upx;
	}
	
	.class-my-bder-b{
		border-bottom: 2upx solid #F5F5F5;
	}
</style>
