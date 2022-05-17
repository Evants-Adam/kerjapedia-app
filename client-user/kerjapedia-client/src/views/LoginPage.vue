<template>
  <div>
    <PreLoader></PreLoader>
    <div class="back-to-home rounded d-none d-sm-block">
      <a href="" @click.prevent="handleHomeIconClick" class="text-white rounded d-inline-block text-center"><i class="mdi mdi-home"></i></a>
    </div>
    <section id="bg-login" class="vh-100">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6">
                <div class="login-page bg-white shadow rounded p-4">
                  <div class="text-center">
                    <h4 class="mb-4 fw-bold">Login Kerjapedia</h4>
                  </div>
                  <LoginForm
                    @signInSubmit="signInSubmit"
                    @signUpClick="handleSignUpClick"
                  ></LoginForm>
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
import PreLoader from '@/components/PreLoader.vue'
import Swal from 'sweetalert2'
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: {
    LoginForm,
    PreLoader
  },
  methods: {
    signInSubmit (customerCredentials) {
      this.$store.dispatch('signInSubmit', customerCredentials)
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token)
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
            this.$router.push({ name: 'Home' })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.messages
            })
          }
        })
        .catch((err) => console.log(err))
    },
    handleHomeIconClick () {
      this.$router.push('/')
    },
    handleSignUpClick  () {
      this.$router.push({ name: 'Register' })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.commit('SET_PRELOADER_STATE', true)
    })
  }
}
</script>

<style></style>
