<template>
  <div class="sort-wrapper">
    <ul
      ref="sortList"
      class="sort-list"
      :class="{'active-sort': entered}"
      @click.stop="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <li
        ref="currentOption"
        class="link current-option"
      >{{currentOption.title}}</li>
      <ul
        ref="innerList"
        class="sort-list__inner"
        @click.stop="selectOption"
      >
        <li
          v-for="(option, i) in options.filter((option) => option.type !== currentOption.type)"
          :key="option.title + i"
          class="link"
        >{{option.title}}</li>
      </ul>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'SortDropDown',
  props: {
    options: {
      type: Array,
      require: true,
      default: () => [],
    },
    isTablet: {
      type: Boolean,
      require: true,
      default: false,
    },
  },

  data: () => ({
    currentOption: '',
    entered: false,
  }),

  computed: {
    getListHeight() {
      return this.$refs.sortList.offsetHeight;
    },
    filteredOptions() {
      return this.options.filter(
        (option) => option.type !== this.currentOption.type
      );
    },
  },

  created() {
    this.currentOption = this.options[0];
    this.$emit('pick', this.currentOption);
  },

  mounted() {
    window.addEventListener('click', this.onClick);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.onClick);
  },

  methods: {
    selectOption({ target }) {
      const list = this.$refs.sortList;

      if (target.classList.contains('link')) {
        this.currentOption = this.options.find(
          (option) => option.title === target.innerText
        );
        list.style.height = '58px';
        this.$emit('pick', this.currentOption);
      }

      this.isTablet && this.close();
    },

    onClick({ target }) {
      const currentOption = this.$refs.currentOption;

      target !== currentOption && this.close();
    },

    handleMouseEnter() {
      !this.isTablet && this.open();
    },

    open() {
      const list = this.$refs.sortList;
      const innerListHeight = this.$refs.innerList.offsetHeight;

      this.entered = true;

      list.style.height = `${this.getListHeight + innerListHeight}px`;
    },

    close() {
      const list = this.$refs.sortList;

      this.entered = false;

      list.style.height = '58px';
    },

    handleMouseLeave({ target }) {
      if (!this.isTablet) {
        !target.classList.contains('link') && this.close();
      }
    },

    handleClick() {
      this.isTablet && this.open();
    },
  },
};
</script>

<style lang="scss" scoped>
.sort-wrapper {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 1;
    background: $primary-flat;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &::after {
    content: url(/images/arrow-down.svg);
    position: absolute;
    right: 16px;
    top: 18px;
  }
}
.sort-list {
  background: $secondary-white2;
  box-shadow: $button-shadow-main;
  border-radius: 4px;
  padding: 18px 16px;
  overflow: hidden;
  height: 58px;
  cursor: pointer;
  position: relative;
  @include transition(height);
  li {
    display: block;
    &:hover {
      &::after {
        width: 0;
      }
    }
  }
  &__inner {
    padding-top: 24px;
    li {
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .current-option {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 0;
      right: 0;
      width: 0;
      height: 1px;
      background: $grey;
      @include transition(width);
    }
  }
}
.active-sort {
  .current-option {
    &::before {
      width: 100%;
    }
  }
}
</style>
