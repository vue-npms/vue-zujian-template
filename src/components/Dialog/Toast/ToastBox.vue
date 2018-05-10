<template>
  <div class="_ui-dialog">
    <div class="toast-box">
      <i class="icon iconfont" :class="icon" v-if="icon"></i>
      <div class="text" v-html="message" v-if="message"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    message: String,
    callback: Function
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-dialog-toast-box;
</style>
