<template>
  <div class="_ui-swiper" :class="{horizontal: direction == 'horizontal', vertical: direction == 'vertical'}">
    <div class="default-swiper-box" :style="dragStyleObject" ref="boxRef" @touchstart="onTouchStart($event)" @mousedown.stop.prevent="onTouchStart($event)" @touchmove.prevent="onTouchMove($event)" @mousemove.stop.prevent="onTouchMove($event)" @touchend="onTouchEnd($event)" @mouseup.stop.prevent="onTouchEnd($event)" @mouseleave.stop.prevent="onTouchEnd($event)">
      <slot></slot>
    </div>
    <slot name="pagination">
      <div class="pagination-wrap" v-if="pagination && totalItemCount > 1">
        <span class="pagination-item" v-for="(v, idx) in totalItemCount" :class="{active: idx === nowItemIndex}" :key="idx"></span>
      </div>
    </slot>
  </div>
</template>

<script>
import touchMixin from './touchMixin'
export default {
  mixins: [touchMixin],
  props: {
    /* 一次滑动的默认时间 */
    duration: {
      default: 500
    },
    /* 两次滑动的间隔时间 */
    interval: {
      default: 2500
    },
    loop: {
      default: true
    },
    direction: {
      validator (val) {
        return ['horizontal', 'vertical'].indexOf(val) > -1
      },
      default: 'horizontal'
    },
    pagination: {
      default: true
    }
  },
  data () {
    return {
      nowItemIndex: 0,
      totalItemCount: 0,
      autoPlayTimer: null,
      dragStyleObject: {
        transform: 0,
        speed: 0
      },
      // start moving end
      status: 'end',
      isStarting: false
    }
  },
  computed: {
    children () {
      return this.$refs['boxRef'].children
    },
    items () {
      if (this.children.length >= 3) {
        return Array.prototype.slice.call(this.children, 1, -1)
      }
      return []
    },
    swiperSize () {
      return this.isVertical ? this.$el.offsetHeight : this.$el.clientWidth
    },
    isVertical () {
      return this.direction === 'vertical'
    }
  },
  methods: {
    _onTouchStart (start, event) {
      if (this.status === 'end' && this.isStarting === false) {
        this.stopAutoPlay()
        this.status = 'start'
        this.isStarting = true
      }
    },
    _onTouchMove (moving, event) {
      if (this.isStarting && (this.status === 'start' || this.status === 'moving')) {
        this.status = 'moving'
        const deltaSlide = this.isVertical ? (moving.y - this.touchInfo.start.y) : (moving.x - this.touchInfo.start.x)
        this.goToIndex(this.nowItemIndex, false, deltaSlide)
      }
    },
    _onTouchEnd (end, event) {
      if (!this.isStarting) return
      this.isStarting = false
      let moveOffset, beforeOffset
      if (this.isVertical) {
        moveOffset = this.touchInfo.offset.y
        beforeOffset = this.touchInfo.beforeOffset.y
      } else {
        moveOffset = this.touchInfo.offset.x
        beforeOffset = this.touchInfo.beforeOffset.x
      }
      if (moveOffset > 0 && beforeOffset < moveOffset && Math.abs(moveOffset) > this.swiperSize * 0.05) {
        this.goToPreIndex()
      } else if (moveOffset < 0 && beforeOffset > moveOffset && Math.abs(moveOffset) > this.swiperSize * 0.05) {
        this.goToNextIndex()
      } else {
        this.goToIndex(this.nowItemIndex)
      }
      setTimeout(() => {
        this.status = 'end'
        this.autoPlay()
      }, this.duration)
    },
    init () {
      if (this.children.length) {
        let first = this.children[0]
        let last = this.children[this.children.length - 1]
        this.$refs['boxRef'].appendChild(first.cloneNode(this.loop))
        this.$refs['boxRef'].insertBefore(last.cloneNode(this.loop), this.children[0])
      }
      this.goToIndex(this.nowItemIndex, false)
      this.autoPlay()
    },
    goToIndex (toIndex, hasDuration = true, delta = 0) {
      let translate = (toIndex + 1) * this.swiperSize
      this.dragStyleObject.transitionDuration = hasDuration ? this.duration + 'ms' : '0ms'
      this.setTranslate(-translate + delta)
      this.totalItemCount = this.items.length
      if (hasDuration) {
        setTimeout(() => {
          // 动画完成告诉外界当前index
          if (toIndex >= this.totalItemCount) {
            this.nowItemIndex = 0
            this.goToIndex(this.nowItemIndex, false)
          } else if (toIndex < 0) {
            this.nowItemIndex = this.items.length - 1
            this.goToIndex(this.nowItemIndex, false)
          } else {
            this.nowItemIndex = toIndex
          }
          this.$emit('change', this.nowItemIndex)
        }, this.duration)
      } else {
        if (this.nowItemIndex !== toIndex) {
          this.nowItemIndex = toIndex
        }
      }
    },
    goToNextIndex () {
      if (!this.loop && this.nowItemIndex === this.items.length - 1) {
        this.goToIndex(this.nowItemIndex)
      } else {
        this.goToIndex(this.nowItemIndex + 1)
      }
    },
    goToPreIndex () {
      if (!this.loop && this.nowItemIndex === 0) {
        this.goToIndex(this.nowItemIndex)
      } else {
        this.goToIndex(this.nowItemIndex - 1)
      }
    },
    setTranslate (translate) {
      if (this.isVertical) {
        this.dragStyleObject.transform = 'translate3d(0, ' + translate + 'px, 0)'
      } else {
        this.dragStyleObject.transform = 'translate3d(' + translate + 'px, 0, 0)'
      }
    },
    autoPlay () {
      if (this.interval <= 0 || this.items.length <= 1) return
      this.stopAutoPlay()
      this.autoPlayTimer = setInterval(() => {
        this.goToNextIndex()
      }, this.interval)
    },
    stopAutoPlay () {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer)
      }
      this.autoPlayTimer = null
    }
  },
  mounted () {
    this.$nextTick(() => {
      let inteval = setInterval(() => {
        if (this.$el.querySelector('._ui-swiper-item')) {
          this.init()
          clearInterval(inteval)
        }
      }, 100)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-swiper;
</style>

<!--<wap-swiper v-if="home && home.banners.length">-->
  <!--<wap-swiper-item v-for="(v, k) in home.banners" :key="k">-->
    <!--<img :src="v.image.url" alt="" style="max-width: 100%; max-height: 100%">-->
  <!--</wap-swiper-item>-->
<!--</wap-swiper>-->
