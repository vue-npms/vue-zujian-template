<template>
  <div class="ui-input">
    <input v-model="currentValue" :type="type" :placeholder="placeholder" :readonly="readonly" autocomplete="off" ref="input">
    <i class="input-clear iconfont icon-roundclosefill" @click="currentValue = ''" v-show="showClear && currentValue"></i>
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    value: [String],
    type: [String],
    placeholder: [String],
    readonly: [Boolean],
    showClear: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-input;
</style>
