<template>
  <div style="padding-top: 20px">
    <button @click="showActionSheet">show action sheet</button>
  </div>
</template>

<script>
import Vue from 'vue'
import ActionSheet from '@/components/Dialog/ActionSheet'
Vue.use(ActionSheet)
export default {
  methods: {
    showActionSheet () {
      ActionSheet.new({
        items: [{
          text: 'Action One',
          color: '#f00',
          click: () => { console.log(1) }
        }, {
          text: 'Action Two',
          color: true,
          disabled: true,
          click: () => { console.log(2) }
        }, {
          text: 'Action Three',
          click: () => { console.log(3) }
        }, {
          text: 'Action Four',
          hidden: true
        }],
        cancel: {
          text: '默认取消',
          // 隐藏取消按钮
          // hidden: true,
          click: () => { console.log('取消啦') }
        },
        callback: (item) => { console.log('关闭回调', item) }
      })
    }
  },
  components: {
    'UiActionSheet': ActionSheet
  }
}
</script>
