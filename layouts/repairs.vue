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
    <section class="repairs__services">
      <div class="container">
        <h2 class="title">{{$t('repairs-layout.title')}}</h2>
        <LayoutsServicesThemplate :columns="2">
          <UIServiceItem
            v-for="(service, i) in getServices"
            :key="service.text + i"
            :service="service"
            :window-width="windowWidth"
          />
        </LayoutsServicesThemplate>

      </div>
    </section>

    <FooterMain />
    <UICookie v-if="isOpenedCookie" />
  </div>
</template>

<script>
import windowWidth from '~/mixins/windowWidth';

export default {
  name: 'Repairs',
  mixins: [windowWidth],
  middleware: 'cookie',

  async fetch() {
    const options = {
      locale: this.currentLocale,
      slug: this.slug,
    };

    const reviews = this.$store.getters['testimonials/getReviewsSlug'];

    if (!reviews[this.currentLocale][this.slug]?.data) {
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
    getComments() {
      const getter = this.$store.getters['testimonials/getReviewsSlug'];
      return getter[this.currentLocale][this.slug]?.data
        ? getter[this.currentLocale][this.slug].data
        : [];
    },
    getServices() {
      const services = this.$t('services');

      return services
        .filter(
          (el) => el.type === 'repairs' && !this.$route.path.includes(el.link)
        )
        .slice(0, 2);
    },
    windowWidth() {
      return this.$store.state.devices.windowWidth;
    },

    slug() {
      return this.$route.path.replace('/service/', '');
    },
  },

  watch: {
    currentLocale() {
      this.$fetch();
    },
    slug() {
      this.$fetch();
    },
  },

  mounted() {
    this.$fetch();
  },
};
</script>

<style lang="scss" scoped>
.repairs__services {
  background: url(/images/bg.svg) repeat 0 0;
  margin-bottom: 0;
  padding-bottom: 180px;
  h2 {
    margin-bottom: 34px;
  }
  @include for-md-down {
    padding-bottom: 110px;
  }
}
</style>
