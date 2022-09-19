<template>
  <main class="vibro-isolation">
    <LayoutsPageHeader :data="$t('remote-alarm-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('remote-alarm-second-screen')"
    />
    <ServicesTextImgGrid2x1
      :is-mob="isMob"
      :content="$t('remote-alarm-third-screen')"
    />
    <ServicesBulletsThemplate :content="$t('remote-alarm-bullet-screen')" />
    <ServicesThemplateServicesGrid1x1 :content="$t('remote-alarm-types')" />
  </main>
</template>

<script>
export default {
  name: 'RemoteAlarm',
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

