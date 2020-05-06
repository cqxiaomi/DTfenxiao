<template>
	<view>
		<view class="box">
			<view class="title">
				<image src="../../static/mall/brand.png" mode="widthFix"></image>
				<view class="title-con">
					<text style="font-size: 32upx;font-weight: 600;">品牌精选</text>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stopLoad: false,
				page: 1,
				goods: []
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			toGoodsDetail(id) {
				uni.navigateTo({
					url: "../integralGoodsDetail/integralGoodsDetail?id=" + id
				})
			},
			getGoodsList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/goods/integralMall',
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
							this.goods = res.data.data.goods
							return
						}
						this.showToast(res.data.msg)
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
					url: this.websiteUrl + '/api/goods/integralMall',
					data: {
						token: uni.getStorageSync('token'),
						type:0,
						page: this.page,
						offset: 10
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.goods.length == 0) {
								this.stopLoad = true
								return
							}
							for (var i = 0; i < res.data.data.goods.length; i++) {
								this.goods.push(res.data.data.goods[i])
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
			}
		},
		//页面触底加载更多精选商品
		onReachBottom() {
			this.loadMore()
		},
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
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
</style>
