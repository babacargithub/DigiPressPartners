<template>
    <q-card  class="col-lg-12" >
      <q-card-section>
        <p class="text-weight-bolder">Se connecter</p>
        <p class="secondary">Vous devez vous connecter avec votre email et mot de passe</p>
      </q-card-section>
      <q-card-section>
        <form @submit.prevent="submit">
          <q-input required type="email" outlined placeholder="Email" label="Email" :error="errors.email != null" :error-message="errors.email"
                   v-model="email" >

          </q-input>
          <q-input required type="password" outlined placeholder="Mot de passe" label="Mot de passe" :error="errors.password != null" :error-message="errors.password"
                   v-model="password" >

          </q-input>
          <primary-button type="submit" class="q-mr-lg" id="sign-in-button" icon-right="chevron_right"  >Se Connecter</primary-button>

        </form>
        <q-separator class="q-mt-lg"></q-separator>
        <q-card-section>
          <p>Mot passe oublié ?<br>
            <q-btn flat unelevated no-caps class="text-blue-5" fill="outline" @click="creerCompte">Réinitialiser mode de passe
            </q-btn>
          </p>
        </q-card-section>
      </q-card-section>

    </q-card>




</template>
<style>

</style>
<script >
import { defineComponent } from 'vue';
import Inscription from "pages/users/Inscription.vue";
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";
import {app} from "src/plugins/firebase"
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
const auth = getAuth(app);
auth.languageCode = 'fr';
import {isValidPhoneNumber } from 'src/utils/phone_number_validator';
import { QSpinnerGears } from "quasar";

export default defineComponent({
  name: 'LoginPage',
  components: {
    PrimaryButton
  },
  data() {
    return {
      isUpdating: false,
      isConnected: loginCredentials.isConnected(),
      email: null,
      password: null,
      errors:{
        email: null,
        password: null
      },
      client: null,
    }
  },
  mounted() {
    if (loginCredentials.isConnected()){
      this.client = loginCredentials.getClient();
    }


  },
  methods: {
    creerCompte(){
      this.$q.dialog({
        component: Inscription,
        componentProps: {
          phoneNumber: this.email
        }
      })
    },

    submit() {
      this.errors.password = null
      this.errors.email = null

    },
    deconnexion(){
      loginCredentials.logout()
      this.client = null
      this.isConnected =  loginCredentials.isConnected()

    },
  },
});
</script>
