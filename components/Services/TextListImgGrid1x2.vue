<template>
  <section class="services-content-grid2-1x2">
    <div class="container">
      <h2 class="services-content-grid2-1x2__title title">{{content.title}}</h2>
      <LayoutsTextImageBlock>
        <div class="services-content-grid2-1x2__left-col">
          <p class="services-content-grid2-1x2__description">{{content.description.text}}</p>
          <ul class="description-list">
            <li
              v-for="(item, i) in content.description.points"
              :key="item + i"
            >{{item}}</li>
          </ul>
        </div>
        <div class="services-content-grid2-1x2__right-col">
          <div class="image-frame-wrapper">
            <img
              :src="'/images/' + content.img"
              :alt="content.title"
            >
          </div>
        </div>
      </LayoutsTextImageBlock>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TextListImgGrid1x2',
  props: {
    content: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.services-content-grid2-1x2 {
  &__title {
    margin-bottom: 24px;
  }
  &__right-col {
    border-radius: 4px;
    overflow: hidden;
  }
  .section-text-img-desc {
    @include for-md-down {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>
