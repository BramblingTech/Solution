<template>
  <section
    class="page-header"
    :class="{'page-header--error': is404}"
  >
    <div class="image-frame-wrapper">
      <img
        v-lazy-load
        :data-src="`/images/${data.image}`"
        :alt="data.image"
      >
    </div>
    <div
      v-if="data.title"
      class="page-header__content-container"
      :class="{'page-header__content-container--error': is404}"
    >
      <div class="page-header__content-wrapper">
        <h1
          class="page-header__title title"
          :class="{'page-header__title--error': is404}"
        >{{data.title}}</h1>
        <h4
          v-if="is404"
          class="page-header__subtitle"
        >{{$t('404-header.subtitle')}}</h4>
        <p class="page-header__description">{{data.description}}</p>
        <UIAnchorLink
          v-if="data.btnTitle && !is404"
          class="page-header__btn"
          :anchor="data.anchor"
        >{{data.btnTitle}}</UIAnchorLink>
        <UIMyButtonLink
          v-if="is404"
          class="page-header__btn"
          :class="{'page-header__btn--error': is404}"
          :my-exact="true"
          :my-to="localePath('index')"
        >
          {{$t('404-header.btnTitle')}}
        </UIMyButtonLink>
      </div>
    </div>
  </section>
</template>

<script>
import { getPageLink } from '~/tools/helpers';

export default {
  props: {
    data: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    is404: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getMenu() {
      return this.$t('menu');
    },
  },

  methods: {
    getPageLink,
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  position: relative;
  height: 800px;
  @include for-lg-down {
    height: 668px;
  }

  img {
    border-radius: 0;
  }

  &--error {
    height: calc(100vh - 58px);
    height: 100%;
    margin-bottom: 0;
    @include for-lg-down {
      height: calc(100vh - 44px);
    }
  }

  &__content-container {
    position: absolute;
    display: flex;
    flex-direction: column-reverse;
    top: 20px;
    left: 20px;
    bottom: 20px;
    right: 20px;
    margin-bottom: 154px;
    z-index: 1;
    @include for-md-down {
      margin-bottom: 124px;
      justify-content: center;
    }
    &--error {
      @include for-md-down {
        margin-bottom: 0;
      }
    }
  }

  &__content-wrapper {
    width: 100%;
    max-width: 1300px;
    position: relative;
    margin: 0 auto;
    z-index: 2;
    @include for-e-lg-down {
      padding: 0 6px;
    }
  }

  &__title {
    font-size: em(54);
    color: #fcfcee;
    margin-bottom: 34px;
    @include for-md-down {
      font-size: em(32);
    }
    &--error {
      font-size: em(150);
      @include for-md-down {
        font-size: em(100);
      }
      @media (orientation: landscape) and (max-width: 800px) {
        margin-bottom: 14px;
        font-size: em(80);
      }
    }
  }

  &__subtitle {
    color: #fcfcee;
    font-weight: 700;
    font-size: em(24);
    margin-bottom: 24px;
    @include for-md-down {
      text-align: center;
    }
    @media (orientation: landscape) and (max-width: 800px) {
      margin-bottom: 10px;
    }
  }

  &__description {
    color: #fcfcee;
    max-width: 413px;
    @include for-md-down {
      text-align: center;
      max-width: 100%;
    }
  }

  &__btn {
    width: max-content;
    padding: 13px 54px;
    margin-top: 34px;
    @include for-md-down {
      margin: 34px auto 0 auto;
    }
    &--error {
      @include for-md-down {
        margin: 74px auto 0 auto;
      }
      @media (orientation: landscape) and (max-width: 800px) {
        text-align: center;
        padding: 13px 15px;
        margin: 30px auto 0 auto;
      }
    }
  }
}
</style>
