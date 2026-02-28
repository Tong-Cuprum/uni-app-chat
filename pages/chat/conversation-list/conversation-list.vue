<template>
	<view class="container" :class="{ 'fade-in': isVisible }">
		<!-- 自定义导航栏 -->
		<view class="custom-nav-bar">
			<text class="nav-title">对话列表</text>
		</view>
		<scroll-view 
			class="conversation-list" 
			scroll-y 
			@scrolltolower="loadMore"
			@refresherrefresh="onRefresh"
			:refresher-enabled="true"
			:refresher-triggered="refreshing"
			refresher-background="#f5f5f5"
		>
			<view 
				v-for="(item, index) in conversationsList" 
				:key="item.id" 
				class="conversation-item"
				:class="{ 'slide-in': isVisible }"
				:style="{ animationDelay: `${index * 0.1}s` }"
				@tap="goToChatDetail(item)"
			>
				<view class="avatar-container">
					<image :src="item.contactAvatar" class="avatar"></image>
				</view>
				<view class="conversation-content">
					<view class="conversation-header">
						<text class="contact-name">{{ item.contactName }}</text>
						<text class="last-time">{{ formatTime(item.lastTime) }}</text>
					</view>
					<text class="last-message">{{ item.lastMessage }}</text>
				</view>
				<view v-if="item.unreadCount > 0" class="unread-badge">
					{{ item.unreadCount }}
				</view>
			</view>
			<view v-if="loading" class="loading">
				<view class="loading-spinner"></view>
				<text>加载中...</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { conversations } from '../mock/data.js'

export default {
	name: 'ConversationList',
	data() {
		return {
			conversationsList: [],
			refreshing: false,
			loading: false,
			isVisible: false
		}
	},
	methods: {
		loadConversations() {
			// 模拟加载数据
			setTimeout(() => {
				this.conversationsList = conversations
				this.refreshing = false
				this.loading = false
			}, 500)
		},
		onRefresh() {
			this.refreshing = true
			this.loadConversations()
		},
		loadMore() {
			if (!this.loading) {
				this.loading = true
				// 模拟加载更多数据
				setTimeout(() => {
					this.loading = false
				}, 1000)
			}
		},
		goToChatDetail(item) {
			uni.navigateTo({
				url: `/pages/chat/chat-detail/chat-detail?contactId=${item.contactId}&contactName=${item.contactName}&contactAvatar=${item.contactAvatar}`,
				success: () => {
					// 进入聊天页面后，清除未读数
					const index = this.conversationsList.findIndex(conv => conv.id === item.id)
					if (index !== -1) {
						this.conversationsList[index].unreadCount = 0
					}
				}
			})
		},
		formatTime(timeStr) {
			const date = new Date(timeStr)
			const now = new Date()
			const diff = now - date
			const days = Math.floor(diff / (1000 * 60 * 60 * 24))
			
			if (days === 0) {
				return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
			} else if (days === 1) {
				return '昨天'
			} else if (days < 7) {
				return `${days}天前`
			} else {
				return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
			}
		}
	},
	mounted() {
		// 延迟显示，触发淡入动画
		setTimeout(() => {
			this.isVisible = true
		}, 50)
		this.loadConversations()
		// 监听聊天页面的会话更新事件
		uni.$on('updateConversation', (data) => {
			const index = this.conversationsList.findIndex(conv => conv.contactId === data.contactId)
			if (index !== -1) {
				this.conversationsList[index].lastMessage = data.lastMessage
				this.conversationsList[index].lastTime = data.lastTime
				this.conversationsList[index].unreadCount = data.unreadCount
				// 重新排序会话列表，将最新的会话移到顶部
				const updatedConversation = this.conversationsList.splice(index, 1)[0]
				this.conversationsList.unshift(updatedConversation)
			}
		})
	},
	onShow() {
		// 页面显示时，模拟更新会话数据
		// 这里可以根据实际情况从存储或API获取最新数据
		this.isVisible = true
		this.loadConversations()
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

.conversation-list {
	height: 100vh;
}

.conversation-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	background-color: #001E3C;
	border-bottom: 1rpx solid #003366;
	transform: translateX(-20rpx);
	opacity: 0;
	transition: all 0.4s ease-out;
	border-radius: 0 0 0 0;
}

.slide-in {
	transform: translateX(0);
	opacity: 1;
}

.conversation-item:active {
	background-color: #002B4A;
	transform: scale(0.98);
	transition: all 0.2s ease;
}

.avatar-container {
	margin-right: 20rpx;
	position: relative;
}

.avatar {
	width: 88rpx;
	height: 88rpx;
	border-radius: 44rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 191, 255, 0.2);
	transition: transform 0.3s ease;
	border: 2rpx solid #004080;
}

.avatar-container:active .avatar {
	transform: scale(1.05);
}

.conversation-content {
	flex: 1;
	min-width: 0;
}

.conversation-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8rpx;
}

.contact-name {
	font-size: 34rpx;
	font-weight: 600;
	color: #E0F7FF;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

.last-time {
	font-size: 24rpx;
	color: #8092A6;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

.last-message {
	font-size: 28rpx;
	color: #8092A6;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
	line-height: 1.4;
}

.unread-badge {
	background-color: #00BFFF;
	color: #001225;
	font-size: 24rpx;
	padding: 4rpx 16rpx;
	border-radius: 20rpx;
	min-width: 40rpx;
	text-align: center;
	box-shadow: 0 2rpx 4rpx rgba(0, 191, 255, 0.3);
	font-weight: 500;
}

.loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx;
	font-size: 28rpx;
	color: #8092A6;
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

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>