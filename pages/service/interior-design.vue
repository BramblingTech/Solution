<template>
  <main class="interion-design">
    <LayoutsPageHeader :data="$t('interior-design-header')" />
    <section class="interion-design__project-section">
      <div class="container">
        <ServicesDescriptionList :content="$t('interior-design-second-screen')" />
      </div>
    </section>
    <section class="interion-design__consultation">
      <ConsultationForm />
    </section>
    <section>
      <div class="container">
        <ServicesStepsList :content="$t('interior-design-project-steps')" />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'InteriorDesign',
  layout: 'service',
};
</script>

<style lang="scss" scoped>
.interion-design__project-section {
  @include for-md-down {
    margin-bottom: 40px;
  }
}
</style>
