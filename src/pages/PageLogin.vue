<template>
  <div class="text-center">
    <div class="q-pa-md" />
    <div class="row">
      <div class="col" />
      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="title">Login</div>
          <q-form @submit="login">
            <div class="column">
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
                :type="isPwd ? 'password' : 'text'"
                :rules="[(val) => validations.passwordValidator(val)]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
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
import { IUser } from "src/models/modelUser";
import { showMessage } from "src/utils/MessageError";

@Component
export default class Home extends Vue {
  email = "";
  isPwd = true;
  password = "";
  validations = new Validations();
  loading = false;

  async login() {
    this.loading = true;
    try {
      const response = await this.$axios.post("/sign", {
        email: this.email,
        password: this.password,
      });
      showMessage.success(response);
      const user = response.data as IUser;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      this.$router.push({ name: "notes" });
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
