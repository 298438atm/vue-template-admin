<template>
  <div>
    <MyInput v-model="filterText" v-show="showFilter"></MyInput>
    <el-tree
      ref="tree"
      v-bind="$attrs"
      v-on="$listeners"
      :style="{ maxHeight }"
      :data="treeList"
      :props="defaultProps"
      :node-key="$attrs.nodeKey || 'id'"
      :show-checkbox="$attrs.showCheckbox || true"
      :default-expand-all="$attrs.defaultExpandAll || true"
      :filter-node-method="filterNode"
      @check="check"
    >
    </el-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyTree',
  props: {
    type: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: String,
      default: '300px',
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue',
  },
  computed: {
    ...mapState('user', ['routes']),
    defaultProps() {
      if (this.type === 'role') {
        return {
          label: 'name',
          children: 'children'
        }
      } else {
        return this.$attrs.props
      }
    }
  },
  data() {
    return {
      treeList: [],
      filterText: '',
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    check(data, {checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys}) {
      this.$emit('updateModelValue', checkedKeys)
      this.$emit('check', data, {checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys})
    },
  },
  watch: {
    type: {
      deep: true,
      immediate: true,
      handler(newV) {
        if (newV === 'role') {
          this.treeList = this.routes
        }
      },
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    modelValue: {
      immediate: true,
      deep: true,
      handler(newV) {
        if (newV.length > 0) {
          // this.$refs.tree.setCheckedNodes(newV)
        }
      }
    }
  },
}
</script>

<style lang="less" scoped></style>
