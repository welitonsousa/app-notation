<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="row">
          <div class="pr-50" @click="toHome">App Notation</div>
          <div class="pr-50" @click="toWho">Quem somos</div>
          <div class="pr-50" @click="toContact">Contato</div>
        </q-toolbar-title>
        <q-btn-dropdown v-if="userName != ''" color="white" text-color="black" :label="userName">
          <q-list>
            <q-item clickable v-close-popup @click="logOut">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
import { IUser } from "src/models/modelUser";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
  user?: IUser;
  userName = "";
  created() {
    this.getUser();
  }  

  async getUser() {
    try {
      const user = JSON.parse((await localStorage.getItem("user")) || "");
      this.user = user;
      this.userName = this.user!.user || "";
    } catch (error) {
      this.$router.push({ name: "home" });
    }
  }

  toHome() {
    this.$router.push({ name: "notes" });
  }
  toWho() {
    this.$router.push({ name: "who" });
  }
  toContact() {
    this.$router.push({ name: "contact" });
  }

  async logOut() {
    await localStorage.clear();
    this.userName = "";
    this.$router.push({ name: "home" });
  }
}
</script>