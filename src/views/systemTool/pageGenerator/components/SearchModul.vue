<template>
  <el-card>
    <template #header>
      <CardHeader title="搜索栏" @cache="cache"></CardHeader>
    </template>
    <el-form :model="searchFormData" inline label-width="160px">
      <el-form-item label="是否需要搜索栏："
        ><el-checkbox v-model="searchFormData.showSearch"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要查询按钮：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.showSearchBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要重置按钮：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.showResetBtn"></el-checkbox
      ></el-form-item>
      <el-form-item v-if="searchFormData.showSearch">
        <template #label>
          <el-tooltip
            effect="dark"
            content="显示的图标为新建菜单的时候选中的图标"
            placement="top"
          >
            <span>
              <i class="el-icon-warning"></i>
              是否需要显示图标：
            </span>
          </el-tooltip>
        </template>
        <el-checkbox v-model="searchFormData.showIcon"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要回车搜索：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.returnSearch"></el-checkbox
      ></el-form-item>
      <el-form-item label="是否需要收起按钮：" v-if="searchFormData.showSearch"
        ><el-checkbox v-model="searchFormData.showRetractBtn"></el-checkbox
      ></el-form-item>
      <el-form-item label="收起时显示列数：" v-if="searchFormData.showSearch"
        ><el-input-number
          :min="0"
          v-model="searchFormData.defaultShowRow"
          style="width: 100%"
        ></el-input-number
      ></el-form-item>
      <el-form-item
        label="是否需要自定义标题："
        v-if="searchFormData.showSearch"
        ><MyInput
          placeholder="默认取页面标题"
          v-model="searchFormData.title"
        ></MyInput
      ></el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import CardHeader from './CardHeader.vue'
import TableSearch from '@/components/TablePage/TableSearch'
import cache from '../mixins'

export default {
  components: { TableSearch, CardHeader },
  name: 'SearchModul',
  mixins: [cache],
  data() {
    return {
      key: 'searchFormData',
      searchFormData: {
        showSearch: true,
        showSearchBtn: true,
        showResetBtn: true,
        showRetractBtn: true,
        returnSearch: true,
        showIcon: true,
        defaultShowRow: 1,
        title: '',
      },
      visible: false,
      isCache: false,
    }
  },
  methods: {
    getFormData() {
      return this.searchFormData
    },
  },
  watch: {},
}
</script>
