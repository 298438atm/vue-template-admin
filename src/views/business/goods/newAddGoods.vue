<template>
  <div>
    <TablePage
      :data="tableData"
      :columns="columns"
      :pageObj="pageObj"
      :search="search"
      :load="tableLoading"
    >
      <template #formItem>
        <el-form-item label="请选择时间" prop="time" searchSort="5">
          <MyTimePicker v-model="form.time"></MyTimePicker>
        </el-form-item>
      </template>
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
            maxlength: 15
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
          prop: 'createTime',
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
      pageObj: {
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
    search(type, pageObj) {
      if (type === 'reset') {
        this.form = {}
      } else if (type === 'search') {
        this.pageObj.currentPage = 1
      } else if (type === 'pagination') {
        this.pageObj = Object.assign(this.pageObj, pageObj)
      }
      this.tableLoading = true
      getTable(Object.assign({}, this.pageObj, this.form)).then(
        ({ record, total }) => {
          this.tableData = record
          this.pageObj.total = total
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
