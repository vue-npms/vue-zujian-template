<template>
  <div class="_ui-checkbox-group">
    <slot>
      <ui-checkbox v-for="(option, index) in options" :key="index" :val="option.value" :disabled="option.disabled === true">{{ option.label || option.value }}</ui-checkbox>
    </slot>
  </div>
</template>

<script>
import CheckBox from './Checkbox.vue'
export default {
  props: {
    value: {
      type: Array,
      require: true
    },
    options: {
      type: Array
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        this.$emit('input', nv)
        this.updateChildren()
      }
    }
  },
  watch: {
    value: {
      handler (newVal) {
        this.$nextTick(() => {
          this.currentValue = newVal
        })
      },
      immediate: true
    }
  },
  methods: {
    change (val) {
      let tmpValues = this.value
      let index = tmpValues.indexOf(val)
      if (index === -1) {
        tmpValues.push(val)
      } else {
        tmpValues.splice(index, 1)
      }
      this.currentValue = tmpValues
    },
    updateChildren () {
      this.$children.filter(item => item.$options.name === 'UiCheckbox').forEach((child) => {
        child.checked = this.value.indexOf(child.val) !== -1
      })
    }
  },
  updated () {
    this.updateChildren()
  },
  components: {
    'UiCheckbox': CheckBox
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include ui-checkbox-group;
</style>

<!--<wap-checkbox-group v-model="arr">-->
  <!--<wap-checkbox val="111">aaaa</wap-checkbox>-->
  <!--<wap-checkbox val="222">bbbb</wap-checkbox>-->
<!--</wap-checkbox-group>-->
