<template>
  <div>
    <form class="register-form" @submit.prevent="customerRegisterSubmit">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Username <span class="text-danger">*</span></label>
            <input type="text" class="form-control" placeholder="Username" required=""
            v-model="newCustomerCredentials.username">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Your Email <span class="text-danger">*</span></label>
            <input type="email" class="form-control" placeholder="Email" required=""
            v-model="newCustomerCredentials.email">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Password <span class="text-danger">*</span></label>
            <input type="password" class="form-control" placeholder="Password" required=""
            v-model="newCustomerCredentials.password">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Phone Number <span class="text-danger">*</span></label>
            <input type="text" class="form-control" placeholder="Phone Number" required=""
            v-model="newCustomerCredentials.phoneNumber">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Address <span class="text-danger">*</span></label>
            <input type="text" class="form-control" placeholder="Address" required=""
            v-model="newCustomerCredentials.address">
          </div>
        </div>
        <div class="col-md-12">
          <button class="btn btn-primary w-100">Register</button>
        </div>
        <div class="mx-auto text-center">
          <p class="mb-0 mt-3"><small class="text-dark mr-2">Already have an account ?</small> <a href="" @click.prevent="handleSignInLinkClick" class="text-dark fw-bold">Sign in</a></p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data () {
    return {
      newCustomerCredentials: {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  methods: {
    customerRegisterSubmit () {
      this.$emit('customerRegisterSubmit', this.newCustomerCredentials)
    },
    handleSignInLinkClick () {
      this.$emit('handleSignInClick')
    }
  }
}
</script>

<style></style>
