<template>
  <section class="services-content-grid-1x2">
    <div
      v-if="!isMob"
      class="container"
    >
      <LayoutsTextImageBlock>
        <div class="services-content-grid-1x2__left-col">
          <h2 class="services-content-grid-1x2__title title">{{content.title}}</h2>
          <p
            v-for="(p, i) in getParagraphs"
            :key="p + i"
            class="services-content-grid-1x2__description"
          >{{p}}</p>
          <UIMyButtonLink
            v-show="content.link && button"
            :my-exact="true"
            :my-to="localePath(content.link)"
            :aria-hidden="button ? false : true"
          >{{content.btnTitle}}</UIMyButtonLink>

          <UIAnchorLink
            v-show="content.anchor && button"
            :aria-hidden="button ? false : true"
            :anchor="content.anchor"
          >{{content.btnTitle}}</UIAnchorLink>
          <ul
            v-show="content.circledPoints"
            :aria-hidden="content.circledPoints ? false : true"
            class="circled-list"
          >
            <li
              v-for="(type, i) in content.circledPoints"
              :key="type + i"
            >
              <span class="circle">{{i+1}}</span>{{type}}
            </li>
          </ul>

        </div>
        <div class="services-content-grid-1x2__right-col">
          <div class="image-frame-wrapper">
            <img
              :src="'/images/' + content.img"
              :alt="content.title"
            >
          </div>
        </div>
      </LayoutsTextImageBlock>
    </div>
    <div
      v-else
      class="container"
    >
      <h2 class="services-content-grid-1x2__title title">{{content.title}}</h2>
      <div class="image-frame-wrapper">
        <img
          :src="'/images/' + content.img"
          :alt="content.title"
        >
      </div>
      <p
        v-for="(p, i) in getParagraphs"
        :key="p + i"
        class="services-content-grid-1x2__description"
      >{{p}}</p>
      <UIMyButtonLink
        v-show="content.link && button"
        :my-exact="true"
        :my-to="localePath(content.link)"
        :aria-hidden="button ? false : true"
      >{{content.btnTitle}}</UIMyButtonLink>

      <UIAnchorLink
        v-show="content.anchor && button"
        :aria-hidden="button ? false : true"
        :anchor="content.anchor"
      >{{content.btnTitle}}</UIAnchorLink>

      <ul
        v-show="content.circledPoints"
        :aria-hidden="content.circledPoints ? false : true"
        class="circled-list"
      >
        <li
          v-for="(type, i) in content.circledPoints"
          :key="type + i"
        >
          <span class="circle">{{i+1}}</span>{{type}}
        </li>
      </ul>

    </div>
  </section>
</template>

<script>
export default {
  name: 'TextImgGrid1x2',
  props: {
    content: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    button: {
      type: Boolean,
      default: false,
    },
    isMob: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  computed: {
    getParagraphs() {
      return this.content.description.split('\n');
    },
  },
};
</script>

<style lang="scss" scoped>
.services-content-grid-1x2 {
  &__right-col {
    border-radius: 4px;
    overflow: hidden;
  }
  .image-frame-wrapper {
    @include for-md-down {
      margin-bottom: 34px;
    }
  }
  &__title {
    @include for-md-down {
      margin-bottom: 34px;
    }
  }
  &__description {
    margin-bottom: 34px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .btn {
    width: fit-content;
    @include for-md-down {
      margin: 0 auto;
    }
  }
}
</style>
