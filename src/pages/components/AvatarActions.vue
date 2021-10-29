<template>
  <div>
    <q-btn-dropdown
      v-if="userName != ''"
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
            <img v-if="picture" :src="picture" />
            <img v-else src="../../assets/user.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userName }}</div>
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
import { IUser } from "src/models/modelUser";
import { Vue, Component } from "vue-property-decorator";
import { showMessage } from "src/utils/MessageError";
import UpdatePass from "pages/components/ModalUpdatePass.vue";

@Component({
  components: {
    UpdatePass,
  },
})
export default class Avatar extends Vue {
  user?: IUser;
  viewUpdatePass = false;
  userName = "";
  picture = "";
  loadingImage = false;

  created() {
    this.getUser();
  }

  showModal() {
    this.viewUpdatePass = true;
  }
  hideModal(value: boolean) {
    this.viewUpdatePass = value;
  }

  async handleFileChange(evt: any) {
    const form = new FormData();
    form.append("files", evt.target.files[0]);

    try {
      this.loadingImage = true;
      const response = await this.$axios.put("/user/picture", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      this.picture = response.data.picture;
      this.user!.picture = this.picture;
      localStorage.setItem("user", JSON.stringify(this.user));
    } catch (error: any) {
      showMessage.error(error);
    } finally {
      this.loadingImage = false;
    }
  }

  async getUser() {
    const user = JSON.parse(localStorage.user || "");
    this.user = user;
    this.userName = this.user!.user || "";
    this.picture = this.user!.picture || "";
  }

  async logOut() {
    localStorage.clear();
    this.userName = "";
    this.picture = "";
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