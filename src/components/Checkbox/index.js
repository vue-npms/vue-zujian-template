import Vue from 'vue'
Vue.component('UiCheckboxGroup', (resolve) => {
  resolve(require('./CheckboxGroup.vue'))
})
Vue.component('UiCheckbox', (resolve) => {
  resolve(require('./Checkbox.vue'))
})
