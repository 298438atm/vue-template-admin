<template>
  <el-dialog
    :visible="localVisible"
    :title="title"
    width="1000px"
    :before-close="cancal"
  >
    <el-form ref="formRules" :model="formData">
      <el-table
        :data="formData.tableData"
        style="width: 100%"
        border
        v-loading="tableLoading"
      >
        <el-table-column
          prop="dictDataName"
          label="字典数据名称"
          width="200"
          align="center"
        >
          <template #header>
            <span class="red_color">*</span><span>字典数据名称</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'tableData.' + $index + '.dictDataName'"
              :rules="formRules.dictDataName"
              v-if="row.isEdit"
            >
              <el-input
                v-model.trim="row.dictDataName"
                maxlength="15"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <span v-else>{{ row['dictDataName'] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dictDataCode"
          label="字典数据编码"
          width="200"
          align="center"
        >
          <template #header>
            <span class="red_color">*</span><span>字典数据编码</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'tableData.' + $index + '.dictDataCode'"
              :rules="formRules.dictDataCode"
              v-if="row.isEdit"
            >
              <el-input
                v-if="dictDataType === 'string'"
                v-model.trim="row.dictDataCode"
                maxlength="15"
                show-word-limit
                clearable
              ></el-input>
              <el-input-number
                style="width: 100%"
                v-else-if="dictDataType === 'number'"
                v-model="row.dictDataCode"
              ></el-input-number>
              <MySelect
                v-else-if="dictDataType === 'boolean'"
                v-model="row.dictDataCode"
                :options="booleanOptions"
                optionKey="value"
              ></MySelect>
            </el-form-item>
            <span v-else>{{ row['dictDataCode'] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dictDataRemark"
          label="字典数据备注"
          align="center"
        >
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'tableData.' + $index + '.dictDataRemark'"
              v-if="row.isEdit"
            >
              <el-input
                v-model.trim="row.dictDataRemark"
                maxlength="300"
                show-word-limit
                type="textarea"
                clearable
              ></el-input>
            </el-form-item>
            <span v-else>{{ row['dictDataRemark'] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dictDataStatus"
          label="字典数据状态"
          align="center"
          width="150"
        >
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'tableData.' + $index + '.dictDataStatus'"
              :rules="formRules.dictDataStatus"
              v-if="row.isEdit"
            >
              <StatusSwitch v-model="row.dictDataStatus"></StatusSwitch>
            </el-form-item>
            <span v-else>
              <StatusTag :type="row['dictDataStatus']"></StatusTag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template #default="{ $index, row }">
            <el-button
              v-if="row.isEdit"
              type="text"
              icon="el-icon-edit"
              @click="saveRow(row, $index)"
              >保存</el-button
            >
            <el-button
              v-else
              type="text"
              icon="el-icon-edit"
              @click="$set(row, 'isEdit', true)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="btn_text_red"
              @click="delRow($index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
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
      const flag = this.formData.tableData.some(
        (item, index) => dataIndex !== index && item[type] === value
      )
      if (flag) {
        callback(new Error('字典数据名称不能重复！'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        tableData: [],
      },
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
        dictDataCode: [
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
    }
  },
  methods: {
    cancal(done) {
      if (typeof done === 'function') {
        done()
      }
      this.$refs.formRules.clearValidate()
      this.localVisible = false
    },
    dictDataTypeChange(row) {
      this.$set(row, 'dictDataCode', undefined)
    },
    addRow() {
      if (this.formData.tableData.some((item) => item.isEdit)) {
        this.$message.warning('请先保存正在编辑的数据！')
        return
      }
      this.formData.tableData.push({
        dictDataName: '',
        dictDataCode: '',
        dictDataRemark: '',
        dictDataStatus: '1',
        isEdit: true,
        dictDataType: 'string',
      })
    },
    delRow(index) {
      this.formData.tableData.splice(index, 1)
    },
    saveRow(row, index) {
      let passNum = 0
      this.$refs.formRules.validateField(
        [`tableData.${index}.dictDataName`, `tableData.${index}.dictDataCode`],
        (errMsg) => {
          if (errMsg === '') {
            passNum++
          }
          if (passNum === 2) {
            row.isEdit = false
          }
        }
      )
    },
    submit() {
      const dictDataList = this.formData.tableData
      if (dictDataList.length === 0) {
        this.$message.warning('字典数据不能为空！')
        return
      }
      if (dictDataList.some((item) => item.isEdit)) {
        this.$message.warning('请先保存字段数据！')
        return
      }
      this.$refs.formRules.validate((flag) => {
        if (flag) {
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
        }
      })
    },
  },
  watch: {
    visible(newV) {
      if (newV) {
        this.tableLoading = true
        API.getDictDataList(this.dictTypeId).then((res) => {
          this.formData.tableData = res
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
.red_color {
  padding-right: 2px;
  vertical-align: middle;
  color: rgb(255, 73, 73);
}
// 为了输入框在表格中垂直居中
/deep/ .el-table__cell {
  padding: 16px 0 0 0;
}
// 非输入框时文本显示垂直居中
.el-form-item {
  margin-bottom: 0px;
}
</style>
