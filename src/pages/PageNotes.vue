<template>
  <div>
    <div v-if="loading" class="text-center align-circular-progress-indicator">
      <q-circular-progress
        indeterminate
        size="50px"
        color="blue"
        class="q-ma-md "
      />
    </div>
    <div v-else>
      <q-table
        grid
        title="Minhas notas"
        row-key="id"
        hide-header
        rows-per-page-label="Itens por página"
        no-data-label="Nenhuma nota salva"
        :data="data"
        :columns="columns"
        @row-click="noteClick"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            placeholder="Buscar"
            v-model="filterKey"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <q-dialog v-model="openModal" persistent>
        <q-card style="width: 700px; max-width: 80vw">
          <q-form @submit="selectedNoteId ? putNotation() : postNotation()">
            <q-card-section class="row">
              <div class="width">
                <q-input
                  label="Titulo da nota"
                  v-model="selectedNoteTitle"
                  class="q-pb-lg"
                  :rules="[
                    val =>
                      (val.length != 0 && val.length <= 60) || 'Titulo inválido'
                  ]"
                />
                <q-input
                  v-model="selectedNoteBody"
                  filled
                  autogrow
                  label="Nota"
                  :rules="[val => val.length != 0 || 'Nota inválida']"
                />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                v-if="selectedNoteId"
                flat
                label="Deletar"
                color="red"
                @click="deleteNote"
              />
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn flat label="Salvar" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="blue" @click="noteClick" />
      </q-page-sticky>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { IUser } from "../models/modelUser";
import { INotation } from "../models/modelNotation";

@Component
export default class Notes extends Vue {
  data: INotation[] = [];
  dataOriginal: INotation[] = [];
  filterKey = "";
  openModal = false;
  loading = true;
  selectedNoteTitle: string = "";
  selectedNoteId: string = "";
  selectedNoteBody: string = "";

  noteClick(_: any, notation: INotation) {
    this.selectedNoteTitle = notation.title || "";
    this.selectedNoteBody = notation.body || "";
    this.selectedNoteId = notation.id || "";
    this.openModal = true;
  }

  created() {
    this.isAuthenticate();
    this.getme().then(() => {
      this.getNotation().then(() => {
        this.loading = false;
      });
    });
  }

  async deleteNote() {
    try {
      await this.$axios.delete("/notation/", {
        data: { id: this.selectedNoteId }
      });
      await this.getNotation();
      this.openModal = false;
      this.$q.notify({
        message: "Nota deletada",
        color: "green"
      });
    } catch (error) {
      try {
        this.$q.notify({
          message: error.response.data.message,
          color: "red-5"
        });
      } catch (e) {
        this.$q.notify({
          message: "Ops, algo deu errado",
          color: "red-5"
        });
      }
    }
  }

  async getNotation() {
    try {
      const response = await this.$axios.get("/notation");
      this.dataOriginal = response.data.notations as INotation[];
      this.data = this.dataOriginal;
    } catch (error) {
      try {
        this.$q.notify({
          message: error.response.data.message,
          color: "red-5"
        });
      } catch (e) {
        this.$q.notify({
          message: "Ops, algo deu errado",
          color: "red-5"
        });
      }
    }
  }

  @Watch("filterKey")
  filter() {
    this.data = [
      ...this.dataOriginal.filter(
        e =>
          e.title.toLowerCase().includes(this.filterKey.toLowerCase()) ||
          e.body.toLowerCase().includes(this.filterKey.toLowerCase())
      )
    ];
  }
  async getme() {
    try {
      this.$axios.defaults.headers = {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`
      };
      const response = await this.$axios.get("/user/me");
      const user = response.data as IUser;
      await localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        this.$router.push({ name: "home" });
      }
    }
  }

  dateFormatter(date: string) {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString();
  }

  async putNotation() {
    try {
      const response = await this.$axios.put("/notation", {
        id: this.selectedNoteId,
        title: this.selectedNoteTitle,
        body: this.selectedNoteBody
      });
      this.$q.notify({
        message: response.data.message,
        color: "green"
      });

      await this.getNotation();

      this.openModal = false;
    } catch (error) {
      try {
        this.$q.notify({
          message: error.response.data.message,
          color: "red-5"
        });
      } catch (e) {
        this.$q.notify({
          message: "Ops. algo deu errado",
          color: "red-5"
        });
      }
    }
  }

  async postNotation() {
    try {
      const response = await this.$axios.post("/notation", {
        title: this.selectedNoteTitle,
        body: this.selectedNoteBody
      });
      await this.getNotation();

      this.$q.notify({
        message: response.data.message,
        color: "green"
      });

      this.openModal = false;
    } catch (error) {
      try {
        this.$q.notify({
          message: error.response.data.message,
          color: "red-5"
        });
      } catch (e) {
        this.$q.notify({
          message: "Ops. algo deu errado",
          color: "red-5"
        });
      }
    }
  }

  async isAuthenticate() {
    let modelUser: IUser;
    const user = (await localStorage.getItem("user")) || "";
    try {
      modelUser = JSON.parse(user);
    } catch (error) {
      this.$router.push({
        name: "home"
      });
    }
  }

  columns = [
    {
      field: (row: INotation) => `${row.title}`
    },
    {
      field: (row: INotation) => `${this.dateFormatter(row.created_at)}`
    }
  ];
}
</script>

<style scoped>
.width {
  width: 100%;
}
.align-circular-progress-indicator {
  padding-top: 40vh;
}
</style>
