<template>
	<view class="page">
		<view class="container">
			<image src="/static/normal/startPic.png" @click="startFunc" mode=""></image>
			<!-- #ifdef APP-PLUS -->
				<image src="/static/normal/checkUpdatePic.png" @click="updateFunc" mode=""></image>
			<!-- #endif -->
			<image src="/static/normal/aboutPic.png" @click="aboutFunc" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow() {
			//#ifdef APP-PLUS
			// 锁定屏幕方向 我锁定的是横屏正方向
			plus.screen.lockOrientation('portrait-primary');
			//plus.screen.lockOrientation('landscape-secondary');
			//#endif
		},
		methods: {
			startFunc() {
				// uni.showLoading();
				//#ifdef APP-PLUS
				// 锁定屏幕方向 我锁定的是横屏正方向
				plus.screen.lockOrientation('landscape-primary');
				//plus.screen.lockOrientation('landscape-secondary');
				//#endif
				uni.showModal({
				    title: '提示',
				    content: '是否开始自定义？',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
							setTimeout(()=>{
								uni.hideLoading();
								uni.navigateTo({
									url:"../index/index"
								})
							},1000)
				        }else{
							//#ifdef APP-PLUS
							// 锁定屏幕方向 我锁定的是横屏正方向
							plus.screen.lockOrientation('portrait-primary');
							//plus.screen.lockOrientation('landscape-secondary');
							//#endif
						}
				    }
				});
				// setTimeout(()=>{
				// 	uni.hideLoading();
				// 	uni.navigateTo({
				// 		url:"../index/index"
				// 	})
				// },2000)
				
			},
			updateFunc() {
				//#ifdef APP-PLUS
				// 锁定屏幕方向 我锁定的是横屏正方向
				plus.screen.lockOrientation('portrait-primary');
				//plus.screen.lockOrientation('landscape-secondary');
				//#endif
				uni.navigateTo({
					url:"../update/update"
				})
				
			},
			aboutFunc(){
				uni.showModal({
				    title: '提示',
				    content: '自定义战绩面板，作者QQ：1054959069；3024670948',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style>
	@import url("./main.css");
</style>
