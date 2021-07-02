<template>
  <div class="text-center">
    <div class="q-pa-md" />
    <div class="row">
      <div class="col" />
      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="title">Contate-nos</div>
          <q-form @submit="sendMessage">
            <div class="column">
              <q-input
                v-model="name"
                outlined
                label="Nome de usuário"
                :rules="[(val) => !!val || 'Nome inválido']"
              />
              <q-input
                v-model="email"
                outlined
                label="Email"
                :rules="[(val) => validations.emailValidator(val)]"
              />

              <q-input
                v-model="text"
                outlined
                label="Texto"
                type="text"
                autogrow
                :rules="[(val) => !!val || 'Campo inválido']"
              />
              <q-btn v-if="loading" color="primary">
                <q-circular-progress indeterminate color="white" size="20px" />
              </q-btn>
              <q-btn v-else color="primary" type="submit" label="Confirmar" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
      <div class="col" />
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Validations } from "src/utils/validations";

@Component
export default class Home extends Vue {
  name = "";
  email = "";
  text = "";
  validations = new Validations();

  loading = false;
  async sendMessage() {
    if (!this.loading) {
      this.loading = true;
      await setTimeout(() => {
        this.loading = false;
        this.$router.push({ name: "home" });
        this.$q.notify({ message: "Mensagem enviada", color: "green" });
      }, 2000);
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 40px;
}
</style>