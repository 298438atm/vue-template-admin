<template>
  <el-card header="分页栏">
    <el-form :model="paginationFormData" inline label-width="160px">
      <el-form-item label="是否需要分页："
        ><el-checkbox v-model="paginationFormData.isPagination"></el-checkbox
      ></el-form-item>
      <el-form-item
        label="是否带有背景色："
        v-if="paginationFormData.isPagination"
        ><el-checkbox v-model="paginationFormData.background"></el-checkbox
      ></el-form-item>
      <el-form-item
        label="是否一页时隐藏分页："
        v-if="paginationFormData.isPagination"
        ><el-checkbox v-model="paginationFormData.oneHide"></el-checkbox
      ></el-form-item>
      <el-form-item label="页码大小：" v-if="paginationFormData.isPagination"
        ><MySelect
          v-model="paginationFormData.background"
          :options="pageSizes"
        ></MySelect
      ></el-form-item>

      <el-form-item v-if="paginationFormData.isPagination">
        <template #label
          >需要的分页模块
          <el-tooltip
            class="item"
            effect="dark"
            content="选择的顺序也决定了分页组件的布局顺序"
            placement="top"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
        <MySelect
          style="width: 520px"
          v-model="paginationFormData.layout"
          :options="pageModules"
          multiple
        ></MySelect>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'PageModul',
  data() {
    return {
      paginationFormData: {
        isPagination: true,
        isBackground: true,
        isOneHide: true,
        layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
      },
      pageModules: [
        { value: 'total', label: '总数' },
        { value: 'sizes', label: '每页大小' },
        { value: 'prev', label: '上一页' },
        { value: 'pager', label: '点击页码跳转' },
        { value: 'next', label: '下一页' },
        { value: 'jumper', label: '输入页码跳转' },
      ],
      pageSizes: [
        { label: '10, 20, 30, 40, 50, 100', value: '10,20,30,40,50,100' },
        { label: '10, 30, 100, 200, 500', value: '10,30,100,200,500' },
        { label: '20, 50, 100, 200, 500', value: '20,50,100,200,500' },
        { label: '50, 100, 200, 500, 1000', value: '50,100,200,500,1000' },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.header_box {
  display: flex;
  justify-content: space-between;
}
</style>
