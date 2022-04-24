<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="mobile-button">
          <q-btn color="white" text-color="black" label="Menu">
            <q-menu fit>
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section @click="toRouter('home')">App Notation</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section @click="toRouter('about')">Sobre</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section @click="toRouter('contact')">Contato</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section @click="toRouter('help')">Ajuda</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar-title>
        <q-toolbar-title class="row desktop-buttons">
          <div class="pr-50" @click="toRouter('home')">App Notation</div>
          <div class="pr-50" @click="toRouter('about')">Sobre</div>
          <div class="pr-50" @click="toRouter('contact')">Contato</div>
          <div class="pr-50" @click="toRouter('help')">Ajuda</div>
        </q-toolbar-title>
        <Avatar />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Avatar from "pages/components/AvatarActions.vue";

@Component({
  components: { Avatar },
})
export default class Layout extends Vue {
  toRouter(name: string) {
    this.$router.push({name: name})
  }
}
</script>

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
