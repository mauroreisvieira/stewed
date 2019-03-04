<template>
    <nav class="nav">
        <ul class="menu">
            <li class="menu__item"><router-link to="/" class="menu__link">Home</router-link></li>
            <li class="menu__item"><a href="https://codeload.github.com/maurovieirareis/stewed/zip/master" class="menu__link" title="Download" download>Download</a></li>
            <li class="menu__item"><a href="https://github.com/maurovieirareis/stewed" class="menu__link" target="_blank">GitHub</a></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        data: function () {
            return {
                file: undefined,
                markdown: undefined
          }
        }
    }
</script>
