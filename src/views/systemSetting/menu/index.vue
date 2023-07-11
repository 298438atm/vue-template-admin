<template>
  <div>
    <TablePage
      :data="tableData"
      :columns="columns"
      :pageObj="false"
      :search="search"
      :load="this.tableLoading"
      :orderNumber="false"
      row-key="id"
      @selection-change="selectChange"
    >
      <template #formItem>
        <el-form-item label="菜单名称">
          <el-input
            v-model="form.dictTypeName"
            placeholder="请输入字典名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单状态">
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
        <el-button type="primary" @click="openMenuForm('add')"
          >新增</el-button
        >
        <el-button
          type="danger"
          v-show="ids.length > 0"
          :loading="delBtnLoading"
          @click="selectDel"
        >
          删除
        </el-button>
      </template>
      <template #dictTypeName="{ data }">
        <el-button type="text" @click="openDictDataForm(data.row)">{{
          data.row['dictTypeName']
        }}</el-button>
      </template>
      <template #status="{ data }">
        <span>{{ data.row['status'] ? '启用' : '停用' }}</span>
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
            <el-button type="text" @click="openMenuForm('edit', row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              class="btn_text_red"
              :loading="row.delLoading"
              :disabled="row.disabled"
              @click="rowDel(row)"
              >删除</el-button
            >
            {{ row.loading }}
          </template>
        </el-table-column>
      </template>
    </TablePage>
    <AddMenu :visible.sync="menuDialogData.visible" v-bind="menuDialogData"></AddMenu>
  </div>
</template>

<script>
import { clone } from 'lodash'
import API from '@/api/menu'

import AddMenu from './AddMenu.vue'
export default {
  name: 'Menu',
  components: { AddMenu },
  dicts: ['systemStatus'],
  data() {
    return {
      form: {},
      tableData: [],
      columns: [
        {
          label: '菜单名称',
          prop: 'name',
          align: 'center',
        },
        {
          label: '菜单类型',
          prop: 'type',
          align: 'center',
        },
        {
          label: '状态',
          prop: 'status',
          align: 'center',
        },
        {
          label: '备注',
          prop: 'remark',
          align: 'center',
        },
      ],
      pageObj: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      menuDialogData: {
        visible: false,
        type: 'add',
        formData: {},
        search: this.search
      },
      ids: [],
      tableLoading: false,
      delBtnLoading: false
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
      API.getMenuList(Object.assign({}, this.pageObj, this.form)).then(
        (res) => {
          this.tableLoading = false
          this.tableData = res
        }
      )
    },
    // 勾选
    selectChange(select) {
      this.ids = select.map((item) => item.id)
    },
    selectDel() {
      this.delBtnLoading = true
      API.delMenu(this.ids).then((res) => {
        this.delBtnLoading = false
        this.search()
      })
    },
    rowDel(row) {
      this.$set(row, 'delLoading', true)
      API.delMenu([row.id]).then((res) => {
        this.search()
        this.$set(row, 'delLoading', false)
      })
    },
    dictTypeStatusChange(row) {
      this.$set(row, 'statusLoading', true)
      API.changeMenuStatus(row.id).then(() => {
        this.$set(row, 'statusLoading', false)
        this.search()
      })
    },
    openMenuForm(type, row = {}) {
      this.menuDialogData.visible = true
      this.menuDialogData.type = type
      this.menuDialogData.formData = clone(row)
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
