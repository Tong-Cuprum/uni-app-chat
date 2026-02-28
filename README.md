# UniApp 聊天应用

一个基于 UniApp + Vue3 开发的跨平台对话类应用，支持 Android 和 iOS 真机运行。

## 项目简介

本项目是一个功能完整的即时通讯应用，包含对话列表、聊天详情、联系人详情和个人中心四个核心页面，采用科技风深色主题设计，支持流畅的动画交互效果。

## 功能特性

### 1. 对话列表页
- 展示会话记录（头像、昵称、最后消息、时间、未读数）
- 支持下拉刷新和上拉加载更多
- 点击会话跳转至聊天详情页
- 平滑的入场动画效果

### 2. 聊天详情页
- 展示完整对话记录
- 支持文本和图片消息类型
- 左右分布区分发送方和接收方
- 底部固定输入框，支持发送消息
- 发送消息后自动滚动到最新位置
- 消息发送动画效果
- 点击对方头像可查看联系人详情

### 3. 联系人详情页
- 展示联系人完整信息（头像、昵称、个性签名、等级等）
- 支持返回交互
- 提供发消息、打电话、视频通话等快捷操作
- 展示联系人详细信息（ID、地区、加入时间）

### 4. 个人中心页
- 展示当前用户信息
- 提供功能入口展示（设置、通知、收藏、历史等）
- 退出登录功能

## 技术栈

- **框架**: UniApp (Vue3)
- **平台**: Android / iOS / H5 / 小程序
- **样式**: SCSS / CSS3
- **数据**: Mock 数据 (JSON 格式)
- **状态管理**: Vue3 Composition API

## 项目结构

```
.
├── pages/
│   └── chat/
│       ├── chat-detail/          # 聊天详情页
│       ├── contact-detail/       # 联系人详情页
│       ├── contact-list/         # 联系人列表页
│       ├── conversation-list/    # 对话列表页
│       ├── profile/              # 个人中心页
│       └── mock/
│           └── data.js           # Mock 数据
├── components/
│   └── custom-tabbar/            # 自定义底部导航栏
├── static/                       # 静态资源
├── App.vue                       # 应用入口
├── main.js                       # 主入口文件
├── manifest.json                 # 应用配置
└── pages.json                    # 页面配置
```

## 核心功能实现

### 自定义导航栏
- 隐藏系统默认导航栏，实现自定义导航栏
- 适配全面屏，自动计算状态栏高度
- 统一的科技风深色主题

### 消息列表
- 使用 scroll-view 实现消息列表
- 支持自动滚动到最新消息
- 图片消息显示为 [图片] 标识

### 动画效果
- 页面转场动画（slide-in-right, slide-out-right）
- 消息发送动画（淡入 + 位移）
- 列表项入场动画（延迟渐入）
- 按钮交互反馈（缩放 + 颜色变化）

### 数据持久化
- 使用 uni.setStorageSync 保存聊天记录
- 支持聊天记录的本地存储和读取

## 安装与运行

### 环境要求
- HBuilderX 3.1.0+
- Node.js 14+

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/Tong-Cuprum/uni-app-chat.git
```

2. 使用 HBuilderX 打开项目

3. 安装依赖（如有需要）
```bash
npm install
```

4. 运行项目
- 点击 HBuilderX 工具栏的 "运行" 按钮
- 选择运行平台（Android / iOS / H5 / 小程序模拟器）

### 真机调试
1. 连接手机到电脑
2. 开启手机开发者模式和 USB 调试
3. 在 HBuilderX 中选择 "运行到手机或模拟器"
4. 选择已连接的设备

## 截图展示

> 请在实际项目中添加应用截图

## 数据格式

### 用户信息
```json
{
  "id": "user_001",
  "nickname": "小明",
  "avatar": "/static/avatar1.png",
  "signature": "今天又是元气满满的一天",
  "level": 5
}
```

### 对话列表
```json
{
  "id": "conv_001",
  "contactId": "user_002",
  "contactName": "产品经理",
  "contactAvatar": "/static/c1.png",
  "lastMessage": "新版本什么时候上线？",
  "lastTime": "2024-01-20 14:30:00",
  "unreadCount": 2
}
```

### 消息记录
```json
{
  "id": "msg_001",
  "type": "text",
  "content": "在吗？",
  "senderId": "user_002",
  "isSelf": false,
  "timestamp": "2024-01-20 14:25:00"
}
```

## 设计特点

### 视觉设计
- 科技风深色主题（深蓝配色方案）
- 统一的色彩体系：#001E3C（主色）、#00BFFF（强调色）、#E0F7FF（文字色）
- 圆角卡片设计，现代感强
- 精细的阴影和边框效果

### 交互设计
- 流畅的页面转场动画
- 即时的操作反馈
- 符合移动端操作习惯
- 全面屏适配

## 优化点

- 组件化开发，代码复用率高
- 使用 CSS 变量适配不同屏幕
- 图片懒加载优化
- 本地存储减少网络请求

## 参考资源

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue.js 官方文档](https://cn.vuejs.org/)

## 作者

- **GitHub**: [Tong-Cuprum](https://github.com/Tong-Cuprum)
- **邮箱**: 3374404806@qq.com

## 许可证

MIT License
