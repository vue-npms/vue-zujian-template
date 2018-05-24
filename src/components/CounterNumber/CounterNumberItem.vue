<template>
  <div class="_ui-counter-number-item">
    <div :style="{height: height, lineHeight: height}" v-if="!isNumber">
      <slot :number="number"></slot>
    </div>
    <div class="wrap">
      <ul :style="styles" ref="transRef">
        <li :style="{height: height, lineHeight: height}" v-for="(fill,index) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="index">
          <slot :number="fill"></slot>
        </li>
      </ul>
    </div>
    <span class="after-number">
      <slot name="after" :number="number" :position="position" :origin-number="originNumber"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'UiCounterNumberItem',
  props: {
    number: [Number, String],
    height: {
      type: [String]
    },
    position: [Number],
    originNumber: [Number, String],
    speed: {
      type: Number,
      default: 500
    },
    direction: {
      type: String,
      validator (value) {
        return ['up', 'down'].indexOf(value) > -1
      },
      default: 'up'
    },
    isPlus: [Boolean]
  },
  data () {
    return {
      timer: null,
      items: [],
      nowItemIndex: 1,
      styles: {
        transform: 0,
        transitionDuration: 0
      }
    }
  },
  computed: {
    cHeight () {
      return parseFloat(this.height)
    },
    cUnit () {
      return this.height.match('rem') ? 'rem' : 'px'
    },
    itemsCount () {
      return this.items.length
    },
    isNumber () {
      return /[0-9]/.test(`${this.number}`)
    }
  },
  watch: {
    number (newVal, oldVal) {
      if (this.isNumber) {
        this.goValue(newVal, oldVal)
      } else {
        this.setTranslate(0, 0)
      }
    },
    originNumber (nv, ov) {
      let abString = `${Math.abs(Math.abs(nv) - Math.abs(ov))}`
      if (abString.length >= this.position) {
        let v1 = `${nv}`.substr(-this.position, 1)
        let v2 = `${ov}`.substr(-this.position, 1)
        if (v1 === v2) {
          this.goValue(v1, v2)
        }
      }
    }
  },
  methods: {
    init (newVal, oldVal) {
      if (this.direction === 'up') {
        this.setTranslate(0, -oldVal * this.cHeight)
      } else {
        this.setTranslate(0, (-oldVal - 10) * this.cHeight)
      }
    },
    setTranslate (speed, translate, afterDo) {
      this.styles.transitionDuration = speed + 'ms'
      this.styles.transform = `translate3d(0, ${translate}${this.cUnit}, 0)`
      if (afterDo) {
        let el = this.$refs['transRef']
        let transitionend = (ev) => {
          afterDo(ev)
          el.removeEventListener('transitionend', transitionend)
        }
        el.addEventListener('transitionend', transitionend, false)
      }
    },
    goValue (newVal, oldVal = 0) {
      this.init(newVal, oldVal)
      setTimeout(() => {
        if (this.direction === 'up') {
          if (newVal > oldVal) {
            this.setTranslate(this.speed, -newVal * this.cHeight, () => {
              this.setTranslate(0, -newVal * this.cHeight)
            })
          } else {
            this.setTranslate(this.speed, (-newVal - 10) * this.cHeight, () => {
              this.setTranslate(0, -newVal * this.cHeight)
            })
          }
        } else {
          if (newVal < oldVal) {
            this.setTranslate(this.speed, (-newVal - 10) * this.cHeight, () => {
              this.setTranslate(0, (-newVal - 10) * this.cHeight)
            })
          } else {
            this.setTranslate(this.speed, -newVal * this.cHeight, () => {
              this.setTranslate(0, (-newVal - 10) * this.cHeight)
            })
          }
        }
      }, 10)
    }
  },
  mounted () {
    this.init(this.number, this.number)
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-counter-number-item;
</style>
