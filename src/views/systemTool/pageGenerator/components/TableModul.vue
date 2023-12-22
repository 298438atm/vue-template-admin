<template>
  <el-card>
    <template #header>
      <CardHeader title="表格栏" @cache="cache"></CardHeader>
    </template>
    <el-form
      :model="tableFormData"
      inline
      label-width="160px"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="是否需要边框："
        ><el-checkbox v-model="tableFormData.border"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要序号："
        ><el-checkbox v-model="tableFormData.isOrderNumber"></el-checkbox
      ></el-form-item>
      <el-form-item label="能否选择：" prop="isSelect">
        <MySelect
          v-model="tableFormData.isSelect"
          :options="selectOptions"
        ></MySelect>
      </el-form-item>
      <el-form-item label="是否需要操作按钮："
        ><el-checkbox v-model="tableFormData.isBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="操作按钮：" prop="btns" v-if="tableFormData.isBtn">
        <MySelect
          v-model="tableFormData.btns"
          :options="btnsList"
          multiple
        ></MySelect>
      </el-form-item>
    </el-form>
    <MyTableForm
      ref="MyTableForm"
      v-model="tableFormData.tableTableData"
      :columns="columns"
    ></MyTableForm>
  </el-card>
</template>

<script>
import CardHeader from './CardHeader.vue'
import cache from '../mixins'
export default {
  name: 'TableModul',
  components: { CardHeader },
  mixins: [cache],
  data() {
    return {
      key: 'tableFormData',
      tableFormData: {
        border: true,
        isOrderNumber: true,
        isCenter: true,
        isSelect: 'multiple',
        isBtn: false,
        btns: [],
        tableTableData: [],
      },
      selectOptions: [
        { label: '多选', value: 'multiple' },
        { label: '单选', value: 'radio' },
        { label: '不能选择', value: 'none' },
      ],
      btnsList: [
        { label: '修改', value: 'edit' },
        { label: '保存', value: 'save' },
        { label: '删除', value: 'del' },
        { label: '启用停用', value: 'status' },
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
      ],
      rules: {
        isSelect: {
          required: true,
          message: '请选择表格是否可选',
          trigger: 'change',
        },
        btns: { required: true, message: '请选择操作按钮', trigger: 'change' },
      },
      visible: false,
    }
  },
  
  methods: {
    async getFormData() {
      const formFlag = await this.$refs.form.validate()
      const tableFlagFlag = await this.$refs.MyTableForm.validate()
      if (formFlag && tableFlagFlag) {
        return this.tableFormData
      }
    },
  },
}
</script>
