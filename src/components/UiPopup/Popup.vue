<template>
  <transition name="_ui-popup-transition">
    <div v-show="currentValue" class="_ui-popup" :class="{[from]: from, page: page}">
      <div class="page-popup-mask" :class="{'mask': mask}" v-if="modal" @click.self.stop="!modalLock && close()"></div>
      <div class="slot-wrap">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UiPopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    from: {
      type: String,
      default: 'left',
      validator (value) {
        return ['left', 'right', 'top', 'bottom'].indexOf(value) !== -1
      }
    },
    // 是否有遮罩
    modal: [Boolean],
    // 点击遮罩是否自动关闭
    modalLock: [Boolean],
    // 遮罩层视图是否可见
    mask: [Boolean],
    // 弹出层是否覆盖整个页面
    page: [Boolean]
  },
  data () {
    return {
      showPop: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value || this.showPop
      },
      set (val) {
        this.$emit('input', val)
        this.showPop = val
      }
    }
  },
  methods: {
    close () {
      this.currentValue = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-popup;
</style>
