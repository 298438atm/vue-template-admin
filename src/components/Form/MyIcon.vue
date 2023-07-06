<template>
  <el-dropdown ref="dropdown" trigger="click" style="width: 100%" hide-on-click>
    <el-input style="width: 100%" v-model="localIcon" readonly :placeholder="placeholder">
       <template slot="prepend" v-if="localIcon">
        <i :class="localIcon"></i>
       </template>
    </el-input>
    <el-dropdown-menu slot="dropdown">
      <ul>
        <li v-for="item in icons" :key="item" @click="iconSelected(item)" :class="{active: item === localIcon}">
          <i :class="item"></i>
        </li>
      </ul>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'MyIcon',
  props: {
    placeholder: {
      type: String,
      default: '请选择图标'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue'
  },
  computed: {
    localIcon: {
      get() {
        return this.modelValue
      },
      set(newV) {
        this.$emit('updateModelValue', newV)
      }
    }
  },
  data() {
    return {
      icons: [
        'el-icon-edit',
        'el-icon-delete',
        'el-icon-search',
        'el-icon-setting',
        'el-icon-share',
        'el-icon-star-on',
        'el-icon-star-off',
        'el-icon-upload',
        'el-icon-download',
        'el-icon-loading',
        'el-icon-message',
        'el-icon-time',
        'el-icon-phone',
        'el-icon-user',
        'el-icon-lock',
        'el-icon-unlock',
        'el-icon-success',
        'el-icon-error',
        'el-icon-warning',
        'el-icon-check',
        'el-icon-menu',
        'el-icon-more',
        'el-icon-plus',
        'el-icon-minus',
        'el-icon-close',
        'el-icon-back',
        'el-icon-refresh',
        'el-icon-arrow-up',
        'el-icon-arrow-down',
        'el-icon-arrow-left',
        'el-icon-arrow-right',
        'el-icon-caret-top',
        'el-icon-caret-bottom',
        'el-icon-caret-left',
        'el-icon-caret-right',
        'el-icon-d-arrow-left',
        'el-icon-d-arrow-right',
        'el-icon-document',
        'el-icon-picture',
      ]
    }
  },
  methods: {
    iconSelected(icon) {
      this.localIcon = icon
      this.$refs.dropdown.visible = false
    },
  }
}
</script>

<style lang="less" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  width: 500px;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  .active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
}
</style>
