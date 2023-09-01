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
        :data=[{}]
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
        <template #endColumn v-if="operateBtns">
          <el-table-column prop="operate" label="操作" align="center">
            <MyTableBtn
              v-for="(item, index) in operateBtns || []"
              :key="index"
              :btnType="item"
            ></MyTableBtn>
          </el-table-column>
        </template>
      </TablePage>
      <template #footer>
        <el-button type="primary" @click="writeFile">写入文件</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SearchModul from './SearchModul.vue'
import BtnBoxModul from './BtnBoxModul.vue'
import TableModul from './TableModul.vue'
import PageModul from './PageModul.vue'
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
        const { btnsFormData, btnsTableData } = btnsFlag
        this.btnsFormData = btnsFormData.showBtns ? btnsFormData : false
        this.btnsTableData = btnsTableData.map((item) => {
          item.style.forEach((attr) => {
            item[attr] = true
          })
          delete item.style
          return item
        })
        console.log(tableFlag, 'tableFlag');
        const { tableFormData, tableTableData } = tableFlag
        this.tableFormData = tableFormData
        this.operateBtns = tableFormData.btns
        this.tableTableData = tableTableData
        this.pageFormData = pageFlag.isPagination ? pageFlag : false
        this.visible = true
      }
    },
    async writeFile() {
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
  import { getTable } from '@/api/test'
  export default {
    name: 'newAddGoods',
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
      const fileName = 'MyComponent.vue'
      const fileContent = fileStr
      const options = {
        suggestedName: fileName, // 建议的文件名
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
