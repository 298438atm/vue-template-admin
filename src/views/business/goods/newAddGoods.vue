<template>
  <div>
    <MyTable
      :data="tableData"
      :columns="columns"
      :pageObj="pageObj"
      :search="search"
      :load="tableLoading"
      @selectionChange="selectionChange"
    >
      <template #formItem>
        <el-form-item label="输入框">
          <el-input v-model="form.input"></el-input>
        </el-form-item>
        <el-form-item label="下拉框">
          <el-select v-model="form.select"> </el-select>
        </el-form-item>
        <el-form-item label="固定时间选择器">
          <el-time-select v-model="form.timeSelect"> </el-time-select>
        </el-form-item>
        <el-form-item label="时间选择器">
          <el-time-picker v-model="form.time"></el-time-picker>
        </el-form-item>
        <el-form-item label="日期选择器" :widthMultiple="2">
          <el-date-picker v-model="form.date"> </el-date-picker>
        </el-form-item>
      </template>
      <template #btnBox>
        <el-button type="primary">新增</el-button>
      </template>
    </MyTable>
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
        },
        {
          label: '商品编号',
          prop: 'code',
          align: 'center',
        },
        {
          label: '商品价格',
          prop: 'price',
          align: 'center',
        },
        {
          label: '添加时间',
          prop: 'date',
          align: 'center',
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
    search(type) {
      if (type === 'reset') {
        this.form = {}
      } else if (type === 'search') {
        this.pageObj.currentPage = 1
      }
      this.tableLoading = true
      getTable(Object.assign({}, this.pageObj, this.form)).then((res) => {
        this.tableData = res.data
        this.pageObj.total = res.total
        this.tableLoading = false
      })
    },
    selectionChange(arr) {
      console.log(arr);
    }
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
  width: 100%;
}
</style>
