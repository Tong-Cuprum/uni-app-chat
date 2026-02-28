<template>
	<view class="container" :class="{ 'fade-in': isVisible }">
		<!-- 自定义导航栏 -->
		<view class="custom-nav-bar">
			<text class="nav-title">个人中心</text>
		</view>
		<view class="profile-header" :class="{ 'slide-down': isVisible }">
			<view class="user-info">
				<view class="avatar-container">
					<image :src="userInfo.avatar" class="avatar" :class="{ 'pulse': isVisible }"></image>
				</view>
				<view class="user-details" :class="{ 'slide-right': isVisible }">
					<text class="nickname">{{ userInfo.nickname }}</text>
					<text class="signature">{{ userInfo.signature }}</text>
				</view>
			</view>
			<view class="level-badge" :class="{ 'fade-in': isVisible }" :style="{ animationDelay: '0.3s' }">
				<text class="level-text">Lv.{{ userInfo.level }}</text>
			</view>
		</view>
		
		<view class="feature-grid">
			<view 
				v-for="(item, index) in features" 
				:key="item.id" 
				class="feature-item"
				@tap="navigateToFeature(item.id)"
			>
				<view class="feature-icon">{{ item.icon }}</view>
				<text class="feature-text">{{ item.text }}</text>
			</view>
		</view>
		
		<view class="logout-btn" @tap="logout">
			<text class="logout-text">退出登录</text>
		</view>
	</view>
</template>

<script>
import { userInfo as mockUserInfo } from '../mock/data.js'

export default {
	name: 'Profile',
	data() {
		return {
			userInfo: mockUserInfo,
			isVisible: false,
			features: [
				{ id: 'settings', icon: '⚙️', text: '设置' },
				{ id: 'notifications', icon: '🔔', text: '通知' },
				{ id: 'favorites', icon: '⭐', text: '收藏' },
				{ id: 'history', icon: '📖', text: '历史' },
				{ id: 'privacy', icon: '🔒', text: '隐私' },
				{ id: 'help', icon: '❓', text: '帮助' },
				{ id: 'feedback', icon: '💬', text: '反馈' },
				{ id: 'about', icon: 'ℹ️', text: '关于' }
			]
		}
	},
	methods: {
		navigateToFeature(feature) {
			// 模拟导航到功能页面
			uni.showToast({
				title: `进入${feature}页面`,
				icon: 'none'
			})
		},
		logout() {
			uni.showModal({
				title: '退出登录',
				content: '确定要退出登录吗？',
				confirmText: '确定',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm) {
						uni.showToast({
							title: '已退出登录',
							icon: 'none'
						})
					}
				}
			})
		}
	},
	mounted() {
		// 设置导航栏标题
		uni.setNavigationBarTitle({
			title: '个人中心'
		})
		// 延迟显示，触发动画
		setTimeout(() => {
			this.isVisible = true
		}, 50)
	},
	onShow() {
		this.isVisible = true
	}
}
</script>

<style scoped>
.container {
	flex: 1;
	display: flex;
	flex-direction: column;
	background: linear-gradient(135deg, #001225 0%, #001E3C 50%, #002B4A 100%);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	min-height: 100vh;
	padding-bottom: 120rpx;
}

.custom-nav-bar {
	padding-top: var(--status-bar-height);
	height: calc(88rpx + var(--status-bar-height));
	background-color: #001E3C;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1rpx solid #004080;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
}

.nav-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #E0F7FF;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

.fade-in {
	opacity: 1;
}

.profile-header {
	background: linear-gradient(135deg, #003366 0%, #004080 100%);
	padding: 60rpx 24rpx 40rpx;
	color: #E0F7FF;
	border-radius: 0 0 32rpx 32rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 191, 255, 0.3);
}

.slide-down {
	transform: translateY(0);
	opacity: 1;
}

.user-info {
	display: flex;
	align-items: center;
	margin-bottom: 24rpx;
}

.avatar-container {
	margin-right: 24rpx;
	position: relative;
}

.avatar {
	width: 140rpx;
	height: 140rpx;
	border-radius: 70rpx;
	border: 6rpx solid rgba(0, 191, 255, 0.3);
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
	transition: transform 0.3s ease;
}

.avatar:active {
	transform: scale(1.05);
}

.pulse {
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.4);
	}
	70% {
		box-shadow: 0 0 0 20rpx rgba(0, 191, 255, 0);
	}
	100% {
		box-shadow: 0 0 0 0 rgba(0, 191, 255, 0);
	}
}

.user-details {
	flex: 1;
}

.slide-right {
	transform: translateX(0);
	opacity: 1;
}

.nickname {
	font-size: 40rpx;
	font-weight: 700;
	margin-bottom: 12rpx;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
	color: #E0F7FF;
}

.signature {
	font-size: 30rpx;
	opacity: 0.9;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
	line-height: 1.4;
	color: #8092A6;
}

.level-badge {
	background-color: rgba(0, 191, 255, 0.2);
	padding: 12rpx 20rpx;
	border-radius: 24rpx;
	align-self: flex-start;
	border: 1rpx solid rgba(0, 191, 255, 0.3);
}

.level-text {
	font-size: 26rpx;
	font-weight: 600;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
	color: #00BFFF;
}

.feature-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 24rpx;
	padding: 24rpx;
	background-color: #001E3C;
	margin: 24rpx;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
	border: 1rpx solid #003366;
}

.feature-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 24rpx 0;
	border-radius: 16rpx;
	transition: all 0.3s ease;
}

.scale-in {
	transform: scale(1);
	opacity: 1;
}

.feature-item:active {
	background-color: #002B4A;
	transform: scale(0.95);
}

.feature-icon {
	font-size: 52rpx;
	margin-bottom: 16rpx;
	transition: transform 0.3s ease;
	color: #00BFFF;
}

.feature-item:active .feature-icon {
	transform: scale(1.1);
}

.feature-text {
	font-size: 26rpx;
	color: #8092A6;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
	font-weight: 500;
}

.logout-btn {
	background-color: #001E3C;
	margin: 24rpx;
	padding: 28rpx;
	border-radius: 16rpx;
	text-align: center;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
	transition: all 0.3s ease;
	border: 1rpx solid #003366;
}

.logout-btn:active {
	background-color: #002B4A;
	transform: scale(0.98);
}

.logout-text {
	font-size: 34rpx;
	color: #ff3b30;
	font-weight: 600;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}
</style>