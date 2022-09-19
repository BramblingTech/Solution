<template>
  <article
    class="article"
    @mouseover="showShareModal"
    @mouseout="hideShareModal"
  >
    <NuxtLink
      ref="container"
      :exact="true"
      :to="getNuxtLink"
      class="article__link"
    >
      <div
        class="image-frame-wrapper"
        :style="{height: getImageWrapperHeight}"
      >
        <img
          :src="content.preview_image"
          :alt="content.title"
          :style="showModal
                ? {opacity: 20 + '%'}
                : {opacity: 1}"
          class="article__img"
        >
      </div>
      <div
        class="article__content-wrapper"
        :style="showModal ? {bottom: 0} : {bottom: '-' + getContentStartPosition}"
      >
        <h3 class="article__title">{{content.title}}</h3>
        <p
          ref="content"
          class="article__description"
        >{{content.description}}</p>
      </div>
    </NuxtLink>
    <div class="article__info-list-wrapper">
      <BlogArticleInfoBlock
        :slug="content.slug"
        :date="content.created_at"
        :views="content.views_count"
      />
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    content: {
      type: Object,
      default: () => ({}),
      require: true,
    },
    windowWidth: {
      type: Number,
      default: 0,
    },
    isTab: {
      type: Boolean,
      default: false,
    },
    isMob: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showModal: false,
    domain: null,
    contentHeight: 0,
    containerHeight: 0,
  }),

  computed: {
    getContentStartPosition() {
      const newPosition =
        (this.contentHeight * 100) /
        (this.containerHeight + this.visibilityCoefficient * 2.5);
      return newPosition + '%';
    },
    getImageWrapperHeight() {
      const newHeight = 100 - this.visibilityCoefficient;
      return newHeight + '%';
    },
    getNuxtLink() {
      return this.$i18n.locale === this.$i18n.defaultLocale
        ? `/blog/${this.content.slug}`
        : `/${this.$i18n.locale}/blog/${this.content.slug}`;
    },
    visibilityCoefficient() {
      if (this.windowWidth <= 430) return 30;
      return this.isTab ? 21 : 30;
    },
  },

  watch: {
    windowWidth() {
      this.setContainerHeight();
      this.setContentHeight();
    },
  },

  mounted() {
    const timeout = setTimeout(() => {
      this.setContainerHeight();
      this.setContentHeight();
      clearTimeout(timeout);
    }, 100);
  },

  methods: {
    showShareModal() {
      this.showModal = true;
    },
    hideShareModal() {
      this.showModal = false;
    },
    setContainerHeight() {
      this.$refs.container
        ? (this.containerHeight = this.$refs.container.$el.offsetHeight)
        : (this.containerHeight = 0);
    },
    setContentHeight() {
      this.$refs.content
        ? (this.contentHeight = this.$refs.content.offsetHeight)
        : (this.contentHeight = 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;
  box-shadow: 0 18px 65px rgba(62, 62, 62, 0.07),
    0 2.43391px 25.6132px rgba(62, 62, 62, 0.0317368);
  border-radius: 4px;
  background: $secondary-white2;
  &__link {
    height: 400px;
    position: relative;
    overflow: hidden;
    @media screen and (min-width: 1024px) {
      &:hover {
        color: $secondary-black2;
        &::after {
          display: none;
        }
        .article__title {
          color: $primary-flat;
          &::after {
            width: 90%;
          }
        }
      }
    }
  }
  .image-frame-wrapper {
    img {
      opacity: 1;
      @include transition(opacity);
    }
  }
  &__content-wrapper {
    position: absolute;
    padding: 15px;
    bottom: -180px;
    pointer-events: none;
    @include transition(bottom);
  }
  &__info-list-wrapper {
    padding: 15px;
    .info-list {
      max-width: 100%;
    }
  }
  &__title {
    position: relative;
    font-size: em(18);
    line-height: 140%;
    text-align: center;
    margin-bottom: 16px;
    @include transition(color);
    @include for-md-down {
      line-height: 120%;
    }
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      top: -3px;
      left: 50%;
      background: $primary-flat;
      z-index: 2;
      transform: translateX(-50%);
      @include transition(width);
    }
  }
}
</style>
