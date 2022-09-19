export const state = () => ({
  isOpen: false,
});

export const mutations = {
  setIsOpen(state, payload) {
    state.isOpen = payload;
  },
};

export const getters = {
  getIsOpen(state) {
    return state.isOpen;
  },
};
