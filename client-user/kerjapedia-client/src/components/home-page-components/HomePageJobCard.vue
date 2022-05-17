<template>
  <div class="col-lg-4 col-md-6 mt-4 pt-2">
    <div class="list-grid-item rounded">
      <div class="grid-item-content p-3">
        <ul class="list-inline mb-0">
          <li class="list-inline-item f-15">
            <span class="badge badge-success" v-if="jobVacancy.jobType === 'Part-time'">{{ jobVacancy.jobType }}</span>
            <span class="badge badge-info" v-else>{{ jobVacancy.jobType }}</span>
          </li>
          <li class="list-inline-item float-right">
            <div class="grid-fev-icon">
              <a href="" @click.prevent="handleBookmarkClick" class="text-danger"><i class="mdi mdi-heart"></i></a>
            </div>
          </li>
        </ul>
        <div class="grid-list-img mt-3">
          <img src="../../assets/images/featured-job/img-5.png" alt="" class="img-fluid d-block">
        </div>
        <div class="grid-list-desc mt-3">
          <h5 class="mb-1"><a href="" @click.prevent="handleJobClick"  class="text-dark">{{ jobVacancy.title }}</a></h5>
          <p class="text-muted f-14 mb-1">{{ jobVacancy.Company.name }}</p>
          <p class="text-muted mb-1">{{ jobVacancy.Company.location }}</p>
        </div>
      </div>
      <div class="apply-button p-3 border-top">
        <a href="" @click.prevent="handleApplyClick" class="btn btn-primary btn-sm">See Details</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePageJobCard',
  props: ['jobVacancy', 'index'],
  methods: {
    handleJobClick () {
      this.$router.push(`/detail/${this.jobVacancy.id}`)
    },
    handleApplyClick () {
      this.$router.push(`/detail/${this.jobVacancy.id}`)
    },
    handleBookmarkClick () {
      this.$emit('handleBookmarkClick', this.jobVacancy.id)
    }
  }
}
</script>

<style>
</style>
