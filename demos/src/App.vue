<template>
    <div class="app">
        <topbar logo="./assets/images/logo.png" />
        <main class="main">
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
        mounted() {
        }
    }
</script>

<style lang="scss">
  @import "./styles/app.scss";
</style>
