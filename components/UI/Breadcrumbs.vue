<template>
  <div class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <NuxtLink
          :exact="true"
          :to="localePath('/')"
        >Sound insulation</NuxtLink>
      </li>
      <li class="breadcrumbs__item">
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.37694 5.6707L3.82659 0.1357C3.64474 -0.0455414 3.35031 -0.0452367 3.16877 0.136638C2.98736 0.318488 2.98783 0.613073 3.16971 0.794455L8.38969 6.00002L3.16952 11.2056C2.98767 11.387 2.9872 11.6814 3.16858 11.8632C3.25959 11.9544 3.37881 12 3.49804 12C3.61696 12 3.73572 11.9547 3.82656 11.8642L9.37694 6.32932C9.46453 6.24218 9.51367 6.12358 9.51367 6.00002C9.51367 5.87646 9.46438 5.75801 9.37694 5.6707Z"
            fill="#495244"
          />
        </svg>
      </li>
      <li class="breadcrumbs__item">
        <NuxtLink
          :exact="true"
          :to="localePath(getPageLink(getMenu, 'blog'))"
        >{{$t('blog-header.title')}}</NuxtLink>
      </li>
      <li class="breadcrumbs__item">
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.37694 5.6707L3.82659 0.1357C3.64474 -0.0455414 3.35031 -0.0452367 3.16877 0.136638C2.98736 0.318488 2.98783 0.613073 3.16971 0.794455L8.38969 6.00002L3.16952 11.2056C2.98767 11.387 2.9872 11.6814 3.16858 11.8632C3.25959 11.9544 3.37881 12 3.49804 12C3.61696 12 3.73572 11.9547 3.82656 11.8642L9.37694 6.32932C9.46453 6.24218 9.51367 6.12358 9.51367 6.00002C9.51367 5.87646 9.46438 5.75801 9.37694 5.6707Z"
            fill="#495244"
          />
        </svg>
      </li>
      <li class="breadcrumbs__item">{{title}}</li>
    </ol>
  </div>
</template>

<script>
import { getPageLink } from '@/tools/helpers';
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    getMenu() {
      return this.$t('menu');
    },
  },
  methods: {
    getPageLink,
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  &__list {
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 13px;
    line-height: 160%;
    margin-right: 5px;
    &:last-child {
      color: $primary-flat;
      margin-right: 0;
    }
  }
}
</style>
