<template>
  <main class="alarm-button">
    <LayoutsPageHeader :data="$t('alarm-button-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('alarm-button-second-screen')"
    />
    <ServicesThemplateServicesGrid1x1x1 :content="$t('alarm-button-types')" />
    <ServicesTextListImgGrid1x2 :content="$t('alarm-button-when-to-use')" />
  </main>
</template>

<script>
export default {
  name: 'AlarmButton',
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
