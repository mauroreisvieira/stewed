<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="logo">Stewed <span class="version tag tag--primary">v{{ version }}</span></div>
            <div class="textfield textfield--shaped">
                <input type="text" name="textfield-2" class="textfield__control" placeholder="Search the docs..." disabled />
            </div>
        </div>
        <navigation />
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
        }
    }
</script>
