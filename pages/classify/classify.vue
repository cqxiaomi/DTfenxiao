<template>
	<view>
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
			<view class="VerticalBox">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
					<view class="cu-item" :class="index==tabCur?'cur':''" v-for="(item,index) in categorys" :key="index" @tap="TabSelect"
					 :data-id="index">
						{{item.name}}
					</view>
				</scroll-view>
				<scroll-view class="VerticalMain" scroll-y scroll-with-animation @scroll="VerticalMain" :scroll-into-view="'main-'+mainCur">
					<view v-for="(item,index) in categorys" :key="index" :id="'main-'+index">
						<view class="subTitle">
							<text>{{item.name}}</text>
						</view>
						<view style="text-align: center;line-height: 80upx;color: #CCCCCC;margin: 0 30upx;" v-if="item.category.length==0">无此类商品</view>
						<view class="list" v-else>
							<view class="list-item" v-for="(good,index2) in item.category" :key="index2" @tap="toGoodsList(good.id)">
								<view class="classify-pic" :style="'background-image: url('+good.image+');'"></view>
								<view class="name">{{good.name}}</view>
							</view>
							<view></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoaing: true,
				imgUrl: this.imgUrl,
				categorys: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {

		},
		onShow() {
			this.getGoodsList()
		},
		methods: {
			//跳转搜索页面
			toSearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			getGoodsList() {
				uni.request({
					url: this.websiteUrl + "/api/Goods/categoryList",
					method: "POST",
					success: (res) => {
						console.log(res.data)
						this.isLoaing = false
						if (res.data.status == 0) {
							this.categorys = res.data.data
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.categorys.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + i);
						view.fields({
							size: true
						}, data => {
							this.categorys[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.categorys[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.categorys.length; i++) {
					if (scrollTop > this.categorys[i].top && scrollTop < this.categorys[i].bottom) {
						this.verticalNavTop = i * 50
						this.tabCur = i
						// console.log(scrollTop)
						return false
					}
				}
			},
			toGoodsList(id) {
				uni.navigateTo({
					url: '../searchDetail/searchDetail?cat_id=' + id
				})
			}
		},
	}
</script>

<style>
	.classify-pic {
		width: 120upx;
		height: 120upx;
		overflow: hidden;
		border-radius: 10upx;
		margin: 0 auto;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	

	.VerticalBox {
		position: fixed;
		top: 110upx;
		bottom: 0;
		display: flex;
		width: 100%;
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

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
		background-color: #f7f7f7;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 120upx;
		line-height: 120upx;
		position: relative;
		margin-bottom: 2upx;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #FEF7F8;
		border-bottom-left-radius: 40upx;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 50upx;
		height: 8upx;
		border-radius: 4upx;
		position: absolute;
		background-color: #F57368;
		left: 0;
		right: 0;
		bottom: 25upx;
		margin: auto;
	}

	.VerticalMain {
		background-color: #fff;
		flex: 1;
	}

	.list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 0 25upx 40upx;
	}

	.list>view {
		width: 155upx;
	}

	.list-item {
		padding: 15upx;
		text-align: center;
		box-shadow: 0 4upx 10upx rgba(0, 0, 0, 0.1);
		margin: 10upx 0;
		border-radius: 15upx;
	}

	.list-item .name {
		font-size: 24upx;
		padding-top: 10upx;
		color: #4b4b4b;
	}

	.subTitle {
		text-align: center;
		height: 80upx;
		line-height: 80upx;
	}

	.subTitle text {
		position: relative;
		padding: 0 20upx;
		letter-spacing: 2upx;
		font-size: 22upx;
	}

	.subTitle text::before,
	.subTitle text::after {
		content: '';
		width: 30upx;
		height: 2upx;
		position: absolute;
		top: 50%;
		margin-top: -1upx;
		background-color: #383849;
	}

	.subTitle text::before {
		left: -40upx;
	}

	.subTitle text::after {
		right: -40upx;
	}
</style>
