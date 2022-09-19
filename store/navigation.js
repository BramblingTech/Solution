export const state = () => ({
  phones: [
    '(777) 777-7771',
    '(777) 777-7772',
    '(777) 777-7773',
    '(777) 777-7774',
  ],
  email: 'soundmail@mail.com',
});

export const getters = {
  getPhones(state) {
    return state.phones;
  },
  getEmail(state) {
    return state.email;
  },
};
