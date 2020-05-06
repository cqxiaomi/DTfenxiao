<template>
	<view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="member">
				<view class="top">
					<image v-if="memberDetail.head_pic" :src="memberDetail.head_pic" mode="widthFix"></image>
					<image v-else src="../../static/mine/touxiang.jpg" mode="widthFix"></image>
					<view class="msg">
						<view class="name" v-if="memberDetail.nickname">{{memberDetail.nickname}}</view>
						<view class="name" v-else>暂无昵称</view>
						<view class="time">加入门店时间：{{memberDetail.add_time}}</view>
					</view>
				</view>
				<view class="list">
					<view class="item">
						<view class="key">地区：</view>
						<view v-if="memberDetail.address==0">未知</view>
						<view v-else>{{memberDetail.address}}</view>
					</view>
					<view class="item" v-if="memberDetail.sex==0||1||2">
						<view class="key">性别：</view>
						<view v-if="memberDetail.sex==0">未知</view>
						<view v-if="memberDetail.sex==1">男</view>
						<view v-if="memberDetail.sex==2">女</view>
					</view>
					<view class="item">
						<view class="key">手机号：</view>
						<view class="phone" v-if="memberDetail.mobile">
							<view>{{memberDetail.mobile}}</view>
							<!-- <i class="iconfont icondadianhua" @tap="showModel(memberDetail.mobile)"></i> -->
						</view>
						<view class="phone" v-else>暂无</view>
					</view>
					<view class="item">
						<view class="key">消费总额：</view>
						<view>¥ {{memberDetail.total_amount}}</view>
					</view>
					<view class="item">
						<view class="key">身份：</view>
						<view v-if="memberDetail.level==1">普通会员</view>
						<view v-if="memberDetail.level==2">个人代理</view>
						<view v-if="memberDetail.level==3">合伙员工</view>
					</view>
					<view class="item">
						<view class="key">下级人数：</view>
						<view>{{memberDetail.subordinate_sum}}</view>
					</view>
					<button class="cu-btn round bg-red shadow" style="width: 100%;height: 80upx;margin-top: 20upx;" @tap="showModel(memberDetail.mobile)">
						<i class="iconfont icondadianhua"></i>
						<view style="padding-left: 10upx;">联系成员</view>
					</button>
				</view>
			</view>
		</view>
		<!-- <view class="start">启用</view> -->
		<view class="cu-modal" :class="modelName=='phoneModel'?'show':''">
			<view class="cu-dialog phone-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;">电话：{{phone}}，是否拨打电话?</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="takePhone">确定</button>
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
				memberDetail: null,
				modelName: '',
				phone: '',
				user_id: null,
				shop_id:null
			}
		},
		onLoad(options) {
			this.user_id = options.user_id
			this.shop_id = options.shop_id
			this.getMemberDetail()
		},
		methods: {
			showModel(phone) {
				console.log(phone)
				this.phone = phone
				if(this.phone){
					this.modelName = 'phoneModel'
				}else{
					this.showToast('该成员暂未绑定手机号')
				}
				
			},
			closeModel() {
				this.modelName = ''
			},
			takePhone() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
				this.closeModel()
			},
			getMemberDetail() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/userCenter/userDetail",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: this.shop_id,
						user_id: this.user_id
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoading = false
						if (res.data.status == 0) {
							this.memberDetail = res.data.data
							this.memberDetail.reg_time = this.handleTime(this.memberDetail.reg_time)
							this.memberDetail.last_login = this.handleTime(this.memberDetail.last_login)
							this.memberDetail.add_time = this.handleTime(this.memberDetail.add_time)
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
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
	.member {
		margin: 40upx 30upx 0;
		box-shadow: 0 5upx 10upx 5upx #ddd;
		border-radius: 20upx;
		padding: 30upx 25upx 40upx;
	}

	.top {
		display: flex;
		margin-bottom: 10upx;
	}

	.top image {
		width: 140upx;
		height: 140upx;
		border-radius: 70upx;
	}

	.top .msg {
		flex: 1;
		padding: 20upx 0 10upx;
		line-height: 45upx;
		border-bottom: 2upx solid #f1f1f1;
		margin-left: 20upx;
	}

	.top .msg .name {
		font-size: 32upx;
	}

	.top .msg .time {
		font-size: 24upx;
		color: #a1a1a1;
		letter-spacing: 1upx;
		margin-top: 5upx;
	}

	.list .item {
		display: flex;
		border-bottom: 1upx solid #f5f5f5;
		line-height: 50upx;
		padding: 10upx 0;
		font-size: 30upx;
	}

	.list .item>view:nth-child(2) {
		flex: 1;
	}

	.list .item .key {
		width: 160upx;
	}

	.phone {
		display: flex;
		justify-content: space-between;
	}

	.start {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 100upx;
		line-height: 100upx;
		background-color: #F23027;
		font-size: 28upx;
		text-align: center;
		color: #fff;
	}
</style>
