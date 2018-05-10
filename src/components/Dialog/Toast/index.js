import ToastBox from './ToastBox.vue'
import pageScroll from './pageScroll'
let instancesObj = {}
ToastBox.install = function (Vue, options) {
  ToastBox.new = (options = {}) => {
    if (!options['onEl']) {
      options['onEl'] = document.body
    }
    // options identify
    if (options.identify && instancesObj[options.identify]) {
      let opr = instancesObj[options.identify]
      ++opr.$extraCounter
      return opr
    }
    const instance = new Vue({
      data: options,
      render (h) {
        return h(ToastBox, {
          props: options
        })
      }
    })
    const component = instance.$mount()
    options['onEl'].appendChild(component.$el)
    pageScroll.lock(component.$el)
    // 改变url路径移除组件
    const toastBox = instance.$children[0]
    function hashChange () {
      pageScroll.unlock()
      const el = toastBox.$el
      el.parentNode && el.parentNode.removeChild(el)
      window.removeEventListener('hashchange', hashChange)
      window.removeEventListener('popstate', hashChange)
    }
    window.addEventListener('hashchange', hashChange)
    window.addEventListener('popstate', hashChange)

    const toast = instance.$children[0]
    const opr = {
      $extraCounter: 0,
      close () {
        if (opr.$extraCounter) {
          --opr.$extraCounter
        } else {
          opr.forceClose()
        }
      },
      forceClose () {
        opr.$extraCounter = 0
        const el = toast.$el
        pageScroll.unlock(el)
        el.parentNode && el.parentNode.removeChild(el)
        typeof toast.callback === 'function' && toast.callback()
        if (options.identify) {
          instancesObj[options.identify] = null
        }
      }
    }
    // options identify
    if (options.identify) {
      instancesObj[options.identify] = opr
    }

    if (options.timeout) {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        opr.close()
      }, options.timeout + 100)
    }

    return opr
  }

  ToastBox.newWithPromise = (promise, options) => {
    return new Promise((resolve, reject) => {
      let loading = ToastBox.new(options)
      promise.then(result => {
        loading.close()
        resolve(result)
      }).catch(err => {
        loading.close()
        reject(err)
      })
    })
  }

  ToastBox.getWithIdentify = function (identify) {
    return instancesObj[identify]
  }

  return ToastBox
}
export default ToastBox
