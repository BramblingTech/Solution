<template>
  <ul class="pagination-list">
    <li
      v-show="showPre"
      class="pagination-list__item pre"
    >
      <button @click="prePage">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.16 7.41L11.58 12L16.16 16.59L14.75 18L8.75 12L14.75 6L16.16 7.41Z"
            fill="#495244"
          />
        </svg>
      </button>
    </li>
    <li
      v-for="page in items"
      :key="page.label"
      class="pagination-list__item"
    >
      <span v-if="page.disable">
        ...
      </span>
      <button
        v-else
        :class="`${page.active ? 'current' : ''}`"
        @click="setCurrentPage"
      >
        {{ page.label }}
      </button>
    </li>
    <li
      v-show="showNext"
      class="pagination-list__item next"
    >
      <button @click="nexPage">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.84 7.41L12.42 12L7.84 16.59L9.25 18L15.25 12L9.25 6L7.84 7.41Z"
            fill="#495244"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPage: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    prePage: {
      type: Function,
      default: () => {},
    },
    nexPage: {
      type: Function,
      default: () => {},
    },
    setCurrentPage: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    showPre() {
      return this.currentPage !== 1;
    },
    showNext() {
      return this.currentPage !== this.totalPage;
    },
    items() {
      const valPrev = this.currentPage > 1 ? this.currentPage - 1 : 1; // for easier navigation - gives one previous page
      const valNext =
        this.currentPage < this.totalPage
          ? this.currentPage + 1
          : this.totalPage; // one next page
      const extraPrev = valPrev === 1 ? 2 : null;
      const extraNext =
        valNext === this.totalPage - 2 ? this.totalPage - 1 : null;
      const dotsBefore = valPrev > 1 ? 2 : null;
      const dotsAfter =
        valNext < this.totalPage - 2 ? this.totalPage - 1 : null;

      const output = [];

      for (let i = 1; i <= this.totalPage; i += 1) {
        if (
          [
            1,
            this.totalPage,
            this.currentPage,
            valPrev,
            valNext,
            extraPrev,
            extraNext,
            dotsBefore,
            dotsAfter,
          ].includes(i)
        ) {
          output.push({
            label: i,
            active: this.currentPage === i,
            disable: [dotsBefore, dotsAfter].includes(i),
          });
        }
      }

      return output;
    },
  },
  methods: {
    setPage(e) {
      this.$emit('set-current-page', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-list {
  display: flex;

  &__item {
    border-radius: 4px;
    margin-right: 8px;
    overflow: hidden;
    &:last-child {
      margin-right: 0;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: $secondary-white2;
      box-shadow: 0 3px 8px rgba(19, 19, 19, 0.15);
      outline: none;
      border: none;
      cursor: pointer;
      color: inherit;
      @include transition(all);

      &:hover {
        color: $secondary-white2;
        background-color: $primary-flat;

        svg {
          path {
            fill: $secondary-white2;
          }
        }
      }
      &.current {
        background-color: $primary-flat;
        color: $secondary-white2;
      }
    }
  }
}
</style>
