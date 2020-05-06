<template>
	<view>
		<view class="search">
			<view class="city-box" @tap="toLocation">
				<i class="iconfont icondingwei" style="font-size: 48upx;"></i>
				<text class="city-txt">{{localCity}}</text>
				<text class="lg cuIcon-unfold"></text>
			</view>
			<view class="search-box">
				<!-- <view class="search-l" @tap="toLocation">
					<i class="iconfont icondingwei" style="font-size: 40upx;"></i>
					<text class="city">{{localCity}}</text>
					<text class="lg text-gray cuIcon-unfold"></text>
				</view> -->
				<view class="search-c">
					<input style="height: 100%;" type="text" @focus="toSearch" placeholder="搜索你要的商品" placeholder-style="color:#aaa" />
				</view>
				<view class="search-r">
					<text class="lg text-gray cuIcon-search"></text>
				</view>
			</view>
		</view>

		<!-- 一级分类导航 -->
		<scroll-view scroll-x class="nav" style="background-color: #fff;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="-1==TabCur?'text-pink':''" @tap="tabSelect" data-index="-1" data-tabid="0">全部</view>
			<view class="cu-item" :class="index==TabCur?'text-pink':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect"
			 :data-index="index" :data-tabid="item.id">{{item.name}}</view>
		</scroll-view>

		<scroll-view class="shops-scroll" :scroll-top="scrollTop" @scroll="myScroll" :enable-back-to-top="true"
		 @scrolltolower="loadMoreGoods" scroll-y="true">
			<!-- 二级分类导航 -->
			<scroll-view v-if="subTabs.length!=0" style="background-color: #fff;" scroll-x class="nav">
				<view style="display: inline-block;text-align: center;width: 20%;padding: 20upx 0;" v-for="(item,index) in subTabs"
				 :key="index" @tap="subTabsSelect(index)">
					<view class="sub-item-icon" :style="'background-image: url('+item.image+');'"></view>
					<view style="margin-top: 10upx;font-size: 22upx;color: #aaa;">{{item.name}}</view>
				</view>
			</scroll-view>

			<!-- 领券 -->
			<view style="padding: 10upx 0;background-color: #f1f1f1;" v-if="coupons.length!=0">
				<view class="coupons-box">
					<view style="width: 150upx;white-space: nowrap;text-align: center;background-color:#54B3B0;color: #fff;">
						<view style="line-height: 60upx;font-size: 36upx;font-weight: 600;">先领券</view>
						<view style="line-height: 30upx;font-size: 22upx;">购物更优惠</view>
					</view>
					<view style="width: 520upx;">
						<scroll-view scroll-x="true" class="coupon-scroll" style="white-space: nowrap;">
							<view class="coupons" style="display: inline-block" v-for="(item,index) in coupons" :key="index">
								<view style="display: flex;line-height: 60upx;justify-content: center;"><text style="color: #54B3B0;">¥</text><text
									 style="font-size: 40upx;font-weight: 600;color: #54B3B0;padding: 0 5upx;">{{item.money}}</text><text>优品券</text></view>
								<view style="background-color: #54B3B0;color: #fff;font-size: 22upx;line-height: 30upx;">满<text style="padding: 0 5upx;">{{item.condition}}</text>元使用</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>

			<!-- 轮播图 -->
			<swiper style="height: 250upx;" class="square-dot" :autoplay="true" :interval="3000" :duration="300" :circular="true">
				<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="toDetail(item.ad_link)" :style="'background-image: url('+item.ad_code+');background-size: cover;background-position: center;'">
				</swiper-item>
			</swiper>
			<!-- 一级分类列表 -->
			<scroll-view v-if="tabs.length!=0&&TabCur==-1" style="background-color: #fff;" scroll-x class="nav">
				<view style="display: inline-block;text-align: center;width: 20%;padding: 20upx 0;" v-for="(item,index) in tabs"
				 :key="index" @tap="toClassifyPage(index)">
					<view class="sub-item-icon" :style="'background-image: url('+item.image+');'"></view>
					<view style="margin-top: 10upx;font-size: 22upx;color: #aaa;">{{item.name}}</view>
				</view>
			</scroll-view>
			<!-- 商品列表 -->
			<view style="line-height: 80upx;display: flex;background-color: #fff;padding: 0 30upx;margin: 10upx 0;">
				<i class="iconfont iconphb" style="font-size: 40upx;color: #EE9E11;padding-right: 10upx;"></i>
				<view style="font-weight: 800;font-size: 32upx;">热销排行榜</view>
			</view>
			<view class="goodsList" v-if="goods.length!=0">
				<view class="goods-item" v-for="(item,index) in goods" :key="index" @tap="toGoodsDetail(item.shop_id,item.goods_id)">
					<view class="pic" :style="'background-image: url('+item.original_img+');'"></view>
					<view class="con">
						<view class="goodsname">{{item.goods_name}}</view>
						<view style="display: flex;justify-content: space-between;line-height: 40upx;">
							<view style="color: red;">¥ {{item.price}}</view>
							<view style="font-size: 22upx;color: #aaa;">销量：<text>{{item.sales_volume}}</text>件</view>
						</view>
					</view>
				</view>
			</view>
			<view class="null" v-else style="text-align: center;line-height: 80upx;color: #aaa;font-size: 32upx;">
				暂无商品信息
			</view>
			<!-- 店铺列表 -->
			<!-- <view class="">
				<view class="shops" v-for="(item,index) in shops" :key="index">
					<view class="shop-con-top">
						<view class="shop-msg">
							<view class="shop-pic" v-if="item.logo" :style="'background-image: url('+ item.logo +');'"></view>
							<view class="shop-pic" v-else>
								<image src="../../static/mine/touxiang(1).jpeg" mode="widthFix"></image>
							</view>
							<view class="shop-name-con">
								<view class="shop-name" style="font-size: 30upx;font-weight: 600;">{{item.shop_name}}</view>
								<view class="shop-good-count" style="font-size: 22upx;color: #888;">{{item.business_scope}}</view>
							</view>
						</view>
						<view class="shop-btn">
							<text @tap="toShopMall(item.id)">进入店铺</text>
						</view>
					</view>
					<view class="shop-goods">
						<view class="goods-item" v-for="(good,index) in item.goods" :key="index" :data-goodsid="good.goods_id"
						 :data-shopid="item.id" @tap="toGoodsDetail">
							<image :src="good.original_img" mode="aspectFill"></image>
							<view class="goods-price">¥ {{good.shop_price}}</view>
						</view>
						<view style="width: 210upx;height: 210upx;" v-if="item.goods.length<3"></view>
					</view>
				</view>
				<view class="shops" v-for="(item,index) in 6" :key="index">
					<view class="shop-con-top">
						<view class="shop-msg">
							<view class="shop-pic">
								<image src="../../static/mine/touxiang(1).jpeg" mode="widthFix"></image>
							</view>
							<view class="shop-name-con">
								<view class="shop-name" style="font-size: 30upx;font-weight: 600;">店铺名称</view>
								<view class="shop-good-count" style="font-size: 22upx;color: #888;">经营范围</view>
							</view>
						</view>
						<view class="shop-btn">
							<text>进入店铺</text>
						</view>
					</view>
					<view class="shop-goods">
						<view class="goods-item" v-for="(good,index) in 3" :key="index">
							<image src="../../static/mine/touxiang(1).jpeg" mode="widthFix"></image>
							<view class="goods-price">¥ 25.00</view>
						</view>
					</view>
				</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: -1,
				scrollLeft: 0,
				swiperList: null,
				tabs: null,
				subTabs: [],
				localCity: '北京市',
				goods: null,
				cardCur: 0,
				subCurrent: 0,
				scrollTop: 0,
				coupons: [{
					money: 10,
					condition: 100
				}, {
					money: 5,
					condition: 50
				}, {
					money: 10,
					condition: 100
				}, {
					money: 2,
					condition: 10
				}, {
					money: 5,
					condition: 100
				}, {
					money: 20,
					condition: 300
				}, {
					money: 5,
					condition: 50
				}, {
					money: 2,
					condition: 10
				}],
				coupon_month: [],
				coupon_day: [],
				subTabsSelectIndex: -1,
				page: 1,
				stopLoad: false
			}
		},
		onLoad(options) {
			let _this = this
			console.log(options)
		},
		onShow() {
			//获取导航列表
			this.getTabs()
			//获取优品券列表
			// this.getCoupons()
			//获取轮播广告图
			this.getAd()
			this.stopLoad = false
			this.scrollTop = 0
			this.page = 1
			if (uni.getStorageSync('localCity')) {
				this.localCity = uni.getStorageSync('localCity')
				this.getList()
			} else {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						let latitude = res.latitude
						let longitude = res.longitude
						console.log('当前位置的经度：' + longitude + ',当前位置的纬度：' + latitude)
						console.log(this.mapKey)
						let mapKey = this.mapKey
						uni.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${mapKey}`,
							success: res => {
								console.log(res.data.result.ad_info.city)
								this.localCity = res.data.result.ad_info.city
								uni.setStorageSync('localCity', this.localCity)
								this.getList()
							}
						})
					},
					fail: (err) => {
						console.log(err)
						uni.navigateTo({
							url: "../location/location"
						})
					}
				});
			}

		},
		methods: {
			//领取优品券
			receiveCoupon(id) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/coupon/getCoupon',
					data: {
						token: uni.getStorageSync('token'),
						id: id
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.showToast({
								icon: "success",
								title: "领取成功"
							})
							this.getCoupons()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			toSearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			toClassifyPage(i) {
				uni.setStorageSync('classify', this.tabs[i])
				uni.navigateTo({
					url: "../classifyPage/classifyPage"
				})
			},
			//获取优品券列表
			// getCoupons() {
			// 	this.setheader()
			// 	uni.request({
			// 		url: this.websiteUrl + '/api/Coupon/indexCouponList',
			// 		data: {
			// 			token: uni.getStorageSync('token')
			// 		},
			// 		header: this.header,
			// 		success: (res) => {
			// 			console.log(res.data)
			// 			if (res.data.status == 0) {
			// 				this.coupon_month = res.data.data.coupon_month
			// 				this.coupon_day = res.data.data.coupon_day
			// 				this.coupons.push(...this.coupon_month)
			// 				this.coupons.push(...this.coupon_day)
			// 				console.log(this.coupons)
			// 				return
			// 			}
			// 			this.showToast(res.data.msg)
			// 		}
			// 	})
			// },
			getCoupons() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/index/indexCouponList',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.coupons = res.data.data
							console.log(this.coupons)
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			myScroll(e) {
				// console.log(e.detail.scrollTop)
				this.scrollTop = 1
			},
			//跳转轮播详情页面
			toDetail(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},
			
			checkMakeShop(url) {
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
							if (res.data.data) {
								uni.navigateTo({
									url: "../beShop/steps?status=" + res.data.data.status
								})
							} else {
								uni.navigateTo({
									url: url
								})
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			getPoints(url) {
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
							this.checkMakeShop(url)
							return
						}
						if (res.data.status == 1) {
							uni.navigateTo({
								url: "../wxLogin/wxLogin"
							})
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//获取广告轮播图
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
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			toGoodsDetail(shop_id, goods_id) {
				uni.navigateTo({
					url: "../goodsDetail/goodsDetail?id=" + goods_id + "&shop_id=" + shop_id
				})
			},
			//点击一级分类标题
			tabSelect(e) {
				this.scrollTop = 0
				this.stopLoad = false
				this.TabCur = e.currentTarget.dataset.index;
				this.page = 1
				console.log(this.TabCur)
				if (this.TabCur == -1) {
					this.subTabs = []
				} else {
					this.subTabs = this.tabs[this.TabCur].category
				}
				console.log(this.subTabs)
				this.scrollLeft = (e.currentTarget.dataset.index - 1) * 60
				this.subTabsSelectIndex = -1
			},
			//点击二级分类标题
			subTabsSelect(i) {
				this.subTabsSelectIndex = i
				uni.navigateTo({
					url: '../searchDetail/searchDetail?cat_id=' + this.subTabs[i].id
				})
			},
			//跳转城市定位
			toLocation() {
				uni.navigateTo({
					url: "../location/location?city=" + this.localCity
				})
			},
			getTabs() {
				uni.request({
					url: this.websiteUrl + "/api/Goods/categoryList",
					method: "POST",
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.tabs = res.data.data
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			getCity() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						let latitude = res.latitude
						let longitude = res.longitude
						console.log('当前位置的经度：' + longitude + ',当前位置的纬度：' + latitude)
						console.log(this.mapKey)
						let mapKey = this.mapKey
						uni.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${mapKey}`,
							success: res => {
								console.log(res.data.result.ad_info.city)
								this.localCity = res.data.result.ad_info.city
								uni.setStorageSync('localCity', this.localCity)
							}
						})
					},
					fail: (err) => {
						console.log(err)
						uni.navigateTo({
							url: "../location/location"
						})
					}
				});
			},
			getList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Index/index',
					data: {
						city: this.localCity,
						keywords: "",
						page: 1,
						type: 0
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.goods = res.data.data
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			loadMoreGoods() {
				if (this.stopLoad) {
					return
				}
				this.page++
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Index/index',
					data: {
						city: this.localCity,
						keywords: "",
						page: this.page,
						type: 0
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.length == 0) {
								this.stopLoad = true
								return
							}
							for (let i = 0; i < res.data.data.length; i++) {
								this.goods.push(res.data.data[i])
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
	.goodsList {
		display: flex;
		justify-content: space-between;
		margin: 30upx 30upx 0;
		flex-wrap: wrap;
	}

	.goods-item {
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		width: 335upx;
		margin-bottom: 30upx;
		background-color: #fff;
		border-radius: 10upx;
		overflow: hidden;
	}

	.goods-item .pic {
		width: 335upx;
		height: 335upx;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;

	}

	.goods-item .pic image {
		width: 100%;
		display: block;
	}

	.goods-item .con {
		padding: 10upx 20upx;
	}

	.goodsname {
		font-weight: 800;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.goods-price {
		position: absolute;
		bottom: 0;
		line-height: 40upx;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		width: 100%;
		letter-spacing: 1upx;
	}

	page {
		background-color: #F1F1F1;
	}

	.coupons {
		width: 180upx;
		text-align: center;
		border: 2upx solid #ccc;
		margin: 0 20upx;
	}

	.coupons-box {
		display: flex;
		background-color: #fff;
		padding: 20upx 30upx;
		justify-content: space-between;
	}

	.sub-item-icon {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto;
		box-shadow: 0 0 10upx 5upx #eee;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.nav .cu-item {
		line-height: 80upx;
		height: 80upx;
	}

	.ad-swiper {
		min-height: 120upx !important;
	}
	
	.search {
		/* background-image: linear-gradient(#0C90FF, #55AFFD); */
		background-color: #55AFFD;
		padding: 180upx 0 20upx;
		/* padding: 20upx 0; */
		position: relative;
		height: 270upx;
	}
	.city-box{
		position: absolute;
		bottom: 100upx;
		left: 30upx;
		display: flex;
		width: 60%;
		line-height: 60upx;
	}

	.search-box {
		height: 70upx;
		line-height: 70upx;
		background-color: #fff;
		border-radius: 35upx;
		margin: 0 30upx;
		display: flex;
		justify-content: space-between;
	}

	.search-l {
		display: flex;
		padding-left: 15upx;
	}

	.search-c {
		flex: 1;
		padding-left: 30upx;
	}

	.search-r {
		padding: 0 20upx;
		text-align: center;
		font-size: 34upx;
	}

	.text-pink {
		/* color: #FF4465 !important; */
		color: #E50D32 !important;
		position: relative;
	}

	.cu-item {
		text-align: center;
	}

	.shops {
		background-color: #fff;
		border-radius: 30upx;
		margin: 20upx 30upx;
		padding: 20upx;
		box-shadow: 0 0 10upx 2upx #eee;
	}

	.shops-scroll {
		position: fixed;
		bottom: 0;
		/* top: 190upx; */
		top: 350upx;
	}

	.shop-con-top {
		display: flex;
		justify-content: space-between;
	}

	.shop-msg {
		flex: 1;
		display: flex;
		justify-content: space-between;
	}

	.shop-btn>text {
		display: inline-block;
		line-height: 60upx;
		padding: 0 20upx;
		background-color: #FF4465;
		color: #fff;
		border-radius: 30upx;
		font-size: 26upx;
	}

	.shop-pic {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		overflow: hidden;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		box-shadow: 0 0 5upx 2upx #DDDDDD;
	}

	.shop-name-con {
		flex: 1;
		margin: 0 20upx;
		line-height: 40upx;
	}

	.shop-goods {
		display: flex;
		justify-content: space-between;
		margin-top: 20upx;
		flex-wrap: wrap;
	}

	.city {
		width: 100upx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 800;
		font-size: 30upx;
	}
	.city-txt{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 800;
		font-size: 34upx;
		padding:0 10upx;
	}
</style>
