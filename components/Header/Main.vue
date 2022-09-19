<template>
  <header class="header">
    <div class="container">
      <HeaderDesk v-if="!isTablet" />
      <HeaderMob v-else />
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderMain',

  computed: {
    isTablet() {
      return this.$store.state.devices.isTablet;
    },
  },
};
</script>

