<template>
	<view>
		<view class="search">
			<view class="inputbox">
				<input type="text" v-model="keyWords" placeholder="请输入商品关键词" placeholder-class="font" confirm-type="search" @focus="clearKey"
				 @confirm="getSearchList" />
				<text class="cuIcon-search text-gray" style="font-size: 34upx;padding:0 20upx;" @tap="getSearchList"></text>
			</view>
		</view>
		<view class="screen">
			<view @tap="chooseOption(0)" :class="currentCondition==0?'color-red':''">综合</view>
			<view @tap="chooseOption(1)">
				<view class="txt" :class="currentCondition==1?'color-red':''">价格</view>
				<view class="screen-icon">
					<view :class="isRise&&currentCondition==1?'border-bottom-red':''"></view>
					<view :class="!isRise&&currentCondition==1?'border-top-red':''"></view>
				</view>
			</view>
			<view @tap="chooseOption(2)">
				<view class="txt" :class="currentCondition==2?'color-red':''">销量优先</view>
			</view>
		</view>
		<view style="margin-top: 170upx;">
			<view class="null" v-if="searchGoods.length==0">
				<image src="../../static/index/search-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无相关信息</view>
			</view>
			<view class="goodsList" v-else>
				<view class="goods-item" v-for="(item,index) in searchGoods" :key="index" @tap="toDetail(item.goods_id,item.shop_id)">
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchGoods: null,
				currentIndex: 0,
				isNull: true,
				flag1: true,
				flag2: true,
				keyWords: '',
				stopLoad: false,
				//请求参数(筛选条件)
				data: null,
				page: 1,
				cat_id: null,
				currentCondition:0,
				isRise:false,
			}
		},
		onLoad(options) {
			console.log(options)
			this.keyWords = options.keyWords
			if (options.cat_id) {
				this.cat_id = options.cat_id
				this.getCategoryList()
			} else {
				this.getSearchList()
			}
		},
		methods: {
			chooseOption(i){
				this.currentCondition = i
				if(this.currentCondition!=1){
					this.isRise = false
				}else{
					this.isRise = !this.isRise
				}
				if(this.currentCondition==0){
					this.showToast('按综合排序',1000)
				}else if(this.currentCondition==1){
					if(this.isRise){
						this.showToast('按价格升序',1000)
					}else{
						this.showToast('按价格降序',1000)
					}
					
				}else{
					this.showToast('按销量排序',1000)
				}
			},
			toDetail(goods_id, shop_id) {
				uni.navigateTo({
					url: "../goodsDetail/goodsDetail?id=" + goods_id + "&shop_id=" + shop_id
				})
			},
			clearKey() {
				this.keyWords = ''
			},
			//显示点击过的分类商品列表
			getCategoryList() {
				this.data = {
					token: uni.getStorageSync('token'),
					pages: 1,
					cat_id: this.cat_id
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsList",
					data: this.data,
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.searchGoods = res.data.data
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//显示搜索列表
			getSearchList() {
				if (this.keyWords == '') {
					this.showToast('请输入搜索关键词')
					return
				}
				this.searchGoods = []
				this.currentIndex = 0
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				this.data = {
					token: uni.getStorageSync('token'),
					keywords: this.keyWords,
					pages: this.page
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsList",
					data: this.data,
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.searchGoods = res.data.data
						}
					}
				})
			},
			//获取排序后的商品列表
			getSortGoodsList() {
				console.log(this.data)
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsList",
					data: this.data,
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.searchGoods = res.data.data.goods
						}
					}
				})
			},

			//加载更多商品
			loadMoreGoods() {
				console.log(this.stopLoad)
				if (this.stopLoad) {
					return
				}
				this.page++
				this.data.pages = this.page
				console.log(this.data)
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/goods/goodsList",
					data: this.data,
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.length == 0) {
								this.stopLoad = true
								return
							}
							for (var i = 0; i < res.data.data.length; i++) {
								this.searchGoods.push(res.data.data[i])
							}
						}
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
		background-color: #F5F5F5;
	}
	.color-red{
		color: red;
	}
	.border-bottom-red{
		border-bottom-color: red !important;
	}
	.border-top-red{
		border-top-color: red !important;
	}
	.screen {
		position: fixed;
		width: 100%;
		top: 110upx;
		display: flex;
		background-color: #fff;
		line-height: 60upx;
		z-index: 100;
	}

	.screen>view {
		flex: 1;
		display: flex;
		justify-content: center;
	}
	.screen .txt{
		margin-right: 10upx;
	}
	.screen-icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.screen-icon>view {
		width: 16upx;
		height: 16upx;
		border: 8upx solid transparent;
		margin-bottom: 5upx;
	}
	.screen-icon>view:first-child{
		border-bottom: 8upx solid gray;
	}
	.screen-icon>view:last-child{
		border-top: 8upx solid gray;
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

	.shoplogo image {
		width: 100%;
		display: block;
	}

	.shoplogo {
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

	.goods-item .con {
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
		height: 110upx;
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

	.sort-nav {
		display: flex;
		justify-content: space-around;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		top: 100upx;
		background-color: #FFFFFF;
		z-index: 100;
		margin-bottom: 10upx;
	}

	.sort-nav>view {
		width: 100upx;
		text-align: center;
		line-height: 60upx;
		position: relative;
	}

	.iconxiala {
		position: absolute;
		line-height: 60upx;
		color: #ddd;
		top: 0;
		left: 85upx;
		font-size: 20upx;
		transition: 0.2s;
	}

	.rotate {
		transform: rotate(180deg);
	}

	.select-color {
		color: red;
		font-weight: 900;
	}

	.border-bottom::after {
		content: '';
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		height: 6upx;
		border-radius: 3upx;
		background-color: #F67469;
	}
	.null{
		position: relative;
		top: 200upx;
	}
	.null image {
		width: 250upx;
		margin: 0 auto;
		display: block;
		height: auto;
	}
</style>
