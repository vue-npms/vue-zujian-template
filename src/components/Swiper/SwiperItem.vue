<template>
  <div class="_ui-swiper-item" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-swiper-item;
</style>
