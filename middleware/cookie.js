export default ({ app }) => {
  const isCookie = app.$cookies.get('accepted-cookie');

  if (!isCookie) {
    app.store.commit('cookie/setIsOpen', true);
  }
};
