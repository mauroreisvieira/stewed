<template>
    <div class="sidebar">
        <div class="sidebar__section" v-for="(menu, index) in this.menus" :key="index" v-if="menu.isActive">
            <p class="sidebar__title uppercase"><strong>{{menu.name}}</strong></p>
            <ul class="navigation" >
                <li class="navigation__item"  v-for="(link, index) in menu.data" :key="index">
                    <router-link :to="'/' + link.url" :title="link.title" class="navigation__link">{{ link.title }}</router-link>
                </li>
            </ul>
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
