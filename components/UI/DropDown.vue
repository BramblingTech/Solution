<template>
  <ul class="dropdown">
    <slot></slot>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  z-index: 2;
  overflow: hidden;
  top: 31px;
  left: 17px;
  height: 0;
  padding: 0 8px;
  right: -15px;
  background: $secondary-white2;
  border-radius: 4px;
  box-shadow: $button-shadow-main;
  @include transition(all);
  a {
    padding: 0;
  }
  li {
    &:not(&:last-child) {
      margin-bottom: 12px;
    }
  }
}
li {
  display: inline-block;
}
</style>
