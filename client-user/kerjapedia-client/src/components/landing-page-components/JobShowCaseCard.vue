<template>
  <div>
    <div class="job-box bg-white overflow-hidden border rounded mt-4 position-relative overflow-hidden">
      <div class="lable text-center pt-2 pb-2">
        <ul class="list-unstyled best text-white mb-0 text-uppercase">
          <li class="list-inline-item"><i class="mdi mdi-star"></i></li>
        </ul>
      </div>
      <div class="p-4">
        <div class="row align-items-center">
          <div class="col-md-2">
            <div class="mo-mb-2">
              <img src="../../assets/images/featured-job/img-3.png" alt="" class="img-fluid mx-auto d-block">
            </div>
          </div>
          <div class="col-md-3">
            <div>
              <h5 class="f-18"><a href="" class="text-dark">{{ jobVacancy.title }}</a></h5>
              <p class="text-muted mb-0">{{ jobVacancy.Company.name }}</p>
            </div>
          </div>
          <div class="col-md-3">
            <div>
              <p class="text-muted mb-0"><i class="mdi mdi-map-marker text-primary mr-2"></i>{{ jobVacancy.Company.location }}</p>
            </div>
          </div>
          <div class="col-md-2">
          </div>
          <div class="col-md-2">
            <div>
              <p class="text-muted mb-0">{{ jobVacancy.jobType }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobShowCaseCard',
  props: ['jobVacancy']
}
</script>

<style>
</style>
