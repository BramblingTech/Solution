<template>
  <main class="security-alarm">
    <LayoutsPageHeader :data="$t('security-alarm-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('security-alarm-second-screen')"
    />
    <ServicesTextImgGrid2x1
      :is-mob="isMob"
      :content="$t('security-alarm-third-screen')"
    />
    <ServicesThemplateServicesGrid1x1x1 :content="$t('security-alarm-how-it-works')" />
    <ServicesBulletsThemplate :content="$t('security-alarm-benefits')" />
  </main>
</template>

<script>
export default {
  name: 'SecurityAlarm',
  layout: 'service',
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
