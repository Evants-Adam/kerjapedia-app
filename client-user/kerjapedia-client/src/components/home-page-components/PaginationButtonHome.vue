<template>
  <div v-show="page === currentPage || page === (currentPage + 1) || page === (currentPage - 1)">
    <div v-if="page === currentPage">
      <li id="pagination-button" class="page-item active"><a class="page-link" href="" @click.prevent="handlePageClick">{{ page }}</a></li>
    </div>
    <div v-else>
      <li id="pagination-button" class="page-item"><a class="page-link" href="" @click.prevent="handlePageClick">{{ page }}</a></li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationButton',
  props: ['page', 'index'],
  methods: {
    handlePageClick () {
      this.$emit('handlePageClick', this.page)
    }
  },
  computed: {
    currentPage () {
      return this.$store.state.currentPage
    }
  }
}
</script>

<style>
</style>
