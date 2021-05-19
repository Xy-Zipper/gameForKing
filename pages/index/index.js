let myApp = {
	/**
	 * 点击弹出输入框确定
	 */
	clickPromptConfirm: function(val, that) {
		console.log(val)
		switch (that.prompt.type) {
			case "userLevel":
				if (val > 30 || val < 0) {
					uni.showToast({
						title: "请输入0~30间",
						icon: 'none'
					})
					return
				}
				that.userInfo.userLevel = val;
			break
			case "warLevel":
				that.userInfo.warLevel = val;
			break
			case "userName":
				that.userInfo.userNickName = val.length > 7 ? val.substring(0, 7) + "..." : val
				break
			case "teamMsg":
				that.userTeam.teamName = val
				break
			case "area1":
				that.userInfo.area1 = val
				break
			case "area2":
				that.userInfo.area2 = val
				break
			case "hot":
				if (val > 10000000 || val < 0) {
					uni.showToast({
						title: "请输入零到百万间",
						icon: 'none'
					})
					return
				}
				if (val >= 10000) {

					that.userInfo.hot = Math.floor(val / 1000) / 10 + "W"
				} else {
					that.userInfo.hot = val
				}
				break
			case "thum":
				if (val > 10000000 || val < 0) {
					uni.showToast({
						title: "请输入零到百万间",
						icon: 'none'
					})
					return
				}
				if (val >= 10000) {
					that.userInfo.thum = Math.floor(val / 1000) / 10 + "W"
				} else {
					that.userInfo.thum = val
				}
				break
		}
		if (that.prompt.type == "area1") {
			that.showPrompt('area2', "设置所在地城市", "设置所在地城市");
			return
		}
		that.prompt = {
			title: "",
			type: "",
			visible: false,
			placeholder: "",
			inputType: "text",
			defaultValue: ""
		}
	},
	//更新用户信息
	updateUserInfo(type, that) {
		switch (type) {
			//修改头像以及等级
			case 0:
				/* let level = []
				for (let i = 1; i <= 30; i++) {
					level.push("Lv." + i)
				} */
				var choose = ["修改头像", "修改等级", "修改头像框"]
				// 选择修改类型
				that.$app.showActionSheet(choose).then(e => {
					// 修改等级
					if (e == 1) {
						that.showPrompt('userLevel', "设置等级", "修改等级", 'number')
						/* that.$app.showActionSheet(level).then(e => {
							that.userInfo.userLevel = level[e]
						}) */

						//修改头像
					} else if (e == 0) {
						that.$app.chooseImage(1).then(e => {
							that.userInfo.photo = e[0]
						})
					} else {
						// #ifdef APP-PLUS
						var photofram = [
							"无",
							"贵族初级头像框",
							"贵族高级头像框",
							"贵族特级头像框",
							"贵族超级头像框",
							"圣诞专属头像框",
							"黑白羽翼头像框",
							"欢乐暖冬头像框",
							"2016情人节纪念头像",
							"猴年纪念头像框",
							"奥运头像框",
							"里约吉祥物头像框",
							"暑假头像框",
							"必胜客合作头像框",
							"体验服玩家专属头像框",
							"日之塔头像框",
							"熊猫戏竹头像框",
							"龙御九霄头像框",
							"荣耀使者",
							"王者出征头像框",
							"萌小离头像框",
							"优雅之恋",
							"蔷薇之恋",
							"带你飞",
							"99公益头像框(2018)",
							"韩小信",
							"杜丹仙鹤",
							"三周年纪念头像框",
							"炫蓝贵族头像框",
							"红粉贵族头像框",
							"冰霜恋舞曲头像框",
							"幸福圣诞头像框",
							"2019元旦头像框",
							"嫦小娥头像框",
							"荣耀嗨战头像框",
							"赏金联赛第二赛季专属头像框",
							"魔种人入侵纪念头像框",
							"童年记忆纪念头像框",
							"夏日乐园头像框",
							"终极高手头像框",
							"王者知识点-活动专属头像框",
							"猪小戒头像框",
							"猪年纪念头像框",
							"汪汪汪头像框",
							"喵喵喵头像框",
							"瑞兽兆福头像框",
							"盘小古头像框",
							"王者营地头像框",
							"金箍祥云头像框",
							"王者快跑头像框",
							"小小瑶头像框",
							"代码之光头像框",
							"春韵头像框",
							"我是风儿头像框",
							"我是沙头像框",
							"五五狂欢头像框",
							"云小君头像框",
							"下笔有神头像框",
							"稷下头像框",
							"醒狮贺胜头像框",
							"吕布新秀头像框",
							"小小曜头像框",
							"王者体验展头像框",
							"夺鲲大作战头像框",
							"天生玩家头像框",
							"2019战队争霸赛晋级头像框",
							"2019战队争霸赛冠军头像框",
							"翡翠之龙头像框",
							"翡翠之凤头像框",
							"鹊桥相会头像框",
							"荣耀美少女头像框",
							"马小超头像框",
							"九九公益头像框(2019)",
							"月明千里头像框",
							"金秋岁月头像框",
							"西小施头像框",
							"华灯璀璨头像框",
							"驭魔高手头像框",
							"千灯之约头像框",
							"浪漫啊哈男头像框",
							"甜蜜阿美女头像框",
							"被招募者专属头像框",
							"战友招募者专属头像框",
							"师傅头像框",
							"徒弟头像框",
							"恋人头像框",
							"基友头像框",
							"死党头像框",
							"闺蜜头像框",
							"初级成就头像框",
							"高级成就头像框",
							"大队长头像框",
							"中秋纪念头像框",
							"一周年纪念头像框",
							"勇士头像框",
							"鸡年纪念头像框",
							"2017情人节男朋友头像框",
							"英雄学院专属头像框",
							"春暖花开头像框",
							"小鹿头像框",
							"告白天使右翼",
							"欢腾龙舟",
							"长城守卫军",
							"热夏海岸头像框",
							"胜者为王头像框",
							"英雄学院专属头像框2017年秋季",
							"两周年纪念头像框",
							"聚在营地头像框",
							"单身贵族头像框",
							"2017欢乐暖冬头像框",
							"圣诞狂欢头像框",
							"速度先锋头像框",
							"上分大吉头像框",
							"2018情人节纪念头像框",
							"战神头像框",
							"狗年纪念头像框",
							"五月天开黑头像框",
							"萌小乔",
							"周小瑜",
							"快乐竞技头像框",
							"浓情端午头像框",
							"百里突围头像框",
							"2018世界杯纪念头像框",
							"圣斗士星矢头像框", "微赛事头像框",
							"人气头像框",
							"人气达人头像框",
							"人机挑战头像框",
							"信誉头像框",
							"鲁大班头像框",
							"天美Timi头像框",
							"真香头像框",
							"2020元旦雪人头像框",
							"王者营地一周年纪念头像框",
							"萌小犽头像框",
							"鼠年纪念头像框",
							"玄雍强者头像框",
							"柿柿如意头像框",
							"霹雳雷鹏头像框",
							"点赞2020头像框",
							"星河守望头像框",
							"财源滚滚头像框",
							"年年有鱼头像框",
							"共聚新春头像框",
							"五岳山河志头像框",
							"蝶之花语头像框",
							"王者创意官",
							"小小镜头头像框",
							"玄雍防线头像框",
							"国色天香头像框",
							"峡谷历险记头像框",
							"紫韵幽梦头像框",
							"红粉佳人头像框",
							"蜀国主打歌头像框",
							"长城阵营头像框",
							"稷下阵营头像框",
							"学雍正音头像框",
							"魏阵营头像框",
							"吴阵营头像框",
							"守卫之星头像框",
							"五虎上将头像框",
							"蒙大恬头像框",
							"乘风破浪头像框",
							"暗影之都图像框",
							"海洋乐园头像框",
							"蜀国阵营头像框",
							"东风祭坛头像框",
							"小小朵头像框",
							"九九公益头像框2020",
							"喵之狂想头像框",
							"浪漫乐园头像框",
							"峡谷探秘头像框",
							"玫瑰之密头像框",
							"天狼之星头像框",
							"山河星梦头像框",
							"创意互动一周年头像框",
							"童趣乐园头像框",
							"纸鸾嬉春头像框",
							"大司空头像框",
							"长安夺魁头像框",
							"巅峰赛专属头像框",
							"超时空战士皮肤专属头像框",
							"地狱火皮肤专属头像框",
							"地狱之眼皮肤专属头像框"
						]
						that.$app.showActionSheet(photofram).then(e => {
							if (e > 12) {
								e += 6;
							}
							if (e < 10) {
								that.userInfo.photoFram = `/static/photofram/00${e}.png`

							} else if (e < 100) {
								that.userInfo.photoFram = `/static/photofram/0${e}.png`
							} else {

								that.userInfo.photoFram = `/static/photofram/${e}.png`
							}
						})
						// #endif
					}
					// #ifdef MP
					uni.showToast({
						title:"下载App体验更多功能",
						icon:"none"
					})
					// #endif
				})
				break
				//"修改战令等级", "修改性别", "修改昵称"
			case 1:
				var choose = ["修改战令等级", "修改性别", "修改昵称"]
				that.$app.showActionSheet(choose).then(e => {
					if (e == 0) {
						that.showPrompt('warLevel', "设置战令等级", "修改等级", 'number')
					} else if (e == 1) {
						that.$app.showActionSheet(["男", "女"]).then(e => {
							that.userInfo.sex = e == 0 ? '男' : '女'
						})
					} else {
						that.showPrompt('userName', "设置昵称", "修改昵称")
					}
				})

				break
				//修改战队信息", "修改地区
			case 2:
				var choose = ["修改战队信息", "修改地区"]
				that.$app.showActionSheet(choose).then(e => {
					//修改战队信息
					if (e == 0) {
						var changeStatus = ["添加战队信息", "未加入战队"]
						that.$app.showActionSheet(changeStatus).then(teamRes => {
							if (teamRes == 1) {
								that.userTeam.joinTeam = false
							} else {
								that.userTeam.joinTeam = true
								let teamLevel = ["队长", "副队","领队", "精英", "队员"]
								that.$app.showActionSheet(teamLevel).then(teamLevelRes => {
									that.userTeam.teamLevel = teamLevel[teamLevelRes]

									that.showPrompt('teamMsg', "设置战队名称", "设置战队名称")
								})
							}
						})
					} else {
						that.showPrompt('area1', "设置所在地省份", "设置所在地省份")
					}

				})
				break
				//修改热度、点赞
			case 3:
				var choose = ["修改热度", "修改点赞数", "切换显示微信名片"]
				that.$app.showActionSheet(choose).then(e => {
					if (e == 0) {
						that.showPrompt('hot', "设置热度", "设置热度", 'number');
					} else if (e == 1) {
						that.showPrompt('thum', "设置点赞数", "设置点赞数", 'number');
					} else {
						that.isShowWechartCar = !that.isShowWechartCar;
					}
				})
				break
		}
	},
	//选择展示的荣耀
	chooseHonest(that) {
		var $this = this;
		var showHero = ["中路", "对抗路", "发育路", "游走", "打野"]
		that.heroList.forEach(item=>{
			showHero.push(item.name)
		})
		$this.chooseFiveHonest(that, showHero);
	},
	chooseFiveHonest:function(that,showData){
		var $this = this;
		var index = 0;
		var array = [];
		for (var i = 0; i < 5; i++) {
			if (showData[index + i])
				array[i] = showData[index + i];
		}
		if (showData[5])
			array[array.length] = "下一页"
			that.$app.showActionSheet(array).then(ind => {
				if (ind != 5 || array[5] != "下一页") {
					that.showHonest = `国服最强${array[ind]}`
				} else {
					showData.splice(0, 5);
					$this.chooseFiveHonest(that, showData);
				}
				
			})
	},
	/**显示对话框
	 * @param {Object} type 辨别类型
	 * @param {Object} placeholder 提示
	 * @param {Object} title 标题
	 * @param {Object} inputType input类型
	 * @param {Object} defaultValue 默认值
	 */
	showPrompt(type, placeholder, title, inputType, defaultValue, that) {
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

	//切换为模型', '换英雄
	chooseModeAndSkin(that) {
		var choose = ['切换为模型', '换英雄']
		that.$app.showActionSheet(choose).then(e => {
			if (e == 0) {
				uni.showToast({
					title: '正在开发中~',
					icon: 'none',
					position: 'bottom'
				})
			} else {
				if (that.pickVal.value < 102) {
					that.onloadData();
				}
				that.$refs.myPicker.show()
			}
		})
	},
	onloadData(that) {
		//是否切换为微信界面
		uni.showModal({
			title: '提示',
			content: '是否切换为微信？',
			success: function(res) {
				if (res.confirm) {
					that.isShowWechartCar = true
				}
			}
		});

		//获取英雄以及皮肤
		that.$app.sendHttpRequest("interface/getHeroAll", {}, "get", true)
			.then(res => {
				res.forEach(item => {
					item = item.heroinfo
					//获取所有英雄
					that.heroList.push(item.hero)
					let obj = {
						label: item.hero.name,
						value: item.hero.name,
						children: []
					}
					item.skin.forEach(skin => {
						obj.children.push({
							label: skin.clothesName,
							value: skin.path
						})
					})
					that.pickVal.value.push(obj)
				})
				  uni.setStorageSync('heroList', JSON.stringify(that.heroList));
				
			})
	}

}

module.exports = {
	myApp
}
