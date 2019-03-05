<template>
    <div class="sidebar">
        <div class="sidebar__section" v-for="(menu, index) in this.menus" :key="index" v-if="menu.isActive">
            <p class="sidebar__title uppercase"><strong>{{menu.name}}</strong></p>
            <nav class="menu" role="menu" aria-hidden="true">
                <router-link class="menu__item"  v-for="(link, index) in menu.data" :key="index" :to="'/' + link.url" :title="link.title" >{{ link.title }}</router-link>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            menus: {
                type: Array
            }
        }
    }
</script>
