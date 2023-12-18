<template>
  <div class="container">
    <div class="login-box">
      <h2>vue2-admin-tempalte</h2>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="nickname" label="登录名">
          <el-input v-model="form.nickname" placeholder="请输入登录名"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" show-password placeholder="请输入密码"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit" :loading="loading">登 录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setSessionByKey } from '@/utils/sessionCRUD'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        nickname: '付峻玲',
        password: '298438'
      },
      rules: {
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,12}$/, message: '密码格式不正确', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created() {
    window.app = this
  },
  methods: {
    async submit () {
      await this.$refs.form.validate()
      this.loading = true
      login(this.form).then(res => {
        const { token } = res
        setSessionByKey('token', token)
        this.$router.push('/home')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
}

.login-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  font-size: 1rem;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.el-button {
  width: 100%;
}
</style>
