<template>
  <el-card>
    <template #header>
      <CardHeader title="分页栏"></CardHeader>
    </template>
    <el-form
      :model="paginationFormData"
      inline
      label-width="170px"
      :rules="rules"
      ref="form"
    >
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
      >
        <template #label>
          <el-tooltip
            class="item"
            effect="dark"
            content="选择是预览的时候分页组件不可见"
            placement="top"
          >
            <i class="el-icon-warning"></i> </el-tooltip
          >是否一页时隐藏分页：</template
        >
        <el-checkbox v-model="paginationFormData.hideOnSinglePage"></el-checkbox
      ></el-form-item>
      <el-form-item
        label="页码大小："
        v-if="paginationFormData.isPagination"
        prop="pageSizes"
        ><MySelect
          v-model="paginationFormData.pageSizes"
          :options="pageSizeOptions"
        ></MySelect
      ></el-form-item>

      <el-form-item v-if="paginationFormData.isPagination" prop="layout">
        <template #label
          >
          <el-tooltip
            class="item"
            effect="dark"
            content="选择的顺序也决定了分页组件的布局顺序"
            placement="top"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
          需要的分页模块：
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
import CardHeader from './CardHeader.vue'
import cache from '../mixins'
export default {
  name: 'PageModul',
  components: {CardHeader},
  mixins: [cache],
  data() {
    return {
      key: 'paginationFormData',
      paginationFormData: {
        isPagination: true,
        background: true,
        hideOnSinglePage: true,
        layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
        pageSize: 10,
        pageSizes: '[10,20,30,40,50,100]',
      },
      pageModules: [
        { value: 'total', label: '总数' },
        { value: 'sizes', label: '每页大小' },
        { value: 'prev', label: '上一页' },
        { value: 'pager', label: '点击页码跳转' },
        { value: 'next', label: '下一页' },
        { value: 'jumper', label: '输入页码跳转' },
      ],
      pageSizeOptions: [
        { label: '10, 20, 30, 40, 50, 100', value: '[10,20,30,40,50,100]' },
        { label: '10, 30, 100, 200, 500', value: '[10,30,100,200,500]' },
        { label: '20, 50, 100, 200, 500', value: '[20,50,100,200,500]' },
        { label: '50, 100, 200, 500, 1000', value: '[50,100,200,500,1000]' },
      ],
      rules: {
        pageSizes: { required: true, message: '请选择页码', trigger: 'change' },
        layout: {
          required: true,
          message: '请选择分页模块',
          trigger: 'change',
        },
      },
    }
  },
  methods: {
    async getFormData() {
      const flag = await this.$refs.form.validate()
      if (flag) {
        return {
          ...this.paginationFormData,
          pageSizes: JSON.parse(this.paginationFormData.pageSizes),
          layout: this.paginationFormData.layout.join(','),
        }
      } else {
        return false
      }
    },
  },
  watch: {
    'paginationFormData.pageSizes'(newV) {
      if (newV) {
        this.paginationFormData.pageSize = JSON.parse(newV)[0]
      } else {
        this.paginationFormData.pageSize = 10
      }
    },
  },
}
</script>
