<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          App Notation
        </q-toolbar-title>
        <q-btn-dropdown color="white" text-color="black" :label="userName">
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

<script lang="ts">
import { IUser } from "src/models/modelUser";
import { Vue, Component, Watch } from "vue-property-decorator";

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

  async logOut() {
    await localStorage.clear();
    this.$router.push({ name: "home" });
  }
}
</script>
