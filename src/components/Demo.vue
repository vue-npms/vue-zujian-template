<template>
  <div style="padding-top: 20px">
    <ui-drop-menu v-model="nowSortObject" :options="options" @update="updateSelect"></ui-drop-menu>
  </div>
</template>

<script>
// or global lazy load
import DropMenu from './DropMenu/DropMenu.vue'
export default {
  data () {
    return {
      nowSortObject: null,
      options: [{
        name: '按距离排序'
      }, {
        name: '按访问量排序',
        disabled: true
      }, {
        name: '按点赞量排序'
      }, {
        name: '默认排序'
      }]
    }
  },
  methods: {
    updateSelect (nv, ov) {
      console.log(nv, ov)
    }
  },
  components: {
    'UiDropMenu': DropMenu
  }
}
</script>
