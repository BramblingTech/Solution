<template>
  <transition name="fadeIn">
    <div
      v-show="isOpen"
      v-scroll-lock="isOpen"
      class="thank-you-modal"
      @click.stop="closeModalWrapper"
    >
      <div class="thank-you-modal__content-wrapper">
        <h3 class="thank-you-modal__title">{{modalContent.title}}</h3>
        <svg
          class="thank-you-modal__icon"
          width="76"
          height="76"
          viewBox="0 0 76 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38 0C17.0474 0 0 17.0459 0 38C0 58.9541 17.0474 76 38 76C58.9526 76 76 58.9541 76 38C76 17.0459 58.9526 0 38 0ZM59.185 25.327L35.8004 51.6347C35.2245 52.2822 34.4222 52.6154 33.6139 52.6154C32.9723 52.6154 32.3278 52.4049 31.7885 51.9752L17.1731 40.2829C15.9132 39.2759 15.7086 37.4358 16.7171 36.1745C17.7241 34.9132 19.5656 34.7086 20.8255 35.7171L33.2734 45.6745L54.815 21.4408C55.8848 20.2335 57.7352 20.1254 58.9409 21.1982C60.1482 22.2724 60.2578 24.1198 59.185 25.327Z"
            fill="url(#thank-you-gradient)"
          />
          <defs>
            <linearGradient
              id="thank-you-gradient"
              x1="38"
              y1="0"
              x2="38"
              y2="76"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#8EC674" />
              <stop
                offset="1"
                stop-color="#719C5D"
              />
            </linearGradient>
          </defs>
        </svg>
        <p class="thank-you-modal__text">{{modalContent.description}}</p>
        <button
          type="button"
          class="thank-you-modal__btn"
          @click.stop="closeModalBtn"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#thank-you-close-btn)">
              <path
                d="M8.93781 8.00465L15.7964 1.14611C16.0611 0.890455 16.0684 0.468636 15.8127 0.203925C15.5571 -0.0607856 15.1353 -0.0681257 14.8706 0.187527C14.865 0.192876 14.8596 0.198342 14.8542 0.203925L7.99559 7.06247L1.13705 0.203886C0.872334 -0.0517667 0.450515 -0.0444266 0.194863 0.220284C-0.054543 0.478513 -0.054543 0.887878 0.194863 1.14611L7.0534 8.00465L0.194863 14.8632C-0.0652798 15.1234 -0.0652798 15.5452 0.194863 15.8054C0.455044 16.0655 0.876863 16.0655 1.13705 15.8054L7.99559 8.94683L14.8541 15.8054C15.1188 16.061 15.5407 16.0537 15.7963 15.789C16.0457 15.5307 16.0457 15.1214 15.7963 14.8632L8.93781 8.00465Z"
                fill="#495244"
              />
            </g>
            <defs>
              <clipPath id="thank-you-close-btn">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ThankYou',

  data: () => ({
    autoCloseModal: false,
  }),

  computed: {
    isOpen() {
      return this.$store.state.modals.thankYouModalOpen;
    },

    isTestimonials() {
      return this.$route.path.includes('testimonials');
    },

    isPost() {
      return this.$route.path.includes('blog/');
    },

    isCallBack() {
      return this.$store.getters['modals/getIsCallBack'];
    },

    modalContent() {
      if (this.isTestimonials && !this.isCallBack) {
        return this.$t('testimonials-modal');
      }

      if (this.isPost && !this.isCallBack) {
        return this.$t('post-modal');
      }

      return this.$t('thank-you-modal');
    },
  },

  watch: {
    isOpen() {
      this.autoCloseModal = true;
      const isOpen = this.$store.state.modals.thankYouModalOpen;
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.$store.commit('modals/closeThankYou', false));
        }, 5000);
      });

      if (isOpen && this.autoCloseModal) {
        promise.then(() => this.$store.commit('modals/setIsCallBack', false));
        // const openModal = setTimeout(() => {
        //   this.$store.commit('modals/setIsCallBack', false);
        //   this.$store.commit('modals/closeThankYou', false);
        //   clearTimeout(openModal);
        // }, 5000);
      }
    },
  },

  methods: {
    closeModalWrapper(e) {
      if (e.target === e.currentTarget) {
        this.autoCloseModal = false;
        this.$store.commit('modals/closeThankYou', false);
        this.$store.commit('modals/setIsCallBack', false);
      }
    },

    closeModalBtn() {
      this.autoCloseModal = false;
      this.$store.commit('modals/closeThankYou', false);
      this.$store.commit('modals/setIsCallBack', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.thank-you-modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(48, 48, 48, 0.5);
  z-index: 11;

  &__content-wrapper {
    position: relative;
    width: 100%;
    max-width: 474px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    background: $secondary-white;
    padding: 30px 50px;
    z-index: 12;
    @include for-md-down {
      width: 90%;
    }
  }

  &__title {
    text-align: center;
    font-weight: bold;
    font-size: em(24);
    line-height: 120%;
    margin-bottom: 34px;
  }

  &__icon {
    margin-bottom: 34px;
  }

  &__text {
    text-align: center;
  }

  &__btn {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 16px;
    height: 16px;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    z-index: 12;
    opacity: 0.5;
    @include transition(opacity);

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity $animation-speed;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
