<template>
  <div class="text-center">
    <div class="q-pa-md" />
    <div class="row">
      <div class="col" />
      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="title">Cadastro</div>
          <q-form @submit="create">
            <div class="column">
              <q-input
                v-model="name"
                outlined
                label="Nome de usuário"
                :rules="[val => validations.userNameValidator(val)]"
              />
              <q-input
                v-model="email"
                outlined
                label="Email"
                :rules="[val => validations.emailValidator(val)]"
              />

              <q-input
                v-model="password"
                outlined
                label="Senha"
                type="password"
                :rules="[val => validations.passwordValidator(val)]"
              />

              <q-input
                v-model="confirmPassowrd"
                outlined
                label="Confirmar senha"
                type="password"
                :rules="[
                  val => validations.confirmPasswordValidator(val, password)
                ]"
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
  password = "";
  confirmPassowrd = "";
  validations = new Validations();

  loading = false;
  async create() {
    this.loading = true;
    try {
      const response = await this.$axios.post("/users", {
        name: this.name,
        email: this.email,
        password: this.password
      });

      this.$q.notify({
        message: response.data.message,
        color: "green"
      });
      this.$router.push({name: 'login'})
    } catch (error) {
      try {
        this.$q.notify({
          message: error.response.data.message,
          color: "red-5"
        });
      } catch (e) {
        this.$q.notify({
          message: "Erro ao cadastrar o usuario",
          color: "red-5"
        });
      }
    }
    this.loading = false;
  }
}
</script>
<style scoped>
.title {
  font-size: 40px;
}
</style>
