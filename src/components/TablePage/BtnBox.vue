<template>
  <div class="table_btn_box">
    <div class="box_btn">
      <slot name="btnBox">
        <el-button type="primary">新增</el-button>
      </slot>
    </div>
    <div>
      <el-button-group size="mini">
        <el-button
          type="primary"
          :icon="isRetract ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          @click="searchShowToggle"
          >{{ isRetract ? '收起' : '展开' }}</el-button
        >
        <el-button type="primary" icon="el-icon-refresh" @click="search"
          >刷新表格</el-button
        >
        <el-popover placement="top" width="160">
          <p>请勾选想要展示的列：</p>
          <div>
            <el-checkbox-group v-model="showColumList">
              <el-checkbox
                v-for="item in columns"
                :key="item.prop"
                :label="item.prop"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <el-button slot="reference" type="primary" icon="el-icon-delete"
            >刷选列表</el-button
          >
        </el-popover>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BtnBox',
  props: {
    searchShowToggle: Function,
    search: Function,
    isRetract: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showColumList: this.columns.map(item => item.prop),
    }
  },
  methods: {},
  watch: {
    showColumList: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$emit('changeShowColumList', val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table_btn_box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
