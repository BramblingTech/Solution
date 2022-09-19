<template>
  <section
    id="form-section"
    class="form-wrapper"
  >
    <slot></slot>
  </section>
</template>


<style lang="scss" scoped>
.form-wrapper {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 265px;
  padding-bottom: 180px;
  background: url(/images/bg.svg) repeat 0 0 ;
  @include for-md-down {
    padding-bottom: 110px;
  }
}
</style>
