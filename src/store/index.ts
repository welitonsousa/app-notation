import user from './modules/ModelUser';
import reset from './modules/ModuleReset'
import { Vue } from 'vue-property-decorator'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
    reset,
	}
})
