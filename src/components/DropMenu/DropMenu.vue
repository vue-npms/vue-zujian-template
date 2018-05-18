<template>
  <ul class="_ui-drop-select">
    <li @click="toggleMenu()" class="dropdown-toggle">
      <span class="title">{{ currentValue && currentValue[labelKey] || '' }}</span>
      <span class="caret"></span>
    </li>
    <li>
      <ul class="dropdown-menu" :class="{ 'hide' : !showMenu}">
        <li v-for="(option, index) in options" :key="index" :class="{disabled: option.disabled || option === currentValue}">
        <span @click="updateOption(option)">
          {{ option[labelKey] }}
        </span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object]
    },
    value: [Object],
    labelKey: {
      default: 'name'
    }
  },
  data () {
    return {
      selectedOption: {
        name: ''
      },
      showMenu: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        this.$emit('input', nv)
      }
    }
  },
  methods: {
    updateOption (option) {
      if (!option.disabled && this.currentValue !== option) {
        this.$emit('update', option, this.currentValue)
        this.currentValue = option
        this.showMenu = false
      }
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss" scoped>
  ._ui-drop-select {
    height: pxRem(36);
    position: relative;
    display: inline-block;
    vertical-align: middle;
    a {
      &:hover {
        text-decoration: none;
      }
    }
    .title {
      flex: 1;
      text-align: center;
      padding-right: pxRem(4);
    }
  }

  .dropdown-toggle {
    color: #636b6f;
    min-width: pxRem(80);
    height: pxRem(36);
    padding: 0 pxRem(8);
    background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
    background-size: 0 pxRem(2), 100% pxRem(1);
    background-repeat: no-repeat;
    background-position: center bottom, center calc(100% - 1px);
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background: #e1e1e1;
      cursor: pointer;
    }

    .caret {
      display: inline-block;
      width: 0;
      position: relative;
      height: 0;
      margin-left: pxRem(2);
      vertical-align: middle;
      border-top: pxRem(4) dashed;
      border-top: pxRem(4) solid \9;
      border-right: pxRem(4) solid transparent;
      border-left: pxRem(4) solid transparent;
    }
  }

  .hide {
    display: none;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: pxRem(-8);
    z-index: 1000;
    margin: pxRem(2) 0 0;
    list-style: none;
    font-size: pxRem(14);
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: pxRem(4);
    background-clip: padding-box;

    li {
      overflow: hidden;
      width: 100%;
      position: relative;
      margin: 0;

      &.disabled {
        @include disabled;
        span {
          &:hover {
            background: inherit;
            color: inherit;
          }
        }
      }

      span {
        padding: pxRem(10) pxRem(30);
        display: block;
        clear: both;
        font-weight: normal;
        line-height: 1.6;
        color: #333333;
        white-space: nowrap;
        text-decoration: none;

        &:hover {
          background: #efefef;
          color: #409FCB;
        }
      }
    }
  }
</style>
