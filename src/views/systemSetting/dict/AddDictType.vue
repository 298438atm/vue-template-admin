<template>
  <el-dialog
    :title="title"
    :visible.sync="localVisible"
    width="30%"
    :before-close="cancal"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="字典类型名称" prop="dictTypeName">
        <el-input
          v-model.trim="form.dictTypeName"
          maxlength="20"
          show-word-limit
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="字典类型编码" prop="dictTypeCode">
        <el-input
          v-model.trim="form.dictTypeCode"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="字典数据类型" prop="dictDataType">
        <MySelect :options="dictDataTypeList" v-model="form.dictDataType" :disabled="type === 'edit'"></MySelect>
      </el-form-item>
      <el-form-item label="字典类型状态" prop="dictTypeStatus">
        <StatusSwitch v-model="form.dictTypeStatus"></StatusSwitch>
      </el-form-item>
      <el-form-item label="字典类型备注" prop="dictTypeRemark">
        <el-input
          type="textarea"
          v-model="form.dictTypeRemark"
          maxlength="300"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit" :loading="submitLoading"
        >提交</el-button
      >
      <el-button @click="cancal">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { debounce } from 'lodash'
import API from '@/api/dict'
export default {
  name: 'AddDictType',
  props: {
    type: String,
    visible: {
      type: Boolean,
      default: false,
    },
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
      if (this.type === 'add') {
        return '新增字典类型'
      } else {
        return '编辑字典类型'
      }
    },
  },
  data() {
    const checkDictTypeRepeat = (type, rule, value, callback) => {
      if (!this.visible) {
        callback()
        return
      }
      API.check({ type, value, id: this.formData.id }).then((res) => {
        if (res) {
          callback()
        } else {
          this.submitLoading = false
          callback(
            new Error(
              '字典类型' + (type === 'dictTypeName' ? '名称' : '编码') + '重复'
            )
          )
        }
      })
    }
    return {
      form: {
        dictTypeCode: undefined,
        dictTypeName: undefined,
        dictTypeStatus: '1',
        dictDataType: 'string'
      },
      dictDataTypeList: [
        {
          label: '字符串',
          value: 'string'
        },
        {
          label: '数值',
          value: 'number'
        },
        {
          label: '布尔值',
          value: 'boolean'
        }
      ],
      submitLoading: false,
      rules: {
        dictTypeName: [
          { required: true, message: '请输入字典类型名称', trigger: 'blur' },
          {
            validator: debounce(
              checkDictTypeRepeat.bind(this, 'dictTypeName'),
              500,
              { leading: true }
            ),
            trigger: 'change',
          },
        ],
        dictTypeCode: [
          { required: true, message: '请输入字典类型编码', trigger: 'blur' },
          {
            validator: debounce(
              checkDictTypeRepeat.bind(this, 'dictTypeCode'),
              500,
              { leading: true }
            ),
            trigger: 'change',
          },
        ],
        dictDataType: [
          { required: true, message: '请选择字典数据类型', trigger: 'change' },
        ]
      },
    }
  },
  methods: {
    cancal(done) {
      if (typeof done === 'function') {
        done()
      }
      this.localVisible = false
      this.$refs.ruleForm.resetFields()
    },
    submit() {
      this.submitLoading = true
      this.$refs.ruleForm.validate((flag) => {
        if (flag) {
          API.addEditDictType(this.form)
            .then((res) => {
              this.submitLoading = false
              this.cancal()
              this.search()
            })
            .catch(() => {
              this.submitLoading = false
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

<style lang="less" scoped></style>
