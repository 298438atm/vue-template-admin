<template>
  <div>
    <TableSearch
      v-show="isRetract && searchProp"
      :search="search"
      :columns="columns"
      v-bind="typeof searchProp === 'boolean' ? {} : searchProp"
    >
      <template #formItem>
        <slot name="formItem"></slot>
      </template>
    </TableSearch>
    <BtnBox
      v-if="btnBoxProp"
      v-bind="typeof btnBoxProp === 'boolean' ? {} : searchProp"
      :searchShowToggle="() => (isRetract = !isRetract)"
      :isRetract="isRetract"
      :search="search"
      :columns="columns"
      @changeShowColumList="changeShowColumList"
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
      <template v-for="item in columns" #[item.prop]="{ data }">
        <slot :name="item.prop" :data="data"></slot>
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
    }
  },
  data() {
    return {
      isRetract: true,
      showColumList: [],
    }
  },
  methods: {
    changeShowColumList(selectedProp) {
      this.showColumList = this.columns.filter((item) =>
        selectedProp.includes(item.prop)
      )
    },
  },
}
</script>

<style lang="less" scoped></style>
