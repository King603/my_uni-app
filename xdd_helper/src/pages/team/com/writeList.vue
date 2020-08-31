<template>
	<view class="page-cont">
		<view class="my-box" v-for="(item, index) in writeList" :key="index">
			<view class="my-line">
				<text class="tit-left-uname">用户名：{{ item.userPhone }}</text>
				<text @click="delWhiteList(item)" class="tit-right-close">X</text>
			</view>
			<view class="my-line">
				<text class="tit-left-ytime">优惠次数：{{ item.discountTimes }}次/天</text>
				<text class="tit-right-ytime">优惠时长：{{ item.discountDuration }}小时/次</text>
			</view>
			<view class="my-line">
				<text class="tit-left-ytime">开始时间：</text>
				<text class="time-cont">{{ item.startDate }}</text>
			</view>
			<view class="my-line">
				<text class="tit-left-ytime">结束时间：</text>
				<text class="time-cont">{{ item.endDate }}</text>
			</view>
			<view class="my-line">
				<text class="tit-left-ytime">加入时间：</text>
				<text class="time-cont">{{ item.joinDate }}</text>
			</view>
		</view>
		<view v-show="this.writeList.length == 0" class="my-text-center" @click="loadMore"><text>暂无相关数据</text></view>
		<view v-show="this.writeList.length != 0" class="my-text-center" @click="loadMore"><text>加载更多</text></view>
		<view class="btn-box">
			<view @click="btnAdd" class="btn-add"><text>新增用户</text></view>
		</view>
		<goTop :top="top"></goTop>
	</view>
</template>

<script>
import goTop from '@/components/goTop/goTop.vue';
import req from '@/util/req.js';
export default {
	components: {
		goTop
	},
	onLoad(options) {
		this.businessId = options.businessId;
		this.getList();
	},
	data() {
		return {
			businessId: 0,
			writeList: [],
			pageSize: 30,
			pageIndex: 0
		};
	},
	methods: {
		delWhiteList(item) {
			uni.showModal({
				title: '提示',
				content: '确定删除吗？',
				success: function(res) {
						if (res.confirm) {
						{
							uni.showToast({	title: '暂未开放',icon: 'none'});
						}
					}
				}
			});
		},
		loadMore() {
			if (this.writeList.length > 0) this.pageIndex++;
			this.getList();
		},
		btnAdd() {
			// uni.navigateTo({
			// 	url:"/pages/team/com/writeListSet?businessId="+this.businessId
			// })
			uni.navigateBack({ delta: 1 });
		},
		getList() {
			console.log('获取白名单列表');
			var params = {
				businessId: parseInt(this.businessId),
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			};
			console.log(params);
			req.request('POST', params, '/proxy/api/proxy/white/list', '加载中', res => {
				if (res.statusCode === 200) {
					if (res.data.data.rows.length > 0) {
						res.data.data.rows.forEach(item => {
							this.writeList.push(item);
						});
					} else {
						this.pageIndex--;
						if (this.pageIndex <= 0) this.pageIndex = 0;
						uni.showToast({ title: '没有更多数据了', icon: 'none' });
					}
				}
			});
		}
	}
};
</script>

<style scoped>
.my-text-center {
	text-align: center;
}
.my-box {
	width: 714rpx;
	height: 323rpx;
	margin: auto;
	background: #ffffff;
	margin-top: 30rpx;
}
.my-line {
	height: 70rpx;
}
.btn-box {
	height: 80rpx;
	margin-top: 30rpx;
}
.btn-add {
	margin: auto;
	background: rgba(244, 178, 73, 1);
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 44rpx;
	color: #ffffff;
	font-size: 36rpx;
	font-family: PingFang SC;
}
.tit-left-uname {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(0, 0, 0, 1);
	margin-left: 30rpx;
}
.tit-right-close {
	float: right;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(0, 0, 0, 1);
	margin-right: 30rpx;
}
.tit-left-ytime {
	font-size: 26rpx;
	font-family: PingFang SC;
	margin-left: 30rpx;
}
.tit-right-ytime {
	float: right;
	font-size: 26rpx;
	font-family: PingFang SC;
	margin-right: 30rpx;
}
.time-cont {
	margin-left: 50rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	color: rgba(51, 51, 51, 1);
}
</style>
