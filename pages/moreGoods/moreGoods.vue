<template>
	<view>
		<view class="search">
			<view class="inputbox">
				<input type="text" v-model="keyWords" placeholder="请输入商品关键词" confirm-type="search" @focus="toSearch" />
				<text class="cuIcon-search text-gray" style="font-size: 34upx;padding:0 20upx;" @tap="getSearchList"></text>
			</view>
		</view>
		<view style="padding-top: 110upx;">
			<view class="null" v-if="goods.length==0">
				<image src="../../static/index/search-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无商品</view>
			</view>
			<view class="goodsList" v-else>
				<view class="goods-item" v-for="(item,index) in goods" :key="index" @tap="toDetail(item.goods_id)">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods: [],
				page: 1,
				stopLoad: false,
				type: null
			}
		},
		onLoad(options) {
			console.log(options)
			this.type = options.type
			this.getGoodsList()
		},
		methods: {
			toDetail(goods_id){
				uni.redirectTo({
					url: "../goodsDetail/goodsDetail?id=" + goods_id
				})
			},
			toSearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			//获取商品列表
			getGoodsList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsmore",
					data: {
						shop_id: uni.getStorageSync('shop_id')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if(this.type=="is_new"){
								this.goods = res.data.data.new_goods
							}else if(this.type=="is_hot"){
								this.goods = res.data.data.hot_goods
							}else if(this.type=="is_recommend"){
								this.goods = res.data.data.recommend_goods
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//加载更多商品
			loadMoreGoods() {
				if (this.stopLoad) {
					return
				}
				this.page++
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						page: this.page,
						offset: 6,
						field: this.type,
						shop_id: uni.getStorageSync('shop_id')
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
						}
					}
				})
			}
		},
		//页面触底加载更多精选商品
		// onReachBottom() {
		// 	this.loadMoreGoods()
		// }
	}
</script>

<style>
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
	page{
		background-color: #f5f5f5;
	}
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
		padding-left: 30upx;
	}

	.font {
		font-size: 24upx;
	}
	.goods-msg {
		padding: 20upx 20upx 30upx;
	}
	.goodsList {
		display: flex;
		justify-content: space-between;
		padding: 60upx 30upx 0;
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
</style>
