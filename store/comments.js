export const state = () => ({
  commentsObj: {
    ua: {},
    ru: {},
  },
});

export const mutations = {
  addComments(state, comment) {
    state.commentsObj[comment.locale] = comment;
  },

  addMoreComments(state, { data, locale, links, meta }) {
    state.commentsObj[locale].data = [
      ...state.commentsObj[locale].data,
      ...data,
    ];
    state.commentsObj[locale].links = links;
    state.commentsObj[locale].meta = meta;
  },
};

export const actions = {
  async getComments({ commit }, { locale = 'ru', post }) {
    const api = `${process.env.API_URL}${locale}/posts/${post}/comments`;
    try {
      const comment = await fetch(api);
      const json = await comment.json();

      const localeData = { ...json, locale, post };

      commit('addComments', localeData);
    } catch (error) {
      console.error(error);
    }
  },
  async getMoreComments({ commit, state }, { locale = 'ru' }) {
    try {
      const api = state.commentsObj[locale].links.next;
      const comment = await fetch(api);
      const json = await comment.json();

      const localeData = { ...json, locale };

      commit('addMoreComments', localeData);
    } catch (error) {
      console.error(error);
    }
  },
};

export const getters = {
  getComments(state) {
    return state.commentsObj;
  },
};
