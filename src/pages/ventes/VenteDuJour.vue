<template>
  <div class="row q-ma-lg">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <q-card>
      <h5 class="q-ma-lg">Liste des ventes du jour</h5>
       <q-table :rows="ventes" :columns="columns" >
         <template v-slot:body-cell-created_at="props">
           <q-td>{{ formatDate(props.row.created_at) }}</q-td>
         </template>
         <tr></tr>
       </q-table>
      </q-card>
    </div></div>

</template>

<script>

import moment from "moment/moment";

export default {
  name: "VenteDuJour",
  props: {
    client:{type: Object, required: true}
  },
  data() {
    return {
       columns : [
        { name: 'abonne_id', align: 'center', label: 'Abonné', field: 'abonne_id', sortable: true },
        { name: 'prix', align: 'center', label: 'Prix', field: 'prix', sortable: true },
        { name: 'commission_journal', align: 'center', label: 'Commission', field: 'commission_journal', sortable: true },
        { name: 'methode_paiement', label: 'Acheté par', field: 'methode_paiement', sortable: true },
        { name: 'created_at', label: 'Date', field: 'created_at' },
        ],
      ventes: []
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('YY-M-D HH:SS')

    }
  },
  mounted(){
    this.$axios.get('ventes').then(r=>{
      console.log(r)
      this.ventes = r.getData().data
      }

    ).catch(error=>{
      console.log(error.re)
    })
  }
};
</script>

<style scoped>

</style>
