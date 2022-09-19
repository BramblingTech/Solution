<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-wrapper">
        <FooterLeft />
        <FooterCenter />
        <FooterRight />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  color: $secondary-white;
  height: 100%;

  @include for-lg-down {
    grid-template-columns: auto;
  }
}
</style>
