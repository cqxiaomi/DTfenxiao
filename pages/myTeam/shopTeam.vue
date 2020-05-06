<template>
	<view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="top">
				<image class="bg-pic" src="../../static/mine/bg01.png" mode="widthFix"></image>
				<view class="round-pic">
					<view class="round-filter">
						<image src="../../static/mine/round.png" mode="widthFix"></image>
						<view class="text">
							<view style="font-weight: 600;margin-bottom: 5upx;">人数</view>
							<view>{{totalNumber}}人</view>
						</view>
					</view>
				</view>
				<view class="shop-name">门店：{{shopName}}</view>
			</view>
			<!-- <view class="search-box">
				<view style="flex: 1;">
					<input type="text" style="height: 100%;padding-left: 40upx;" value="" placeholder="请输入团队成员名称"/>
				</view>
				<view style="font-size: 34upx;padding: 0 20upx;padding-right: 30upx;">
					<text class="lg text-gray cuIcon-search"></text>
				</view>
			</view> -->
			<scroll-view scroll-y="true" class="shop-scroll" @scrolltolower="loadMore" v-if="shopTeams.length!=0">
				<view class="list-item" v-for="(item,index) in shopTeams" :key="index" @tap="toMemberDetail(item.user_id,item.shop_id)">
					<view class="item-l">
						<image v-if="item.head_pic" :src="item.head_pic" mode="widthFix"></image>
						<image v-else src="../../static/mine/touxiang.jpg" mode="widthFix"></image>
					</view>
					<view class="item-m">
						<view style="font-weight: 600;">
							<text v-if='item.nickname'>{{item.nickname}}</text>
							<text v-else>(普通会员)暂无昵称</text>
							<text>消费总额：¥<text style="margin-left: 5upx;">{{item.total_amount}}</text></text>
						</view>
						<view>
							<view style="color: red;font-size: 24upx;" v-if="item.level==1">普通会员</view>
							<view style="color: red;font-size: 24upx;" v-if="item.level==2">个人代理</view>
							<view style="color: red;font-size: 24upx;" v-if="item.level==3">合伙员工</view>
							<text v-if="item.last_login==0" style="font-size: 24upx;color: #666;">最近登录:暂未登录</text>
							<text v-else style="font-size: 24upx;color: #666;">最近登录：{{handleTime(item.last_login)}}</text>
							<!-- <i v-if='item.mobile' class="iconfont icondadianhua" @tap.stop="takePhone(item.mobile)"></i> -->
						</view>
					</view>
					<view class="item-r">
						<text class="lg text-gray cuIcon-right" style="font-size: 32upx;color: #C8C8CD;"></text>
					</view>
				</view>
				<view style="height: 200upx;"></view>
			</scroll-view>
			<view class="null" v-else>
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view>暂无下级</view>
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
				codePic:null,
				shopTeams:[],
				shopName:null
			}
		},
		onLoad(options) {
			this.shopName = options.shop_name
			this.getShopTeam()
		},
		methods: {
			getShopTeam(){
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/userCenter/myteam",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						page: this.page
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoading = false
						if (res.data.status == 0) {
							this.shopTeams = res.data.data.users
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
			takePhone(num) {
				this.takeNumber = num
				this.modelName = 'phoneModel'
			},
			closeModel() {
				this.modelName = ''
			},
			
			sureTakePhone() {
				uni.makePhoneCall({
					phoneNumber: this.takeNumber
				});
				this.closeModel()
			},

			toMemberDetail(user_id,shop_id) {
				uni.navigateTo({
					url: "../memberMessage/memberMessage?user_id=" + user_id+"&shop_id="+ shop_id
				})
			},
			
			loadMore() {
				if (this.stopLoad) {
					return
				}
				this.page++
				uni.request({
					url: this.websiteUrl + "/api/userCenter/myteam",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						page: this.page,
						offset: 20
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.users.length == 0) {
								this.stopLoad = true
								return
							}
							for (var i = 0; i < res.data.data.users.length; i++) {
								this.shopTeams.push(res.data.data.users[i])
							}
						}
					}
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
	.shop-scroll{
		position: fixed;
		bottom: 0;
		top: 350upx;
		padding: 0 30upx;
	}
	.search-box{
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
	.shop-name{
		position: absolute;
		bottom: 50upx;
		right:30upx;
		color: #fff;
		font-size: 36upx;
		font-weight: 600;
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
		padding: 20upx 0;
		border-bottom: 1upx solid #f5f5f5;
	}

	.item-l{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 10upx 5upx #eee;
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
		line-height: 90upx;
		display: flex;
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
