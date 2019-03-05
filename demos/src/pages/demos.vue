<template>
    <div class="article">
        <div class="content" v-html="markdown"></div>
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
                markdown: undefined,
                calendar: undefined
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
                    this.createDemo();
                });
            });
        },
        methods: {
            createDemo() {
                const hedingDemo = this.$el.querySelector('h3');
                const parentDiv = hedingDemo.parentNode;
                const htmlDemo = this.$el.querySelector('.language-html').textContent;
                const demo = document.createElement('div');
                demo.innerHTML = htmlDemo;
                demo.classList.add('demo');
                parentDiv.insertBefore(demo, hedingDemo);
            }
        }
    }
</script>
<style lang="css">
@import "./../../assets/prism/prism.css";
</style>


