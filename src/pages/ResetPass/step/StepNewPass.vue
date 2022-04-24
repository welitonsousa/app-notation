<template>
  <div>
    <q-input
      v-model="state.password"
      label="Nova senha"
      type="password"
      outlined
      :rules="[(val) => validations.passwordValidator(val)]"
    />
    <q-input
      v-model="state.confirmPassword"
      label="Confirme a senha"
      type="password"
      outlined
      :rules="[(val) => validations.confirmPasswordValidator(state.password, state.confirmPassword)]"
    />
  </div>
</template>


<script lang="ts">
import { IResetModel } from 'src/models/modelReset'
import { Validations } from 'src/utils/validations'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class EmailStep extends Vue{
  validations = new Validations()
  state: IResetModel = this.$store.state.reset
}
</script>

