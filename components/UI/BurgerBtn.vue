<template>
  <div
    class="burger-container"
    @click="handleModal"
  >
    <div class="burger">
      <div class="burger--line"></div>
      <div class="burger--line"></div>
      <div class="burger--line"></div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    handleModal: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.burger {
  height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include makeCircle(34px, 40px, $primary-flat);
    &:active,
    &:focus {
      opacity: 0.5;
    }
  }
  &--line {
    width: 16px;
    height: 1px;
    background: $primary-flat;
  }
}
</style>

