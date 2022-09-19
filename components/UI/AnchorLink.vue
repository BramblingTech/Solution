<template>
  <button
    v-scroll-to="anchor"
    class="btn link-btn"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AnchorLink',
  props: {
    anchor: {
      type: String,
      default: '#',
    },
  },
};
</script>

<style lang="scss" scoped>
.nuxt-link-active {
  &::after {
    display: none;
  }
}
.link-btn {
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:hover,
  &:focus,
  &:active {
    color: $secondary-white;
    background: $hover-buttont-color;
    &::after {
      display: none;
    }
  }
}
</style>
