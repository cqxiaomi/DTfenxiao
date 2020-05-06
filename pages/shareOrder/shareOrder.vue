<template>
	<view>
		<view class="box1">
			<view class="input-box">
				<view class="span">姓名</view>
				<input type="text" value="" placeholder="请填写收货人姓名"/>
			</view>
			<view class="input-box">
				<view class="span">手机</view>
				<input type="text" v-model="mobile" placeholder="请输入手机号" />
				<view v-if="!state" class="code-btn cu-btn round line-red" @tap="getCode">{{getCodeTxt}}</view>
				<view v-if="state" class="code-btn time">{{time}}s</view>
			</view>
			<view class="input-box">
				<view class="span">验证码</view>
				<input type="number" v-model="code" placeholder="请输入验证码" />
				<view v-if="!isBind" class="code-btn code-btn cu-btn round line-red">绑定手机号</view>
				<view v-if="isBind" class="code-btn time">綁定成功</view>
			</view>
			<view class="input-box">
				<view class="span">地址</view>
				<picker style="flex: 1;padding: 0 20upx;" mode="region" @change="chooseAddress">
					<view>{{pickerAddress}}</view>
				</picker>
			</view>
			<view class="input-box">
				<view class="span">详细地址</view>
				<input type="text" value="" placeholder="请填写详细地址"/>
			</view>
			<view class="input-box">
				<view class="span">备注</view>
				<input type="text" value="" placeholder="请填写备注"/>
			</view>
		</view>
		<view class="box1">
			<view style="font-size: 34upx;font-weight: 600;">商品信息</view>
			<view class="top" v-for="(item,index) in goodsList" :key='index'>
				<view class="pic">
					<image :src="item.original_image" mode="widthFix"></image>
				</view>
				<view class="con">
					<view class="name">{{item.goods_name}}</view>
					<view class="des">{{item.goods_remark}}</view>
					<view class="des" v-if="item.key_name">规格:{{item.key_name}}</view>
				</view>
				<view class="price-box">
					<view class="price">¥ {{item.shop_price}}</view>
					<view class="numbox">
						<view class="btn" @tap.stop="reduce(index)">-</view>
						<view style="border-left: 1upx solid #888;border-right: 1upx solid #888;width: 50upx;text-align: center;font-size: 20upx;">{{item.num}}</view>
						<view class="btn" @tap.stop="add(index)">+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-bottom">
			<view class="money-msg">
				小计: <text style="font-size: 36upx;font-weight: 600;color: red;">¥{{totalPrice}}</text>
			</view>
			<view class="pay-btn">微信支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				state: false, //是否开启倒计时,
				time: 70, //总时间，单位秒
				getCodeTxt: '获取验证码',
				isBind:false,
				pickerAddress:'请选择省市区',
				goodsList:[],
				totalPrice: null,
			}
		},
		onLoad() {
			this.goodsList = uni.getStorageSync('order')
			this.countPrice()
		},
		methods: {
			
			//点击获取验证码
			getCode() {
				if (this.mobile == '') {
					this.showToast('请输入手机号码')
					return
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/UserCenter/sendBindActiveCode',
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						phone: this.mobile
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.showToast('验证码已发送')
							//开始倒计时
							this.state = true;
							//执行倒计时
							this.checkingTime();
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//倒计时
			checkingTime() {
				var _this = this
				var timer = setInterval(function() {
					_this.time--
					if (_this.time <= 0) {
						clearInterval(timer)
						_this.state = false;
						_this.getCodeTxt = '重新获取'
						_this.time = 70
					}
				}, 1000)
			},
			//绑定手机号
			bindMobile() {
				if (this.mobile == '') {
					this.showToast('输入手机号不能为空')
					return
				} else if (this.code == '') {
					this.showToast('验证码不能为空')
					return
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/bindUserPnone",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						phone: this.mobile,
						active_code: this.code
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.isBind = true
							uni.setStorageSync('mobile', this.mobile)
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			reduce(i) {
				if (this.goodsList[i].num == 1) {
					return
				}
				this.goodsList[i].num--
				this.countPrice()
			},
			add(i) {
				this.goodsList[i].num++
				this.countPrice()
			},
			//计算价格
			countPrice() {
				let totalPrice = 0
				for (let i = 0; i < this.goodsList.length; i++) {
					this.goodsList[i].shop_price = parseFloat(this.goodsList[i].shop_price).toFixed(2)
					totalPrice += parseFloat(this.goodsList[i].num) * parseFloat(this.goodsList[i].shop_price)
				}
				this.totalPrice = totalPrice.toFixed(2)
			}
		}
	}
</script>

<style>
	page{
		background-color: #f1f1f1;
	}
	.input-box{
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #F1F1F1;
		height: 80upx;
		line-height: 80upx;
	}
	.input-box .span{
		width: 120upx;
	}
	.input-box input{
		height: 100%;
		flex: 1;
		padding: 0 20upx;
	}
	.code-btn{
		margin: 10upx 0;
		line-height: 60upx;
		height: 60upx;
	}
	
	.box1{
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		margin: 30upx;
		padding: 30upx;
		background-color: #fff;
	}
	.top {
		display: flex;
		justify-content: space-between;
		padding: 20upx 0;
	}
	
	.pic {
		width: 140upx;
		height: 140upx;
		border-radius: 20upx;
		overflow: hidden;
	}
	
	.pic image {
		width: 100%;
		display: block;
	}
	
	.price-box {
		position: relative;
	}
	
	.numbox {
		line-height: 40upx;
		border: 1upx solid #888;
		border-radius: 8upx;
		display: flex;
		font-size: 24upx;
		position: absolute;
		bottom: 0;
		right: 0;
	}
	
	.numbox>.btn {
		width: 40upx;
		text-align: center;
	}
	
	.con {
		margin: 0 20upx;
		flex: 1;
	}
	
	.con .name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		line-height: 40upx;
	}
	
	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 22upx;
		color: #888;
		line-height: 40upx;
	}
	
	.price {
		text-align: right;
		line-height: 40upx;
	}
	
	.order-bottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		line-height: 100upx;
		height: 100upx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
	}
	.money-msg{
		padding: 0 30upx;
	}
	.pay-btn{
		width: 220upx;
		text-align: center;
		color: #fff;
		background-color: red;
	}
</style>
