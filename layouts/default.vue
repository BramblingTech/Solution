<template>
  <div>
    <HeaderMain />
    <Nuxt />
    <LayoutsModalWrapper />
    <FooterMain />
    <UICookie v-if="isOpenedCookie" />
  </div>
</template>

<script>
import windowWidth from '~/mixins/windowWidth';

export default {
  name: 'Default',
  mixins: [windowWidth],
  middleware: 'cookie',

  computed: {
    isOpenedCookie() {
      return this.$store.getters['cookie/getIsOpen'];
    },
  },
};
</script>
