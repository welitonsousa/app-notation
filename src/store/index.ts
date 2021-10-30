import user from './modules/ModelUser';
import { Vue } from 'vue-property-decorator'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user
	}
})