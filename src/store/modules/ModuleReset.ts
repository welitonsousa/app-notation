import { IResetModel } from 'src/models/modelReset';
import { showMessage } from 'src/utils/MessageError';
import { Validations } from 'src/utils/validations';
import { Vue } from 'vue-property-decorator'
import {Router} from './../../router'

const state = (): IResetModel => ({
  step: 0,
  loading: false,
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
})

const actions = {
  async validStep(data: any) {
    data.state.loading = true
    switch (data.state.step) {
      case 0:
        await data.dispatch('__validateEmail')
        break;
      case 1:
        await data.dispatch('__validateCode')
        break;
      case 2:
        await data.dispatch('__resetPassword')
        break;
    }
    data.state.loading = false
  },

  async __validateEmail(data: any) {
    try {
      const res = await Vue.prototype.$axios.post("/send/code-pass", {
        email: data.state.email,
      });
      showMessage.success(res)
      data.state.step = 1
    } catch (error) {
      showMessage.error(error)
    }
  },
  async __validateCode(data: any) {
    try {

      const res = await Vue.prototype.$axios.post("/valide/code", {
        email: data.state.email,
        hash: data.state.code,
      });
      data.state.step = 2
      showMessage.success(res)
    } catch (error) {
      showMessage.error(error)
    }
  },
  async __resetPassword(data: any) {
    if (data.state.password === data.state.confirmPassword) {
      try {
        const res = await Vue.prototype.$axios.put("/reset/pass", {
          email: data.state.email,
          hash: data.state.code,
          password: data.state.password,
        });
        showMessage.success(res)
        data.state.step = 0
        data.state.code = ''
        data.state.password = ''
        data.state.confirmPassword = ''
        Router.push({name: 'home'})

      } catch (error) {
        showMessage.error(error)
      }
    }
  },
}

const mutations = {

}

export default {
	namespaced: true,
  state,
  actions,
  mutations,
}
