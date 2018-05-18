<template>
  <div class="_ui-pagination">
    <span v-if="layout.indexOf('total') !== -1">共 {{total}} 条</span>
    <div class="page-size" v-if="layout.indexOf('sizes') !== -1">
      <div class="selected" :class="{active: toggleChoosePageSize}" @click="toggleChoosePageSize = !toggleChoosePageSize">
        {{pageSize}} 条/页
        <i class="iconfont icon-triangleupfill"></i>
      </div>
      <ul class="page-size-list" v-show="toggleChoosePageSize">
        <li v-for="size in pageSizes" :key="size" :class="{active: size == pageSize}" @click="changePerPageSize(size)">{{ size }}条/页</li>
      </ul>
    </div>
    <ul class="pager" v-if="page > 0">
      <li :class="{disabled: page <= 1}" @click="jumpTo(page - 1)" v-if="layout.indexOf('prev') !== -1"><i class="iconfont icon-back"></i></li>
      <li class="num" :class="{active: num == page}" v-for="(num, index) in pageNums" :key="index" @click="jumpTo(num, index)" v-if="layout.indexOf('pager') !== -1">
        <slot name="number" :value="num">{{num}}</slot>
      </li>
      <li :class="{disabled: page >= pageCount}" @click="jumpTo(page + 1)" v-if="layout.indexOf('next') !== -1"><i class="iconfont icon-right"></i></li>
    </ul>
    <div class="jumper" v-if="layout.indexOf('jumper') !== -1 && jumpToPage">
      <form action="" @submit.prevent="jumpTo(jumpToPage)">
        前往 <input type="number" :max="pageCount" :min="0" v-model="jumpToPage"> 页
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: [Number, String],
    pageSize: {
      type: [Number, String],
      default: 25
    },
    pageCount: {
      type: [Number],
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [25, 50, 100, 200, 500]
    },
    total: [Number, String],
    layout: {
      type: Array,
      default: () => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']
    }
  },
  data () {
    return {
      jumpToPage: 0,
      toggleChoosePageSize: false
    }
  },
  computed: {
    pageNums () {
      let pageNums = []
      if (this.pageCount < 6) {
        for (let i = 1; i <= this.pageCount; i++) {
          pageNums.push(i)
        }
      } else {
        if (this.page <= 4) {
          pageNums = [1, 2, 3, 4, 5, '...', this.pageCount]
        } else if (this.page > this.pageCount - 4) {
          pageNums = [1, '...', this.pageCount - 5, this.pageCount - 4, this.pageCount - 3, this.pageCount - 2, this.pageCount - 1, this.pageCount]
        } else {
          pageNums = [1, '...', this.page - 2, this.page - 1, this.page, this.page - -1, this.page - -2, '...', this.pageCount]
        }
      }
      return pageNums
    }
  },
  watch: {
    page: {
      handler (nv) {
        this.jumpToPage = nv
      },
      immediate: true
    }
  },
  methods: {
    jumpTo (toPage, index) {
      if (toPage < 1) {
        toPage = 1
      } else if (toPage > this.pageCount) {
        toPage = this.pageCount
      }
      if (toPage === '...') {
        if (index === 1) {
          toPage = this.page - 5 >= 1 ? this.page - 5 : 1
        } else {
          toPage = this.page - -5 <= this.pageCount ? this.page - -5 : this.pageCount
        }
      }
      if (toPage !== this.page) {
        this.$emit('change-page', toPage, this.page)
      }
    },
    changePerPageSize (newSize) {
      if (newSize !== this.pageSize) {
        this.$emit('change-page-size', newSize, this.pageSize)
        this.toggleChoosePageSize = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
._ui-pagination {
  padding: 5px;
  line-height: pxRem(24);
  font-size: pxRem(14);
  font-weight: 500;
  user-select: none;

  & > * {
    padding: 0 pxRem(5);
  }

  .page-size {
    position: relative;
    display: inline-block;
    font-size: 12px;
    .selected {
      display: inline-block;
      border: 1px solid $color-border-default;
      padding: 0 pxRem(8);
      min-width: pxRem(90);
      border-radius: pxRem(3);
      cursor: pointer;
      &:hover {
        border-color: $color-primary;
      }
      .icon-triangleupfill {
        display: inline-block;
        color: $color-disable;
        float: right;
        font-size: pxRem(12);
      }
      &.active {
        border-color: $color-primary;
        .icon-triangleupfill {
          transform: rotate(180deg);
        }
      }
    }
    ul.page-size-list {
      position: absolute;
      background: #fff;
      min-width: pxRem(90);
      border: 1px solid $color-border-default;
      li {
        padding: pxRem(2) pxRem(8);
        &:hover {
          cursor: pointer;
          color: $color-primary;
          background: #f5f5f5;
        }
        &.active {
          color: #fff;
          background: $color-primary;
        }
      }
    }
  }

  ul.pager {
    display: inline-block;

    li {
      display: inline-block;
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }

      &.active {
        color: $color-primary;
        cursor: not-allowed;
      }

      &.num {
        padding: 0 pxRem(6);
      }
      &.disabled {
        @include disabled;
        color: $color-disable;
        &:hover {
          color: $color-disable;
        }
      }
    }
  }

  .jumper {
    display: inline-block;
    padding: 0 pxRem(5);
    input {
      width: pxRem(36);
      line-height: pxRem(20);
      border-radius: pxRem(3);
      border: 1px solid $color-border-default;
      text-align: center;
      color: $color-text-default;
    }
  }
}
</style>
