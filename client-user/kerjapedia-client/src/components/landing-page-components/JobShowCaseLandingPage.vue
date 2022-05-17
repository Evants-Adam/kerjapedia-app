<template>
 <div>
    <section class="section bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
              <div class="section-title text-center mb-4 pb-2">
                  <h4 class="title title-line pb-5">Find Your Jobs</h4>
                  <p class="text-muted para-desc mx-auto mb-1">Find your dream job here! Look at our latest job listing!</p>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="tab-content mt-2" id="pills-tabContent">
              <div class="tab-pane fade show active" id="recent-job" role="tabpanel" aria-labelledby="recent-job-tab">
                <div class="row">
                  <div class="col-lg-12">
                    <JobShowCaseCard
                      v-for="jobVacancy in jobVacanciesLandingPage"
                      :key="jobVacancy.id"
                      :jobVacancy="jobVacancy"
                    ></JobShowCaseCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import JobShowCaseCard from '@/components/landing-page-components/JobShowCaseCard.vue'
export default {
  name: 'JobShowCaseLandingPage',
  data () {
    return {
      polling: null
    }
  },
  components: {
    JobShowCaseCard
  },
  methods: {
    pollData () {
      this.polling = setInterval(() => {
        this.$store.dispatch('getJobsLandingPage')
      }, 5000)
    }
  },
  computed: {
    jobVacanciesLandingPage () {
      return this.$store.state.jobsLandingPage
    }
  },
  created () {
    this.$store.dispatch('getJobsLandingPage')
    this.pollData()
  },
  beforeDestroy () {
    clearInterval(this.polling)
  }
}
</script>

<style>
</style>
