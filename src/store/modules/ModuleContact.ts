import { IContact } from "src/models/modelContact"
import { Router } from "src/router"
import { showMessage } from "src/utils/MessageError"
import { Vue } from 'vue-property-decorator'

const state: IContact = {
  email: '',
  body: '',
  motivation: '',
  loading: false,
}

const actions = {
  async send (data: any) {
    if (data.state.email && data.state.body && data.state.motivation) {
      try {
        data.state.loading = true
        const res = await Vue.prototype.$axios.post('/contact', data.state)
        Router.push({name: 'home'})
        showMessage.success(res)
        data.state.email = ''
        data.state.body = ''
        data.state.motivation = ''
      }catch(error){
        showMessage.error(error)
      }
      data.state.loading = false
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
}
