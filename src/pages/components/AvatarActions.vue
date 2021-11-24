<template>
  <div>
    <q-btn-dropdown
      v-if="user && user.user"
      class="glossy"
      color="white"
      label="Configurações"
      text-color="black"
    >
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Configurações</div>

          <q-btn
            class="q-mb-md"
            label="Alterar senha"
            color="primary"
            @click="showModal"
          />
          <q-btn
            class="q-mb-md"
            label="Remover Imagem"
            color="primary"
            @click="removeImage"
          />

          <label class="file-select">
            <div class="select-button">Alterar Imagem</div>
            <input
              type="file"
              @change="handleFileChange"
              accept="image/png, image/gif, image/jpeg"
            />
          </label>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px" v-if="loadingImage">
            <q-spinner color="primary" />
          </q-avatar>
          <q-avatar size="72px" v-else>
            <img v-if="user && user.picture" :src="user.picture" />
            <img v-else src="../../assets/user.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.user }}</div>
          <q-btn
            label="Sair da conta"
            color="red"
            @click="logOut"
            push
            size="sm"
          />
        </div>
      </div>
    </q-btn-dropdown>
    <q-dialog v-model="viewUpdatePass">
      <UpdatePass @change="hideModal" />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { showMessage } from "src/utils/MessageError";
import UpdatePass from "pages/components/ModalUpdatePass.vue";
import { log } from "console";

@Component({
  components: {
    UpdatePass,
  },
})
export default class Avatar extends Vue {
  viewUpdatePass = false;
  loadingImage = false;

  get user() {
    return this.$store.state.user.user;
  }
  set user(user) {
    this.$store.commit("user/setUser", user);
  }

  showModal() {
    this.viewUpdatePass = true;
  }

  hideModal(value: boolean) {
    this.viewUpdatePass = value;
  }

  async removeImage(evt: any) {
    try {
      const form = new FormData();
      form.append("files", "");
      this.loadingImage = true;
      await this.$store.dispatch("user/changePicture", form);
    } catch (error) {
      showMessage.error(error);
    } finally {
      this.loadingImage = false;
    }
  }

  async handleFileChange(evt: any) {
    try {
      const form = new FormData();
      form.append("files", evt.target.files[0]);

      this.loadingImage = true;
      await this.$store.dispatch("user/changePicture", form);
    } catch (error: any) {
      showMessage.error(error);
    } finally {
      this.loadingImage = false;
    }
  }

  logOut() {
    this.$store.commit("user/logout");
    this.$router.push({ name: "home" });
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 0.5rem;

  color: white;
  background-color: #1976d2;
  border-radius: 0.2rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>