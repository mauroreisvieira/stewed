<template>
    <div class="article">
        <div class="content">
            <div class="content" v-html="markdown"></div>
            <div class="demo-color">
                <div class="demo-color-list" v-for="color in palette">
                    <div class="demo-color-item" v-for="tone in tones">
                        <div class="demo-color-preview" :style="'color: var(--color-' + color + '-' + tone + ')'"></div>
                        <div class="demo-color-info">{{color}}-{{tone}}</div>
                    </div>
                </div>
            </div>
        </div>
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
                palette: ["primary", "accent", "grayscale", "warning", "danger", "info", "success"],
                tones: ["lighter", "light", "base", "dark", "darker"],
                markdown: undefined
            }
        },
        mounted() {
            const file = this.$route.path + '/../src/theme/THEME.md';
            const md = new Remarkable({
                langPrefix: 'hljs language-'
            });
            Utils.readFile(file, (responseText) => {
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
