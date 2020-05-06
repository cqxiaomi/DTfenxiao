<template>
	<view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view class="" v-else>
			<view class="top">
				<image class="bg-pic" src="../../static/mine/bg01.png" mode="widthFix"></image>
				<view class="round-pic">
					<view class="round-filter">
						<image src="../../static/mine/round.png" mode="widthFix"></image>
						<view class="text">
							<view style="font-weight: 600;margin-bottom: 5upx;">团队总人数</view>
							<view>{{totalNumber}}人</view>
						</view>
					</view>
				</view>
			</view>
			<view class="search-box">
				<view style="flex: 1;">
					<input type="text" style="height: 100%;padding-left: 40upx;" v-model="keywords" placeholder="请输入店铺名称" @focus="clearWords" @confirm="searchShop" />
				</view>
				<view style="font-size: 34upx;padding: 0 20upx;padding-right: 30upx;" @tap="searchShop">
					<text class="lg text-gray cuIcon-search"></text>
				</view>
			</view>
			<scroll-view scroll-y="true" class="shop-scroll" v-if="stores.length!=0" @scrolltolower="loadMoreShops">
				<view class="shops" v-for="(item,index) in stores" :key="index" @tap="toShopTeam(item.shop_id,item.shop_name)">
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
						<text style="color: #aaa;">查看团队</text>
						<text class="lg text-gray cuIcon-right" style="font-size: 32upx;color: #aaa;"></text>
					</view>
				</view>
			</scroll-view>
			<view class="null" v-else>
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view class="">暂无门店</view>
			</view>
		</view>
		<view class="cu-modal" :class="modelName=='phoneModel'?'show':''">
			<view class="cu-dialog phone-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;">电话：{{takeNumber}}，是否拨打电话?</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="sureTakePhone">确定</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modelName=='addMemberModel'?'show':''">
			<view class="cu-dialog addMember-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 10upx;font-size: 40upx;font-weight: 600;">添加会员</view>
				<input type="text" v-model="name" placeholder="请输入下级会员姓名" placeholder-class="font" @focus="clearTxt(1)" />
				<input type="number" maxlength="11" v-model="phone" placeholder="请输入会员手机号" placeholder-class="font" @focus="clearTxt(2)" />
				<button class="cu-btn round bg-red shadow" style="background-color: red;" @tap="addMember">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				teamMsg: [],
				totalNumber: null,
				modelName: '',
				name: '',
				phone: '',
				isNull: false,
				takeNumber: '',
				page: 1,
				stopLoad: false,
				codePic: null,
				stores: [],
				keywords: "",
				stopLoadShops: false
			}
		},
		onShow() {
			this.getShopTeam()
			this.getStoreList()
		},
		methods: {
			toShopTeam(shop_id, shop_name) {
				uni.setStorageSync('shop_id', shop_id)
				uni.navigateTo({
					url: "./shopTeam?shop_name=" + shop_name
				})
			},
			searchShop() {
				this.page = 1
				this.stopLoadShops = false
				this.getStoreList()
			},
			getShopTeam() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/userCenter/myteam",
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.totalNumber = res.data.data.count
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			getStoreList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/getStoreList",
					data: {
						token: uni.getStorageSync('token'),
						keywords: this.keywords,
						page: 1
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoading = false
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
						keywords: this.keywords,
						page: this.shopPage
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.length == 0) {
								this.stopLoadShops = true
								return
							}
							for (let i = 0; i < res.data.data.length; i++) {
								this.stores.push(res.data.data[i])
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
			clearWords(){
				this.keywords = ''
				this.searchShop()
			},
			takePhone(num) {
				this.takeNumber = num
				this.modelName = 'phoneModel'
			},
			closeModel() {
				this.modelName = ''
			},
			clearTxt(index) {
				if (index == 1) {
					this.name = ''
				} else {
					this.phone = ''
				}
			},
			showModel() {
				this.modelName = 'addMemberModel'
			},
			sureTakePhone() {
				uni.makePhoneCall({
					phoneNumber: this.takeNumber
				});
				this.closeModel()
			},
			toFriendRecord() {
				uni.navigateTo({
					url: "../friendRecord/friendRecord"
				})
			},
			toMemberDetail(user_id, shop_id) {
				uni.navigateTo({
					url: "../memberMessage/memberMessage?user_id=" + user_id + "&shop_id=" + shop_id
				})
			},
			toCode() {
				console.log('生成二维码')
				uni.navigateTo({
					url: './codeShare'
				})
			},
			//处理下单时间
			handleTime(time) {
				let date = new Date(time * 1000)
				let Y = date.getFullYear().toString()
				let M = (date.getMonth() + 1).toString().padStart(2, '0')
				let D = date.getDate().toString().padStart(2, '0')
				let h = date.getHours().toString().padStart(2, '0')
				let m = date.getMinutes().toString().padStart(2, '0')
				let s = date.getSeconds().toString().padStart(2, '0')
				let newTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m
				return newTime
			},
		}
	}
</script>

<style>
	.shops {
		display: flex;
		justify-content: space-between;
		padding: 20upx 0;
		border-bottom: 1upx solid #f5f5f5;
	}

	.shop-l {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		overflow: hidden;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		box-shadow: 0 0 10upx 5upx #eee;
	}

	.shop-l image {
		width: 100%;
		display: block;
	}

	.shop-m {
		padding: 5upx 0;
		margin-left: 20upx;
		line-height: 40upx;
		flex: 1;
	}

	.shop-r {
		line-height: 90upx;
		display: flex;
	}

	.shop-scroll {
		position: fixed;
		bottom: 0;
		top: 450upx;
		padding: 0 30upx;
	}

	.search-box {
		margin: 0 40upx;
		border-radius: 40upx;
		box-shadow: 0 3upx 10upx 2upx #ddd;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
	}

	.top {
		margin: 40upx 30upx 0;
		position: relative;
	}

	.top .bg-pic {
		width: 100%;
	}

	.round-pic {
		position: absolute;
		top: 50%;
		left: 48upx;
		transform: translateY(-50%);
	}

	.round-filter {
		position: relative;
	}

	.round-pic image {
		width: 220upx;
		display: block;
	}

	.text {
		position: absolute;
		width: 100%;
		text-align: center;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		color: #FFFFFF;
	}

	.apply {
		position: absolute;
		right: 30upx;
		bottom: 50upx;
		width: 194upx;
		height: 48upx;
		line-height: 48upx;
		font-size: 22upx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		padding: 0;
	}

	.list-title {
		display: flex;
		font-size: 28upx;
		line-height: 60upx;
		margin: 0 30upx;
	}

	.btn-group {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	.btn-group button {
		font-size: 22upx;
		height: 50upx;
		line-height: 50upx;
		width: 200upx;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		padding: 15upx 0;
	}

	.list-item .item-l image,
	.item-l {
		width: 130upx;
		height: 130upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.list-item .item-m {
		flex: 1;
		margin: 0 20upx;
		padding: 5upx 0;
	}

	.item-m>view {
		line-height: 40upx;
		display: flex;
		justify-content: space-between;
	}

	.list-item .item-r {
		line-height: 130upx;
	}

	.addMember-box {
		padding: 50upx 40upx;
		width: 580upx;
	}

	.addMember-box input {
		width: 100%;
		margin: 15px auto;
		border-radius: 35upx;
		height: 70upx;
		line-height: 70upx;
		background-color: #f1f1f1;
		text-align: left;
		padding: 0 30upx;
	}

	.font {
		font-size: 26upx;
		color: #AAAAAA;
	}

	.addMember-box button {
		width: 100%;
	}

	.null image {
		width: 200upx;
		margin-bottom: 10upx;
	}

	.null {
		text-align: center;
		color: #aaa;
		margin-top: 20%;
	}
</style>
