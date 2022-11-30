<template>
    <q-table
      grid
      :card-container-class="cardContainerClass"
      title="Rapports"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-header
      v-model="rows"
    >
      <template v-slot:top-right>

      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center">
              <strong>{{ props.row.label }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center ">
              <div class="text-primary title-very-big">{{ props.row.value.toLocaleString() }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
</template>

<script>
import { useQuasar } from 'quasar'
import {  computed } from 'vue'


export default {
  name:"RapportMensuel",
  data () {
    return {
      rows: [
        { label: 'Ventes du jour', value: 0 },
        { label: 'Ventes semaine', value: 0 },
        { label: 'Ventes mois', value: 0 },
      ],

      cardContainerClass: computed(() => {
        return this.$q.screen.gt.xs
          ? 'grid-masonry grid-masonry--' + (this.$q.screen.gt.sm ? '3' : '2')
          : null
      })
    }
  },
  mounted() {
    this.$axios.get('rapports')
      .then(r=>{
        if (r.isSuccessful()){
          let data =r.getData()
          this.rows[0].value = data.jour
          this.rows[1].value = data.semaine
          this.rows[2].value = data.mois
          this.rows = this.rows.slice()
        }
      })
  }
}
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
