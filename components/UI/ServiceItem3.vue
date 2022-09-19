<template>
  <div class="service-item2">
    <h3 class="service-item2__title">{{content.title}}</h3>
    <p class="service-item2__description">{{content.description}}</p>
    <div class="image-frame-wrapper">
      <img
        :src="'/images/' + content.img"
        :alt="content.title"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceItem3',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.service-item2 {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;

  &__title {
    order: 2;
    font-size: em(18);
    line-height: 120%;
    margin-bottom: 24px;
    @include for-md-down {
      text-align: center;
    }
  }
  &__description {
    order: 3;
  }
  .image-frame-wrapper {
    order: 1;
    height: 283px;
    margin-bottom: 24px;
  }
}
</style>

