<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Ops. Página não encontrada...
      </div>

      <q-btn
        color="white"
        text-color="blue"
        @click="toHome"
        label="Voltar para a Home"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Error404 extends Vue {
  toHome() {
    this.$router.push({name: 'home'})
  }
}
</script>
