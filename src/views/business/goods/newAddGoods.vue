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
        <el-form-item label="商品名称">
          <el-input
            v-model="form.goodsName"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="form.select">
            <el-option
              v-for="item in dict['goodsType']"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格区间">
          <el-select v-model="form.select">
            <el-option
              v-for="item in dict['priceRegion']"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="固定时间选择器">
          <el-time-select v-model="form.timeSelect" placeholder="请选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="日期选择器">
          <el-date-picker v-model="form.dateSelect" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商品创建时间" placeholder="请选择商品创建时间" widthMultiple="2">
          <el-date-picker
            v-model="form.goodsCreateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </template>
      <template #btnBox>
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
          search: true
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
          prop: 'createTime',
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
  dicts: ['goodsType', 'priceRegion'],
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
      getTable(Object.assign({}, this.pageObj, this.form)).then(({record, total }) => {
        this.tableData = record
        this.pageObj.total = total
        this.tableLoading = false
      })
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
