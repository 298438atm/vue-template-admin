<template>
  <el-dialog
    :visible.sync="localVisible"
    :title="title"
    width="1200px"
    :before-close="cancal"
  >
    <ClTableForm
      v-model="tableData"
      v-loading="tableLoading"
      ref="ClTableForm"
      :columnList="columnList"
    ></ClTableForm>
    <div class="add_btn_box" v-show="!tableLoading">
      <el-button type="text" icon="el-icon-plus" @click="addRow"
        >新增</el-button
      >
    </div>
    <template #footer>
      <el-button type="primary" @click="submit" :loading="submitLoad"
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
  name: 'AddDictData',
  dicts: ['fieldType'],
  props: {
    type: String,
    visible: {
      type: Boolean,
      default: true,
    },
    search: Function,
    dictTypeId: String,
    dictTypeName: String,
    dictDataType: String,
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
      return `${this.dictTypeName}的字典数据`
    },
  },
  data() {
    const checkDictDataRepeat = (type, rule, value, callback) => {
      const dataIndex = Number(rule.field.split('.')[1])
      const flag = this.tableData.some(
        (item, index) => dataIndex !== index && item[type] === value
      )
      if (flag) {
        callback(new Error('字典数据名称不能重复！'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      formRules: {
        dictDataName: [
          { required: true, message: '请输入字典数据名称', trigger: 'blur' },
          {
            validator: debounce(
              checkDictDataRepeat.bind(this, 'dictDataName'),
              500,
              { leading: true }
            ),
            trigger: ['blur', 'change'],
          },
        ],
        dictDataType: [
          { required: true, message: '请选择字典数据类型', trigger: 'change' },
        ],
        dictDataCode: [
          { required: true, message: '请输入字典数据编码', trigger: 'blur' },
          {
            validator: debounce(
              checkDictDataRepeat.bind(this, 'dictDataCode'),
              500,
              { leading: true }
            ),
            trigger: ['blur', 'change'],
          },
        ],
      },
      submitLoad: false,
      tableLoading: false,
      booleanOptions: [
        {
          label: 'true',
          value: 'true',
        },
        {
          label: 'false',
          value: 'false',
        },
      ],
      columnList: [
        {
          prop: 'dictDataName',
          label: '字典数据名称',
          minWidth: 160,
          formEle: {
            showRequiredIcon: true,
            rules: [
              {
                required: true,
                message: '请输入字典数据名称',
                trigger: 'blur',
              },
              {
                validator: debounce(
                  checkDictDataRepeat.bind(this, 'dictDataName'),
                  500,
                  { leading: true }
                ),
                trigger: ['blur', 'change'],
              },
            ],
          },
        },
        {
          prop: 'dictDataCode',
          label: '字典数据编码',
          minWidth: 160,
          formEle: {
            showRequiredIcon: true,
            rules: [
              {
                required: true,
                message: '请输入字典数据编码',
                trigger: 'blur',
              },
              {
                validator: debounce(
                  checkDictDataRepeat.bind(this, 'dictDataCode'),
                  500,
                  { leading: true }
                ),
                trigger: ['blur', 'change'],
              },
            ],
          },
        },
        {
          prop: 'dictDataStatus',
          label: '字典数据状态',
          minWidth: 160,
          formEle: {
            formType: 'switch',
            showRequiredIcon: true,
            activeText: '启用',
            inactiveText: '停用',
            activeValue: '1',
            inactiveValue: '0',
            rules: {
              required: true,
              message: '请选择字典数据类型',
              trigger: 'change',
            },
          },
        },
        {
          prop: 'dictDataRemark',
          label: '字典数据备注',
          minWidth: 200,
          formEle: {
            formType: 'input',
            type: 'textarea',
            rows: 1,
          },
        },
      ],
    }
  },
  methods: {
    cancal(done) {
      if (typeof done === 'function') {
        done()
      }
      this.localVisible = false
    },
    dictDataTypeChange(row) {
      this.$set(row, 'dictDataCode', undefined)
    },
    addRow() {
      this.$refs.ClTableForm.addRow({
        dictDataName: '',
        dictDataCode: '',
        dictDataRemark: '',
        dictDataStatus: '1',
        dictDataType: 'string',
      })
      // this.tableData.push({
      //   dictDataName: '',
      //   dictDataCode: '',
      //   dictDataRemark: '',
      //   dictDataStatus: '1',
      //   dictDataType: 'string',
      //   isEdit: true,
      // })
    },
    async submit() {
      const dictDataList = this.tableData
      if (dictDataList.length === 0) {
        this.$message.warning('字典数据不能为空！')
        return
      }
      // if (dictDataList.some((item) => item.isEdit)) {
      //   this.$message.warning('请先保存字段数据！')
      //   return
      // }
      const { state } = await this.$refs.ClTableForm.validateForm()
      if (!state) {
        this.$message.warning('请填写完整数据！')
        return
      }
      this.submitLoad = true
      API.addEditDictData({ id: this.dictTypeId, dictDataList })
        .then(() => {
          this.search()
          this.submitLoad = false
          this.localVisible = false
        })
        .catch((err) => {
          this.submitLoad = false
        })
    },
  },
  watch: {
    visible(newV) {
      if (newV) {
        this.tableLoading = true
        API.getDictDataList(this.dictTypeId).then((res) => {
          this.tableData = res
          this.tableLoading = false
          if (res.length === 0) {
            this.addRow()
          }
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.add_btn_box {
  text-align: center;
}
</style>
