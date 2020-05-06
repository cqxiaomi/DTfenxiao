<template>
	<view>
		<view class="null" v-if="isNull">
			<image src="../../static/index/store-null.png" mode="widthFix"></image>
			<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无卡券</view>
		</view>
		<view v-else>
			<view class="tickets" v-for="(item,index) in coupons" :key="index">
				<view class="tic-left">¥<text style="font-size: 60upx;font-weight: 600;margin-left: 10upx;">{{item.money}}</text></view>
				<view class="tic-right">
					<view style="line-height: 40upx;font-size: 28upx;font-weight: 600;">
						{{item.name}}
					</view>
					<view style="font-size: 24upx;color: #888;line-height: 40upx;">满<text style="padding: 0 6upx;">¥{{item.condition}}</text>可用</view>
					<view style="font-size: 24upx;color: #888;line-height: 40upx;">{{handleTime(item.use_start_time)}}-{{handleTime(item.use_end_time)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isNull: false,
				coupons: null
			}
		},
		onLoad() {
			this.getCardList()
		},
		methods: {
			getCardList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/coupon',
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.coupons = res.data.data
							if (this.coupons.length == 0) {
								this.isNull = true
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//处理下单时间
			handleTime(time) {
				let date = new Date(time * 1000)
				let Y = date.getFullYear().toString()
				let M = (date.getMonth() + 1).toString().padStart(2, '0')
				let D = date.getDate().toString().padStart(2, '0')
				// let h = date.getHours().toString().padStart(2, '0')
				// let m = date.getMinutes().toString().padStart(2, '0')
				// let s = date.getSeconds().toString().padStart(2, '0')
				// let newTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
				let newTime = Y + '.' + M + '.' + D
				return newTime
			}
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.null {
		width: 250upx;
		margin: 320upx auto;
	}

	.null image {
		width: 100%;
	}

	.tickets {
		display: flex;
		justify-content: space-between;
		margin: 30upx;
		box-shadow: 0 0 10upx 2upx #ddd;
	}

	.tic-left {
		width: 35%;
		background-color: #54D3C5;
		height: 180upx;
		line-height: 180upx;
		color: #fff;
		font-size: 34upx;
		text-align: center;
	}

	.tic-right {
		flex: 1;
		text-align: left;
		padding: 10upx 20upx;
		background-color: #fff;
	}
</style>
