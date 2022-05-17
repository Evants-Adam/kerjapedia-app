<template>
  <div>
    <PreLoader></PreLoader>
    <NavbarMenu></NavbarMenu>
    <section class="bg-half page-next-level">
    <div class="bg-overlay"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center text-white">
            <h4 class="text-uppercase title mb-4">Welcome to Kerjapedia!</h4>
            <p>Find your fit below, or start by searching here!</p>
          </div>
        </div>
      </div>
      <div class="home-form-position">
        <div class="row">
          <div class="col-lg-12">
            <div class="home-registration-form p-4 mb-3">
              <form @submit.prevent="handleSearchSubmit" class="registration-form">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <div class="registration-form-box">
                      <i class='bx bxs-briefcase'></i>
                      <input type="text" id="exampleInputName1" class="form-control rounded registration-input-box" placeholder="Search by Job Title or Position.." v-model="searchValue.jobTitle">
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="registration-form-box">
                      <i class='bx bxs-buildings'></i>
                      <input v-model="searchValue.companyName"
                      type="text" id="exampleInputName1" class="form-control rounded registration-input-box" placeholder="Search by Company Name.." >
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="registration-form-box">
                      <input type="submit" id="submit" name="send" class="submitBnt btn btn-primary btn-block" value="Submit">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="section-title text-center pb-2">
              <h4 class="title title-line pb-5">Available Jobs for you</h4>
              <div v-if="queries.name.length > 0 || queries.company.length > 0">Current Filter:
                <span @click.prevent="handleNameFilterClick" class="badge badge-success mr-1" v-if="queries.name.length > 0"> Job Title: {{ queries.name }} </span>
                <span @click.prevent="handleCompanyFilterClick" class="badge badge-success" v-if="queries.company.length > 0"> Company Name: {{ queries.company }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 pt-2">
            <div class="row align-items-center">
              <div class="col-lg-12">
                <div class="show-results">
                  <div class="float-left">
                    <h5 class="text-dark mb-0 pt-2 f-18">Showing results {{ startIndex }} - {{ currentIndex }} of {{ totalItems }} total jobs</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="row">
            <HomePageJobCard
              v-for="(jobVacancy, index) in jobVacancies" :key="jobVacancy.id"
              :jobVacancy="jobVacancy"
              :index="index"
              @handleBookmarkClick="handleBookmarkClick"
            ></HomePageJobCard>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mt-4 pt-2">
            <nav aria-label="Page navigation example">
              <ul class="pagination job-pagination mb-0 justify-content-center">
                <li class="page-item" v-if="currentPage > 1">
                  <a class="page-link" href="" @click.prevent="changePagePreviousClick" tabindex="-1" aria-disabled="true">
                    <i class="mdi mdi-chevron-double-left f-15"></i>
                  </a>
                </li>
                <PaginationButtonHome
                v-for="(page, index) in totalPages"
                :key="index"
                :page="page"
                @handlePageClick="handlePageClick"
                ></PaginationButtonHome>
                <li class="page-item" v-if="currentPage < totalPages">
                  <a class="page-link" href="" @click.prevent="changePageNextClick">
                    <i class="mdi mdi-chevron-double-right f-15"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <FooterSection></FooterSection>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import PaginationButtonHome from '@/components/home-page-components/PaginationButtonHome.vue'
import NavbarMenu from '@/components/NavbarMenu.vue'
import HomePageJobCard from '@/components/home-page-components/HomePageJobCard.vue'
import FooterSection from '@/components/FooterSection.vue'
import PreLoader from '@/components/PreLoader.vue'
export default {
  name: 'HomePage',
  data () {
    return {
      queries: {
        name: '',
        company: ''
      },
      searchValue: {
        jobTitle: '',
        companyName: ''
      }
    }
  },
  components: {
    PaginationButtonHome,
    NavbarMenu,
    HomePageJobCard,
    FooterSection,
    PreLoader
  },
  methods: {
    changePagePreviousClick () {
      if (this.currentPage === 1 || this.currentPage < 0) {
        if (this.queries.name || this.queries.company) {
          this.$router.push({ path: 'home', query: { page: this.currentPage, name: this.queries.name, company: this.queries.company } })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.queries.name, company: this.queries.company })
        } else {
          this.$router.push({ path: 'home', query: { page: this.currentPage } })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page })
        }
      } else {
        this.$store.commit('SET_CURRENT_PAGE', (this.currentPage - 1))
        if (this.queries.name || this.queries.company) {
          this.$router.push({ path: 'home', query: { page: this.currentPage, name: this.queries.name, company: this.queries.company } })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.queries.name, company: this.queries.company })
        } else {
          this.$router.push({ path: 'home', query: { page: this.currentPage } }).catch(error => {
            if (
              error.name !== 'NavigationDuplicated' &&
              !error.message.includes('Avoided redundant navigation to current location')
            ) {
              console.log(error)
            }
          })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page })
        }
      }
    },
    changePageNextClick () {
      if (this.currentPage === this.totalPages || this.currentPage > this.totalPages) {
        if (this.queries.name || this.queries.company) {
          this.$router.push({ path: 'home', query: { page: this.currentPage, name: this.queries.name, company: this.queries.company } })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.queries.name, company: this.queries.company })
        } else {
          this.$router.push({ path: 'home', query: { page: this.currentPage } })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page })
        }
      } else {
        this.$store.commit('SET_CURRENT_PAGE', (this.currentPage + 1))
        if (this.queries.name || this.queries.company) {
          this.$router.push({ path: 'home', query: { page: this.currentPage, name: this.queries.name, company: this.queries.company } })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.queries.name, company: this.queries.company })
        } else {
          this.$router.push({ path: 'home', query: { page: this.currentPage } }).catch(error => {
            if (
              error.name !== 'NavigationDuplicated' &&
              !error.message.includes('Avoided redundant navigation to current location')
            ) {
              console.log(error)
            }
          })
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page })
        }
      }
    },
    handleBookmarkClick (jobId) {
      this.$store.dispatch('postBookmark', jobId)
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
    },
    handlePageClick (page) {
      this.$store.commit('SET_CURRENT_PAGE', page)
      if (this.queries.name || this.queries.company) {
        this.$router.push({ path: 'home', query: { page: this.currentPage, name: this.queries.name, company: this.queries.company } }).catch(error => {
          if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes('Avoided redundant navigation to current location')
          ) {
            console.log(error)
          }
        })
        this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.queries.name, company: this.queries.company })
      } else {
        this.$router.push({ path: 'home', query: { page: this.currentPage } }).catch(error => {
          if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes('Avoided redundant navigation to current location')
          ) {
            console.log(error)
          }
        })
        this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page })
      }
      window.scrollTo(0, 425)
    },
    handleNameFilterClick () {
      this.queries.name = ''

      this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.queries.name, company: this.queries.company })

      this.$router.push(`/home?page=1&name=${this.queries.name}&company=${this.queries.company}`)
    },
    handleCompanyFilterClick () {
      this.queries.company = ''

      this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.queries.name, company: this.queries.company })

      this.$router.push(`/home?page=1&name=${this.queries.name}&company=${this.queries.company}`)
    },
    handleSearchSubmit () {
      this.$emit('handleSearchSubmit', this.searchValue.jobTitle, this.searchValue.companyName)
      this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.searchValue.jobTitle, company: this.searchValue.companyName })

      this.$router.push(`/home?page=1&name=${this.searchValue.jobTitle}&company=${this.searchValue.companyName}`).catch(error => {
        if (
          error.name !== 'NavigationDuplicated' &&
          !error.message.includes('Avoided redundant navigation to current location')
        ) {
          console.log(error)
        }
      })
      if (this.searchValue.jobTitle.length > 0) {
        this.searchValue.jobTitle = ''
      }
      if (this.searchValue.companyName.length > 0) {
        this.searchValue.companyName = ''
      }
    }
  },
  computed: {
    jobVacancies () {
      return this.$store.state.jobVacancies
    },
    currentPage () {
      return this.$store.state.currentPage
    },
    totalPages () {
      return this.$store.state.totalPages
    },
    totalItems () {
      return this.$store.state.totalItems
    },
    currentIndex () {
      if (this.currentPage > 1 && this.currentPage * 9 < this.totalItems) {
        return this.jobVacancies.length * this.currentPage
      } else if (this.currentPage > 1 && this.currentPage * 9 > this.totalItems) {
        return this.jobVacancies.length + ((this.currentPage - 1) * 9)
      } else {
        return this.jobVacancies.length
      }
    },
    startIndex () {
      if (this.currentPage > 1 && this.currentPage * 9 < this.totalItems) {
        return (this.jobVacancies.length * (this.currentPage - 1)) + 1
      } else if (this.currentPage > 1 && this.currentPage * 9 > this.totalItems) {
        return ((this.currentPage - 1) * 9) + 1
      } else if (this.jobVacancies.length === 0) {
        return 0
      } else {
        return 1
      }
    }
  },
  watch: {
    '$route.query.page': {
      handler (newPage) {
        this.$store.dispatch('getAllJobVacancies', { page: newPage, name: this.$route.query.name, company: this.$route.query.company })
      }
    },
    '$route.query.name': {
      handler (newValue) {
        if (newValue.length > this.queries.name.length) {
          this.queries.name = newValue
        }
      }
    },
    '$route.query.company': {
      handler (newValue) {
        if (newValue.length > this.queries.company.length) {
          this.queries.company = newValue
        }
      }
    }
  },
  created () {
    this.$store.dispatch('getUserProfile')
      .then((response) => {
        if (!this.$route.query.page) {
          this.$store.dispatch('getAllJobVacancies', { page: 1 })
            .then((response) => {
              this.$nextTick(function () {
                this.$store.commit('SET_PRELOADER_STATE', true)
              })
            })
        } else if (this.$route.query.name || this.$route.query.company) {
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page, name: this.$route.query.name, company: this.$route.query.company })
            .then((response) => {
              this.$nextTick(function () {
                this.$store.commit('SET_PRELOADER_STATE', true)
              })
            })
        } else {
          this.$store.dispatch('getAllJobVacancies', { page: this.$route.query.page })
            .then((response) => {
              this.$nextTick(function () {
                this.$store.commit('SET_PRELOADER_STATE', true)
              })
            })
        }
      })
  }
}
</script>

<style></style>
