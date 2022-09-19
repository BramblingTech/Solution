<template>
  <article class="hero-article">

    <div class="hero-article__content-wrapper">
      <NuxtLink
        :exact="true"
        :to="getNuxtLink"
        class="hero-article__link"
      >
        <div class="hero-article__left-col">
          <div class="image-frame-wrapper">
            <img
              v-lazy-load
              :data-src="content.preview_image"
              :alt="content.title"
            >
          </div>
        </div>
      </NuxtLink>
        <div class="hero-article__right-col">
           <NuxtLink
            :exact="true"
            :to="getNuxtLink"
            class="hero-article__link"
          >
            <h1 class="hero-article__title">{{content.title}}</h1>
          </NuxtLink>
          <p class="hero-article__description">{{content.description}}</p>
          <div class="hero-article__info-wrapper">
            <BlogArticleInfoBlock :slug="content.slug" :date="content.created_at" :views="content.views_count"/>
          </div>
      </div>
    </div>

  </article>
</template>

<script>
export default {
  name: 'HeroArticle',
  props: {
    content: {
      type: Object,
      default: () => ({}),
      require: true,
    },
  },
  computed: {
    getNuxtLink() {
      return this.$i18n.locale === this.$i18n.defaultLocale
        ? `/blog/${this.content.slug}`
        : `/${this.$i18n.locale}/blog/${this.content.slug}`
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-article {
  box-shadow: 0 18px 65px rgba(62, 62, 62, 0.07),
    0 2.43391px 25.6132px rgba(62, 62, 62, 0.0317368);
  border-radius: 4px;
  &__link{
    display: block;
    @media screen and (min-width: 1024px) {
      &:hover {
        color: $secondary-black2;
        .hero-article__title {
          color: $primary-flat;
          &::after {
            width: 80%;
          }
        }
        .image-frame-wrapper {
          img {
            opacity: .25;
          }
        }
        &::after {
          display: none;
        }
      }
    }
  }
  &__content-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    @include for-md-down {
      grid-template-columns: 1fr;
    }
  }
  &__left-col {
    border-radius: 4px;
    overflow: hidden;
    height: 408px;
    img {
      background: $secondary-white;
      @include transition(opacity);
    }
  }
  &__right-col {
    align-self: center;
    padding: 15px 15px 15px 0;
    @include for-lg-down {
      padding: 15px;
    }
  }
  &__title {
    position: relative;
    font-weight: bold;
    font-size: em(34);
    line-height: 120%;
    margin-bottom: 24px;
    @include transition(color);
    @include for-md-down {
      text-align: center;
      font-size: em(18);
      margin-bottom: 14px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      top: 0;
      left: 0;
      background: $primary-flat;
      z-index: 2;
      @include transition(width);
    }
  }
  &__description {
    margin-bottom: 24px;
  }
}
</style>
