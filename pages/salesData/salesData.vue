<template>
	<view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="pic">
				<image src="../../static/mine/bg02.png" mode="widthFix"></image>
				<view class="tixian">
					<view class="span" style="font-size: 32upx;">可提现余额(元)</view>
					<view style="flex: 1;display: flex;justify-content: space-between;">
						<view class="text-bold" style="font-size: 32upx;">{{moneyMsg.user_money}}</view>
						<view>
							<button class="cu-btn round btn line" @tap="toCashWithdrawal">去提现</button>
						</view>
					</view>
				</view>
				<view class="total-money">
					<view>
						<view class="span">累计佣金(元)</view>
						<view>{{moneyMsg.distribut_money}}</view>
					</view>
					<view>
						<view class="span">个人累计销售额</view>
						<view>{{moneyMsg.total_amount}}</view>
					</view>
					<view>
						<view class="span">团队累计销售额</view>
						<view>{{moneyMsg.team_amount}}</view>
					</view>
				</view>
			</view>
			<view class="search-box">
				<view style="padding: 0 20upx;">
					<picker mode="date" @change="chooseDate">
						<i class="iconfont iconrili" style="font-size: 40upx;"></i>
					</picker>
				</view>
				<view style="flex: 1;">
					<input type="text" style="height: 100%;" v-model="keyWords" @focus="clearKeyWords" placeholder="输入店铺名或订单号" />
				</view>
				<view style="font-size: 34upx;padding: 0 20upx;" @tap="searchData">
					<text class="lg text-gray cuIcon-search"></text>
				</view>
			</view>
			<view class="good-nav">
				<view><text :class="currentItem==0?'under':''" @tap="chooseOption(0)">销售额明细</text></view>
				<view><text :class="currentItem==1?'under':''" @tap="chooseOption(1)">佣金明细</text></view>
			</view>
			<view class="containA" v-if="dataLoading">
				<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 10%;"></image>
			</view>
			<view v-else>
				<view class="data-con" v-if="currentItem==0">
					<view class="null" v-if="isNull_01">
						<image src="../../static/index/store-null.png" mode="widthFix"></image>
						<view>暂无销售额明细</view>
					</view>
					<view v-else>
						<scroll-view scroll-y="true" class="scroll_sale" @scrolltolower="loadMoreSalesdetail">
							<view class="yongjin" v-for="(item,index) in salesDetailList" :key="index">
								<view class="orderno">
									<view>订单号：{{item.order_sn}}</view>
									<view style="font-weight: 600;">¥ {{item.goods_price}}</view>
								</view>
								<view class="orderno">
									<view class="ordertime">{{handleTime(item.add_time)}}</view>
									<view class="shop_name">店铺：{{item.shop_name}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="data-con" v-if="currentItem==1">
					<view class="null" v-if="isNull_02">
						<image src="../../static/index/store-null.png" mode="widthFix"></image>
						<view>暂无佣金明细</view>
					</view>
					<view v-else>
						<scroll-view scroll-y="true" class="scroll_sale" @tap="loadMoreCommissions">
							<view class="yongjin" v-for="(item,index) in commissions" :key="index">
								<view class="orderno">
									<view>订单号：{{item.order_sn}}</view>
									<view style="font-weight: 600;">+ {{item.commission}}</view>
								</view>
								<view class="orderno">
									<view class="ordertime">{{item.create_time}}</view>
									<view class="shop_name">店铺：{{item.shop_name}}</view>
								</view>
							</view>
						</scroll-view>
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
				isLoading: true,
				moneyMsg: null,
				currentItem: 0,
				page: 1,
				isNull_01: false,
				isNull_02: false,
				stopLoad: false,
				salesDetailList: [],
				commissions: [],
				dataLoading: true,
				time: "",
				keyWords: "",
				offset: 10,
				data: null
			}
		},
		onShow() {
			//获取提现/销售额数据
			this.getSalesData()
		},
		onLoad() {
			this.getSalesDetail()
		},
		methods: {
			clearKeyWords() {
				this.keyWords = ""
			},
			searchData() {
				this.isNull_01 = this.isNull_02 = this.stopLoad = false
				this.dataLoading = true
				this.page = 1
				this.time = ''
				switch (this.currentItem) {
					case 0:
						this.getSalesDetail()
						break;
					case 1:
						this.getCommission()
						break;
					default:
						break;
				}
			},
			chooseDate(e) {
				console.log(e.detail.value)
				this.time =  new Date(e.detail.value).getTime()/1000
				console.log(this.time)
				this.isNull_01 = this.isNull_02 = this.stopLoad = false
				this.dataLoading = true
				this.page = 1
				this.keyWords = ''
				switch (this.currentItem) {
					case 0:
						this.getSalesDetail()
						break;
					case 1:
						this.getCommission()
						break;
					default:
						break;
				}
			},
			toHistoryRecode() {
				uni.navigateTo({
					url: '../historyRecode/historyRecode'
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
				let newTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
				return newTime
			},
			//获取累计销售数据和剩余提现金额
			getSalesData() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/userCenter/soldDataTitle",
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.moneyMsg = res.data.data
							this.isLoading = false
							uni.setStorageSync('user_money', this.moneyMsg.user_money)
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			chooseOption(index) {
				this.currentItem = index
				this.isNull_01 = this.isNull_02 = this.stopLoad = false
				this.dataLoading = true
				this.page = 1
				this.keyWords = ''
				this.time = ""
				switch (index) {
					case 0:
						this.getSalesDetail()
						break;
					case 1:
						this.getCommission()
						break;
					default:
						break;
				}
			},
			//跳转提现
			toCashWithdrawal() {
				uni.request({
					url: this.websiteUrl + "/api/GetSystem/index",
					data: {
						token: 'a0z6f0w15dpmawle'
					},
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.is_show == 1) {
								uni.navigateTo({
									url: "../cashWithdrawal/cashWithdrawal"
								})
							} else {
								this.showToast('提现功能已关闭')
							}
						}
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//获取销售额明细
			getSalesDetail(data) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/salesList",
					data: {
						token: uni.getStorageSync('token'),
						time: this.time,
						keywords: this.keyWords,
						page: this.page,
						offset: this.offset
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.dataLoading = false
							this.salesDetailList = res.data.data.data
							if (this.salesDetailList.length == 0) {
								this.isNull_01 = true
							}
						}
					}
				})
			},
			//获取佣金明细
			getCommission(data) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/userCenter/rebeatList",
					data: {
						token: uni.getStorageSync('token'),
						time: this.time,
						keywords: this.keyWords,
						page: this.page,
						offset: this.offset
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.dataLoading = false
							this.commissions = res.data.data.user_rebate
							if (this.commissions.length == 0) {
								this.isNull_02 = true
							}
						}
					}
				})
			},
			loadMoreSalesdetail() {
				console.log('触底了')
				if (this.stopLoad) {
					return
				}
				this.page++
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/salesList",
					data: {
						token: uni.getStorageSync('token'),
						time: this.time,
						keywords: this.keyWords,
						page: this.page,
						offset: this.offset
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.data.data.length == 0) {
							this.stopLoad = true
							return
						}
						for (let i = 0; i < res.data.data.data.length; i++) {
							this.salesDetailList.push(res.data.data.data[i])
						}
					}
				})
			},
			loadMoreCommissions() {
				console.log('触底了')
				if (this.stopLoad) {
					return
				}
				this.page++
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/userCenter/rebeatList",
					data: {
						token: uni.getStorageSync('token'),
						time: this.time,
						keywords: this.keyWords,
						page: this.page,
						offset: this.offset
					},
					header: this.header,
					success: (res) => {
						// console.log(res.data)
						if (res.data.data.user_rebate.length == 0) {
							this.stopLoad = true
							return
						}
						for (let i = 0; i < res.data.data.user_rebate.length; i++) {
							this.commissions.push(res.data.data.user_rebate[i])
						}
						console.log(this.commissions)
					}
				})
			}
		}
	}
</script>

<style>
	.search-box {
		margin: 0 40upx;
		padding: 0 10upx;
		border-radius: 40upx;
		box-shadow: 0 3upx 10upx 2upx #ddd;
		margin-bottom: 10upx;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
	}

	.timeBox {
		margin: 0 50upx 30upx;
	}

	.timeBox>view {
		display: flex;
		justify-content: space-between;
		line-height: 60upx;
		font-size: 30upx;
	}

	.pic {
		text-align: center;
		margin: 40upx auto 0;
		position: relative;
		width: 690upx;
		height: 380upx;
	}

	.pic image {
		width: 100%;
	}

	.tixian {
		position: absolute;
		top: 40upx;
		width: 100%;
		padding: 0 40upx;
		display: flex;
		line-height: 50upx;
		height: 50upx;
		color: #fff;
	}

	.btn {
		line-height: 50upx;
		height: 50upx;
		font-size: 24upx;
		color: #fff;
		padding: 0;
		width: 160upx;
	}

	.total-money {
		position: absolute;
		width: 100%;
		padding: 0 40upx;
		bottom: 60upx;
	}

	.total-money>view {
		display: flex;
		line-height: 60upx;
		font-size: 28upx;
		color: #fff;
	}

	.span {
		width: 45%;
		text-align: left;
	}

	.good-nav {
		margin: 0 30upx;
		display: flex;
		justify-content: space-between;
		border-bottom: 2upx solid #F0F0F0;
	}

	.good-nav>view {
		width: 50%;
		text-align: center;
	}

	.good-nav>view text {
		display: inline-block;
		line-height: 60upx;
		position: relative;
	}

	.under {
		box-shadow: 0 -6upx 0 #F7756A inset;
		position: relative;
		color: red;
		font-weight: 600;
	}

	.data-con {
		position: fixed;
		top: 560upx;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}

	.search {
		width: 690upx;
		margin: 20upx 30upx;
		display: flex;
		justify-content: space-between;
		line-height: 70upx;
		height: 70upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		border-radius: 20upx;
	}

	.search input {
		height: 100%;
		flex: 1;
		padding: 0 15upx;
	}

	.scroll_sale {
		position: fixed;
		top: 580upx;
		bottom: 0;
		width: 100%;
	}

	.sale_detail {
		line-height: 160upx;
		background-color: pink;
		border-radius: 20upx;
		margin: 20upx 30upx;
	}



	.yongjin {
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		margin: 10upx 30upx 20upx;
		padding: 20upx 30upx;
	}

	.orderno {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}

	.ordertime,
	.shop_name {
		font-size: 26upx;
		color: #888;
		letter-spacing: 2upx;
	}

	.null {
		text-align: center;
		color: #aaa;
		position: absolute;
		top: 10%;
		width: 100%;
	}

	.null image {
		width: 250upx;
		margin-bottom: 10upx;
	}
</style>
