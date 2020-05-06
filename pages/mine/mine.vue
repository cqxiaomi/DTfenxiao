<template>
	<view>
		<view class="top">
			<!-- <i class="iconfont iconxiaoxi" @tap="toInformation"></i> -->
			<i class="iconfont iconshezhi" @tap="toSettings"></i>
			<view class="avatar">
				<image v-if="isLogin" :src="userInfo.avatarUrl" mode="widthFix"></image>
				<image v-else src="../../static/mine/touxiang(1).jpeg" mode="widthFix" @tap="wxLogin"></image>
			</view>
			<view v-if="isLogin" style="text-align: center;">
				<view style="font-size: 40upx;font-weight: 800;margin-top: 10upx;margin-bottom: 5upx;">{{userInfo.nickName}}</view>
				<text class="msg" v-if="mobile">{{mobile}}</text>
				<text class="msg" v-else @tap="toBindMobile">绑定手机号</text>
			</view>
			<view v-else>
				<button class="wxlogin" @tap="wxLogin">登录/注册</button>
			</view>
			<view class="top-box" v-if="isLogin">
				<view @tap="toMyPoint">
					<view style="font-size: 32upx;font-weight: 600;">{{point}}</view>
					<view class="txt">上优品</view>
				</view>
				<view @tap="toMyCoupon">
					<view style="font-size: 32upx;font-weight: 600;">{{coupons}}</view>
					<view class="txt">优品券</view>
				</view>
				<view @tap="toMyBalance">
					<view style="font-size: 32upx;font-weight: 600;">{{balance}}</view>
					<view class="txt">余额</view>
				</view>
			</view>
		</view>
		<view style="height: 50upx;" v-if="isLogin"></view>
		<view class="order-box">
			<view class="order-title">
				<view style="font-size: 32upx;">我的订单</view>
				<view style="display: flex;font-size: 26upx;color: #aaa;" @tap="toOrder(-1)">
					<text>查看全部订单</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="orders">
				<view class="option" v-for="(item,index) in orderStatus" :key="index" @tap="toOrder(index)">
					<view class="">
						<view class='cu-tag badge' style="right: 5%;" v-if="isLogin&&item.order_count">{{item.order_count}}</view>
						<i class="iconfont" :class="item.img"></i>
					</view>
					<view>{{item.txt}}</view>
					<view class=""></view>
				</view>
			</view>
		</view>
		
		<view style="height: 15upx;background-color: #F5F5F5;"></view>
		<view class="list">
			<view class="list-item" v-for="(item,index) in mineList" :key='index' @tap="toView(item.page)">
				<view>
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<view class="con">
					<text>{{item.txt}}</text>
					<text class="lg text-gray cuIcon-right" style="font-size: 26upx;color: #ddd;"></text>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modelName=='tipModel'?'show':''">
			<view class="cu-dialog phone-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="font-size: 36upx;font-weight: 600;">温馨提示</view>
				<view style="margin: 30upx 0 40upx;">{{tips}}</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">我知道了</button>
				</view>
			</view>
		</view>
		<view class="message-model" :class="hasAnimate?'animate':''" @tap="toInformation()">您收到了{{message}}条消息，点击查看>></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				showOrderCounts: false,
				user_level: '',
				isLogin: false,
				showAvatar: false,
				userInfo: null,
				mobile: null,
				imgUrl: this.imgUrl,
				modelName: '',
				order_counts: [],
				orderStatus: [{
						txt: "待付款",
						img: 'icondingdan'
					},
					{
						txt: '待发货',
						img: 'icondaizhifudingdan'
					},
					{
						txt: '待收货',
						img: 'iconicon'
					},
					{
						txt: '已收货',
						img: 'iconshouhuo'
					},
					{
						txt: '退款/售后',
						img: 'iconziyuan'
					}
				],
				mineList: [{
						img: '../../static/mine/01.png',
						txt: '上优品商城',
						page: '/pages/integralMall/integralMall'
					},
					{
						img: '../../static/mine/02.png',
						txt: '门店中心',
						page: '/pages/storeList/storeList'
					},
					{
						img: '../../static/mine/03.png',
						txt: '销售数据',
						page: '/pages/salesData/salesData'
					},
					{
						img: '../../static/mine/04.png',
						txt: '我的团队',
						page: '/pages/myTeam/myTeam'
					},
					{
						img: '../../static/mine/05.png',
						txt: '营销培训',
						page: '/pages/marketTraining/marketTraining'
					},
					{
						img: '../../static/mine/06.png',
						txt: '我的收藏',
						page: '/pages/myCollection/myCollection'
					},
					{
						img: '../../static/mine/07.png',
						txt: '我要开店',
						page: '/pages/beShop/beShop'
					},
				],
				tips: '',
				hasAnimate: false,
				message: 0,
				balance:0,
				point:0,
				coupons:0
			}
		},
		onLoad(options) {
			console.log(options)
			console.log('旧版客户端用户的userid='+this.$common.otherProgramUserid)
			if(options.otherProgramUserid){
				this.$common.otherProgramUserid = options.otherProgramUserid
			}
			if(!this.$common.wxMsg){
				uni.checkSession({
					success: () => {
						console.log('已授权')
						//已授权过且未过期则直接请求微信用户信息
						uni.getUserInfo({
							lang: "zh_CN",
							provider: 'weixin',
							success: (res) => {
								console.log(res)
								this.$common.wxMsg = res.userInfo
								this.userInfo = this.$common.wxMsg
								this.getUserMsg()
								this.updateUserinfo()
							}
						})
					},
					fail: () => {
						console.log('未授权或者过期')
						//未授权或者过期让用户重新授权
						this.isLogin = false
					}
				})
			}	
		},
		onShow() {
			console.log(this.$common.wxMsg)
			if (uni.getStorageSync('mobile')) {
				this.mobile = uni.getStorageSync('mobile')
			}		
			if (this.$common.wxMsg) {
				this.userInfo = this.$common.wxMsg
				this.getUserMsg()
			}
		},
		methods: {
			getOrdersCount() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/orderCount",
					data: {
						token: uni.getStorageSync('token')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.order_counts = res.data.data
							this.orderStatus[0].order_count = this.order_counts.wait_pay
							this.orderStatus[1].order_count = this.order_counts.wait_fa
							this.orderStatus[2].order_count = this.order_counts.wait_shou
						}
					}
				})
			},
			toMyPoint(){
				uni.navigateTo({
					url:"../integralMall/integralMall"
				})
			},
			toMyBalance(){
				uni.navigateTo({
					url:"../salesData/salesData"
				})
			},
			getUserMsg(){
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/getScore',
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.point = res.data.data.pay_points
							this.balance = res.data.data.user_money
							this.coupons = res.data.data.coupon
							this.getOrdersCount()
							this.isLogin = true
							return
						}
						if(res.data.status==1){
							this.isLogin = false
							uni.removeStorageSync('token')
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			toMyCoupon(){
				uni.navigateTo({
					url:"../discountTickets/discountTickets"
				})
			},
			wxLogin() {
				uni.navigateTo({
					url: "../wxLogin/wxLogin"
				})
			},
			//上传更新用户微信昵称头像信息
			updateUserinfo() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/User/updateUserInfo',
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						avataUrl: this.userInfo.avatarUrl,
						gender: this.userInfo.gender,
						nickName: this.userInfo.nickName,
						address: this.userInfo.country + this.userInfo.province + this.userInfo.city
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log('微信昵称头像已经上传更新')
						console.log(res.data)
					},
				})
			},
			getOrdersCount() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/orderCount",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.order_counts = res.data.data
							this.orderStatus[0].order_count = this.order_counts.wait_pay
							this.orderStatus[1].order_count = this.order_counts.wait_fa
							this.orderStatus[2].order_count = this.order_counts.wait_shou
							return
						}
						if (res.data.status == 1) {
							this.reLogin()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			toBindMobile() {
				uni.navigateTo({
					url: '../bindMobile/bindMobile'
				})
			},
			closeModel() {
				this.modelName = ''
			},
			toSettings() {
				uni.navigateTo({
					url: '../settings/settings'
				})
			},
			toInformation() {
				// this.showToast('功能暂未开放')
				return
				uni.navigateTo({
					url: "../information/information"
				})
			},
			toLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			toOrder(status) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: "../wxLogin/wxLogin"
					})
					return
				}
				if (status == 4) {
					uni.navigateTo({
						url: "../afterSaleRecode/afterSaleRecode"
					})
					return
				}
				uni.navigateTo({
					url: "../orders/orders?status=" + status
				})
			},
			toView(url) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: "../wxLogin/wxLogin"
					})
					return
				}
				if (url == "/pages/beShop/beShop") {
					this.checkMakeShop(url)
					return
				}
				uni.navigateTo({
					url: url
				})
			},
			checkMakeShop(url){
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/store/publics/selectShop',
					data: {
						user_id: uni.getStorageSync('user_id')
					},
					header: this.header,
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if(res.data.data){
								uni.navigateTo({
									url:"../beShop/steps?status="+res.data.data.status
								})
							}else{
								uni.navigateTo({
									url:url
								})
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	.order-title{
		display: flex;
		justify-content: space-between;
		line-height: 50upx;
		border-bottom: 1upx solid #f1f1f1;
	}
	.top {
		background-color: #55AFFD;
		height: 320upx;
		position: relative;
	}

	.top-box {
		position: absolute;
		left: 30upx;
		bottom: 0;
		width: 690upx;
		transform: translateY(50%);
		background-color: #fff;
		border-radius: 20upx;
		display: flex;
		justify-content: space-around;
		padding: 20upx 0;
		box-shadow: 0 5upx 12upx rgba(0, 0, 0, 0.1);
	}

	.top-box>view {
		flex: 1;
		text-align: center;
		line-height: 40upx;
	}

	.cu-bar {
		min-height: 88upx !important;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
	}

	.iconxiaoxi {
		font-size: 44upx;
		position: absolute;
		left: 30upx;
		top: 0;
		color: #fff;
	}

	.iconshezhi {
		font-size: 40upx;
		position: absolute;
		right: 30upx;
		top: 0;
		color: #fff;
	}

	.avatar {
		box-shadow: 0 4upx 15upx rgba(0, 0, 0, 0.2);
		padding: 8upx;
		width: 128upx;
		height: 128upx;
		border-radius: 50%;
		margin: 0 auto;
		background-color: #fff;
	}

	.avatar image {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		display: block;
	}

	.top-r {
		margin-left: 30upx;
		margin-top: 20upx;
	}

	.wxlogin {
		font-size: 40upx;
		font-weight: 600;
		border: 0;
		background-color: transparent;
		height: 100upx;
		padding: 0;
		width: 200upx;
		color: #fff;
	}

	.wxlogin::after {
		border: 0;
	}

	.name {
		display: flex;
		justify-content: space-between;
		line-height: 60upx;
		margin-bottom: 10upx;
	}

	.nickname {
		font-size: 36upx;
		font-weight: 600;
	}

	.type {
		font-size: 22upx;
	}

	.msg {
		font-size: 24upx;
		display: inline-block;
		line-height: 50upx;
		padding: 0 20upx;
	}

	.orders i {
		color: #F82F25;
		font-size: 44upx;
		margin-bottom: 10upx;
	}
	.order-box{
		padding: 40upx 50upx 20upx;
	}

	.orders {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		border-radius: 20upx;
		padding: 20upx 0;
	}

	.orders view.option {
		text-align: center;
		position: relative;
	}

	.orders view.option>view:nth-child(2) {
		font-size: 26upx;
	}

	.list {
		margin: 0 30upx 60upx;
	}

	.list-item {
		display: flex;
		padding: 15upx 10upx;
		margin: 10upx 0;
	}

	.list-item image {
		width: 70upx;
		display: block;
		height: auto;
	}

	.list .con {
		line-height: 70upx;
		margin-left: 20upx;
		border-bottom: 1upx solid #F2F2F2;
		flex: 1;
		display: flex;
		font-size: 30upx;
		justify-content: space-between;
	}

	.phone-box {
		padding: 30upx 30upx 40upx;
	}

	.message-model {
		margin: 20upx 30upx;
		border-radius: 10upx;
		line-height: 100upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		background: #eee;
		color: #666;
		position: fixed;
		top: -140upx;
		width: 690upx;
		padding: 0 30upx;
		box-sizing: border-box;
		z-index: 1000;
		text-align: center;
		transition: 0.3s;
	}

	.animate {
		top: 0;
	}
</style>
