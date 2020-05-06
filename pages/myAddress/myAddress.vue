<template>
	<view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view else>
			<view class="address" v-if="!isNull">
				<view class="address-item" v-for="(item,index) in addressList" :key="index" :data-name="item.consignee"
				 :data-mobile="item.mobile" :data-address='item.addressDetail' :data-addressid="item.address_id" @tap="clickAddress">
					<view class="list">
						<view class="item">
							<view class="txt">收货人</view>
							<view class="con" v-if="editIndex==index&&showEditBtn">
								<input type="text" v-model="name" />
							</view>
							<view class="con" v-else>{{item.consignee}}</view>
						</view>
						<!-- 编辑中的地址分为省市区修改和详细地址修改 -->
						<view v-if="editIndex==index&&showEditBtn">
							<view class="item">
								<view class="txt">省市区</view>
								<view class="con">
									<picker mode="region" @change="changeAddress">
										<view>{{addArr.join(' ')}}</view>
									</picker>
								</view>
							</view>
							<view class="item">
								<view class="txt">详细地址</view>
								<view class="con">
									<input type="text" v-model="addressDetail" />
								</view>
							</view>
						</view>
						<!-- 编辑完的地址为完整的地址信息 -->
						<view class="item" v-else>
							<view class="txt">详细地址</view>
							<view class="con">{{item.addressDetail}}</view>
						</view>
						<view class="item">
							<view class="txt">手机号</view>
							<view class="con" v-if="editIndex==index&&showEditBtn">
								<input type="number" maxlength="11" v-model="mobile" />
							</view>
							<view class="con" v-else>{{item.mobile}}</view>
						</view>
					</view>
					<view class="" v-if="isShowBtn">
						<view class="checkbox">
							<text v-if="isDefault==index" class="lg text-gray cuIcon-roundcheckfill check" style="color: red;margin-right:6upx"></text>
							<text v-else class="lg text-gray cuIcon-round check" style="margin-right:6upx" @tap="setDefaultAddress(index,item.address_id)"></text>
							<text @tap="setDefaultAddress(index,item.address_id)">默认地址</text>
						</view>
						<view class="my-btns" v-if="editIndex==index&&showEditBtn">
							<button class="cu-btn round line-red" @tap="cancelEdit">取消</button>
							<button class="cu-btn round line-red" style="margin-left:30upx" @tap="save">保存</button>
						</view>
						<view class="my-btns" v-else>
							<button class="cu-btn round line-red" @tap="edit(index)">编辑</button>
							<button class="cu-btn round line-red" style="margin-left:30upx" @tap="delAddress(index,item.address_id)">删除</button>
						</view>
					</view>
				</view>
			</view>
			<view class="null" v-else>
				<image src="../../static/index/search-null.png" style="width: 250upx;margin-top: 30%;" mode="widthFix"></image>
				<view style="color: #aaa;margin-top: 10upx;">暂无地址</view>
			</view>
		</view>

		<!-- 修改地址确认弹窗 -->
		<view class="cu-modal" :class="showModel=='addressModel'?'show':''">
			<view class="cu-dialog address-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;">确认修改地址吗？</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="sureSaveEdit">确定</button>
				</view>
			</view>
		</view>
		<bottom-btn :txt="'添加地址'" @tap="toAddAddress"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoaing: true,
				fromView: '',
				isNull: false,
				isShowBtn: true,
				addressList: [],
				isDefault: -1,
				editIndex: -1,
				showEditBtn: false,
				addArr: [],
				showModel: '',
				addressId: '',
				name: '',
				mobile: '',
				addressDetail: ''
			}
		},
		onLoad(options) {
			this.fromView = options.fromView
			if (this.fromView == 'order') {
				this.isShowBtn = false
			}
		},
		onShow() {
			this.isNull = false
			this.getAddressList()
		},
		methods: {
			clickAddress(e) {
				if (this.fromView == 'order') {
					//修改上一层页面(确认订单页面)的地址
					let addressMsg = {
						address_id: e.currentTarget.dataset.addressid,
						name: e.currentTarget.dataset.name,
						mobile: e.currentTarget.dataset.mobile,
						address: e.currentTarget.dataset.address
					}
					uni.setStorageSync('selectAddress',addressMsg)
					uni.navigateBack()
					return
				}
			},
			showSaveModel() {
				this.showModel = "addressModel"
			},
			//关闭选择规格弹窗
			closeModel() {
				this.showModel = ''
			},
			//设置默认地址
			setDefaultAddress(index, id) {
				this.isDefault = index
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserAddress/setDefault",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						id: id
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
					}
				})
			},
			//去添加新地址
			toAddAddress() {
				if (this.addressList.length >= 5) {
					this.showToast('地址最多添加五个')
					return
				}
				console.log('添加地址')
				uni.navigateTo({
					url: '../addAddress/addAddress'
				})
			},
			// 编辑地址
			edit(index) {
				this.editIndex = index
				this.showEditBtn = true
				this.addressId = this.addressList[index].address_id
				this.name = this.addressList[index].consignee
				this.addArr = [this.addressList[index].province, this.addressList[index].city, this.addressList[index].district]
				this.addressDetail = this.addressList[index].address
				this.mobile = this.addressList[index].mobile
			},
			//取消编辑
			cancelEdit() {
				this.showEditBtn = false
			},
			//点击保存地址
			save() {
				if (this.name == '') {
					this.showToast('请填写收货人')
				} else if (this.addressDetail == '') {
					this.showToast('请填写详细地址')
				} else if (this.mobile == '') {
					this.showToast('请填写手机号')
				} else {
					this.showSaveModel()
				}
			},
			//删除地址
			delAddress(index, id) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserAddress/delAddress",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						id: id,
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
						this.addressList.splice(index, 1)
						if (this.addressList.length == 0) {
							this.isNull = true
						}
					}
				})
			},
			//确认保存
			sureSaveEdit() {
				console.log('发送修改请求')
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserAddress/addressSave",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						address_id: this.addressId,
						consignee: this.name,
						province: this.addArr[0],
						city: this.addArr[1],
						district: this.addArr[2],
						address: this.addressDetail,
						mobile: this.mobile,
						is_default: this.isDefault == this.editIndex ? '1' : '0'
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.closeModel()
						if (res.data.msg.mobile) {
							this.showToast(res.data.msg.mobile)
							return
						}
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						})
						this.showEditBtn = false
						this.getAddressList()
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//修改省市区
			changeAddress(e) {
				this.addArr = e.detail.value
				// console.log(this.addArr)
			},
			//获取地址列表
			getAddressList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserAddress/addressList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoaing = false
						if(res.data.status==0){
							this.addressList = res.data.data.lists
							if (this.addressList.length == 0) {
								this.isNull = true
								return
							}
							for (let i = 0; i < this.addressList.length; i++) {
								this.addressList[i].addressDetail = this.addressList[i].province + this.addressList[i].city + this.addressList[
									i].district + this.addressList[i].address
								if (this.addressList[i].is_default == 1) {
									this.isDefault = i
								}
							}
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			}
		}
	}
</script>

<style>
	.address {
		margin-bottom: 180upx;
	}

	.address-item {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.2);
		padding: 20upx 30upx 30upx;
	}

	.item {
		display: flex;
		border-bottom: 1upx solid #F5F5F5;
		line-height: 45upx;
		padding: 20upx 0;
		font-size: 30upx;
	}

	.item .txt {
		width: 160upx;
	}

	.item .con {
		flex: 1;
	}

	.item .con input {
		border: 1upx solid #ddd;
		padding: 0 10upx;
		border-radius: 10upx;
		height: 100%;
	}

	.checkbox {
		margin-top: 20upx;
		font-size: 30upx;
	}

	.my-btns {
		display: flex;
		justify-content: flex-end;
		margin-top: 20upx;
	}

	.my-btns button {
		line-height: 50upx;
		height: 50upx;
		width: 160upx;
		padding: 0;
	}

	.address-box {
		padding: 60upx 30upx 30upx;
		width: 80%;
		position: relative;
	}

	.null {
		text-align: center;
	}
</style>
