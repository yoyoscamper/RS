import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    currUser: {},
    activeMenu: sessionStorage.activeMenu || ''
  },
  getters: {
    getToken: state => state.token,
    getCurrUser: state => state.currUser,
    getActiveMenu: state => state.activeMenu
  },
  mutations: {
    setTokens (state, token) {
      state.token = token;
      sessionStorage.token = token;
    },
    refreshToken (state) {
      state.token = sessionStorage.token;
    },
    setCurrUserInfo (state, currUser) {
      state.currUser = currUser;
      sessionStorage.currUser = currUser;
    },
    refreshCurrUser (state) {
      state.currUser = JSON.parse(sessionStorage.currUser);
      console.log(state.currUser);
    },
    setMenu (state, menu) {
      state.activeMenu = menu;
      sessionStorage.activeMenu = menu;
    },
    refreshMenu (state) {
      state.activeMenu = sessionStorage.activeMenu;
    }
  },
  actions: {
    setToken ({commit, state}, token) {
      commit('setTokens', token);
    },
    setCurrUser ({commit, state}, currUser) {
      commit('setCurrUserInfo', currUser);
    },
    refresh ({commit, state}) {
      commit('refreshToken');
      commit('refreshCurrUser');
      commit('refreshMenu');
    },
    setActiveMenu ({commit, state}, menu) {
      commit('setMenu', menu);
    }
  }
});
