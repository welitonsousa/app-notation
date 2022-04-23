<template>
  <div>

    <q-input
      v-model="state.email"
      label="Email"
      outlined
      :rules="[(val) => validations.emailValidator(val)]"
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
