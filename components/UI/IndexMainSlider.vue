<template>

  <div
    v-swiper:mySwiper="swiperOption"
    class="index-swiper"
  >
    <div class="swiper-wrapper">
      <div
        v-for="(banner, i) in banners"
        :key="banner.title"
        class="swiper-slide"
      >
        <div class="image-frame-wrapper">
          <img
            class="swiper-lazy"
            :src="`/images/${banner.img}`"
          />
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </div>
        <div class="index-swiper__content-container">
          <div class="index-swiper__content-wrapper">
            <h2 class="index-swiper__title title">{{banner.title}}</h2>
            <UIMyButtonLink
              :my-exact="true"
              :my-to="localePath(banner.link)"
              class="index-swiper__btn"
            >{{$t('button-more')}}</UIMyButtonLink>
            <p class="index-swiper__counter">
              <span class="index-swiper__counter_current">{{i + 1}}</span> / {{getSliderLength}}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      slot="scrollbar"
      class="swiper-scrollbar"
    ></div>
  </div>

</template>

<script>
export default {
  name: 'IndexMainSlider',
  props: {
    banners: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data: () => ({
    swiperLength: 0,
    swiperOption: {
      initialSlide: 0,
      speed: 1000,
      loop: true,
      centeredSlides: true,
      lazy: true,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    },
  }),
  computed: {
    getSliderLength() {
      return this.banners.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.image-frame-wrapper {
  height: 100%;
}
</style>
