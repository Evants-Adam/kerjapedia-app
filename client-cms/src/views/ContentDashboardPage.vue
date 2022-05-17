<template>
    <div class="container-fluid">
        <div>
            <p class="fw-bold fs-2">All Job Vacancies<p>
        </div>
        
        <table class="table table-striped ">
            <thead>
                <tr class="justify-content-center">
                    <th class="col text-center" scope="col">No</th>
                    <th class="col-1 text-center" scope="col">Job Title</th>
                    <th class="col-6 text-center" scope="col">Description</th>
                    <th class="col-1 text-center" v-if="userProfile.role === 'Admin'" scope="col">Status</th>
                    <th class="col-1 text-center" scope="col">Company Image</th>
                    <th class="col-1 text-center" scope="col">Company Name</th>
                    <th class="col text-center" scope="col">Job Type</th>
                    <th class="col-1 text-center" scope="col">Posting Date</th>
                    <th class="col text-center" scope="col">Action</th>
                </tr>
            </thead>

            <JobVacanciesTable v-for="(jobVacancy, index) in listJobVacancies" :key="jobVacancy.id" 
                :jobVacancy="jobVacancy"
                :userProfile="userProfile"
                :index="index"
                :statusTypes="statusTypes"
                @editButtonClick="editButtonClick"
                @deleteButtonClick="deleteButtonClick"
                @changeStatusTriggered="changeStatusTriggered"
            ></JobVacanciesTable>

        </table>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import JobVacanciesTable from '../components/JobVacanciesTable.vue';
export default {
    name: 'ContentDashboardPage',
    props: ['listJobVacancies', 'userProfile', 'statusTypes'],
    components: {
        Navbar,
        JobVacanciesTable
    },
    methods: {
        editButtonClick(id) {
            this.$emit('editButtonClick', id);
        },
        deleteButtonClick(id) {
            this.$emit('deleteButtonClick', id);
        },
        changeStatusTriggered(id, newStatus) {
            this.$emit('changeStatusTriggered', id, newStatus);
        }
    }
}
</script>

<style scoped src="../css/style.css">
 
</style>