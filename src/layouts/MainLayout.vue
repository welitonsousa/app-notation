<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="row">
          <div class="pr-50" @click="toHome">App Notation</div>
          <div @click="toWho">Quem somos</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.pr-50 {
  padding-right: 50px;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
  toWho() {
    this.$router.push({ name: "who" });
  }
 
  toHome() {
    this.$router.push({ name: "home" });
  }
}
</script>