<template>
    <div class="article">
        <div class="content">
            <h2>Colors</h2>
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
    export default {
        data: function () {
            return {
                title: this.$route.name,
                palette: ["primary", "accent", "grayscale", "warning", "danger", "info", "success"],
                tones: ["lighter", "light", "base", "dark", "darker"]
            }
        }
    }
</script>
<style lang="css">
@import "./../../assets/prism/prism.css";
</style>


