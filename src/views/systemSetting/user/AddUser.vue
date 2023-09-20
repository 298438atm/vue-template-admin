<template>
  <el-dialog
    :visible.sync="localVisible"
    :title="title"
    width="500px"
    :before-close="cancel"
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-row :gutter="20">
        <el-form-item prop="nickname" label="用户昵称">
          <MyInput v-model.trim="form.nickname" placeholder="请输入用户昵称">
          </MyInput>
        </el-form-item>

        <el-form-item prop="password" label="用户密码">
          <MyInput
            v-model.trim="form.password"
            placeholder="请输入用户密码"
            type="password"
            show-password
          ></MyInput>
        </el-form-item>
        <el-form-item prop="password2" label="二次确认">
          <MyInput
            v-model.trim="form.password2"
            placeholder="请输入用户密码"
            type="password"
            show-password
          ></MyInput>
        </el-form-item>

        <el-form-item prop="tel" label="用户电话">
          <MyInput v-model.trim="form.tel" placeholder="请输入用户电话">
          </MyInput>
        </el-form-item>

        <el-form-item prop="roleIds" label="用户角色">
          <MySelect
            v-model="form.roleIds"
            :options="roleList"
            optionLabel="name"
            optionValue="code"
            placeholder="请选择用户角色"
            multiple
          >
          </MySelect>
        </el-form-item>

        <el-form-item prop="status" label="是否启用">
          <StatusSwitch v-model="form.status"></StatusSwitch>
        </el-form-item>

        <el-form-item prop="remark" label="用户备注">
          <MyTextarea v-model.trim="form.remark" placeholder="请输入用户备注">
          </MyTextarea>
        </el-form-item>
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
import API from '@/api/user'
export default {
  name: 'AddUser',
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
    roleList: {
      type: Array,
      default: () => [],
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
    const checkPassword= (rule, value, callback) => {
      if (this.form.password !== value) {
        callback('两次密码不一致')
      } else {
        callback()
      }
    }
    return {
      form: {
        nickname: undefined,
        password: '123456',
        status: '1',
        remark: undefined,
        roleIds: [],
      },
      rules: {
        nickname: [
          {
            required: true,
            message: '请输入用户昵称',
            trigger: ['blur', 'change'],
          },
          {
            min: 2,
            max: 20,
            message: '用户昵称长度在2~20之间',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: '请输入用户密码',
            trigger: ['blur', 'change'],
          },
          {
            min: 6,
            max: 20,
            message: '用户密码长度在6~20之间',
            trigger: ['blur', 'change'],
          },
        ],
        password2: [
          {
            required: true,
            message: '请再次输入确认密码',
            trigger: ['blur', 'change'],
          },
          {
            validator: checkPassword,
            trigger: 'blur'
          },
        ],
        tel: [
          {
            required: true,
            message: '请输入用户手机',
            trigger: ['blur', 'change'],
          },
          {
            patten: /^[1][3-9]\d{9}$/,
            message: '请输入正确的手机号码',
            trigger: ['blur', 'change'],
          },
        ],
        status: [
          {
            required: true,
            message: '请选择用户状态',
            trigger: ['change'],
          },
        ],
        roles: [
          {
            required: true,
            message: '请选择用户角色',
            trigger: ['change'],
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
        roleIds: [],
      }
      this.$refs.form.resetFields()
      this.localVisible = false
    },
    submit() {
      this.submitLoading = true
      this.$refs.form.validate((flag) => {
        if (flag) {
          API.addOrEdit(this.form)
            .then((res) => {
              this.cancel()
              this.search()
            })
            .finally(() => {
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
