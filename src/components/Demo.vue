<template>
  <div>
    <ul is="ui-scroll-section" :pull-refresh="refreshFetchData" :infinite-scroll="infiniteScroll" style="height: 400px">
      <li style="line-height: 44px; border-top: 1px solid #777; font-size: 16px">下拉刷新</li>
      <li style="line-height: 44px; border-top: 1px solid #777; font-size: 16px">滑动底部加载更多</li>
      <li v-for="(item, index) in items" :key="index" style="line-height: 44px; border-top: 1px solid #777; font-size: 16px">{{item}}</li>
      <li style="height: 1px; border-top: 1px solid #777; overflow: hidden"></li>
    </ul>
  </div>
</template>

<script>
// or global lazy load
import ScrollSection from './ScrollSection/ScrollSection.vue'
export default {
  data () {
    return {
      items: ['1', '2', '3', '4', '5']
    }
  },
  methods: {
    refreshFetchData (finished) {
      setTimeout(() => {
        this.items = ['a1', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', '11', '12', '13', '14', '15']
        finished()
      }, 3000)
    },
    infiniteScroll (finished) {
      setTimeout(() => {
        this.items.push('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k')
        if (Math.random() > 0.6) {
          finished()
        } else {
          // finished函数传递参数true 代表全部数据获取完毕
          finished(true)
        }
      }, 3000)
    }
  },
  components: {
    'UiScrollSection': ScrollSection
  }
}
</script>
