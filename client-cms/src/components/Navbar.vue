<template>
    <section class="content-dashboard">
        <div class="sidebar">
            <div class="logo-sidebar">
                <i class='bx bxs-briefcase'></i>
                <span class="logo-name">Kerjapedia - CMS</span>
            </div>
        </div>
        <nav>
            <div class="sidebar-button">
                <div class="d-flex justify-content-center">
                    <a id="menu-link" href="" @click.prevent="homePageClicked">
                        <i class='bx bx-grid-alt' ></i>
                        <span class="menu-name">Dashboard</span>
                    </a>
                    <a id="menu-link" href=""  @click.prevent="createJobVacancyClicked">
                        <i class='bx bx-food-menu' ></i>
                        <span class="menu-name">Create Job Vacancy</span>
                    </a>
                    <a id="menu-link" href="" @click.prevent="logsPageClicked">
                        <i class='bx bx-list-ul' ></i>
                        <span class="menu-name">Log History</span>
                    </a>

                    <a id="menu-link" href="" @click.prevent="logOutClicked">
                        <i class='bx bx-log-out' id="logout-btn"></i>
                        <span class="menu-name">Log out</span>
                    </a>
                </div>
            </div>
            <div id="profile-user" class="d-flex justify-content-end profile-details">
                <!-- <img src="images/profile.jpg" alt=""> -->
                <span class="username">Welcome to Kerjapedia, {{ userProfile.email }}!</span>
            </div>
        </nav>
    </section>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['userProfile'],
    methods: {
        homePageClicked() {
            this.$emit('homePageClick');
        },
        createJobVacancyClicked() {
            this.$emit('createJobVacancyClick');
        },
        logsPageClicked() {
            this.$emit('logsPageClick');
        },
        logOutClicked() {
            this.$emit('logOutClick');
        }
    },
}
</script>

<style>

</style>