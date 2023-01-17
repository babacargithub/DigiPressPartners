import {LocalStorage} from "quasar";

export const user_login = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    shouldChangePassword: false,
    user: {
      id:null,
      isAdmin: false,
      isSuperAdmin: false,
      isCEO: true,
      token: null,
      username:'',
      balance: null,
      roles: []
    }},
  actions: {
    saveUserCredentials({ commit }, data) {

      let token =  data.token
      let username =  data.username
      let id =  data.id
      // let shouldChangePassword =  data.user.shouldChangePassword
      commit('mutateToken',token)
      commit('mutateUsername',username)
      commit('mutateId', id)


    },
    loginUser({ commit }) {
      commit("markAsLoggedIn");
    },
    logoutUser({ commit }) {
      commit("markAsLoggedOut");
      commit("mutateShouldChangePassword", false);

    }, changePassword({ commit }, data) {
      commit("mutateShouldChangePassword",true);
      commit("mutateId",data.user.id);
      commit("mutateToken",data.token);
    }

  },
  mutations: {
    markAsLoggedIn(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn","0")
    },

    markAsLoggedOut(state) {
      state.isLoggedIn = false;
    },
    mutateToken(state, token) {
      state.user.token = token;
      localStorage.setItem("token", token)
    },mutateUsername(state, username) {
      state.user.username = username;
    },mutateBalance(state, balance) {
      state.user.balance = balance;
    },mutateRoles(state, roles) {
      state.user.roles = roles;
    },mutateId(state, id) {
      state.user.id = id;
    }, mutateShouldChangePassword(state, bool) {
      state.shouldChangePassword = bool;
    },

  },
  getters:{


  }
};

