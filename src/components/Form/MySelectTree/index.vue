<template>
  <el-select
    v-model="localValue"
    style="width: 100%"
    ref="selectRef"
    @clear="delSelected"
    v-bind="selectProp"
  >
    <el-option value=""></el-option>
    <el-option
      v-for="item in selectedList"
      :key="item.id"
      :value="item.id"
      :label="item.name"
    />
    <el-tree
      ref="treeOption"
      :data="localTreeList"
      @node-click="nodeClick"
      v-bind="treeProp"
      v-on="$listeners"
    />
  </el-select>
</template>

<script>
export default {
  name: 'MySelectTree',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    selectProp: {
      type: Object,
      default: () => ({}),
    },
    treeProp: {
      type: Object,
      default: () => ({}),
    },
    treeList: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue',
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue
      },
      set(newV) {
        this.$emit('updateModelValue', newV)
      },
    },
    localTreeList() {
      if (this.treeList.length > 0) {
        return this.treeList
      } else {
        return [
          {
            name: '根目录',
            id: 'rootMenu',
            type: 'menu',
            children: this.$store.state.user.routes,
          },
        ]
      }
    },
  },
  data() {
    return {
      options: [],
      selectedList: [],
    }
  },
  methods: {
    nodeClick(data) {
      if (this.treeList.length === 0) {
        this.selectedList = [data]
        this.localValue = data.id
      } else {
        this.$emit('node-click', ...arguments)
      }
      this.$refs.selectRef.visible = false
    },
    delSelected() {
      this.$refs.treeOption.setCurrentKey(null)
    },
    findMenuById(menus, id) {
      let result = null
      menus.forEach((item) => {
        if (item.id === id) {
          result = item
        } else if (item.children && item.children.length > 0) {
          const found = this.findMenuById(item.children, id)
          if (found) {
            result = found
          }
        }
      })
      return result
    },
  },
  watch: {
    localValue: {
      immediate: true,
      handler(newV) {
        if (newV) {
          const currentMenu = this.findMenuById(this.localTreeList, newV)
          console.log(currentMenu, 'currentMenu');
          this.selectedList = [currentMenu]
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.el-select-dropdown__item {
  display: none;
}
</style>
