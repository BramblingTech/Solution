<template>
  <section class="services-content-grid-1x1">
    <div class="container">
      <h2 class="services-content-grid-1x1__title title">{{content.title}}</h2>
      <p class="services-content-grid-1x1__description">{{content.description}}</p>
      <LayoutsThemplateGrid1x1>
        <UIServiceItem2 v-for="(item, i) in content.items" :key="item.title + i" :content="item"/>
      </LayoutsThemplateGrid1x1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ThemplateServicesGrid1x1',
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
.services-content-grid-1x1 {
  .grid-1x1 {
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  } 

  &__title {
    margin-bottom: 24px;
  }

  &__description {
    max-width: 635px;
    margin-bottom: 44px;
  }
}
</style>
