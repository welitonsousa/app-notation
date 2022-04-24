<template>
  <div class="row justify-center q-ma-md">
    <div>
      <h4>Recupere sua senha</h4>


      <q-card class="q-pa-lg text-right">
        <p v-if="state.step == 0" class="text-center">
          Enviaremos um código único de verificação de conta através do seu
          email
        </p>
        <p v-if="state.step == 1" class="text-center">
          Enviamos um código único para o seu email
        </p>
        <p v-if="state.step == 2" class="text-center">
          Escreva sua nova senha
        </p>
        <q-form @submit="() => validStep()">
          <q-stepper
            v-model="state.step"
            ref="stepper"
            color="primary"
            animated
            flat
          >
            <q-step
              :name="0"
              title="Email"
              icon="email"
              :done="state.step == 0"
            >
              <step-email />
            </q-step>
            <q-step
              :name="1"
              title="Código"
              icon="https"
              :done="state.step == 1"
            >
              <step-code />
            </q-step>
            <q-step
              :name="2"
              title="Senha"
              icon="password"
              :done="state.step == 2"
            >
              <step-pass />
            </q-step>
          </q-stepper>
          <div class="q-pr-lg">

          <q-btn
            v-if="state.loading"
            color="primary"
            type="submit"
          >
            <q-circular-progress indeterminate color="white" size="20px" />
          </q-btn>
          <q-btn
            v-else
            label="Próximo"
            color="primary"
            type="submit"
          />
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { IResetModel } from "src/models/modelReset";
import { Vue, Component } from "vue-property-decorator";
import { Validations } from "../../utils/validations";

import StepEmail from "./step/StepEmail.vue";
import StepCode from "./step/StepCode.vue";
import StepPass from "./step/StepNewPass.vue";

@Component({ components: { StepEmail, StepCode, StepPass } })
export default class PageReset extends Vue {
  validations = new Validations();
  state: IResetModel = this.$store.state.reset;

  validStep() {
    this.$store.dispatch("reset/validStep");
  }
}
</script>
