export const state = () => ({
  callBackModalOpen: false,
  thankYouModalOpen: false,
  isCallBack: false,
});

export const mutations = {
  closeCallback(state, closeModal) {
    state.callBackModalOpen = closeModal;
  },
  toggleCallback(state) {
    state.callBackModalOpen = !state.callBackModalOpen;
  },
  closeThankYou(state, closeModal) {
    state.thankYouModalOpen = closeModal;
  },
  toggleThankYou(state) {
    state.thankYouModalOpen = !state.thankYouModalOpen;
  },
  setIsCallBack(state, payload) {
    state.isCallBack = payload;
  },
};

export const getters = {
  getIsCallBack(state) {
    return state.isCallBack;
  },
};
