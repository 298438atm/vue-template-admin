<template>
  <div>
    <TablePage
      v-model="form"
      v-bind="tableFormData"
      :data="tableData"
      :search="search"
      :load="tableLoading"
      :searchProp="searchProp"
      :columns="columns"
      :pageData="pageData"
      :btnBoxProp="btnsFormData"
      @selection-change="selectChange"
    >
      <template #leftBtn>
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          @click="openUserForm('add')"
          >新增</el-button
        ><el-button
          type="danger"
          icon="el-icon-delete-solid"
          @click="del"
          v-if="ids.length > 0"
          :loading="delLoading"
          >删除</el-button
        >
      </template>
      <template #endColumn>
        <el-table-column prop="operate" label="操作" align="center">
          <template #default="{ row }">
            <MyTableBtn
              btnType="status"
              :status="row.status"
              @click="changeStatus(row)"
              :loading="row.statusLoading"
            ></MyTableBtn>
            <MyTableBtn
              btnType="edit"
              @click="openUserForm('edit', row)"
            ></MyTableBtn
            ><MyTableBtn
              btnType="del"
              @click="del(row)"
              :loading="row.delLoading"
            ></MyTableBtn>
          </template>
        </el-table-column>
      </template>
      <template #roleIds="{ text }">
        <el-tag
          v-for="item in roleList
            .filter((item) => text.includes(item.code))
            .map((item) => item.name)"
          :key="item"
          >{{ item }}</el-tag
        >
      </template>
    </TablePage>
    <AddUser
      :visible.sync="userDialogData.visible"
      :roleList="roleList"
      v-bind="userDialogData"
    ></AddUser>
  </div>
</template>

<script>
import AddUser from './AddUser.vue'
import API from '@/api/user'
export default {
  name: 'User',
  components: { AddUser },
  computed: {},
  data(_this) {
    return {
      form: {},
      tableData: [],
      searchProp: {
        showSearch: true,
        showSearchBtn: true,
        showResetBtn: true,
        showRetractBtn: true,
        returnSearch: true,
        showIcon: true,
        defaultShowRow: 1,
      },
      tableFormData: {
        border: true,
        isOrderNumber: true,
        isCenter: true,
        isSelect: 'multiple',
        isBtn: true,
        btns: ['edit', 'del'],
      },
      columns: [
        {
          label: '用户昵称',
          prop: 'nickname',
          search: true,
          type: 'input',
        },
        {
          label: '用户电话',
          prop: 'tel',
          search: true,
          type: 'input',
        },
        {
          label: '用户角色',
          prop: 'roleIds',
          search: true,
          type: 'select',
          params: {
            options: _this.getRoleList,
            optionLabel: 'name',
            optionValue: 'code',
          },
        },
        {
          label: '用户状态',
          prop: 'status',
          search: true,
          statusTag: true,
        },
      ],
      pageData: {
        isPagination: true,
        background: true,
        hideOnSinglePage: false,
        layout: 'total,sizes,prev,pager,next,jumper',
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50, 100],
        currentPage: 1,
        total: 0
      },
      btnsFormData: {
        showBtns: true,
        showRetractBtn: true,
        showRefreshBtn: true,
        showScreenBtn: true,
      },
      tableLoading: false,
      userDialogData: {
        visible: false,
        type: 'add',
        formData: {},
        search: this.search,
      },
      roleList: [],
      ids: [],
      delLoading: false,
    }
  },
  created() {
    this.getRoleList()
    this.search()
  },

  methods: {
    // 勾选
    selectChange(select) {
      this.ids = select.map((item) => item.id)
    },
    async getRoleList(cb = () => {}) {
      this.roleList = await API.getRoleList()
      cb(this.roleList)
    },
    search(type, pageData) {
      if (type === 'reset') {
        this.form = {}
      } else if (type === 'search') {
        this.pageData.currentPage = 1
      } else if (type === 'pagination') {
        this.pageData = Object.assign(this.pageData, pageData)
      }
      this.tableLoading = true
      API.getList(
        Object.assign(
          {},
          {
            currentPage: this.pageData.currentPage,
            pageSize: this.pageData.pageSize,
          },
          this.form
        )
      ).then(({ record, total }) => {
        this.tableData = record
        this.pageData.total = total
        this.tableLoading = false
      })
    },
    openUserForm(type, row = {}) {
      this.userDialogData.visible = true
      this.userDialogData.type = type
      this.userDialogData.formData = this.$commonFun.cloneDeep(row)
    },
    async del(row) {
      await this.$confirm(`确认删除所选数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      let ids = this.ids
      if (row.id) {
        ids = [row.id]
        this.$set(row, 'delLoading', true)
      } else {
        this.delLoading = true
      }
      API.del(ids)
        .then(() => {
          this.$message.success('删除成功！')
          this.search()
        })
        .finally(() => {
          this.$set(row, 'delLoading', false)
          this.delLoading = false
        })
    },
    changeStatus(row) {
      this.$set(row, 'statusLoading', true)
      API.changeStatus({ id: row.id })
        .then((res) => {
          this.search()
        })
        .finally(() => {
          this.$set(row, 'statusLoading', false)
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
