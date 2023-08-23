<template>
  <el-card>
    <template slot="header">
      <div class="header_box">
        <div class="left_box">
          <slot name="title">
            <i :class="$route.meta.icon" class="icon"></i>
            <span class="name">{{ title || $route.name }}</span>
          </slot>
        </div>
        <div class="btn_box">
          <slot name="btn">
            <el-button @click="search('reset')" icon="el-icon-refresh-right">重置</el-button>
            <el-button @click="search('search')" type="primary" icon="el-icon-search">查询</el-button>
          </slot>
        </div>
      </div>
    </template>
    <el-form label-width="120px" @keyup.enter.native="search">
      <div ref="formItemBoxRef" class="form_item_box">
        <slot name="formItem"></slot>
      </div>
      <div class="retractor">
        <span @click="retacktChange">
          {{ isRetacktText }}<i :class="isRetackt"></i>
        </span>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'TableSearch',
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'el-icon-s-order',
    },
    defaultShowRow: {
      type: Number,
      default: 1,
    },
    formItemCol: {
      type: Object,
      default: () => ({}),
    },
    search: {
      type: Function,
      default: () => {}
    },
  },
  model: {
    prop: 'form',
    event: 'formChange',
  },
  computed: {
    isRetackt() {
      return this.retackt ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
    },
    isRetacktText() {
      return this.retackt ? '展开' : '收起'
    },
  },
  data() {
    return {
      retackt: false,
      hideColStartIndex: 0,
      currentWidthField: 'span',
      localFormItemCol: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 4,
      },
    }
  },
  mounted() {
    this.formItemWidthReset()
    window.addEventListener('resize', this.formItemWidthReset)
  },
  methods: {
    // 设置当前屏幕尺寸应使用的字段
    formItemWidthReset() {
      const width = window.innerWidth
      if (width < 768) {
        this.currentWidthField = 'xs'
      } else if (width < 992) {
        this.currentWidthField = 'sm'
      } else if (width < 1200) {
        this.currentWidthField = 'md'
      } else if (width < 1920) {
        this.currentWidthField = 'lg'
      } else {
        this.currentWidthField = 'xl'
      }
      this.setFormItemWidth()
    },
    // 设置表单元素宽度
    setFormItemWidth() {
      const formItemList = this.$refs.formItemBoxRef?.children || 0
      let sumSpanNum = 0
      let flag = false
      for (let index = 0; index < formItemList.length; index++) {
        const element = formItemList[index]
        // widthMultiple为设置的宽度的倍数，如widthMultiple等于2则为设置宽度的两倍
        const widthMultiple = element.getAttribute('widthMultiple')
        let spanNum =
          Number(element.getAttribute(this.currentWidthField)) ||
          this.localFormItemCol[this.currentWidthField]
        if (widthMultiple) {
          spanNum = spanNum * widthMultiple
        }
        element.style.width = (spanNum / 24) * 100 + '%'
        if (!flag) {
          sumSpanNum += spanNum
          if (sumSpanNum > 24) {
            flag = true
            this.hideColStartIndex = index
          }
        }
      }
    },
    retacktChange() {
      Array.from(this.$refs.formItemBoxRef.children).forEach((item, index) => {
        if (index >= this.hideColStartIndex) {
          if (!this.retackt) {
            item.style.display = 'none'
          } else {
            item.style.display = 'block'
          }
        }
      })
      this.retackt = !this.retackt
    },
  },
  watch: {
    // 如何有用户自定义传入的col布局，则覆盖本地的默认布局
    formItemCol: {
      immediate: true,
      deep: true,
      handler(newV) {
        this.localFormItemCol = Object.assign(this.localFormItemCol, newV)
      },
    },
  },
}
</script>

<style lang="less" scoped>
.header_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left_box {
    display: flex;
    align-items: center;
  }
  .icon {
    font-size: 20px;
  }
  .name {
    font-size: 18px;
    padding-left: 5px;
  }
}
.form_item_box {
  display: flex;
  flex-wrap: wrap;
}
.retractor {
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  i {
    padding-left: 5px;
  }
}
</style>
