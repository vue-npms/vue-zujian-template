<template>
  <div class="_ui-dialog">
    <div class="action-sheet" ref="actionSheet">
      <div class="mask" @click.self.stop="close()"></div>
      <div class="action-sheet-items">
        <div v-for="(item,index) in items" :key="index" v-show="!(item && item.hidden)" class="action-sheet-item" :class="{'color-primary': item.color === true, 'color-disabled': item.disabled}" :style="{color: item.color}" @click.stop="!item.disabled && closeActionSheet(item)" v-html="item.text"></div>
        <div v-if="!(cancel && cancel.hidden)" class="action-sheet-item cancel" @click.stop="close(cancel)" v-html="cancel && cancel.text || '取消'"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    cancel: Object,
    callback: Function
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-dialog-action-sheet;
</style>
