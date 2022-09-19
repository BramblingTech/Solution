<template>
  <div
    ref="container"
    class="service-item"
    @mouseover="mouseIn"
    @mouseleave="mouseOut"
  >
    <NuxtLink
      :exact="true"
      :to="localePath(service.link)"
      class="service-item__link"
    >
      <div
        class="image-frame-wrapper"
        :style="modalOpen
              ? {opacity: 20 + '%', height: getImageWrapperHeight}
              : {opacity: 1, height: getImageWrapperHeight}"
      >
        <img
          v-lazy-load
          :data-src="`/images/${service.img}`"
          :alt="service.title"
          class="service-item__img"
        >
      </div>
      <div
        class="service-item__content-wrapper"
        :class="{'active': modalOpen}"
        :style="modalOpen ? {bottom: 0} : {bottom: '-' + getContentStartPosition}"
      >
        <h3 class="service-item__title">{{service.title}}</h3>
        <p
          ref="content"
          class="service-item__text"
        >{{service.text}}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ServiceItem',
  props: {
    service: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    windowWidth: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    modalOpen: false,
    contentHeight: 0,
    containerHeight: 0,
    visibilityCoefficient: 15,
  }),
  computed: {
    getContentStartPosition() {
      const newPosition = (this.contentHeight * 100) / this.containerHeight;
      return newPosition + '%';
    },
    getImageWrapperHeight() {
      const newHeight = 100 - this.visibilityCoefficient;
      return newHeight + '%';
    },
  },
  watch: {
    windowWidth() {
      this.setContainerHeight();
      this.setContentHeight();
    },
  },
  mounted() {
    this.setContainerHeight();
    this.setContentHeight();
  },
  methods: {
    mouseIn() {
      this.modalOpen = true;
    },
    mouseOut() {
      this.modalOpen = false;
    },
    setContainerHeight() {
      this.containerHeight = this.$refs.container.offsetHeight;
    },
    setContentHeight() {
      this.contentHeight = this.$refs.content.offsetHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.service-item {
  box-shadow: 0 18px 65px rgba(62, 62, 62, 0.07),
    0 2.43391px 25.6132px rgba(62, 62, 62, 0.0317368);
  border-radius: 4px;
  max-width: 413px;
  height: 338px;
  background: rgb(252, 252, 238);
  overflow: hidden;

  @include for-md-down {
    width: 100%;
    max-width: 100%;
  }
  @media screen and (max-width: 440px) {
    max-width: 414px;
    flex-grow: 1;
  }

  @include for-sm-down {
    height: 300px;
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    &:hover {
      color: $secondary-black;
      &::after {
        display: none;
      }
      .service-item__title::after {
        opacity: 1;
        width: 100%;
      }
    }
  }

  &__content-wrapper {
    position: absolute;
    top: auto;
    right: 0;
    left: 0;
    bottom: -50%;
    pointer-events: none;
    padding: 0 10px;
    z-index: 1;
    @include transition(all);
    &.active {
      padding-bottom: 10px;
    }
  }

  .image-frame-wrapper {
    margin-bottom: 5px;
    @include transition(opacity);
    @include for-md-down {
      height: 100%;
      max-height: 283px;
      object-fit: cover;
    }
    @media screen and (max-width: 440px) {
      object-fit: fill;
    }
    @include for-sm-down {
      height: auto;
    }
  }

  &__title {
    width: fit-content;
    text-align: center;
    position: relative;
    margin: 0 auto;
    margin-bottom: 10px;
    @include for-md-down {
      font-size: em(15);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $primary-flat;
      opacity: 0;
      transition: opacity $animation-speed ease, width $animation-speed ease;
    }
  }
}
</style>

