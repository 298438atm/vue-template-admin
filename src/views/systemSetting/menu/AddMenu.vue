<template>
  <el-dialog
    :visible.sync="localVisible"
    :title="title"
    width="1000px"
    :before-close="cancel"
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="parentMenu" label="父级菜单">
            <MySelectTree
              v-model="form.parentMenu"
              :selectProp="selectProp"
              :treeProp="treeProp"
              @node-click="parentMenuClick"
            ></MySelectTree>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="type" :label="formLabelType + '类型'" required>
            <el-radio-group v-model="form.type">
              <el-radio-button
                v-for="item in dict['menuType']"
                :label="item.value"
                :key="item.value"
                :disabled="!allowTypes.includes(item.value)"
                >{{ item.label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="name" :label="formLabelType + '名称'">
            <MyInput v-model="form.name"></MyInput>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="code" :label="formLabelType + '编码'">
            <MyInput v-model="form.code" placeholder="请选择父级菜单">
            </MyInput>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.type === 'page'">
          <el-form-item prop="path" :label="formLabelType + '路由'">
            <MyInput v-model="form.path"> </MyInput>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type === 'menu'">
          <el-form-item prop="component" label="组件地址">
            <MyInput v-model="form.component"> </MyInput>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.type !== 'button'">
          <el-form-item prop="icon" :label="formLabelType + '图标'">
            <MyIcon v-model="form.icon"></MyIcon>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="status" :label="formLabelType + '状态'" required>
            <StatusSwitch v-model="form.status"></StatusSwitch>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.type === 'page'" required>
          <el-form-item prop="keepAlive" label="是否缓存">
            <el-switch
              v-model="form.keepAlive"
              active-text="启用"
              inactive-text="停用"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="remark" :label="formLabelType + '备注'">
            <MyInput v-model="form.remark" type="textarea"></MyInput>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit" :loading="submitLoading"
        >提交</el-button
      >
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import API from '@/api/menu'
export default {
  name: 'AddMenu',
  dicts: ['menuType'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: String,
    search: Function,
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
    title() {
      return (this.type === 'add' ? '新增' : '编辑') + this.formLabelType
    },
    formLabelType() {
      return this.form.type === 'menu'
        ? '菜单'
        : this.form.type === 'page'
        ? '页面'
        : '按钮'
    },
  },
  data() {
    return {
      form: {
        parentMenu: 'rootMenu',
        type: 'menu',
        name: undefined,
        code: undefined,
        component: undefined,
        status: true,
        keepAlive: false,
        path: undefined,
        icon: undefined,
        remark: undefined,
      },
      selectProp: {
        placeholder: '请选择父级菜单',
        clearable: true,
      },
      treeProp: {
        expandOnClickNode: false,
        highlightHeight: true,
        defaultExpandAll: true,
        nodeKey: 'id',
        props: { label: 'name' },
      },
      rules: {
        parentMenu: [
          { required: true, message: '请选择父级菜单', trigger: 'change' },
        ],
        name: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: ['blur', 'change'],
          },
        ],
        code: [
          {
            required: true,
            message: '请输入菜单编码',
            trigger: ['blur', 'change'],
          },
        ],
        icon: [
          { required: true, message: '请选择菜单图标', trigger: 'change' },
        ],
      },
      cuerentParentMenuType: undefined,
      allowTypes: ['menu', 'page'],
      submitLoading: false,
    }
  },
  methods: {
    cancel(done) {
      if (typeof done === 'function') {
        done()
      }
      this.localVisible = false
      this.$refs.form.resetFields()
    },
    parentMenuClick(node) {
      this.cuerentParentMenuType = node.type
      if (node.type === 'menu') {
        this.allowTypes = ['menu', 'page']
        this.form.type = 'menu'
      } else if (node.type === 'page') {
        this.allowTypes = ['page', 'button']
        this.form.type = 'page'
      }
    },
    submit() {
      this.$refs.form.validate((flag) => {
        if (flag) {
          this.submitLoading = true
          API.addEditMenu(this.form).then((res) => {
            this.submitLoading = false
            this.cancel()
            this.search()
          })
        }
      })
    },
  },
  watch: {
    visible(newV) {
      if (newV && this.type === 'edit') {
        this.form = this.formData
      }
    },
  },
}
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
