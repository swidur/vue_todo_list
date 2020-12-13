import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faTrashAlt, faPlus, faMinus, faCheck, faPencilAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VModal from 'vue-js-modal';

Vue.use(VModal, { dialog: true });


/*
By default, the plugin will use "modal" name for the component.
If you need to change it, you can do so by providing "componentName" param.

Example:

Vue.use(VModal, { componentName: "foo-modal" })
...
<foo-modal name="bar"></foo-modal>
*/

library.add(faCoffee);
library.add(faTrashAlt);
library.add(faPlus);
library.add(faMinus);
library.add(faCheck);
library.add(faPencilAlt);
library.add(faUndoAlt);


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

export const eventBus = new Vue(); // added line

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
