<template>
  <div>
    <MyTable
      :data="tableData"
      :columns="columns"
      :pageObj="pageObj"
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
          <el-select v-model="form.dictTypeStatus">
            <el-option
              v-for="item in dict['systemStatus']"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template #btnBox>
        <el-button type="primary" @click="openDictTypeForm('add')"
          >新增</el-button
        >
        <el-button
          type="danger"
          v-show="ids.length > 0"
          :loading="delBtnLoading"
          v-remind="{ hander: selectDel }"
        >
          删除
        </el-button>
      </template>
      <template #dictTypeName="{ data }">
        <el-button type="text" @click="openDictDataForm(data.row)">{{
          data.row['dictTypeName']
        }}</el-button>
      </template>
      <template #dictTypeStatus="{ data }">
        <span>{{ data.row['dictTypeStatus'] === '1' ? '启用' : '停用' }}</span>
      </template>
      <template #endColumn>
        <el-table-column prop="operate" label="操作" align="center">
          <template #default="{ row }">
            <el-button
              type="text"
              :loading="row.statusLoading"
              v-remind="{
                hander: dictTypeStatusChange.bind(null, row),
                message: `确认${
                  row.dictTypeStatus === '1' ? '停用' : '启用'
                }该条数据吗？`,
              }"
              >{{ row.dictTypeStatus === '1' ? '停用' : '启用' }}</el-button
            >
            <el-button type="text" @click="openDictTypeForm('edit', row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              class="btn_text_red"
              :loading="row.delLoading"
              :disabled="row.disabled"
              v-remind="{ hander: rowDel.bind(null, row) }"
              >删除</el-button
            >
            {{ row.loading }}
          </template>
        </el-table-column>
      </template>
    </MyTable>
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
        },
        {
          label: '备注',
          prop: 'dictTypeRemark',
          align: 'center',
        },
      ],
      pageObj: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      tableLoading: false,
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
      },
      ids: [],
      delBtnLoading: false,
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
      API.getDictTypeList(Object.assign({}, this.pageObj, this.form)).then(
        (res) => {
          this.tableData = res.record
          this.pageObj.total = res.total
          this.tableLoading = false
        }
      )
    },
    // 勾选
    selectChange(select) {
      this.ids = select.map((item) => item.id)
    },
    selectDel() {
      this.delBtnLoading = true
      API.del(this.ids).then((res) => {
        this.delBtnLoading = false
        this.search()
      })
    },
    rowDel(row) {
      this.$set(row, 'delLoading', true)
      API.del([row.id]).then((res) => {
        this.$set(row, 'delLoading', false)
        this.search()
      })
    },
    dictTypeStatusChange(row) {
      this.$set(row, 'statusLoading', true)
      API.changeDictypeStatus(row.id).then(() => {
        this.$set(row, 'statusLoading', false)
        this.search()
      })
    },
    openDictTypeForm(type, row) {
      this.dictTypeProps.visible = true
      this.dictTypeProps.type = type
      console.log(clone)
      this.dictTypeProps.formData = clone(row)
    },
    openDictDataForm(row) {
      this.dictDataProps.visible = true
      this.dictDataProps.dictTypeId = row.id
      this.dictDataProps.dictTypeName = row.dictTypeName
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
