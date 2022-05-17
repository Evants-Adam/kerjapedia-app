import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverUrl: 'https://kerjapedia.herokuapp.com',
    happiAPIKey: 'c53f4fm8FnuaTtfq7EAXHn2d4061gg0XPdz1oRuZQhVL8assSNYfl5Oc',
    currentPage: 0,
    jobVacancies: [],
    bookmarkedJobs: [],
    jobsLandingPage: [],
    totalPages: 0,
    totalItems: 0,
    userProfileEmail: '',
    detailJob: [],
    QRCodeData: '',
    preLoaderState: false
  },
  mutations: {
    SET_JOB_VACANCIES (state, listJobs) {
      state.jobVacancies = listJobs
    },
    SET_BOOKMARKED_JOBS (state, listBookmarkedJobs) {
      state.bookmarkedJobs = listBookmarkedJobs
    },
    SET_CURRENT_PAGE (state, page) {
      state.currentPage = page
    },
    SET_TOTAL_PAGES (state, pages) {
      state.totalPages = pages
    },
    SET_TOTAL_ITEMS (state, items) {
      state.totalItems = items
    },
    SET_JOBS_LANDING_PAGE (state, payload) {
      state.jobsLandingPage = payload
    },
    SET_USER_PROFILE_EMAIL (state, payload) {
      state.userProfileEmail = payload
    },
    SET_DETAIL_JOB (state, payload) {
      state.detailJob = payload
    },
    SET_QRCODE_DATA (state, payload) {
      state.QRCodeData = `Job Title: ${payload.title}, Job Description: ${payload.description}, Company Name: ${payload.Company.name}, Contact: ${payload.Company.email}`
    },
    SET_PRELOADER_STATE (state, payload) {
      state.preLoaderState = payload
    }
  },
  actions: {
    getAllJobVacancies (context, { page, name, company }) {
      if (name || company) {
        return fetch(`${this.state.serverUrl}/public/jobs?page=${page}&name=${name}&company=${company}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then((response) => response.json())
          .then((data) => {
            context.commit('SET_JOB_VACANCIES', data.jobs)
            context.commit('SET_CURRENT_PAGE', data.currentPage)
            context.commit('SET_TOTAL_PAGES', data.totalPages)
            context.commit('SET_TOTAL_ITEMS', data.totalItems)
          })
          .catch((error) => console.log(error))
      } else {
        return fetch(`${this.state.serverUrl}/public/jobs?page=${page}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then((response) => response.json())
          .then((data) => {
            context.commit('SET_JOB_VACANCIES', data.jobs)
            context.commit('SET_CURRENT_PAGE', data.currentPage)
            context.commit('SET_TOTAL_PAGES', data.totalPages)
            context.commit('SET_TOTAL_ITEMS', data.totalItems)
          })
          .catch((error) => console.log(error))
      }
    },
    getDetailedJobData (context, id) {
      return fetch(`${this.state.serverUrl}/public/jobs/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_DETAIL_JOB', data)
          context.commit('SET_QRCODE_DATA', data)
        })
        .catch((error) => console.log(error))
    },
    getAllBookmarkedJobs (context) {
      return fetch(`${this.state.serverUrl}/public/bookmark`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_BOOKMARKED_JOBS', data)
        })
        .catch((error) => console.log(error))
    },
    getJobsLandingPage (context) {
      return fetch(`${this.state.serverUrl}/landing-page-assets`)
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_JOBS_LANDING_PAGE', data)
        })
        .catch((error) => console.log(error))
    },
    getUserProfile (context) {
      return fetch(`${this.state.serverUrl}/public/users`, {
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_USER_PROFILE_EMAIL', data.email)
        })
        .catch((error) => console.log(error))
    },
    postBookmark (context, jobId) {
      return fetch(`${this.state.serverUrl}/public/bookmark/${jobId}`, {
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    deleteBookmark (context, bookmarkId) {
      return fetch(`${this.state.serverUrl}/public/bookmark/${bookmarkId}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    signInSubmit (context, customerCredentials) {
      return fetch(`${this.state.serverUrl}/public/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerCredentials)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    registerSubmit (context, newCustomerCredentials) {
      return fetch(`${this.state.serverUrl}/public/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomerCredentials)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    signOutSubmit (context) {
      return localStorage.removeItem('access_token')
    },
    googleSignInSubmit (context, googleUserIdToken) {
      return fetch(`${this.state.serverUrl}/public/login/google-sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: googleUserIdToken })
      })
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err))
    },
    getQRCode () {
      return fetch(`https://api.happi.dev/v1/qrcode?data=${this.state.QRCodeData}`, {
        headers: {
          width: 128,
          dots: '000000',
          bg: 'FFFFFF',
          'x-happi-key': this.state.happiAPIKey,
          'Content-Length': `${this.state.QRCodeData.length}`
        }
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    }
  },
  modules: {
  }
})
