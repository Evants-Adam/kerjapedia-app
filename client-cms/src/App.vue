<template>
    <div>
        <Navbar v-if="page !== 'loginPage' && page !== 'registerPage'"
            @homePageClick="handleHomePageClick"
            @createJobVacancyClick="handleCreateJobVacancyClick"
            @logsPageClick="handleLogsPageClick"
            @logOutClick="handleLogOutClick"
            :userProfile="userProfile"
        ></Navbar>

        <LoginPage v-show="page === 'loginPage'"
            @loginSubmit="handleLoginSubmitted"
            @registerLinkClick="handleRegisterLinkClicked"
            @googleLoginOnSuccess="googleLoginOnSuccess"
        ></LoginPage>

        <RegisterPage v-if="page === 'registerPage'"
            @registerSubmit="handleNewUserRegister"
            @loginLinkClick="handleLoginRedirectClicked"
        ></RegisterPage>
        
        <ContentDashboardPage v-if="page === 'contentDashboardPage'" 
            :userProfile="userProfile"
            :listJobVacancies="listJobVacancies"
            @editButtonClick="handleEditButtonClicked"
            @deleteButtonClick="handleDeleteButtonClicked"
            @changeStatusTriggered="handleChangeStatus"
            :statusTypes="statusTypes"
        ></ContentDashboardPage>

        <LogsPage v-if="page === 'logsPage'" 
            :listLogs="listLogs"
        ></LogsPage>

        <CreateJobVacancyPage v-if="page === 'createJobVacancyPage'" 
            @createJobVacancySubmit="handleCreateJobVacancySubmit"
            @cancelJobVacancyClick="handleCancelJobVacancyClicked"
            :listCompanies="listCompanies" 
            :jobTypes="jobTypes"
        ></CreateJobVacancyPage>

        <EditJobVacancyPage v-if="page === 'editJobVacancyPage'"
            @editJobVacancySubmit="handleEditJobVacancySubmitted"
            @cancelJobVacancyClick="handleCancelJobVacancyClicked"
            :chosenJobDetailsToEdit="chosenJobDetailsToEdit"
            :listCompanies="listCompanies"
            :jobTypes="jobTypes"
        ></EditJobVacancyPage>
    </div>
</template>

<script>
// ## -- Start of Import Components & Views -- ## //
import Navbar from './components/Navbar.vue';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ContentDashboardPage from './views/ContentDashboardPage.vue';
import LogsPage from './views/LogsPage.vue';
import CreateJobVacancyPage from './views/CreateJobVacancyPage.vue';
import EditJobVacancyPage from './views/EditJobVacancyPage.vue';
import Swal from 'sweetalert2';
// ## -- End of Import Components & Views -- ## //

export default {
    name: 'App',
    data() {
        return {
            page: 'loginPage',
            serverUrl: "https://kerjapedia.herokuapp.com",
            listJobVacancies: [],
            listLogs: [],
            listCompanies: [],
            jobTypes: [
                {id: 1, type: 'Full-time'}, 
                {id: 2, type: 'Part-time'}
            ],
            statusTypes: [
                {id: 1, status: 'Active'},
                {id: 2, status: 'Inactive'},
                {id: 3, status: 'Archived'}
            ],
            chosenJobDetailsToEdit : {},
            userProfile: {},
        }
    },
    components: {
        Navbar,
        LoginPage,
        RegisterPage,
        ContentDashboardPage,
        LogsPage,
        CreateJobVacancyPage,
        EditJobVacancyPage
    },
    methods: {
        // ## -- Start of Function Change Page -- ##
        changePage(page) {
            switch(page) {
                case 'loginPage':
                    break;
                case 'contentDashboardPage':
                    this.getCurrentUserProfile();
                    this.getAllJobVacancies();
                    break;
                case 'logsPage':
                    this.getAllLogs();
                    break;
                case 'createJobVacancyPage':
                    this.getAllCompanies();
                    break;
                case 'editJobVacancyPage':
                    this.getAllCompanies();
                    break;
            }
            this.page = page;
        },
        handleLogsPageClick() {
            this.changePage('logsPage');
        },
        handleHomePageClick() {
            this.changePage('contentDashboardPage');
        },
        // ## -- End of Function Change Page -- ##

        // ## -- Start of GET User, Job, Companies, and Logs -- ##
        getCurrentUserProfile() {
            fetch(`${this.serverUrl}/users`, {
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(data => this.userProfile = data)
            .catch(err => console.log(err))
        },
        getAllJobVacancies() {
            fetch(`${this.serverUrl}/jobs`, {
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(data => this.listJobVacancies = data)
            .catch(err => console.log(err))
        },
        getAllLogs() {
            fetch(`${this.serverUrl}/logs`, {
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(data => this.listLogs = data)
            .catch(err => console.log(err))
        },
        getAllCompanies() {
            fetch(`${this.serverUrl}/companies`, {
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(data => this.listCompanies = data)
            .catch(err => console.log(err))
        },
        // ## -- End of GET User, Job, Companies, and Logs -- ##

        // ## -- Start of Login/Logout, Register, and Google SignIn -- ##
        handleLoginRedirectClicked() {
            this.changePage('loginPage');
        },
        handleLoginSubmitted(userCredentials) {
            fetch(`${this.serverUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userCredentials.email,
                    password: userCredentials.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(!data.access_token) {
                    this.messagePopup('error', data.messages);
                } else {
                    localStorage.setItem('access_token', data.access_token);        
                    userCredentials.email = ""
                    userCredentials.password = ""
                    this.changePage('contentDashboardPage');
                }
            })
            .catch(err => console.log(err))
        },
        handleLogOutClick() {
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {});

            localStorage.removeItem('access_token');
            this.changePage('loginPage');
        },
        handleRegisterLinkClicked() {
            this.changePage('registerPage');
        },
        handleNewUserRegister(newUserCredentials) {
            fetch(`${this.serverUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUserCredentials.username,
                    email: newUserCredentials.email,
                    password: newUserCredentials.password,
                    phoneNumber: newUserCredentials.phoneNumber,
                    address: newUserCredentials.address
                })
            })
            .then(response => response.json())
            .then(data => {
                if (!data.messages.id) {
                    this.messagePopup('error', data.messages);
                } else {
                    this.messagePopup('success', 'Register success!');
                    this.changePage('loginPage');
                }
            })    
            .catch(err => console.log(err))
        },
        googleLoginOnSuccess(id_token) {
            fetch(`${this.serverUrl}/login/google-sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_token
                })
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                this.changePage('contentDashboardPage');
            })
            .catch(err => console.log(err))
        },
        // ## -- End of Login/Logout, Register, and Google SignIn -- ##

        // ## -- Start of Function Create Job Vacancy -- ##
        handleCreateJobVacancyClick() {
            this.changePage('createJobVacancyPage');
        },
        handleCreateJobVacancySubmit(newJobVacancyDetails) {
            const { title, description, CompanyId, jobType } = newJobVacancyDetails;
            
            fetch(`${this.serverUrl}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    title, description, CompanyId, jobType
                })
            })
            .then(response => response.json())
            .then(data => {
                if (!data.id) {
                    this.messagePopup('error', data.messages);
                } else {
                    this.messagePopup('success', 'Create New Job Vacancy Success!');
                    this.changePage('contentDashboardPage');
                }
            })
            .catch(err => console.log(err))
        },
        handleCancelJobVacancyClicked() {
            this.changePage('contentDashboardPage');
        },
        // ## -- End of Function Create Job Vacancy -- ##

        // ## -- Start of Function Edit Job Vacancy -- ##
        handleEditButtonClicked(id) {
            fetch(`${this.serverUrl}/jobs/${id}`, {
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(data => {
                this.chosenJobDetailsToEdit = data;
                this.changePage('editJobVacancyPage');
            })
        },
        handleEditJobVacancySubmitted(editedJobVacancy) {
            const { id, title, description, CompanyId, jobType } = editedJobVacancy;

            fetch(`${this.serverUrl}/jobs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    title, description, CompanyId, jobType
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.messages) {
                    this.messagePopup('error', data.messages);
                } else {
                    this.messagePopup('success', 'Edit success!');
                    this.changePage('contentDashboardPage');
                }
            })
            .catch(err => console.log(err))
        },
        // ## -- End of Function Edit Job Vacancy -- ##

        // ## -- Start of Function Delete Job Vacancy -- ##
        handleDeleteButtonClicked(id) {
            fetch(`${this.serverUrl}/jobs/${id}`, {
                method: 'DELETE',
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(data => {
                this.messagePopup('success', 'Job Vacancy Successfully Deleted!');
                this.getAllJobVacancies();
            })
            .catch(err => console.log(err))
        },
        // ## -- End of Function Delete Job Vacancy -- ##

        // ## -- Start of Function Change Status Job Vacancy -- ##
        handleChangeStatus(id, status) {
            fetch(`${this.serverUrl}/jobs/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    status
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.messages) {
                    this.messagePopup('error', data.messages);
                } else {
                    this.messagePopup('success', 'Status successfully changed');
                    this.getAllJobVacancies();
                }
            })
            .catch(err => console.log(err))
        },
        // ## -- End of Function Change Status Job Vacancy -- ##

        // ## -- Start of Function Message Pop Up by Sweet Alert 2 -- ##
        messagePopup(status, messages) {
            switch (status) {
                case 'success':
                    Swal.fire({
                        icon: 'success',
                        title: 'Nice',
                        text: `${messages}`
                    })
                    break;
                case 'error':
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${messages}`
                    })
                    break;
                case 'forbidden':
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... You cannot do that'
                    })
                    break;
            }
        },
        // ## -- End of Function Message Pop Up by Sweet Alert 2 -- ##
    },
    created() {
        // ## -- Check if Current User still Login -- ##
        if (!localStorage.getItem('access_token')) {
            this.changePage('loginPage')
        } else {
            this.changePage('contentDashboardPage')
        }
    }
}
</script>

<style>

</style>