<template>
  <div
    ref="container"
    class="blog-item"
    @mouseover="mouseIn"
    @mouseout="mouseOut"
  >
    <NuxtLink
      :exact="true"
      :to="getNuxtLink"
      class="blog-item__link"
    >
      <div
        class="image-frame-wrapper"
        :style="modalOpen
            ? {opacity: 20 + '%', height: getImageWrapperHeight}
            : {opacity: 1, height: getImageWrapperHeight}"
      >
        <img
          v-lazy-load
          :data-src="post.preview_image"
          :style="modalOpen ? {opacity: 20 + '%'} : {opacity: 1}"
          :alt="post.title"
          class="blog-item__img"
        >
      </div>
      <div
        class="blog-item__content-wrapper"
        :class="{'active': modalOpen}"
        :style="modalOpen ? {bottom: 0} : {bottom: '-' + getContentStartPosition}"
      >
        <h3 class="blog-item__title">{{post.title}}</h3>
        <p
          ref="content"
          class="blog-item__description"
        >{{post.description}}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'BlogItem',
  props: {
    post: {
      type: Object,
      require: true,
      default: () => {},
    },
    windowWidth: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  data: () => ({
    modalOpen: false,
    contentHeight: 0,
    containerHeight: 0,
    visibilityCoefficient: 25,
  }),
  computed: {
    getContentStartPosition() {
      const newPosition =
        (this.contentHeight * 100) / this.containerHeight - 12;
      return newPosition + '%';
    },
    getImageWrapperHeight() {
      const newHeight = 100 - this.visibilityCoefficient;
      return newHeight + '%';
    },
    getNuxtLink() {
      return this.$i18n.locale === this.$i18n.defaultLocale
        ? `/blog/${this.post.slug}`
        : `/${this.$i18n.locale}/blog/${this.post.slug}`;
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
      this.contentHeight = this.$refs.content.clientHeight;
    },
    setContentHeight() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  box-shadow: 0 18px 65px rgba(62, 62, 62, 0.07),
    0 2.43391px 25.6132px rgba(62, 62, 62, 0.0317368);
  border-radius: 4px;
  max-width: 413px;
  height: 408px;
  background: rgb(252, 252, 238);
  overflow: hidden;
  @include for-md-down {
    width: 100%;
    max-width: 100%;
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
      .blog-item__title::after {
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

  &__img {
    margin-bottom: 5px;
    @include transition(opacity);
  }

  &__title {
    width: fit-content;
    text-align: center;
    position: relative;
    margin: 0 auto;
    margin-bottom: 10px;
    font-size: em(18);
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

