<template>
  <section class="services-content-grid-1x1x1">
    <div class="container">
      <h2 class="services-content-grid-1x1x1__title title">{{content.title}}</h2>
      <p class="services-content-grid-1x1x1__description">{{content.description}}</p>
      <div class="services-content-grid-1x1x1__items-wrapper">
        <UIServiceItem3
          v-for="(item, i) in content.items"
          :key="item.title + i"
          :content="item"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ThemplateServicesGrid1x1x1',
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
.services-content-grid-1x1x1 {
  &__items-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-column-gap: 30px;
    @include for-md-down {
      grid-template-columns: 1fr;
      grid-row-gap: 74px;
    }
  }

  &__title {
    margin-bottom: 24px;
  }
  &__description {
    max-width: 635px;
    margin-bottom: 44px;
    @include for-md-down {
      margin-bottom: 74px;
    }
  }
}
</style>
