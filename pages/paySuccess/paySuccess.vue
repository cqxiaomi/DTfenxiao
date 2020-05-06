<template>
	<view>
		<view class="pic">
			<image src="../../static/index/bg01.png" mode="widthFix"></image>
			<view class="title" v-if="type==1">支付成功</view>
			<view class="title" v-if="type==2">兑换成功</view>
			<view class="btn-box">
				<button class="cu-btn round line-red shadow" @tap="toShop" v-if="shop_id!=1">返回店铺</button>
				<button class="cu-btn round line-red shadow" @tap="toOrderDetail">查看订单</button>
			</view>
		</view>
		<view class="recommend" style="line-height: 80upx;margin: 0 30upx;" v-if="goods.length!=0">推荐商品</view>
		<view class="goodsList" v-if="goods.length!=0">
			<view class="goods-item" v-for="(item,index) in goods" :key="index" @tap="toOtherGoods(item.goods_id,item.shop_id)">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:[],
				page:1,
				stopLoad:false,
				type:0,
				orderid:null,
				shop_id:null
			}
		},
		onLoad(options) {
			this.shop_id = uni.getStorageSync('shop_id')
			this.type = options.type
			this.getOtherGoods()
			this.orderid = options.orderid
		},
		methods: {
			toShop(){
				uni.redirectTo({
					url:'../index/index'
				})
			},
			toOrderDetail(){
				if(this.type==1){
					uni.redirectTo({
						url: "../orderDetail/orderDetail?orderid=" + this.orderid
					})
				}else if(this.type==2){
					uni.redirectTo({
						url: "../exchangeOrderDetail/exchangeOrderDetail?orderid=" + this.orderid
					})
				}
			},
			getOtherGoods() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Goods/othergoods',
					data: {
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.goods = res.data.data
							return
						}
						this.showToast(res.data.data)
					}
				})
			},
			toOtherGoods(goods_id, shop_id) {
				uni.redirectTo({
					url: "../goodsDetail/goodsDetail?id=" + goods_id + "&shop_id=" + shop_id
				})
			}
		}
	}
</script>
	
<style>	
	.pic{
		text-align: center;
		margin: 40upx auto;
		position: relative;
		width: 690upx;
	}
	.pic image{
		width: 100%;
		display: block;
	}
	.pic .title{
		position: absolute;
		top: 50upx;
		width: 100%;
		color: #fff;
		letter-spacing: 2upx;
	}
	.btn-box{
		position: absolute;
		bottom: 80upx;
		width: 100%;
	}
	.btn-box button{
		background-color: #fff !important;
		font-size: 24upx;
		margin: 0 20upx;
		width: 180upx;
		padding: 0;
		height: 50upx;
		line-height: 50upx;
	}
	.goodsList {
		display: flex;
		justify-content: space-between;
		margin: 0 30upx;
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
		margin: 0;
	}
	
	.goods-item .pic image {
		width: 100%;
		display: block;
	}
	.goods-item .con{
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
</style>
