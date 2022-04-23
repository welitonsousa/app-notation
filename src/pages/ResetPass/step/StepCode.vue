<template>
  <div>
    <q-input
      v-model="state.code"
      label="Código"
      outlined
      :rules="[(val) => val.length === 5 ? null: 'Código inválido']"
    />
  </div>
</template>


<script lang="ts">
import { IResetModel } from 'src/models/modelReset'
import { Validations } from 'src/utils/validations'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class CodeStep extends Vue{
  validations = new Validations()
  state: IResetModel = this.$store.state.reset
}
</script>

