<template>
  <main class="vibro-isolation">
    <LayoutsPageHeader :data="$t('vibroIsolation-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('vibroIsolation-second-screen')"
    />
    <section>
      <div class="container">
        <ServicesDescriptionList :content="$t('vibroIsolation-third-screen')" />
      </div>
    </section>
    <section>
      <div class="container">
        <ServicesStepsList :content="$t('vibroIsolation-project-steps')" />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'VibroIsolation',
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
