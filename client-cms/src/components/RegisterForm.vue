<template>
    <form @submit.prevent="registerSubmit" class="mb-5" id="register-form">
        <div class="mb-3">
            <label for="register-username" class="form-label">Username</label>
            <input v-model="newUserCredentials.username" type="text" class="form-control" id="register-username" />
        </div>
        <div class="mb-3">
            <label for="register-email" class="form-label">Email</label>
            <input v-model="newUserCredentials.email" type="email" class="form-control" id="register-email" />
        </div>
        <div class="mb-3">
            <label for="register-password" class="form-label">Password</label>
            <input v-model="newUserCredentials.password" 
                type="password"
                class="form-control"
                id="register-password"
            />
        </div>
        <div class="mb-3">
            <label for="register-phoneNumber" class="form-label">Phone Number</label>
            <input v-model="newUserCredentials.phoneNumber" type="text" class="form-control" id="register-phoneNumber" />
        </div>
        <div class="mb-3">
            <label for="register-address" class="form-label">Address</label>
            <input v-model="newUserCredentials.address" type="text" class="form-control" id="register-address" />
        </div>
        <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
        return {
            newUserCredentials: {
                username: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: ''
            }
        }
    },
    methods: {
        registerSubmit() {
            this.$emit('registerSubmit', this.newUserCredentials);
        }
    }
}
</script>

<style>

</style>