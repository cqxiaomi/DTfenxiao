<template>
	<view>
		<view class="bg">
			<image src="../../static/mine/storeList.jpg" mode="widthFix" style="width: 100%;"></image>
			<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);"></view>
		</view>
		<view class="search-box">
			<view style="flex: 1;">
				<input type="text" style="height: 100%;padding-left: 40upx;" v-model="keywords" @focus="clearWords" placeholder="请输入店铺名称" @confirm="searchShop" />
			</view>
			<view style="font-size: 34upx;padding: 0 20upx;padding-right: 30upx;" @tap="searchShop">
				<text class="lg text-gray cuIcon-search"></text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="shop-scroll" v-if="stores.length!=0" @scrolltolower="loadMoreShops">
			<view class="shops" v-for="(item,index) in stores" :key="index" @tap="toShopCenter(item.shop_id)">
				<view class="shop-l" v-if="item.logo" :style="'background-image: url('+item.logo+');'"></view>
				<view class="shop-l" v-else>
					<image src="../../static/mine/touxiang(1).jpeg" mode="widthFix"></image>
				</view>
				<view class="shop-m">
					<view style="font-size: 32upx;" v-if="item.shop_name">{{item.shop_name}}</view>
					<view style="font-size: 32upx;" v-else>无店铺名称</view>
					<view style="color: red;font-size: 24upx;" v-if="item.level==1">普通会员</view>
					<view style="color: red;font-size: 24upx;" v-if="item.level==2">个人代理</view>
					<view style="color: red;font-size: 24upx;" v-if="item.level==3">合伙员工</view>
					<view style="color: red;font-size: 24upx;" v-if="!item.level">未知角色</view>
				</view>
				<view class="shop-r">
					<text style="color: #aaa;">查看门店</text>
					<text class="lg text-gray cuIcon-right" style="font-size: 32upx;color: #aaa;"></text>
				</view>
			</view>
			<view style="height: 200upx;"></view>
		</scroll-view>
		<view class="null" v-else>
			<image src="../../static/index/store-null.png" mode="widthFix"></image>
			<view class="">暂无门店</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stores: [],
				stopLoadShops: false,
				shopPage: 1,
				keywords:''
			}
		},
		onLoad() {
			this.getStoreList()
		},
		methods: {
			clearWords(){
				this.keywords = ''
				this.searchShop()
			},
			searchShop(){
				this.shopPage = 1
				this.stopLoadShops = false
				this.getStoreList()
			},
			toShopCenter(shop_id) {
				uni.setStorageSync("shop_id",shop_id)
				uni.navigateTo({
					url:"../storeCenter/storeCenter"
				})
			},
			getStoreList() {
				
				uni.showLoading({
					title:"加载中"
				})
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/getStoreList",
					data: {
						token: uni.getStorageSync('token'),
						keywords:this.keywords,
						page:1
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						uni.hideLoading()
						if (res.data.status == 0) {
							this.stores = res.data.data.data
							return
						}
						this.showToast(res.data.msg)
						
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//触底加载更多所属门店
			loadMoreShops() {
				if (this.stopLoadShops) {
					return
				}
				this.shopPage++
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/getStoreList",
					data: {
						token: uni.getStorageSync('token'),
						keywords:this.keywords,
						page:this.shopPage
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							for(let i=0;i<res.data.data.length;i++){
								this.stores.push(res.data.data[i])
							}
							return
						}
						this.stopLoadShops = true
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			}
		}
	}
</script>

<style>
	.null image {
		width: 200upx;
		margin-bottom: 10upx;
	}
	
	.null {
		text-align: center;
		font-size: 24upx;
		color: #aaa;
		margin-top: 20%;
	}
	page {
		font-size: 30upx;
	}
	.search-box{
		margin: 0 30upx;
		border-radius: 40upx;
		box-shadow: 0 3upx 10upx 2upx #ddd;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
	}
	.shops{
		display: flex;
		justify-content: space-between;
		padding: 20upx 0;
		border-bottom: 1upx solid #f5f5f5;
	}
	.shop-l{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		overflow: hidden;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		box-shadow: 0 0 10upx 5upx #eee;
	}
	.shop-l image{
		width: 100%;
		display: block;
	}
	.shop-m{
		padding: 5upx 0;
		margin-left: 20upx;
		line-height: 40upx;
		flex: 1;
	}
	.shop-r{
		line-height: 90upx;
		display: flex;
	}
	.shop-scroll{
		position: fixed;
		bottom: 0;
		top: 530upx;
		padding: 0 30upx;
	}
	.bg {
		width: 690upx;
		margin: 20upx 30upx;
		height: 400upx;
		border-radius: 20upx;
		position: relative;
		background-size: cover;
		overflow: hidden;
		background-repeat: no-repeat;
		background-position: center center;
	}

	.card {
		width: 650upx;
		position: fixed;
		top: 320upx;
		left: 50upx;
		bottom: 50upx;
		box-shadow: 0 6upx 6upx 0 #ddd;
		border-radius: 20upx;
		background-color: #fff;
		padding: 0 20upx;
	}

	.card-header {
		display: flex;
		justify-content: space-around;
		padding: 30upx 0;
		font-weight: 600;
	}

	.card-header>view {
		line-height: 60upx;
		background-color: #F7D5D5;
		border-radius: 30upx;
		width: 160upx;
		text-align: center;
	}

	.storeItem {
		display: flex;
		justify-content: space-around;
		line-height: 40upx;
		padding-bottom: 40upx;
	}

	.storeItem>view {
		width: 160upx;
		text-align: center;
	}

	.scroll {
		position: absolute;
		top: 140upx;
		bottom: 20upx;
		width: 610upx;
	}
</style>
