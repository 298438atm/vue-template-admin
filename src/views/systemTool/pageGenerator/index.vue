<template>
  <div>
    <SearchModul ref="SearchModul"></SearchModul>
    <BtnBoxModul ref="BtnBoxModul"></BtnBoxModul>
    <TableModul ref="TableModul"></TableModul>
    <PageModul ref="PageModul"></PageModul>
    <div class="preview_btn" @click="preview">
      <el-button type="text">预览</el-button>
    </div>
    <el-dialog title="预览" :visible.sync="visible" width="80%">
      <TablePage
        :data="[{}]"
        :searchProp="searchFormData"
        :showSearch="searchFormData.showSearch"
        v-bind="tableFormData"
        :columns="tableTableData"
        :pageProp="pageFormData"
        :btnBoxProp="btnsFormData"
      >
        <template #leftBtn>
          <el-button
            v-for="(item, index) in btnsTableData"
            :key="index"
            v-bind="item"
            >{{ item.name }}</el-button
          >
        </template>
        <template #endColumn v-if="tableFormData.isBtn">
          <el-table-column prop="operate" label="操作" align="center">
            <MyTableBtn
              v-for="(item, index) in operateBtns"
              :key="index"
              :btnType="item"
            ></MyTableBtn>
          </el-table-column>
        </template>
      </TablePage>
      <template #footer>
        <el-button type="primary" @click="openWriteDialog">写入文件</el-button>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="writeVisible" title="文件写入" width="420px">
      <el-form :model="vuePageData" label-width="100px" :rules="writeRules" ref="writeForm">
        <el-form-item prop="componentName" label="组件名称：">
          <MyInput v-model="vuePageData.componentName" placeholder="组件名称会成为vue文件name值" style="width: 100%"></MyInput>
        </el-form-item>
        <el-form-item prop="fileName" label="文件名称：">
          <MyInput v-model="vuePageData.fileName"></MyInput>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="writeFile" type="primary">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SearchModul from './components/SearchModul.vue'
import BtnBoxModul from './components/BtnBoxModul.vue'
import TableModul from './components/TableModul.vue'
import PageModul from './components/PageModul.vue'
import { btnTemplateStr, operateBtnTempalteStr } from './compiler'
export default {
  components: { SearchModul, BtnBoxModul, TableModul, PageModul },
  name: 'PageGenerator',
  data() {
    return {
      visible: false,
      searchFormData: {},
      btnsFormData: {},
      btnsTableData: [],
      tableFormData: {},
      operateBtns: [],
      tableTableData: [],
      pageFormData: {},
      writeVisible: false,
      vuePageData: {},
      writeRules: {
        componentName: {required: true, message: '请输入组件名称', trigget: 'blur'},
        fileName: {required: true, message: '请输入文件名称', trigget: 'blur'}
      }
    }
  },
  methods: {
    async preview() {
      const searchFlag = this.$commonFun.cloneDeep(
        await this.$refs.SearchModul.getFormData()
      )
      const btnsFlag = this.$commonFun.cloneDeep(
        await this.$refs.BtnBoxModul.getFormData()
      )
      const tableFlag = this.$commonFun.cloneDeep(
        await this.$refs.TableModul.getFormData()
      )
      const pageFlag = this.$commonFun.cloneDeep(
        await this.$refs.PageModul.getFormData()
      )
      if (searchFlag && btnsFlag && tableFlag && pageFlag) {
        this.searchFormData = searchFlag.showSearch ? searchFlag : false
        const { btnsTableData } = btnsFlag
        delete btnsFlag.btnsTableData
        this.btnsFormData = btnsFlag.showBtns ? btnsFlag : false
        this.btnsTableData = btnsTableData.map((item) => {
          item.style?.forEach((attr) => {
            item[attr] = true
          })
          delete item.style
          return item
        })
        const { tableTableData } = tableFlag
        delete tableFlag.tableTableData
        this.tableFormData = tableFlag
        this.operateBtns = tableFlag.isBtn ? tableFlag.btns : []
        this.tableTableData = tableTableData
        this.pageFormData = pageFlag.isPagination ? pageFlag : false
        this.visible = true
      }
    },
    openWriteDialog() {
      this.writeVisible = true
    },
    async writeFile() {
      await this.$refs.writeForm.validate()
      const btnsStr = btnTemplateStr(this.btnsTableData)
      const operatoperateBtnStr = operateBtnTempalteStr(this.operateBtns)
      const fileStr = `<template>
  <div>
    <TablePage
      :data="tableData"
      :search="search"
      :load="tableLoading"
      :searchProp="searchProp"
      v-bind="tableFormData"
      :columns="columns"
      :pageProp="pageProp"
      :btnBoxProp="btnsFormData"
    >
        ${btnsStr}
        ${operatoperateBtnStr}
    </TablePage>
  </div>
</template>

<script>
  // import { getTable } from '@/api/test'
  export default {
    name: '${this.componentName}',
    data() {
      return {
        form: {},
        tableData: [{}],
        searchProp: ${JSON.stringify(this.searchFormData)},
        tableFormData: ${JSON.stringify(this.tableFormData)}
        columns: ${JSON.stringify(this.tableTableData)},
        pageProp: ${JSON.stringify(this.pageFormData)},
        btnsFormData: ${JSON.stringify(this.btnsFormData)},
        tableLoading: false,
      }
    },
    created() {
      // this.search()
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
        getTable(Object.assign({}, this.pageProp, this.form)).then(
          ({ record, total }) => {
            this.tableData = record
            this.pageProp.total = total
            this.tableLoading = false
          }
        )
      },
    },
  }
<\/script>

<style lang="less" scoped>
  .el-input,
  .el-select,
  .el-date-picker,
  .el-time-select,
  .el-date-editor,
  .el-range-editor {
    width: 100% !important;
  }
</style>`
      fileStr
      const fileContent = fileStr
      const options = {
        suggestedName: this.fileName, // 建议的文件名
        types: [
          {
            description: 'Vue Files',
            accept: {
              'text/vue': ['.vue'],
            },
          },
        ],
      }
      try {
        // 请求选择保存文件的位置
        const fileHandle = await window.showSaveFilePicker(options)
        const writable = await fileHandle.createWritable()
        // 写入数据
        await writable.write(fileContent)
        // 完成写入
        await writable.close()
        console.log('Vue 文件创建并写入成功！')
      } catch (error) {
        console.error('Vue 文件创建或写入失败：', error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.preview_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  .el-button {
    font-size: 18px;
  }
}
.preview_btn:hover {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.5);
}
/deep/ .el-table__empty-block {
  width: 100% !important;
}
</style>
