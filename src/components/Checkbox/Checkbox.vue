<template>
  <label class="_ui-checkbox" :class="{checked, disabled}">
    <input type="checkbox" v-model="checked" :value="val" @change="changeHandler" :disabled="disabled" />
    <span class="checkbox-icon"><i class="iconfont icon-check"></i></span>
    <span class="checkbox-text">
      <slot>{{val}}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'UiCheckbox',
  props: {
    val: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    changeHandler (event) {
      if (this.disabled) {
        return
      }
      this.checked = event.target.checked
      this.$parent.change(this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-checkbox;
</style>
