<template>
  <div>
    <TablePage
      row-key="id"
      :data="tableData"
      :columns="columns"
      :search="search"
      :load="this.tableLoading"
      :pageProp="pageProp"
      show-overflow-tooltip
      @selection-change="selectChange"
    >
      <template #formItem>
        <el-form-item label="角色名称">
          <el-input
            v-model="form.name"
            placeholder="请输入角色名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input
            v-model="form.code"
            placeholder="请输入角色编码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="form.status">
            <el-option value="0" label="启用"></el-option>
            <el-option value="1" label="停用"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template #name="{ data }">
        <span v-if="data.row.name.indexOf(form.name) > -1">
          {{ data.row.name.substr(0, data.row.name.indexOf(form.name))
          }}<span style="color: #f50">{{ form.name }}</span
          >{{
            data.row.name.substr(
              data.row.name.indexOf(form.name) + form.name.length
            )
          }}
        </span>
        <span v-else>{{ data.row.name }}</span>
      </template>
      <template #leftBtn>
        <el-button type="primary" @click="openRoleForm('add')">新增</el-button>
        <el-button
          type="danger"
          v-show="ids.length > 0"
          :loading="delBtnLoading"
          @click="delRole"
        >
          删除
        </el-button>
      </template>
      <template #endColumn>
        <el-table-column prop="operate" label="操作" align="center">
          <template #default="{ row }">
            <div v-if="row.code !== 'admin'">
              <el-button
                type="text"
                :loading="row.statusLoading"
                @click="
                  roleStatusChange(row, row.status === '0' ? '启用' : '停用')
                "
                >{{ row.status === '0' ? '启用' : '停用' }}</el-button
              >
              <el-button type="text" @click="openRoleForm('edit', row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                class="btn_text_red"
                :loading="row.delLoading"
                :disabled="row.disabled"
                @click="delRole(row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </TablePage>
    <AddRole
      :visible.sync="roleDialogData.visible"
      v-bind="roleDialogData"
    ></AddRole>
  </div>
</template>

<script>
import { clone } from 'lodash'
import API from '@/api/role'

import AddRole from './AddRole.vue'
export default {
  name: 'Role',
  components: { AddRole },
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
          label: '菜单编码',
          prop: 'code',
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
          showOverflowTooltip: true,
        },
      ],
      pageProp: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      roleDialogData: {
        visible: false,
        type: 'add',
        formData: {},
        search: this.search,
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
      API.getRoleList(Object.assign({}, this.pageProp, this.form)).then(
        ({ currentPage, total, pageSize, record }) => {
          this.tableData = record
          this.pageProp.currentPage = currentPage
          this.pageProp.pageSize = pageSize
          this.pageProp.total = total
        }
      ).finally(() => {
        this.tableLoading = false
      })
    },
    // 勾选
    selectChange(select) {
      this.ids = select.map((item) => item.id)
    },
    async delRole(row) {
      await this.$confirm(`确认删除所选数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      let ids = []
      if (row.id) {
        this.$set(row, 'delLoading', true)
        ids = [row.id]
      } else {
        this.delBtnLoading = true
        ids = this.ids
      }
      API.delRole(ids)
        .then((res) => {
          this.search()
        })
        .finally(() => {
          row.id
            ? this.$set(row, 'delLoading', false)
            : (this.delBtnLoading = false)
        })
    },
    async roleStatusChange(row, text) {
      await this.$confirm(`确认${text}该数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      this.$set(row, 'statusLoading', true)
      API.changeRoleStatus(row.id).then(() => {
        this.search()
      }).finally(() => {
        this.$set(row, 'statusLoading', false)
      })
    },
    openRoleForm(type, row = {}) {
      this.roleDialogData.visible = true
      this.roleDialogData.type = type
      this.roleDialogData.formData = clone(row)
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
