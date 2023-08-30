<template>
  <el-card header="表格栏">
    <el-form :model="tableFormData" inline label-width="160px">
      <el-form-item label="是否需要边框："
        ><el-checkbox v-model="tableFormData.border"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要序号："
        ><el-checkbox v-model="tableFormData.orderNumber"></el-checkbox
      ></el-form-item>
      <el-form-item label="能否选择：">
        <MySelect
          v-model="tableFormData.selectType"
          :options="selectOptions"
        ></MySelect>
      </el-form-item>
    </el-form>
    <MyTableForm v-model="formTableData" :columns="columns"></MyTableForm>
  </el-card>
</template>

<script>
export default {
  name: 'TableModul',
  data() {
    return {
      tableFormData: {
        border: true,
        orderNumber: true,
        isCenter: true,
        selectType: 'multiple'
      },
      selectOptions: [
        { label: '多选', value: 'multiple' },
        { label: '单选', value: 'radio' },
        { label: '不能选择', value: 'none' },
      ],
      columns: [
        {
          type: 'input',
          label: '列名',
          prop: 'label',
          rules: { required: true, message: '请输入列名', trigger: 'blur' },
        },
        {
          type: 'input',
          label: '列值',
          prop: 'prop',
          rules: { required: true, message: '请输入列值', trigger: 'blur' },
        },
        {
          type: 'checkbox',
          label: '是否当作搜索条件',
          prop: 'search',
        },
        {
          type: 'select',
          label: '搜索条件类型',
          prop: 'type',
          params: {
            options: [
              { label: '输入框', value: 'input' },
              { label: '下拉', value: 'select' },
              { label: '时间选择器', value: 'time' },
              { label: '日期选择器', value: 'date' },
            ],
          },
        },
        {
          type: 'input',
          label: '搜素条件字典值',
          prop: 'searchDictKey',
        },
        {
          type: 'input',
          label: '回显转换字典值',
          prop: 'columnsDictKey',
        },
      ],
      formTableData: [],
      visible: false,
    }
  },
}
</script>

<style lang="less" scoped></style>
