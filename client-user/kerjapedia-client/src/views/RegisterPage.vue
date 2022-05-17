<template>
  <div>
    <PreLoader></PreLoader>
    <div class="back-to-home rounded d-none d-sm-block">
      <a href="" @click.prevent="handleHomeClick" class="text-white rounded d-inline-block text-center"><i class="mdi mdi-home"></i></a>
    </div>
    <section id="bg-register" class="vh-100">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="login_page bg-white shadow rounded p-4">
                  <div class="text-center">
                    <h4 class="mb-4">Sign Up Kerjapedia</h4>
                  </div>
                  <RegisterForm
                    @customerRegisterSubmit="customerRegisterSubmit"
                    @handleSignInClick="handleSignInClick"
                  ></RegisterForm>
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
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  name: 'RegisterPage',
  components: {
    RegisterForm,
    PreLoader
  },
  methods: {
    customerRegisterSubmit (newCustomerCredentials) {
      this.$store.dispatch('registerSubmit', newCustomerCredentials)
        .then((data) => {
          if (data.messages.id || data.messages.email) {
            Swal.fire({
              icon: 'success',
              title: 'Register Success!'
            })
            this.$router.push({ path: 'login' })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.messages
            })
          }
        })
        .catch((error) => console.log(error))
    },
    handleSignInClick () {
      this.$router.push({ path: 'login' })
    },
    handleHomeClick () {
      this.$router.push({ path: '/' })
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
  #bg-register {
    background: url('../assets/landing-page-image.jpg');
    background-size: cover;
  }
</style>
