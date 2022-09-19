<template>
  <main class="repairs-turnkey">
    <LayoutsPageHeader :data="$t('repairs-turnkey-header')" />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('repairs-turnkey-description')"
    />
    <section>
      <div class="container">
        <ServicesStepsList :content="$t('repairs-turnkey-project-steps')" />
      </div>
    </section>

  </main>
</template>

<script>
export default {
  name: 'RepairsTurnkey',
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
