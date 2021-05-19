<template>
	<view class="content">
		<!-- 操作面板部分（图片） -->
		<view class="opration" @click="oprationClick">
		</view>

		<view class="myIndex">

			<!-- 海报部分 -->
			<view class="right-myIndex" :style="'background: linear-gradient(to right,rgba(21, 47, 80, 1) 0%, rgba(21, 47, 80, 1) 15%, rgba(21, 47, 80, 0.95) 20%,  rgba(21, 47, 80, 0.6) 40%,    rgba(21, 47, 80, 0) 50%),url('+imageURL+') center / cover'">
			</view>
			<!-- 设置游戏 -->
			<view class="setting">
				<image src="/static/normal/setting.png" mode=""></image>
			</view>
			<!-- 改变英雄 -->
			<view class="changeHreo" @click="chooseModeAndSkin">
				<image src="/static/normal/model.png" mode=""></image>
				<image src="/static/normal/changHero.png" mode=""></image>
			</view>
			<!-- 顶部的个人信息部分 -->
			<view class="userInfo" :style="showZIndex?'z-index:1':''">
				<!-- 个人主页（图片） -->
				<view class="left-myIndex">
					<view class="myIndexText">
						<image src="/static/normal/myPageTitle.png"></image>
					</view>
				</view>

				<view class="bottom">
					<!-- 头像部分  -->
					<view class="photo" @click="updateUserInfo(0)" :style="'background-image:url('+userInfo.photo+')'">
						<image class="photoFram" :src="userInfo.photoFram">
						</image>
						<view>
							<text>{{userInfo.userLevel}}</text>
						</view>
					</view>
					<!-- 用户信息部分 -->
					<view class="userName">
						<!-- 上 -->
						<view class="nickName" @click="updateUserInfo(1)">
							<view class="warLevel">
								<image src="/static/normal/war-letter.png" mode=""></image>
								<text>{{userInfo.warLevel}}</text>
							</view>
							<view class="sex">
								<image :src="userInfo.sex=='男'?'/static/normal/man.png':'/static/normal/woman.png'" mode=""></image>
							</view>
							<view class="name">
								<text style="font-family: 'gameFont' !important;">{{userInfo.userNickName}}</text>
							</view>
						</view>
						<!-- 中 -->
						<view class="centerInfo" @click="updateUserInfo(2)">
							<view class="team">

								<view v-if="userTeam.joinTeam" class="teamLevel">
									{{userTeam.teamLevel}}
								</view>
								<view class="teamName">
									{{userTeam.joinTeam?userTeam.teamName:'尚未加入战队'}}
								</view>
							</view>
							<view class="area">
								<image src="/static/normal/area.png" mode=""></image>
								<view class="areaName">
									<text space="emsp">{{userInfo.area1 =="" ||userInfo.area2 ==""?'暂未设置':userInfo.area1+" "+userInfo.area2}}</text>
								</view>
							</view>
						</view>
						<!-- 下 -->
						<view class="honorBox" @click="chooseHonest">
							<image src="/static/honestLevel/myShowHonest.png"></image>
							<text>{{showHonest}}</text>
						</view>
					</view>

					<!-- 点赞交互部分 -->
					<view :class="isShowWechartCar==false?'thumb':'showThumb'" @click="updateUserInfo(3)">
						<view class="firePic" v-if="!isShowWechartCar">
							<image src="/static/normal/firePic.png" mode=""></image>
							<text>{{userInfo.hot}}</text>
						</view>
						<view class="firePic" v-if="!isShowWechartCar">
							<image src="/static/normal/thumb.png" mode=""></image>
							<text>{{userInfo.thum}}</text>
						</view>
						
						<view class="hotAndThum"  v-if="isShowWechartCar">
							<view class="firePic" >
								<image src="/static/normal/firePic.png" mode=""></image>
								<text>{{userInfo.hot}}</text>
							</view>
							<view class="firePic">
								<image src="/static/normal/thumb.png" mode=""></image>
								<text>{{userInfo.thum}}</text>
							</view>
						</view>
						
						<image v-if="isShowWechartCar" id="wechartCar" src="/static/normal/wechartCar.png" mode=""></image>
					</view>
				</view>

			</view>
			<!-- 底部操作面板 -->
			<combat class="combatInfo" @showPreIndex="showPreIndex"></combat>
			<my-prompt  :visible.sync="prompt.visible" :placeholder="prompt.placeholder" :defaultValue="prompt.defaultValue"
			 @confirm="clickPromptConfirm" mainColor="#e74a39" :title="prompt.title" :isMutipleLine="false" :inputType="prompt.inputType">
			</my-prompt>
			<lb-picker ref="myPicker" mode="multiSelector" :list="pickVal.value" :level="2" @confirm="pickChange">
			</lb-picker>
		</view>
	</view>
</template>

<script>
	var {myApp} = require('./index.js')
	import combat from '../components/combat/combat.vue'
	import myPrompt from '@/components/zz-prompt/index.vue'
	import LbPicker from '@/components/lb-picker'
	export default {
		components: {
			combat,
			myPrompt,
			LbPicker
		},
		onLoad() {
			myApp.onloadData(this);
			// #ifdef APP-PLUS
			uni.showToast({
				title:"如果显示不正确，请返回App主页重新进入！ ",
				duration: 2000,
				icon:"none",
				position:"bottom"
			})
			// #endif
			

		},
		onBackPress() {
			uni.redirectTo({
				url:"../main/main"
			})
		},
		data() {
			return {
				isShowWechartCar:false,
				showHonest:"国服最强李白",
				heroList:[],
				pickVal: {
					value: []
				},
				showZIndex:true,
				//弹出框
				prompt: {
					title: "",
					type: "", //类型
					visible: false, // 控制弹框输入框显示
					inputType: "text",
					placeholder: "",
					defaultValue: ""
				},
				imageURL: "//game.gtimg.cn/images/yxzj/img201606/skin/hero-info/131/131-bigskin-4.jpg",
				/* 用户信息 */
				userInfo: {
					photo: "/static/normal/photo.png",
					userLevel: "Lv.1",
					userNickName: "设置昵称",
					sex: "男",
					warLevel: 1, //战令初始等级
					area1: "",
					area2: "",
					hot: "0",
					thum: "0",
					photoFram:""
				},
				/* 战队信息 */
				userTeam: {
					joinTeam: false,
					teamLevel: "",
					teamName: ""
				}
			}
		},
		methods: {
			showPreIndex(val){
				this.showZIndex = val
			},
			oprationClick(){
				uni.showToast({
					title:"等待开发~",
					icon:'none'
				})
			},
			pickChange: function(e) {
				this.imageURL = e.value[1]
			},
			/**
			 * 点击弹出输入框确定
			 */
			clickPromptConfirm(val) {
				myApp.clickPromptConfirm(val,this)

			},
			//更新用户信息
			updateUserInfo(type) {
				myApp.updateUserInfo(type,this)
			},
			chooseHonest(){
				myApp.chooseHonest(this)
			},
			/**显示对话框
			 */
			showPrompt(type, placeholder, title, inputType, defaultValue) {
				myApp.showPrompt(type, placeholder, title, inputType, defaultValue,this)
			},
			chooseModeAndSkin() {
				myApp.chooseModeAndSkin(this)
			}

		}
	}
</script>

<style>
	@import url("./index.css");
</style>
