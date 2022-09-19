<template>
  <main class="repairs-common">
    <LayoutsPageHeader :data="$t('repairs-common-header')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('repairs-common-second-screen')"
    />
    <section class="repairs-common__services">
      <div class="container">
        <h2 class="title">{{$t('repairs-common.title')}}</h2>
        <LayoutsServicesThemplate :columns="2">
          <UIServiceItem
            v-for="(service, i) in getServices"
            :key="service.text + i"
            :service="service"
            :window-width="windowWidth"
          />
        </LayoutsServicesThemplate>

      </div>
    </section>
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :button="true"
      :content="$t('repairs-common-design')"
    />
  </main>
</template>

<script>
export default {
  name: 'RepairsCommon',
  layout: 'service',
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },

    getServices() {
      const services = this.$t('services');
      return services.filter(
        (el) => el.type === 'repairs' && !this.$route.path.includes(el.link)
      );
    },
    windowWidth() {
      return this.$store.getters['devices/windowWidth']
        ? this.$store.getters['devices/windowWidth']
        : 0;
    },
    isMob() {
      return this.$store.getters['devices/isMob']
        ? this.$store.getters['devices/isMob']
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.repairs-common {
  &__services {
    h2 {
      margin-bottom: 34px;
    }
  }
}
</style>
