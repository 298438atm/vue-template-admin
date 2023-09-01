<template>
  <el-card class="my_table">
    <el-table
      style="width: 100%"
      v-bind="$attrs"
      v-loading="load"
      v-on="$listeners"
      show-overflow-tooltip
      ref="myTable"
    >
      <el-table-column
        v-if="selectType === 'multiple'"
        type="selection"
        :width="selectionWidth"
        align="center"
      ></el-table-column>
      <el-table-column
        v-else-if="selectType === 'radio'"
        type="index"
        :width="selectionWidth"
        align="center"
      >
        <template #default="{ $index }">
          <el-radio v-model="radioValue" :label="$index"></el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-if="orderNumber"
        type="index"
        label="序号"
        :width="orderNumberWidth"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-for="item in showColumList"
        v-bind="item"
        :key="item.prop"
        :align="item.align || 'center'"
      >
        <template #default="data">
          <slot :name="item.prop" :data="data">
            <div v-if="item.statusTag">
              <StatusTag :status="data.row[item.prop]"></StatusTag>
            </div>
            <span v-else>{{ data.row[item.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
      <slot name="endColumn"></slot>
    </el-table>
    <div class="pagination_box" v-if="pageProp">
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
    selectType: {
      type: String,
      default: 'multiple',
    },
    orderNumber: {
      type: Boolean,
      default: true,
    },
    orderNumberWidth: {
      type: String,
      default: '60',
    },
    selectionWidth: {
      type: String,
      default: '60',
    },
    // 列表展示字段
    showColumList: {
      type: Array,
      default: () => [],
    },
    pageProp: {
      type: [Object, Boolean],
      default: () => ({}),
    },
    load: {
      type: [Boolean, undefined],
      default: false,
    },
    search: Function,
  },
  computed: {
    mergePageObj() {
      if (this.pageProp) {
        return Object.assign({}, this.localPageObj, this.pageProp)
      } else {
        this.localPageObj
      }
    },
  },
  mounted() {
    this.$commonFun.dispatch(this, 'myTable', this.$refs.myTable)
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
    }
  },
  methods: {
    sizeChange(val) {
      this.search('pagination', { pageSize: val })
    },
    currentChange(val) {
      this.search('pagination', { currentPage: val })
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
