<template>
	<view>
		<view class="title">
			<view :class="currentIndex==0?'under':''" @tap="chooseOptions(0)">订单消息</view>
			<view :class="currentIndex==1?'under':''" @tap="chooseOptions(1)">通知消息</view>
		</view>

		<view class="swiper-con" style="margin-top: 80upx;">
			<view class="null" v-if="isNull">
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无消息</view>
			</view>
			<view v-else>
				<view class="swiper-item" v-if="currentIndex==0">
					<view class="orderlist">
						<view class="order" v-for="(item,index) in orderList" :key="index" @tap="toOrderDetail(item.order_id)">
							<view class="checkbox">
								<view class="status">
									<text style="color: red;">{{item.content}}</text>
									<text class="lg text-gray cuIcon-right"></text>
								</view>
							</view>
							<view class="order-con">
								<view style="display: flex;margin:10upx 0" v-for="(goods,index) in item.goods" :key="index">
									<view class="pic">
										<image :src="goods.original_img" mode="widthFix"></image>
									</view>
									<view class="goods">
										<view class="goods_name">{{goods.goods_name}}</view>
										<view class="goods_remark">{{goods.goods_remark}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="swiper-item" v-if="currentIndex==1">
					<view class="list">
						<view class="item" v-for="(item,index) in news" :key="index">
							<view style="font-size: 28upx;color: #666;">{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="bottom1">
			<view style="color: red;background-color: #fff;">全选</view>
			<view style="color: #fff;background-color: red;">删除</view>
		</view> -->
		<!-- <bottom-btn :txt="'编辑'"></bottom-btn> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				news: [],
				swiperHeight: 0,
				orderList: [],
				page: 1,
				flag: false,
				isNull: false
			}
		},
		onLoad() {
			this.getOrderMessages()
		},
		methods: {
			chooseOptions(index) {
				this.page = 1
				this.flag = false
				this.currentIndex = index
				if (this.currentIndex == 0) {
					this.getOrderMessages()
				} else {
					this.getSystemMessage()
				}
			},
			toOrderDetail(orderid) {
				uni.navigateTo({
					url: "../orderDetail/orderDetail?orderid=" + orderid
				})
			},
			getOrderMessages() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Message/messageOrder",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: 'POST',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.length == 0) {
								this.isNull = true
								return
							}
							this.orderList = res.data.data
							for (let i = 0; i < this.orderList.length; i++) {
								if (this.orderList[i].is_read == 2) {
									this.changeReadStatus(this.orderList[i].id)
								}
							}
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			getSystemMessage() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Message/messageSystem",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: 'POST',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.length == 0) {
								this.isNull = true
								return
							}
							this.news = res.data.data
							for (let i = 0; i < this.news.length; i++) {
								if (this.news[i].is_read == 2) {
									this.changeReadStatus(this.news[i].id)
								}
							}
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			changeReadStatus(id) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Message/alreadyRead",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						id: id,
						type: this.currentIndex == 0 ? 1 : 2
					},
					method: 'POST',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.news = res.data.data
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			loadmore() {
				if (this.flag) {
					return
				}
				this.page++
				this.setheader()
				let url
				if (this.currentIndex == 0) {
					url = this.websiteUrl + "/api/Message/messageOrder"
				} else {
					url = this.websiteUrl + "/api/Message/messageSystem"
				}
				uni.request({
					url: url,
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						page: this.page
					},
					method: 'POST',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.length == 0) {
								this.flag = true
								return
							}
							for (let i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].is_read == 2) {
									this.changeReadStatus(res.data.data[i].id)
								}
							}
							this.orderList.concat(res.data.data)
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			}
		},
		onReachBottom() {
			this.loadmore()
		}
	}
</script>

<style>
	.null {
		width: 250upx;
		margin: 320upx auto;
	}

	.null image {
		width: 100%;
	}

	.title {
		display: flex;
		justify-content: space-around;
		padding: 10upx 0;
		position: fixed;
		width: 100%;
		top: 0;
		background-color: #fff;
		z-index: 100;
	}

	.title>view {
		line-height: 50upx;
		height: 50upx;
		padding: 0 10upx;
	}

	.under {
		color: red;
		font-weight: 800;
		position: relative;
	}

	.under::after {
		content: "";
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		height: 6upx;
		border-radius: 3upx;
		background-color: #F7756A;
	}

	.time-title {
		width: 240upx;
		line-height: 50upx;
		letter-spacing: 2upx;
		text-align: center;
		border-radius: 10upx;
		font-size: 22upx;
		background-color: #f1f1f1;
		margin: 0 auto;
	}

	.item {
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		margin: 30upx;
		border-radius: 20upx;
		padding: 20upx 30upx;
		line-height: 50upx;
	}

	.order {
		margin: 0 30upx 40upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
	}

	.checkbox {
		/* display: flex;
		justify-content: space-between; */
		line-height: 60upx;
		padding: 10upx 30upx 0;
		border-bottom: 1upx solid #f1f1f1;
	}

	.order-con {
		padding: 20upx 30upx;
	}

	.order-con .pic {
		width: 100upx;
		height: 100upx;
		overflow: hidden;
		border-radius: 10upx;
	}

	.order-con .pic image {
		width: 100%;
		display: block;
	}

	.order-con .goods {
		flex: 1;
		margin-left: 20upx;
		line-height: 40upx;
		position: relative;
	}

	.bottom1 {
		position: fixed;
		width: 100%;
		border: 1upx solid red;
		display: flex;
		bottom: 100upx;
	}

	.bottom1>view {
		width: 50%;
		line-height: 90upx;
		height: 90upx;
		text-align: center;
	}

	.swiper-item {
		padding-bottom: 100upx;
	}

	.goods_name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.goods_remark {
		font-size: 24upx;
		color: #888;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>
