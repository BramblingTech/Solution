<template>
  <div class="comment-card-wrapper">
    <slot name="outer"></slot>
    <slot name="inner"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.comment-card-wrapper {
  margin-bottom: 54px;
  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
