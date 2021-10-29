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
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  goToCreate() {
    this.$router.push({ name: "create" });
  }
  goToLogin() {
    this.$router.push({ name: "login" });
  }
}
</script>
