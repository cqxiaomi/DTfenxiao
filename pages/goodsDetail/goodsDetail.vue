<template>
	<view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<swiper style="height: 750upx;" class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true"
			 interval="5000" duration="500" indicator-active-color="#F82F25" @tap="previewImg">
				<swiper-item v-for="(item,index) in goodsDetail.wheel_img" :key="index">
					<image :src="item.image_url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="goods_info">
				<view class="info_up">
					<view style="flex: 1;margin-right: 20upx;">
						<view class="goods_name">{{goodsDetail.goods_name}}</view>
						<view class="goods_remark">{{goodsDetail.goods_remark}}</view>
					</view>
					<view v-if="shop_id!=1">
						<button open-type="share" style="background-color: #fff;line-height: 50upx;padding: 0;">
							<i class="iconfont iconfenxiang3"></i>
							<view style="font-size: 24upx;color: #aaa;">分享</view>
						</button>
					</view>
				</view>
				<view class="price">￥{{goodsDetail.price}}</view>
				<view class="info_down">
					<view class="sales">销量：{{goodsDetail.sales_volume}}</view>
					<view class="store">库存：{{store_count}}</view>
				</view>
			</view>
			<view style="padding: 20upx 30upx;" v-if="showSpecs">
				<view class="guige" @tap="showColorModel">
					<view style="margin-right: 25upx;color: #888;">规格</view>
					<view class="fenlei">
						<view class="subtitle">
							<view>
								<text style="margin-right: 15upx;">选择</text>
								<text>规格分类</text>
							</view>
							<text class="lg text-gray cuIcon-right" style="font-size: 32upx;"></text>
						</view>
						<view class="color-btn">共{{specs.length}}种规格可选</view>
					</view>
				</view>
			</view>
			<view style="background-color: #f5f5f5;height: 20upx;" v-else></view>
			<view class="shop-msg" style="padding: 20upx 30upx;" v-if="shop_id!=1">
				<view class="shop-top" style="display: flex;margin-bottom: 20upx;padding-right: 180upx;position: relative;">
					<view class="shop-pic" v-if="goodsDetail.shop.logo" :style="'background-image: url('+goodsDetail.shop.logo+');'"></view>
					<view class="shop-pic" v-else>
						<image src="../../static/mine/touxiang(1).jpeg" mode="widthFix"></image>
					</view>
					<view class="shop-name" style="flex: 1;margin-left: 20upx;">{{goodsDetail.shop.shop_name}}</view>
					<view style="position: absolute;right: 0;top: 0;line-height: 50upx;padding: 0 15upx;border-radius: 25upx;border: 1upx solid #FD5061;color: #FD5061;font-size: 26upx;"
					 @tap="toShop">进店逛逛</view>
				</view>
				<view class="shop-bottom" style="font-size: 24upx;color: #888;padding-top: 10upx;border-top:1upx solid #F5F5F5">
					<text style="padding-right: 40upx;"><text class="lg text-gray cuIcon-roundcheck" style="padding-right: 4upx;"></text>企业认证</text>
					<text><text class="lg text-gray cuIcon-roundcheck" style="padding-right: 4upx;"></text>收货后结算</text>
				</view>
			</view>
			<view>
				<view style="background-color: #f5f5f5;height: 20upx;"></view>
				<view class="goods_msg" v-if="showRichtext!=2">商品详情</view>
				<view class="detail-pic" id="detail-pic" v-if="showRichtext!=2">
					<rich-text v-if="showRichtext==0" :nodes="goodsDetail.goods_content"></rich-text>
					<image v-if="showRichtext==1" :src="goodsDetail.goods_content" mode="widthFix"></image>
				</view>
				<!-- <view class="goods_msg">商品参数</view>
				<view class="canshu" id="canshu" style="margin-bottom: 30upx;">
					<view class="attr_box" v-if="goodsDetail.goods_attr">
						<view class="attr_item" v-for='(item,index) in goodsDetail.goods_attr' :key='index'>{{item.attr_name}}：{{item.attr_values}}</view>
					</view>
					<view v-else style="text-align: center;color: #ddd;">暂无商品参数</view>
				</view> -->
			</view>
			<view v-if="otherGoods.length!=0">
				<view style="text-align: center;line-height: 80upx;font-weight: 600;font-size: 32upx;">推荐商品</view>
				<view class="goodsList">
					<view class="goods-item" v-for="(item,index) in otherGoods" :key="index" @tap="toOtherGoods(item.goods_id,item.shop_id)">
						<view class="pic" :style="'background-image: url('+item.original_img+');'"></view>
						<view class="con">
							<view class="goodsname">{{item.goods_name}}</view>
							<view style="display: flex;justify-content: space-between;line-height: 40upx;">
								<view style="color: red;">¥ {{item.price}}</view>
								<view style="font-size: 22upx;color: #aaa;">销量：<text>{{item.sales_volume}}</text>件</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 120upx;"></view>
			<view class="cu-bar bg-white tabbar border shop">
				<button class="action" v-if="shop_id==1">
					<i class="iconfont iconerp-copy"></i>
					<text>平台</text>
				</button>
				<button class="action" v-else @tap="toShop">
					<i class="iconfont iconmendian"></i>
					<text>店铺</text>
				</button>
				<button class="action" @tap="addStore">
					<i class="iconfont" :class="isStore?'red iconshoucang':'iconshoucang3'"></i>
					<text :class="isStore?'red':''">{{isStore?'已收藏':'收藏'}}</text>
				</button>
				<button class="action" @tap="toCart">
					<view class='cu-tag badge' style="right:0;top: -8upx;" v-if="showCartCount">{{cartCount}}</view>
					<i class="iconfont icongouwuche"></i>
					<text>购物车</text>
				</button>
				<view class="btn-group">
					<button class="cu-btn round line-red shadow" @tap="showSpecsModel">加入购物车</button>
					<button class="cu-btn round bg-red shadow" style="background-color: red;color: #FFFFFF;" @tap="showSpecsModel">立即购买</button>
				</view>
			</view>
		</view>
		<!-- 选择规格弹窗 -->
		<view class="cu-modal" catchtouchmove='true' :class="showModel=='colorModel'?'show':''">
			<view class="cu-dialog guige-box">
				<text class="lg text-gray cuIcon-close close" style="font-size: 48upx;" @tap="closeModel"></text>
				<view class="guige-top">
					<view>
						<view class="pic" :style="'background-image: url('+goodsDetail.original_img+');'"></view>
					</view>
					<view class="price">
						<view style="display: flex;justify-content: space-between;">
							<view style="font-weight:600;color:red;font-size:32upx;">￥{{selectSpec.price}}</view>
						</view>
						<view style="font-size:26upx;color:#888;margin:10upx 0" v-if="showSpecs">库存{{selectSpec.store_count}}件</view>
						<view style="font-size:24upx" v-if="showSpecs">选择商品规格</view>
						<view class="des" v-else>{{goodsDetail.goods_remark}}</view>
					</view>
				</view>
				<scroll-view scroll-y class="specs-box" catchtouchmove='true' v-if="specs.length>6">
					<view class="color-box">
						<view v-for="(item,index) in specs" :class="currentSpecIndex==index?'bg-red':''" :style="item.store_count==0?'background-color: #f1f1f1;color: #ccc;':''"
						 :key="index" @tap="selectColor(index)">{{item.key_name}}</view>
					</view>
				</scroll-view>
				<view class="color-box" v-else>
					<view v-for="(item,index) in specs" :class="currentSpecIndex==index?'bg-red':''" :style="item.store_count==0?'background-color: #f1f1f1;color: #ccc;':''"
					 :key="index" @tap="selectColor(index)">{{item.key_name}}</view>
				</view>
				<view class="clear">
					<view class="color-subtitle">
						<text style="font-size: 26upx;">数量</text>
					</view>
					<view class="numbox">
						<view class="btn" @tap.stop="reduce">
							<text class="lg cuIcon-move"></text>
						</view>
						<view style="font-size: 24upx;width: 50upx;">{{num}}</view>
						<view class="btn" @tap.stop="add">
							<text class="lg cuIcon-add"></text>
						</view>
					</view>
				</view>
				<view class="btns">
					<button class="cu-btn round line-red shadow" @tap="sureAddCart">加入购物车</button>
					<button class="cu-btn round bg-red shadow" @tap="toConfirmOrder" style="background-color: red;">立即购买</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCartCount: false,
				cartCount: null,
				imgUrl: this.imgUrl,
				isLoaing: true,
				goodsId: '',
				goodsDetail: null,
				swiperHeight: 0,
				isStore: false,
				showSpecs: false,
				//规格
				specs: [],
				selectSpec: {},
				currentItem: 0,
				showModel: '',
				//选中的规格
				currentSpecIndex: -1,
				num: 1,
				mobile: null,
				showRichtext: null,
				recommend_user_id: null,
				recommend_shop_id: null,
				toEle: '',
				otherGoods: [],
				shop_id: null,
				store_count: 0
			}
		},
		onLoad(options) {
			console.log(options)
			console.log(options.shop_id)
			if (options.shop_id) {
				this.shop_id = options.shop_id
				uni.setStorageSync('shop_id', options.shop_id)
			}
			this.goodsId = options.id
			this.recommend_user_id = options.user_id
			this.recommend_shop_id = options.shop_id
			this.getGoodsDetail()
			this.getSwiperHeight()
		},
		onHide() {
			this.showModel = ''
		},
		methods: {
			toOtherGoods(goods_id, shop_id) {
				uni.redirectTo({
					url: "../goodsDetail/goodsDetail?id=" + goods_id + "&shop_id=" + shop_id
				})
			},
			getOtherGoods() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Goods/othergoods',
					data: {
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.otherGoods = res.data.data
							return
						}
						this.showToast(res.data.data)
					}
				})
			},
			toShop() {
				uni.redirectTo({
					url: '../index/index'
				})
			},
			bindShop() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/bindShop',
					data: {
						token: uni.getStorageSync('token'),
						user_id: this.recommend_user_id,
						shop_id: this.recommend_shop_id
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
					}
				})
			},
			toCart() {
				uni.switchTab({
					url: '../cart/cart'
				})
			},
			//预览图片
			previewImg() {
				console.log('预览图片')
				let urls = this.goodsDetail.wheel_img.map(item => item.image_url)
				uni.previewImage({
					urls: urls,
					indicator: 'number',
					loop: true
				});
			},
			//点击商品详情/商品参数
			chooseOption(index) {
				this.currentItem = index
			},
			//==========================================商品收藏==========================================
			//点击商品收藏按钮
			addStore() {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: "../wxLogin/wxLogin"
					})
					return
				}
				this.isStore = !this.isStore
				this.setheader()
				let url
				if (this.isStore) {
					url = this.websiteUrl + "/api/UserCenter/collectGoods"
				} else {
					url = this.websiteUrl + "/api/UserCenter/cancelCollect"
				}
				this.store(url)
			},
			//发送收藏/取消收藏请求
			store(url) {
				uni.request({
					url: url,
					data: {
						token: uni.getStorageSync('token'),
						goods_id: this.goodsId,
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.showToast(res.data.msg)
					}
				})
			},
			//==========================================添加购物车==========================================
			//点击页面底部的添加购物车/立即订购
			showSpecsModel() {
				this.showColorModel()
			},
			//确认加入购物车
			sureAddCart() {
				if (this.specs.length != 0 && this.currentSpecIndex == -1) {
					this.showToast("请先选择商品规格")
					return
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Cart/add",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						goods_id: this.goodsId,
						goods_num: this.num,
						item_id: this.selectSpec.item_id
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.closeModel()
						if (res.data.status == 0) {
							this.showToast('已加入购物车')
							return
						}
						if (res.data.status == 1) {
							uni.navigateTo({
								url: "../wxLogin/wxLogin"
							})
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//==========================================商品订购==========================================
			//点击规格弹窗里的立即订购
			toConfirmOrder() {
				// console.log("确认下单,此时发送可以加入下单请求")
				if (this.specs.length != 0 && this.currentSpecIndex == -1) {
					this.showToast("请先选择商品规格")
					return
				}
				// uni.showModal({
				// 	title: '推荐人user_id=' + this.recommend_user_id + ',shop_id=' + this.recommend_shop_id
				// })
				let goods = {}
				goods.goods_id = this.goodsDetail.goods_id
				goods.original_image = this.goodsDetail.original_img
				goods.goods_name = this.goodsDetail.goods_name
				goods.goods_remark = this.goodsDetail.goods_remark
				goods.key_name = this.selectSpec.key_name
				goods.item_id = this.selectSpec.item_id
				goods.num = this.num
				goods.shop_price = this.selectSpec.price
				let order = []
				order.push(goods)
				uni.setStorageSync('order', order)
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/getScore',
					data: {
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 1) {
							//session过期或未授权登录
							if (this.recommend_user_id) {
								uni.navigateTo({
									url: "../wxLogin/wxLogin?codeQuery=" + this.recommend_user_id + '_' + this.recommend_shop_id +
										'&fromView=toConfirmOrder'
								})
							} else {
								uni.navigateTo({
									url: "../wxLogin/wxLogin?fromView=toConfirmOrder"
								})
							}
							return
						}
						if (this.recommend_user_id) {
							this.bindShop()
						}
						uni.navigateTo({
							url: '../confirmOrder/confirmOrder'
						})
					}
				})
			},

			//弹出选择规格弹窗
			showColorModel() {
				this.num = 1
				if (this.specs.length == 1) {
					this.currentSpecIndex = 0
					this.selectSpec = this.specs[this.currentSpecIndex]
				} else {
					this.currentSpecIndex = -1
					this.selectSpec = {
						item_id: '',
						key_name: null,
						price: this.goodsDetail.price,
						store_count: 0
					}
				}
				this.showModel = "colorModel"
			},
			//关闭选择规格弹窗
			closeModel() {
				this.showModel = ''
			},
			//选择规格
			selectColor(index) {
				if (this.specs[index].store_count == 0) {
					this.showToast('该规格库存不足')
					return
				}
				this.currentSpecIndex = index
				this.selectSpec = this.specs[this.currentSpecIndex]
			},
			//减少数量
			reduce() {
				if (this.num == 1) {
					return
				}
				this.num--
			},
			//添加数量
			add() {
				this.num++
			},
			//获取商品详情信息
			getGoodsDetail() {
				uni.request({
					url: this.websiteUrl + "/api/Goods/goodsInfo",
					data: {
						id: this.goodsId,
						shop_id: uni.getStorageSync("shop_id")
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '获取成功') {
							this.isLoaing = false
							this.goodsDetail = res.data.data
							//商品详情查找到html标签时使用富文本
							if (this.goodsDetail.goods_content.indexOf('/>') != -1) {
								console.log("商品详情查找到html标签时使用富文本")
								this.goodsDetail.goods_content = this.goodsDetail.goods_content.replace(/<img /g,
									"<img style='width:100%;display:block' ")
								this.goodsDetail.goods_content = this.goodsDetail.goods_content.replace(/\/public\/upload\/goods/g, this.imgUrl +
									"/public/upload/goods/")
								this.showRichtext = 0
								//商品详情未查找到html标签并且不为空时
							} else if (this.goodsDetail.goods_content.indexOf('/>') == -1 && this.goodsDetail.goods_content) {
								console.log("商品详情未查找到html标签并且不为空时")
								this.showRichtext = 1
								//商品详情为空
							} else if (!this.goodsDetail.goods_content) {
								console.log("商品详情为空")
								this.showRichtext = 2
							}
							// console.log(this.goodsDetail.goods_content, this.showRichtext)

							this.specs = this.goodsDetail.item
							//没有规格不显示规格选框,价格/库存默认按照封面标价/库存
							//有规格则显示规格选框,价格/库存默认按照封面标价/库存,下单前必须让用户选择规格
							//对应规格显示对应价格/库存
							this.selectSpec = {
								item_id: '',
								key_name: null,
								price: this.goodsDetail.price,
								store_count: 0
							}
							if (this.specs.length == 0) {
								this.store_count = this.goodsDetail.store_count
								this.showSpecs = false
							} else {
								this.store_count = this.specs[0].store_count
								this.showSpecs = true
							}
							this.getOtherGoods()
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//获取商品介绍swiper的高度
			getSwiperHeight() {
				uni.getSystemInfo({
					success: (res) => {
						console.log(res)
						this.swiperHeight = res.screenHeight - 180
					}
				})
			},
			//触摸滑动切换商品详情和商品参数
			changeSwiperItem(e) {
				// console.log(e)
				this.currentItem = e.detail.current
			},

		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '我发现了一个宝贝，快来看看吧',
				path: '/pages/index/index?goods_id=' + this.goodsId + "&user_id=" + uni.getStorageSync("user_id") + "&shop_id=" +
					uni.getStorageSync("shop_id")
			}
		},
	}
</script>

<style>
	.goodsList {
		display: flex;
		justify-content: space-between;
		margin: 0 30upx;
		flex-wrap: wrap;
	}

	.goods-name {
		position: absolute;
		bottom: 0;
		width: 100%;
		line-height: 50upx;
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
		font-size: 32upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding: 0 15upx;
	}

	.goods-item {
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		width: 335upx;
		margin-bottom: 30upx;
		background-color: #fff;
		border-radius: 10upx;
		overflow: hidden;
	}

	.goods-item .pic {
		width: 335upx;
		height: 335upx;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;

	}

	.goods-item .pic image {
		width: 100%;
		display: block;
	}

	.goods-item .con {
		padding: 10upx 20upx;
	}

	.goodsname {
		font-weight: 800;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.goods-price {
		position: absolute;
		bottom: 0;
		line-height: 40upx;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		width: 100%;
		letter-spacing: 1upx;
	}

	.shop-pic {
		width: 120upx;
		height: 120upx;
		overflow: hidden;
		border-radius: 10upx;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		box-shadow: 0 0 5upx 3upx #eee;
	}

	.subtitle {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20upx;
	}

	.goods_msg {
		line-height: 80upx;
		font-weight: 600;
		color: #888;
		text-align: center;
	}

	.detail-pic image {
		width: 100%;
	}

	.goods_info {
		padding: 30upx;
		background-color: #FFFFFF;
	}

	.info_up,
	.info_down {
		display: flex;
		justify-content: space-between;
	}

	.goods_name {
		font-weight: 800;
		font-size: 32upx;
	}

	.goods_remark {
		font-size: 28upx;
		color: #666;
	}

	.goods_info .price {
		color: red;
		font-weight: 600;
		font-size: 36upx;
	}

	.info_down {
		color: #888;
		font-size: 24upx;
		line-height: 40upx;
		padding-top: 10upx;
		border-top: 1upx solid #F5F5F5;
		margin-top: 20upx;
	}

	.iconfenxiang3 {
		font-size: 60upx;
		color: red;
	}

	button::after {
		border: 0;
	}

	.guige {
		padding: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 4upx 10upx rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: space-between;

	}

	.fenlei {
		flex: 1;
	}

	.colors {
		width: 57%;
	}

	.colors image {
		width: 18%;
		margin-right: 20upx;
	}

	.color-btn {
		background-color: #f1f1f1;
		border-radius: 10upx;
		padding: 10upx 15upx;
		font-size: 22upx;
		color: #888;
		display: inline-block;
		letter-spacing: 1upx;
	}

	.good-nav {
		display: flex;
		justify-content: space-between;
		border-bottom: 2upx solid #F0F0F0;
		margin-bottom: 30upx;
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
	}

	.shop {
		position: fixed;
		width: 100%;
		bottom: 0;
		padding: 0 30upx !important;
		box-sizing: border-box;
		border-top: 1upx solid #f5f5f5;
	}

	.shop i {
		font-size: 40upx;
		margin-bottom: 5upx;
	}

	.cu-bar.tabbar.shop .action {
		width: 100upx;
	}

	.cu-bar.tabbar.shop .iconfont {
		font-size: 42upx;
		padding-bottom: 5upx;
		color: #333;
	}

	.cu-bar.tabbar.shop text {
		font-size: 22upx;
	}

	.cu-bar.tabbar.border .action::before {
		border: 0;
	}

	.cu-bar.tabbar .btn-group {
		padding: 0;
		justify-content: flex-end;
	}

	.btn-group button {
		width: 220upx;
		margin-left: 20upx;
	}

	.guige-box {
		padding: 50upx 30upx 30upx;
		width: 690upx;
		position: relative;
		text-align: left;
		margin: 50upx auto;
	}

	.guige-top {
		display: flex;
		margin-bottom: 20upx;
		justify-content: space-between;
	}

	.specs-box {
		height: 400upx;
		overflow: hidden;
		margin-bottom: 20upx;
	}

	.color-box>view {
		font-size: 26upx;
		padding: 10upx 20upx;
		border-radius: 10upx;
		background-color: #ddd;
		border: 1upx solid transparent;
		margin: 15upx 0;
	}

	.guige-top .pic {
		width: 150upx;
		height: 150upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx #ccc;
		overflow: hidden;
		display: block;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.guige-top .price {
		margin-left: 20upx;
		flex: 1;
	}

	.color-subtitle {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10upx;
		line-height: 40upx;
	}

	.color-subtitle text {
		line-height: 40upx;
	}

	.more {
		margin-right: 170upx;
	}

	.more .more-item {
		width: 138upx;
		border: 1upx solid transparent;
		background-color: #eee;
		border-radius: 10upx;
		margin-bottom: 20upx;
		margin-right: 20upx;
		padding: 10upx;
		box-sizing: border-box;
		display: flex;
	}

	.more .more-item:nth-child(3n) {
		margin-right: 0;
	}

	.more-item image {
		width: 35upx;
		height: 35upx;
		display: block;
	}

	.more-item view {
		flex: 1;
		text-align: center;
		font-size: 22upx;
		color: #666;
		line-height: 35upx;
		overflow: hidden;
		white-space: nowrap;
		margin-left: 5upx;
	}

	.border-line {
		border: 1upx solid red !important;
		background-color: #fff !important;
	}

	.bg-red {
		background-color: red !important;
		color: #fff !important;
	}

	.cart-box {
		padding: 60upx 30upx 30upx;
		width: 80%;
		position: relative;
	}

	.numbox {
		border: 1upx solid #7B7B7B;
		border-radius: 8upx;
		display: flex;
		float: left;
		margin-bottom: 40upx;
		line-height: 50upx;
		height: 50upx;
		box-sizing: border-box;
	}

	.numbox>view {
		width: 50upx;
		text-align: center;
		font-size: 24upx;
	}

	.numbox>.btn:nth-child(1) {
		border-right: 1upx solid #7B7B7B;
	}

	.numbox>.btn:nth-child(3) {
		border-left: 1upx solid #7B7B7B;
	}

	.black {
		color: #000;
	}

	.order-num {
		border-bottom: 3upx solid #000;
		margin: 20upx 40upx 40upx;
		font-size: 36upx;
		letter-spacing: 2upx;
		line-height: 60upx;
	}

	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		font-size: 22upx;
		color: #888;
	}

	.attr_box {
		box-shadow: 0 3upx 8upx rgba(0, 0, 0, 0.1);
		padding: 20upx 30upx;
		border-radius: 20upx;
		margin: 0 20upx;
	}

	.attr_item {
		line-height: 40upx;
		padding: 15upx 0;
		border-bottom: 1upx solid #F5F5F5;
	}

	.no_store {
		background-color: #f5f5f5;
		color: #ddd;
	}
</style>
