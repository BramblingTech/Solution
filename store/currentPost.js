export const state = () => ({
  currentPost: {
    ua: {},
    ru: {},
  },
});

export const mutations = {
  addPost(state, post) {
    state.currentPost[post.locale] = post;
  },
};

export const actions = {
  async getArticle({ commit }, { locale, post }) {
    try {
      const article = await fetch(
        `https://api-sound-solution.cf.od.ua/api/${locale}/posts/${post}`
      );
      const json = await article.json();

      const { data } = json;
      const localeData = { ...data, locale };

      commit('addPost', localeData);
    } catch (error) {
      console.log(error);
    }
  },
};

export const getters = {
  getPost(state) {
    return state.currentPost;
  },
};
