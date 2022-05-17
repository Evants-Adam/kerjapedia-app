<template>
  <section>
    <PreLoader></PreLoader>
    <NavbarMenu></NavbarMenu>
    <section class="section pt-0 mt-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="section-title text-center mb-4 pb-2">
              <h4 class="title title-line">Bookmarked Jobs</h4>
            </div>
          </div>
        </div>
        <div class="col-lg-12 mt-2" v-if="bookmarkedJobs.length === 0">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="show-results text-center">
                  <h5 class="text-dark mb-0 pt-2 f-18">Bookmarked Jobs will appear here.</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 mt-2">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="show-results">
                <div class="float-left">
                  <h5 class="text-dark mb-0 pt-2 f-18" v-if="bookmarkedJobs.length !== 0">Showing results: {{ bookmarkedJobs.length }} Bookmarked Jobs</h5>
                </div>
              </div>
            </div>
          </div>
          <BookmarkCard
            v-for="bookmarkedJob in bookmarkedJobs" :key="bookmarkedJob.id"
            :bookmarkedJob="bookmarkedJob"
            @seeJobDetailsClick="handleSeeJobDetailsClick"
            @deleteBookmarkClick="handleDeleteBookmarkClick"
          ></BookmarkCard>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import PreLoader from '@/components/PreLoader.vue'
import Swal from 'sweetalert2'
import NavbarMenu from '@/components/NavbarMenu.vue'
import BookmarkCard from '@/components/BookmarkCard.vue'
export default {
  name: 'BookmarkPage',
  components: {
    BookmarkCard,
    NavbarMenu,
    PreLoader
  },
  methods: {
    handleSeeJobDetailsClick (jobId) {
      this.$router.push({ name: 'DetailPage', params: { id: jobId } })
    },
    handleDeleteBookmarkClick (bookmarkId) {
      this.$store.dispatch('deleteBookmark', bookmarkId)
        .then((response) => {
          if (response === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Bookmarked Job has been successfully deleted'
            })
          }
          this.$store.dispatch('getAllBookmarkedJobs')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    bookmarkedJobs () {
      return this.$store.state.bookmarkedJobs
    }
  },
  created () {
    this.$store.dispatch('getAllBookmarkedJobs')
      .then((response) => {
        this.$nextTick(function () {
          this.$store.commit('SET_PRELOADER_STATE', true)
        })
      })
  }
}
</script>

<style></style>
