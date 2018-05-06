<template>
  <div style="padding-top: 20px">
    <ui-checkbox-group v-model="nowSelect" :options="options"></ui-checkbox-group>
    <ui-checkbox-group v-model="nowSelect">
      <ui-checkbox val="1">A</ui-checkbox>
      <ui-checkbox val="2">B</ui-checkbox>
      <ui-checkbox val="3" disabled>C</ui-checkbox>
    </ui-checkbox-group>
    {{ nowSelect }}
  </div>
</template>

<script>
// or global lazy load
import CheckboxGroup from '@/components/Checkbox/CheckboxGroup.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
export default {
  data () {
    return {
      nowSelect: ['3'],
      options: [{value: '1', label: 'A'}, {value: '2', label: 'B'}, {value: '3', label: 'C', disabled: true}]
    }
  },
  components: {
    'UiCheckboxGroup': CheckboxGroup,
    'UiCheckbox': Checkbox
  }
}
</script>
