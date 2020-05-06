<template>
	<view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<swiper style="height: 750upx;" class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true"
			 interval="5000" duration="500" indicator-active-color="#F82F25" @tap="previewImg">
				<swiper-item>
					<image :src="goodsDetail.pgoods_image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>	
			<view class="goods_info">
				<view class="info">
					<view class="">
						<view class="goodsname">{{goodsDetail.pgoods_name}}</view>
						<view class="remark" v-if="goodsDetail.pgoods_description">{{goodsDetail.pgoods_description}}</view>
						<view class="remark" v-else></view>
					</view>
					<view class="jifen">
						<view>上优品:{{goodsDetail.pgoods_points}}</view>
						<view>上优品:{{goodsDetail.pgoods_points*2}}</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;line-height: 50upx;">
					<view class="sales">销量：{{goodsDetail.pgoods_salenum}}</view>
					<view class="store">库存：{{goodsDetail.pgoods_storage}}</view>
				</view>
			</view>
			<view style="margin: 0 30upx 120upx;">
				<view class="good-nav">
					<view><text :class="currentItem==0?'under':''" @tap="chooseOption(0)">商品详情</text></view>
					<view><text :class="currentItem==1?'under':''" @tap="chooseOption(1)">商品参数</text></view>
				</view>
				<swiper duration="300" :current="currentItem" :style="'height:'+swiperHeight+'px'">
					<swiper-item>
						<scroll-view scroll-y class="swiper-item" style="height: 100%;">
							<rich-text :nodes="goodsDetail.pgoods_body"></rich-text>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view scroll-y class="swiper-item" style="height: 100%;">
							<view style="text-align: center;">暂无商品参数</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<bottom-btn :txt="'立即兑换'" @tap="toConfirmExchangeOrder"></bottom-btn>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.imgUrl,
				isLoaing: true,
				goodsId: '',
				currentItem: 0,
				currentIndex: 0,
				goodsDetail: null,
				swiperHeight: 0
			}
		},
		onLoad(options) {
			this.goodsId = options.id
			this.getGoodsDetail()
			this.getSwiperHeight()
		},
		methods: {
			//预览图片
			previewImg() {
				console.log('预览图片')
				let urls = this.goodsDetail.wheel_img.map(item => item.image_url)
				uni.previewImage({
					urls: urls,
					indicator: 'number',
					loop: true
				});
			},
			chooseOption(index) {
				this.currentItem = index
			},
			toConfirmExchangeOrder() {
				uni.setStorageSync('exchangeOrder', this.goodsDetail)
				uni.navigateTo({
					url: "../confirmExchangeOrder/confirmExchangeOrder"
				})
			},
			//获取商品详情信息
			getGoodsDetail() {
				uni.request({
					url: this.websiteUrl + "/api/Goods/scoreGoodsInfo",
					data: {
						goods_id: this.goodsId,
						shop_id: uni.getStorageSync('shop_id'),
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.goodsDetail = res.data.data
							if (this.goodsDetail.pgoods_body == '') {
								this.goodsDetail.pgoods_body = "<p style='text-align:center'>暂无商品详情</p>"
							} else {
								this.goodsDetail.pgoods_body = this.goodsDetail.pgoods_body.replace(/<img /g,
									"<img style='width:100%;display:block' ")
								this.goodsDetail.pgoods_body = this.goodsDetail.pgoods_body.replace(/\/public\/upload\/goods/g,this.imgUrl+"/public/upload/goods/")
							}
							this.isLoaing = false
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//获取商品介绍swiper的高度
			getSwiperHeight() {
				uni.getSystemInfo({
					success: (res) => {
						console.log(res)
						this.swiperHeight = res.screenHeight - 190
					}
				})
			}
		}
	}
</script>

<style>
	.goods_info {
		padding: 30upx 40upx;
	}

	.goodsname {
		margin-right: 30upx;
		font-weight: 600;
	}

	.goods_info .info {
		display: flex;
		justify-content: space-between;
	}

	.info>view {
		line-height: 40upx;
	}

	.goods_info .price {
		color: red;
		font-weight: 600;
		font-size: 32upx;
		line-height: 50upx;
	}

	.jifen>view:nth-child(1) {
		color: red;
		font-weight: 600;
		font-size: 28upx;
		white-space: nowrap;
	}

	.jifen>view:nth-child(2) {
		color: #aaa;
		text-decoration: line-through;
		text-align: right;
		font-size: 24upx;
	}

	.sales,
	.store {
		color: #888;
		font-size: 24upx;
	}

	.good-nav {
		display: flex;
		justify-content: space-between;
		border-bottom: 2upx solid #F0F0F0;
		margin-bottom: 30upx;
	}

	.good-nav>view {
		width: 50%;
		text-align: center;
	}

	.good-nav>view text {
		display: inline-block;
		line-height: 60upx;
		position: relative;
	}

	.under {
		box-shadow: 0 -6upx 0 #F7756A inset;
	}

	.exchange {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 100upx;
		line-height: 100upx;
		background-color: #F23027;
		font-size: 28upx;
		text-align: center;
		color: #fff;
	}
	.attr_box {
		box-shadow: 0 3upx 8upx rgba(0, 0, 0, 0.1);
		padding: 20upx 30upx;
		border-radius: 20upx;
		margin: 10upx;
	}
	
	.attr_item {
		line-height: 40upx;
		padding: 15upx 0;
		border-bottom: 1upx solid #F5F5F5;
	}
</style>
