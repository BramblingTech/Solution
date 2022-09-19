<template>
  <div class="grid-1x1">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ThemplateGrid1x1',
  }
</script>

<style lang="scss" scoped>
.grid-1x1 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 30px;
  @include for-md-down {
    grid-template-columns: 1fr;
  }
}
</style>