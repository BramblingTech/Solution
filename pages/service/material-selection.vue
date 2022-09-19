<template>
  <main class="materials">
    <LayoutsPageHeader :data="$t('material-selection-header')" />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('material-selection-description')"
    />
    <ServicesTextImgGrid2x1
      :is-mob="isMob"
      :content="$t('material-selection-second-screen')"
    />
    <ServicesBulletsThemplate :content="$t('material-selection-trust-section')" />
  </main>
</template>

<script>
export default {
  name: 'MaterialSelection',
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
