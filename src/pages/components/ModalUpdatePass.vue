<template>
  <q-card style="min-width: 350px">
    <q-card-section class="text-center">
      <div class="text-h6">Atualize sua senha</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="updatePass">
        <div class="column">
          <q-input
            v-model="oldPass"
            outlined
            label="Senha"
            :type="isPwdPass ? 'password' : 'text'"
            :rules="[(val) => validations.passwordValidator(val)]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdPass ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdPass = !isPwdPass"
              />
            </template>
          </q-input>

          <q-input
            v-model="newPass"
            outlined
            label="Senha"
            :type="isPwdNewPass ? 'password' : 'text'"
            :rules="[(val) => validations.passwordValidator(val)]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdNewPass ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdNewPass = !isPwdNewPass"
              />
            </template>
          </q-input>

          <q-input
            v-model="confirmNewPass"
            outlined
            label="Senha"
            :type="isPwdPassConfirmNewPass ? 'password' : 'text'"
            :rules="[
              (val) => validations.confirmPasswordValidator(val, newPass),
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="
                  isPwdPassConfirmNewPass ? 'visibility_off' : 'visibility'
                "
                class="cursor-pointer"
                @click="isPwdPassConfirmNewPass = !isPwdPassConfirmNewPass"
              />
            </template>
          </q-input>

          <div class="q-gutter-sm">
            <q-checkbox
              class="q-mb-md"
              v-model="logOutAll"
              label="Desconectar todos os dispovitivos"
            />
          </div>

          <div class="text-center row">
            <q-btn
              style="width: 47%; height: 50px"
              class="q-mr-auto"
              color="red"
              label="Cancelar"
              @click="oculteModal"
            />
            <q-btn
              class="q-ml-md"
              style="width: 47%; height: 50px"
              color="primary"
              type="submit"
              label="Confirmar"
              :loading="loading"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Validations } from "src/utils/validations";
import { Vue, Component, PropSync } from "vue-property-decorator";
import { showMessage } from "src/utils/MessageError";

@Component
export default class UpdatePass extends Vue {
  oldPass = "";
  newPass = "";
  confirmNewPass = "";
  validations = new Validations();
  loading = false;
  logOutAll = false;
  isPwdPass = true;
  isPwdNewPass = true;
  isPwdPassConfirmNewPass = true;

  @PropSync("showModal") show!: boolean;
  oculteModal(): void {
    this.$emit("change", false);
  }

  async updatePass() {
    try {
      this.loading = true;
      const data = {
        new_pass: this.newPass,
        pass: this.oldPass,
        logout: this.logOutAll,
      };
      const response = await this.$axios.put("/user/pass", data);
      if (this.logOutAll) {
        localStorage.clear();
        this.$router.push({ name: "home" });
      }
      showMessage.success(response);
      this.oculteModal();
    } catch (error: any) {
      showMessage.error(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
