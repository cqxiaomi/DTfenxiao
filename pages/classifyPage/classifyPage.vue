<template>
	<view>
		<view class="search">
			<view class="inputbox">
				<input type="text" v-model="keywords" placeholder="请输入商品关键词" confirm-type="search" @focus="toShop" />
				<text class="cuIcon-search text-gray" style="font-size: 34upx;padding:0 20upx;"></text>
			</view>
		</view>
		<scroll-view style="background-color: #fff; white-space: nowrap;" scroll-x class="scroll">
			<view class="scroll-item" :class="item.id==currentCategoryId?'checked':''" v-for="(item,index) in classify.category"
			 :key="index" @tap="chooseCategory(item.id)">
				<view class="sub-item-icon" :style="'background-image: url('+item.image+');'"></view>
				<view :class="item.id==currentCategoryId?'checked':''" style="margin-top: 10upx;font-size: 22upx;color: #aaa;">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="goodsList" v-if="goods.length!=0">
			<view class="goods-item" v-for="(item,index) in goods" :key="index" @tap="toDetail(item.goods_id,item.shop_id)">
				<view class="pic" :style="'background-image: url('+item.original_img+');'">
					<view class="ziying" v-if="item.shop_id==1">平台直营</view>
				</view>
				<view class="con">
					<view class="goodsname">{{item.goods_name}}</view>
					<view style="display: flex;justify-content: space-between;line-height: 40upx;">
						<view style="color: red;">¥ {{item.shop_price}}</view>
						<view style="font-size: 22upx;color: #aaa;">销量：<text>{{item.sales_volume}}</text>件</view>
					</view>
					<view style="display: flex;padding: 5upx 0;">
						<view class="shoplogo" v-if="item.logo" :style="'background-image: url('+item.logo+');'"></view>
						<view class="shoplogo" v-else>
							<image src="../../static/mine/touxiang(1).jpeg" mode="widthFix"></image>
						</view>
						<view class="shopname">{{item.shop_name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="null" v-else>
			<image src="../../static/index/store-null.png" mode="widthFix"></image>
			<view class="">暂无此类商品</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classify: null,
				currentCategoryId: null,
				goods: [],
				keywords:"",
				stopLoad:false,
				page:1
			}
		},
		onShow() {
			this.classify = uni.getStorageSync('classify')
			this.currentCategoryId = this.classify.category[0].id
			uni.setNavigationBarTitle({
				title: this.classify.name
			})
			this.getCategoryList()
		},
		methods: {
			toDetail(goods_id, shop_id) {
				uni.navigateTo({
					url: "../goodsDetail/goodsDetail?id=" + goods_id + "&shop_id=" + shop_id
				})
			},
			toShop(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			chooseCategory(id) {
				this.currentCategoryId = id
				this.getCategoryList()
			},
			getCategoryList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsList",
					data: {
						token: uni.getStorageSync('token'),
						pages: 1,
						cat_id: this.currentCategoryId
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
			loadMoreGoods(){
				if(this.stopLoad){
					return
				}
				this.page++
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsList",
					data: {
						token: uni.getStorageSync('token'),
						pages: this.page,
						cat_id: this.currentCategoryId
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if(res.data.data.length==0){
								this.stopLoad = true
								return
							}
							for (var i = 0; i < res.data.data.length; i++) {
								this.goods.push(res.data.data[i])
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
			console.log('触底了')
			this.loadMoreGoods()
		}
	}
</script>

<style>
	page {
		background-color: #f1f1f1;
	}
	.shopname {
		flex: 1;
		line-height: 40upx;
		font-size: 24upx;
		color: #666;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.shoplogo image{
		width: 100%;
		display: block;
	}
	.shoplogo{
		width: 40upx;
		height: 40upx;
		margin-right: 10upx;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 5upx 3upx #eee;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.ziying {
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: #FE2337;
		color: #fff;
		border-top-left-radius: 20upx;
		line-height: 40upx;
		padding: 0 15upx;
		font-weight: 600;
		font-size: 26upx;
	}
	.goodsList {
		display: flex;
		justify-content: space-between;
		padding: 30upx 30upx 0;
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
	.goods-item .con{
		padding: 20upx;
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

	.checked {
		color: red !important;
	}

	.scroll-item {
		display: inline-block;
		text-align: center;
		width: 20%;
		padding: 20upx 0;
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

	.scroll {
		margin-top: 110upx;
	}
	.null image {
		width: 200upx;
		margin-bottom: 10upx;
		height: auto;
	}
	
	.null {
		text-align: center;
		color: #aaa;
		margin-top: 20%;
	}
</style>
