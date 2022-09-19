<template>
  <main class="about">
    <LayoutsPageHeader :data="$t('about-header')" />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('about-description')"
    />
    <section class="about__testimonials">
      <UICommentsSlider :comments="getComments" />
    </section>
    <section class="about__background-pic">
      <div class="image-frame-wrapper">
        <img
          src="~/images/about-bg-pic.jpg"
          alt="about-bg-pic"
        >
      </div>
    </section>
    <section
      id="form-section"
      class="question-form"
    >
      <div class="container">
        <Form />
      </div>
    </section>

  </main>
</template>

<script>
export default {
  name: 'About',

  data: () => ({
    backgroundSection: {
      image: 'about-bg-pic.jpg',
    },
    form: {
      title: 'Бесплатная консультация специалиста',
    },
  }),

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
    getComments() {
      const getter = this.$store.getters['testimonials/getReviews'];
      return getter[this.getCurrentLocale].data
        ? getter[this.getCurrentLocale].data
        : [];
    },
    isMob() {
      return this.$store.getters['devices/isMob']
        ? this.$store.getters['devices/isMob']
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  &__testimonials {
    margin-bottom: 260px;
  }
  &__background-pic {
    margin-bottom: 0;
    height: 954px;
  }
}
.question-form {
  padding: 180px 0;
  background: url(/images/bg.svg) repeat 0 0;
  margin-bottom: 0;
  @include for-md-down {
    padding: 110px 0;
  }

  &__title {
    font-size: em(34);
    line-height: 120%;
    margin-bottom: 34px;
    @include for-md-down {
      text-align: center;
      font-size: em(24);
    }
  }
}
</style>
