<template>
    <nav class="topbar">
        <ul class="topbar__menu">
            <li class="topbar__item"><router-link to="/" class="topbar__link">Home</router-link></li>
            <li class="topbar__item"><a href="https://codeload.github.com/maurovieirareis/stewed/zip/master" class="topbar__link" title="Download" download>Download</a></li>
            <li class="topbar__item"><a href="https://github.com/maurovieirareis/stewed" class="topbar__link" target="_blank">GitHub</a></li>
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
