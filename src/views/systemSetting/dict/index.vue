<template>
  <div>
    <TablePage
      :data="tableData"
      :columns="columns"
      :pageProp="pageProp"
      :search="search"
      :load="tableLoading"
      @selection-change="selectChange"
    >
      <template #formItem>
        <el-form-item label="字典名称">
          <el-input
            v-model="form.dictTypeName"
            placeholder="请输入字典名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="字典编号">
          <el-input
            v-model="form.dictTypeCode"
            placeholder="请输入字典编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="字典状态">
          <MySelect
            v-model="form.dictDataStatus"
            :options="dict['systemStatus']"
          ></MySelect>
        </el-form-item>
      </template>
      <template #leftBtn>
        <el-button
          type="primary"
          @click="openDictTypeForm('add')"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-button
          type="danger"
          v-show="ids.length > 0"
          icon="el-icon-delete"
          :loading="delBtnLoading"
          @click="delDict"
        >
          删除
        </el-button>
      </template>
      <template #dictTypeName="{ row }">
        <el-button type="text" @click="openDictDataForm(row)">{{
          row['dictTypeName']
        }}</el-button>
      </template>
      <template #endColumn>
        <el-table-column prop="operate" label="操作" align="center">
          <template #default="{ row }">
            <MyTableBtn
              btnType="status"
              :status="row.dictTypeStatus"
              :loading="row.statusLoading"
              @click="dictTypeStatusChange(row)"
            ></MyTableBtn>
            <MyTableBtn
              btnType="edit"
              @click="openDictTypeForm('edit', row)"
            ></MyTableBtn>
            <MyTableBtn
              btnType="del"
              :loading="row.delLoading"
              @click="delDict(row)"
            >
            </MyTableBtn>
          </template>
        </el-table-column>
      </template>
    </TablePage>
    <AddDictType
      v-bind="dictTypeProps"
      :visible.sync="dictTypeProps.visible"
      :search="search"
    ></AddDictType>
    <AddDictData
      v-bind="dictDataProps"
      :visible.sync="dictDataProps.visible"
      :search="search"
    ></AddDictData>
  </div>
</template>

<script>
import { clone } from 'lodash'

import AddDictType from './AddDictType.vue'
import AddDictData from './AddDictData.vue'
import API from '@/api/dict'
export default {
  name: 'Dict',
  components: { AddDictType, AddDictData },
  dicts: ['systemStatus'],
  data() {
    return {
      form: {},
      tableData: [],
      columns: [
        {
          label: '字典类型名称',
          prop: 'dictTypeName',
          align: 'center',
        },
        {
          label: '字典类型编码',
          prop: 'dictTypeCode',
          align: 'center',
        },
        {
          label: '创建时间',
          prop: 'createTime',
          align: 'center',
        },
        {
          label: '字典类型状态',
          prop: 'dictTypeStatus',
          align: 'center',
          statusTag: true,
        },
        {
          label: '备注',
          prop: 'dictTypeRemark',
          align: 'center',
        },
      ],
      pageProp: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      dictTypeProps: {
        visible: false,
        type: 'add',
        formData: {},
      },
      dictDataProps: {
        visible: false,
        type: 'add',
        dictTypeId: '',
        dictTypeName: '',
        dictDataType: 'string',
      },
      ids: [],
      tableLoading: false,
      delBtnLoading: false,
    }
  },
  created() {
    this.search()
  },
  methods: {
    search(type, pageProp) {
      if (type === 'reset') {
        this.form = {}
      } else if (type === 'search') {
        this.pageProp.currentPage = 1
      } else if (type === 'pagination') {
        this.pageProp = Object.assign(this.pageProp, pageProp)
      }
      this.tableLoading = true
      API.getDictTypeList(Object.assign({}, this.pageProp, this.form)).then(
        (res) => {
          this.tableData = res.record
          this.pageProp.total = res.total
        }
      ).finally(() => {
        this.tableLoading = false
      })
    },
    // 勾选
    selectChange(select) {
      this.ids = select.map((item) => item.id)
    },
    async delDict(row) {
      await this.$confirm(`确认删除所选数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      if (row.id) {
        this.$set(row, 'delLoading', true)
      } else {
        this.delBtnLoading = true
      }
      API.del(row.id ? [row.id] : this.ids)
        .then(() => {
          this.search()
        })
        .finally(() => {
          this.delBtnLoading = false
          this.$set(row, 'delLoading', false)
        })
    },
    dictTypeStatusChange(row) {
      this.$set(row, 'statusLoading', true)
      API.changeDictypeStatus(row.id).then(() => {
        this.search()
      }).finally(() => {
        this.$set(row, 'statusLoading', false)
      })
    },
    openDictTypeForm(type, row) {
      this.dictTypeProps.visible = true
      this.dictTypeProps.type = type
      console.log(clone)
      this.dictTypeProps.formData = clone(row)
    },
    openDictDataForm({ dictDataType, id, dictTypeName }) {
      this.dictDataProps.visible = true
      this.dictDataProps.dictTypeId = id
      this.dictDataProps.dictTypeName = dictTypeName
      this.dictDataProps.dictDataType = dictDataType
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
  width: 100%;
}
</style>
