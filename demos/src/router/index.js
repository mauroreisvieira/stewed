import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import demos from '../pages/demos.vue'
import { store } from '../store/store';

Vue.use(Router)

const routes = [];
routes.push({
    path: '/',
    name: 'home',
    component: home
});

store.state.menus.map(menu => {
    menu.data.map(link => {
        routes.push({
            path: link.url,
            name: link.title,
            component: demos
        })
    })
});

export default new Router({
    routes
})

