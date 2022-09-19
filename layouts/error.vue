<template>
  <LayoutsPageHeader
    :is404="true"
    :data="$t('404-header')"
  />

</template>

<script>
import windowWidth from '~/mixins/windowWidth';

export default {
  name: 'Error',
  mixins: [windowWidth],
  layout: '404',

  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },

  // mounted() {
  //   console.log(this.$props.error.statusCode);
  // },
};
</script>

