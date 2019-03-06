<template>
    <div class="article">
        <div class="content home" v-html="markdown"></div>
    </div>
</template>

<script>
    import Prism from 'prismjs'
    import Remarkable from 'remarkable'
    import { Utils } from '../helpers/utils.js'
    export default {
        data: function () {
            return {
                title: this.$route.name,
                file: undefined,
                markdown: undefined
            }
        },
        mounted() {
            const fiile = this.$route.path + '/README.md';
            const md = new Remarkable({
                langPrefix: 'hljs language-'
            });
            Utils.readFile(fiile, (responseText) => {
                this.markdown = md.render(responseText);
                this.$nextTick(function () {
                    Prism.highlightAll();
                });
            });
        }
    }
</script>
<style lang="css">
@import "./../../assets/prism/prism.css";
</style>


