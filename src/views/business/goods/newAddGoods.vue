<template>
  <div>
    <TablePage
      :data="tableData"
      :columns="columns"
      :pageData="pageData"
      :searchProp="{
        defaultShowRow: 1,
      }"
      :search="search"
      :load="tableLoading"
    >
      <template #leftBtn>
        <el-button type="primary">新增</el-button>
      </template>
    </TablePage>
  </div>
</template>

<script>
import { getTable } from '@/api/business/goods/newAddGoods'
export default {
  name: 'newAddGoods',
  data() {
    return {
      form: {},
      tableData: [],
      columns: [
        {
          label: '商品名称',
          prop: 'name',
          align: 'center',
          search: true,
          params: {
            maxlength: 15,
          },
        },
        {
          label: '商品编号',
          prop: 'code',
          align: 'center',
          search: true,
        },
        {
          label: '商品类型',
          prop: 'goodsType',
          align: 'center',
          type: 'select',
          search: true,
          dictKey: 'goodsType',
        },
        {
          label: '商品价格',
          prop: 'price',
          align: 'center',
          type: 'select',
          search: true,
          dictKey: 'priceRegion',
        },
        {
          label: '入库时间',
          prop: 'time',
          align: 'center',
          search: true,
          type: 'date',
          widthMultiple: '2',
          params: {
            type: 'daterange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
          },
        },
      ],
      pageData: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      tableLoading: false,
    }
  },
  created() {
    this.search()
  },

  methods: {
    search(type, pageDataOrForm) {
      if (type === 'reset') {
        this.form = {}
        this.pageData = {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        }
      } else if (type === 'search') {
        this.pageData.currentPage = 1
        this.form = Object.assign(this.form, pageDataOrForm)
      } else if (type === 'pagination') {
        this.pageData = Object.assign(this.pageData, pageDataOrForm)
      }
      this.tableLoading = true
      getTable(Object.assign({}, this.pageData, this.form)).then(
        ({ record, total }) => {
          this.tableData = record
          this.pageData.total = total
          this.tableLoading = false
        }
      )
    },
  },
}
</script>

<style lang="less" scoped>
.el-input,
.el-select,
.el-date-picker,
.el-time-select,
.el-date-editor,
.el-range-editor {
  width: 100% !important;
}
</style>
