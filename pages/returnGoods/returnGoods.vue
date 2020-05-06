<template>
	<view>
		<view class="order">
			<view class="order-top">{{typeTxt}}信息</view>
			<view class="item" v-for="(item,index) in goodsList" :key="index">
				<view class="pic" :style="'background-image: url('+item.original_img+');'"></view>
				<view class="con">
					<view class="name">
						<view class="des">{{item.goods_name}}</view>
						<view>¥<text style="margin-left: 5upx;">{{item.final_price}}</text></view>
					</view>
					<view class="txt">
						<view class="remark" v-if="item.key_name">{{item.key_name}}</view>
						<view class="remark" v-else></view>
						<view>*{{item.goods_num}}</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<view class="span">{{typeTxt}}数量</view>
				<view class="">
					<view class="numbox">
						<view class="btn" @tap="reduce(index)">
							<text class="lg text-gray cuIcon-move"></text>
						</view>
						<view style="border-left: 1upx solid #ccc;border-right: 1upx solid #ccc;width:60upx;text-align: center;font-size: 22upx;">{{returnNum}}</view>
						<view class="btn" @tap="add(index)">
							<text class="lg text-gray cuIcon-add"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="list-item" style="margin-bottom: 20upx;">
				<view class="span">{{typeTxt}}原因</view>
				<view class="reason" @tap="showModel">
					<text style="color: #888;">{{selectReason}}</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="list-item">
				<view class="span">{{typeTxt}}理由</view>
				<view style="flex:1;border-bottom: 1upx solid #ddd;">
					<input type="text" style="height: 100%;" value="" :placeholder="'请填写'+typeTxt+'理由'" v-model="reasonTxt"/>	
				</view>
			</view>
			<view class="photo">
				<view class="upload">
					<view>上传凭证</view>
					<view v-if="images.length!=0" @tap="takePhoto">重新上传</view>
				</view>
				<view class="images" v-if="images.length!=0">
					<view class="img-box" v-for="(item,index) in images" :key='index' :style="'background-image: url('+item+');'">
						<text class="lg text-gray cuIcon-roundclosefill" @tap="delImage(index)"></text>
					</view>
				</view>
				<view class="con" v-else @tap="takePhoto">
					<view style="position: relative;top: 50%;transform: translateY(-50%);">
						<i class="iconfont iconzhaoxiangji" style="font-size: 60upx;"></i>
						<view style="font-size: 22upx;letter-spacing: 1upx;">请点击上传</view>
					</view>
				</view>
			</view>
		</view>
		<bottom-btn :txt="'确定'" @tap="toReturnDetail"></bottom-btn>
		<view class="cu-modal" :class="isShowModel?'show':''">
			<view class="cu-dialog reason-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view class="reason-title">{{typeTxt}}原因</view>
				<view class="reason-con">
					<view class="reason-item" v-for="(item,index) in reasons" :key="index" @tap="chooseReason(index)">
						<text>{{item}}</text>
						<text class="lg text-gray sex" :class="currentReason==index?'cuIcon-roundcheckfill red':'cuIcon-round'"></text>
					</view>
					<view class="reason-btns">
						<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
						<button class="cu-btn round bg-red shadow" @tap="sureReason">确定</button>
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
				isShowModel:false,
				goods: null,
				goodsList:[],
				//退货数量
				returnNum:1,
				//退款价格
				returnMoney: 0,
				//上传的图片列表
				images: [],
				reasons: [],
				currentReason: 0,
				selectReason: '',
				reasonTxt:'',
				typeTxt:'',
			}
		},
		onLoad() {
			this.getReason()
			this.typeTxt =uni.getStorageSync('typeTxt')
			this.selectReason='请选择'+this.typeTxt+'原因'
			this.goods = uni.getStorageSync('returnGoods')
			this.goods.maxNum = this.goods.goods_num
			let returnMoney = 0
			this.returnMoney = (this.returnNum * this.goods.final_price).toFixed(2)
			console.log(this.goods)
			this.goodsList = [this.goods]
		},
		methods: {
			getReason(){
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/returnReason",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.reasons = res.data.data
					}
				})
			},
			//减少商品数量
			reduce(index) {
				if (this.returnNum == 1) {
					return
				}
				this.returnNum--
				this.returnMoney = (this.returnNum * this.goods.final_price).toFixed(2)
			},
			//添加商品数量
			add(index) {
				if(this.returnNum==this.goods.maxNum){
					this.showToast(this.typeTxt+'商品的数量不能超过购买的数量')
					return
				}
				this.returnNum++
				this.returnMoney = (this.returnNum * this.goods.final_price).toFixed(2)
			},
			showModel() {
				this.currentReason = -1
				this.isShowModel = true
			},
			closeModel() {
				this.isShowModel = false
			},
			//选择退货原因
			chooseReason(index) {
				this.currentReason = index
			},
			//点击确认原因
			sureReason() {
				this.selectReason = this.reasons[this.currentReason]
				this.closeModel()
			},
			//拍照
			takePhoto() {
				uni.chooseImage({
					count: 1, //默认9
					success: (res) => {
						console.log(res.tempFilePaths);
						this.images = res.tempFilePaths
					}
				});
			},
			//删除上传的照片
			delImage(index) {
				this.images.splice(index, 1)
			},
			toReturnDetail() {
				if(this.selectReason == '请选择'+this.typeTxt+'原因'){
					this.showToast('请选择'+this.typeTxt+'原因')
					return
				}
				//有上传凭证和没有上传凭证
				if(this.images.length==0){
					this.setheader()
					uni.request({
						url: this.websiteUrl + "/api/order/returnGoods",
						data: {
							token: uni.getStorageSync('token'),
							order_id:uni.getStorageSync('orderDetail').order_id,
							order_goods_id:uni.getStorageSync('returnGoods').rec_id,
							goods_num:this.returnNum,
							type:this.typeTxt=='退货'?1:2,
							reason:this.selectReason,
							describe:this.reasonTxt
						},
						method: "POST",
						header: this.header,
						success: (res) => {
							console.log(res.data)
							let result = res.data
							if(result.status==0){
								uni.showToast({
									title:'已提交申请',
									icon:'success',
									success: () => {
										setTimeout(function() {
											uni.navigateBack({
												delta:2
											})
										}, 1000);
									}
								})
								return
							}
							this.showToast(result.msg)
						}
					})
				}else{
					// console.log(uni.getStorageSync('returnGoods').rec_id)
					this.setheader()
					uni.uploadFile({
						url: this.websiteUrl + "/api/order/returnGoods",
						name: 'return_img',
						filePath: this.images[0],
						formData: {
							token: uni.getStorageSync('token'),
							shop_id: uni.getStorageSync('shop_id'),
							order_id:uni.getStorageSync('orderDetail').order_id,
							order_goods_id:uni.getStorageSync('returnGoods').rec_id,
							goods_num:this.returnNum,
							type:this.typeTxt=='退货'?1:2,
							reason:this.selectReason,
							describe:this.reasonTxt
						},
						method: "POST",
						header: this.header,
						success: (res) => {
							console.log(JSON.parse(res.data))
							let result = JSON.parse(res.data)
							if(result.status==0){
								uni.showToast({
									title:'已提交申请',
									icon:'success',
									success: () => {
										setTimeout(function() {
											uni.navigateBack({
												delta:1
											})
										}, 1000);
									}
								})
								return
							}
							this.showToast(result.msg)
						}
					})
				}
			},
		}
	}
</script>

<style>
	.item {
		padding: 30upx;
		display: flex;
	}
	
	.item .pic {
		width: 140upx;
		height: 140upx;
		overflow: hidden;
		border-radius: 20upx;
		position: relative;
		box-shadow: 0 0 10upx 2upx #eee;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.item .pic image {
		width: 100%;
		display: block;
	}
	
	.item .con {
		flex: 1;
		margin-left: 20upx;
		padding-top: 20upx;
		position: relative;
	}
	
	.con .name,
	.con .txt {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}
	
	.txt {
		border-bottom: 1upx solid #f5f5f5;
		padding-bottom: 10upx;
		line-height: 40upx;
	}
	
	.remark {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		color: #888;
		font-size: 22upx;
		margin-right: 100upx;
	}
	
	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 30upx;
		margin-right: 20upx;
	}
	.order {
		margin: 40upx 30upx 140upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		padding: 10upx 0 30upx;
	}

	.order-top {
		line-height: 60upx;
		padding: 0 30upx;
		border-bottom: 1upx solid #f1f1f1;
		font-size: 30upx;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20upx;
		padding: 0 30upx;
		line-height: 60upx;
		font-size: 30upx;
	}

	.list-item .span {
		width: 140upx;
		margin-right: 20upx;
	}

	.reason {
		flex: 1;
		background-color: #f1f1f1;
		border-radius: 10upx;
		display: flex;
		justify-content: space-between;
		padding: 0 20upx;
	}
	.textarea{
		flex: 1;
		line-height: 36upx;
		height: 108upx;
	}

	.photo {
		margin: 30upx 30upx 0;
		padding: 20upx 0 0;
		border-top: 1upx solid #f1f1f1;
	}

	.photo .con {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
		text-align: center;
		margin: 20upx auto;
		border: 1upx solid #AAAAAA;
		color: #aaa;
	}

	.images {
		display: flex;
		justify-content: space-between;
		margin: 40upx 0 20upx;
		flex-wrap: wrap;
	}

	.images>view {
		width: 100%;
		height: 300upx;
		border-radius: 20upx;
	}

	.img-box {
		position: relative;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.img-box text {
		font-size: 36upx;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}

	.upload {
		display: flex;
		justify-content: space-between;
		color: #666;
		font-size: 30upx;
	}

	.reason-box {
		width: 80%;
		position: relative;
		padding: 20upx 0 40upx;
	}

	.reason-title {
		padding: 20upx 0;
		border-bottom: 1upx solid #eee;
	}

	.reason-con {
		padding: 0 50upx;
	}

	.reason-item {
		display: flex;
		justify-content: space-between;
		line-height: 70upx;
		border-bottom: 1upx solid #eee;
	}

	.reason-btns {
		display: flex;
		justify-content: space-around;
		margin-top: 30upx;
	}

	.reason-btns button {
		width: 200upx;
		padding: 0;
		background-color: red;
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
</style>
