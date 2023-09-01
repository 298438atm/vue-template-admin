<template>
  <el-card header="搜索栏">
    <el-form :model="searchFormData" inline label-width="160px">
      <el-form-item label="是否需要搜索栏："
        ><el-checkbox v-model="searchFormData.showSearch"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要查询按钮：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.showSearchBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要重置按钮：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.showResetBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要显示图标：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.showIcon"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要回车搜索：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.returnSearch"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要收起按钮：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.showRetractBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="收起时显示列数：" v-if="searchFormData.showSearch"
        ><el-input-number
          :min="0"
          v-model="searchFormData.defaultShowRow"
          style="width: 100%"
        ></el-input-number
      ></el-form-item>
      <el-form-item label="是否需要自定义标题：" v-if="searchFormData.showSearch"
        ><MyInput placeholder="默认取页面标题" v-model="searchFormData.title"></MyInput
      ></el-form-item>
    </el-form>
    <!-- <el-dialog title="预览" :visible.sync="visible">
      <TableSearch v-bind="searchFormData"></TableSearch>
    </el-dialog> -->
  </el-card>
</template>

<script>
import TableSearch from '@/components/TablePage/TableSearch.vue'
export default {
  components: { TableSearch },
  name: 'SearchModul',
  data() {
    return {
      searchFormData: {
        showSearch: true,
        showSearchBtn: true,
        showResetBtn: true,
        showRetractBtn: true,
        returnSearch: true,
        showIcon: true,
        defaultShowRow: 1,
        title: ''
      },
      visible: false
    }
  },
  created() {
    console.log(this, 'aa');
  },
  methods: {
    getFormData() {
      return this.searchFormData
    },
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>
.header_box {
  display: flex;
  justify-content: space-between;
}
</style>
