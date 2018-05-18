<template>
  <div class="_ui-search">
    <div class="search-input-wrap" :class="{'exist-cancel-text': currentValue}">
      <form action="" class="search-input-form" @submit.prevent="$emit('submit')">
        <i class="iconfont icon-search"></i>
        <ui-input class="input" type="search" :placeholder="placeholder" v-model="currentValue" :readonly="fullPage" show-clear @click.native="open"></ui-input>
      </form>
      <span class="cancel-text" v-show="currentValue" @click="close">{{cancelText}}</span>
    </div>

    <div v-if="fullPage" v-show="showFullPage" class="ui-search ui-search-fly">
      <div class="search-input-wrap exist-cancel-text">
        <form action="" class="search-input-form" @submit.prevent="$emit('submit')">
          <i class="iconfont icon-search"></i>
          <ui-input class="input" type="search" :placeholder="placeholder" v-model="currentValue" show-clear ref="searchRef"></ui-input>
        </form>
        <span class="cancel-text" @click="close">{{cancelText}}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Input from './Input.vue'
export default {
  props: {
    value: [String],
    placeholder: [String],
    cancelText: {
      type: String,
      default: '取消'
    },
    fullPage: [Boolean]
  },
  data () {
    return {
      showFullPage: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    showFullPage (newVal) {
      setTimeout(() => {
        if (newVal) {
          this.$refs['searchRef'].$refs['input'].focus()
        } else {
          this.$refs['searchRef'].$refs['input'].blur()
        }
      })
    }
  },
  methods: {
    open () {
      if (this.fullPage) {
        this.showFullPage = true
      }
    },
    close () {
      this.currentValue = ''
      this.showFullPage = false
    }
  },
  mounted () {
    if (this.fullPage) {
      window.addEventListener('popstate', () => {
        this.showFullPage && history.go(1)
      })
      window.addEventListener('hashchange', (e) => {
        e.preventDefault()
        this.showFullPage && this.close()
      })
    }
  },
  components: {
    [Input.name]: Input
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-search;
</style>
