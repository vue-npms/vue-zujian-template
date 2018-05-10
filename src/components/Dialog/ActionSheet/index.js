import ActionSheet from './ActionSheet.vue'
import pageScroll from './pageScroll'

ActionSheet.install = function (Vue, options) {
  ActionSheet.new = (options = {}) => {
    if (!options['onEl']) {
      options['onEl'] = document.body
    }
    const instance = new Vue({
      data: options,
      render (h) {
        return h(ActionSheet, {
          props: options
        })
      }
    })
    const component = instance.$mount()
    options['onEl'].appendChild(component.$el)
    pageScroll.lock(component.$el)
    // 改变url路径移除组件
    const actionSheet = instance.$children[0]
    function hashChange () {
      pageScroll.unlock()
      const el = actionSheet.$el
      el.classList.add('leave')
      setTimeout(() => {
        el.parentNode && el.parentNode.removeChild(el)
        window.removeEventListener('hashchange', hashChange)
        window.removeEventListener('popstate', hashChange)
      }, 200)
    }
    window.addEventListener('hashchange', hashChange)
    window.addEventListener('popstate', hashChange)

    actionSheet.close = (item) => {
      const el = actionSheet.$el
      el.classList.add('leave')
      pageScroll.unlock(el)
      setTimeout(() => {
        el.parentNode && el.parentNode.removeChild(el)
        typeof actionSheet.callback === 'function' && actionSheet.callback(item)
        item && item.click && item.click()
      }, 200)
    }
    return actionSheet
  }
  return ActionSheet
}
export default ActionSheet
