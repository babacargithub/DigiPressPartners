<template>

  <q-card >

    <div class="row">
      <div class="column col-12 bg-grey-4 content-center " >
        <h5>Solde actuel:</h5> <h1>200 000F</h1>
        <h6>Faire un retrait de votre compte</h6>
      </div>
    </div>
  </q-card>

</template>

<script>
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";
export default {
  name: "RetraitCompte",
  props: {
    parution: {type: Object, required: true}
  },
  components: {   },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>

<style scoped>

</style>
