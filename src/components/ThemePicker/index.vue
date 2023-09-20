<template>
  <el-drawer title="主题切换" :visible.sync="localVisible" direction="rtl">
    <div class="color_picker_box">
      <div class="color_item">
        主题色：
        <el-color-picker
          v-model="themeColorValue"
          :predefine="predefine"
          @change="themeColorValueChange"
        />
        <el-checkbox
          v-model="syncMenuColor"
          size="medium"
          @change="isSyncMenuBgk"
          >是否同步导航栏</el-checkbox
        >
      </div>
      <div class="color_item" v-if="!syncMenuColor">
        导航栏背景色：
        <el-color-picker v-model="menuColorValue" />
      </div>
      <div class="color_item">
        导航栏文字颜色：
        <el-color-picker v-model="menuTextColorValue" />
      </div>
      <div class="color_item">
        导航栏激活颜色：
        <el-color-picker v-model="menuTextActiveColorValue" />
      </div>
      <!-- <div class="color_item">
        组件大小：
        <el-select v-model="elementSizeValue">
          <el-option label="迷你的" value="mini"></el-option>
          <el-option label="较小的" value="small"></el-option>
          <el-option label="正常的" value="medium"></el-option>
        </el-select>
      </div> -->
      <div class="btn_box">
        <el-button type="primary" @click="updateTheme">确定</el-button>
        <el-button @click="defaultTheme">恢复默认主题</el-button>
        <el-button @click="resetTheme">重置</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import chalkCss from './chalk.js'
// const version = require('element-ui/package.json').version // element-ui version from node_modules
import { mapState } from 'vuex'
import pageShow from '@/config/pageShow.js'
export default {
  name: 'ThemePicker',
  noInstall: true,
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('theme', [
      'themeColor',
      'menuTextColor',
      'menuTextActiveColor',
      'menuColor',
      // 'elementSize',
    ]),
    localVisible: {
      get() {
        this.initColor()
        return this.visible
      },
      set(newV) {
        this.$emit('update:visible', newV)
      },
    },
  },
  data() {
    return {
      themeColorValue: '',
      menuTextColorValue: '',
      menuTextActiveColorValue: '',
      // elementSizeValue: 'small',
      predefine: [
        '#03748b',
        '#256DCB',
        '#409EFF',
        '#304156',
        '#212121',
        '#11a983',
        '#13c2c2',
        '#6959CD',
        '#f5222d',
        '#F80',
      ],
      syncMenuColor: true,
      chalk: '',
      defaultThemeBtnLoading: false,
    }
  },
  created() {
    this.initColor()
    this.updateTheme()
  },
  methods: {
    initColor() {
      this.themeColorValue = this.themeColor
      this.menuTextColorValue = this.menuTextColor
      this.menuTextActiveColorValue = this.menuTextActiveColor
      this.menuColorValue = this.menuColor
      // this.elementSizeValue = this.elementSize
    },
    isSyncMenuBgk() {
      this.menuColorValue = this.themeColorValue
    },
    themeColorValueChange() {
      if (this.syncMenuColor) {
        this.menuColorValue = this.themeColorValue
      }
    },
    // 修改主题颜色
    updateTheme() {
      // 获取新颜色列表（之所以是列表因为一种主题色还要随之配到一些列相似色，比如触碰按钮时颜色变浅，按钮点击时颜色变深）
      const themeCluster = this.getThemeCluster(
        this.themeColorValue.replace('#', '')
      )
      // 获取新旧颜色列表
      const originalCluster = this.getThemeCluster(
        this.themeColor.replace('#', '')
      )
      if (!this.chalk) {
        // const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        // await this.getCSSString(url, 'chalk')
        this.chalk = chalkCss.replace(/@font-face{[^}]+}/, '') // 本地缓存，如果需要获取线上的就用上面那种方式，优点：切换无延迟，缺点：需要手动维护 css string
      }
      this.setStyleTag('chalk', 'chalk-style', themeCluster)
      const styles = [].slice
        .call(document.querySelectorAll('style'))
        .filter((style) => {
          const text = style.innerText
          return (
            new RegExp(this.themeColor, 'i').test(text) &&
            !/Chalk Variables/.test(text)
          )
        })
      styles.forEach((style) => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        )
      })
      this.$store.commit('theme/CHANGE_STATE', [
        { menuColor: this.menuColorValue },
        { themeColor: this.themeColorValue },
        { menuTextColor: this.menuTextColorValue },
        { menuTextActiveColor: this.menuTextActiveColorValue },
        // { elementSize: this.elementSizeValue },
      ])
      this.localVisible = false
    },
    async defaultTheme() {
      await this.$confirm('确认恢复默认主题嘛？', '提示', {
        type: 'warning',
      })

      for (const key in pageShow.theme) {
        if (Object.hasOwnProperty.call(pageShow.theme, key)) {
          const val = pageShow.theme[key]
          this[key + 'Value'] = val
        }
      }
      this.updateTheme()
    },
    resetTheme() {
      this.initColor()
    },
    submit() {
      // 如果主题色有修改则变化主题色
      if (this.themeColorValue !== this.themeColor) {
        this.updateTheme()
      }
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getCSSString(url, variable) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            resolve()
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },

    getThemeCluster(theme) {
      // 获取浅色调
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }
      // 获取深色调
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }
      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    },
    setStyleTag(variable, id, themeCluster) {
      const originalCluster = this.getThemeCluster('#409EFF'.replace('#', ''))
      const newStyle = this.updateStyle(
        this[variable],
        originalCluster,
        themeCluster
      )
      let styleTag = document.getElementById(id)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', id)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = newStyle
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-drawer {
  width: 20% !important;
}
.color_item {
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid gainsboro;
}
.btn_box {
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
