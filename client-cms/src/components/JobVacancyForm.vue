<template>
      <form @submit.prevent="jobVacancySubmit">
        <div class="mb-3">
            <label for="create-a-job-vacancy-title" class="form-label">Job Position</label>
            <input type="text" class="form-control" v-model="jobVacancyDetails.title"/>
        </div>
        <div class="mb-3">
            <label for="create-a-job-vacancy-description" class="form-label"
            >Job Description/Function</label>
            <input type="text" class="form-control" v-model="jobVacancyDetails.description"/>
        </div>
        <div class="mb-3">
            <label for="create-a-job-vacancy-CompanyId" class="form-label">Job Company Placement</label>
            <select id="inputState create-a-job-vacancy-CompanyId" class="form-control" v-model="jobVacancyDetails.CompanyId">
                <option value="" disabled>--- Select Company ---</option>
                <option v-for="company in listCompanies" :key="company.id" :value="company.id">{{ company.name }}</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="create-a-job-vacancy-type" class="form-label"
            >Job Employment Type</label>
            <select id="inputState create-a-job-vacancy-type" class="form-control" v-model="jobVacancyDetails.jobType">
                <option value="" disabled>--- Select Job Type ---</option>
                <option v-for="el in jobTypes" :key="el.id" :value="el.type">{{ el.type }}</option>
            </select>
        </div>
        <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary mx-1">Submit</button>
            <button @click.prevent="cancelJobVacancyClick" class="btn btn-danger mx-1" id="create-a-job-vacancy-cancel">
            Cancel
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'jobVacancyForm',
    props: ['chosenJobDetailsToEdit', 'listCompanies', 'jobTypes'],
    data() {
        return {
            jobVacancyDetails: {
                id: "",
                title: "",
                description: "",
                CompanyId: "",
                jobType: ""
            }
        }
    },
    methods: {
        jobVacancySubmit() {
            this.$emit('jobVacancySubmit', this.jobVacancyDetails);
        },
        cancelJobVacancyClick() {
            this.$emit('cancelJobVacancyClick');
        }
    },
    created() {
        if (this.chosenJobDetailsToEdit) {
            this.jobVacancyDetails.id = this.chosenJobDetailsToEdit.id;
            this.jobVacancyDetails.title = this.chosenJobDetailsToEdit.title;
            this.jobVacancyDetails.description = this.chosenJobDetailsToEdit.description;
            this.jobVacancyDetails.CompanyId = this.chosenJobDetailsToEdit.CompanyId;
            this.jobVacancyDetails.jobType = this.chosenJobDetailsToEdit.jobType;
        }
    }
}
</script>

<style>

</style>