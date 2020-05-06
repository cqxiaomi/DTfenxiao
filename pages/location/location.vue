<template>
	<view>
		<city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity" :obtainCitys="obtainCitys"
		 :isSearch="true" ref="citys" @childCity="getLocalCity"></city-select>
	</view>
</template>

<script>
	import citys from '../../common/citys.js'
	// console.log(citys.length)
	import citySelect from '@/components/city-select/city-select.vue'
	export default {
		data() {
			return {
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'title',
				//当前城市
				activeCity: {
					id: 1,
					title: '北京市'
				},
				//热门城市
				hotCity: null,
				//显示的城市数据
				obtainCitys: null
			}
		},
		components: {
			citySelect
		},
		onLoad(options) {
			//修改数据格式
			this.formatName = 'cityName'
			//修改当前城市
			this.activeCity = {
				cityName: '北京市'
			}
			if (options.city) {
				this.activeCity = {
					cityName: options.city
				}
			}
			//修改热门城市
			this.hotCity = [{
					cityCode: 310100,
					cityName: '上海市'
				},
				{
					cityCode: 110100,
					cityName: '北京市'
				},
				{
					cityCode: 330100,
					cityName: '杭州市'
				},
				{
					cityCode: 440100,
					cityName: '广州市'
				},
				{
					cityCode: 320100,
					cityName: '南京市'
				}
			]
			this.obtainCitys = citys
		},
		methods: {
			cityClick(item) {
				// this.$common.defaultCity = item.cityName
				uni.setStorageSync('localCity', item.cityName)
				uni.navigateBack()
			},
			//接受子组件传来的值
			getLocalCity(city){
				this.activeCity = {
					cityName: city
				}
			}
		}
	}
</script>

<style></style>
