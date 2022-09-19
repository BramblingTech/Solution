<template>
  <ul class="burger-nav">
    <li
      v-for="item in menu"
      :key="item.text"
      @click="hideDialog"
    >
      <NuxtLink
        :exact="true"
        :to="localePath(item.link)"
      >{{item.text}}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BurgerMenu',
  props: {
    hideDialog: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    menu() {
      return this.$t('menu');
    },
  },
};
</script>

<style lang="scss" scoped>
.burger-nav {
  margin-top: 74px;
  li {
    width: fit-content;
    &:not(:last-child) {
      margin-bottom: 34px;
    }
  }
}
</style>
