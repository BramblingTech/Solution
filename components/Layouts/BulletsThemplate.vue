<template>
  <section class="section-bullets">
    <slot name="title"></slot>
    <div class="section-bullets__content">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BulletsThemplate',
};
</script>

<style lang="scss" scoped>
.section-bullets {
  h2 {
    margin-bottom: 44px;
    @include for-md-down {
      margin-bottom: 34px;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: minmax(200px, 413px) minmax(500px, 856px);
    grid-template-rows: auto;
    gap: 30px;
    @include for-md-down {
      grid-template-columns: 1fr;
      gap: 34px;
    }
    .right-col {
      align-self: center;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
      grid-column-gap: 30px;
      grid-row-gap: 45px;
    }
  }
}
</style>
