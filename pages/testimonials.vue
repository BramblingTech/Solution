<template>
  <main class="testimonials">
    <LayoutsPageHeader :data="$t('reviews-header')" />
    <section class="comments-section">
      <div class="container">
        <div class="comments-grid">
          <div class="comments-col comments-col__cards">
            <UICommentCard
              v-for="comment in reviews.data"
              :key="comment.id"
              :comment="comment"
            />
            <UIMyButton
              v-if="showBtn"
              :click="showMoreReviews"
              class="comments-section__btn"
            >{{$t('button-showmore')}}</UIMyButton>
          </div>
          <div class="comments-col comments-col__sort">
            <UISortDropDown
              :is-tablet="isTablet"
              :options="sortOptions"
              @pick="handleSortOption"
            />
          </div>

        </div>
      </div>
    </section>
    <LayoutsFormWrapper>
      <FormTestimonials />
    </LayoutsFormWrapper>

  </main>
</template>

<script>
export default {
  name: 'Testimonials',

  data: () => ({
    sortOptions: [
      {
        title: 'Сначала новые',
        type: 'desc',
      },
      {
        title: 'Сначала старые',
        type: 'asc',
      },
    ],
    sortOption: {},
  }),

  async fetch({ store, i18n: { locale } }) {
    const options = {
      locale,
    };

    if (!store.getters['testimonials/getReviews'][locale].data) {
      await store.dispatch('testimonials/fetchReviews', options);
    }
  },

  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    reviews() {
      const getter = this.$store.getters['testimonials/getReviews'];
      return getter[this.currentLocale].data ? getter[this.currentLocale] : {};
    },
    isTablet() {
      return this.$store.getters['devices/isTab']
        ? this.$store.getters['devices/isTab']
        : false;
    },
    showBtn() {
      return this.reviews.data
        ? this.reviews.data.length > 0 && this.reviews.links.next
        : false;
    },
  },

  beforeDestroy() {
    const options = {
      locale: this.currentLocale,
      param: this.sortOption.type,
    };
    this.$store.dispatch('testimonials/fetchReviews', options);
  },

  created() {
    this.sortOptions = this.$t('reviews-sort-options');
  },

  methods: {
    handleSortOption(value) {
      this.sortOption = value;

      const options = {
        locale: this.currentLocale,
        param: this.sortOption.type,
      };

      this.$store.dispatch('testimonials/fetchReviews', options);
    },
    showMoreReviews() {
      this.$store.dispatch('testimonials/fetchMoreReviews', {
        locale: this.currentLocale,
        param: this.sortOption.type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.comments {
  &-section {
    margin-bottom: 0;
  }
  &-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 30px;
    @include for-md-down {
      grid-template-columns: auto;
      row-gap: 44px;
    }
  }
  &-col {
    position: relative;
    &__sort {
      @include for-md-down {
        order: -1;
      }
    }
    .comments-section__btn {
      position: absolute;
      bottom: -95px;
      left: 50%;
      text-align: center;
      width: 100%;
      max-width: 250px;
      padding: 13px 20px;
      transform: translateX(-50%);
    }
  }
}
</style>
