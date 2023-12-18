<template>
  <div>
    <TablePage
      row-key="id"
      :data="tableData"
      :columns="columns"
      :pageProp="false"
      :search="search"
      :orderNumber="false"
      :load="this.tableLoading"
      :expand-row-keys="expandRowKeys"
      getRefMyTable="myTable"
      @selection-change="selectChange"
    >
      <template #formItem>
        <el-form-item label="菜单名称">
          <el-input
            v-model="form.name"
            placeholder="请输入字典名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-select v-model="form.status">
            <el-option :value="true" label="启用"></el-option>
            <el-option :value="false" label="停用"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template #name="{ row }">
        <span v-if="row.name.indexOf(form.name) > -1">
          {{ row.name.substr(0, row.name.indexOf(form.name))
          }}<span style="color: #f50">{{ form.name }}</span
          >{{ row.name.substr(row.name.indexOf(form.name) + form.name.length) }}
        </span>
        <span v-else>{{ row.name }}</span>
      </template>
      <template #leftBtn>
        <el-button type="primary" @click="openMenuForm('add')">新增</el-button>
        <el-button
          type="danger"
          v-show="ids.length > 0"
          :loading="delBtnLoading"
          @click="delMenu"
        >
          删除
        </el-button>
      </template>
      <template #endColumn>
        <el-table-column prop="operate" label="操作" align="center">
          <template #default="{ row }">
            <MyTableBtn
              btnType="status"
              :loading="row.statusLoading"
              :status="row.status"
              @click="menuStatusChange(row, row.status ? '停用' : '启用')"
            ></MyTableBtn>
            <MyTableBtn
              btnType="edit"
              @click="openMenuForm('edit', row)"
            ></MyTableBtn>
            <MyTableBtn
              btnType="del"
              :loading="row.delLoading"
              @click="delMenu(row)"
            ></MyTableBtn>
            {{ row.loading }}
          </template>
        </el-table-column>
      </template>
    </TablePage>
    <AddMenu
      :visible.sync="menuDialogData.visible"
      v-bind="menuDialogData"
    ></AddMenu>
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
      form: {
        name: '',
      },
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
          statusTag: true,
        },
        {
          label: '备注',
          prop: 'remark',
          align: 'center',
        },
      ],
      pageProp: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      menuDialogData: {
        visible: false,
        type: 'add',
        formData: {},
        search: this.search,
      },
      ids: [],
      expandRowKeys: [],
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
      API.getMenuList(Object.assign({}, this.pageProp, this.form)).then(
        (res) => {
          if (type === 'search') {
            this.changeExpand(res, true)
          } else if (type === 'reset') {
            this.changeExpand(res, false)
          }
          this.tableLoading = false
          this.tableData = res
        }
      )
    },
    // 勾选
    selectChange(select) {
      this.ids = select.map((item) => item.id)
    },
    // 展开或收起所有
    changeExpand(arr, flag) {
      arr.forEach((row) => {
        this.$refs.myTable.toggleRowExpansion(row, flag)
        if (Array.isArray(row.children)) {
          this.changeExpand(row.children, flag)
        }
      })
    },
    async delMenu(row) {
      await this.$confirm(`确认删除所选数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      let ids = []
      if (row) {
        this.$set(row, 'delLoading', true)
        ids = [row.id]
      } else {
        this.delBtnLoading = false
        ids = this.ids
      }
      API.delMenu(ids).finally((res) => {
        row ? this.$set(row, 'delLoading', false) : (this.delBtnLoading = false)
        this.search()
        this.store.dispatch('user/getMenu')
      })
    },
    async menuStatusChange(row, text) {
      await this.$confirm(`确认${text}该数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      this.$set(row, 'statusLoading', true)
      API.changeMenuStatus(row.id).finally(() => {
        this.$set(row, 'statusLoading', false)
        this.search()
        this.store.dispatch('user/getMenu')
      })
    },
    openMenuForm(type, row = {}) {
      this.menuDialogData.visible = true
      this.menuDialogData.type = type
      this.menuDialogData.formData = clone(row)
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
