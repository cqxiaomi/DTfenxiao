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
		<view class="top-box">
			<view class="top-options">
				<view>
					<i class="iconfont iconintegral"></i>
					<view style="display: flex;"><text style="color: red;font-weight: 600;padding-right: 8upx;">{{userPoint}}</text>上优品</view>
				</view>
				<view style="border-left: 4upx solid #DDDDDD;" @tap="toMyIntegraOrders">
					<i class="iconfont iconcalendar"></i>
					<view>上优品订单</view>
				</view>
			</view>
			<swiper class="screen-swiper square-dot adSwiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="toDetail(item.ad_link)">
					<image :src="item.ad_code" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		
		
		<view class="box" v-if="coupons.length!=0">
			<view class="title">
				<image src="../../static/mall/Coupon.png" mode="widthFix"></image>
				<view class="title-con">
					<text style="font-size: 32upx;font-weight: 800;">上优品兑券</text>
					<text style="color: #bbb;" @tap="toMoreCoupons(1)">
						<text>查看更多</text>
						<text class="lg cuIcon-right"></text>
					</text>
				</view>
			</view>
			<view class="goods-box">
				<view class="goods-item" v-for="(item,index) in coupons" :key="index" @tap="toCouponDetail(item.id)">
					<view class="goods">
						<view style="position: relative;">
							<image src="../../static/mall/timg.png" mode="widthFix"></image>
							<view class="price-txt">¥<text style="padding-left: 8upx;font-size: 48upx;">{{item.money}}</text></view>
						</view>
						<view style="line-height: 40upx;margin-top: 30upx;">{{item.name}}</view>
						<view style="line-height: 40upx;font-size: 24upx;color: red;"><text style="padding-right: 5upx;">{{item.point}}</text>上优品</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="box" v-if="goods.length!=0">
			<view class="title">
				<image src="../../static/mall/brand.png" mode="widthFix"></image>
				<view class="title-con">
					<text style="font-size: 32upx;font-weight: 800;">品牌精选</text>
					<text style="color: #bbb;" @tap="toMore">
						<text>查看更多</text>
						<text class="lg cuIcon-right"></text>
					</text>
				</view>
			</view>
			<view class="goods-box">
				<view class="goods-item" style="padding:50upx" v-for="(item,index) in goods" :key="index">
					<view class="goods" @tap="toGoodsDetail(item.pgoods_id)">
						<view class="goods-pic" :style="'background-image: url('+item.pgoods_image+');'"></view>
						<view class="goods-name">{{item.pgoods_name}}</view>
						<view style="line-height: 40upx;font-size: 24upx;color: red;"><text style="padding-right: 5upx;">{{item.pgoods_points}}</text>上优品</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="box" v-if="coupon_month.length!=0">
			<view class="title">
				<image src="../../static/mall/Coupon.png" mode="widthFix"></image>
				<view class="title-con">
					<text style="font-size: 32upx;font-weight: 800;">每月领券</text>
					<text style="color: #bbb;">
						<text>查看更多</text>
						<text class="lg cuIcon-right"></text>
					</text>
				</view>
			</view>
			<view class="goods-box">
				<view class="goods-item" v-for="(item,index) in coupon_month" :key="index" @tap="toGetCoupon(item.id)">
					<view class="goods">
						<view style="position: relative;">
							<image src="../../static/mall/timg.png" mode="widthFix"></image>
							<view class="price-txt">¥<text style="padding-left: 8upx;font-size: 48upx;">{{item.money}}</text></view>
						</view>
						<view style="line-height: 40upx;margin-top: 30upx;">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="box" v-if="coupon_day.length!=0">
			<view class="title">
				<image src="../../static/mall/Coupon.png" mode="widthFix"></image>
				<view class="title-con">
					<text style="font-size: 32upx;font-weight: 800;">每日领券</text>
					<text style="color: #bbb;">
						<text>查看更多</text>
						<text class="lg cuIcon-right"></text>
					</text>
				</view>
			</view>
			<view class="goods-box">
				<view class="goods-item" v-for="(item,index) in coupon_day" :key="index" @tap="toGetCoupon(item.id)">
					<view class="goods">
						<view style="position: relative;">
							<image src="../../static/mall/timg.png" mode="widthFix"></image>
							<view class="price-txt">¥<text style="padding-left: 8upx;font-size: 48upx;">{{item.money}}</text></view>
						</view>
						<view style="line-height: 40upx;margin-top: 30upx;">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:null,
				userPoint: null,
				goods: null,
				coupons: [],
				coupon_month:[],
				coupon_day:[],
				page:1
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getPoints()
			this.getAd()
			this.getGoodsList()
			this.getCouponList()
		},
		methods: {
			toMoreCoupons(type){
				uni.setStorageSync("coupons",this.coupons)
				uni.navigateTo({
					url:"../moreCoupons/moreCoupons?type="+type
				})
			},
			toMore(){
				uni.navigateTo({
					url:"../morePointGoods/morePointGoods"
				})
			},
			toGetCoupon(id){
				uni.navigateTo({
					url: "../couponDetail/couponDetail?id=" + id+"&type=free"
				})
			},
			toCouponDetail(id){
				uni.navigateTo({
					url: "../couponDetail/couponDetail?id=" + id
				})
			},
			toDetail(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},
			toGoodsDetail(id) {
				uni.navigateTo({
					url: "../integralGoodsDetail/integralGoodsDetail?id=" + id
				})
			},
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
			toMyIntegraOrders() {
				uni.navigateTo({
					url: '../myIntegraOrder/myIntegraOrder'
				})
			},
			getCouponList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Coupon/indexCouponList',
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
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			getGoodsList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/goods/indexIntegralMall',
					data: {
						token: uni.getStorageSync('token'),
						type: 0,
						page: this.page,
						offset: 10
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.goods = res.data.data[0]
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
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
	page {
		background-color: #f1f1f1;
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

	.goods-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goods-item {
		width: 370upx;
		margin-top: 10upx;
		background-color: #fff;
		padding: 70upx 50upx;
	}

	.goods-item:nth-child(even) {
		margin-left: 10upx;
	}
	.goods-pic{
		width: 270upx;
		height: 270upx;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		border-radius: 10upx;
		overflow: hidden;
	}

	.box {
		background-color: #f5f5f5;
		box-shadow: 0 6upx 6upx 3upx #ddd;
		margin-bottom: 20upx;
	}

	.title-con {
		display: flex;
		justify-content: space-between;
	}

	.title {
		padding: 0 20upx 0 70upx;
		line-height: 80upx;
		background-color: #fff;
		position: relative;
	}

	.title image {
		width: 40upx;
		position: absolute;
		top: 50%;
		left: 20upx;
		transform: translateY(-50%);
	}

	.options-box {
		display: flex;
		justify-content: space-around;
		text-align: center;
		padding: 60upx 0 40upx;
	}

	.options-box image {
		width: 50upx;
		margin-bottom: 10upx;
	}

	.adSwiper {
		border-radius: 20upx;
		min-height: 200upx !important;
		overflow: hidden;
	}

	.top-box {
		background-color: #fff;
		padding: 0 30upx 40upx;
		box-shadow: 0 6upx 6upx 3upx #ddd;
		margin-bottom: 20upx;
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
	.top-options>view>.iconfont{
		padding-right: 8upx;
		font-size: 40upx;
		color: red;
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
	.goods-name {
		line-height: 40upx;
		margin-top: 30upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
