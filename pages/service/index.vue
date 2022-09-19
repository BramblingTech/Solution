<template>
  <main class="services">
    <section class="services__main">
      <LayoutsPageHeader :data="$t('services-header')" />
    </section>
    <ServicesTextImgGrid1x2
      :button="true"
      :content="$t('services-about')"
      :is-mob="isMob"
    />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('services-description')"
    />
    <section
      id='services-list'
      class="services__services"
    >
      <div class="container">
        <h2 class="title">{{$t('services-items-title')}}</h2>
        <LayoutsServicesThemplate class="index-services__list">
          <UIServiceItem
            v-for="(service, i) in getServices"
            :key="service.text + i"
            :service="service"
            :window-width="windowWidth"
          />
        </LayoutsServicesThemplate>
      </div>
    </section>

    <LayoutsCommentsWrapper>
      <UICommentsSlider :comments="getComments" />
    </LayoutsCommentsWrapper>

    <LayoutsFormWrapper>
      <FormApplication />
    </LayoutsFormWrapper>

  </main>
</template>

<script>
export default {
  name: 'Services',

  async fetch({ store, i18n }) {
    const reviews = store.getters['testimonials/getReviews'];

    if (!reviews[i18n.locale].data) {
      await store.dispatch('testimonials/fetchReviews', {
        locale: i18n.locale,
      });
    }
  },

  computed: {
    getCurrentLocale() {
      return this.$i18n.locale;
    },

    getAllServices() {
      return this.$store.getters['navigation/getServices'];
    },
    getServices() {
      return this.$t('services');
    },
    isMob() {
      return this.$store.getters['devices/isMob']
        ? this.$store.getters['devices/isMob']
        : false;
    },
    windowWidth() {
      return this.$store.getters['devices/windowWidth']
        ? this.$store.getters['devices/windowWidth']
        : 0;
    },

    getComments() {
      const getter = this.$store.getters['testimonials/getReviews'];
      return getter[this.getCurrentLocale].data
        ? getter[this.getCurrentLocale].data
        : [];
    },
  },
};
</script>
