<template>
  <el-card>
    <template slot="header">
      <div class="header_box">
        <div class="left_box">
          <slot name="title">
            <i :class="$route.meta.icon" class="icon" v-if="showIcon"></i>
            <span class="name">{{ title || $route.name }}</span>
          </slot>
        </div>
        <div class="btn_box">
          <slot name="btn">
            <el-button @click="search('reset')" icon="el-icon-refresh-right" v-if="showResetBtn"
              >重置</el-button
            >
            <el-button
              v-if="showSearchBtn"
              @click="search('search')"
              type="primary"
              icon="el-icon-search"
              >查询</el-button
            >
          </slot>
        </div>
      </div>
    </template>
    <el-form :label-width="labelWidth" @keyup.enter.native="search">
      <div ref="formItemBoxRef" class="form_item_box">
        <el-form-item
          v-for="item in searchColums"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :widthMultiple="item.widthMultiple || '1'"
          :sort="item.searchSort"
        >
          <MySelect
            v-if="item.type === 'select'"
            v-model="form[item.prop]"
            v-bind="item.params"
            :options="dict[item.dictKey]"
            :placeholder="item.params?.placeholder || '请选择' + item.label"
          ></MySelect>
          <MyDatePicker
            v-else-if="item.type === 'date'"
            v-model="form[item.prop]"
            v-bind="item.params"
            :placeholder="item.params?.placeholder || '请选择' + item.label"
          ></MyDatePicker>
          <MyInput
            v-else
            v-model="form[item.prop]"
            v-bind="item.params"
            :placeholder="item.params?.placeholder || '请输入' + item.label"
          ></MyInput>
        </el-form-item>
        <slot name="formItem"></slot>
      </div>
      <div class="retractor" v-if="showRetractBtn">
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
  dicts: [],
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 是否展示图标
    showIcon: {
      type: Boolean,
      default: true
    },
    // 图标，默认为新建菜单的icon图标
    icon: {
      type: String,
      default: 'el-icon-s-order',
    },
    // 显示搜索按钮
    showSearchBtn: {
      type: Boolean,
      default: true
    },
    // 显示重置按钮
    showResetBtn: {
      type: Boolean,
      default: true
    },
    // 默认展示几行
    defaultShowRow: {
      type: Number,
      default: 1,
    },
    // 显示收起按钮
    showRetractBtn: {
      type: Boolean,
      default: true
    },
    // 用户的布局
    formItemCol: {
      type: Object,
      default: () => ({}),
    },
    // 搜索方法
    search: {
      type: Function,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: '120px',
    },
    returnSearch: {
      type: Boolean,
      default: true
    }
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
    searchColums() {
      return this.columns.filter((item) => item.search)
    },
  },
  data() {
    return {
      retackt: false,
      hideColStartIndex: 0,
      currentWidthField: 'span',
      form: {},
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
      const formItemList = Array.from(this.$refs.formItemBoxRef?.children || [])
      formItemList.sort((a, b) => {
        const sortA = a.getAttribute('searchSort') || 0
        const sortB = b.getAttribute('searchSort') || 0
        console.log(sortA - sortB, 'sortA - sortB');
        return sortA - sortB
      })
      console.log(formItemList)
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
    searchColums: {
      deep: true,
      immediate: true,
      handler(newV) {
        const dictKeys = newV
          .filter((item) => item.dictKey)
          .map((item) => item.dictKey)
        if (dictKeys.length > 0) {
          this.getDictList(dictKeys)
        }
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

.el-input,
.el-select,
.el-date-picker,
.el-time-select,
.el-date-editor,
.el-range-editor {
  width: 100% !important;
}
</style>
