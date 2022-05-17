<template>
    <div
    class="wrapper mt-5 mx-auto"
    id="create-a-job-vacancy-page"
    style="width: 35vw"
    >
        <h1 class="mb-3 text-center">Edit a Job Vacancy</h1>
        <br/>

        <JobVacancyForm
            @jobVacancySubmit="jobVacancySubmit"
            @cancelJobVacancyClick="cancelJobVacancyClick"
            :chosenJobDetailsToEdit="chosenJobDetailsToEdit"
            :listCompanies="listCompanies"
            :jobTypes="jobTypes"
        ></JobVacancyForm>
    </div>
</template>

<script>
import JobVacancyForm from '../components/JobVacancyForm.vue';
export default {
    name: 'EditJobVacancyPage',
    props: ['chosenJobDetailsToEdit', 'listCompanies', 'jobTypes'],
    components: {
        JobVacancyForm
    },
    methods: {
        cancelJobVacancyClick() {
            this.$emit('cancelJobVacancyClick');
        },
        jobVacancySubmit(editedJobVacancy) {
            this.$emit('editJobVacancySubmit', editedJobVacancy);
        }
    }
}
</script>

<style>

</style>