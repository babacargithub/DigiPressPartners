<template>


  <div class="row q-ma-lg q-ma-xs-md q-pa-xs-md">
    <div class="col-md-12 col-xs-12">
      <h6 style="margin-bottom: 2px" class=""><q-icon color="primary" name="mdi-finance"></q-icon>Historique de vos retraits</h6>
      <q-table :rows="transactions" :columns="columns">

      </q-table>
    </div>
    </div>

</template>

<script>
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";
import moment from "moment";
export default {
  name: "HistoriqueRetrait",

  components: {   },
  data() {
    return {
      transactions: [],
      columns: [
        { name: 'montant', label: 'Montant', field: 'montant' },
        {name: "created_at", field: "created_at", label: "Date"},
        {name: "valide", field: "valide", label: "Etat"},
        {name: "valide_le", field: "valide_le", label: "Le"}
      ]
    };
  },
  methods: {
    loadTransactions(){
      this.$axios.get("transactions")
        .then(response =>{
          this.transactions = response.getData();
          this.transactions.map(item=>{
            item["montant"] = item.montant.toLocaleString()+'F';
            item["created_at"] = moment(item.created_at).format("DD-MM-YYYY HH:mm:SS")
            item["valide"] = Boolean(item.valide) === true ? "Validé" : "En attente..."
            return item;
          })
        })
    }
  },
  mounted() {
    this.loadTransactions();
  }
};
</script>

<style scoped>

</style>
