<template>
	<view>
		<view class="title">
			<view :class="currentIndex==0?'under':''" @tap="chooseOptions(0)">
				商品收藏<view class="">({{goodsCount}})</view>
			</view>
			<view :class="currentIndex==1?'under':''" @tap="chooseOptions(1)">
				文章收藏<view class="">({{articleCount}})</view>
			</view>
		</view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view class="" v-else>
			<view class="null" v-if="storeList.length==0">
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无收藏信息</view>
			</view>
			<view style="margin: 80upx 30upx 140upx;" v-else>
				<view class="list">
					<view class="item" v-if="isEdit">
						<text :class="allSelect?'cuIcon-roundcheckfill red':'cuIcon-round'" class="lg text-gray" style="font-size: 34upx;"
						 @tap="selectAll"></text>
						<text @tap="selectAll" style="font-size: 26upx;padding-left: 10upx;">全选</text>
					</view>
					<view class="item" v-for="(item,index) in storeList" :key="index" @tap="selectGoods(index)">
						<view class="checkbox" v-if="isEdit">
							<text :class="item.checked?'cuIcon-roundcheckfill red':'cuIcon-round'" class="lg text-gray check"></text>
						</view>
						<view class="pic" :style="'background-image: url('+item.original_img+');'" @tap.stop="toGoodsDetail(item.goods_id,item.shop_id)"></view>
						<view class="con">
							<view class="name-box">
								<view class="des">{{item.goods_name}}</view>
								<view style="font-size: 24upx;width: 140upx;text-align: right;">￥ {{item.shop_price}}</view>
							</view>
							<view style="font-size: 22upx;color: #888;line-height: 50upx;">销量:{{item.sales_sum}}</view>
							<view class="status" v-if="item.is_on_sale==0">已下架</view>
						</view>
					</view>
				</view>
				<end-tip></end-tip>
			</view>
			<view class="bottom1" v-if="isEdit&&storeList.length!=0">
				<view style="color: red;background-color: #fff;" @tap="edit">取消编辑</view>
				<view style="color: #fff;background-color: red;" @tap="cancelCollect">删除</view>
			</view>
			<bottom-btn v-if="!isEdit&&storeList.length!=0" :txt="'编辑'" @tap="edit"></bottom-btn>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.imgUrl,
				isLoading: true,
				currentIndex: 0,
				//收藏列表
				storeList: [],
				isEdit: false,
				allSelect: false,
				isNull: false,
				selectCollectList: [],
				page: 1,
				goodsCount: 0,
				articleCount: 0,
				stopLoad: false
			}
		},
		onLoad() {
			this.getGoodsCollect()
		},
		methods: {
			toGoodsDetail(goods_id,shop_id){
				uni.navigateTo({
					url: "../goodsDetail/goodsDetail?id=" + goods_id + "&shop_id=" + shop_id
				})
			},
			getGoodsCollect() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/getGoodsCollect",
					data: {
						token: uni.getStorageSync('token'),
						page: this.page,
						pagesize: 8
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoading = false
						if (res.data.status == 0) {
							this.goodsCount = res.data.data.goodsCount
							this.articleCount = res.data.data.articleCount
							this.storeList = res.data.data.list
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			loadmore() {
				if (this.stopLoad) {
					return
				}
				this.page++
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/getGoodsCollect",
					data: {
						token: uni.getStorageSync('token'),
						page: this.page,
						pagesize: 8
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							if (res.data.data.length == 0) {
								this.stopLoad = true
								return
							}
							for (let i = 0; i < res.data.data.length; i++) {
								this.storeList.push(res.data.data[i])
							}
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//点击导航选项
			chooseOptions(index) {
				this.currentIndex = index
				this.isLoading = true
				this.allSelect = this.isEdit = this.stopLoad = false	
				this.page = 1
				switch (index) {
					case 0:
						this.getGoodsCollect()
						break;
					case 1:
						this.isLoading = false
						this.storeList = []
						break;
					default:
						break;
				}
			},
			//点击编辑
			edit() {
				this.isEdit = !this.isEdit
			},
			//点击勾选当前项
			selectGoods(index) {
				this.storeList[index].checked = !this.storeList[index].checked
				//强制刷新页面
				this.$forceUpdate()
				this.getSelectGoods()
			},
			//全选
			selectAll() {
				this.allSelect = !this.allSelect
				for (let i = 0; i < this.storeList.length; i++) {
					this.storeList[i].checked = this.allSelect
				}
				this.getSelectGoods()
			},
			//获取已勾选的商品
			getSelectGoods() {
				let selectCollect = []
				for (let i = 0; i < this.storeList.length; i++) {
					if (this.storeList[i].checked) {
						selectCollect.push(this.storeList[i])
					}
				}
				if (selectCollect.length == this.storeList.length) {
					this.allSelect = true
				} else {
					this.allSelect = false
				}
				this.selectCollectList = selectCollect
			},
			//批量取消收藏
			cancelCollect() {
				this.isLoading = true
				let selectCollectId = this.selectCollectList.map(v => v.collect_id)
				this.setheader()
				console.log(selectCollectId)
				if (selectCollectId.length == 0) {
					this.showToast('请选择删除项')
					return
				}
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/cancelCollecttions",
					data: {
						collect_ids: selectCollectId.join(','),
						token: uni.getStorageSync('token')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						if(res.data.status==1){
							this.showToast(res.data.msg)
							switch (this.currentIndex){
								case 0:
								this.page = 1
								this.stopLoad = false
								this.getGoodsCollect()
									break;
								default:
									break;
							}
						}
					}
				})
			}
		},
		onReachBottom() {
			console.log('触底了')
			this.loadmore()
		}
	}
</script>

<style>
	.title {
		display: flex;
		justify-content: space-around;
		padding: 10upx 0;
		position: fixed;
		width: 100%;
		top: 0;
		background-color: #fff;
		z-index: 100;
	}

	.title>view {
		position: relative;
		height: 50upx;
		line-height: 50upx;
		padding: 0 10upx;
	}

	.title>view>view {
		position: absolute;
		top: 0;
		left: 100%;
		font-size: 24upx;
		line-height: 50upx;
		color: #888;
		font-weight: normal !important;
	}

	.under {
		color: red;
		font-weight: 800;
		position: relative;
	}

	.under::after {
		content: "";
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		height: 6upx;
		border-radius: 3upx;
		background-color: #F7756A;
	}

	.bottom1 {
		position: fixed;
		width: 100%;
		border: 1upx solid red;
		display: flex;
		bottom: 0;
	}

	.bottom1>view {
		width: 50%;
		line-height: 100upx;
		height: 100upx;
		text-align: center;
	}

	.list {
		padding: 20upx 0;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		margin-bottom: 20upx;
	}

	.item {
		padding: 15upx 30upx;
		margin: 15upx 0;
		display: flex;
	}

	.item .pic {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		box-shadow: 0 0 10upx 2upx #eee;
	}

	.item .pic image {
		width: 100%;
		display: block;
	}

	.item .con {
		flex: 1;
		margin-left: 20upx;
		border-bottom: 1upx solid #f5f5f5;
		padding-top: 20upx;
		position: relative;
	}

	.status {
		position: absolute;
		top: 0;
		right: 0;
		color: #888;
		font-size: 24upx;
	}

	.name-box {
		display: flex;
		justify-content: space-between;
	}

	.checkbox {
		position: relative;
		width: 50upx;
	}

	.checkbox text {
		position: absolute;
		font-size: 34upx;
		top: 50%;
		transform: translateY(-50%);
	}

	.null {
		width: 250upx;
		margin: 320upx auto;
	}

	.null image {
		width: 100%;
	}

	.des {
		flex: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-wrap: break-word;
		word-break: normal;
	}
</style>
