<template>
  <main class="repairs-new">
    <LayoutsPageHeader :data="$t('repairs-new-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('repairs-new-description')"
    />
    <ServicesBulletsThemplate :content="$t('repairs-new-care')" />
  </main>
</template>

<script>
export default {
  name: 'RepairsNew',
  layout: 'repairs',
  computed: {
    isMob() {
      return this.$store.getters['devices/isMob']
        ? this.$store.getters['devices/isMob']
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
