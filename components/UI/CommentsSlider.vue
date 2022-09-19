<template>
  <div class="container">
    <div class="comments-wrapper">
      <div class="comments">
        <div class="comments__preview">
          <h2>{{$t('reviews-title')}}</h2>
          <p>{{$t('reviews-description')}}</p>
          <div
            slot="pagination"
            class="swiper-pagination"
          ></div>
          <div class="my-swiper-scrollbar"></div>
          <div class="my-swiper-navigation">
            <div class="my-swiper-button my-swiper-button-prev"></div>
            <div class="my-swiper-button my-swiper-button-next"></div>
          </div>
        </div>
        <div class="comments__slider">
          <div
            v-swiper:commentsSwiper="swiperOption"
            class="comments-swiper swiper"
          >
            <div class="swiper-wrapper">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="comments__card swiper-slide"
              >
                <div class="comments__header">
                  <div class="comments__avatar">
                    <svg
                      width="55"
                      height="55"
                      viewBox="0 0 55 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="27.0312"
                        cy="27.6074"
                        r="26.5"
                        stroke="#82B56A"
                      />
                      <g clip-path="url(#clip0)">
                        <path
                          d="M27.0309 27.6514C18.071 27.6514 10.7812 34.9411 10.7812 43.901C10.7812 44.291 11.0978 44.6076 11.4878 44.6076C11.8778 44.6076 12.1943 44.291 12.1943 43.901C12.1943 35.7197 18.8496 29.0644 27.031 29.0644C35.2123 29.0644 41.8676 35.7197 41.8676 43.901C41.8676 44.291 42.1842 44.6076 42.5742 44.6076C42.9642 44.6076 43.2807 44.291 43.2807 43.901C43.2806 34.9397 35.9909 27.6514 27.0309 27.6514Z"
                          fill="#82B56A"
                        />
                        <path
                          d="M27.0313 10.6074C22.747 10.6074 19.2598 14.0933 19.2598 18.379C19.2598 22.6647 22.7471 26.1505 27.0313 26.1505C31.3155 26.1505 34.8029 22.6647 34.8029 18.379C34.8029 14.0933 31.3156 10.6074 27.0313 10.6074ZM27.0313 24.7376C23.5256 24.7376 20.6728 21.8847 20.6728 18.379C20.6728 14.8733 23.5256 12.0204 27.0313 12.0204C30.537 12.0204 33.3899 14.8733 33.3899 18.379C33.3899 21.8847 30.537 24.7376 27.0313 24.7376Z"
                          fill="#82B56A"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect
                            width="34"
                            height="34"
                            fill="white"
                            transform="translate(10.0312 10.6074)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div class="comments__info">
                    <h5 class="comments__name">{{comment.name}}</h5>
                    <time :datetime="comment.created_at">{{parseDate(comment.created_at)}}</time>
                    <p class="comments__place">
                      {{comment.place}}
                    </p>
                  </div>
                </div>
                <div class="comments__body">
                  <p>
                    {{comment.body}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UIMyButtonLink
        :my-exact="true"
        :my-to="localePath(getPageLink(getMenu, 'testimonials'))"
        class="comments__btn"
      >{{$t('reviews-btn')}}</UIMyButtonLink>

    </div>
  </div>

</template>

<script>
import { getPageLink, parseDate } from '~/tools/helpers';

export default {
  props: {
    comments: {
      type: Array,
      require: true,
      default: () => [],
    },
  },

  data: () => ({
    swiperLength: 0,
    swiperOption: {
      on: {
        init() {
          this.params.navigation.nextEl = '.my-swiper-button-next';
          this.params.navigation.prevEl = '.my-swiper-button-prev';
          this.params.navigation.disabledClass = 'my-swiper-button-disabled';
          this.params.scrollbar.el = '.my-swiper-scrollbar';
        },
      },
      centeredSlides: true,
      speed: 1000,
      slidesPerView: 1,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    },
  }),

  computed: {
    getMenu() {
      return this.$t('menu');
    },
  },

  // watch: {
  //   comments: {
  //     handler(val) {
  //       console.log('changed comments', val);
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },

  methods: {
    getPageLink,
    parseDate,
  },
};
</script>

