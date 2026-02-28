// Mock数据管理

// 用户信息
export const userInfo = {
	id: "user_001",
	nickname: "小明",
	avatar: "/static/avatar1.png",
	signature: "今天又是元气满满的一天",
	level: 5
}

// 联系人列表
export const contacts = [
	{
		id: "user_002",
		name: "产品经理",
		avatar: "/static/c1.png",
		desc: "专注用户体验设计"
	},
	{
		id: "user_003",
		name: "设计小姐姐",
		avatar: "/static/c2.png",
		desc: "UI/UX设计师"
	},
	{
		id: "user_004",
		name: "后端开发",
		avatar: "/static/c3.png",
		desc: "全栈开发工程师"
	},
	{
		id: "user_005",
		name: "运营同学",
		avatar: "/static/c4.png",
		desc: "产品运营"
	},
	{
		id: "user_006",
		name: "前端开发",
		avatar: "/static/c5.png",
		desc: "Vue/React开发"
	},
	{
		id: "user_007",
		name: "测试工程师",
		avatar: "/static/c6.png",
		desc: "QA测试"
	}
]

// 对话列表
export const conversations = [
	{
		id: "conv_001",
		contactId: "user_002",
		contactName: "产品经理",
		contactAvatar: "/static/c1.png",
		lastMessage: "新版本什么时候上线？",
		lastTime: "2024-01-20 14:30:00",
		unreadCount: 2
	},
	{
		id: "conv_002",
		contactId: "user_003",
		contactName: "设计小姐姐",
		contactAvatar: "/static/c2.png",
		lastMessage: "设计稿已经发你邮箱了",
		lastTime: "2024-01-20 13:15:00",
		unreadCount: 0
	},
	{
		id: "conv_003",
		contactId: "user_004",
		contactName: "后端开发",
		contactAvatar: "/static/c3.png",
		lastMessage: "接口已经部署好了",
		lastTime: "2024-01-20 10:00:00",
		unreadCount: 1
	},
	{
		id: "conv_004",
		contactId: "user_005",
		contactName: "运营同学",
		contactAvatar: "/static/c4.png",
		lastMessage: "活动方案需要修改一下",
		lastTime: "2024-01-19 16:45:00",
		unreadCount: 0
	}
]

// 消息记录
export const getMessages = (contactId) => {
	// 先从本地存储获取消息
	const storedMessages = uni.getStorageSync(`messages_${contactId}`)
	if (storedMessages) {
		return storedMessages
	}
	
	// 如果本地存储没有，返回默认消息
	const messagesMap = {
		'user_002': [ // 产品经理
			{
				id: "msg_001",
				type: "text",
				content: "在吗？",
				senderId: contactId,
				isSelf: false,
				timestamp: "2024-01-20 14:25:00",
				isNew: false
			},
			{
				id: "msg_002",
				type: "text",
				content: "在的，有什么事吗？",
				senderId: "user_001",
				isSelf: true,
				timestamp: "2024-01-20 14:26:00",
				isNew: false
			},
			{
				id: "msg_003",
				type: "text",
				content: "新版本什么时候上线？",
				senderId: contactId,
				isSelf: false,
				timestamp: "2024-01-20 14:30:00",
				isNew: false
			}
		],
		'user_003': [ // 设计小姐姐
			{
				id: "msg_004",
				type: "text",
				content: "设计稿已经发你邮箱了",
				senderId: contactId,
				isSelf: false,
				timestamp: "2024-01-20 13:15:00",
				isNew: false
			},
			{
				id: "msg_005",
				type: "text",
				content: "好的，我看一下",
				senderId: "user_001",
				isSelf: true,
				timestamp: "2024-01-20 13:16:00",
				isNew: false
			},
			{
				id: "msg_006",
				type: "text",
				content: "有几个地方需要调整一下",
				senderId: "user_001",
				isSelf: true,
				timestamp: "2024-01-20 13:20:00",
				isNew: false
			}
		],
		'user_004': [ // 后端开发
			{
				id: "msg_007",
				type: "text",
				content: "接口已经部署好了",
				senderId: contactId,
				isSelf: false,
				timestamp: "2024-01-20 10:00:00",
				isNew: false
			},
			{
				id: "msg_008",
				type: "text",
				content: "太好了，我马上测试",
				senderId: "user_001",
				isSelf: true,
				timestamp: "2024-01-20 10:01:00",
				isNew: false
			}
		],
		'user_005': [ // 运营同学
			{
				id: "msg_009",
				type: "text",
				content: "活动方案需要修改一下",
				senderId: contactId,
				isSelf: false,
				timestamp: "2024-01-19 16:45:00",
				isNew: false
			},
			{
				id: "msg_010",
				type: "text",
				content: "好的，我看一下",
				senderId: "user_001",
				isSelf: true,
				timestamp: "2024-01-19 16:46:00",
				isNew: false
			}
		]
	}
	
	// 如果没有对应contactId的消息，返回默认消息
	const defaultMessages = messagesMap[contactId] || [
		{
			id: "msg_default",
			type: "text",
			content: "你好！",
			senderId: contactId,
			isSelf: false,
			timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
			isNew: false
		}
	]
	
	// 存储默认消息到本地
	uni.setStorageSync(`messages_${contactId}`, defaultMessages)
	return defaultMessages
}

// 保存消息到本地
export const saveMessages = (contactId, messages) => {
	uni.setStorageSync(`messages_${contactId}`, messages)
}

// 联系人信息
export const getContactInfo = (contactId, contactName, contactAvatar) => {
	return {
		id: contactId,
		nickname: contactName,
		avatar: contactAvatar,
		signature: '产品经理，专注用户体验设计',
		level: 3,
		region: '北京市',
		joinTime: '2023-06-15'
	}
}