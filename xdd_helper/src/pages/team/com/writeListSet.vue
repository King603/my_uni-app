<template>
	<view class="page-cont">
		<view class="page-box">
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">网点名称：</text></view>
				<view class="my-value-box">
					<text class="my-value">{{ businessName }}</text>
				</view>
			</view>
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">名单状态：</text></view>
				<view class="my-value-box" style="margin-top: 20rpx;"><switch :checked="open" color="#f4b249" @change="switch1Change" /></view>
			</view>
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">名单数量：</text></view>
				<view class="my-value-box">
					<text @click="getFocus1" v-show="userCountShow" class="my-value">{{ userCount }}人</text>
					<input
						type="number"
						@blur="this.userCountShow = true"
						v-show="!userCountShow"
						v-model="userCount"
						class="uni-input my-text-input"
						focus
						placeholder="请输入人数,轻触其他区域以确认"
						ref="txt1"
					/>
					<image class="qus-ico-img" src="../../../static/stat/qus_ico.png"></image>
				</view>
			</view>
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">优惠次数：</text></view>
				<view class="my-value-box">
					<text @click="this.discountTimesShow = false" v-show="discountTimesShow" class="my-value">{{ discountTimes }}次/天</text>
					<input
						type="number"
						@blur="this.discountTimesShow = true"
						v-show="!discountTimesShow"
						v-model="discountTimes"
						class="uni-input my-text-input"
						focus
						placeholder="请输入次数,轻触其他区域以确认"
					/>
					<image class="qus-ico-img" src="../../../static/stat/qus_ico.png"></image>
				</view>
			</view>
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">优惠时长：</text></view>
				<view class="my-value-box">
					<text @click="this.discountDurationShow = false" v-show="discountDurationShow" class="my-value">{{ discountDuration }}小时/次</text>
					<input
						type="number"
						@blur="this.discountDurationShow = true"
						v-show="!discountDurationShow"
						v-model="discountDuration"
						class="uni-input my-text-input"
						focus
						placeholder="请输入时长,轻触其他区域以确认"
					/>
					<image class="qus-ico-img" src="../../../static/stat/qus_ico.png"></image>
				</view>
			</view>
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">开始时间：</text></view>
				<view class="my-value-box">
					<picker mode="date" :value="startDate" :start="getStartDate" :end="getEndDate" @change="bindDateChange1">
						<view class="uni-input">{{ startDate }}</view>
					</picker>
				</view>
			</view>
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">结束时间：</text></view>
				<view class="my-value-box">
					<picker mode="date" :value="endDate" :start="getStartDate" :end="getEndDate" @change="bindDateChange2">
						<view class="uni-input">{{ endDate }}</view>
					</picker>
				</view>
			</view>
			<view class="box-item-line">
				<view class="my-title-box"><text class="my-title">添加限制：</text></view>
				<view class="my-value-box">
					<text @click="this.limitShow = false" v-show="limitShow" class="my-value">{{ limit }}人/天</text>
					<input
						type="number"
						@blur="this.limitShow = true"
						v-show="!limitShow"
						v-model="limit"
						class="uni-input my-text-input"
						focus
						placeholder="请输入人数,轻触其他区域以确认"
					/>
				</view>
			</view>
		</view>
		<view class="page-box2">
			<view @click="GotoWriList" class="btn-sub1 btn-text"><text>查看白名单</text></view>
			<view @click="RetPage" class="btn-sub1 btn-text"><text>返回</text></view>
			<view @click="CreateQrCode" class="btn-sub1 btn-text"><text>生成二维码</text></view>
		</view>
	</view>
</template>

<script>
import req from '@/util/req.js';
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			open: false, //名单状态
			limit: 0, //添加限制
			limitShow: true, //添加限制text显示 否则对应input显示
			discountDuration: 0, //优惠时长
			discountDurationShow: true, //优惠时长text显示 否则对应input显示
			discountTimes: 0, //优惠次数
			discountTimesShow: true, //优惠次数text显示 否则对应input显示
			userCount: 0, //名单数量
			userCountShow: true, //名单数量text显示 否则对应input显示
			businessId: 0, //商户id
			businessName: null, //商户名称
			startDate: this.getTodayDate(), //起始时间
			endDate: this.getTodayDate(), //结束时间
			index1: null,
			index2: null
		};
	},
	computed: {
		getStartDate() {
			return this.getDate('start');
		},
		getEndDate() {
			return this.getDate('end');
		}
	},
	onLoad(options) {
		this.businessId = options.businessId;
		this.businessName = options.businessName;
		console.log('businessId:' + this.businessId);
		this.getSetInfo();
	},
	methods: {
		RetPage() {
			uni.navigateBack({ delta: 1 });
		},
		getTodayDate() {
			var d = new Date();
			var ye = d.getFullYear();
			var mo = (d.getMonth() + 1).toString().padStart(2, '0');
			var da = d
				.getDate()
				.toString()
				.padStart(2, '0');
			var time = ye + '-' + mo + '-' + da;
			return time;
		},
		getFocus1() {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.userCountShow = false;
				//this.$refs.txt1.focus();
			}, 100);
		},
		GotoWriList() {
			uni.navigateTo({
				url: '/pages/team/com/writeList?businessId=' + this.businessId
			});
		},
		CreateQrCode() {
			console.log('创建白名单配置');
			if (this.discountDuration == 0) {
				uni.showToast({ title: '请轻触后输入优惠时长', icon: 'none' });
				return;
			}
			if (this.discountTimes == 0) {
				uni.showToast({ title: '请轻触后输入优惠次数', icon: 'none' });
				return;
			}
			if (this.userCount == 0) {
				uni.showToast({ title: '请轻触后输入名单数量', icon: 'none' });
				return;
			}
			if (this.limit == 0) {
				uni.showToast({ title: '请轻触后输入添加限制', icon: 'none' });
				return;
			}
			var params = {
				businessId: this.businessId,
				discountDuration: this.discountDuration,
				discountTimes: this.discountTimes,
				endDate: this.endDate + ' 00:00:00',
				limit: this.limit,
				open: this.open,
				startDate: this.startDate + ' 00:00:00',
				userCount: this.userCount
			};
			req.request('POST', params, '/proxy/api/proxy/white/create', '加载中', res => {
				if (res.statusCode === 200) {
					if (res.data.code == 0) {
						var obj = res.data.data;
						uni.navigateTo({
							url:
								'/pages/team/com/writeListQrcAdd?businessId=' +
								this.businessId +
								'&businessName=' +
								obj.businessName +
								'&discountDuration=' +
								obj.discountDuration +
								'&discountTimes=' +
								obj.discountTimes +
								'&endDate=' +
								obj.endDate +
								'&startDate=' +
								obj.startDate +
								'&whiteId=' +
								obj.whiteId
						});
					} else {
						uni.showToast({ title: res.data.message, icon: 'none' });
					}
				} else {
					uni.showToast({ title: res.data.message, icon: 'none' });
				}
			});
		},
		switch1Change: function(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value);
			this.open = e.target.value;
			console.log(this.open);
		},

		getSetInfo() {
			console.log('获取白名单设置');
			var params = {
				businessId: parseInt(this.businessId)
			};
			console.log(params);
			req.request('POST', params, '/proxy/api/proxy/white/get', '加载中', res => {
				if (res.statusCode === 200) {
					if (res.data.data != null) {
						var obj = res.data.data;
						this.open = obj.open; //名单状态
						this.limit = obj.limit; //添加限制
						this.discountDuration = obj.discountDuration; //优惠时长
						this.discountTimes = obj.discountTimes; //优惠次数
						this.userCount = obj.userCount; //名单数量
						this.businessId = obj.businessId; //商户id
						this.businessName = obj.businessName; //商户名称
						this.startDate = obj.startDate.toString().replace(' 00:00:00', ''); //起始时间
						this.endDate = obj.endDate.toString().replace(' 00:00:00', ''); //结束时间
					}
				} else if (res.statusCode === 401) {
					uni.showToast({ title: '登录超时', icon: 'none' });
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/login'
						});
					}, 1000);
				} else if (res.statusCode === 404) {
					uni.showToast({ title: '暂未开放', icon: 'none' });
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				}else{
					uni.showToast({ title: res.data.message, icon: 'none' });
				}
			});
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindDateChange1: function(e) {
			this.startDate = e.target.value;
		},
		bindPickerChange1: function(e) {
			console.log('picker1发送选择改变，携带值为', e.target.value);
			this.index1 = e.target.value;
		},
		bindDateChange2: function(e) {
			this.endDate = e.target.value;
		},
		bindPickerChange2: function(e) {
			console.log('picker2发送选择改变，携带值为', e.target.value);
			this.index2 = e.target.value;
		}
	}
};
</script>

<style scoped>
.page-cont {
	margin-top: 10rpx;
}
.my-text-input {
	width: 75%;
	float: left;
	border: #f0f0f0 solid 1px;
	height: 26rpx;
	line-height: 26rpx;
	margin-top: -10rpx;
}
.my-switch1 {
	color: rgba(244, 178, 73, 1);
}
.btn-sub1 {
	float: left;
	margin-top: 15rpx;
	margin-left: 40rpx;
	width: 180rpx;
	height: 88rpx;
	background: rgba(244, 178, 73, 1);
	box-shadow: 0rpx 1rpx 10rpx 0rpx rgba(128, 79, 0, 0.7);
	border-radius: 44rpx;
}
.btn-sub2 {
	float: right;
	margin-top: 15rpx;
	margin-right: 20rpx;
	width: 170rpx;
	height: 88rpx;
	line-height: 88rpx;
	background: rgba(244, 178, 73, 1);
	box-shadow: 0rpx 1rpx 10rpx 0rpx rgba(128, 79, 0, 0.7);
	border-radius: 44rpx;
}
.btn-text {
	height: 88rpx;
	text-align: center;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(255, 255, 255, 1);
	line-height: 88rpx;
}
.qus-ico-img {
	float: right;
	width: 28rpx;
	height: 28rpx;
	margin-right: 10rpx;
}
.page-box {
	margin-top: 10rpx;
	margin: auto;
	width: 714rpx;
	height: 830rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 1rpx 10rpx 0rpx rgba(8, 8, 8, 0.2);
	border-radius: 10rpx;
}
.page-box2 {
	margin: auto;
	margin-top: 10rpx;
	width: 714rpx;
	height: 120rpx;
}
.box-item-line {
	width: 700rpx;
	height: 100rpx;
	margin: auto;
	border-bottom: rgba(232, 232, 232, 1) solid 1rpx;
}
.my-line {
	width: 670rpx;
	margin: auto;
	height: 1rpx;
	background: rgba(232, 232, 232, 1);
}
.my-title-box {
	width: 200rpx;
	height: 60rpx;
	float: left;
	margin-top: 40rpx;
}
.my-value-box {
	width: 500rpx;
	height: 60rpx;
	float: right;
	margin-top: 40rpx;
}
.my-title {
	width: 60rpx;
	margin-left: 30rpx;
	text-align: center;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
	line-height: 36rpx;
}
.my-value {
	text-align: center;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(244, 178, 73, 1);
	line-height: 36rpx;
	text-align: center;
}
</style>
