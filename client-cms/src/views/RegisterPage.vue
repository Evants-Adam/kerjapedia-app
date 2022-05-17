<template>
    <div class="wrapper mt-5 mx-auto" id="register-page" style="width: 35vw">
        <div class="wrapper mt-5 mx-auto logo-login-page">
            <i class='bx bxs-briefcase logo-login-page'></i>
            <span class="logo-name-login-page">Kerjapedia - CMS</span>
        </div>
        <h1 class="mb-1 text-center">Register</h1>
        <div class="form-text text-center">
            Create your account for free!<br>
            Or already have account? 
            <a 
            @click.prevent="loginLinkClick" 
            href="" id="login-link"
            >Login here!</a> 
        </div>
        <RegisterForm
            @registerSubmit="registerSubmit"
        ></RegisterForm>
    </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';
export default {
    name: 'RegisterPage',
    components: {
        RegisterForm
    },
    methods: {
        registerSubmit(newUserCredentials) {
            this.$emit('registerSubmit', newUserCredentials);
        },
        loginLinkClick() {
            this.$emit('loginLinkClick');
        }
    }
}
</script>

<style>

</style>