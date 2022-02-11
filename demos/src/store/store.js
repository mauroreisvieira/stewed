import Vue from 'vue';
import Vuex from 'vuex';
import Route from './../config.route.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        menus: Route
    }
});
