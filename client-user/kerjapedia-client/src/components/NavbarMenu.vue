<template>
  <header id="topnav" class="defaultscroll scroll-active active scroll">
    <div class="container">
      <div>
        <a class="logo">
            <img src="../assets/logo-color-kerjapedia-01.png" alt="" class="logo-dark" height="50" />
        </a>
      </div>
      <div class="buy-button">
        <a v-if="isLogin === false" @click.prevent="handleSignInClick" href="" class="btn btn-primary">Sign in / Sign Up</a>
        <a v-else @click.prevent="handleSignOutClick" href="" class="btn btn-primary">Sign Out</a>
      </div>
      <div class="menu-extras">
        <div class="menu-item">
          <a class="navbar-toggle navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" @handleToggleClick="handleToggleClick">
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
      </div>
      <div id="navigation">
        <ul class="navigation-menu .collapse.navbar-collapse">
          <li class="has-submenu">
            <a href="" @click.prevent="handleJobClick">Jobs List</a>
          </li>
          <li class="has-submenu">
            <a href="" @click.prevent="handleBookmarkClick">Saved Jobs</a>
          </li>
          <li>
            <a v-if="isLogin === true">Logged as {{ getUserProfileEmail }}</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'NavbarMenu',
  computed: {
    isLogin () {
      if (localStorage.getItem('access_token')) {
        return true
      } else {
        return false
      }
    },
    getUserProfileEmail () {
      return this.$store.state.userProfileEmail
    }
  },
  methods: {
    handleSignInClick () {
      this.$router.push({ path: 'login' })
    },
    handleJobClick () {
      this.$router.push({ path: '/home', query: { page: 1 } })
    },
    handleSignOutClick () {
      this.$store.dispatch('signOutSubmit')
        .then((response) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Signed out successfully'
          })
          this.$router.push({ name: 'LandingPage' })
        })
    },
    handleBookmarkClick () {
      this.$router.push({ name: 'BookmarkPage' })
    },
    handleToggleClick (event) {
      const toggle = document.querySelector('.navbar-toggle.navbar-toggler')

      if (toggle.classList.contains('open')) {
        toggle.classList.remove('open')
      } else {
        toggle.classList.add('open')
      }
    }
  }
}
</script>

<style>
 #topnav {
   max-width: 100%;
 }
</style>
