<template>
  <div>
    <div v-if="loading" class="text-center align-circular-progress-indicator">
      <q-circular-progress
        indeterminate
        size="50px"
        color="blue"
        class="q-ma-md"
      />
    </div>
    <div v-else>
      <q-table
        grid
        title="Minhas tarefas"
        row-key="id"
        hide-header
        rows-per-page-label="Itens por página"
        no-data-label="Nenhuma tarefa salva"
        :data="data"
        :columns="columns"
        @row-click="todoClick"
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
        <q-card style="width: 700px; max-width: 80vw" v-show="!modalTask">
          <q-form @submit="selectedTodoId ? putTodo() : postTodo()">
            <q-card-section class="row">
              <div class="width">
                <q-input label="Titulo" v-model="selectedTodoTitle" />
                <div v-for="(task, index) in selectedTodoTasks" :key="index">
                  <q-item clickable>
                    <q-checkbox v-model="task.checked" />
                    <q-item-section>{{ task.title }}</q-item-section>
                    <q-item-section side>
                      <q-btn
                        icon="delete"
                        flat
                        @click="() => deleteTask(selectedTodoTasks, task)"
                      ></q-btn>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                class="q-mr-lg"
                fab
                icon="add"
                color="blue"
                @click="modalTask = true"
              />
            </q-card-actions>
            <q-card-actions align="right">
              <q-btn
                v-if="selectedTodoId"
                flat
                label="Deletar"
                color="red"
                @click="deleteTodo"
              />
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn flat label="Salvar" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
      <q-dialog v-model="modalTask" persistent>
        <q-card style="width: 700px; max-width: 80vw">
          <q-form @submit="newTask()">
            <q-card-section class="row">
              <div class="width">
                <q-input label="Titulo" v-model="modalTaskTitle" />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn flat label="Salvar" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="blue" @click="todoClick" />
      </q-page-sticky>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { ITask, ITodo } from "../models/modelTask";
import { showMessage } from "src/utils/MessageError";
import { v4 as uuid } from "uuid";

@Component
export default class Todos extends Vue {
  data: ITodo[] = [];
  dataOriginal: ITodo[] = [];
  filterKey = "";
  openModal = false;
  modalTask = false;
  modalTaskTitle = "";
  loading = true;
  selectedTodoTitle = "";
  selectedTodoId = "";
  selectedTodoTasks: ITask[] = [];
  columns = [
    { field: (row: ITodo) => `${row.title}` },
    { field: (row: ITodo) => `${this.dateFormatter(row.created_at)}` }
  ];

  todoClick(_: any, todo: ITodo) {
    this.selectedTodoTitle = todo.title || "";
    this.selectedTodoId = todo.id || "";
    this.selectedTodoTasks = [...todo.tasks];
    this.openModal = true;
  }

  created() {
    this.getTodos().then(() => {
      this.loading = false;
    });
  }

  async deleteTodo() {
    try {
      const res = await this.$axios.delete("/todo", {
        data: { id: this.selectedTodoId }
      });
      await this.getTodos();
      showMessage.success(res);
      this.openModal = false;
    } catch (error) {
      showMessage.error(error);
    }
  }

  deleteTask(tasks: ITask[], task: ITask) {
    const index = this.selectedTodoTasks.indexOf(task);
    tasks.splice(index, 1);
  }

  newTask() {
    const id = uuid();
    this.selectedTodoTasks.push({id: id, checked: false, title: this.modalTaskTitle } as ITask);
    this.modalTask = false
    this.modalTaskTitle = ""
  }

  async getTodos() {
    try {
      const response = await this.$axios.get("/todo");
      this.dataOriginal = response.data.todos as ITodo[];
      this.data = this.dataOriginal;
    } catch (error) {
      showMessage.error(error);
    }
  }

  async putTodo() {
    try {
      const response = await this.$axios.put("/todo", {
        id: this.selectedTodoId,
        title: this.selectedTodoTitle,
        tasks: this.selectedTodoTasks
      });

      await this.getTodos();
      showMessage.success(response);

      this.openModal = false;
    } catch (error) {
      showMessage.error(error);
    }
  }

  async postTodo() {
    try {
      const response = await this.$axios.post("/todo", {
        title: this.selectedTodoTitle,
        body: this.selectedTodoTasks
      });
      await this.getTodos();
      showMessage.success(response);
      this.openModal = false;
    } catch (error) {
      showMessage.error(error);
    }
  }

  dateFormatter(date: string) {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString();
  }

  @Watch("filterKey")
  filter() {
    this.data = [
      ...this.dataOriginal.filter(e =>
        e.title.toLowerCase().includes(this.filterKey.toLowerCase())
      )
    ];
  }
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
