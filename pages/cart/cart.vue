<template>
	<view>
		<view>
			<view class="null" v-if="isNull">
				<image src="../../static/index/timg.gif" mode="widthFix"></image>
				<view style="display: flex;justify-content: center;">
					<text style="margin-right: 10upx;">购物车空了，</text>
					<text style="color:#55AFFD;border-bottom: 1upx solid #55AFFD" @tap="toShopping">去逛逛</text>
				</view>
			</view>
			<view class="shop_list" v-else>
				<view class="shop_list_item" v-for="(item,index1) in cartList" :key="index1">
					<view class="listItem_top" @tap="selectShop(index1)">
						<text :class="item.shopChecked?'cuIcon-roundcheckfill red':'cuIcon-round'" class="lg text-gray check"></text>
						<view class="shop_name" style="font-size: 32upx;font-weight: 800;">店铺：{{item.shop_name}}</view>
						<text class="lg cuIcon-delete text-gray delete" @tap.stop="showDelModel(index1,item.id)"></text>
					</view>
					<view class="shop_goods" v-for="(good,index2) in item.goods" :key="index2">
						<view class="goods_item" @longtap="longTapDelete(index1,index2)">
							<text :class="good.goodsChecked?'cuIcon-roundcheckfill red':'cuIcon-round'" class="lg text-gray check" @tap="selectGoods(index1,index2)"></text>
							<view class="goods_pic" @tap="selectGoods(index1,index2)" :style="'background-image: url('+good.original_img+');'">
							</view>
							<view class="goods_msg">
								<view class="goods_name">{{good.goods_name}}</view>
								<view class="des">{{good.key_name?good.key_name:good.goods_remark}}</view>
								<view class="goodsMsg_bottom">
									<view class="good_price">¥ {{good.price}}</view>
									<view class="numbox">
										<view class="btn" @tap.stop="reduce(index1,index2)">
											<text class="lg text-gray cuIcon-move"></text>
										</view>
										<view style="border-left: 1upx solid #ccc;border-right: 1upx solid #ccc;width:60upx;text-align: center;font-size: 22upx;">{{good.goods_num}}</view>
										<view class="btn" @tap.stop="add(index1,index2)">
											<text class="lg text-gray cuIcon-add"></text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cart-bottom" v-if="cartList.length!=0">
				<view style="color: #888;">
					<text class="clearAll" @tap="showClearModel">
						<text class="lg cuIcon-delete text-gray"></text>
						<text>清空</text>
					</text>
					<text style="padding-left: 10upx;">总计<text style="padding: 0 5upx;">{{totalCount}}</text>件</text>
					<text style="padding-left: 10upx;">合计<text style="padding-left: 15upx;color: red;">¥ {{totalPrice}}</text></text>
				</view>
				<view class="">
					<button class="cu-btn round shadow-blur" style="width: 240upx;color: #fff;background-color: red;" @tap="toConfirmOrder">立即结算</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showModel=='cartModel'?'show':''">
			<view class="cu-dialog cart-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;font-weight: 800;font-size: 34upx;">确认要删除该门店的所有购物车商品吗？</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="deleteShop(delShopId)">确定</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showModel=='clearModel'?'show':''">
			<view class="cu-dialog cart-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;font-weight: 800;font-size: 34upx;">确认要清空购物车吗？</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="sureClear">确定</button>
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
				cartList: [],
				totalPrice: 0,
				totalCount: 0,
				showModel: '',
				deleteIndex: -1,
				isLogin: false,
				delShopIndex: null,
				delGoodsIndex: null,
				delShopId: null
			}
		},
		onShow() {
			if (!uni.getStorageSync('token')) {
				uni.showToast({
					title: "请先授权登录",
					icon: "none",
					success: () => {
						setTimeout(function() {
							uni.switchTab({
								url: "../mine/mine"
							})
						}, 1000)
					}
				})
				return
			}
			this.getCartList()
		},
		methods: {
			toShopping() {
				uni.switchTab({
					url: "../indexPage/indexPage"
				})
			},
			toLogin() {
				uni.navigateTo({
					url: "../wxLogin/wxLogin"
				})
			},
			selectGoods(i1, i2) {
				console.log('点击了第 ' + (i1 + 1) + ' 家店铺第 ' + (i2 + 1) + ' 件商品')
				//给点击的店铺商品取反，其他店铺及商品全部不勾选
				for (let i = 0; i < this.cartList.length; i++) {
					if (i != i1) {
						this.cartList[i].shopChecked = false
						for (let j = 0; j < this.cartList[i].goods.length; j++) {
							this.cartList[i].goods[j].goodsChecked = false
						}
					}
				}
				this.cartList[i1].goods[i2].goodsChecked = !this.cartList[i1].goods[i2].goodsChecked
				//如果取消勾选当前商品，则取消勾选当前店铺
				if (!this.cartList[i1].goods[i2].goodsChecked) {
					this.cartList[i1].shopChecked = false
				} else {
					// console.log(shop_id)
					uni.setStorageSync('shop_id', this.cartList[i1].id)
				}
				console.log(this.cartList)
				//如果当前店铺的商品全勾选，则勾选当前店铺
				let count = 0
				for (let i = 0; i < this.cartList[i1].goods.length; i++) {
					if (this.cartList[i1].goods[i].goodsChecked) {
						count++
					}
				}
				if (count == this.cartList[i1].goods.length) {
					this.cartList[i1].shopChecked = true
					// console.log(count)
				}
				this.$forceUpdate()
				this.countTotalPrice()
			},
			selectShop(index) {
				// console.log(index)
				for (let i = 0; i < this.cartList.length; i++) {
					if (i != index) {
						this.cartList[i].shopChecked = false
					}
				}
				this.cartList[index].shopChecked = !this.cartList[index].shopChecked
				if (this.cartList[index].shopChecked) {
					// console.log(shop_id)
					uni.setStorageSync('shop_id', this.cartList[index].id)
				}
				for (let i = 0; i < this.cartList.length; i++) {
					for (let j = 0; j < this.cartList[i].goods.length; j++) {
						this.cartList[i].goods[j].goodsChecked = this.cartList[i].shopChecked
					}
				}
				// console.log(this.cartList)
				this.$forceUpdate()
				this.countTotalPrice()
			},
			//计算总价
			countTotalPrice() {
				let totalPrice = 0
				let totalCount = 0
				for (let i = 0; i < this.cartList.length; i++) {
					for (let j = 0; j < this.cartList[i].goods.length; j++) {
						if (this.cartList[i].goods[j].goodsChecked) {
							totalCount += parseFloat(this.cartList[i].goods[j].goods_num)
							totalPrice += parseFloat(this.cartList[i].goods[j].price * this.cartList[i].goods[j].goods_num)
						}
					}
				}
				// console.log(totalPrice)
				this.totalCount = totalCount
				this.totalPrice = totalPrice.toFixed(2)
			},
			showDelModel(index, id) {
				this.delShopIndex = index
				this.delShopId = id
				this.showModel = "cartModel"
			},
			showClearModel() {
				this.showModel = "clearModel"
			},
			//减少购物车商品数量
			reduce(i1, i2) {
				if (this.cartList[i1].goods[i2].goods_num == 1) {
					// this.showModel = "cartModel"
					// this.delShopIndex = i1
					// this.delGoodsIndex = i2
					return
				}
				this.cartList[i1].goods[i2].goods_num--
				this.changeNum(i1, i2)
				this.countTotalPrice()
			},
			//添加购物车商品数量
			add(i1, i2) {
				this.cartList[i1].goods[i2].goods_num++
				this.changeNum(i1, i2)
				this.countTotalPrice()
			},
			//修改购物车商品数量
			changeNum(i1, i2) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Cart/changeNum",
					data: {
						token: uni.getStorageSync('token'),
						"cart_id": this.cartList[i1].goods[i2].id,
						"goods_num": this.cartList[i1].goods[i2].goods_num
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status != 0) {
							this.showToast(res.data.msg)
						}
					}
				})
			},
			//长按删除单个商品
			longTapDelete(i1, i2) {
				uni.showActionSheet({
					itemList: ['删除'],
					success: (res) => {
						if (res.tapIndex == 0) {
							this.delShopIndex = i1
							this.delGoodsIndex = i2
							this.deleteGoods()
						}
					},
				})
			},
			//从购物车删除单个商品
			deleteGoods() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Cart/delete",
					data: {
						token: uni.getStorageSync('token'),
						cart_id: this.cartList[this.delShopIndex].goods[this.delGoodsIndex].id,
						shop_id: this.cartList[this.delShopIndex].shop_id
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '操作成功！') {
							this.showToast('该商品已删除')
							this.cartList[this.delShopIndex].goods.splice(this.delGoodsIndex, 1)
							if (this.cartList[this.delShopIndex].goods.length == 0) {
								this.cartList.splice(this.delShopIndex, 1)
							}
							this.countTotalPrice()
							if (this.cartList.length == 0) {
								this.isNull = true
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
				this.closeModel()
			},
			//获取购物车商品列表
			getCartList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Cart/getCartList",
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.cartList = res.data.data.cart
							if (this.cartList.length == 0) {
								this.isNull = true
								return
							} else {
								this.isNull = false
							}
							for (let i = 0; i < this.cartList.length; i++) {
								this.cartList[i].shopChecked = false
								for (let j = 0; j < this.cartList[i].goods.length; j++) {
									this.cartList[i].goods[j].goodsChecked = false
									if (this.cartList[i].goods[j].item_price) {
										this.cartList[i].goods[j].price = this.cartList[i].goods[j].item_price
									} else {
										this.cartList[i].goods[j].price = this.cartList[i].goods[j].shop_price
									}
								}
							}
							this.countTotalPrice()
							return
						}
						if (res.data.status == 1) {
							uni.removeStorageSync('token')
							this.reLogin()
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//关闭选择规格弹窗
			closeModel() {
				this.showModel = ''
			},
			//点击底部立即结算
			toConfirmOrder() {
				console.log(this.cartList)
				let order = []
				for (let i = 0; i < this.cartList.length; i++) {
					for (let j = 0; j < this.cartList[i].goods.length; j++) {
						if (this.cartList[i].goods[j].goodsChecked) {
							let goods = {}
							goods.goods_id = this.cartList[i].goods[j].goods_id
							goods.original_image = this.cartList[i].goods[j].original_img
							goods.goods_name = this.cartList[i].goods[j].goods_name
							goods.goods_remark = this.cartList[i].goods[j].goods_remark
							goods.key_name = this.cartList[i].goods[j].key_name
							goods.item_id = this.cartList[i].goods[j].item_id
							goods.num = this.cartList[i].goods[j].goods_num
							goods.shop_price = this.cartList[i].goods[j].price
							order.push(goods)
						}
					}
				}
				if (order.length == 0) {
					this.showToast('至少选择一件商品')
					return
				}
				uni.setStorageSync('order', order)
				uni.navigateTo({
					url: '../confirmOrder/confirmOrder'
				})
			},
			//清空购物车
			sureClear() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Cart/clearShop",
					data: {
						token: uni.getStorageSync('token')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.cartList = []
							this.isNull = true
							uni.showToast({
								title: '购物车已清空',
								icon: "success"
							})
							return
						}
						this.showToast(res.data.msg)
					}
				})
				this.closeModel()
			},
			//删除对应店铺购物车
			deleteShop(id) {
				console.log(id)
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Cart/clearShop",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: id
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.cartList.splice(this.delShopIndex, 1)
							uni.showToast({
								title: '删除成功',
								icon: "success"
							})
							this.countTotalPrice()
							if (this.cartList.length == 0) {
								this.isNull = true
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
				this.closeModel()
			}
		}
	}
</script>

<style>
	.shop_list {
		margin-bottom: 200upx;
	}

	.listItem_top,
	.goods_item {
		padding: 0 60upx;
		position: relative;
	}

	.listItem_top {
		line-height: 60upx;
	}

	.goods_item {
		margin: 25upx 0;
		margin-left: 40upx;
		display: flex;
		justify-content: space-between;
	}

	.shop_list_item {
		border-radius: 20upx;
		box-shadow: 0 0 15upx 2upx #ddd;
		background-color: #fff;
		margin: 30upx 20upx;
		padding: 10upx 0;
	}

	.goods_pic {
		width: 160upx;
		height: 160upx;
		margin-right: 20upx;
		border-radius: 20upx;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		box-shadow: 0 0 10upx 2upx #eee;
	}

	.goods_msg {
		flex: 1;
		position: relative;
		overflow: hidden;
	}

	.goodsMsg_bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		line-height: 40upx;
		justify-content: space-between;
	}

	.numbox {
		line-height: 50upx;
		border: 1upx solid #ccc;
		border-radius: 8upx;
		display: flex;
		font-size: 24upx;
	}

	.numbox>.btn {
		width: 50upx;
		text-align: center;
		font-size: 30upx;
	}

	.list {
		margin: 30upx;
		border-radius: 20upx;
		padding: 20upx 0;
		box-shadow: 0 4upx 10upx rgba(0, 0, 0, 0.2);
	}

	.list-item {
		display: flex;
		padding: 30upx 40upx 30upx 70upx;
		position: relative;
	}

	.list-item .pic {
		width: 160upx;
		height: 160upx;
		margin-right: 20upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.list-item .pic image {
		width: 100%;
		display: block;
	}

	.content {
		flex: 1;
	}

	.content .con {
		padding: 10upx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid #F0F0F0;
		margin-bottom: 15upx;
	}

	.name-box {
		flex: 1;
		margin-right: 20upx;
		overflow: hidden;
	}

	.name-box>view {
		height: 40upx;
		line-height: 40upx;
	}

	.price {
		line-height: 40upx;
	}

	.check {
		font-size: 32upx !important;
		position: absolute;
		top: 50%;
		left: 20upx;
		transform: translateY(-50%);
	}

	.delete {
		font-size: 40upx !important;
		position: absolute;
		top: 50%;
		right: 20upx;
		transform: translateY(-50%);
	}

	.allcheck {
		font-size: 32upx;
		padding-right: 5upx;
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

	.youLike {
		margin-bottom: 140upx;
	}

	.youLike .title {
		text-align: center;
		margin: 50upx 0 60upx;
		font-size: 30upx;
	}

	.youLike .title text {
		padding: 0 20upx;
		position: relative;
		font-weight: 600;
	}

	.youLike .title text::before,
	.youLike .title text::after {
		content: "";
		width: 30upx;
		height: 2upx;
		position: absolute;
		top: 50%;
		margin-top: -1upx;
		background-color: #666;
	}

	.youLike .title text::before {
		left: -30upx;
	}

	.youLike .title text::after {
		right: -30upx;
	}

	.cart-bottom text {
		font-size: 28upx;
	}

	.goods_name {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 24upx;
		color: #888;
	}

	.cartGoodsName {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.cart-box {
		padding: 60upx 30upx 30upx;
		width: 80%;
		position: relative;
	}

	.null {
		text-align: center;
		color: #aaa;
		margin-top: 200upx;
		margin-bottom: 200upx;
	}

	.null image {
		width: 300upx;
		height: auto;
	}

	.null>view {
		margin-top: 10upx;
	}

	.clearAll {
		display: inline-block;
		line-height: 50upx;
		border-radius: 25upx;
		padding: 0 15upx;
		background-color: #ddd;
	}
</style>
