<template>
  <transition name="fade" mode="out-in" v-if="load === false">
    <div id="preloader">
        <div id="status">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PreLoader',
  computed: {
    load () {
      return this.$store.state.preLoaderState
    }
  },
  destroyed () {
    this.$nextTick(function () {
      this.$store.commit('SET_PRELOADER_STATE', false)
    })
  }
}
</script>

<style>

</style>
