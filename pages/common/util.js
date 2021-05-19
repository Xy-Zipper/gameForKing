let mainApp = {
	// ServerUrl: "http://kuim.xyz/game-for-king/",
	ServerUrl: "https://www.icodingzy.xyz/gameking/",
	// ServerUrl: "http://127.0.0.1:8880/",
	//随机字符串
	randomString: function(length) {
		var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = length; i > 0; --i)
			result += str[Math.floor(Math.random() * str.length)];
		return result;
	},
	//封装操作菜单
	showActionSheet: function(itemList) {
		return new Promise((resolve, reject) => {
			uni.showActionSheet({
				itemList: itemList,
				success: function(res) {
					resolve(res.tapIndex)
					console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				},
				fail: function(res) {
					reject(res);
				}
			});
		})
		
	},
	//选择照片
	chooseImage: function(count) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: count, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					resolve(res.tempFilePaths)
				},
				fail: function(res) {
					reject(res);
				}
			});
		})
	},
	/**
	 * 封装请求
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} method
	 * @param {Object} hideLoading
	 */
	sendHttpRequest: function(url, data, method, hideLoading) {
		if (hideLoading == undefined) {
			uni.showLoading();
		}
		method == null || undefined ? 'GET' : method;
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.ServerUrl + url,
				method: method,
				data: data,
				success(data) {
					uni.hideLoading();
					if (data.data.code == 200) {
						resolve(data.data.data);
					} else {
						uni.showToast({
							title: "网络繁忙请重试",
							icon: 'none'
						});
						
						console.log(data);
						reject(data);
					}
				},
				fail(data) {
					uni.hideLoading();
					uni.showToast({
						title: "网络繁忙请重试",
						icon: 'none'
					});
					console.log(data);
					reject(data);
				}
			})
		});
	}

}

module.exports = {
	mainApp
}
