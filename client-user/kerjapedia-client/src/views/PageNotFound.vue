<template>
  <div>
    <section class="bg-404">
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6 mt-5">
                    <div class="text-center fw-bold mt-5">
                      <h2>Page Not Found</h2>
                      <h6>Oopss.. the page you were looking for is not available.</h6>
                        <a href="" class="badge badge-success align-middle" @click.prevent="handleBackHomeClick"><i class='bx bxs-left-arrow-circle align-middle'></i>Click Here to Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  methods: {
    handleBackHomeClick () {
      if (!localStorage.getItem('access_token')) {
        this.$router.push({ name: 'LandingPage' })
      } else {
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style>
  .bg-404 {
    height: 100vh;
    background: url('../assets/404-image-01.png');
    padding: 300px 0px 175px 0px;
    background-size: cover;
    position: relative;
    background-position: center center;
  }
</style>
