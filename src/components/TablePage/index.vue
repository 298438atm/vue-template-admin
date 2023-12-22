<template>
  <div>
    <CollapseTransition @transition-end="transitionEnd">
      <TableSearch
        v-show="isRetract && searchProp"
        :search="search"
        :columns="columns"
        :searchForm="searchForm"
        :changeSearchForm="changeSearchForm"
        v-bind="typeof searchProp === 'boolean' ? {} : searchProp"
      >
        <template #formItem>
          <slot name="formItem"></slot>
        </template>
      </TableSearch>
    </CollapseTransition>
    <BtnBox
      v-if="btnBoxProp"
      v-bind="typeof btnBoxProp === 'boolean' ? {} : searchProp"
      :searchShowToggle="
        () => ((isRetract = !isRetract), $bus.$emit('setHight'))
      "
      :isRetract="isRetract"
      :search="search"
      :columns="columns"
      v-model="showColumList"
    >
      <template #leftBtn>
        <slot name="leftBtn"></slot>
      </template>
      <template #rightBtn>
        <slot name="rightBtn"></slot>
      </template>
    </BtnBox>
    <MyTable
      v-bind="$attrs"
      v-on="$listeners"
      :search="search"
      :showColumList="showColumList"
    >
      <template v-for="item in columns" #[item.prop]="{ row, index, text }">
        <slot :name="item.prop" :row="row" :index="index" :text="text"></slot>
      </template>
      <template #endColumn>
        <slot name="endColumn"></slot>
      </template>
    </MyTable>
  </div>
</template>

<script>
import TableSearch from './TableSearch.vue'
import MyTable from './MyTable.vue'
import BtnBox from './BtnBox.vue'
export default {
  name: 'TablePage',
  components: { TableSearch, MyTable, BtnBox },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    search: {
      type: Function,
      default: () => ({}),
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    showBtns: {
      type: Boolean,
      default: true,
    },
    searchProp: {
      type: [Object, Boolean],
      default: () => ({}),
    },
    btnBoxProp: {
      type: [Object, Boolean],
      default: () => ({}),
    },
    searchForm: {
      type: Object,
      default: () => ({}),
    },
  },
  model: {
    prop: 'searchForm',
    event: 'changeSearchForm',
  },
  data() {
    return {
      isRetract: true,
      showColumList: [],
    }
  },
  methods: {
    changeSearchForm(val) {
      this.$emit('changeSearchForm', val)
    },
    transitionEnd() {
      this.$bus.$emit('setHight')
    },
  },
}
</script>

<style lang="less" scoped></style>
