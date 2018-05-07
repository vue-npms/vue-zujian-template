<template>
  <div style="padding-top: 20px">
    <div>
      <ui-button @click="hi(0)">default</ui-button>
      <ui-button type="plain" @click="hi(0.5)">plain</ui-button>
      <ui-button type="danger" @click="hi(1)">danger</ui-button>
      <ui-button type="primary" @click="hi(2)">primary</ui-button>
      <ui-button type="warning" @click="hi(3)">warning</ui-button>
      <ui-button type="hollow" @click="hi(4)">hollow</ui-button>
    </div>
    <div style="margin-top: 20px">
      <ui-button disabled @click="hi(5)">default</ui-button>
      <ui-button type="plain" disabled @click="hi(5.5)">plain</ui-button>
      <ui-button type="danger" disabled @click="hi(6)">danger</ui-button>
      <ui-button type="primary" disabled @click="hi(7)">primary</ui-button>
      <ui-button type="warning" disabled @click="hi(8)">warning</ui-button>
      <ui-button type="hollow" disabled @click="hi(9)">hollow</ui-button>
    </div>
    <div style="margin-top: 20px">
      <ui-button loading icon="icon-loading">default</ui-button>
    </div>
    <div style="margin-top: 20px">
      <ui-button size="large" style="display: block; margin-bottom: 20px">default(默认)</ui-button>
      <ui-button style="display: block; margin-bottom: 20px">default(默认)</ui-button>
      <ui-button size="small" style="display: block; margin-bottom: 20px">default(默认)</ui-button>
      <ui-button size="mini" style="display: block; margin-bottom: 20px">default(默认)</ui-button>
    </div>

    <div style="margin-top: 20px">
      <ui-button @click="hi(0)" size="large">large</ui-button>
      <ui-button type="warning" disabled @click="hi(8)">normal</ui-button>
      <ui-button type="danger" size="small" @click="hi(1)">small</ui-button>
      <ui-button type="primary" size="mini" @click="hi(2)">mini</ui-button>
    </div>
  </div>
</template>

<script>
// or global lazy load
import Button from '@/components/Button/Button.vue'
export default {
  methods: {
    hi (num) {
      console.log('hi', num)
    }
  },
  components: {
    'UiButton': Button
  }
}
</script>
