import user from './modules/ModuleUser';
import reset from './modules/ModuleReset'
import contact from './modules/ModuleContact'
import { Vue } from 'vue-property-decorator'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
    reset,
    contact,
	}
})
