<template>
    <div class="container-fluid">
        <div>
            <p class="fw-bold fs-2">Log History<p>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="col" scope="col">No</th>
                    <th class="col" scope="col">Date & Time</th>
                    <th class="col" scope="col">Action</th>
                    <th class="col-6" scope="col">Description</th>
                    <th class="col" scope="col">Updated By</th>
                </tr>
            </thead>

            <LogsTable v-for="(log, index) in reversedData" :key="log.id" 
                :log="log"
                :index="index"
            ></LogsTable>
        </table>
    </div>
</template>

<script>
import LogsTable from '../components/LogsTable.vue';
export default {
    name: 'LogsPage',
    props: ['listLogs', 'index'],
    components: {
        LogsTable
    },
    computed: {
        reversedData() {
            return this.listLogs.slice().reverse();
        }
    }
}
</script>

<style>

</style>