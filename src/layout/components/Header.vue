<template>
  <div class="header">
    <div class="left_box">
      <i :class="collapseClass" @click="isCollapseChange"></i>
      <div class="current_path">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in showRoutePath"
            :key="index"
            >{{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
    <div class="right_box">
      <i class="el-icon-full-screen" @click="requestFullScreen"></i>
      <img src="@/assets/image/tx.png" alt="头像" />
      <el-dropdown @command="dropdownClick">
        <span class="dropdown">
          fujl<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          <el-dropdown-item command="toggleTheme">
            <span @click="showThemePicker">切换主题</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ThemePicker :visible.sync="visible"></ThemePicker>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
export default {
  name: 'Header',
  components: { ThemePicker },
  data() {
    return {
      username: 'fujl',
      visible: false,
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse
    },
    isFullScreen() {
      return this.$store.state.app.isFullScreen
    },
    collapseClass() {
      return this.isCollapse ? 'el-icon-s-unfold icon' : 'el-icon-s-fold icon'
    },
    showRoutePath() {
      return this.$route.matched.filter((item) => item.name)
    },
  },
  methods: {
    isCollapseChange() {
      this.$store.commit('app/COLLAPSE_CHANGE')
    },
    requestFullScreen() {
      if (this.isFullScreen) {
        var element = document
        if (element.exitFullscreen) {
          element.exitFullscreen()
        } else if (element.webkitExitFullscreen) {
          element.webkitExitFullscreen()
        } else if (element.mozCancelFullScreen) {
          element.mozCancelFullScreen()
        }
      } else {
        var element = document.documentElement
        if (element.requestFullScreen) {
          element.requestFullScreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        }
      }
      this.$store.commit('app/SCREEN_CHANGE')
    },
    dropdownClick(command) {
      switch (command) {
        case 'toggleTheme':
          this.showThemePicker()
          break
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
    showThemePicker() {
      this.visible = true
    },
    async logout() {
      await this.$confirm('正在退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      sessionStorage.removeItem('token')
      this.$store.commit('user/ROUTES_CHANGE', [])
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  & > .left_box {
    display: flex;
    align-content: center;
    .icon {
      font-size: 22px;
      cursor: pointer;
    }
    .current_path {
      display: flex;
      align-items: center;
      padding-left: 20px;
      font-size: 14px;
    }
  }
  .right_box {
    display: flex;
    align-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin: 0 10px;
      border-radius: 50%;
      overflow: hidden;
    }
    .dropdown {
      cursor: pointer;
    }
  }
}
</style>
