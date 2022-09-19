<template>
  <main class="insulation">
    <LayoutsPageHeader :data="$t('insulation-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('insulation-types')"
    />

    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('insulation-description')"
    />

    <div class="container">
      <ServicesDescriptionList :content="$t('insulation-stages')" />
    </div>
  </main>
</template>

<script>
export default {
  name: 'Insulation',
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

