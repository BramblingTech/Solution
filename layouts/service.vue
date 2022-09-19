<template>
  <div>
    <HeaderMain />
    <Nuxt />
    <LayoutsCommentsWrapper>
      <UICommentsSlider :comments="getComments" />
    </LayoutsCommentsWrapper>

    <LayoutsFormWrapper>
      <FormApplication />
    </LayoutsFormWrapper>

    <LayoutsModalWrapper />
    <FooterMain />
    <UICookie v-if="isOpenedCookie" />
  </div>
</template>

<script>
import windowWidth from '~/mixins/windowWidth';

export default {
  name: 'Service',
  mixins: [windowWidth],
  middleware: 'cookie',

  async fetch() {
    const options = {
      locale: this.currentLocale,
      slug: this.slug,
    };

    const reviews = this.$store.getters['testimonials/getReviewsSlug'];

    if (!reviews[this.currentLocale][this.slug]) {
      await this.$store.dispatch('testimonials/fetchReviewsBySlug', options);
    }
  },

  computed: {
    isOpenedCookie() {
      return this.$store.getters['cookie/getIsOpen'];
    },

    currentLocale() {
      return this.$i18n.locale;
    },

    getReviewsSlug() {
      return this.$store.getters['testimonials/getReviewsSlug'];
    },

    getComments() {
      return this.getReviewsSlug[this.currentLocale][this.slug]
        ? this.getReviewsSlug[this.currentLocale][this.slug].data
        : [];
    },

    slug() {
      const regex = /ua|service|[\/+$]/gm;
      return this.$route.path.replace(regex, '');
    },
  },

  watch: {
    currentLocale() {
      this.$fetch();
    },
  },
};
</script>
