<template>
  <div>
    <q-tabs v-model="tab" class="text-blue">
      <q-tab name="0"  label="Notas" />
      <q-tab name="1"  label="Tarefas" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="0">
        <notes-page />
      </q-tab-panel>

      <q-tab-panel name="1">
        <todos-page />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NotesPage from "../pages/PageNotes.vue";
import TodosPage from "../pages/PageTasks.vue";

@Component({
  components: { NotesPage, TodosPage }
})
export default class InitialPage extends Vue {
  tab = "0";
}
</script>
