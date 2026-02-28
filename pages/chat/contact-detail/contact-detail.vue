<template>
	<view class="container">
		<view class="contact-header">
			<view class="header-left" @tap="goBack">
				<text class="back-icon">←</text>
			</view>
			<view class="header-center">
				<text class="header-title">联系人信息</text>
			</view>
			<view class="header-right">
				<text class="more-icon">...</text>
			</view>
		</view>
		
		<view class="contact-info" :class="{ 'contact-info-enter': true }">
			<view class="avatar-container">
				<image :src="contactInfo.avatar" class="avatar" @load="onAvatarLoad"></image>
				<view class="avatar-border"></view>
			</view>
			<text class="nickname">{{ contactInfo.nickname }}</text>
			<text class="signature">{{ contactInfo.signature }}</text>
			<view class="level-info">
				<text class="level-label">等级</text>
				<text class="level-value">{{ contactInfo.level }}</text>
			</view>
		</view>
		
		<view class="action-list" :class="{ 'action-list-enter': true }">
			<view class="action-item" @tap="startChat" :class="{ 'action-item-hover': true }">
				<view class="action-icon-container message-icon">
					<text class="action-icon">💬</text>
				</view>
				<text class="action-text">发消息</text>
				<text class="action-arrow">→</text>
			</view>
			<view class="action-item" :class="{ 'action-item-hover': true }">
				<view class="action-icon-container call-icon">
					<text class="action-icon">📞</text>
				</view>
				<text class="action-text">打电话</text>
				<text class="action-arrow">→</text>
			</view>
			<view class="action-item" :class="{ 'action-item-hover': true }">
				<view class="action-icon-container video-icon">
					<text class="action-icon">📷</text>
				</view>
				<text class="action-text">视频通话</text>
				<text class="action-arrow">→</text>
			</view>
			<view class="action-item" :class="{ 'action-item-hover': true }">
				<view class="action-icon-container moments-icon">
					<text class="action-icon">📋</text>
				</view>
				<text class="action-text">查看朋友圈</text>
				<text class="action-arrow">→</text>
			</view>
		</view>
		
		<view class="more-info" :class="{ 'more-info-enter': true }">
			<view class="info-item" :class="{ 'info-item-enter': true }">
				<text class="info-label">ID</text>
				<text class="info-value">{{ contactInfo.id }}</text>
			</view>
			<view class="info-item" :class="{ 'info-item-enter': true }" style="animation-delay: 0.1s">
				<text class="info-label">地区</text>
				<text class="info-value">{{ contactInfo.region }}</text>
			</view>
			<view class="info-item" :class="{ 'info-item-enter': true }" style="animation-delay: 0.2s">
				<text class="info-label">加入时间</text>
				<text class="info-value">{{ contactInfo.joinTime }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getContactInfo } from '../mock/data.js'

export default {
	name: 'ContactDetail',
	props: {
		contactId: {
			type: String,
			default: 'user_002'
		},
		contactName: {
			type: String,
			default: '产品经理'
		},
		contactAvatar: {
			type: String,
			default: '/static/c1.png'
		}
	},
	data() {
		return {
			contactInfo: getContactInfo(this.contactId, this.contactName, this.contactAvatar)
		}
	},
	methods: {
		goBack() {
			uni.navigateBack({
				animationType: 'slide-out-right',
				animationDuration: 300
			})
		},
		startChat() {
			uni.navigateTo({
				url: `/pages/chat/chat-detail/chat-detail?contactId=${this.contactId}&contactName=${this.contactName}&contactAvatar=${this.contactAvatar}`,
				animationType: 'slide-in-right',
				animationDuration: 300
			})
		},
		onAvatarLoad(e) {
			// 头像加载完成后的处理
		}
	},
	mounted() {
		// 设置导航栏标题
		uni.setNavigationBarTitle({
			title: '联系人信息'
		})
	}
}
</script>

<style scoped>
.container {
	flex: 1;
	background: linear-gradient(135deg, #001225 0%, #001E3C 50%, #002B4A 100%);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
}

.contact-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: calc(88rpx + var(--status-bar-height));
	background-color: #001E3C;
	border-bottom: 1rpx solid #004080;
	padding: 0 16rpx;
	padding-top: var(--status-bar-height);
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.header-left {
	width: 60rpx;
	transition: all 0.3s ease;
}

.header-left:hover {
	transform: translateX(-4rpx);
}

.back-icon {
	font-size: 40rpx;
	color: #00BFFF;
	transition: all 0.3s ease;
}

.header-center {
	flex: 1;
	text-align: center;
}

.header-title {
	font-size: 34rpx;
	font-weight: 600;
	color: #E0F7FF;
}

.header-right {
	width: 60rpx;
	text-align: right;
	transition: all 0.3s ease;
}

.header-right:hover {
	transform: rotate(90deg);
}

.more-icon {
	font-size: 32rpx;
	color: #8092A6;
}

.contact-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50rpx 0;
	background-color: #001E3C;
	margin-bottom: 16rpx;
	position: relative;
	overflow: hidden;
	border-radius: 20rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.3);
	border: 1rpx solid #003366;
}

.contact-info::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 200rpx;
	background: linear-gradient(135deg, #003366, #004080);
	z-index: 1;
}

.contact-info > * {
	position: relative;
	z-index: 2;
}

.contact-info-enter {
	animation: fadeInUp 0.6s ease forwards;
	opacity: 0;
	transform: translateY(30rpx);
}

.avatar-container {
	position: relative;
	margin-bottom: 24rpx;
	transform: translateY(-20rpx);
}

.avatar {
	width: 160rpx;
	height: 160rpx;
	border-radius: 80rpx;
	border: 6rpx solid #001E3C;
	box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.4);
	transition: all 0.3s ease;
}

.avatar-border {
	position: absolute;
	top: -4rpx;
	left: -4rpx;
	right: -4rpx;
	bottom: -4rpx;
	border: 3rpx solid rgba(0, 191, 255, 0.8);
	border-radius: 84rpx;
	animation: pulse 2s infinite;
	box-shadow: 0 0 20rpx rgba(0, 191, 255, 0.3);
}

.nickname {
	font-size: 38rpx;
	font-weight: 600;
	color: #E0F7FF;
	margin-bottom: 16rpx;
	transition: all 0.3s ease;
}

.signature {
	font-size: 28rpx;
	color: #8092A6;
	margin-bottom: 24rpx;
	text-align: center;
	padding: 0 60rpx;
	line-height: 1.4;
}

.level-info {
	display: flex;
	align-items: center;
	background-color: rgba(0, 191, 255, 0.2);
	padding: 10rpx 24rpx;
	border-radius: 24rpx;
	transition: all 0.3s ease;
	border: 1rpx solid rgba(0, 191, 255, 0.3);
}

.level-info:hover {
	background-color: rgba(0, 191, 255, 0.3);
	transform: scale(1.05);
}

.level-label {
	font-size: 24rpx;
	color: #8092A6;
	margin-right: 8rpx;
}

.level-value {
	font-size: 24rpx;
	font-weight: 500;
	color: #00BFFF;
}

.action-list {
	background-color: #001E3C;
	margin-bottom: 16rpx;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.3);
	border: 1rpx solid #003366;
}

.action-list-enter {
	animation: fadeInUp 0.6s ease forwards 0.2s;
	opacity: 0;
	transform: translateY(30rpx);
}

.action-item {
	display: flex;
	align-items: center;
	padding: 28rpx 20rpx;
	border-bottom: 1rpx solid #003366;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.action-item:last-child {
	border-bottom: none;
}

.action-item-hover:hover {
	background-color: #002B4A;
	transform: translateX(8rpx);
}

.action-icon-container {
	width: 56rpx;
	height: 56rpx;
	border-radius: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
	transition: all 0.3s ease;
}

.message-icon {
	background-color: rgba(0, 191, 255, 0.2);
}

.call-icon {
	background-color: rgba(76, 175, 80, 0.2);
}

.video-icon {
	background-color: rgba(255, 193, 7, 0.2);
}

.moments-icon {
	background-color: rgba(156, 39, 176, 0.2);
}

.action-item:hover .action-icon-container {
	transform: scale(1.1);
}

.action-icon {
	font-size: 32rpx;
}

.action-text {
	flex: 1;
	font-size: 32rpx;
	color: #E0F7FF;
	transition: all 0.3s ease;
}

.action-item:hover .action-text {
	color: #00BFFF;
}

.action-arrow {
	font-size: 28rpx;
	color: #8092A6;
	transition: all 0.3s ease;
}

.action-item:hover .action-arrow {
	opacity: 1;
	transform: translateX(4rpx);
}

.more-info {
	background-color: #001E3C;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.3);
	border: 1rpx solid #003366;
}

.more-info-enter {
	animation: fadeInUp 0.6s ease forwards 0.4s;
	opacity: 0;
	transform: translateY(30rpx);
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 28rpx 20rpx;
	border-bottom: 1rpx solid #003366;
	transition: all 0.3s ease;
}

.info-item:last-child {
	border-bottom: none;
}

.info-item:hover {
	background-color: #002B4A;
}

.info-item-enter {
	animation: fadeInLeft 0.5s ease forwards;
	opacity: 0;
	transform: translateX(-20rpx);
}

.info-label {
	font-size: 32rpx;
	color: #8092A6;
	transition: all 0.3s ease;
}

.info-value {
	font-size: 32rpx;
	color: #E0F7FF;
	transition: all 0.3s ease;
}

.info-item:hover .info-value {
	color: #00BFFF;
}

/* 动画效果 */
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeInLeft {
	from {
		opacity: 0;
		transform: translateX(-20rpx);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes pulse {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	50% {
		transform: scale(1.05);
		opacity: 0.7;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
</style>