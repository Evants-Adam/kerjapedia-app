<template>
    <form @submit.prevent="loginSubmit" class="mb-5" id="login-form">
        <div class="mb-3">
            <label for="login-email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="login-email" v-model="userCredentials.email">
        </div>
        <div class="mb-3">
            <label for="login-password" class="form-label">Password</label>
            <input type="password" class="form-control" id="login-password" v-model="userCredentials.password"/>
        </div>
        <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Sign In</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "LoginForm",
    data() {
        return {
            userCredentials: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        loginSubmit() {
            this.$emit('loginSubmit', this.userCredentials);
        }
    }
}
</script>

<style>

</style>