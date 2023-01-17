<template>


  <div class="row q-mt-lg q-ma-xs-md q-pa-xs-md">
    <div class="col-md-6 col-xs-12 offset-md-3">

      <q-card class="bg-black">
        <q-card-section><span class="text-white text-weight-bolder">Solde actuel: &nbsp;&nbsp;</span>
          <span class="title-medium text-primary ">200 000F</span></q-card-section>
      </q-card>
        <q-card>
          <q-card-section >
            <h6>Faire un retrait de votre compte</h6>
            <q-input v-model="montant" outlined color="black" label="Montant" debounce="up"></q-input>
          </q-card-section>
          <q-card-actions align="center" >
            <primary-button @click="validerRetrait">Valider</primary-button>
          </q-card-actions>
        </q-card>
      </div>
      <div class="column">

      </div>
    </div>

</template>

<script>
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";
export default {
  name: "RetraitCompte",
  props: {
    parution: {type: Object, required: true}
  },
  components: {PrimaryButton   },
  data() {
    return {
      montant: 0,
    };
  },
  methods: {
    validerRetrait(){
      this.$axios.post("retrait",{montant: this.montant})
        .then(response =>{
          if (response.isSuccessful()){
            this.showAlertSuccess("Votre retrait a été pris en charge. Il sera traité dans les meilleurs délais", ()=>{

            this.$router.push("historique-retraits");
            })
          }
        }).catch(error=>{
          if (error.isUnprocessableEntity()){
            this.showAlertError(error.data);
          }
      })
    }
  }
};
</script>

<style scoped>

</style>
