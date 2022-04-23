<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="mobile-button">
          <q-btn color="white" text-color="black" label="Menu">
            <q-menu fit>
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section @click="toHome">App Notation</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section @click="toAbout">Sobre</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar-title>

        <q-toolbar-title class="row desktop-buttons">
          <div class="pr-50" @click="toHome">App Notation</div>
          <div class="pr-50" @click="toAbout">Sobre</div>
        </q-toolbar-title>
        <Avatar/>
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
  cursor: pointer;
}
@media (max-width: 600px) {
  .desktop-buttons {
    display: none;
  }
}
@media (min-width: 601px) {
  .mobile-button {
    display: none;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Avatar from "pages/components/AvatarActions.vue"

@Component({
  components: {
    Avatar
  }
})
export default class Layout extends Vue {
  toHome() {
    this.$router.push({ name: "initial" });
  }
  toAbout() {
    this.$router.push({ name: "about" });
  }
}
</script>
