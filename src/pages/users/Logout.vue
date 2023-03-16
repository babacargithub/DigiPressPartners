<template>
  <div class="row q-mt-lg q-ma-xs-md q-pa-xs-md">
    <primary-button @click="deconnexion">Déconnecter</primary-button>
  </div>


</template>
<style>

</style>
<script >
import { defineComponent } from 'vue';
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";

export default defineComponent({
  name: 'LoginPage',
  components: {
    PrimaryButton
  },
  data() {
    return {
      isUpdating: false,
      isConnected: loginCredentials.isConnected(),
    }
  },
  mounted() {
    if (loginCredentials.isConnected()){
      this.client = loginCredentials.getClient();
    }


  },
  methods: {

    deconnexion(){
      loginCredentials.logout()
      this.$store.dispatch("user_login/logoutUser")
      this.isConnected =  false
      this.isLoggedIn = false
      this.$router.push("/")

    },
  },
});
</script>
