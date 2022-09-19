<template>
  <main class="repairs-commercial">
    <LayoutsPageHeader :data="$t('repairs-commercial-header')" />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('repairs-commercial-description')"
    />
    <section>
      <div class="container">
        <ServicesStepsList :content="$t('repairs-commercial-project-steps')" />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'RepairsCommercial',
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
