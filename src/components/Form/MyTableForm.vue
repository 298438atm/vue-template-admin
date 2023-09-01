<template>
  <el-form ref="formRules" :model="localFormTableData" :rules="rules">
    <el-table border :data="localFormTableData.tableData">
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        v-bind="item"
        align="center"
      >
        <template #header>
          <span v-if="showRequired(item.rules)" class="required">*</span
          >{{ item.label }}
        </template>
        <template #default="{ row, $index }">
          <span v-if="!row.edit">
            {{ labelShow(item.type, row[item.prop], item.params?.options) }}
          </span>
          <div v-else>
            <el-form-item
              :prop="'tableData.' + $index + '.' + item.prop"
              :rules="item.rules"
            >
              <MyInput
                v-if="item.type === 'input'"
                v-model="row[item.prop]"
              ></MyInput>
              <el-checkbox
                v-if="item.type === 'checkbox'"
                v-model="row[item.prop]"
              ></el-checkbox>
              <MySelect
                v-if="item.type === 'select'"
                v-model="row[item.prop]"
                v-bind="item.params"
              ></MySelect>
              <MyIcon
                v-if="item.type === 'icon'"
                v-model="row[item.prop]"
                v-bind="item.params"
              ></MyIcon>
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row, $index }">
          <div :style="row.edit ? { marginBottom: '18px' } : null">
            <MyTableBtn btnType="del" @click="delRow($index)"></MyTableBtn>
            <MyTableBtn
              btnType="edit"
              v-if="!row.edit"
              @click="editRow(row)"
            ></MyTableBtn>
            <MyTableBtn
              btnType="save"
              v-else
              @click="saveRow(row, $index)"
            ></MyTableBtn>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div
      style="text-align: center"
      v-if="localFormTableData.tableData.every((item) => !item.edit)"
    >
      <el-button type="text" @click="addRow">新增</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'MyTableForm',
  props: {
    orderNumber: {
      type: Boolean,
      default: true,
    },
    multipleSelect: {},
    columns: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    formTableData: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: 'formTableData',
    event: 'changeFormTableData',
  },
  data() {
    return {}
  },
  computed: {
    localFormTableData: {
      get() {
        return {
          tableData: this.formTableData,
        }
      },
      set(newV) {
        this.$emit('changeFormTableData', newV)
      },
    },
  },
  methods: {
    showRequired(rule) {
      if (Array.isArray(rule)) {
        return rule.some((item) => item.required)
      } else if (this.$commonFun.verifyType(rule, 'Object')) {
        return rule.required
      } else {
        return false
      }
    },
    delRow(index) {
      this.localFormTableData.tableData.splice(index, 1)
      this.$emit('delRow', index)
    },
    saveRow(row, index) {
      const rulesProps = this.columns
        .filter((item) => item.rules)
        .map((item) => item.prop)
        .map((item) => `tableData.${index}.${item}`)
      this.$refs.formRules.validateField(rulesProps, (errMsg) => {
        if (!errMsg) {
          this.$set(row, 'edit', false)
        }
      })
    },
    editRow(row) {
      this.$set(row, 'edit', true)
    },
    addRow() {
      this.localFormTableData.tableData.push({ edit: true })
    },
    labelShow(type, value, options) {
      if (type === 'input' || type === 'icon') {
        return value
      } else if (type === 'checkbox') {
        return value ? '是' : '否'
      } else if (type === 'select') {
        if (this.$commonFun.verifyType(value, 'String')) {
          return options.find((item) => item.value === value)?.label
        } else if (this.$commonFun.verifyType(value, 'Array')) {
          return options
            .filter((item) => value.includes(item.value))
            .map((item) => item.label)
            .join(', ')
        }
      }
    },
    validate() {
      return new Promise((resolve) => {
        this.$refs.formRules.validate((flag) => {
          resolve(flag)
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-form-item {
  // margin-bottom: 0 !important;
}
.required {
  padding-right: 2px;
  vertical-align: middle;
  color: red;
}
</style>
