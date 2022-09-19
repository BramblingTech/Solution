<template>
  <div>
    <HeaderMain />
    <main class="error">
      <Nuxt />
    </main>
    <UICookie v-if="isOpenedCookie" />
  </div>
</template>

<script>
export default {
  middleware: 'cookie',

  computed: {
    isOpenedCookie() {
      return this.$store.getters['cookie/getIsOpen'];
    },
  },
};
</script>
