<template>
  <main class="conditioning">
    <LayoutsPageHeader :data="$t('conditioning-header')" />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('conditioning-about')"
    />
    <ServicesThemplateServicesGrid1x1 :content="$t('conditioning-services')" />
    <ServicesBulletsThemplate :content="$t('conditioning-bullet-section')" />
    <ServicesTextListImgGrid1x2 :content="$t('conditioning-benefits')" />
  </main>
</template>

<script>
export default {
  name: 'Conditioning',
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
