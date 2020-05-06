<template>
	<view>
		<!-- <view class="notice">
			<image class="notice-pic" src="../../static/mall/notice.png" mode="widthFix"></image>
			<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000" vertical="true" circular="true">
				<swiper-item v-for="(item,index) in 5" :key="index">
					<view class="swiper-item">
						<view class="swiper-txt">相关商品上优品兑换下架调整通知</view>
						<view style="padding-right: 15upx;">
							<text style="white-space: nowrap;color:#fff">查看</text>
							<text style="color: #fff;" class="lg cuIcon-right"></text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->
		<scroll-view scroll-y="true" :scroll-into-view="option_Id" style="position: fixed;top: 0; bottom: 0;width: 100%;">
			<view class="top-box">
				<view class="top-options">
					<view>
						<view style="padding-left: 60upx;position: relative;color: red;font-weight: 800;font-size: 34upx;">
							<image class="icon4" style="width: 55upx;" src="../../static/mall/icon_03.png" mode="widthFix"></image>
							{{userPoint}}
						</view>
					</view>
					<view style="border-left: 4upx solid #DDDDDD;">
						<!-- <view>充值记录</view> -->
						<view style="padding-left: 50upx;position: relative;">
							<image class="icon4" src="../../static/mall/icon11.png" mode="widthFix"></image>
							充值记录
						</view>
					</view>
				</view>
				<swiper class="screen-swiper square-dot adSwiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
				 duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="toDetail(item.ad_link)">
						<image :src="item.ad_code" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="option-box">
					<view v-for="(item,index) in options" :key="index" @tap="toOption(index)">
						<image :src="item.pic" mode="widthFix"></image>
						<view>{{item.txt}}</view>
					</view>
				</view>
			</view>

			<view class="con-box" v-for="(item,index) in options" :key="index">
				<view class="con-title bg-white" :id="'option'+index">
					<image :src="item.icon" mode="widthFix"></image>
					<view class="con-title-l">{{item.txt}}</view>
					<view class="con-title-r" v-if="index==1" @tap="toMoreCoupons(1)">
						<text>查看更多</text>
						<text class="lg cuIcon-right"></text>
					</view>
					<view class="con-title-r" v-if="index==4" @tap="toMoreCoupons(2)">
						<text>查看更多</text>
						<text class="lg cuIcon-right"></text>
					</view>
				</view>
				<!-- 上优品充值 -->
				<view class="recharge bg-white" v-if="index==0">
					<view class="recharge-item" v-for="(item,i) in rechargeMoneys" :key="i" @tap="toRecharge(item)">
						<view class="recharge-item-top">
							<view class="recharge-icon">
								<image src="../../static/mall/icon2.png" mode="widthFix"></image>
							</view>
							<view class="recharge-money">{{item.deposit_price}}</view>
						</view>
						<view class="recharge-item-btn bg-white">立即充值</view>
					</view>
				</view>
				<!-- 上优品兑券 -->
				<view class="goods-box" v-if="index==1">
					<view class="goods-item" v-for="(item,i) in cash_coupon_list" :key="i" @tap="toCouponDetail(i,1)">
						<view class="coupon-box">
							<image src="../../static/mall/bg01.png" mode="widthFix"></image>
							<text class="tip">抢</text>
							<view class="coupon-txt">
								<view style="font-weight: 600;font-size: 40upx;margin-left: 5upx;">¥{{item.money}}</view>
								<view style="margin-left: 15upx;font-size: 24upx;">满{{item.condition}}可用</view>
							</view>
						</view>
						<view style="line-height: 60upx;color: red;font-size: 34upx;font-weight: 600;">¥ {{item.price}}元</view>
						<view class="coupon-bottom">
							<view style="position: relative;padding-left: 35upx;color: #E8B100;font-size: 24upx;">
								<image src="../../static/mall/tip01.png" mode="widthFix"></image>{{item.use_type==1?"门店专享":item.use_type==2?"APP专享":"通用"}}
							</view>
							<view style="background-color: red;padding: 0 15upx;border-radius: 20upx;color: #fff;font-size: 24upx;">立即兑换</view>
						</view>
					</view>
				</view>
				<!-- 视频直播 -->
				<view class="lives-box bg-white" v-if="index==2">
					<view class="lives-item" @tap="toLive(0)">
						<view style="position: relative;">
							<image src="../../static/mall/live01.png" mode="widthFix"></image>
							<image class="icon3" src="../../static/mall/icon6.png" mode="widthFix"></image>
						</view>

						<view class="lives-item-txt" style="color: #63B4FC;">月/季/年</view>
					</view>
					<view class="lives-item" @tap="toLive(1)">
						<view style="position: relative;">
							<image src="../../static/mall/live02.png" mode="widthFix"></image>
							<image class="icon3" src="../../static/mall/icon7.png" mode="widthFix"></image>
						</view>
						<view class="lives-item-txt" style="color: #43C76F;">单次购买</view>
					</view>
				</view>
				<!-- 溯源认证 -->
				<view class="bg-white" v-if="index==3">
					<view class="authentication">
						<view class="authen-item" @tap="toAuthentication">
							<image id="icon1" src="../../static/mall/icon5.png" mode="widthFix"></image>
							<view class="authen-item-txt">品牌保护、多重保障</view>
							<image id="icon2" src="../../static/mall/icon4.png" mode="widthFix"></image>
						</view>
						<view class=""></view>
					</view>
				</view>
				<!-- 领取优惠券 -->
				<view class="goods-box" v-if="index==4">
					<view class="goods-item" v-for="(item,i) in otherCoupons" :key="i" @tap="toCouponDetail(i,2)">
						<view class="coupon-box">
							<image src="../../static/mall/bg02.png" mode="widthFix"></image>
							<text class="tip">抢</text>
							<view class="coupon-txt">
								<view class="">
									¥<text style="font-weight: 600;font-size: 40upx;margin-left: 5upx;">{{item.money}}</text>
									<!-- <text style="margin-left: 15upx;font-size: 24upx;">赠送礼包</text> -->
								</view>
								<!-- <view style="font-size: 20upx;" v-if="item.use_start_time">有效期：{{item.use_start_time}}至{{item.use_end_time}}</view> -->
							</view>
						</view>
						<view class="">{{item.name}}</view>
						<view class="coupon-bottom">
							<view class=""></view>
							<view style="background-color: #f1f1f1;padding: 0 15upx;border-radius: 20upx;color: #E8B100;font-size: 24upx;">{{item.use_type==1?"门店专享":item.use_type==2?"APP专享":"通用"}}</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 40upx;"></view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: null,
				userPoint: null,
				options: [{
						pic: "../../static/mall/01.png",
						icon: "../../static/mall/title01.png",
						txt: "UP充值"
					},
					{
						pic: "../../static/mall/02.png",
						icon: "../../static/mall/title02.png",
						txt: "优品券兑换"
					},
					{
						pic: "../../static/mall/03.png",
						icon: "../../static/mall/title03.png",
						txt: "视频直播"
					},
					{
						pic: "../../static/mall/04.png",
						icon: "../../static/mall/title04.png",
						txt: "溯源认证"
					},
					{
						pic: "../../static/mall/05.png",
						icon: "../../static/mall/title05.png",
						txt: "领取优品券"
					},
				],
				rechargeMoneys: [],
				coupons: [],
				coupon_month: [],
				coupon_day: [],
				option_Id: '',
				otherCoupons: [],
				cash_coupon_list: []
			}
		},
		onShow() {
			this.getPoints()
			this.getAd()
			this.getCouponList()
			this.getRechargeMoney()
		},
		methods: {
			//跳转轮播详情页面
			toDetail(url) {
				uni.navigateTo({
					url: url
				})
			},
			toMoreCoupons(type) {
				if (type == 1) {
					uni.navigateTo({
						url: "../moreCoupons/moreCoupons"
					})
				} else {
					uni.navigateTo({
						url: "../exchangeCoupon/exchangeCoupon"
					})
				}

			},
			//获取可充值金额
			getRechargeMoney() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/store/coupon/indexCashCouponList',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.rechargeMoneys = res.data.data.deposit_list
							this.cash_coupon_list = res.data.data.cash_coupon_list
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},

			//获取用户积分
			getPoints() {
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
							this.userPoint = parseFloat(res.data.data.pay_points)
							uni.setStorageSync('userPoint', this.userPoint)
							return
						}
						if (res.data.status == 1) {
							uni.removeStorageSync('token')
							this.reLogin()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//轮播图列表
			getAd() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Ad/index',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.swiperList = res.data.data
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//获取优惠券列表
			getCouponList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/store/coupon/indexCouponList',
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.coupons = res.data.data.coupon_pay
							this.coupon_month = res.data.data.coupon_month
							this.coupon_day = res.data.data.coupon_day
							this.otherCoupons = this.coupon_month.concat(this.coupon_day)
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			toCouponDetail(index, type) {
				console.log(index)
				if (type == 1) {
					uni.setStorageSync('couponDetail', this.cash_coupon_list[index])
				} else if (type == 2) {
					uni.setStorageSync('couponDetail', this.otherCoupons[index])
				}
				uni.navigateTo({
					url: "../couponDetail/couponDetail?type=" + type
				})
			},
			toRecharge(money) {
				uni.setStorageSync('recharge', money)
				uni.navigateTo({
					url: "../recharge/recharge"
				})
			},
			toLive(i) {
				if (i == 0) {
					uni.navigateTo({
						url: "../liveRecharge/liveRecharge"
					})
				} else if (i == 1) {
					uni.navigateTo({
						url: "../live/live"
					})
				}
			},
			toAuthentication() {
				uni.navigateTo({
					url: "../authentication/authentication"
				})
			},
			toOption(index) {
				this.option_Id = 'option' + index
				console.log(this.option_Id)
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.notice {
		height: 80upx;
		line-height: 80upx;
		background-color: #F93644;
		padding: 0 20upx;
		padding-left: 70upx;
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.notice-pic {
		width: 50upx;
		position: absolute;
		top: 50%;
		left: 20upx;
		transform: translateY(-50%);
	}

	.swiper {
		position: absolute;
		height: 80upx;
		top: 0;
		left: 80upx;
		width: 670upx;
	}

	.swiper-item {
		display: flex;
		justify-content: space-between;
	}

	.swiper-txt {
		flex: 1;
		padding: 0 15upx;
		color: #fff;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.top-box {
		background-color: #fff;
		padding: 0 30upx 40upx;
	}

	.top-options {
		display: flex;
		line-height: 60upx;
		padding: 15upx 0;
	}

	.top-options>view {
		flex: 1;
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.top-options .icon4 {
		position: absolute;
		left: 0;
		top: 50%;
		width: 40upx;
		transform: translateY(-50%);
		height: auto;
	}


	.adSwiper {
		border-radius: 20upx;
		min-height: 200upx !important;
		overflow: hidden;
	}

	.option-box {
		display: flex;
		justify-content: space-around;
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
	}

	.option-box image {
		width: 80upx;
		margin-bottom: 5upx;
		height: auto;
	}

	.con-title {
		line-height: 80upx;
		padding: 0 20upx 0 66upx;
		display: flex;
		justify-content: space-between;
		position: relative;
		font-weight: 800;
		margin-top: 20upx;
	}

	.con-title image {
		width: 40upx;
		position: absolute;
		left: 20upx;
		top: 50%;
		transform: translateY(-60%);
	}

	.con-title-r {
		display: flex;
		color: #aaa;
		font-weight: normal;
	}

	.recharge {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		padding-bottom: 0;
	}

	.recharge-item {
		background-image: linear-gradient(to right, #FEC248, #F57F1A);
		width: 280upx;
		height: 160upx;
		border-radius: 15upx;
		position: relative;
		margin-bottom: 30upx;
		box-shadow: 0 3upx 10upx 3upx #ccc;
	}

	.recharge-item-top {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: center;
		line-height: 105upx;
		top: 0;
		left: 0;
	}

	.recharge-item-top>view {
		flex: 1;
	}

	.recharge-icon {
		text-align: right;
	}

	.recharge-item-top image {
		width: 120upx;
		height: auto;
	}

	.recharge-money {
		color: #fff;
		font-size: 50upx;
		text-align: center;
	}

	.recharge-item-btn {
		position: absolute;
		width: 160upx;
		line-height: 40upx;
		bottom: 15upx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 20upx;
		color: #F57F1A;
		text-align: center;
		font-size: 26upx;
		box-shadow: 0 0 10upx 3upx #ccc;
	}

	.goods-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 30upx;
	}

	.goods-item {
		width: 48%;
		margin-top: 20upx;
		background-color: #fff;
		padding: 20upx 30upx;
	}

	.coupon-box {
		position: relative;
	}

	.coupon-box .tip {
		position: absolute;
		left: 15upx;
		top: 8upx;
		font-weight: 800;
		color: red;
		font-size: 26upx;
		height: auto;
	}

	.coupon-bottom {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}

	.coupon-bottom image {
		width: 30upx;
		height: auto;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.coupon-txt {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		text-align: center;
		color: #fff;
	}

	.goods-pic {
		width: 270upx;
		height: 270upx;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		border-radius: 10upx;
		overflow: hidden;
	}

	.price-txt {
		position: absolute;
		width: 100%;
		text-align: center;
		top: 50%;
		transform: translateY(-50%);
		font-weight: 600;
		color: #fff;
	}

	.lives-box {
		margin-top: 20upx;
		display: flex;
		justify-content: space-around;
		padding: 30upx;
	}

	.lives-item {
		width: 300upx;
		text-align: center;
		box-shadow: 0 3upx 10upx 3upx #DDDDDD;
		overflow: hidden;
	}

	.lives-item-txt {
		line-height: 50upx;
	}

	.lives-item image {
		width: 100%;
		display: block;
		height: auto;
	}

	.lives-item .icon3 {
		width: 50upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.authentication {
		margin: 0 30upx;
		border-top: 1upx solid #ddd;
		padding: 20upx 0;
		display: flex;
		justify-content: space-around;
	}

	.authentication>view {
		width: 300upx;
		border-radius: 10upx;
		text-align: center;
		position: relative;
	}

	.authen-item {
		background-image: linear-gradient(#3BCAF4, #1EA8D0);
		height: 160upx;
		box-shadow: 0 3upx 10upx 3upx #ccc;
	}

	.authen-item #icon1 {
		width: 50upx;
		position: absolute;
		top: 10upx;
		right: 10upx;
	}

	.authen-item #icon2 {
		position: absolute;
		bottom: 15upx;
		left: 50%;
		transform: translateX(-50%);
		width: 240upx;
	}

	.authen-item-txt {
		margin-top: 50upx;
		font-weight: 800;
		color: #fff;
	}
</style>
