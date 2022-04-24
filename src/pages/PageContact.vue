<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-6 text-justify q-pl-lg">
        <h4 class="text-center">Contato</h4>
        <q-card class="q-pa-lg">
          <q-form @submit="send">
            <q-input outlined label="Email" v-model="state.email" :rules="[(val) => validation.emailValidator(val)]"/>
            <q-select outlined :options="motivations" label="Motivo do contato" v-model="state.motivation" :rules="[(val) => val ? null : 'Selecione um motivo']" />
            <q-input outlined label="Mensagem" v-model="state.body" :rules="[(val) => val ? null : 'Escreva uma mensagem']" type="textarea"/>
            <q-btn v-if="state.loading" color="primary" class="full-width">
              <q-circular-progress indeterminate color="white" size="20px"/>
            </q-btn>
            <q-btn v-else label="Enviar" color="primary" class="full-width" type="submit"/>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IContact } from "src/models/modelContact";
import { Validations } from "src/utils/validations";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PageContact extends Vue {
  motivations: string[] = ["BUG", "FEEDBACK", "SUGESTÕES"];
  validation = new Validations()
  state: IContact = this.$store.state.contact;

  send() {
    this.$store.dispatch('contact/send')
  }
}
</script>
