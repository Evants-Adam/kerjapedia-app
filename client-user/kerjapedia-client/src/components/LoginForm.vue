<template>
<div>
  <form class="login-form" @submit.prevent="signInSubmit">
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group position-relative">
          <label>Your Email <span class="text-danger">*</span></label>
          <input type="email" class="form-control" placeholder="Email" name="email" required=""
          v-model="customerCredentials.email">
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group position-relative">
          <label>Password <span class="text-danger">*</span></label>
          <input type="password" class="form-control" placeholder="Password" required=""
          v-model="customerCredentials.password">
        </div>
      </div>
      <div class="col-lg-12 mb-0">
        <button class="btn btn-primary w-100">Sign in</button>
      </div>
    </div>
  </form>
  <div class="col-lg-12 mt-4 text-center">
  <h6>Or Login With</h6>
    <ul class="list-unstyled social-icon mb-0 mt-3">
      <li class="list-inline-item">
      <GoogleLogin
      :params="params" :onSuccess="onSuccess" :onFailure="onFailure"
      class="list-inline-item rounded btn-light"
      ><i class="mdi mdi-google-plus" title="Google"></i></GoogleLogin>
      </li>
    </ul>
    <div class="col-12 text-center">
      <p class="mb-0 mt-3"><small class="text-dark mr-2">Don't have an account ?</small> <a href="" @click.prevent="handleSignUpClick" class="text-dark fw-bold">Sign Up</a></p>
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login'
export default {
  name: 'LoginForm',
  data () {
    return {
      customerCredentials: {
        email: '',
        password: ''
      },
      params: {
        client_id: '553482291950-s0loq14spp777ne6480gfrdlqch4sa7k.apps.googleusercontent.com'
      }
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    signInSubmit () {
      this.$emit('signInSubmit', this.customerCredentials)
    },
    handleSignUpClick () {
      this.$emit('signUpClick')
    },
    onSuccess (googleUser) {
      /* eslint-disable */
      const id_token = googleUser.getAuthResponse().id_token
      this.$store.dispatch('googleSignInSubmit', id_token)
        .then((data) => {
          if (data.access_token ) {
            localStorage.setItem('access_token', data.access_token)
            this.$router.push({ name: 'Home' })
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
              title: 'Signed in successfully'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You have to use another google account to register..'
            })
          }
        })
    },
    onFailure (err) {
      console.log(err)
    }
  }
}
</script>

<style>
  #bg-login {
    background: url('../assets/landing-page-image.jpg');
    background-size: cover;
  }
</style>
