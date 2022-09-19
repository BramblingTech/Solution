<template>
  <main class="blog">
    <LayoutsPageHeader :data="$t('blog-header')" />
    <section
      v-if="!loading"
      class="blog__articles"
    >
      <div class="container">
        <BlogHeroArticle :content="getHeroPost" />
        <ul class="blog__articles-list">
          <li
            v-for="item in getPostTable"
            :key="item.id"
            class="blog__articles-item"
          >
            <BlogArticleItem
              :content="item"
              :window-width="windowWidth"
              :is-tab="isTab"
              :is-mob="isMob"
            />
          </li>
        </ul>
        <div class="blog__pagination-wrapper">
          <UIPagination
            :set-current-page="setCurrentPage"
            :total-page="getTotalPages"
            :current-page="getCurrentPage"
            :pre-page="setPrePage"
            :nex-page="setNextPage"
          />
        </div>
      </div>
    </section>
    <section v-else>
      <UILoader />
    </section>
    <section class="question-form">
      <Form />
    </section>
  </main>
</template>

<script>
import loading from '@/mixins/loading';
export default {
  name: 'Blog',
  mixins: [loading],

  async fetch({ store, i18n }) {
    const blogPosts = store.getters['blog/getBlogPosts'];

    if (!blogPosts[i18n.locale].data) {
      await store.dispatch('blog/setBlogPostsPage', {
        locale: i18n.locale,
        page: 1,
      });
    }
  },

  computed: {
    getPage() {
      return this.$store.getters['blog/getPage'];
    },
    getCurrentLocale() {
      return this.$i18n.locale ? this.$i18n.locale : 'ru';
    },
    getPosts() {
      const posts = this.$store.getters['blog/getBlogPosts'];
      return posts ? posts[this.getCurrentLocale] : {};
    },
    getHeroPost() {
      return this.getPosts.data ? this.getPosts.data[0] : {};
    },
    getPostTable() {
      return this.getPosts.data ? [...this.getPosts.data].splice(1) : [];
    },
    getPostMeta() {
      return this.getPosts.meta ? this.getPosts.meta : {};
    },
    getCurrentPage() {
      return this.$store.getters['blog/getPage'];
    },
    getTotalPages() {
      return this.$store.getters['blog/getTotalPage'];
    },
    getPageLimit() {
      return this.getPostMeta.per_page ? this.getPostMeta.per_page : 1;
    },
    windowWidth() {
      return this.$store.getters['devices/windowWidth']
        ? this.$store.getters['devices/windowWidth']
        : 0;
    },

    isTab() {
      return this.$store.getters['devices/isTab']
        ? this.$store.getters['devices/isTab']
        : false;
    },

    isMob() {
      return this.$store.getters['devices/isMob']
        ? this.$store.getters['devices/isMob']
        : false;
    },
  },

  watch: {
    getCurrentPage() {
      this.$store.dispatch('blog/setBlogPostsPage', {
        locale: this.getCurrentLocale,
        page: this.getCurrentPage,
      });
      this.setHistory();
    },
    getCurrentLocale() {
      this.$store.dispatch('blog/setBlogPostsPage', {
        locale: this.getCurrentLocale,
        page: this.getCurrentPage,
      });
      this.setHistory();
    },
  },

  mounted() {
    this.setHistory();
  },

  methods: {
    setPrePage() {
      this.$store.commit('blog/setPrePage');
    },
    setNextPage() {
      this.$store.commit('blog/setNextPage');
    },
    setCurrentPage({ target }) {
      this.$store.commit('blog/setCurrentPage', parseInt(target.innerText));
    },
    setHistory() {
      if (!history.state.page) {
        if (this.getCurrentPage !== 1) {
          history.pushState(
            { page: this.getCurrentPage },
            '',
            `${this.$route.fullPath}?page=${this.getCurrentPage}`
          );
        }
      } else {
        if (this.getCurrentPage !== 1) {
          history.replaceState(
            { page: this.getCurrentPage },
            '',
            `${this.$route.fullPath}?page=${this.getCurrentPage}`
          );
        } else {
          history.replaceState(
            { page: this.getCurrentPage },
            '',
            `${this.$route.fullPath}`
          );
        }
      }
    },
  },
};
</script>
