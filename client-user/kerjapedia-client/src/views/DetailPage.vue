<template>
  <section>
    <PreLoader></PreLoader>
    <NavbarMenu></NavbarMenu>
    <section class="section pt-0 mt-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="section-title text-center mb-4 pb-2">
                <h4 class="title title-line">See Job Details</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-6 pt-2">
              <div class="job-detail border rounded p-4">
                <div class="job-detail-content">
                    <img src="../assets/images/featured-job/img-1.png" alt="" class="img-fluid float-left mr-md-3 my-3 mr-2 mx-auto d-inline-block">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item f-15">
                      <span class="badge badge-success" v-if="getJobDetails.jobType === 'Part-time'">{{ getJobDetails.jobType }}</span>
                      <span class="badge badge-info" v-else>{{ getJobDetails.jobType }}</span>
                    </li>
                    <li class="list-inline-item float-right">
                      <div class="grid-fev-icon">
                        <a href="" class="text-danger" @click.prevent="handleBookmarkClick"><i class="mdi mdi-heart"></i></a>
                      </div>
                    </li>
                  </ul>
                  <div class="job-detail-com-desc overflow-hidden d-block">
                    <h4 class="mb-2"><a href="" class="text-dark">{{ getJobDetails.title }}</a></h4>
                    <p class="text-muted mb-0"><i class="mdi mdi-link-variant mr-2"></i>{{ getJobDetails.Company.name }}</p>
                    <p class="text-muted mb-0"><i class="mdi mdi-map-marker mr-2"></i>{{ getJobDetails.Company.location }}</p>
                  </div>
                </div>
                <div class="job-detail-desc mt-4">
                  <p class="text-muted mb-3">{{ getJobDetails.description }}</p>
                </div>
                <div class="job-detail-desc mt-4">
                  <div class="job-details-desc-item">
                    <div class="float-left mr-3">
                      <i class="mdi mdi-send text-primary"></i>
                    </div>
                    <p class="text-muted mb-2"><span class="fw-bold">About the Company : </span><br>{{ getJobDetails.Company.description }}</p>
                  </div>
                  <div class="job-details-desc-item">
                      <div class="float-left mr-3">
                        <i class="mdi mdi-send text-primary"></i>
                      </div>
                      <p class="text-muted mb-2"><span class="fw-bold">Posting Date : </span><br>{{ formattedDate }}</p>
                  </div>
                  <div class="job-details-desc-item">
                      <div class="float-left mr-3">
                        <i class="mdi mdi-send text-primary"></i>
                      </div>
                      <p class="text-muted mb-2"><span class="fw-bold">Contact Us at (With CV and Cover Letter): </span><br>{{ getJobDetails.Company.email }}</p>
                  </div>
                  <div class="job-details-desc-item">
                      <div class="float-left mr-3">
                        <i class="mdi mdi-send text-primary"></i>
                      </div>
                      <p class="text-muted mb-2"><span class="fw-bold">QR Code: </span><br><img :src="QRCode" alt="" srcset=""></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
import NavbarMenu from '@/components/NavbarMenu.vue'
import PreLoader from '@/components/PreLoader.vue'
export default {
  name: 'DetailPage',
  data () {
    return {
      QRCode: '',
      load: false
    }
  },
  methods: {
    handleBookmarkClick () {
      this.$store.dispatch('postBookmark', this.getJobDetails.id)
        .then((data) => {
          if (!data.messages) {
            this.$store.commit('SET_BOOKMARKED_JOBS', data)
            Swal.fire({
              icon: 'success',
              title: 'Job has been added to bookmark successfully!'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Opss...',
              text: data.messages[0]
            })
          }
        })
        .catch((error) => console.log(error))
    }
  },
  components: {
    NavbarMenu,
    PreLoader
  },
  computed: {
    getJobDetails () {
      return this.$store.state.detailJob
    },
    formattedDate () {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(this.getJobDetails.createdAt).toLocaleDateString('en-US', options)
    }
  },
  created () {
    this.$store.dispatch('getDetailedJobData', this.$route.params.id)
      .then(() => {
        this.$store.dispatch('getQRCode').then((response) => {
          this.QRCode = response.qrcode
          this.$nextTick(function () {
            this.$store.commit('SET_PRELOADER_STATE', true)
          })
        })
      })
  }
}
</script>

<style></style>
