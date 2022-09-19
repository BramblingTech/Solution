<template>
  <section class="service-themplate-text-img-grid2">
    <div class="container">
      <LayoutsTextImageBlock
        v-if="!isMob"
        :is-mobile="isMob"
      >
        <div class="service-themplate-text-img-grid2__left-col">
          <h2 class="service-themplate-text-img-grid2__title title">{{content.title}}</h2>
          <p
            v-for="(paragraph, i) in content.paragraphs"
            :key="paragraph+i"
          >
            {{paragraph}}
          </p>
          <ul
            v-show="content.points"
            :aria-hidden="content.points ? false : true"
            class="description-list"
          >
            <li
              v-for="(point, i) in content.points"
              :key="point + i"
            >
              {{point}}
            </li>
          </ul>
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
        <LayoutsThemplateGrid1x1>
          <div class="image-frame-wrapper">
            <img
              class="service-themplate-text-img-grid2__img"
              :src="'/images/' + content.img[0]"
              :alt="content.title"
            >
          </div>
          <div class="image-frame-wrapper">
            <img
              class="service-themplate-text-img-grid2__img"
              :src="'/images/' + content.img[1]"
              :alt="content.title"
            >
          </div>
        </LayoutsThemplateGrid1x1>
      </LayoutsTextImageBlock>
      <LayoutsTextImageBlock
        v-else
        :is-mobile="isMob"
      >
        <div class="service-themplate-text-img-grid2__left-col">
          <h2 class="service-themplate-text-img-grid2__title title">{{content.title}}</h2>
          <div class="image-frame-wrapper">
            <img
              class="service-themplate-text-img-grid2__img"
              :src="'/images/' + content.img[0]"
              :alt="content.title"
            >
          </div>
          <p
            v-for="(paragraph, i) in content.paragraphs"
            :key="paragraph+i"
          >
            {{paragraph}}
          </p>
        </div>
      </LayoutsTextImageBlock>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TextImage2Grid1x2',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
    isMob: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.service-themplate-text-img-grid2 {
  &__title {
    width: 695px;
    @include for-lg-down {
      width: 100%;
    }
  }
  .grid-1x1 {
    @include for-lg-down {
      grid-template-columns: 1fr;
    }
    .image-frame-wrapper {
      align-self: center;
      &:first-child {
        height: 338px;
      }
      &:last-child {
        @include for-lg-down {
          display: none;
        }
      }
    }
  }
}
</style>
