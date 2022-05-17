<template>
    <div class="wrapper mt-5 mx-auto justify-content-center" id="login-page" style="width: 35vw">
        <div class="wrapper mt-5 mx-auto logo-login-page">
            <i class='bx bxs-briefcase logo-login-page'></i>
            <span class="logo-name-login-page">Kerjapedia - CMS</span>
        </div>
        <h1 class="mb-2 text-center">Login</h1>
        <div class="form-text mb-4 text-center">
            Welcome back to Kerjapedia - CMS <br>
            We're excited to see you again!
        </div>

        <LoginForm
            @loginSubmit="loginSubmit"
        ></LoginForm>

        <div class="form-text text-center">
            Need an account?
            <a @click.prevent="registerLinkClick" href="" id="register-link">Register Here!</a>
            <div>Or sign in with your Google Account below</div><br>
            <div class="d-flex justify-content-center">
            
            <GoogleLogin
                :params="params" 
                :renderParams="renderParams"
                :onSuccess="onSuccess"
                :onFailure="onFailure"
            ></GoogleLogin>
            </div>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import LoginForm from '../components/LoginForm.vue';
export default {
    name:'App',
    components: {
        GoogleLogin,
        LoginForm
    },
    data() {
        return {
            params: {
                client_id: '553482291950-s0loq14spp777ne6480gfrdlqch4sa7k.apps.googleusercontent.com'
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: false
            }
        }
    },
    methods: {
        loginSubmit(userCredentials) {
            this.$emit('loginSubmit', userCredentials);
        },
        registerLinkClick() {
            this.$emit('registerLinkClick')
        },
        onSuccess(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;

            this.$emit('googleLoginOnSuccess', id_token);
        },
        onFailure(err) {
            console.log(err);
        }
    }
}
</script>

<style>

</style>
