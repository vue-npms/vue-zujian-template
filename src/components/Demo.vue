<template>
  <div style="padding-top: 20px">
    <h3>default</h3>
    <ui-counter-number :number="number1"></ui-counter-number>
    <h3>:fix-count="5"</h3>
    <ui-counter-number :number="number1" :fix-count="5"></ui-counter-number>
    <h3>:fix-count="10" :speed="1000" :delay-each="100"</h3>
    <ui-counter-number :number="number2" :fix-count="10" :speed="1000" :delay-each="100"></ui-counter-number>
    <h3>:fix-count="10" fix-str="-" :speed="1000" :delay-each="100"</h3>
    <ui-counter-number :number="number2" :fix-count="10" fix-str="-" :speed="1000" :delay-each="100"></ui-counter-number>
    <h3>height="50px" & custom view</h3>
    <ui-counter-number :number="number1" height="50px" style="color: #f00;">
      <template slot-scope="{number}">
        <span style="display: inline-block; background: #999; width: 50px; line-height: 50px; font-size: 30px">{{number}}</span>
      </template>
      <template slot="after" slot-scope="{number, originNumber, position}">
        <span>{{position}}-{{number}}-{{originNumber}}</span>
      </template>
    </ui-counter-number>
  </div>
</template>

<script>
// or global lazy load
import CounterNumber from '@/components/CounterNumber/CounterNumber.vue'
export default {
  data () {
    return {
      number1: 30,
      number2: 888
    }
  },
  mounted () {
    setInterval(() => {
      let val = -1 // parseInt(Math.random() + 0.5) * 2 - 1
      this.number1 += val
    }, 1000)

    setInterval(() => {
      this.number2 += parseInt(Math.random() * 500 - 250)
    }, 3000)
  },
  components: {
    'UiCounterNumber': CounterNumber
  }
}
</script>
