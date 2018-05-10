<template>
  <div style="padding-top: 20px">
    <button @click="usage1">Base usage1</button>
    <br/>
    <button @click="usage2">Multi request use one Toast</button>
    <br/>
    <button @click="usage3">Toast with promise</button>
  </div>
</template>

<script>
import Vue from 'vue'
import ToastBox from '@/components/Dialog/Toast/index.js'
Vue.use(ToastBox)
export default {
  methods: {
    usage1 () {
      let loading1 = ToastBox.new({icon: 'icon-loading', callback: () => { console.log('closed') }})
      setTimeout(function () {
        loading1.close()
      }, 3000)
    },
    // new 几个相同的identify，就需要调用多少次 close 方法
    usage2 () {
      ToastBox.new({icon: 'icon-loading', message: '很快就好了', callback: () => { console.log('closed') }, identify: '1'})
      ToastBox.new({identify: '1'})
      ToastBox.new({identify: '1'})
      ToastBox.new({identify: '1'})
      ToastBox.new({identify: '1'})
      function setTime () {
        setTimeout(() => {
          let identify1Loading = ToastBox.getWithIdentify('1')
          // 强制关闭所有
          // Loading.getWithIdentify('1').forceClose()
          if (identify1Loading) {
            console.log('before close: ', identify1Loading.$extraCounter)
            identify1Loading.close()
            console.log('after close: ', identify1Loading.$extraCounter)
            setTime()
          }
        }, 1000)
      }
      setTime()
    },
    usage3 () {
      function createPromise () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let random = Math.random()
            if (random > 0.5) {
              resolve('哈哈，赢了')
            }
            reject(new Error('呜呜~，输了'))
          }, 3000)
        })
      }
      ToastBox.newWithPromise(createPromise(), {message: '华山论剑'}).then(result => {
        console.log(result)
      }).catch(err => {
        console.log('err--:', err)
      })
    }
  }
}
</script>
