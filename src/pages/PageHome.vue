<template>
  <div class="text-center">  
    <div>
      <h3>App Notation</h3>
      <p>{{subtitle}}</p>
    </div>
    <div class="q-pa-md"/>
    <div class="row">
      <div class="col"/>
      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="column">  
            <q-btn color="primary" label="Login"/>
            <div class="q-pa-md"/>
            <p>Não possui conta?</p>
            <q-btn color="secondary" @click="goToSingup" label="Cadastre-se"/>
          </div>
        </q-card-section>
      </q-card>
      <div class="col"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  subtitle = "No app notation você pode salvar suas notas em nuvem, sem se preocupar com segurança, pois aqui tudo é criptografado!";

  goToSingup() {
    this.$router.push({name: 'singup'})
  }

}
</script>
