<template>
  <span class="_ui-button" :class="calcButtonClass" @click="handleClick">
    <i class="iconfont" :class="{[icon]: icon, [loadingIcon]: loading, loading}"></i>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    type: {
      type: String,
      validator (value) {
        return ['default', 'danger', 'primary', 'warning', 'hollow', 'plain'].indexOf(value) > -1
      },
      default: 'default'
    },
    size: {
      type: String,
      validator (value) {
        return ['large', 'small', 'mini', 'normal'].indexOf(value) > -1
      },
      default: 'normal'
    },
    disabled: [Boolean],
    icon: [String],
    loading: [Boolean],
    loadingIcon: {
      type: String,
      default: 'icon-loading'
    }
  },
  computed: {
    calcButtonClass () {
      return {
        [this.type]: true,
        'is-disabled': this.disabled,
        [this.size]: true
      }
    }
  },
  methods: {
    handleClick (evt) {
      !this.disabled && this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-button;
</style>
