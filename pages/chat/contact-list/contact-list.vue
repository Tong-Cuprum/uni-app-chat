<template>
	<view class="container">
		<view class="contact-header">
			<text class="header-title">联系人</text>
		</view>
		
		<scroll-view 
			class="contact-list" 
			scroll-y 
			@refresherrefresh="onRefresh"
			:refresher-enabled="true"
			:refresher-triggered="refreshing"
			refresher-background="#f5f5f5"
		>
			<view 
				v-for="(contact, index) in contactList" 
				:key="contact.id" 
				class="contact-item"
				@tap="goToContactDetail(contact)"
				:class="{ 'contact-item-enter': isVisible }"
				:style="{ animationDelay: `${index * 0.1}s` }"
			>
				<view class="avatar-container">
					<image :src="contact.avatar" class="avatar" @load="onAvatarLoad"></image>
				</view>
				<view class="contact-info">
					<text class="contact-name">{{ contact.name }}</text>
					<text class="contact-desc">{{ contact.desc }}</text>
				</view>
				<view class="contact-arrow">
					<text class="arrow-icon">→</text>
				</view>
			</view>
			<view v-if="loading" class="loading">
				<view class="loading-spinner"></view>
				<text class="loading-text">加载中...</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { contacts } from '../mock/data.js'

export default {
	name: 'ContactList',
	data() {
		return {
			contactList: [],
			refreshing: false,
			loading: false,
			isVisible: false
		}
	},
	methods: {
		loadContacts() {
			// 重置动画状态
			this.isVisible = false
			// 模拟加载数据
			setTimeout(() => {
				this.contactList = contacts
				this.refreshing = false
				this.loading = false
				// 延迟显示，触发动画
				setTimeout(() => {
					this.isVisible = true
				}, 50)
			}, 500)
		},
		onRefresh() {
			this.refreshing = true
			this.loadContacts()
		},
		goToContactDetail(contact) {
			uni.navigateTo({
				url: `/pages/chat/contact-detail/contact-detail?contactId=${contact.id}&contactName=${contact.name}&contactAvatar=${contact.avatar}`,
				animationType: 'slide-in-right',
				animationDuration: 300,
				success: () => {
					console.log('进入联系人详情页面')
				}
			})
		},
		onAvatarLoad(e) {
			// 头像加载完成后的处理
		}
	},
	mounted() {
		this.loadContacts()
	},
	onShow() {
		// 页面显示时，重新加载联系人数据
		this.loadContacts()
	}
}
</script>

<style scoped>
.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color: #001225;
		min-height: 100vh;
		padding-bottom: 120rpx;
	}

.contact-header {
	padding-top: var(--status-bar-height);
	height: calc(88rpx + var(--status-bar-height));
	background-color: #001E3C;
	border-bottom: 1rpx solid #003366;
	display: flex;
	align-items: center;
	justify-content: center;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.header-title {
	font-size: 34rpx;
	font-weight: 600;
	color: #E0F7FF;
}

.contact-list {
	height: calc(100vh - 88rpx);
}

.contact-item {
	display: flex;
	align-items: center;
	padding: 20rpx 16rpx;
	background-color: #001E3C;
	border-bottom: 1rpx solid #003366;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.contact-item::before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 4rpx;
	background-color: transparent;
	transition: all 0.3s ease;
}

.contact-item:hover {
	background-color: #002B4A;
	transform: translateX(8rpx);
}

.contact-item:hover::before {
	background-color: #00BFFF;
}

.contact-item-enter {
	animation: slideIn 0.5s ease forwards;
	opacity: 0;
	transform: translateY(20rpx);
}

.avatar-container {
	margin-right: 20rpx;
	position: relative;
}

.avatar {
	width: 88rpx;
	height: 88rpx;
	border-radius: 44rpx;
	transition: all 0.3s ease;
	box-shadow: 0 2rpx 8rpx rgba(0, 191, 255, 0.2);
	border: 2rpx solid #004080;
}

.contact-item:hover .avatar {
	transform: scale(1.05);
	box-shadow: 0 4rpx 12rpx rgba(0, 191, 255, 0.3);
	border-color: #00BFFF;
}

.contact-info {
	flex: 1;
	min-width: 0;
}

.contact-name {
	font-size: 32rpx;
	font-weight: 500;
	color: #E0F7FF;
	margin-bottom: 8rpx;
	transition: all 0.3s ease;
}

.contact-item:hover .contact-name {
	color: #00BFFF;
}

.contact-desc {
	font-size: 26rpx;
	color: #8092A6;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: all 0.3s ease;
}

.arrow-icon {
	font-size: 28rpx;
	color: #8092A6;
}

.contact-item:hover .contact-arrow {
	opacity: 1;
	transform: translateX(4rpx);
}

.arrow-icon {
	font-size: 28rpx;
	color: #999999;
}

.loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
}

.loading-spinner {
	width: 40rpx;
	height: 40rpx;
	border: 4rpx solid #003366;
	border-top: 4rpx solid #00BFFF;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin-bottom: 16rpx;
}

.loading-text {
	font-size: 26rpx;
	color: #8092A6;
}

/* 动画效果 */
@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateY(20rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>