<template>
  <div class="_ui-scroll-section" @touchstart="touchStart($event)" @mousedown.stop.prevent="touchStart($event)" @touchmove.prevent="touchMove($event)" @mousemove.stop.prevent="touchMove($event)" @touchend="touchEnd($event)" @mouseup.stop.prevent="touchEnd($event)" @mouseleave.stop.prevent="onTouchEnd($event)" @scroll="onScroll($event)">
    <div class="inner-wrap" ref="innerWrapRef">
      <div class="loadmore-top">
        <slot name="top" :info="topInfo">
          <span class="icon-box" :class="{'rotate-180': topInfo.statusTop === 'pullingEnable', 'loading-icon': topInfo.statusTop === 'doing'}" v-if="['pulling', 'pullingEnable', 'doing'].indexOf(topInfo.statusTop) !== -1">
            <i class="iconfont icon-loading" :class="topLoadingIcon" v-if="topInfo.statusTop === 'doing'"></i>
            <i class="iconfont icon-down" v-else></i>
          </span>
          <span class="desc" v-html="desc"></span>
        </slot>
      </div>
      <slot></slot>
      <div class="loadmore-bottom">
        <slot name="bottom" :info="bottomInfo">
          <div class="loading-box" v-if="bottomInfo.isScrollBottomFetching">
            <i class="iconfont loading-icon" :class="bottomLoadingIcon"></i>
            <span>{{isScrollBottomFetchingDesc}}</span>
          </div>
          <div class="loading-finish-box" v-else-if="bottomInfo.isScrollBottomFetchingFinished">{{isScrollBottomFetchingFinishedDesc}}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import touchMixin from './touchMixin'
export default {
  name: 'ScrollSection',
  mixins: [touchMixin],
  props: {
    pullRefresh: {
      type: Function
    },
    infiniteScroll: {
      type: Function
    },
    infiniteScrollDistance: {
      type: Number,
      default: 0
    },
    topLoadingIcon: {
      type: String,
      default: 'icon-loading'
    },
    pullDesc: {
      type: String,
      default: '下来刷新'
    },
    pullEnableDesc: {
      type: String,
      default: '释放刷新'
    },
    pullEnableDoingDesc: {
      type: String,
      default: '重新加载中...'
    },
    pullEnableDoneDesc: {
      type: String,
      default: '刷新成功'
    },
    isScrollBottomFetchingDesc: {
      type: String,
      default: '加载更多...'
    },
    bottomLoadingIcon: {
      type: String,
      default: 'icon-loading'
    },
    isScrollBottomFetchingFinishedDesc: {
      type: String,
      default: '没有更多数据了'
    },
    minHeightCanPullRefresh: {
      type: Number,
      default: 50
    },
    domQuery: {
      type: String
    }
  },
  data () {
    return {
      topInfo: {
        startPullRefresh: false,
        scrollTop: 0,
        statusTop: 'default',
        isPullRefreshFetching: false
      },
      bottomInfo: {
        isScrollBottomFetching: false,
        isScrollBottomFetchingFinished: false
      }
      // default pulling pullingEnable doing done
    }
  },
  computed: {
    desc () {
      switch (this.topInfo.statusTop) {
        case 'pulling':
          return this.pullDesc
        case 'pullingEnable':
          return this.pullEnableDesc
        case 'doing':
          return this.pullEnableDoingDesc
        case 'done':
          return this.pullEnableDoneDesc
        default:
          return ''
      }
    }
  },
  watch: {
    'topInfo.isPullRefreshFetching' (newVal) {
      if (newVal) {
        this.topInfo.statusTop = 'doing'
      } else {
        this.topInfo.statusTop = 'done'
        setTimeout(() => {
          this.$refs['innerWrapRef'].style.transform = `none`
        }, 300)
        // 重置infinite-scroll
        this.bottomInfo.isScrollBottomFetching = false
        this.bottomInfo.isScrollBottomFetchingFinished = false
      }
    }
  },
  methods: {
    touchStart (event) {
      if (this.pullRefresh && !this.bottomInfo.isScrollBottomFetching && !this.topInfo.isPullRefreshFetching) {
        if (this.topInfo.scrollTop > 20) {
          this.topInfo.statusTop = 'default'
          return
        }
        this.onTouchStart(event)
      }
    },
    _onTouchStart () {
      this.topInfo.startPullRefresh = true
      this.topInfo.statusTop = 'pulling'
    },
    touchMove (event) {
      if (this.pullRefresh && this.topInfo.startPullRefresh && !this.isScrollBottomFetching && !this.isPullRefreshFetching) {
        if (this.topInfo.scrollTop > 20) {
          this.topInfo.startPullRefresh = false
          this.topInfo.statusTop = 'default'
          return
        }
        this.onTouchMove(event)
      }
    },
    _onTouchMove (moving, event) {
      let moveY = this.touchInfo.offset.y / 2
      if (moveY < 0) {
        this.topInfo.startPullRefresh = false
      }
      if (this.topInfo.startPullRefresh) {
        event.preventDefault()
        let el = this.$refs['innerWrapRef']
        el.style.transition = `${moving.timestamp - this.touchInfo.start.timeStamp}ms linear`
        el.style.transform = `translateY(${moveY}px)`
        if (moveY >= this.minHeightCanPullRefresh) {
          el.canPullRefresh = true
          this.topInfo.statusTop = 'pullingEnable'
        } else {
          el.canPullRefresh = false
          this.topInfo.statusTop = 'pulling'
        }
      }
    },
    touchEnd (event) {
      if (this.pullRefresh && !this.bottomInfo.isScrollBottomFetching && !this.topInfo.isPullRefreshFetching) {
        this.onTouchEnd(event)
      }
    },
    _onTouchEnd () {
      let el = this.$refs['innerWrapRef']
      el.style.transition = `.15s linear`
      if (el.canPullRefresh) {
        this.handlePullRefresh()
        this.topInfo.scrollTop = 0
        el.style.transform = `translateY(${this.minHeightCanPullRefresh}px)`
      } else {
        el.style.transform = `none`
      }
      el.canPullRefresh = false
      this.topInfo.startPullRefresh = false
    },
    onScroll (event) {
      let el = event.target
      this.topInfo.scrollTop = el.scrollTop
      if (el.scrollTop >= 10 && !this.topInfo.isPullRefreshFetching && this.infiniteScroll && !this.bottomInfo.isScrollBottomFetching && !this.bottomInfo.isScrollBottomFetchingFinished && el.scrollHeight - el.clientHeight - el.scrollTop <= this.infiniteScrollDistance) {
        this.bottomInfo.isScrollBottomFetching = true
        this.infiniteScroll((allFetched) => {
          this.bottomInfo.isScrollBottomFetching = false
          if (allFetched) {
            this.bottomInfo.isScrollBottomFetchingFinished = true
          }
        })
      }
    },
    handlePullRefresh () {
      if (this.pullRefresh) {
        this.topInfo.isPullRefreshFetching = true
        this.pullRefresh((allFetched) => {
          this.topInfo.isPullRefreshFetching = false
          if (allFetched) {
            this.bottomInfo.isScrollBottomFetchingFinished = true
          }
        })
      }
    },
    reset () {
      this.bottomInfo = {
        isScrollBottomFetching: false,
        isScrollBottomFetchingFinished: false
      }
    }
  },
  mounted () {
    if (this.domQuery) {
      let dom = document.querySelector(this.domQuery)
      dom && dom.addEventListener('scroll', (ev) => {
        this.topInfo.scrollTop = ev.target.scrollTop
        this.onScroll(ev)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-scroll-section;
</style>
