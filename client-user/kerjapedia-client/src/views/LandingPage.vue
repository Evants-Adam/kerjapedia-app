<template>
  <div>
    <PreLoader></PreLoader>
    <NavbarMenu></NavbarMenu>
    <section class="bg-home">
    <div class="bg-overlay"></div>
    <div class="home-center">
      <div class="home-desc-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="title-heading text-center text-white">
                <h6 class="small-title text-uppercase text-light mb-3">Find jobs, create trackable resumes and enrich your applications.</h6>
                <h1 class="heading font-weight-bold mb-4">The Easiest Way to Get Your New Job</h1>
              </div>
            </div>
          </div>
          <div class="home-form-position">
            <div class="row">
              <div class="col-lg-12">
                <div class="home-registration-form p-4 mb-3">
                  <form class="registration-form" @submit.prevent="handleSearchLandingPageSubmit">
                    <div class="row">
                      <div class="col-lg-4 col-md-6">
                        <div class="registration-form-box">
                          <i class='bx bxs-briefcase'></i>
                          <input type="text" id="exampleInputName1" class="form-control rounded registration-input-box" placeholder="Search by Job Title or Position..">
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <div class="registration-form-box">
                          <i class='bx bxs-buildings'></i>
                          <input type="text" id="exampleInputName1" class="form-control rounded registration-input-box" placeholder="Search by Company Name..">
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <div class="registration-form-box">
                          <input type="submit" id="submit" class="submitBnt btn btn-primary btn-block" value="Submit">
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    <JobShowCaseLandingPage></JobShowCaseLandingPage>
    <FooterSection></FooterSection>
  </div>
</template>

<script>
import PreLoader from '@/components/PreLoader.vue'
import Swal from 'sweetalert2'
import NavbarMenu from '@/components/NavbarMenu.vue'
import JobShowCaseLandingPage from '@/components/landing-page-components/JobShowCaseLandingPage.vue'
import FooterSection from '@/components/FooterSection.vue'
export default {
  name: 'LandingPage',
  components: {
    NavbarMenu,
    JobShowCaseLandingPage,
    FooterSection,
    PreLoader
  },
  methods: {
    handleSearchLandingPageSubmit () {
      this.$router.push({ name: 'Login' })
      Swal.fire({
        icon: 'warning',
        title: 'You have to login to continue..'
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.commit('SET_PRELOADER_STATE', true)
    })
  }
}
</script>

<style>
</style>
