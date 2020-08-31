<template>
	<view class="">
		<index v-if="page_code=='index'"></index>
		<stat v-if="page_code=='stat'"></stat>
		<my :personal="personal" v-if="page_code=='my'"></my>
		<team v-if="page_code=='team'"></team>
		<medic v-if="page_code=='medic'"></medic>
		<footerNav></footerNav>
		<go-top style="width: 100upx;height: 100upx;"/>
	</view>
</template>

<script>
	import goTop from "@/components/goTop/goTop.vue"
	
	import login from '../../components/login/login.vue'
	import index from './pages/index.vue'
	import stat from './pages/stat.vue'
	import my from './pages/my.vue'
	import team from './pages/team.vue'
	import medic from './pages/medic.vue'
	import footerNav from "../../components/footer/footer_nav.vue";
	import req from "@/util/req.js"
	export default {
		data() {
			return {
				loading: false,
				personal:null
			}
		},
		components: {
			login,
			index,
			stat,
			my,
			footerNav,
			medic,
			team,
			goTop
		},
		computed: {			
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			}
		},
		onLoad() {
			this.isBusiness=uni.getStorageSync('openIdBindByBusiness')||false;
		},
		onShow() {},
		onReady() {},
		methods: {
		}
	}
</script>

<style>

</style>
