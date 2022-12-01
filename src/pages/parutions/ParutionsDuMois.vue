<template>
  <div class="row q-ma-lg">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <q-card>
      <h5 class="q-ma-lg">Les publications du mois</h5>
       <q-table :rows="parutions" :columns="columns"  v-model="parutions">

       </q-table>
      </q-card>
    </div></div>

</template>

<script>

import moment from "moment/moment";

export default {
  name: "ParutionsDuMois",
  props: {
    client:{type: Object, required: true}
  },
  data() {
    return {
       columns : [
        { name: 'abonne_id', align: 'center', label: 'Journée', field: 'journee_id', sortable: true },
        { name: 'prix', align: 'center', label: 'A la Une', field: 'image_la_une' },
        { name: 'commission_journal', align: 'center', label: 'Date de publication', field: 'created_at', sortable: true },

        ],
      parutions: []
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('D-MM-YYYY HH:SS')

    }
  },
  mounted(){
    this.$axios.get('/parutions').then(r=>{
      this.parutions = r.getData()
      this.parutions.forEach((value, index)=>{
        this.parutions[index].created_at = this.formatDate(value.created_at)
      })
      this.parutions = this.parutions.slice()
      }

    )
  }
};
</script>

<style scoped>

</style>
