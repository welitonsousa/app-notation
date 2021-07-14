<template>
  <div class="text-center">
    <div>
      <h3>App Notation</h3>
    </div>
    <div class="q-pa-md" />
    <div class="row">
      <div class="col" />
      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="column">
            <q-btn color="primary" label="Login" @click="goToLogin" />
            <div class="q-pa-md" />
            <p>Não possui conta?</p>
            <q-btn color="secondary" @click="goToCreate" label="Cadastre-se" />
          </div>
        </q-card-section>
      </q-card>
      <div class="col" />
    </div>
  </div>
</template>

<script lang="ts">
import { IUser } from "src/models/modelUser";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  created() {
    this.isAuthenticate();
  }

  async isAuthenticate() {
    let modelUser: IUser;
    const user = (await localStorage.getItem("user")) || "";
    try {
      modelUser = JSON.parse(user);
      if (modelUser.token) {
        this.$router.push({
          name: "notes",
        });
      }
    } catch (error) {}
  }

  goToCreate() {
    this.$router.push({ name: "create" });
  }
  goToLogin() {
    this.$router.push({ name: "login" });
  }
}
</script>
