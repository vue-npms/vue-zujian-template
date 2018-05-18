<template>
  <div style="padding: 20px">
    <ui-pagination total="100"></ui-pagination>
    <ui-pagination :page="page" :page-size="pageSize" total="100" :pageCount="pageCount" @change-page="changePage" @change-page-size="changePageSize"></ui-pagination>
  </div>
</template>

<script>
// or global lazy load
import Pagination from './Pagination/Pagination.vue'
export default {
  data () {
    return {
      page: 3,
      pageSize: 25,
      pageCount: 1000
    }
  },
  methods: {
    changePage (nv, ov) {
      console.log(nv, ov)
      this.page = nv
    },
    changePageSize (nv, ov) {
      console.log(nv, ov)
      this.pageSize = nv
    }
  },
  components: {
    'UiPagination': Pagination
  }
}
</script>
