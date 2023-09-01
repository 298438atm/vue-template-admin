<template>
  <el-card header="按钮栏">
    <el-form
      :model="btnsFormData"
      inline
      label-width="160px"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="是否需要按钮栏："
        ><el-checkbox v-model="btnsFormData.showBtns"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要收起按钮：" v-if="btnsFormData.showBtns"
        ><el-checkbox v-model="btnsFormData.showRetractBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要刷新按钮：" v-if="btnsFormData.showBtns"
        ><el-checkbox v-model="btnsFormData.showRefreshBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要筛选按钮：" v-if="btnsFormData.showBtns"
        ><el-checkbox v-model="btnsFormData.showScreenBtn"></el-checkbox
      ></el-form-item>
      <MyTableForm
        ref="MyTableForm"
        :columns="btnsColumns"
        v-if="btnsFormData.showBtns"
        v-model="btnsTableData"
      >
      </MyTableForm>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'BtnBoxModul',
  data() {
    return {
      visible: false,
      btnsFormData: {
        showBtns: true,
        showRetractBtn: true,
        showRefreshBtn: true,
        showScreenBtn: true,
      },
      btnsColumns: [
        {
          type: 'input',
          label: '按钮名称',
          prop: 'name',
          rules: { required: true, message: '请输入按钮名称', trigger: 'blur' },
        },
        {
          type: 'icon',
          label: '按钮图标',
          prop: 'icon',
        },
        {
          type: 'select',
          label: '按钮类型',
          prop: 'type',
          required: true,
          params: {
            options: [
              { label: '主要', value: 'primary' },
              { label: '信息', value: 'info' },
              { label: '警告', value: 'warning' },
              { label: '危险', value: 'danger' },
            ],
          },
        },
        {
          type: 'select',
          label: '按钮样式',
          prop: 'style',
          required: true,
          params: {
            options: [
              { label: '朴素', value: 'plain' },
              { label: '圆角', value: 'round' },
              { label: '圆形', value: 'circle' },
            ],
            multiple: true,
          },
        },
      ],
      rules: {},
      btnsTableData: [],
    }
  },
  methods: {
    async getFormData() {
      if (this.btnsFormData.showBtns) {
        if (await this.$refs.MyTableForm.validate()) {
          return {
          btnsFormData: this.btnsFormData,
          btnsTableData: this.btnsTableData,
        }
        } else {
          return false
        }
      } else {
        return {
          btnsFormData: this.btnsFormData,
          btnsTableData: [],
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.header_box {
  display: flex;
  justify-content: space-between;
}
</style>
