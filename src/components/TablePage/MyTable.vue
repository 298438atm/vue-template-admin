<template>
  <el-card class="my_table">
    <el-table
      style="width: 100%"
      v-bind="$attrs"
      v-loading="load"
      v-on="$listeners"
      show-overflow-tooltip
      :height="height"
      ref="myTable"
    >
      <el-table-column
        v-if="isSelect === 'multiple'"
        type="selection"
        v-bind="selectColumsData"
        align="center"
      ></el-table-column>
      <el-table-column
        v-else-if="isSelect === 'radio'"
        type="index"
        v-bind="selectColumsData"
        align="center"
      >
        <template #default="{ $index }">
          <el-radio v-model="radioValue" :label="$index"></el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isOrderNumber"
        type="index"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-for="item in showColumList"
        v-bind="item"
        :key="item.prop"
        :align="item.align || 'center'"
      >
        <template #default="{ row, $index }">
          <slot
            :name="item.prop"
            :row="row"
            :index="$index"
            :text="row[item.prop]"
          >
            <div v-if="item.statusTag">
              <StatusTag :status="row[item.prop]"></StatusTag>
            </div>
            <span v-else>{{ row[item.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
      <slot name="endColumn"></slot>
    </el-table>
    <div class="pagination_box" v-if="pageData">
      <el-pagination
        v-bind="mergePageObj"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    // 选择框类型  multiple：多选，radio：单选，none：不需要选择
    isSelect: {
      type: String,
      default: 'multiple',
    },
    // 选项列的属性集合
    selectColumsData: {
      type: Object,
      default: () => ({})
    },
    isOrderNumber: {
      type: Boolean,
      default: true,
    },
    // 序号列属性集合
    orderNumberColumsData: {
      type: Object,
      default: () => ({})
    },
    // 列表展示字段
    showColumList: {
      type: Array,
      default: () => [],
    },
    // 分页属性
    pageData: {
      type: [Object, Boolean],
      default: () => ({}),
    },
    load: {
      type: Boolean,
      default: false,
    },
    search: Function,
  },
  computed: {
    mergePageObj() {
      if (this.pageData) {
        return Object.assign({}, this.localPageObj, this.pageData)
      } else {
        this.localPageObj
      }
    },
  },
  mounted() {
    this.$commonFun.dispatch(this, 'myTable', this.$refs.myTable)
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
    // 事件总线监听
    this.$bus.$on('setHight', this.setHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.setHeight)
  },
  data() {
    return {
      radioValue: undefined,
      localPageObj: {
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 50, 100],
        currentPage: 1,
        pageSize: 10,
      },
      height: null,
    }
  },
  methods: {
    sizeChange(val) {
      this.search('pagination', { pageSize: val })
    },
    currentChange(val) {
      this.search('pagination', { currentPage: val })
    },
    // 设置高度
    setHeight() {
      this.$nextTick(() => {
        if (this.$refs.myTable) {
          let offsetTop = this.$refs.myTable.$el.getBoundingClientRect().top
          this.height =
            Math.floor(document.documentElement.offsetHeight - offsetTop - 50) +
            'px'
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.my_table {
  margin-top: 20px;
}
.pagination_box {
  margin-top: 20px;
  text-align: right;
}
/deep/ .el-radio__label {
  display: none;
}
</style>
