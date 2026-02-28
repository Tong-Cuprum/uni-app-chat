<template>
	<view class="container">
		<view class="header" @tap="goBack">
			<view class="header-left">
				<text class="back-icon">←</text>
			</view>
			<view class="header-center">
				<text class="contact-name">{{ contactName }}</text>
			</view>
			<view class="header-right">
				<text class="more-icon">⋯</text>
			</view>
		</view>
		
		<scroll-view 
			class="message-list" 
			scroll-y 
			:scroll-top="scrollTop"
			:scroll-with-animation="true"
			@scrolltolower="loadMoreMessages"
			ref="messageList"
		>
			<view 
				v-for="(message, index) in messages" 
				:key="message.id"
				:class="['message-item', message.isSelf ? 'self-message' : 'other-message']"
				:style="{ animationDelay: `${index * 0.05}s` }"
			>
				<view class="avatar-container">
					<image v-if="!message.isSelf" :src="contactAvatar" class="avatar" @tap="goToContactDetail"></image>
					<image v-else src="/static/avatar1.png" class="avatar"></image>
				</view>
				<view 
					:class="['message-bubble', message.isSelf ? 'self-bubble' : 'other-bubble', message.isNew ? 'message-animation' : '']"
				>
					<text v-if="message.type === 'text'" class="message-text">{{ message.content }}</text>
					<image v-else-if="message.type === 'image'" :src="message.content" class="message-image"></image>
					<view v-if="message.timestamp" class="message-time">{{ formatTime(message.timestamp) }}</view>
				</view>
			</view>
			<view v-if="loading" class="loading">
				<view class="loading-spinner"></view>
				<text class="loading-text">加载中...</text>
			</view>
		</scroll-view>
		
		<view class="input-area">
			<view class="input-container">
				<input 
					v-model="inputMessage" 
					class="input" 
					placeholder="输入消息..."
					@focus="onInputFocus"
					@blur="onInputBlur"
					@keyup.enter="sendMessage"
				>
				</input>
				<view class="input-actions">
					<view class="action-btn" @tap="selectImage">
						<text class="action-icon">+</text>
					</view>
					<view class="action-btn" @tap="showEmoji">
						<text class="action-icon">😊</text>
					</view>
				</view>
			</view>
			<view class="send-btn" @tap="sendMessage" :class="{ 'send-btn-active': inputMessage.trim() }">
				<text class="send-btn-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getMessages, saveMessages } from '../mock/data.js'

export default {
	name: 'ChatDetail',
	props: {
		contactId: {
			type: String,
			default: ''
		},
		contactName: {
			type: String,
			default: '联系人'
		},
		contactAvatar: {
			type: String,
			default: '/static/c1.png'
		}
	},
	data() {
		return {
			messages: [],
			inputMessage: '',
			scrollView: null,
			scrollTop: 0,
			keyboardHeight: 0,
			loading: false
		}
	},
	methods: {
		loadMessages() {
			this.messages = getMessages(this.contactId)
			// 确保在 DOM 更新后再滚动到最底部
			this.$nextTick(() => {
				this.scrollToBottom()
			})
		},
		loadMoreMessages() {
			if (!this.loading) {
				this.loading = true
				// 模拟加载更多消息
				setTimeout(() => {
					this.loading = false
				}, 1000)
			}
		},
		sendMessage() {
			if (this.inputMessage && this.inputMessage.trim()) {
				const newMessage = {
					id: `msg_${Date.now()}`,
					type: "text",
					content: this.inputMessage.trim(),
					senderId: "user_001",
					isSelf: true,
					timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
					isNew: true
				}
				this.messages.push(newMessage)
				this.inputMessage = ''
				this.scrollToBottom()
				
				// 保存消息到本地存储
				saveMessages(this.contactId, this.messages)
				
				// 通知对话列表页面更新最后消息
				uni.$emit('updateConversation', {
					contactId: this.contactId,
					lastMessage: newMessage.content,
					lastTime: newMessage.timestamp,
					unreadCount: 0
				})
				
				// 模拟对方回复
				setTimeout(() => {
					const replyMessage = {
						id: `msg_${Date.now() + 1}`,
						type: "text",
						content: "好的，我知道了",
						senderId: this.contactId,
						isSelf: false,
						timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
						isNew: true
					}
					this.messages.push(replyMessage)
					this.scrollToBottom()
					
					// 保存回复到本地存储
					saveMessages(this.contactId, this.messages)
					
					// 通知对话列表页面更新最后消息（回复）
					uni.$emit('updateConversation', {
						contactId: this.contactId,
						lastMessage: replyMessage.content,
						lastTime: replyMessage.timestamp,
						unreadCount: 0
					})
				}, 1000)
			}
		},
		selectImage() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					const newMessage = {
						id: `msg_${Date.now()}`,
						type: "image",
						content: res.tempFilePaths[0],
						senderId: "user_001",
						isSelf: true,
						timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
						isNew: true
					}
					this.messages.push(newMessage)
					this.scrollToBottom()
					
					// 保存图片消息到本地存储
					saveMessages(this.contactId, this.messages)
					
					// 通知对话列表页面更新最后消息
					uni.$emit('updateConversation', {
						contactId: this.contactId,
						lastMessage: '[图片]',
						lastTime: newMessage.timestamp,
						unreadCount: 0
					})
				}
			})
		},
		showEmoji() {
			// 显示表情选择器
			console.log('显示表情选择器')
		},
		scrollToBottom() {
			this.$nextTick(() => {
				// 获取消息列表的实际高度
				uni.createSelectorQuery().select('.message-list').boundingClientRect((rect) => {
					if (rect) {
						// 设置 scrollTop 为一个较大的值，确保滚动到最底部
						this.scrollTop = 999999
					}
				}).exec()
			})
		},
		goBack() {
			uni.navigateBack({
				animationType: 'slide-out-right',
				animationDuration: 300
			})
		},
		goToContactDetail() {
			uni.navigateTo({
				url: `/pages/chat/contact-detail/contact-detail?contactId=${this.contactId}&contactName=${this.contactName}&contactAvatar=${this.contactAvatar}`,
				animationType: 'slide-in-right',
				animationDuration: 300
			})
		},
		onInputFocus(e) {
			// 处理键盘弹出
			this.keyboardHeight = e.detail.height || 0
		},
		onInputBlur(e) {
			// 处理键盘收起
			this.keyboardHeight = 0
		},
		formatTime(timeStr) {
			const date = new Date(timeStr)
			return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
		}
	},
	watch: {
		messages: {
			handler() {
				this.scrollToBottom()
			},
			deep: true
		}
	},
	mounted() {
		this.loadMessages()
		// 设置导航栏标题
		uni.setNavigationBarTitle({
			title: this.contactName
		})
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
	position: relative;
}

.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: calc(88rpx + var(--status-bar-height));
	background-color: #001E3C;
	border-bottom: 1rpx solid #003366;
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
	transition: all 0.3s ease;
}

.header-center:hover {
	transform: scale(1.05);
}

.contact-name {
	font-size: 32rpx;
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

.message-list {
	flex: 1;
	padding: 20rpx 20rpx 120rpx;
	background: linear-gradient(135deg, #001225 0%, #001E3C 50%, #002B4A 100%);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
}

.message-item {
	display: flex;
	margin-bottom: 24rpx;
	align-items: flex-end;
	animation: messageSlideIn 0.5s ease forwards;
	opacity: 0;
	transform: translateY(20rpx);
}

.self-message {
	flex-direction: row-reverse;
	padding-right: 20rpx;
}

.other-message {
	flex-direction: row;
	padding-left: 20rpx;
}

.avatar-container {
	margin: 0 12rpx;
	position: relative;
}

.avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
}

.avatar:hover {
	transform: scale(1.1);
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}

.message-bubble {
	max-width: 70%;
	padding: 16rpx 20rpx;
	border-radius: 18rpx;
	word-wrap: break-word;
	position: relative;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
}

.other-bubble {
	background-color: #002B4A;
	color: #E0F7FF;
	border-bottom-left-radius: 4rpx;
	border: 1px solid #004080;
}

.self-bubble {
	background-color: #004080;
	color: #E0F7FF;
	border-bottom-right-radius: 4rpx;
	border: 1px solid #0066CC;
}

.message-text {
	font-size: 28rpx;
	line-height: 1.5;
	word-break: break-word;
}

.message-image {
	width: 240rpx;
	height: 240rpx;
	border-radius: 12rpx;
	transition: all 0.3s ease;
}

.message-image:hover {
	transform: scale(1.05);
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
}

.message-time {
	font-size: 20rpx;
	color: rgba(255, 255, 255, 0.4);
	margin-top: 8rpx;
	text-align: right;
}

.self-bubble .message-time {
	color: rgba(255, 255, 255, 0.6);
}

.input-area {
	display: flex;
	align-items: center;
	padding: 16rpx;
	background-color: #001E3C;
	border-top: 1rpx solid #003366;
	box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.3);
	transition: all 0.3s ease;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
}

.input-container {
	flex: 1;
	display: flex;
	align-items: center;
	background-color: #002B4A;
	border-radius: 28rpx;
	padding: 0 20rpx;
	transition: all 0.3s ease;
	box-shadow: inset 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
	border: 1rpx solid #004080;
}

.input-container:focus-within {
	background-color: #003366;
	box-shadow: inset 0 1rpx 3rpx rgba(0, 191, 255, 0.3);
	border-color: #00BFFF;
}

.input {
	flex: 1;
	height: 56rpx;
	font-size: 28rpx;
	color: #E0F7FF;
}

.input::placeholder {
	color: #8092A6;
	opacity: 1;
}

.input-actions {
	display: flex;
	align-items: center;
}

.action-btn {
	width: 56rpx;
	height: 56rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 28rpx;
	transition: all 0.3s ease;
	margin-left: 8rpx;
}

.action-btn:hover {
	background-color: rgba(0, 191, 255, 0.1);
	transform: scale(1.1);
}

.action-icon {
	font-size: 32rpx;
	color: #8092A6;
}

.send-btn {
	margin-left: 16rpx;
	padding: 16rpx 32rpx;
	border-radius: 28rpx;
	background-color: #003366;
	transition: all 0.3s ease;
	box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.3);
	border: 1rpx solid #004080;
}

.send-btn-active {
	background-color: #00BFFF;
	box-shadow: 0 4rpx 12rpx rgba(0, 191, 255, 0.3);
	border-color: #00BFFF;
}

.send-btn-active:hover {
	background-color: #0099cc;
	transform: translateY(-2rpx);
}

.send-btn-text {
	font-size: 28rpx;
	color: #ffffff;
	font-weight: 500;
}

.loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20rpx 0;
}

.loading-spinner {
	width: 32rpx;
	height: 32rpx;
	border: 3rpx solid #f3f3f3;
	border-top: 3rpx solid #007AFF;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin-bottom: 12rpx;
}

.loading-text {
	font-size: 24rpx;
	color: #999999;
}

/* 动画效果 */
@keyframes messageSlideIn {
	from {
		opacity: 0;
		transform: translateY(20rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.message-animation {
	animation: messageFadeIn 0.3s ease-out;
}

@keyframes messageFadeIn {
	from {
		opacity: 0;
		transform: scale(0.8);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>