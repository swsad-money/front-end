/*
 * @Description: mine
 */

// state
const state = {
  user: {}
}

// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  setUserInfo({ commit }, flag) {
    commit.commit('SET_USER', flag);
  }
}

// mutations
const mutations = {
  // user
  SET_USER: (state, flag) => {
    state.user = flag;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}