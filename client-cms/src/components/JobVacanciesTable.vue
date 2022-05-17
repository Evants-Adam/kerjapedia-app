<template>
    <tbody>
        <tr v-if="jobVacancy.status !== 'Archived'">
            <td class="col text-center">{{ index + 1 }}</td>
            <td class="col-1 text-center">{{ jobVacancy.title }}</td>
            <td class="col-6">{{ jobVacancy.description }}</td>
            <td class="col-1 text-center" v-if="userProfile.role === 'Admin'">
                <select id="inputState" class="form-control" @change="changeStatusTriggered(jobVacancy.id)" v-model.lazy="jobVacancy.status">
                    <option class="text-center" v-for="status in statusTypes" :key="status.id"
                    :selected="jobVacancy.status === status.status">{{ status.status }}
                    </option>
                </select>
            </td>
            <td class="col-1 text-center">{{ jobVacancy.Company.companyLogo }}</td>
            <td class="col-1 text-center">{{ jobVacancy.Company.name }}</td>
            <td class="col text-center">{{ jobVacancy.jobType }}</td>
            <td class="col-1 text-center">{{ formattedDate }}</td>
            <td class="col text-center">
            <div v-if="userProfile.role === 'Admin' || userProfile.id === jobVacancy.UserId" class="btn-group">
                <button class="badge bg-success" @click.prevent="editButtonClick(jobVacancy.id)">Edit</button>
                <button class="badge bg-danger" @click.prevent="deleteButtonClick(jobVacancy.id)">Delete</button>
            </div>
            </td>
        </tr>
        <tr v-else-if="userProfile.role === 'Admin'">
            <td class="col text-center">{{ index + 1 }}</td>
            <td class="col-1 text-center">{{ jobVacancy.title }}</td>
            <td class="col-6">{{ jobVacancy.description }}</td>
            <td class="col-1 text-center" v-if="userProfile.role === 'Admin'">
                <select id="inputState" class="form-control" @change="changeStatusTriggered(jobVacancy.id)" v-model.lazy="jobVacancy.status">
                    <option class="text-center" v-for="status in statusTypes" :key="status.id"
                    :selected="jobVacancy.status === status.status">{{ status.status }}
                    </option>
                </select>
            </td>
            <td class="col-1 text-center">{{ jobVacancy.Company.companyLogo }}</td>
            <td class="col-1 text-center">{{ jobVacancy.Company.name }}</td>
            <td class="col text-center">{{ jobVacancy.jobType }}</td>
            <td class="col-1 text-center">{{ formattedDate }}</td>
            <td class="col text-center">
            <div v-if="userProfile.role === 'Admin' || userProfile.id === jobVacancy.UserId" class="btn-group">
                <button class="badge bg-success" @click.prevent="editButtonClick(jobVacancy.id)">Edit</button>
                <button class="badge bg-danger" @click.prevent="deleteButtonClick(jobVacancy.id)">Delete</button>
            </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: 'JobVacanciesTable',
    props: ['jobVacancy', 'userProfile', 'index', 'statusTypes'],
    methods: {
        editButtonClick(id) {
            this.$emit('editButtonClick', id);
        },
        deleteButtonClick(id) {
            this.$emit('deleteButtonClick', id);
        },
        changeStatusTriggered(id) {
            this.$emit('changeStatusTriggered', id, this.jobVacancy.status);
        }
    },
    computed: {
        formattedDate() {
            let options = { year:'numeric', month:'long', day:'numeric'};
            
            return new Date(this.jobVacancy.createdAt).toLocaleDateString('en-US', options);
        }
    }
}
</script>

<style>

</style>