<template>
  <div>
    USUARIO LOGADO
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  created() {
    this.isAuthenticate();
  }

  async isAuthenticate() {
    const token = await localStorage.getItem("token");
    if (token == "" || token == null) {
      this.$router.push({
        name: "home"
      });
    }
  }
}
</script>
