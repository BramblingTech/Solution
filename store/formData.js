export const state = () => ({
  formData: {},
  openModal: false,
});

export const mutations = {
  add(state, form) {
    state.formData = form;
  },
  closeModal(state, closeModal) {
    state.openModal = closeModal;
  },
  toggleModal(state) {
    state.openModal = !state.openModal;
  },
};
