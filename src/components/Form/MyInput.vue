<template>
  <el-input
    v-model="localValue"
    :maxlength="20"
    :show-word-limit="showWordLimit"
    :clearable="clearable"
    v-bind="$attrs"
    v-on="$listeners"
    style="width: 100%"
    :placeholder="placeholder"
  >
    <template v-for="(value, name) in $slots" #[name]>
      <slot :name="name"> </slot>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 20,
    },
    showWordLimit: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    slotName: {
      type: String,
      default: 'prepend',
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue',
  },
  created() {
    console.log(this.$slots)
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
  },
  data() {
    return {
      value: this.modelValue,
    }
  },
  watch: {
    value(newV) {
      this.$emit('updateModelValue', newV)
    },
  },
}
</script>

<style lang="less" scoped></style>
