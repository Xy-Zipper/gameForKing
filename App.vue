<script>
	export default {
		components: {},
		onLaunch: function() {
			// #ifdef APP-PLUS
			// 锁定屏幕方向 我锁定的是横屏正方向
			plus.screen.lockOrientation('landscape-primary');
			//plus.screen.lockOrientation('landscape-secondary');
			
			plus.navigator.setFullscreen(true);
			/* 隐藏导航栏 */
			plus.navigator.hideSystemNavigation();
			//检查更新
			this.$app.sendHttpRequest("version/getLatestVersion")
				.then(res => {
					plus.runtime.getProperty(plus.runtime.appid, (system) => {
						if (system.version < res.vs) {
							uni.showModal({
								title: '提示',
								content: '发现新版本，是否进行更新?',
								success: function(e) {
									if (e.confirm) {
										plus.screen.lockOrientation('portrait-primary');
										setTimeout(()=>{
											uni.reLaunch({
												url: '/pages/update/update'
											})
										},1000)
										
									} else if (e.cancel) {}

								}
							});
						}
					});
				})

			// #endif	
		},
		onShow: function() {
			// #ifdef APP-PLUS
			plus.navigator.hideSystemNavigation();
			// #endif	
		},
		onHide: function() {
			// #ifdef APP-PLUS
			plus.navigator.hideSystemNavigation();
			// #endif	
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/pages/common/font.css");
	.gameFont {
		font-family: 'gameFont';
	}
	
	/*解决iphoneX等大屏手机底部小黑条挡住tab的解决方法：
	安全区域距离底部边界距离env() 跟 constant() 需要同时存在，而且顺序不能换。*/
	/* #ifdef H5 */
	body {
		padding-bottom: constant(safe-area-inset-bottom);
		/* 兼容 iOS < 11.2 */
		padding-bottom: env(safe-area-inset-bottom);
		/* 兼容 iOS >= 11.2 */
	}

	/* #endif */
</style>
