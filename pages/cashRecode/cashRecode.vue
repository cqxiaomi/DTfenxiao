<template>
	<view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="null" style="text-align: center;" v-if="isNull">
				<image src="../../static/index/search-null.png" style="width: 250upx;margin-top: 30%;" mode="widthFix"></image>
				<view style="color: #aaa;margin-top: 10upx;">暂无提现记录</view>
			</view>
			<view v-else>
				<view class="recode" v-for="(item,index) in recodes" :key="index">
					<view class="item">
						<view>{{item.bank_name}}</view>
						<!-- <view>杭州银行</view> -->
						<view v-if="item.status==-1">审核不通过</view>
						<view v-if="item.status==1">审核通过</view>
						<view v-if="item.status==2">提现成功</view>
						<view v-if="item.status==3">提现失败</view>
						<view v-if="item.status==4">审核中</view>
					</view>
					<view v-if='item.bank_card'>{{item.bank_card}}</view>
					<!-- <view>卡号：398884341984794081</view> -->
					<view v-if='item.realname'>{{item.realname}}</view>
					<!-- <view>开户人：黄晓明</view> -->
					<view>提现金额：+ {{item.money}}</view>
					<!-- <view>提现金额：+ 200</view> -->
					<view>手续费：- {{item.taxfee}}</view>
					<!-- <view>手续费：- 0.20</view> -->
					<view>{{handleTime(item.create_time)}}</view>
					<!-- <view>提现日期：2019-03-20</view> -->
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
				isNull: false,
				recodes: [],
				page: 1,
				stopLoad: false
			}
		},
		onLoad() {
			this.getCashRecode()
		},
		methods: {
			//处理下单时间
			handleTime(time) {
				let date = new Date(time * 1000)
				let Y = date.getFullYear().toString()
				let M = (date.getMonth() + 1).toString().padStart(2, '0')
				let D = date.getDate().toString().padStart(2, '0')
				let newTime = Y + '-' + M + '-' + D
				return newTime
			},
			//获取提现记录
			getCashRecode() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/withdrawalList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						page: this.page,
						offset: 10
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.recodes = res.data.data.data
							this.isLoading = false
							if (this.recodes.length == 0) {
								this.isNull = true
							}
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
					url: this.websiteUrl + "/api/UserCenter/withdrawalList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						page: this.page,
						offset: 10
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
								this.recodes.push(res.data.data.data[i])
							}
							return
						}
					}
				})
			}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style>
	.top {
		position: fixed;
		width: 100%;
		top: 100upx;
		z-index: 100;
		min-height: 88upx;
	}

	.recode {
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		margin: 30upx;
		padding: 30upx;
	}
	.recode>view{
		line-height: 50upx;
	}

	.item {
		display: flex;
		justify-content: space-between;
	}
</style>
