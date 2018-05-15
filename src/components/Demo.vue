<template>
  <div style="padding-top: 20px;">
    search -- {{currentValue}}
    <div>
      <ui-search v-model="currentValue" placeholder="搜索"></ui-search>
    </div>
    <div style="margin-top: 15px">
      <ui-search v-model="currentValue" full-page placeholder="搜索 with full page">
        I'm slot， 哈哈 -- {{currentValue}}
      </ui-search>
    </div>
  </div>
</template>

<script>
// or global lazy load
import UiSearch from './Search/Search.vue'
export default {
  data () {
    return {
      currentValue: ''
    }
  },
  components: {
    UiSearch
  }
}
</script>
