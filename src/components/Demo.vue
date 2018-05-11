<template>
  <div style="padding-top: 20px">
    <div @click="$refs['fromLeft'].showPop = true">togglePageFromLeftWithModal [mask][modal][modal-lock]</div>
    <ui-popup from="left" modal modal-lock mask style="background: #f00" ref="fromLeft">
      <div @click="$refs['fromLeft'].close()">--- closePage ---</div>
    </ui-popup>
    <!--<ui-popup v-model="isShowFromLeft" from="left" modal modal-lock>-->
    <!--<div @click="isShowFromLeft = false">closePage</div>-->
    <!--</ui-popup>-->

    <div @click="$refs['fromRight'].showPop = true">togglePageFromRight [modal]</div>
    <ui-popup from="right" modal style="background: #0f0" ref="fromRight">
      <div @click="$refs['fromRight'].close()">--- closePage ---</div>
    </ui-popup>

    <div @click="$refs['fromLeftFullPage'].showPop = true">isShowFromLeftWithFullPage</div>
    <ui-popup from="left" page style="background: #00f" ref="fromLeftFullPage">
      <div @click="$refs['fromLeftFullPage'].close()">--- closePage ---</div>
    </ui-popup>

    <div @click="$refs['fromRightFullPage'].showPop = true">togglePageFromRightWithPage</div>
    <ui-popup from="right" page style="background: #0ff" ref="fromRightFullPage">
      <div @click="$refs['fromRightFullPage'].close()">--- closePage ---</div>
    </ui-popup>

    <hr>

    <div @click="$refs['fromTop'].showPop = true">togglePageFromTopWithModal[no mask]</div>
    <!--can set min-height   margin-top 等等，灵活使用，比如有header60高度，可这是margin-top: 60px-->
    <ui-popup from="top" modal style="background: #f00; min-height: 100px" ref="fromTop">
      <div @click="$refs['fromTop'].close()">--- closePage ---</div>
    </ui-popup>

    <div @click="$refs['fromBottom'].showPop = true">togglePageFromBottom</div>
    <ui-popup from="bottom" style="background: #0f0" ref="fromBottom">
      <div @click="$refs['fromBottom'].close()">--- closePage ---</div>
    </ui-popup>

    <div @click="$refs['fromTopFullPage'].showPop = true">isShowFromTopWithPage</div>
    <ui-popup from="top" page style="background: #00f" ref="fromTopFullPage">
      <div @click="$refs['fromTopFullPage'].close()">--- closePage ---</div>
    </ui-popup>

    <div @click="$refs['fromBottomFullPage'].showPop = true">togglePageFromBottomWithPage</div>
    <ui-popup from="bottom" page style="background: #0ff" ref="fromBottomFullPage">
      <div @click="$refs['fromBottomFullPage'].close()">--- closePage ---</div>
    </ui-popup>
  </div>
</template>

<script>
// or global lazy load
import Popup from '@/components/UiPopup/Popup.vue'
export default {
  methods: {
    hi (num) {
      console.log('hi', num)
    }
  },
  components: {
    'UiPopup': Popup
  }
}
</script>
