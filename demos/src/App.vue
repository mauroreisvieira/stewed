<template>
    <div class="app">
        <topbar logo="./assets/images/logo.png" />
        <main class="main" @click="hideSidebar">
            <div class="container">
                <sidebar :menus="menus" />
                <router-view :key="$route.fullPath"/>
            </div>
        </main>
    </div>
</template>

<script>
    import topbar from './layout/topbar.vue'
    import sidebar from './layout/sidebar.vue'

    export default {
        name: 'app',
        components: { topbar, sidebar },
        data() {
            return {
                menus: this.$store.state.menus
            }
        },
        methods: {
            hideSidebar(ev) {
                const sidebar = document.querySelector('.sidebar');
                const article = document.querySelector('.article');
                sidebar.classList.remove('is-visible');
                article.classList.remove('is-overlay');
            }
        }
    }
</script>

<style lang="scss">
  @import "./../styles/app.scss";
</style>
