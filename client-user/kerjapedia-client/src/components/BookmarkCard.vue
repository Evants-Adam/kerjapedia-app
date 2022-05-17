<template>
  <div class="row">
    <div class="row">
      <div class="col-lg-12 mt-4 pt-2">
        <div class="job-list-box border rounded">
          <div class="p-3">
            <div class="row align-items-center">
              <div class="col-lg-2">
                <div class="company-logo-img">
                  <img src="../assets/images/featured-job/img-5.png" alt="" class="img-fluid mx-auto d-block">
                </div>
              </div>
              <div class="col-lg-7 col-md-9">
                <div class="job-list-desc">
                  <h6 class="mb-2"><a href="#" class="text-dark">{{ bookmarkedJob.Job.title }}</a></h6>
                  <p class="text-muted mb-0"><i class="mdi mdi-bank mr-2"></i>{{ bookmarkedJob.Job.Company.name }}</p>
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item mr-3">
                      <p class="text-muted mb-0"><i class="mdi mdi-map-marker mr-2"></i>{{ bookmarkedJob.Job.Company.location }}</p>
                    </li>
                    <li class="list-inline-item">
                      <p class="text-muted mb-0"><i class="mdi mdi-clock-outline mr-2"></i>{{ formattedDate }}</p>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-danger mb-2" v-if="bookmarkedJob.Job.status !== 'Active'">This Job is no longer accepting applications </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-3">
                <div class="job-list-button-sm text-right">
                  <span class="badge badge-success mb-2" v-if="bookmarkedJob.Job.jobType === 'Part-time'">{{ bookmarkedJob.Job.jobType }}</span>
                  <span class="badge badge-info mb-2" v-else>{{ bookmarkedJob.Job.jobType }}</span>
                  <div class="mt-1">
                    <a href="" class="btn btn-sm btn-primary" @click.prevent="seeJobDetailsClick">See Job Details</a>
                  </div>
                  <div class="mt-1">
                    <a href="" class="btn btn-sm btn-danger" @click.prevent="deleteBookmarkClick">Delete Bookmark</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookmarkCard',
  props: ['bookmarkedJob'],
  methods: {
    seeJobDetailsClick () {
      this.$emit('seeJobDetailsClick', this.bookmarkedJob.Job.id)
    },
    deleteBookmarkClick () {
      this.$emit('deleteBookmarkClick', this.bookmarkedJob.id)
    }
  },
  computed: {
    formattedDate () {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(this.bookmarkedJob.Job.createdAt).toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style></style>
