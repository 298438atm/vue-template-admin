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
        <el-button type="primary" icon="el-icon-share" @click="search">刷新表格</el-button>
        <el-button type="primary" icon="el-icon-delete">刷选列表</el-button>
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
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
.table_btn_box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
