<template>
	<view>
		<view class="combat">
			<!-- 1.段位 -->
			<!-- 2.场数、游戏、皮肤数量 -->
			<view class="topBox">
				<view class="gradingHonest">
					<view class="grading" @click="updateGrading">
						<view class="nowGrading">
							<image :src="grading.nowHonest"></image>
							<text class="bottomText">赛季</text>
						</view>
						<view class="topGrading">
							<image :src="grading.bestHonest"></image>
							<text class="bottomText">历史</text>
						</view>
						<view class="stamp">
							<image style="width: 38rpx; height: 30rpx;" src="/static/grading/stamp.png"></image>
							<text class="gameFont stampSize">{{grading.stamp}}</text>
							<text class="bottomText" style="margin-top: 2rpx; top:0rpx">总印记 {{grading.stamp}}</text>
						</view>
						<view class="topHonest">
							<image src="/static/normal/topnum.png" style="width: 27rpx; height: 24rpx;"></image>
							<text class="topNum">{{grading.topNum}}</text>
							<text class="bottomText" style="top: 6rpx;">巅峰</text>
						</view>
					</view>
					<view class="fightInfo" @click="fightInfoFun">
						<view class="fightNum">
							<text class="topText">{{fightInfo.fightNum}}</text>
							<text class="bottomText">对战场次</text>
						</view>
						<view class="fightThum">
							<text class="topText">{{fightInfo.fightThum}}</text>
							<text class="bottomText">对战被赞</text>
						</view>
						<view class="honestLevel">
							<image src="/static/normal/honestLevel.png" mode=""></image>
							<text class="gameFont honestNum">{{fightInfo.honestLevel}}</text>
							<text class="bottomText" style="top: -1rpx;">信誉等级</text>
						</view>
					</view>
				</view>
				<!-- 右侧的分路等级、英雄、皮肤 -->
				<view class="rightHonest">
					<!-- 分路和常用英雄 -->
					<view class="branchAndHero" @click="changeBranchAndHero">
						<view class="branchLevel">
							<image :src="branch.branchLevelPng" mode=""></image>
							<text class="bottomText" style="position: relative; top: -6rpx;">{{branch.type}}{{branch.branchLevel}}段</text>
						</view>
						<view class="useHero">
							<view class="hero">
								<view v-for="(item,index) in useHero" :key="index">
									<image :src="item" mode=""></image>
								</view>
							</view>
							<text class="bottomText" style="position: relative; top: 1rpx;">我的英雄</text>
						</view>
					</view>
					<!-- 英雄总数与皮肤总数 -->
					<view class="myHeroAndSkin" style="position: relative; bottom: 4rpx;" @click="myHeroAndSkinFun">
						<view class="heroNum">
							<text class="topText">{{userRes.hero}}</text>
							<text class="bottomText">英雄</text>
						</view>
						<view class="skinNum">
							<text class="topText">{{userRes.skin}}</text>
							<text class="bottomText">皮肤</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 3.游戏天数，把数 -->
			<view style="border: none; display: flex;">
				<!-- 生涯、天数 -->
				<view class="gradingHonest" style="border: none;" @click="gamePassedDayFun">
					<view class="fightInfo">
						<view class="fightNum">
							<image src="/static/normal/carneer.png" mode=""></image>
							<text class="bottomText" style="color: rgba(231, 199, 122, 0.6);">生涯></text>
						</view>
						<view class="fightThum">
							<text class="topText">{{userRes.gamePassedDay}}</text>
							<text class="bottomText">游戏天数</text>
						</view>
						<view class="honestLevel">
						</view>
					</view>
				</view>
				<!-- 游戏场次 -->
				<view class="rightHonest" @click="fightTypeFun">
					<view class="myHeroAndSkin" style="position: relative; top: 4rpx;">
						<view class="heroNum">
							<text class="topText">{{fightType.normal}}</text>
							<text class="bottomText">王者峡谷</text>
						</view>
						<view class="skinNum">
							<text class="topText">{{fightType.funny}}</text>
							<text class="bottomText">无限乱斗</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 4、访客 -->
			<view class="viewer" @click="addViewerFun">
				<text class="bottomText">访客 ></text>
				<view class="viewPhoto">
					<image v-for="item in viewArr" :src="item" mode=""></image>
				</view>
			</view>

			<my-prompt @updateIndex = "updateIndex" class="myprompt" :visible.sync="prompt.visible" :placeholder="prompt.placeholder" :defaultValue="prompt.defaultValue"
			 @confirm="clickPromptConfirm" mainColor="#e74a39" :title="prompt.title" :isMutipleLine="false" :inputType="prompt.inputType">
			</my-prompt>
		</view>
	</view>
</template>

<script>
	var {
		myApp
	} = require('./combat.js')
	import myPrompt from '@/components/zz-prompt/index.vue'
	export default {
		components: {
			myPrompt
		},
		data() {
			return {
				//弹出框
				prompt: {
					title: "",
					type: "", //类型
					visible: false, // 控制弹框输入框显示
					inputType: "text",
					placeholder: "",
					defaultValue: ""
				},
				//分路 对象
				branch: {
					branchLevelPng: "/static/honestLevel/fayumax.png",
					branchLevel: "0",
					type: "发育路"
				},
				//展示的英雄
				useHero: ["http://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131-smallskin-1.jpg"],
				//段位和巅峰赛分数
				grading: {
					topNum: 1200,
					stamp: 12,
					nowHonest: "/static/honestLevel/qt3.png",
					bestHonest: "/static/honestLevel/qt3.png"
				},
				//战斗场数
				fightInfo: {
					fightNum: 0,
					fightThum: 0,
					honestLevel: 7
				},
				//用户的资源
				userRes: {
					hero: 0,
					skin: 0,
					gamePassedDay: 0
				},
				//战斗的类型场次
				fightType: {
					normal: 0,
					funny: 0
				},
				//观众头像 max3
				viewArr: []
			}
		},
		methods: {
			updateIndex(){
				this.$emit("showPreIndex", true);
			},
			//修改段位
			updateGrading() {
				myApp.updateGrading(this)
			},
			//战斗场次、被赞、信誉等级
			fightInfoFun() {
				myApp.fightInfoFun(this)
			},
			//英雄数量、皮肤数
			myHeroAndSkinFun() {
				myApp.myHeroAndSkinFun(this)
			},
			//游戏天数
			gamePassedDayFun() {
				myApp.gamePassedDayFun(this)
			},
			fightTypeFun() {
				myApp.fightTypeFun(this)
			},
			//改变分路和展示英雄
			changeBranchAndHero() {
				myApp.changeBranchAndHero(this)
			},
			addViewerFun() {
				myApp.addViewerFun(this)
			},
			/**
			 * 点击弹出输入框确定
			 */
			clickPromptConfirm(val) {
				myApp.clickPromptConfirm(val, this)
			},
			/**显示对话框
			 */
			showPrompt(type, placeholder, title, inputType, defaultValue) {
				myApp.showPrompt(type, placeholder, title, inputType, defaultValue, this)
			}
		}
	}
</script>

<style>
	@import url("./combat.css");
	.myprompt{
		z-index: 999!important;
	}
</style>
