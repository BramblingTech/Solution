import Vue from 'vue';

export const state = () => ({
  obj: {
    reviewsObj: {
      ua: {},
      ru: {},
    },
    reviewsSlug: {
      ua: {},
      ru: {},
    },
  },
});

export const mutations = {
  addReviews(state, comment) {
    state.obj.reviewsObj[comment.locale] = comment;
  },

  addReviewsBySlug(state, comment) {
    Vue.set(
      state.obj.reviewsSlug[comment.locale],
      comment.slug,
      state.obj.reviewsSlug[comment.locale][comment.slug]
    );
    state.obj.reviewsSlug[comment.locale][comment.slug] = comment;
  },

  addMoreReviews(state, { data, locale, links, meta }) {
    state.obj.reviewsObj[locale].data = [
      ...state.obj.reviewsObj[locale].data,
      ...data,
    ];
    state.obj.reviewsObj[locale].links = links;
    state.obj.reviewsObj[locale].meta = meta;
  },
};

export const actions = {
  async fetchReviews({ commit }, { locale = 'ru', param = 'desc' }) {
    const api = `${process.env.API_URL}${locale}/reviews?sort=created_at&direction=${param}`;
    try {
      const comment = await fetch(api);
      const json = await comment.json();

      const localeData = { ...json, locale };

      commit('addReviews', localeData);
    } catch (error) {
      console.error(error);
    }
  },

  async fetchReviewsBySlug({ commit }, { locale = 'ru', slug }) {
    const api = `${process.env.API_URL}${locale}/services/${slug}/reviews`;
    try {
      const comment = await fetch(api);
      const json = await comment.json();

      const localeData = { ...json, locale, slug };

      commit('addReviewsBySlug', localeData);
    } catch (error) {
      console.error(error);
    }
  },

  async fetchMoreReviews({ commit, state }, { locale = 'ru' }) {
    try {
      const api = state.obj.reviewsObj[locale].links.next;
      const comment = await fetch(api);
      const json = await comment.json();

      const localeData = { ...json, locale };

      commit('addMoreReviews', localeData);
    } catch (error) {
      console.error(error);
    }
  },
};

export const getters = {
  getReviews(state) {
    return state.obj.reviewsObj;
  },
  getReviewsSlug(state) {
    return state.obj.reviewsSlug;
  },
};
