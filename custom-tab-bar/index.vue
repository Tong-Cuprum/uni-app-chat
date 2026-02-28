<template>
  <view class="custom-tabbar">
    <view 
      v-for="(item, index) in tabList" 
      :key="index"
      class="tab-item"
      :class="{ 'active': currentIndex === index }"
      @click="switchTab(index, item.pagePath)"
    >
      <view class="tab-icon">
        <image :src="currentIndex === index ? item.selectedIconPath : item.iconPath" mode="aspectFit" />
      </view>
      <text class="tab-text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      tabList: [
        {
          pagePath: "pages/chat/conversation-list/conversation-list",
          iconPath: "/static/home-active.png",
          selectedIconPath: "/static/home-active.png",
          text: "消息"
        },
        {
          pagePath: "pages/chat/contact-list/contact-list",
          iconPath: "/static/c1.png",
          selectedIconPath: "/static/c1.png",
          text: "联系人"
        },
        {
          pagePath: "pages/chat/profile/profile",
          iconPath: "/static/uni.png",
          selectedIconPath: "/static/uni.png",
          text: "我的"
        }
      ]
    };
  },
  mounted() {
    // 初始化当前选中的tab
    this.updateCurrentTab();
  },
  methods: {
    updateCurrentTab() {
      // 获取当前页面路径，更新选中的tab
      const pages = getCurrentPages();
      const currentPagePath = pages[pages.length - 1].route;
      
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].pagePath === currentPagePath) {
          this.currentIndex = i;
          break;
        }
      }
    },
    switchTab(index, pagePath) {
      if (index === this.currentIndex) return;
      
      // 切换tab
      uni.switchTab({
        url: `/${pagePath}`,
        success: () => {
          this.currentIndex = index;
        }
      });
    }
  }
};
</script>

<style scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #001E3C;
  border-top: 1rpx solid #004080;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 0.3s ease;
}

.tab-item.active {
  transform: translateY(-5rpx);
}

.tab-icon {
  width: 50rpx;
  height: 50rpx;
  margin-bottom: 5rpx;
  transition: all 0.3s ease;
}

.tab-item.active .tab-icon {
  transform: scale(1.1);
}

.tab-icon image {
  width: 100%;
  height: 100%;
}

.tab-text {
  font-size: 24rpx;
  color: #8092A6;
  transition: all 0.3s ease;
}

.tab-item.active .tab-text {
  color: #00BFFF;
  font-weight: bold;
}

/* 动画效果 */
@keyframes tabItemActive {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
  100% {
    transform: translateY(-5rpx);
  }
}

.tab-item.active {
  animation: tabItemActive 0.3s ease-in-out;
}
</style>