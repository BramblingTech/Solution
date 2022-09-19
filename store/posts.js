export const state = () => ({
  posts: [],
});

export const mutations = {
  addPosts(state, posts) {
    state.posts = posts;
  },
};
