<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4 ">
    <q-header elevated >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          v-if=" ! $q.platform.is.electron && isLoggedIn"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          DigiPress Partenaires
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title class="text-left text-weight-thin" @click="showDialog">@Copyright DigiPress SA</q-toolbar-title>
        <q-toolbar-title class="text-rifht text-weight-thin" @click="showDialog">Contact +221 77 330 08 53, email contact@digipress.sn</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="isLoggedIn"
    >
      <q-item-label
        header
      >

        <img
          alt="Quasar logo"
          src="~assets/logo_Senapel.svg"
          style="width: 50px; height: 50px"
        > <span class="text-weight-bolder">Digi Press Partenaires</span>

      </q-item-label>

      <template   v-for="link in essentialLinks"
                  :key="link.title">
        <q-expansion-item
          :hide-expand-icon="!(typeof link.subItems !='undefined' && link.subItems.length > 0)"
          expand-separator
          :default-opened="link.open"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon :name="link.icon" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              {{link.title}}
            </q-item-section>


          </template>
          <q-card>
            <q-card-section>
              <q-list>

                <EssentialLink
                  v-for="subitem in link.subItems"
                  v-bind="subitem"
                  :key="subitem.title"
                />
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template> </q-drawer>

    <q-page-container >

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import moment from "moment";
import Acheter from "pages/paiements/Acheter.vue";
let today = moment().format('Y-M-D')
let moisActuel = moment().format('M')
let anneeActuel = moment().format('Y')
const linksList = [
  {
    title: 'Ventes',
    caption: 'quasar.dev',
    icon: 'mdi-wallet',
    link: '/sales/${today}/partner/1',
    open: true,
    subItems:[
      {
        title: 'Ventes Aujourd\'hui',
        caption: 'Les achats de parution',
        icon: 'mdi-hand-coin',
        link: 'ventes_du_jour',
      },
      {
        title: "Rapports mensuels",
        caption: 'Rapport détaillé de vos finances',
        icon: 'mdi-finance',
        link: '/rapports',
      },
      {
        title: 'Parutions',
        caption: 'Vos parutions',
        icon: 'mdi-newspaper',
        link: '/parutions',
      },
    ]
  },
  {
    title: 'Transactions',
    open: false,
    caption: 'Opérations',
    icon: 'mdi-cash-multiple',
    link: '/retrait',
    subItems:[
      {
        title: 'Faire un retrait',
        caption: null,
        icon: 'wallet',
        link: `/retrait`,
      }]
  },
  {
    title: 'Paramètres',
    caption: 'forum.quasar.dev',
    icon: 'mdi-cog',
    link: '/offres_senac',
    open: false,
    subItems: [
      {
        title: 'Gestion des utilisateurs',
        caption: 'Détails des offres',
        icon: 'mdi-user',
        link: '/offres_senac',
      },
      {
        title: 'Gestion du compte',
        caption: '',
        icon: 'mdi-account',
        link: '/contact_senac',
      },
    ]
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      alert: ref(false),
      today: today,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
