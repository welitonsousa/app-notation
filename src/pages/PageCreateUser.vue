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
                :rules="[(val) => validations.userNameValidator(val)]"
              />
              <q-input
                v-model="email"
                outlined
                label="Email"
                :rules="[(val) => validations.emailValidator(val)]"
              />

              <q-input
                v-model="password"
                outlined
                label="Senha"
                :type="isPwdPass ? 'password' : 'text'"
                :rules="[(val) => validations.passwordValidator(val)]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwdPass ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdPass = !isPwdPass"
                  />
                </template>
              </q-input>

              <q-input
                v-model="confirmPassowrd"
                outlined
                label="Confirme a senha"
                :type="isPwdConfirmPass ? 'password' : 'text'"
                :rules="[
                  (val) => validations.confirmPasswordValidator(val, password),
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwdConfirmPass ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdConfirmPass = !isPwdConfirmPass"
                  />
                </template>
              </q-input>
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
import { showMessage } from "src/utils/MessageError";

@Component
export default class Home extends Vue {
  name = "";
  email = "";
  password = "";
  confirmPassowrd = "";
  isPwdPass = true;
  isPwdConfirmPass = true;
  validations = new Validations();

  loading = false;
  async create() {
    this.loading = true;
    try {
      const response = await this.$axios.post("/users", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      showMessage.success(response);
      this.$router.push({ name: "login" });
    } catch (error: any) {
      showMessage.error(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 40px;
}
</style>
