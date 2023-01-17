<template>
  <div class="row q-ma-lg">
      <template v-for="(item,index) in parutions" :key="index">
        <div class="col-md-12 col-xs-12 bg-grey-5">
          <p class="title-small text-center q-mt-lg">{{ item.label }}</p>
        </div>
        <div class="column col-md-4 col-xs-12 bg-grey-2 content-center ">
              <img class="self-center q-mt-md" :src="resolveImageUrl(item.image_la_une)" alt="Image de la une" width="200" height="200"/>

        </div>
        <div class="col-md-8 col-xs-12 bg-grey-3">
          <q-list>
            <q-item>
              <q-item-section top>
                <p class="text-weight-bolder">{{ item.article_plus_populaire }}</p>
                <p class="text-weight-bolder">Total Vente: {{ item.total_vente }}</p>
                <p class="text-weight-bolder">Nombre Vente :{{ item.nombre_ventes }}</p>
                <p class="text-weight-bolder">Classement : {{ item.classement }}</p>
                <p class="text-weight-bolder">Nombre Articles : {{ item.nombre_articles }}</p>
                <p class="text-weight-bolder">Total vue : {{ item.nombre_total_vues_articles }}</p>
              </q-item-section>
            </q-item>
          </q-list>

        </div>
      </template>

    </div>

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
