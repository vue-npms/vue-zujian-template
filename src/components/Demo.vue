<template>
  <div style="padding-top: 20px">
    <h3>【default】 behavior scroll, direction: left, speed 6</h3>
    <ui-marquee-notice style="background: #ccc">我爱我的国，我爱我的家</ui-marquee-notice>
    <h3>behavior slide, direction: left, speed 9</h3>
    <ui-marquee-notice behavior="slide" speed="9" style="background: #ccc">我爱我的国，我爱我的家</ui-marquee-notice>
    <h3>behavior alternate, direction: left, speed 20</h3>
    <ui-marquee-notice behavior="alternate" speed="20" style="background: #ccc">我爱我的国，我爱我的家</ui-marquee-notice>
    <hr>
    <h3>behavior scroll, direction: right, speed 6</h3>
    <ui-marquee-notice direction="right" style="background: #ccc">我爱我的国，我爱我的家</ui-marquee-notice>
    <h3>behavior scroll, direction: up, speed 6</h3>
    <ui-marquee-notice direction="up" style="background: #ccc">我爱我的国，我爱我的家</ui-marquee-notice>
    <h3>behavior scroll, direction: down , speed 6</h3>
    <ui-marquee-notice direction="down" style="background: #ccc">我爱我的国，我爱我的家</ui-marquee-notice>
  </div>
</template>

<script>
// or global lazy load
import MarqueeNotice from '@/components/MarqueeNotice/MarqueeNotice.vue'
export default {
  methods: {
    hi (num) {
      console.log('hi', num)
    }
  },
  components: {
    'UiMarqueeNotice': MarqueeNotice
  }
}
</script>
