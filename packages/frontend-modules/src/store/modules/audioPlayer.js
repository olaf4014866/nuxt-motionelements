const state = {

  isInit: false,
  playStatus: '',
  playProgress: {
    timeElapsed: 0,
    timeTotal: 0,
    timeEstimated: 0,
  },
  waveformWidth: 0,
  element: {
    id: false,
  },

};

const getters = {

  playElementId: state => state.element.id,
  playStatus: state => state.playStatus,
  playProgress: state => state.playProgress,
  waveformWidth: state => state.waveformWidth,
  element: state => state.element,

};

const actions = {

  setInitStatus({ commit }, bool) {
    commit('setInitStatus', bool);
  },

  setPlayStatus({ commit }, status) {
    commit('setPlayStatus', status);
  },

  setPlayProgress({ commit }, status) {
    commit('setPlayProgress', status);
  },

  setWaveformWidth({ commit }, width) {
    commit('setWaveformWidth', width);
  },

  setElementInfo({ commit }, element) {
    commit('setElementInfo', element);
  },

};

const mutations = {

  setInitStatus(state, status) {
    state.isInit = status;
  },

  setPlayStatus(state, status) {
    state.playStatus = status;
  },

  setPlayProgress(state, progress) {
    state.playProgress = progress;
  },

  setWaveformWidth(state, width) {
    state.waveformWidth = width;
  },

  setElementInfo(state, element) {
    state.element = element;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
