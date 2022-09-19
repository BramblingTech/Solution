<template>
  <div :class="{
    'section-text-img-desc': !isMobile,
    'section-text-img-mob': isMobile,
  }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TextImageBlock',
  props: {
    isMobile: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.section-text-img-desc {
  display: grid;
  grid-template-columns: minmax(200px, 1fr) minmax(500px, 2fr);
  grid-template-rows: auto;
  gap: 30px;
  @media screen and (max-width: 1190px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @include for-md-down {
    grid-template-columns: 1fr;
  }
  h2 {
    margin-bottom: 24px;
  }

  p {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .right-col {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
  }
}

.section-text-img-mob {
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 34px;
  }
  p {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .image-frame-wrapper {
    margin-bottom: 34px;
  }
}
</style>
