<template>
	<view>
		<view class="title">
			<view :class="currentIndex==index?'under':''" @tap="chooseOptions(index)" v-for="(item,index) in navs" :key="index">{{item}}</view>
		</view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view class="order-box" v-else>
			<view class="null" v-if="isNull">
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无相关订单</view>
			</view>
			<view v-else>
				<view class="list" v-for="(item,index) in orders" :key="index" @tap="toOrderDetail(item.point_orderid)">
					<view class="orderno">
						<view class="">订单号:{{item.point_outsn}}</view>
						<view class="status" v-if="item.point_orderstate==1">待发货</view>
						<view class="status" v-if="item.point_orderstate==2">待收货</view>
						<view class="status" v-if="item.point_orderstate==3">已完成</view>
					</view>
					<view class="item-box">
						<view class="item" v-for="(good,index) in item.order_goods" :key="index">
							<view class="pic">
								<image :src="good.pgoods_image" mode="widthFix"></image>
							</view>
							<view class="con">
								<view class="name">
									<view class="des">{{good.pgoods_name}}</view>
									<view style="white-space: nowrap;">上优品:{{good.pgoods_points}}</view>
								</view>
								<view class="txt">
									<view class="remark" v-if="good.pgoods_description">{{good.pgoods_description}}</view>
									<view class="remark" v-else></view>
								</view>
							</view>
						</view>
					</view>
					<view class="item-bottom">
						<view class="total-msg">
							<text style="margin-right: 20upx;">总计{{item.point_num}}件</text>
							<text>总上优品<text style="color: red;margin-left: 20upx;">{{item.point_allpoint}}</text></text>
						</view>
						<!-- <view class="bottom-btns" v-if="item.status==1">
							<button class="cu-btn round line-red">提醒发货</button>
						</view> -->
						<view class="bottom-btns" v-if="item.status==2">
							<button class="cu-btn round line-888">查看物流</button>
							<button class="cu-btn round line-red" style="margin-left: 30upx;" @tap.stop="showModel(index)">确认收货</button>
						</view>
						<!-- <view class="bottom-btns" v-if="item.status==3">
							<button class="cu-btn round line-888">删除订单</button>
						</view> -->
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modelName=='takeModel'?'show':''">
				<view class="cu-dialog box">
					<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
					<view style="margin-bottom: 40upx;">确认收货吗?</view>
					<view class="btns">
						<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
						<button class="cu-btn round bg-red shadow" @tap="sureTake">确认</button>
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
				isLoaing: true,
				navs: ['待发货', '已完成'],
				currentIndex: 0,
				orders: [],
				page: 1,
				isNull: false,
				type: 1,
				stopLoad: false,
				takeIndex: -1,
				modelName: ''
			}
		},
		onLoad() {
			this.getOrderList(this.type)
		},
		methods: {
			showModel(index) {
				this.takeIndex = index
				this.modelName = 'takeModel'
			},
			closeModel() {
				this.modelName = ''
			},
			//确认收货
			sureTake() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/receiveScoreGoods",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						order_id: this.orders[this.takeIndex].point_orderid
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.closeModel()
						if (res.data.msg == '操作成功') {
							this.orders.splice(this.takeIndex, 1)
							uni.showToast({
								title: '已确认收货',
								icon: 'success'
							})
							this.isNull = this.stopLoad = false
							this.page = 1
							this.getOrderList()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			chooseOptions(index) {
				this.page = 1
				this.currentIndex = index
				this.isLoaing = true
				this.isNull = this.stopLoad = false
				switch (index) {
					case 0:
					this.type = 1
						break;
					case 1:
					this.type = 3
						break;
					default:
						break;
				}
				this.getOrderList()
			},
			//获取订单列表
			getOrderList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/scoreOrderList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						type: this.type,
						page: 1,
						offset: 6
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.orders = res.data.data.data
							this.isLoaing = false
							if (this.orders.length == 0) {
								this.isNull = true
							}
						}
					}
				})
			},
			loadMore() {
				if (this.stopLoad) {
					return
				}
				this.page++
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/scoreOrderList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						type: this.type,
						page: this.page,
						offset: 6
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.data.length == 0) {
								this.stopLoad = true
								return
							}
							for (var i = 0; i < res.data.data.data.length; i++) {
								this.orders.push(res.data.data.data[i])
							}
						}
					}
				})
			},
			//跳转查看订单详情
			toOrderDetail(orderid) {
				uni.navigateTo({
					url: "../exchangeOrderDetail/exchangeOrderDetail?orderid=" + orderid
				})
			}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style>
	.title {
		display: flex;
		justify-content: space-around;
		padding: 20upx 50upx;
		position: fixed;
		width: 100%;
		top: 0;
		background-color: #fff;
		z-index: 100;
	}

	.title>view {
		position: relative;
		height: 50upx;
		line-height: 50upx;
		padding: 0 10upx;
	}

	.under {
		color: red;
		font-weight: 600;
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

	.order-box {
		margin: 100upx 0 120upx;
	}

	.bottom {
		position: fixed;
		width: 100%;
		border: 1upx solid red;
		display: flex;
		bottom: 0;
	}

	.bottom>view {
		width: 50%;
		line-height: 90upx;
		height: 90upx;
		text-align: center;
	}

	.list {
		margin: 20upx 30upx 40upx;
		padding: 20upx 0;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
	}

	.orderno {
		padding: 0 30upx;
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}

	.status {
		color: red;
		font-weight: 600;
	}

	.item-bottom {
		padding: 30upx;
		border-top: 1upx solid #f1f1f1;
	}

	.bottom-btns {
		display: flex;
		justify-content: flex-end;
		margin-top: 30upx;
	}

	.bottom-btns button {
		height: 50upx;
		line-height: 50upx;
		font-size: 24upx;
		width: 180upx;
		padding: 0;
	}

	.total-msg text {
		font-size: 26upx;
	}

	.line-888 {
		color: #888;
	}

	.item-box {
		padding: 20upx 0;
	}

	.item {
		padding: 15upx 30upx;
		display: flex;
	}

	.item .pic {
		width: 140upx;
		height: 140upx;
		overflow: hidden;
		border-radius: 20upx;
		box-shadow: 0 0 10upx 2upx #eee;
	}

	.item .pic image {
		width: 100%;
		display: block;
	}

	.item .con {
		flex: 1;
		margin-left: 20upx;
		padding-top: 20upx;
		position: relative;
	}

	.con .name,
	.con .txt {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}

	.txt {
		border-bottom: 1upx solid #f5f5f5;
		padding-bottom: 10upx;
		line-height: 40upx;
	}

	.remark {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		color: #888;
		font-size: 22upx;
		margin-right: 100upx;
	}

	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 28upx;
		margin-right: 20upx;
	}

	.null {
		width: 250upx;
		margin: 320upx auto;
	}

	.null image {
		width: 100%;
	}

	.box {
		width: 70%;
		padding: 40upx 30upx 30upx;
	}
</style>
