<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper">
                <div class="header__button" ref="nav-button" @click="showSidebar">
                    <svg class="nav-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </div>
                <div class="header__logo">Stewed <span class="version tag tag--primary">v{{ version }}</span></div>
                <div class="textfield textfield--shaped">
                    <input type="text" name="textfield-2" class="textfield__control" placeholder="Search the docs..." disabled />
                </div>
            </div>
            <navigation />
        </div>
    </header>
</template>

<script>
    import { Utils } from '../helpers/utils.js'
    import navigation from './navigation.vue'
    export default {
        components: { navigation },
        data: function () {
            return {
                version: undefined,
                calendar: undefined,
                file: undefined
            }
        },
        mounted() {
            this.file = window.location.origin + window.location.pathname + 'package.json';
            Utils.readFile('package.json', (responseText) => {
                const { version } = JSON.parse(responseText);
                this.version = version;
            });
        },
        methods: {
            showSidebar() {
                const sidebar = document.querySelector('.sidebar');
                const article = document.querySelector('.article');
                sidebar.classList.toggle('is-visible');
                article.classList.toggle('is-overlay');
            }
        }
    }
</script>
