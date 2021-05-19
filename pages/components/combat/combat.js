let myApp = {
	updateHis: function(that, hoestLevel, pathLevel) {
		var $this = this;
		var index = 0;
		var array = [];
		for (var i = 0; i < 5; i++) {
			if (hoestLevel[index + i])
				array[i] = hoestLevel[index + i];
		}
		if (hoestLevel[5])
			array[array.length] = "下一页"
		that.$app.showActionSheet(array).then(ind => {
			if (ind != 5 || array[5] != "下一页") {
				that.grading.nowHonest = `/static/honestLevel/${pathLevel[ind]}.png`;
			} else {
				hoestLevel.splice(0, 5);
				pathLevel.splice(0, 5);
				$this.updateHis(that, hoestLevel, pathLevel);
			}
		})
	},
	updateNow: function(that, hoestLevel, pathLevel) {
		var $this = this;
		var index = 0;
		var array = [];
		for (var i = 0; i < 5; i++) {
			if (hoestLevel[index + i])
				array[i] = hoestLevel[index + i];
		}
		if (hoestLevel[5])
			array[array.length] = "下一页"
		that.$app.showActionSheet(array).then(ind => {
			if (ind != 5 || array[5] != "下一页") {
				that.grading.bestHonest = `/static/honestLevel/${pathLevel[ind]}.png`;
			} else {
				hoestLevel.splice(0, 5);
				pathLevel.splice(0, 5);
				$this.updateNow(that, hoestLevel, pathLevel);
			}
		})
	},
	//更新段位信息
	updateGrading: function(that) {
		var $this = this;
		var choose = ["修改当前赛季段位", "修改历史最高段位", "修改总印记数", "修改巅峰分数"]
		var hoestLevel = ["荣耀王者", "最强王者", "星耀1", "星耀2", "星耀3", "星耀4", "星耀5", "钻石1", "钻石2", "钻石3", "钻石4", "钻石5",
			"铂金1", "铂金2", "铂金3", "铂金4", "黄金1", "黄金2", "黄金3", "黄金4", "白银1", "白银2", "白银3",
			"青铜1", "青铜2", "青铜3"
		]
		var pathLevel = ["rywz", "zqwz", "xy1", "xy2", "xy3", "xy4", "xy5", "zs1", "zs2", "zs3", "zs4", "zs5",
			"bj1", "bj2", "bj3", "bj4", "hj1", "hj2", "hj3", "hj4", "by1", "by2", "by3",
			"qt1", "qt2", "qt3"
		]
		that.$app.showActionSheet(choose).then(e => {
			switch (e) {
				case 0:
					$this.updateHis(that, hoestLevel, pathLevel);
					break
				case 1:
					$this.updateNow(that, hoestLevel, pathLevel);
					break
				case 2:
					that.showPrompt("stamp", "请输入大于1的印记数", "修改印记数", "number")
					break
				case 3:
					that.showPrompt("topNum", "请输入你的巅峰赛分数", "修改巅峰赛分数", "number")
					break
			}
		})
	},
	fightInfoFun(that) {
		var choose = ["修改对战场次", "修改被赞次数", "修改信誉等级"]
		that.$app.showActionSheet(choose).then(ind => {
			switch (ind) {
				case 0:
					that.showPrompt("fightNum", "输入大于0", "修改对战场次", "number")
					break
				case 1:
					that.showPrompt("fightThum", "输入大于0", "修改被赞次数", "number")
					break
				case 2:
					var honestLevel = ['信誉7', '信誉6', '信誉5', '信誉4', '信誉3', '信誉2', '信誉1']
					var trueHonestLevel = [7, 6, 5, 4, 3, 2, 1]
					that.$app.showActionSheet(honestLevel).then(index => {
						that.fightInfo.honestLevel = trueHonestLevel[index]
					})
					break
			}
		})
	},
	myHeroAndSkinFun(that) {
		var choose = ["修改英雄个数", "修改皮肤个数"]

		that.$app.showActionSheet(choose).then(ind => {
			if (ind == 0) {
				that.showPrompt("heroNum", "输入大于0", "修改英雄个数", "number")
			} else {
				that.showPrompt("skinNum", "输入大于0", "修改皮肤个数", "number")
			}
		})
	},
	gamePassedDayFun(that) {
		that.showPrompt("gamePassedDay", "输入大于0", "修改游戏天数", "number")
	},
	fightTypeFun(that) {
		var choose = ["修改王者峡谷次数", "修改无限乱斗次数"]

		that.$app.showActionSheet(choose).then(ind => {
			if (ind == 0) {
				that.showPrompt("fightNormal", "输入大于0", "修改王者峡谷次数", "number")
			} else {
				that.showPrompt("fightFunny", "输入大于0", "修改无限乱斗次数", "number")
			}
		})
	},
	chooseHero:function(that,heroList){
		var $this = this;
		var index = 0;
		var array = [];
		
		for (var i = 0; i < 5; i++) {
			if (heroList[index + i])
				array[i] = heroList[index + i].name;
		}
		if (heroList[5])
			array[array.length] = "下一页"
			
		that.$app.showActionSheet(array).then(ind => {
			if (ind != 5 || array[5] != "下一页") {
				that.useHero.push(heroList[ind].photo)
			} else {
				heroList.splice(0, 5);
				$this.chooseHero(that, heroList);
			}
		})
	},
	changeBranchAndHero(that) {
		var $this = this;
		var choose = ["修改分路", "修改分路等级", "修改我的英雄"]

		that.$app.showActionSheet(choose).then(ind => {
			if (ind == 0) {
				var type = ["发育路", "打野", "中路", "对抗路", "游走"]
				var icon = ["fayumax", "dayemax", "zhonglumax", "duikangmax", "youzoumax"]
				that.$app.showActionSheet(type).then(index => {
					that.branch.branchLevelPng = `/static/honestLevel/${icon[index]}.png`
					that.branch.type = type[index]
				})
			} else if (ind == 1) {
				that.showPrompt("branchLevel", "输入大于0", "修改分路等级", "number")
			} else {
				var chooseHero = ["清空所有英雄", "添加英雄"]
				that.$app.showActionSheet(chooseHero).then(index => {
					if (index == 0) {
						that.useHero = []
					} else {
						if (that.useHero.length == 3) {
							uni.showToast({
								title: "已经有三位英雄",
								icon: 'none',
								position: 'bottom'
							})
							return
						}
						var heroList = JSON.parse(uni.getStorageSync('heroList'));
						$this.chooseHero(that,heroList);
					}
				})
			}
		})
	},
	addViewerFun(that) {
		uni.chooseImage({
			count: 3, //默认9
			sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function(res) {
				that.viewArr = res.tempFilePaths
			}
		});
	},
	/**显示对话框
	 * @param {Object} type 辨别类型
	 * @param {Object} placeholder 提示
	 * @param {Object} title 标题
	 * @param {Object} inputType input类型
	 * @param {Object} defaultValue 默认值
	 */
	showPrompt(type, placeholder, title, inputType, defaultValue, that) {
		that.$emit("showPreIndex", false);
		that.prompt.type = type;
		that.prompt.placeholder = placeholder
		that.prompt.title = title
		that.prompt.visible = true
		if (inputType != null && inputType != undefined) {
			that.prompt.inputType = inputType
		}
		if (defaultValue != null && defaultValue != undefined) {
			that.prompt.defaultValue = title
		}
	},
	/**
	 * 点击弹出输入框确定
	 */
	clickPromptConfirm: function(val, that) {
		switch (that.prompt.type) {
			case "branchLevel":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
					return
				}
				that.branch.branchLevel = val
				break
			case "fightNormal":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
					return
				}
				that.fightType.normal = val
				break
			case "fightFunny":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
				}
				that.fightType.funny = val
				break
			case "gamePassedDay":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
					return
				}
				that.userRes.gamePassedDay = val
				break
			case "heroNum":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
					return
				}
				that.userRes.hero = val
				break

			case "skinNum":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
					return
				}
				that.userRes.skin = val
				break
			case "stamp":
				if (val <= 0) {
					uni.showToast({
						title: "数量少于1",
						icon: "none"
					})
					return
				}
				that.grading.stamp = val
				break
			case "topNum":
				if (val <= 0) {
					uni.showToast({
						title: "分数不能少于1",
						icon: "none"
					})
					return
				}
				that.grading.topNum = val
				break
			case "fightNum":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
					return
				}
				that.fightInfo.fightNum = val
				break

			case "fightThum":
				if (val < 0) {
					uni.showToast({
						title: "请输入大于零的数",
						icon: 'none'
					})
					return
				}
				that.fightInfo.fightThum = val
				break
		}
		that.prompt = {
			title: "",
			type: "",
			visible: false,
			placeholder: "",
			inputType: "text",
			defaultValue: ""
		}
		that.$emit("showPreIndex", true);
	}


}

module.exports = {
	myApp
}
