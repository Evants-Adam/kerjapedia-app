<template>
    <tbody>
        <tr>
            <td class="col">{{ index + 1 }}</td>
            <td class="col">{{ formattedDate }}</td>
            <td class="col">{{ log.name }}</td>
            <td class="col-6">{{ log.description }}</td>
            <td class="col">Changes done by {{ log.User.email }}</td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: 'LogsTable',
    props: ['log', 'index'],
    computed: {
        formattedDate() {
            let options = { year:'numeric', month:'long', day:'numeric'};
            
            return new Date(this.log.createdAt).toLocaleDateString('en-US', options);
        }
    }
}
</script>

<style>

</style>