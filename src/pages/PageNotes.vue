<template>
  <div>
    <q-table
      grid
      title="Minhas notas"
      row-key="id"
      hide-header
      :data="data"
      :columns="columns"
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

  created() {
    this.isAuthenticate();
    this.getNotation();    
  }

  async getNotation() {
    try {
      const localUser = (await localStorage.getItem("user")) || "";
      const user = JSON.parse(localUser);
      const token = user.token;
      this.$axios.defaults.headers = {"Authorization": `Bearer ${token}`}
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
