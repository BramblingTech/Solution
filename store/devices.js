export const state = () => ({
  isMobile: false,
  isTablet: false,
  windowWidth: 0,
});

export const mutations = {
  setMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
  setTablet(state, isTablet) {
    state.isTablet = isTablet;
  },
  setWindowWidth(state, windowWidth) {
    state.windowWidth = windowWidth;
  },
};

export const getters = {
  windowWidth(state) {
    return state.windowWidth;
  },
  isMob(state) {
    return state.isMobile;
  },
  isTab(state) {
    return state.isTablet;
  },
};
