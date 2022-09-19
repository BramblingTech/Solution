<template>
  <div class="faq">
    <div class="faq__left">
      <ul class="faq__list">
        <slot name="left"></slot>
      </ul>
    </div>
    <div class="faq__right">
      <ul class="faq__list">
        <slot name="right"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.faq {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 16px;
  @include for-md-down {
    grid-template-columns: auto;
  }
  &__list {
    li {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
