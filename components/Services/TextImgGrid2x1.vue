<template>
  <section class="services-content-grid-2x1">
    <div
      v-if="!isMob"
      class="container"
    >
      <div class="grid-2x1">
        <div class="grid-2x1__left">
          <h2 class="grid-2x1__title title">{{content.title}}</h2>
          <div
            v-if="content.description.text"
            class="grid-2x1__text-wrapper"
          >
            <p
              v-for="(p, i) in getParagraphs"
              :key="p + i"
              class="grid-2x1__text"
            >{{p}}</p>
          </div>
          <ul class="description-list">
            <li
              v-for="(point, i) in content.description.points"
              :key="point + i"
            >{{point}}</li>
          </ul>
        </div>
        <div class="grid-2x1__right">
          <div class="image-frame-wrapper">
            <img
              :src="'/images/' + content.img"
              :alt="content.title"
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="container"
    >
      <div class="grid-2x1">
        <h2 class="grid-2x1__title title">{{content.title}}</h2>
        <div class="image-frame-wrapper">
          <img
            :src="'/images/' + content.img"
            :alt="content.title"
          >
        </div>
        <div
          v-if="content.description.text"
          class="grid-2x1__text-wrapper"
        >
          <p
            v-for="(p, i) in getParagraphs"
            :key="p + i"
            class="grid-2x1__text"
          >{{p}}</p>
        </div>
        <ul class="description-list">
          <li
            v-for="(point, i) in content.description.points"
            :key="point + i"
          >{{point}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TextImgGrid2x1',
  props: {
    content: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    isMob: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  computed: {
    getParagraphs() {
      if (this.content.description.text) {
        return this.content.description.text.split('\n');
      } else {
        return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-2x1 {
  display: grid;
  grid-template-columns: minmax(500px, 2fr) minmax(200px, 1fr);
  column-gap: 30px;
  @include for-md-down {
    display: flex;
    flex-direction: column;
  }
  &__title {
    margin-bottom: 34px;
  }
  .image-frame-wrapper {
    img {
      border-radius: 4px;
    }
    @include for-md-down {
      margin-bottom: 34px;
    }
  }
  &__text-wrapper {
    margin-bottom: 24px;
  }
  &__text {
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
