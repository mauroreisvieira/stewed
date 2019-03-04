<template>
    <header class="header">
        <div class="logo">Stewed <span class="version">v{{ version }}</span></div>
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
