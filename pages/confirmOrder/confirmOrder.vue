<template>
	<view>
		<view class="address-box bg-white" @tap="toChooseAddress">
			<image class="dizhi" src="../../static/index/dizhi_03.png"></image>
			<view class="msg" v-if="showAddress">
				<view class="name" style="font-size: 30upx;">{{addressMsg.name}}<text style="font-size: 24upx;color: #888;margin-left: 20upx;">{{addressMsg.mobile}}</text></view>
				<view class="address" style="font-size: 26upx;">{{addressMsg.address}}</view>
			</view>
			<view class="msg" v-else>请选择收货地址</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view class="order bg-white">
			<view class="top" v-for="(item,index) in goodsList" :key='index'>
				<view class="pic" :style="'background-image: url('+item.original_image+');'"></view>
				<view class="con">
					<view class="name">{{item.goods_name}}</view>
					<view class="des">{{item.goods_remark}}</view>
				</view>
				<view class="price-box">
					<view class="price">¥ {{item.shop_price}}</view>
					<view class="numbox">
						<view class="btn" @tap.stop="reduce(index)">
							<text class="lg cuIcon-move"></text>
						</view>
						<view style="border-left: 1upx solid #ccc;border-right: 1upx solid #ccc;width: 60upx;text-align: center;font-size: 26upx;">{{item.num}}</view>
						<view class="btn" @tap.stop="add(index)">
							<text class="lg cuIcon-add"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item">
					<view>配送方式</view>
					<view style="padding-left: 50upx;" @tap="choosePlan">
						<text>{{pickerTxt}}</text>
						<text style="padding-left: 10upx;" class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
				<view class="item" v-if="showOptions">
					<view>优品券</view>
					<view style="padding-left: 50upx;" @tap="showTicketsModel">
						<text v-if="showCouponTxt" style="color: red;">- ¥ {{selectedCoupon.money}}</text>
						<text v-else>选择优品券</text>
						<text style="padding-left: 10upx;" class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
				<view class="item1" style="display: flex;justify-content: left;" v-if="showOptions&&showUsePoint">
					<view>
						<text v-if="canUsePoints" class="lg text-red cuIcon-squarecheckfill square" @tap="changeUsePoints"></text>
						<text v-else class="lg text-gray cuIcon-square square" @tap="changeUsePoints"></text>
					</view>
					<text @tap="changeUsePoints">使用
						<text style="color: red;padding:0 5upx">{{exchangePoint}}</text>UP抵扣<text style="color: red;padding:0 5upx">¥ {{exchangePrice}}</text></text>
				</view>
				<view class="item1" style="display: flex;justify-content: left;" v-if="showOptions&&myBalance!=0">
					<view>
						<text v-if="canUseBalance" class="lg text-red cuIcon-squarecheckfill square" @tap="changeUseBalance"></text>
						<text v-else class="lg text-gray cuIcon-square square" @tap="changeUseBalance"></text>
					</view>
					<text @tap="changeUseBalance">使用账户余额</text>
					<input v-if="canUseBalance" class="balance-input" type="digit" v-model="useBalance" placeholder="最多带两位小数" @blur="checkBalance" />
					<text style="font-size: 22upx;" @tap="changeUseBalance">(您当前余额<text style="color: red;padding:0 5upx">{{myBalance}}</text>元)</text>
				</view>
				<view class="item">
					<view>订单备注</view>
					<view>
						<input style="height: 100%;box-sizing: border-box;text-align: right;color: #888;" type="text" :v-model="user_note"
						 placeholder="选填" />
					</view>
				</view>
			</view>
		</view>
		<view class="order-msg bg-white" v-if="showOptions">
			<view class="msg-item">
				<view>商品金额</view>
				<view>¥ {{totalPrice}}</view>
			</view>
			<view class="msg-item">
				<view>优品券</view>
				<view>- ¥ {{discount}}</view>
			</view>
			<view class="msg-item">
				<view>UP支付</view>
				<view>- ¥ {{points}}</view>
			</view>
			<view class="msg-item">
				<view>余额支付</view>
				<view>- ¥ {{balance}}</view>
			</view>
		</view>
		<view style="line-height: 50upx;margin: 20upx 40upx 180upx;">
			<text v-if="isAgree" class="lg text-red cuIcon-squarecheckfill square" @tap="changeAgree"></text>
			<text v-else class="lg text-gray cuIcon-square square" @tap="changeAgree"></text>
			<text @tap="changeAgree">我已阅读，并同意</text>
			<text style="color: #02B0EF;" @tap="showAgreementModel">《平台用户服务协议》</text>
		</view>
		<view class="cart-bottom" v-if="cartList.length!=0">
			<view style="color: #888;">
				<text style="padding-left: 10upx;">总计<text style="padding: 0 5upx;">{{totalNum}}</text>件</text>
				<text style="padding-left: 10upx;">需微信支付<text style="padding-left: 15upx;color: red;">¥ {{finalPrice}}</text></text>
			</view>
			<view class="">
				<button class="cu-btn bg-red round shadow-blur" style="width: 240upx;background-color: red;" @tap="toOrderPay">提交订单</button>
			</view>
		</view>
		<view class="cu-modal" :class="modelName=='Agreement'?'show':''">
			<view class="cu-dialog phone-box2">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view>
					<view style="margin-bottom: 30upx;font-size: 34upx;font-weight: 600;">平台用户服务协议</view>
					<scroll-view style="height: 500upx;" scroll-y="true" catchtouchmove='true'>
						<rich-text :nodes="xieyi"></rich-text>
					</scroll-view>
				</view>
				<button class="cu-btn bg-red round shadow-blur" style="background-color:#F23027;width: 300upx;height: 80upx;margin-top: 30upx;"
				 @tap="closeModel">我知道了</button>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modelName=='bottomModal'?'show':''">
			<view class="cu-dialog myradius">
				<view class="model-top">
					<view style="font-size: 34upx;font-weight: 600;">优品券</view>
					<text class="lg text-gray cuIcon-roundclose" style="font-size: 40upx;" @tap="closeModel"></text>
				</view>
				<scroll-view scroll-y="true" class="bottom-scroll" catchtouchmove='true' v-if="coupons.length!=0">
					<view style="padding: 20upx 30upx;">
						<view class="tickets" v-for="(item,index) in coupons" :key="index" @tap="chooseCoupon(index)">
							<view style="width: 60upx;position: relative;">
								<text :class="item.checked?'cuIcon-roundcheckfill red':'cuIcon-round'" class="lg text-gray check"></text>
							</view>
							<view class="tic-left">¥<text style="font-size: 60upx;font-weight: 600;margin-left: 10upx;">{{item.money}}</text></view>
							<view class="tic-right">
								<view style="line-height: 40upx;font-size: 28upx;font-weight: 600;">{{item.name}}</view>
								<view style="font-size: 24upx;color: #888;line-height: 40upx;">满<text style="padding: 0 6upx;">¥{{item.condition}}</text>可用</view>
								<view style="font-size: 24upx;color: #888;line-height: 40upx;">{{handleTime(item.use_start_time)}}-{{handleTime(item.use_end_time)}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view v-else style="color: #aaa;line-height: 80upx;height: 800upx; font-size: 32upx;display: flex;justify-content: center;">暂无可用优品券，<text
					 style="color: blue;" @tap="toMyCoupon">去查看</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modelName: '',
				addressMsg: null,
				showAddress: false,
				goodsList: [],
				plan: ['快递', '自提'],
				pickerTxt: '快递',
				totalPrice: null,
				totalNum: null,
				user_note: null, //备注
				isAgree: false,
				canUsePoints: false,
				canUseBalance: false,
				xieyi: null,
				chooseIndex: 0,
				showOptions: false,
				discount: 0.00,
				points: 0.00,
				balance: 0.00,
				finalPrice: null,
				coupons: null,
				selectedCoupon: null,
				showCouponTxt: false,
				myPoints: 0,
				myBalance: 0,
				exchangePoint: 0,
				exchangePrice: 0,
				rate: 0,
				bili: 0,
				showUsePoint: true,
				useBalance: 0
			}
		},
		onLoad() {
			this.getDefaultAddress()
			//订单商品数据显示
			this.goodsList = uni.getStorageSync('order')
			this.countPrice()
			//获取优品券列表
			this.getCardList()
			this.getPoints()
		},
		onShow() {
			if (uni.getStorageSync("shop_id") == 1) {
				this.showOptions = true
			} else {
				this.showOptions = false
			}
			console.log(this.addressMsg)
			//订单地址显示
			if (uni.getStorageSync('selectAddress')) {
				this.addressMsg = uni.getStorageSync('selectAddress')
				this.showAddress = true
			}
			uni.removeStorageSync('selectAddress')
			this.isAgree = uni.getStorageSync('isAgree')
		},
		methods: {
			//查看优惠券列表
			toMyCoupon() {
				uni.navigateTo({
					url: "../discountTickets/discountTickets"
				})
			},
			checkBalance() {
				if (parseFloat(this.useBalance) > parseFloat(this.myBalance)) {
					this.showToast('您的余额不足，请重新输入')
					this.useBalance = 0
				}
			},
			//获取我的积分
			getPoints() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/getScore',
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.myBalance = res.data.data.user_money
							this.myPoints = parseFloat(res.data.data.pay_points)
							this.rate = parseFloat(res.data.data.rate)
							this.bili = parseFloat(res.data.data.bili)
							this.count()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//计算可使用的积分折扣
			count() {
				let maxPoints = parseFloat(this.totalPrice) * this.rate * this.bili
				// console.log(maxPoints)
				if (this.myPoints >= maxPoints) {
					// console.log(1111)
					this.exchangePoint = maxPoints
					this.exchangePrice = (this.exchangePoint / this.rate).toFixed(2)
				} else if (this.myPoints >= this.rate) {
					// console.log(2222)
					this.exchangePoint = parseInt((this.myPoints) / 1000) * 1000
					this.exchangePrice = (this.exchangePoint / this.rate).toFixed(2)
				} else {
					// console.log(3333)
					this.exchangePoint = this.exchangePrice = 0
					this.showUsePoint = false
				}
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
			},
			showTicketsModel() {
				this.modelName = "bottomModal"
				this.getCardList()
			},
			//获取优惠券列表
			getCardList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/coupon',
					data: {
						token: uni.getStorageSync('token'),
						money: this.totalPrice
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.coupons = res.data.data
							this.getDefaultSelectedCoupon()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//默认勾选上次选中的优惠券
			getDefaultSelectedCoupon(){
				if(this.coupons.length==0){
					return
				}
				let couponIds = this.coupons.map(item=>item.coupon_id)
				// console.log(couponIds)
				if(this.selectedCoupon){
					// console.log(this.selectedCoupon.coupon_id)
					if(couponIds.indexOf(this.selectedCoupon.coupon_id)!=-1){
						let selectCouponIndex = couponIds.indexOf(this.selectedCoupon.coupon_id)
						this.coupons[selectCouponIndex].checked = true
					}
				}
			},
			//减少购买商品数量
			reduce(i) {
				if (this.goodsList[i].num == 1) {
					return
				}
				this.goodsList[i].num--
				this.canUsePoints = this.canUseBalance = this.showCouponTxt = false
				this.selectedCoupon = null
				this.points = this.discount = this.balance = 0
				this.countPrice()
				this.count()
			},
			//增加购买商品数量
			add(i) {
				this.goodsList[i].num++
				this.canUsePoints = this.canUseBalance = this.showCouponTxt = false
				this.selectedCoupon = null
				this.points = this.discount = this.balance = 0
				this.countPrice()
				this.count()
			},
			closeModel() {
				this.modelName = ''
			},
			//勾选协议
			changeAgree() {
				this.isAgree = !this.isAgree
				uni.setStorageSync('isAgree', this.isAgree)
			},
			//点击选择优惠券
			chooseCoupon(index) {
				//勾选选择的优惠券
				for(let i = 0;i<this.coupons.length;i++){
					if(index!=i){
						this.coupons[i].checked = false
					}
					
				}
				this.coupons[index].checked=!this.coupons[index].checked
				if(this.coupons[index].checked){
					this.selectedCoupon = this.coupons[index]
					this.showCouponTxt = true
					this.discount = this.selectedCoupon.money
				}else{
					this.selectedCoupon = null
					this.showCouponTxt = false
					this.discount = 0
				}			
				this.$forceUpdate()
				// console.log(this.selectedCoupon)
				
				// console.log(parseFloat(this.totalPrice-this.points),parseFloat(this.discount))
				if (parseFloat(this.totalPrice-this.points) < parseFloat(this.discount)) {
					this.canUsePoints = this.canUseBalance = false
					this.points = this.balance = 0
				}
				if (this.canUsePoints == true && this.canUseBalance == false) {
					this.points = this.exchangePrice
					this.balance = 0
				} else if (this.canUsePoints && this.canUseBalance) {
					this.points = this.exchangePrice
					this.getFinalUseBalance()
				} else if (this.canUsePoints == false && this.canUseBalance == true) {
					this.points = 0
					this.getFinalUseBalance()
				} else {
					this.points = 0
					this.balance = 0
				}
				this.minusDiscount()
			},
			//使用积分
			changeUsePoints() {
				if(!this.canUsePoints&&!this.canUseBalance){
					// console.log(this.finalPrice,this.exchangePrice)
					if (parseFloat(this.finalPrice) < parseFloat(this.exchangePrice)) {
						this.showToast('使用上优品抵扣后价格不可小于0')
						return
					}
				}
				this.canUsePoints = !this.canUsePoints
				if (this.canUsePoints) {
					this.points = this.exchangePrice
				} else {
					this.points = 0
				}

				if (this.selectedCoupon && this.canUseBalance == false) {
					this.discount = this.selectedCoupon.money
					this.balance = 0
				} else if (this.selectedCoupon && this.canUseBalance == true) {
					this.discount = this.selectedCoupon.money
					this.getFinalUseBalance()
				} else if (!this.selectedCoupon && this.canUseBalance == false) {
					this.discount = 0
					this.balance = 0
				} else {
					this.discount = 0
					this.getFinalUseBalance()
				}
				this.minusDiscount()
			},
			//使用余额
			changeUseBalance() {
				this.canUseBalance = !this.canUseBalance
				if (this.canUseBalance) {
					if (this.selectedCoupon && this.canUsePoints == false) {
						this.discount = this.selectedCoupon.money
						this.points = 0
					} else if (this.selectedCoupon && this.canUsePoints == true) {
						this.discount = this.selectedCoupon.money
						this.points = this.exchangePrice
					} else if (!this.selectedCoupon && this.canUsePoints == false) {
						this.discount = 0
						this.points = 0
					} else {
						this.discount = 0
						this.points = this.exchangePrice
					}
					this.getFinalUseBalance()
				} else {
					this.balance = 0
				}
				this.minusDiscount()
			},
			//计算需要使用的余额
			getFinalUseBalance() {
				let finalUseBalance = (this.totalPrice - this.points - this.discount).toFixed(2)
				if (parseFloat(this.myBalance) >= parseFloat(finalUseBalance)) {
					this.balance = this.useBalance = finalUseBalance
				} else {
					this.balance = this.useBalance = this.myBalance
				}
			},
			//弹出协议框
			showAgreementModel() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/article/detail",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						article_id: 60
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.xieyi = res.data.data.content
							return
						}
						this.showToast(res.data.msg)
					}
				})
				this.modelName = 'Agreement'
			},
			//去支付订单	
			toOrderPay() {
				console.log(this.finalPrice)
				if (this.finalPrice < 0) {
					this.showToast('订单价格不能小于0')
					return
				}
				console.log(this.pickerTxt)
				uni.showLoading({
					title: "下单中"
				})
				if (this.pickerTxt == '快递') {
					if (!this.showAddress) {
						this.showToast('请选择收货地址')
						return
					}
					if (!this.isAgree) {
						this.showToast('请阅读并勾选《平台用户协议》')
						return
					}
					uni.setStorageSync('order', this.goodsList)
					let goodsList = []
					for (let i = 0; i < this.goodsList.length; i++) {
						goodsList.push('goods_id=' + this.goodsList[i].goods_id + ',goods_num=' + this.goodsList[i].num + ',item_id=' +
							this.goodsList[i].item_id)
					}
					console.log(goodsList)
					this.setheader()
					uni.request({
						url: this.websiteUrl + "/api/Order/createOrder",
						data: {
							token: uni.getStorageSync('token'),
							goods: goodsList,
							address_id: this.addressMsg.address_id,
							user_note: this.user_note,
							shipping_type: 1,
							shop_id: uni.getStorageSync('shop_id'),
							coupon: this.selectedCoupon ? this.selectedCoupon.coupon_id ? this.selectedCoupon.coupon_id : '' : '',
							point: this.canUsePoints ? this.exchangePoint : '',
							balance: this.canUseBalance ? this.useBalance : ''
						},
						method: "POST",
						header: this.header,
						success: (res) => {
							console.log(res.data)
							uni.hideLoading()
							if (res.data.status == 0) {
								let order_money = res.data.data.goods_price.toFixed(2)
								let order_id = res.data.data.order_id
								uni.redirectTo({
									url: '../orderPay/orderPay?order_money=' + order_money + '&order_id=' + order_id
								})
								return
							}
							if (res.data.status == 100) {
								uni.redirectTo({
									url: '../paySuccess/paySuccess?type=1&orderid=' + res.data.data.order_id
								})
								return
							}
							this.showToast(res.data.msg)
						},
						fail: () => {
							this.showToast('系统繁忙，请稍后重试！')
						}
					})
				} else if (this.pickerTxt == '自提') {
					if (!this.isAgree) {
						this.showToast('请阅读并勾选《平台用户协议》')
						return
					}
					uni.setStorageSync('order', this.goodsList)
					let goodsList = []
					for (let i = 0; i < this.goodsList.length; i++) {
						goodsList.push('goods_id=' + this.goodsList[i].goods_id + ',goods_num=' + this.goodsList[i].num + ',item_id=' +
							this.goodsList[i].item_id)
					}
					console.log(goodsList)
					this.setheader()
					uni.request({
						url: this.websiteUrl + "/api/Order/createOrder",
						data: {
							token: uni.getStorageSync('token'),
							goods: goodsList,
							user_note: this.user_note,
							shipping_type: 2,
							shop_id: uni.getStorageSync('shop_id'),
							coupon: this.selectedCoupon ? this.selectedCoupon.coupon_id ? this.selectedCoupon.coupon_id : '' : '',
							point: this.canUsePoints ? this.exchangePoint : '',
							balance: this.canUseBalance ? this.useBalance : ''
						},
						method: "POST",
						header: this.header,
						success: (res) => {
							console.log(res.data)
							uni.hideLoading()
							if (res.data.status == 0) {
								let order_money = res.data.data.goods_price.toFixed(2)
								let order_id = res.data.data.order_id
								uni.redirectTo({
									url: '../orderPay/orderPay?order_money=' + order_money + '&order_id=' + order_id
								})
								return
							}
							if (res.data.status == 100) {
								uni.redirectTo({
									url: '../paySuccess/paySuccess?type=1&orderid=' + res.data.data.order_id
								})
								return
							}
							this.showToast(res.data.msg)
						},
						fail: () => {
							this.showToast('系统繁忙，请稍后重试！')
						}
					})
				}
			},
			//去选择地址
			toChooseAddress() {
				uni.setStorageSync('order', this.goodsList)
				uni.navigateTo({
					url: "../myAddress/myAddress?fromView=order"
				})
			},
			//判断当前用户是否设置默认地址
			getDefaultAddress() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserAddress/addressList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							let addressList = res.data.data.lists
							if (addressList.length == 0) {
								return
							}
							for (var i = 0; i < addressList.length; i++) {
								if (addressList[i].is_default == 1) {
									this.addressMsg = {
										address_id: addressList[i].address_id,
										name: addressList[i].consignee,
										mobile: addressList[i].mobile,
										address: addressList[i].province + addressList[i].city + addressList[i].district + addressList[i].address
									}
								}
							}
							//没有设置默认地址
							if (this.addressMsg) {
								this.showAddress = true
							} else {
								this.showAddress = false
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//选择配送方式
			choosePlan() {
				// console.log(e)
				uni.showActionSheet({
					itemList: this.plan,
					success: (res) => {
						this.pickerTxt = this.plan[res.tapIndex]
					}
				})
			},
			//计算商品总价价格（不含优惠券/积分）
			countPrice() {
				let totalNum = 0
				let totalPrice = 0
				for (let i = 0; i < this.goodsList.length; i++) {
					this.goodsList[i].shop_price = parseFloat(this.goodsList[i].shop_price).toFixed(2)
					totalNum += parseFloat(this.goodsList[i].num)
					totalPrice += parseFloat(this.goodsList[i].num) * parseFloat(this.goodsList[i].shop_price)
				}
				this.totalNum = totalNum
				this.totalPrice = totalPrice.toFixed(2)
				this.minusDiscount()
			},
			//扣除折扣
			minusDiscount() {
				this.finalPrice = (this.totalPrice - this.discount - this.points - this.balance).toFixed(2)
			}
		},
		watch: {
			useBalance: function(val) {
				this.balance = this.useBalance
				this.minusDiscount()
			}
		}

	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.balance-input {
		height: 50upx;
		margin: 10upx;
		border: 1upx solid #ccc;
		padding: 0;
		text-align: center;
		font-size: 26upx;
		width: 160upx;
		border-radius: 10upx;
	}

	.square {
		padding-right: 5upx;
		font-size: 34upx;
	}

	.underline::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 6upx;
		background-color: #E50D32;
		left: 0;
		bottom: 0;
	}

	.tickets {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20upx;
	}
	.check{
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		font-size: 40upx;
	}
	

	.tic-left {
		width: 35%;
		background-color: #54D3C5;
		height: 180upx;
		line-height: 180upx;
		color: #fff;
		font-size: 34upx;
	}

	.tic-right {
		flex: 1;
		text-align: left;
		padding: 10upx 20upx;
		background-color: #fff;
	}

	.bottom-scroll {
		height: 800upx;
	}

	.model-nav {
		display: flex;
		padding-bottom: 20upx;
		background-color: #fff;
		justify-content: space-around;
	}

	.model-nav>view {
		width: 300upx;
		text-align: center;
		line-height: 60upx;
		position: relative;
	}

	.cu-dialog.myradius {
		border-top-left-radius: 30upx !important;
		border-top-right-radius: 30upx !important;
		overflow: hidden;
	}

	.model-top {
		display: flex;
		justify-content: space-between;
		line-height: 60upx;
		padding: 15upx 30upx;
		background-color: #fff;
	}

	,
	.form {
		text-align: left;
	}

	.form .input-box {
		display: flex;
		justify-content: space-between;
		margin: 30upx 0;
		border-bottom: 1upx solid #F1F1F1;
		height: 80upx;
		line-height: 80upx;
	}

	.form .txt {
		display: flex;
		justify-content: space-between;
		color: #888;
	}

	.input-box text {
		font-size: 40upx;
	}

	.input-box i {
		font-size: 40upx;
		color: #888;
	}

	/* input {
		flex: 1;
		padding: 0 15upx;
		height: 100%;
		box-sizing: border-box;
	} */

	.form .txt view {
		font-size: 24upx;
	}

	.code-btn {
		width: 180upx;
		height: 60upx;
		line-height: 60upx;
		font-size: 24upx;
		margin: 10upx 0;
		padding: 0;
		text-align: center;
		color: red;
	}

	.address-box {
		margin: 40upx 30upx 30upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.2);
		border-radius: 20upx;
		padding: 30upx 70upx 30upx 90upx;
		position: relative;
	}

	.address-box>view {
		line-height: 40upx;
	}

	.address-box>text {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.address-box>.dizhi {
		position: absolute;
		left: 30upx;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		top: 50%;
		transform: translateY(-50%);
	}

	.address-box>text:nth-child(3) {
		right: 30upx;
		font-size: 32upx;
	}

	.address {
		font-size: 22upx;
		color: #666;
	}

	.order,
	.order-msg {
		margin: 0 30upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.2);
		border-radius: 20upx;
		padding: 30upx;
		font-size: 30upx;
	}

	.order-msg {
		margin-top: 30upx;
	}

	.order-msg .msg-item {
		line-height: 60upx;
		display: flex;
		justify-content: space-between;
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
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		box-shadow: 0 0 10upx 2upx #eee;
	}

	.pic image {
		width: 100%;
		display: block;
	}

	.price-box {
		position: relative;
	}

	.numbox {
		line-height: 50upx;
		border: 1upx solid #ccc;
		border-radius: 8upx;
		display: flex;
		font-size: 24upx;
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.numbox>.btn {
		width: 50upx;
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

	.list {
		margin-top: 20upx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		line-height: 70upx;
		height: 70upx;
	}

	.item1 {
		line-height: 70upx;
		height: 70upx;
		font-size: 26upx;
	}

	.item>view {
		font-size: 30upx;
		box-sizing: border-box;
	}

	.total-msg {
		text-align: right;
		font-size: 26upx;
		margin-top: 30upx;
	}

	.submit {
		text-align: center;
		background-color: red !important;
		color: #fff;
	}

	.phone-box {
		padding: 30upx;
	}

	.phone-box2 {
		width: 80%;
		padding: 30upx 60upx;
	}

	.cart-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		border-top: 1upx solid #f5f5f5;
		line-height: 100upx;
		height: 100upx;
		padding: 0 30upx;
		box-sizing: border-box;
		text-align: right;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
	}
</style>
