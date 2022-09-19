<template>
  <main class="index">
    <UIIndexMainSlider :banners="getBanners" />
    <div class="container">
      <LayoutsTextImageBlock
        v-if="!isMob"
        :is-mobile="isMob"
        class="index__about index-section-about"
      >
        <div class="index-section-about__left-col">
          <h2 class="index-section-about__title title">
            {{$t('home-about-us-title')}}
          </h2>
          <p class="index-section-about__description">
            {{$t('home-about-us-description')}}
          </p>
          <UIMyButtonLink
            :my-exact="true"
            :my-to="localePath(getPageLink(getMenu, 'about'))"
            class="index-section-about__btn"
          >{{$t('button-more-about')}}</UIMyButtonLink>
        </div>
        <div class="index-section-about__right-col">
          <div class="image-frame-wrapper">
            <img
              v-lazy-load
              class="index-section-about__img"
              data-src="/images/index-about-section-1.jpg"
              alt="about 1"
            />
          </div>
          <div class="image-frame-wrapper">
            <img
              v-lazy-load
              class="index-section-about__img"
              data-src="/images/index-about-section-2.jpg"
              alt="about 2"
            />
          </div>
        </div>
      </LayoutsTextImageBlock>
      <LayoutsTextImageBlock
        v-else
        class="index__about index-section-about"
        :is-mobile="isMob"
      >
        <h2 class="index-section-about__title title">
          {{$t('home-about-us-title')}}
        </h2>
        <div class="image-frame-wrapper">
          <img
            v-lazy-load
            class="index-section-about__img"
            data-src="/images/index-about-section-1.jpg"
            alt="about 1"
          />
        </div>
        <p class="index-section-about__description">
          {{$t('home-about-us-description')}}
        </p>
        <UIMyButtonLink
          :my-exact="true"
          :my-to="localePath(getPageLink(getMenu, 'about'))"
          class="index-section-about__btn"
        >{{$t('button-more-about')}}</UIMyButtonLink>
      </LayoutsTextImageBlock>
      <section class="index__services index-services">
        <h2 class="index-services__title title">{{$t('home-services-title')}}</h2>
        <LayoutsServicesThemplate class="index-services__list">
          <UIServiceItem
            v-for="(service, i) in getServices"
            :key="service.text + i"
            :service="service"
            :window-width="windowWidth"
          />
        </LayoutsServicesThemplate>
        <UIMyButtonLink
          :my-exact="true"
          :my-to="localePath(getPageLink(getMenu, 'service'))"
          class="index-services__btn"
        >{{$t('button-services')}}</UIMyButtonLink>
      </section>
      <LayoutsBulletsThemplate class="index__bullets index-bullets">
        <template #title>
          <h2 class="title">{{$t('home-bullet-title')}}</h2>
        </template>
        <template #content>
          <div class="left-col">
            <p>
              {{$t('home-bullet-description')}}
            </p>
          </div>
          <div class="right-col">
            <UIBulletItem
              v-for="(bullet, i) in $t('home-bullets')"
              :key="bullet.title + i"
              :bullet="bullet"
            />
          </div>
        </template>
      </LayoutsBulletsThemplate>
      <UICommentsSlider
        class="index__comments"
        :comments="getComments"
      />
    </div>
    <div class="index__pic-wrapper image-frame-wrapper">
      <img
        v-lazy-load
        data-src="/images/index-pic.jpg"
        alt="sound solution"
      />
    </div>
    <div class="container">
      <section class="index__faq-section">
        <h2>{{$t('home-faq.title')}}</h2>
        <LayoutsFAQ>
          <template #left>
            <UIFAQItem
              v-for="(question, i) in $t('home-faq.questions').filter((el, i) => !(i % 2))"
              :key="question.title + i"
              :question="question"
              :window-width="windowWidth"
            />
          </template>
          <template #right>
            <UIFAQItem
              v-for="(question, i) in $t('home-faq.questions').filter((el, i) => i % 2)"
              :key="question.title + i"
              :question="question"
              :window-width="windowWidth"
            />
          </template>
        </LayoutsFAQ>
      </section>

      <section class="index__blog index-blog">
        <h2 class="index-blog__title title">{{$t('home-blog-title')}}</h2>
        <LayoutsServicesThemplate class="index-blog__list">
          <UIBlogItem
            v-for="post in getBlogItems"
            :key="post.id"
            :post="post"
            :window-width="windowWidth"
          />
        </LayoutsServicesThemplate>
        <UIMyButtonLink
          :my-exact="true"
          :my-to="localePath(getPageLink(getMenu, 'blog'))"
          class="index-blog__btn"
        >{{$t('button-all-posts')}}</UIMyButtonLink>
      </section>
    </div>
    <section class="index__form">
      <Form />
    </section>
  </main>
</template>

<script>
import { getPageLink } from '@/tools/helpers';

export default {
  name: 'Home',
  data: () => ({
    dialogVisible: false,
  }),
  async fetch({ store, i18n }) {
    const blogPosts = store.getters['blog/getBlogPostsSorted'];
    const reviews = store.getters['testimonials/getReviews'];

    if (!blogPosts[i18n.locale].data) {
      await store.dispatch('blog/setBlogPosts', {
        locale: i18n.locale,
      });
    }

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
    getServices() {
      const services = this.$t('services');
      return services.filter((el) => el.primary);
    },
    getMenu() {
      return this.$t('menu');
    },
    getComments() {
      const getter = this.$store.getters['testimonials/getReviews'];
      return getter[this.getCurrentLocale].data
        ? getter[this.getCurrentLocale].data
        : [];
    },
    getBlogItems() {
      const posts = this.$store.getters['blog/getBlogPostsSorted'];
      return posts[this.getCurrentLocale].data
        ? [...posts[this.getCurrentLocale].data].splice(0, 3)
        : [];
    },
    getBanners() {
      return this.getServices.filter((_, i) => i === 0 || i === 3 || i === 4);
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
  },
  methods: {
    getPageLink,
  },
};
</script>
