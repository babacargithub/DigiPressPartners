import {LocalStorage} from "quasar";

export const user_login = {
  namespaced: true,
  state: {
    isLoggedIn: Boolean(localStorage.getItem("is_logged_in")),
    shouldChangePassword: false,
    user: {
      id:null,
      isAdmin: false,
      isSuperAdmin: false,
      isCEO: true,
      token: String(localStorage.getItem("token")),
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
      localStorage.setItem("is_logged_in","1")
    },

    markAsLoggedOut(state) {
      localStorage.setItem("is_logged_in","0")
      localStorage.setItem("token","")
      state.isLoggedIn = false;

    },
    mutateToken(state, token) {
      state.user.token = token;
      localStorage.setItem("token", token)
    },mutateUsername(state, username) {
      state.user.username = username;
    },mutateId(state, id) {
      state.user.id = id;
    }, mutateShouldChangePassword(state, bool) {
      state.shouldChangePassword = bool;
    },

  },
  getters:{


  }
};

