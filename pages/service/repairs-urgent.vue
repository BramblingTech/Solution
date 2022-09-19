<template>
  <main class="repairs-urgent">
    <LayoutsPageHeader :data="$t('repairs-urgent-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('repairs-urgent-description')"
    />
    <ServicesBulletsThemplate :content="$t('repairs-urgent-why-us')" />

  </main>
</template>

<script>
export default {
  name: 'RepairsUrgent',
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
