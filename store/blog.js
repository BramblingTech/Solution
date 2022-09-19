export const state = () => ({
  page: 1,
  totalPage: 1,
  blogList: {
    ua: {},
    ru: {},
  },
  blogListSorted: {
    ua: {},
    ru: {},
  },
});

export const actions = {
  async setBlogPosts({ commit }, { locale = 'ru', param = 'desc' }) {
    const api = `${process.env.API_URL}${locale}/posts?sort=created_at&direction=${param}`;
    try {
      const posts = await fetch(api);
      const json = await posts.json();
      const data = { ...json, locale };
      commit('addBlogPostsSorted', data);
      commit('setTotalPage', data);
    } catch (error) {
      console.error(error);
    }
  },
  async setBlogPostsPage({ commit }, { page = 1, locale = 'ru' }) {
    try {
      const posts = await fetch(
        `${process.env.API_URL}${locale}/posts?page=${page}`
      );
      const json = await posts.json();
      const data = { ...json, locale, page };
      commit('addBlogPosts', data);
      commit('setTotalPage', data);
    } catch (error) {
      console.error(error);
    }
  },
};

export const mutations = {
  addBlogPosts(state, posts) {
    state.blogList[posts.locale] = posts;
  },
  addBlogPostsSorted(state, posts) {
    state.blogListSorted[posts.locale] = posts;
  },
  addBlogPostPerPage(state, posts) {
    state.blogList[posts.locale] = posts;
  },
  setNextPage(state) {
    state.page < state.totalPage
      ? state.page++
      : (state.page = state.totalPage);
  },
  setPrePage(state) {
    state.page > 1 ? state.page-- : (state.page = 1);
  },
  setTotalPage(state, data) {
    state.totalPage = data.meta.last_page;
  },
  setCurrentPage(state, currentPage) {
    state.page = currentPage;
  },
};

export const getters = {
  getBlogPosts(state) {
    return state.blogList;
  },
  getPage(state) {
    return state.page;
  },
  getTotalPage(state) {
    return state.totalPage;
  },
  getBlogPostsSorted(state) {
    return state.blogListSorted;
  },
};
