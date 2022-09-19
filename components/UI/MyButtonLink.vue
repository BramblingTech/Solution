<template>
  <NuxtLink
    :exact="myExact"
    :to="myTo"
    class="btn link-btn"
    @click="customClick"
  >
    <slot></slot>
  </NuxtLink>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    myExact: Boolean,
    myTo: {
      type: String,
      default: '/',
    },
    click: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    customClick() {
      this.click();
      // here can be custom logic
    },
  },
};
</script>

<style lang="scss" scoped>
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
