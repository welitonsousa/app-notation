import { Router } from 'src/router'
import { Vue } from 'vue-property-decorator'


const state = () => ({
	user: {},
	token: ''
})

const actions = {

	async getUser({ commit }: any) {
		const { data } = await Vue.prototype.$axios.get('/user/me')
		commit('setUser', data)
	},

	async login({ commit }: any, payload: any) {
		const { data } = await Vue.prototype.$axios.post("/sign", {
			email: payload.email,
			password: payload.password,
		});
		commit('setUser', data)
		commit('setToken', data.token)
	},

	async changePicture({ commit }: any, form: any) {
		const { data } = await Vue.prototype.$axios.put("/user/picture", form, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		commit('setPicture', data.picture)
	}
}

const mutations = {

	initUser(store: any) {
		const user = localStorage.user || '{}'
		const token = localStorage.token || ''
		store.user = JSON.parse(user)
		store.token = token
	},

	setUser(state: any, payload: any) {
		localStorage.setItem("user", JSON.stringify(state.user));
		state.user = {
			user: payload.user,
			picture: payload.picture
		}
	},

	setPicture(state: any, picture: string) {
		state.user.picture = picture
		localStorage.setItem("user", JSON.stringify(state.user))
	},

	setToken(state: any, token: string) {
		localStorage.setItem("token", token);
		state.token = token
	},

	logout(state: any) {
		state.user = {}
		state.token = ''
		localStorage.clear();
    Router.push({name: 'initial'})
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}
