<template>
	<view class="">
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="search">
				<view class="inputbox">
					<input type="text" v-model="keyWords" placeholder="请输入商品关键词" confirm-type="search" @focus="toSearch" />
					<text class="cuIcon-search text-gray" style="font-size: 34upx;padding:0 20upx;" @tap="getSearchList"></text>
				</view>
			</view>
			<view class="bgPic" style="margin-top: 110upx;">
				<swiper class="screen-swiper ad-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
				 duration="500">
					<swiper-item v-for="(item,index) in goodsList.banner" :key="index" @tap="toDetail(item.goods_id)" :style="'background-image: url('+item.banner_img+');background-size: cover;background-position: center;background-repeat: no-repeat;'">
					</swiper-item>
				</swiper>
			</view>
			<!-- 一级分类列表 -->
			<scroll-view v-if="tabs.length!=0" style="background-color: #fff;" scroll-x class="nav">
				<view style="display: inline-block;text-align: center;width: 20%;padding: 20upx 0;" v-for="(item,index) in tabs"
				 :key="index" @tap="toClassifyPage(index)">
					<view class="sub-item-icon" :style="'background-image: url('+item.image+');'"></view>
					<view style="margin-top: 10upx;font-size: 22upx;color: #aaa;">{{item.name}}</view>
				</view>
			</scroll-view>
			<view class="newGoods-box" v-if="goodsList.new_goods.length!=0">
				<view class="title">
					<view class="txt">
						<image src="../../static/index/new.png" mode="widthFix"></image>
						新品首发
					</view>
					<text class="more" style="display: flex;color: #aaa;" @tap="more('is_new')">
						查看更多<text class="lg text-gray cuIcon-right"></text>
					</text>
				</view>
				<view class="goodsList">
					<view class="goods-item" v-for="(item,index) in goodsList.new_goods" :key="index" @tap="toDetail(item.goods_id)">
						<view class="pic" :style="'background-image: url('+item.original_img+');'"></view>
						<view class="con">
							<view class="goodsname">{{item.goods_name}}</view>
							<view style="letter-spacing: 2upx;font-size: 28upx;padding: 10upx 0;">¥ {{item.price}}</view>
							<view style="font-size: 24upx;color: #959595;">销量：<text style="letter-spacing: 2upx;">{{item.sum}}</text>件</view>
						</view>
						<image class="tip" src="../../static/index/tip.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="newGoods-box" v-if="goodsList.hot_goods.length!=0">
				<view class="title">
					<view class="txt">
						<image src="../../static/index/hot.png" mode="widthFix"></image>
						热销榜单
					</view>
					<text class="more" style="display: flex;color: #aaa;" @tap="more('is_hot')">
						查看更多<text class="lg text-gray cuIcon-right"></text>
					</text>
				</view>
				<view class="goodsList">
					<view class="goods-item" v-for="(item,index) in goodsList.hot_goods" :key="index" @tap="toDetail(item.goods_id)">
						<view class="pic" :style="'background-image: url('+item.original_img+');'"></view>
						<view class="con">
							<view class="goodsname">{{item.goods_name}}</view>
							<view style="letter-spacing: 2upx;font-size: 28upx;padding: 10upx 0;">¥ {{item.price}}</view>
							<view style="font-size: 24upx;color: #959595;">销量：<text style="letter-spacing: 2upx;">{{item.sum}}</text>件</view>
						</view>
						<image class="tip" src="../../static/index/tip.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="newGoods-box" v-if="goodsList.recommend_goods.length!=0">
				<view class="title">
					<view class="txt">
						<image src="../../static/index/star.png" mode="widthFix"></image>
						店家推荐
					</view>
					<text class="more" style="display: flex;color: #aaa;" @tap="more('is_recommend')">
						查看更多<text class="lg text-gray cuIcon-right"></text>
					</text>
				</view>
				<view class="goodsList">
					<view class="goods-item" v-for="(item,index) in goodsList.recommend_goods" :key="index" @tap="toDetail(item.goods_id)">
						<view class="pic" :style="'background-image: url('+item.original_img+');'"></view>
						<view class="con">
							<view class="goodsname">{{item.goods_name}}</view>
							<view style="letter-spacing: 2upx;font-size: 28upx;padding: 10upx 0;">¥ {{item.price}}</view>
							<view style="font-size: 24upx;color: #959595;">销量：<text style="letter-spacing: 2upx;">{{item.sum}}</text>件</view>
						</view>
						<image class="tip" src="../../static/index/tip.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="null" v-if="goodsList.new_goods.length==0&&goodsList.hot_goods.length==0&&goodsList.recommend_goods.length==0">
				<image src="../../static/index/search-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">该门店暂无商品展示</view>
			</view>
			<view class="cu-modal" :class="modelName=='tipModel'?'show':''">
				<view class="cu-dialog phone-box">
					<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
					<view style="font-size: 36upx;font-weight: 600;">温馨提示</view>
					<view style="margin: 30upx 0 40upx;">确定要成为该店的会员吗？</view>
					<view class="btns">
						<button class="cu-btn round bg-red shadow" @tap="closeModel">我不需要</button>
						<button class="cu-btn round bg-red shadow" @tap="sureBind">确定</button>
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
				codeQuery: null, //二维码参数
				isLoaing: true,
				goodsList: null,
				page: 1,
				recommendGoods: null,
				stopLoad: false,
				shop_name: '我的小店',
				alreadyReq: false,
				storeList: null,
				modelName: '',
				hasAnimate: false,
				message: 0,
				stores: null,
				stopLoadShops: false,
				shopPage: 1,
				otherShopGoods: null,
				TabCur: -1,
				scrollLeft: 0,
				tabs: null
			};
		},
		onLoad(options) {
			console.log(options)
			console.log(options.scene)
			//分享商品进入页面
			if (options.goods_id) {
				uni.setStorageSync('shop_id', options.shop_id)
				uni.navigateTo({
					url: "../goodsDetail/goodsDetail?id=" + options.goods_id + "&user_id=" + options.user_id + "&shop_id=" + options
						.shop_id
				})
			}
			//扫分享二维码进入页面
			if (options.scene) {
				this.codeQuery = options.scene
				uni.setStorageSync('shop_id', this.codeQuery.split('_')[1])
				// this.codeQuery = '1872802_77370' //模拟分享二维码取到的参数
				this.modelName = "tipModel"
			}
			//获取主页商品列表
			this.getGoodsList()
		},
		onShow() {
			//获取导航列表
			// this.getTabs()
		},
		methods: {
			toClassifyPage(i) {
				return
				uni.setStorageSync('classify', this.tabs[i])
				uni.navigateTo({
					url: "../classifyPage/classifyPage"
				})
			},
			// getTabs() {
			// 	uni.request({
			// 		url: this.websiteUrl + "/api/Goods/categoryList",
			// 		method: "POST",
			// 		success: (res) => {
			// 			console.log(res.data)
			// 			if (res.data.status == 0) {
			// 				this.tabs = res.data.data
			// 				return
			// 			}
			// 			this.showToast(res.data.msg)
			// 		},
			// 		fail: () => {
			// 			this.showToast('系统繁忙，请稍后重试！')
			// 		}
			// 	})
			// },
			closeModel() {
				this.modelName = ""
			},
			sureBind() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/getScore',
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 1) {
							//session过期或未授权登录
							uni.navigateTo({
								url: "../wxLogin/wxLogin?codeQuery=" + this.codeQuery + '&fromView=newPerson'
							})
							return
						}
						//未过期直接绑定店铺
						this.bindShop()
					}
				})
			},
			bindShop() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/bindShop',
					data: {
						token: uni.getStorageSync('token'),
						user_id: this.codeQuery.split('_')[0],
						shop_id: this.codeQuery.split('_')[1]
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.showToast(res.data.msg)
					}
				})
				this.closeModel()
			},
			//查看更多商品
			more(str) {
				uni.navigateTo({
					url: '../moreGoods/moreGoods?type=' + str
				})
			},
			//跳转商品详情页面
			toDetail(id) {
				uni.navigateTo({
					url: "../../pages/goodsDetail/goodsDetail?id=" + id
				})
			},
			//跳转搜索页面
			toSearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			//跳转设置页面
			toSettings() {
				uni.navigateTo({
					url: "../settings/settings"
				})
			},
			//获取主页商品列表
			getGoodsList() {
				console.log()
				this.setheader(uni.getStorageSync('shop_id'))
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsIndex",
					data: {
						shop_id: uni.getStorageSync('shop_id')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.goodsList = res.data.data
							if (this.goodsList.shop_name) {
								this.shop_name = this.goodsList.shop_name
								this.tabs = this.goodsList.type_list
								uni.setNavigationBarTitle({
									title: "店铺：" + this.shop_name
								})
							}
							this.isLoaing = false
						}
					}
				})
			}
		}
	}
</script>

<style>
	.search {
		padding: 20upx 30upx;
		display: flex;
		justify-content: space-between;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		top: 0;
		background-color: #55AFFD;
		z-index: 100;
	}

	.inputbox {
		flex: 1;
		display: flex;
		height: 70upx;
		line-height: 70upx;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 35upx;
	}

	.inputbox input {
		height: 70upx;
		line-height: 70upx;
		flex: 1;
		padding: 0 30upx;
	}

	.goodsList {
		display: flex;
		justify-content: space-between;
		margin: 60upx 30upx 0;
		flex-wrap: wrap;
	}

	.goods-item {
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		width: 48%;
		margin-bottom: 60upx;
		padding-bottom: 20upx;
		position: relative;
		background-color: #fff;
	}

	.tip {
		position: absolute;
		width: 20upx;
		bottom: 26upx;
		right: 30upx;
	}

	.goods-item .pic {
		width: 270upx;
		height: 270upx;
		border-radius: 20upx;
		overflow: hidden;
		position: relative;
		top: -30upx;
		margin: 0 auto;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		box-shadow: 0 0 10upx 5upx #eee;
		background-color: #fff;
	}

	.goods-item .pic image {
		width: 100%;
		display: block;
	}

	.goods-item .con view {
		width: 270upx;
		margin: 0 auto;
		position: relative;
		top: -5upx;
	}

	.goodsname {
		font-weight: 600;
		font-size: 30upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.card-header,
	.storeItem {
		display: flex;
		justify-content: space-around
	}

	.card-header {
		padding: 20upx 0;
	}

	.card-header>view {
		line-height: 60upx;
		background-color: #F7D5D5;
		border-radius: 30upx;
		width: 160upx;
		text-align: center;
		font-weight: 600;
	}

	.storeItem>view {
		width: 160upx;
		text-align: center;
		line-height: 40upx;
		padding: 10upx 0;
	}

	.scroll {
		height: 360upx;
	}

	.swiper {
		height: 400upx;
	}

	image {
		width: 100%;
		display: block;
	}

	.iconxiaoxi {
		font-size: 44upx;
	}

	.iconshezhi {
		font-size: 36upx;
	}


	.title {
		display: flex;
		justify-content: space-between;
		padding: 0 15upx;
		line-height: 80upx;
		background-color: #f5f5f5;
		margin-bottom: 2upx;
	}

	.title .txt {
		font-size: 36upx;
		font-weight: 800;
		position: relative;
		padding-left: 70upx;
	}
	.title .txt image{
		width: 60upx;
		height: 60upx;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}



	.newGoods {
		display: flex;
		justify-content: space-between;
		margin: 10upx 30upx;
		padding: 30upx 20upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
	}


	.icon {
		width: 60upx;
		height: 60upx;
		padding: 10upx;
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
	}

	.icon image {
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
	}


	.hot-name {
		font-size: 30upx;
		margin: 0 20upx;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #1b1c20;
		font-weight: 600;
	}

	.font {
		font-size: 24upx;
		color: #a69198;
	}
	.phone-box {
		padding: 30upx 30upx 40upx;
	}

	.animate {
		top: 0;
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

	.null {
		position: relative;
		top: 100upx;
		width: 250upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.null image {
		width: 100%;
		display: block;
	}
</style>
