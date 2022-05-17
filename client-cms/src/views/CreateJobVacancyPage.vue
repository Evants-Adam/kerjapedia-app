<template>
    <div
    class="wrapper mt-5 mx-auto"
    id="create-a-job-vacancy-page"
    style="width: 35vw"
    >
        <h1 class="mb-3 text-center">Create a Job Vacancy</h1>
        <br/>

        <JobVacancyForm
            @jobVacancySubmit="jobVacancySubmit"
            :listCompanies="listCompanies"
            :jobTypes="jobTypes"
            @cancelJobVacancyClick="cancelJobVacancyClick"
        ></JobVacancyForm>
    </div>
</template>

<script>
import JobVacancyForm from '../components/JobVacancyForm.vue';
export default {
    name: 'CreateJobVacancyPage',
    props: ['listCompanies', 'jobTypes'],
    components: {
        JobVacancyForm
    },
    methods: {
        jobVacancySubmit(newJobVacancyDetails) {
            this.$emit('createJobVacancySubmit', newJobVacancyDetails);
        },
        cancelJobVacancyClick() {
            this.$emit('cancelJobVacancyClick');
        }
    }
}
</script>

<style>

</style>