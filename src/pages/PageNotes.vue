<template>
  <div>
    <q-table
      grid
      title="Minhas notas"
      row-key="id"
      hide-header
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
      <q-card style="width: 700px; max-width: 80vw;">
        <q-form @submit="putNotation">
          <q-card-section class="row">
            <div class="width">
              <q-input
                label="Titulo da nota"
                v-model="selectedNoteTitle"
                class="q-pb-lg"
                :rules="[val => val.length != 0 || 'Titulo inválido']"
              />
              <q-input
                v-model="selectedNoteBody"
                filled
                autogrow
                label="Nota"
                :rules="[val => val.length != 0 || 'Titulo inválido']"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Calcelar" color="primary" v-close-popup />
            <q-btn flat label="Salvar" type="submit" color="primary"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { IUser } from "src/models/modelUser";
import { INotation } from "src/models/modelNotation";

@Component
export default class Notes extends Vue {
  data: INotation[] = [];
  dataOriginal: INotation[] = [];
  filterKey = "";
  openModal = false;

  selectedNoteTitle: string = "";
  selectedNoteId: string = "";
  selectedNoteBody: string = "";

  noteClick(_: any, notation: INotation) {
    this.selectedNoteTitle = notation.title;
    this.selectedNoteBody = notation.body;
    this.selectedNoteId = notation.id;
    this.openModal = true;
  }

  created() {
    this.isAuthenticate();
    this.getNotation();
  }

  async getNotation() {
    try {
      const response = await this.$axios.get("/notation");
      console.log(response.data);
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

      for(let index = 0; index < this.dataOriginal.length; index++){
        if (this.dataOriginal[index].id === this.selectedNoteId){          
          this.dataOriginal[index].title = this.selectedNoteTitle;
          this.dataOriginal[index].body = this.selectedNoteBody;
          break;
        }
      }
      for(let index = 0; index < this.data.length; index++){
        if (this.data[index].id === this.selectedNoteId){
          this.data[index].title = this.selectedNoteTitle;
          this.data[index].body = this.selectedNoteBody;
          break;
        } 
      }

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
      field: (row: any) => `Titulo: ${row.title}`
    },
    {
      field: (row: any) => row.body
    }
  ];
}
</script>

<style scoped>
.width {
  width: 100%;
}
</style>
