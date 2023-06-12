<template>
  <el-card>
    <template slot="header">
      <div class="header_box">
        <div class="left_box">
          <slot name="title">
            <span class="icon">
              <i :class="icon"></i>
            </span>
            <span class="name">{{ title || $route.name }}</span>
          </slot>
        </div>
        <div class="btn_box">
          <slot name="btn">
            <el-button>重置</el-button>
            <el-button type="primary">查询</el-button>
          </slot>
        </div>
      </div>
    </template>
    <el-form label-width="120px">
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
      default: () => ({
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 4,
      }),
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
      const formItemList = this.$refs.formItemBoxRef.children
      let sumSpanNum = 0
      let flag = false
      for (let index = 0; index < formItemList.length; index++) {
        const element = formItemList[index]
        const widthMultiple = element.getAttribute('widthMultiple')
        let spanNum =
          Number(element.getAttribute(this.currentWidthField)) ||
          this.formItemCol[this.currentWidthField]
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
  watch: {},
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
    font-size: 24px;
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
<style>
.el-input,
.el-select,
.el-date-picker,
.el-time-select,
.el-date-editor,
.el-range-editor {
  width: 100%;
}
</style>
