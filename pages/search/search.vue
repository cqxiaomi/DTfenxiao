<template>
	<view>
		<view class="search">
			<view class="inputbox">
				<input type="text" v-model="keyWords" placeholder="请输入关键词" confirm-type="search" focus="true" @confirm="getSearchList"/>
				<text class="cuIcon-search text-gray" style="font-size: 34upx;padding: 0 20upx;" @tap="getSearchList"></text>
			</view>
		</view>
		<view class="containA">
			<view class="history" v-if="showHistory">
				<view class="subtitle">
					<text style="color: #373739;font-weight: 600;">搜索历史</text>
					<i class="iconfont iconiconfont-shanchu" style="color: #cfcfcf;font-size: 32upx;" @tap="showModel"></i>
				</view>
				<view class="con">
					<view class="key" v-for="(item,index) in historys" :key="index" @tap="setKeyWord(item)">{{item}}</view>
					<view class=""></view>
					<view class=""></view>
				</view>
			</view>
			<view class="hot">
				<view style="color: #373739;font-weight: 600;">热门搜索</view>
				<view class="con">
					<view class="key" v-for="(item,index) in hots" :key="index" @tap="setKeyWord(item)">{{item}}</view>
					<view class=""></view>
					<view class=""></view>
				</view>
			</view>
			<view class="cu-modal" :class="isShowModel?'show':''">
				<view class="cu-dialog box">
					<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
					<view style="margin-bottom: 40upx;">确认要清除历史数据吗？</view>
					<view class="btns">
						<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
						<button class="cu-btn round bg-red shadow" @tap="clearHistory">确定</button>
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
				historys:[],
				hots:[],
				keyWords: '',
				isShowModel:false,
				showHistory:false
			}
		},
		onShow() {
			this.keyWords = ''
			this.getKeyWords()
		},
		methods: {
			showModel() {
				this.isShowModel = true
			},
			closeModel() {
				this.isShowModel = false
			},
			//获取搜索关键词
			getKeyWords(){
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Index/search",
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.hots = res.data.data.hot_keywords
						if(!res.data.data.q_list||res.data.data.q_list.length==0){
							this.showHistory = false
						}else{
							this.showHistory = true
						}
						this.historys = res.data.data.q_list
					}
				})
			},
			//清除搜索历史记录
			clearHistory(){
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Index/clearSearch",
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.getKeyWords()
						uni.showToast({
							title:'清除成功',
							icon:'success'
						})
						this.closeModel()
					}
				})
			},
			//点击关键词
			setKeyWord(keywords){
				this.keyWords = keywords
				this.getSearchList()
			},
			//跳转显示搜索结果数据列表
			getSearchList() {
				if (this.keyWords == '') {
					this.showToast('请输入搜索关键词')
					return
				}
				uni.navigateTo({
					url:'../searchDetail/searchDetail?keyWords='+this.keyWords
				})
			}
		}
	}
</script>

<style>
	.search {
		padding: 20upx 30upx;
		display: flex;
		justify-content: space-between;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		top: 0;
		background-color: #55AFFD;
		z-index: 100;
	}

	.inputbox {
		flex: 1;
		display: flex;
		height: 70upx;
		line-height: 70upx;
		justify-content: space-between;
		background-color: #F7F7F7;
		border-radius: 35upx;
	}

	.inputbox input {
		height: 70upx;
		line-height: 70upx;
		flex: 1;
		padding-left: 30upx;
	}

	.history,
	.hot {
		padding: 30upx 50upx;
	}

	.subtitle {
		display: flex;
		justify-content: space-between;
	}

	.con {
		overflow: hidden;
		margin: 20upx 0 40upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.con>view{
		width: 144.5upx;
		margin: 10upx 0;
	}

	.con .key {
		text-align: center;
		padding: 0 10upx;
		height: 55upx;
		line-height: 55upx;
		border-radius: 15upx;
		color: #666;
		font-size: 24upx;
		box-sizing: border-box;
		background-color: #f7f7f7;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.box {
		padding: 60upx 30upx 30upx;
		width: 80%;
		position: relative;
	}

	.containA {
		margin-top: 110upx;
	}

</style>
