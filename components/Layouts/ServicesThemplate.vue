<template>
  <div
    ref="container"
    :class="getClass"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ServicesThemplate',
  props: {
    columns: {
      type: Number,
      default: 3,
    },
  },
  data: () => ({
    isOdd: false,
  }),
  computed: {
    getClass() {
      switch (this.columns) {
        case 3:
          return this.isOdd ? 'section-grid-odd' : 'section-grid';
        case 2:
          return 'section-grid-col2';

        default:
          return 'section-grid';
      }
    },
  },

  mounted() {
    const containerChildrenCount = this.$refs.container.childNodes.length;

    if (containerChildrenCount % 2 !== 0) {
      this.isOdd = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.section-grid,
.section-grid-odd {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 30px;
}

.section-grid {
  &-col2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    grid-template-rows: auto;
    gap: 30px;
    .service-item {
      max-width: 100%;
    }
    @include for-md-down {
      grid-template-columns: auto;
    }
  }
  @include for-lg-down {
    grid-template-columns: repeat(2, minmax(350px, 1fr));
  }
  @include for-md-down {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 440px) {
    justify-items: center;
  }
}

.section-grid-odd {
  @include for-lg-down {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 30px;
  }
  @include for-md-down {
    justify-content: stretch;
    gap: 0;
    .service-item,
    .blog-item {
      margin-bottom: 34px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
