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
          <el-form-item prop="name" label="角色名称">
            <MyInput v-model="form.name" :placeholder="`请输入角色名称`">
            </MyInput>
          </el-form-item>
          <el-form-item prop="code" label="角色编码">
            <MyInput v-model="form.code" :placeholder="`请输入角色编码`">
            </MyInput>
          </el-form-item>
          <el-form-item prop="status" label="是否启用">
            <StatusSwitch v-model="form.status"></StatusSwitch>
          </el-form-item>
          <el-form-item prop="sort" label="排序">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              :min="1"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="remark" label="角色备注">
            <MyTextarea v-model="form.remark" :placeholder="`请输入角色备注`">
            </MyTextarea>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <MyTree
            v-if="localVisible"
            type="role"
            nodeKey="code"
            v-model="form.menuIds"
          ></MyTree>
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
import API from '@/api/role'
export default {
  name: 'AddRole',
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
      return (this.type === 'add' ? '新增' : '编辑') + '角色'
    },
  },
  data() {
    const checkNameOrCode = ({ field }, value, callback) => {
      const typeName = field === 'name' ? '名称' : '编码'
      API.checkNameOrCode({ field, [field]: value, id: this.form.id }).then(
        (res) => {
          if (res) {
            callback()
          } else {
            callback(new Error(typeName + '名称不能重复！'))
          }
        }
      )
    }
    return {
      form: {
        name: undefined,
        code: undefined,
        status: '1',
        remark: undefined,
        menuIds: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: ['blur', 'change'],
          },
          {
            validator: this.$commonFun.debounce(checkNameOrCode, 500, {leading: true}),
            trigger: ['blur', 'change'],
          },
        ],
        code: [
          {
            required: true,
            message: '请输入角色编码',
            trigger: ['blur', 'change'],
          },
          {
            validator: this.$commonFun.debounce(checkNameOrCode, 500),
            trigger: ['blur', 'change'],
          },
        ],
        status: [
          {
            required: true,
            message: '请选择角色状态',
            trigger: ['change'],
          },
        ],
        sort: [
          {
            required: true,
            message: '请输入角色排序',
            trigger: ['blur'],
          },
        ],
      },
      submitLoading: false,
    }
  },
  methods: {
    cancel(done) {
      if (typeof done === 'function') {
        done()
      }
      this.form = {
        name: undefined,
        code: undefined,
        status: '1',
        remark: undefined,
        menuIds: [],
      }
      this.$refs.form.resetFields()
      this.localVisible = false
    },
    submit() {
      this.submitLoading = true
      this.$refs.form.validate((flag) => {
        if (flag) {
          API.addEditRole(this.form).then((res) => {
            this.cancel()
            this.search()
          }).finally(() => {
            this.submitLoading = false
          })
        } else {
          this.submitLoading = false
        }
      })
    },
  },
  watch: {
    visible(newV) {
      if (newV) {
        if (this.type === 'edit') {
          this.form = this.formData
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.my_tree {
  max-height: 500px;
  overflow-y: scroll;
}
</style>
