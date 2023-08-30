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
        :searchProp="searchFormData"
        :showSearch="searchFormData.showSearch"
        v-bind="tableFormData"
        :columns="tableFormTableData"
      >
        <template #leftBtn>
          <el-button
            v-for="(item, index) in btnsTableData"
            :key="index"
            v-bind="item"
            >{{ item.name }}</el-button
          >
        </template>
        <template>

        </template>
      </TablePage>
    </el-dialog>
  </div>
</template>

<script>
import SearchModul from './SearchModul.vue'
import BtnBoxModul from './BtnBoxModul.vue'
import TableModul from './TableModul.vue'
import PageModul from './PageModul.vue'
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
      tableFormTableData: []
    }
  },
  methods: {
    preview() {
      this.searchFormData = this.$refs.SearchModul.searchFormData
      this.btnsFormData = this.$refs.BtnBoxModul.btnsFormData
      this.btnsTableData = this.$commonFun.cloneDeep(this.$refs.BtnBoxModul.formTableData).map(item => {
        item.style.forEach(attr => {
          item[attr] = true
        })
        delete item.style
        return item
      })
      this.tableFormData = this.$refs.TableModul.tableFormData
      this.tableFormTableData = this.$refs.TableModul.formTableData
      this.visible = true
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
