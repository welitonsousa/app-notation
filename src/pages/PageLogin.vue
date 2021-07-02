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
                :rules="[val => validations.emailValidator(val)]"
              />
              <q-input
                v-model="password"
                outlined
                label="Senha"
                type="password"
                :rules="[val => validations.passwordValidator(val)]"
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
import { IUser } from "src/models/modelUser";

@Component
export default class Home extends Vue {
  [x: string]: any;
  email = "";
  password = "";
  validations = new Validations();
  loading = false;

  async login() {
    this.loading = true;
    try {
      const response = await this.$axios.post("/sign", {
        email: this.email,
        password: this.password
      });
      console.log(response.data);

      this.$q.notify({
        message: response.data.message,
        color: "green"
      });

      const user = response.data as IUser;
      await localStorage.setItem("user", JSON.stringify(user));
      await localStorage.setItem("token", user.token);
      this.$router.push({ name: "notes" });
    } catch (error) {
      try {
        this.$q.notify({
          message: error.response.data.message,
          color: "red-5"
        });
      } catch (e) {
        this.$q.notify({
          message: "Ops. algo deu errado",
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
