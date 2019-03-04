import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        menus: [
            {
                name: 'Components',
                isActive: true,
                data: [
                    { url: '/src/components/alert/', title: 'Alert' },
                    { url: '/src/components/badge/', title: 'Badge' },
                    { url: '/src/components/breadcrumb/', title: 'Breadcrumb' },
                    { url: '/src/components/button/', title: 'Button' },
                    { url: '/src/components/card/', title: 'Card' },
                    { url: '/src/components/checkbox/', title: 'Checkbox' },
                    { url: '/src/components/grid/', title: 'Grid' },
                    { url: '/src/components/list/', title: 'List' },
                    { url: '/src/components/progress/', title: 'Progress' },
                    { url: '/src/components/radio/', title: 'Radio' },
                    { url: '/src/components/select/', title: 'Select' },
                    { url: '/src/components/switch/', title: 'Switch' },
                    { url: '/src/components/table/', title: 'Table' },
                    { url: '/src/components/tag/', title: 'Tag' },
                    { url: '/src/components/textfield/', title: 'Textfield' },
                    { url: '/src/components/tooltip/', title: 'Tooltip' },
                    { url: '/src/components/typography/', title: 'Typography' }
                ]
            }
        ]
    }
});
