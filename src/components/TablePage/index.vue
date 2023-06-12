<template>
  <div>
    <TableSearch v-show="isRetract">
      <template #formItem>
        <slot name="formItem"></slot>
      </template>
    </TableSearch>
    <BtnBox :searchShowToggle="searchShowToggle" :isRetract="isRetract" :search="$attrs.search">
      <template #btnBox>
        <slot name="btnBox"></slot>
      </template>
    </BtnBox>
    <MyTable v-bind="$attrs" v-on="$listeners"></MyTable>
  </div>
</template>

<script>
import TableSearch from './TableSearch.vue'
import MyTable from './MyTable.vue'
import BtnBox from './BtnBox.vue'
export default {
  name: 'TablePage',
  components: { TableSearch, MyTable, BtnBox },
  data() {
    return {
      isRetract: false
    }
  },
  
  methods: {
    search(type) {
      if (type === 'search') {
      } else if (type === 'reset') {
      }
    },
    searchShowToggle() {
      this.isRetract = !this.isRetract
    }
  },
}
</script>

<style lang="less" scoped></style>
