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
                markdown: undefined
            }
        },
        mounted() {
            const file = this.$route.path + '/README.md';
            const md = new Remarkable({
                langPrefix: 'hljs language-'
            });
            Utils.readFile(file, (responseText) => {
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
                [...this.$el.querySelectorAll('pre.language-html')].map(e => {
                    const demo = document.createElement('div');
                    demo.innerHTML = e.textContent;
                    demo.classList.add('demo');
                    parentDiv.insertBefore(demo, e);
                })

                const jsDemo = this.$el.querySelector('.language-js');
                if (jsDemo) {
                    const newScript = document.createElement("script");
                    const inlineScript = document.createTextNode(jsDemo.textContent);
                    newScript.appendChild(inlineScript);
                    document.body.appendChild(newScript);
                }
            }
        }
    }
</script>
<style lang="css">
@import "./../../assets/prism/prism.css";
</style>


