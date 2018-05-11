<template>
  <div class="_ui-counter-number" :style="{height: height}">
    <ui-counter-number-item v-for="(num,index) in calcNumbers" :key="calcNumbersCount-index" :number="num" :height="height" :speed="speed + delayEach * index" :direction="direction" :is-plus="isPlus">
      <template slot-scope="{number}">
        <slot :number="number">{{number}}</slot>
      </template>
    </ui-counter-number-item>
  </div>
</template>

<script>
import CounterNumberItem from './CounterNumberItem.vue'
export default {
  name: 'UiCounterNumber',
  props: {
    number: [Number, String],
    height: {
      type: [String],
      default: '30px',
      validator (value) {
        return value.match(/px|rem/)
      }
    },
    speed: {
      type: Number,
      default: 300 // ms
    },
    delayEach: {
      type: Number,
      default: 120 // ms
    },
    fixCount: [Number, String],
    fixStr: {
      type: [String, Number],
      default: '0'
    }
  },
  data () {
    return {
      direction: 'up'
    }
  },
  computed: {
    calcNumbers () {
      if (this.fixCount) {
        return (Array(this.fixCount).join(this.fixStr) + this.number).slice(-this.fixCount)
      }
      return `${this.number}`.split('')
    },
    calcNumbersCount () {
      return this.calcNumbers.length
    },
    isPlus () {
      return this.number >= 0
    }
  },
  watch: {
    number (newVal, oldVal) {
      if (newVal >= 0) {
        this.direction = newVal > oldVal ? 'up' : 'down'
      } else {
        this.direction = newVal > oldVal ? 'down' : 'up'
      }
    }
  },
  components: {
    [CounterNumberItem.name]: CounterNumberItem
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-counter-number;
</style>
