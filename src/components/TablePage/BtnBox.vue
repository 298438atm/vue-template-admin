<template>
  <div class="table_btn_box">
    <div class="box_btn">
      <slot name="leftBtn"> </slot>
    </div>
    <div>
      <slot name="rightBtn">
        <el-button-group size="mini">
          <el-button
            v-if="showRetractBtn"
            type="primary"
            :icon="isRetract ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="searchShowToggle"
            >{{ isRetract ? '收起' : '展开' }}</el-button
          >
          <el-button
            v-if="showRefreshBtn"
            type="primary"
            icon="el-icon-refresh"
            @click="search"
            >刷新表格</el-button
          >
          <el-popover placement="top" width="180" v-if="showScreenBtn">
            <p>请勾选想要展示的列：</p>
            <div>
              <el-checkbox-group v-model="localShowColumList" class="checkbox_group">
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
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BtnBox',
  props: {
    searchShowToggle: {
      type: Function,
      default: () => {},
    },
    search: {
      type: Function,
      default: () => {},
    },
    isRetract: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    showRetractBtn: {
      type: Boolean,
      default: true,
    },
    showRefreshBtn: {
      type: Boolean,
      default: true,
    },
    showScreenBtn: {
      type: Boolean,
      default: true,
    },
    showColumList: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: 'showColumList',
    event: 'changeShowColumList',
  },
  computed: {
    localShowColumList: {
      get() {
        return this.showColumList.map(item => item.prop)
      },
      set(list) {
        this.$emit(
          'changeShowColumList',
          this.columns.filter((item) => list.includes(item.prop))
        )
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
  watch: {
    columns: {
      deep: true,
      immediate: true,
      handler(newV) {
        this.localShowColumList = newV.map((item) => item.prop)
      },
    },
  },
}
</script>

<style lang="less" scoped>
.table_btn_box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.checkbox_group {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  max-width: 160px;
}
</style>
