<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-6 text-justify q-pl-lg">
        <h4 class="text-center">Ajuda</h4>

        <q-card class="q-pa-md">
          <q-expansion-item
            v-for="(quest, index) in questions"
            :key="index"
            :label="quest.title"
          >
            <p class="q-pl-xl" v-for="(item, index) in quest.content" :key="index + questions.length">
              {{item}}
            </p>

          </q-expansion-item>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { errors } from "../data/DataErrors";
import { IQuestion } from "src/models/modelQuestion";
import { Vue, Component } from "vue-property-decorator";


@Component
export default class PageHelper extends Vue {
  questions: IQuestion[] = errors
}
</script>
