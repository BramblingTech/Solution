<template>
  <section class="service-description-list">
    <h2 class="service-description-list__title title">{{content.title}}</h2>
    <p class="service-description-list__description">{{content.description}}</p>
    <div
      v-for="(item, i) in content.projectList"
      :key="item + i"
      class="service-description-list__table-wrapper"
    >
      <LayoutsThemplateGrid1x1>
        <div class="service-description-list__left-col">
          <div class="image-frame-wrapper">
            <img
              :src="'/images/' + item.img"
              alt=""
            >
          </div>
        </div>
        <div class="service-description-list__right-col">
          <h3 class="service-description-list__subtitle">{{item.title}}</h3>
          <p class="service-description-list__text">{{item.description}}</p>
        </div>
      </LayoutsThemplateGrid1x1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DescriptionList',
  props: {
    content: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.service-description-list {
  &__title {
    margin-bottom: 24px;
  }

  &__description {
    max-width: 413px;
    margin-bottom: 44px;
    @include for-md-down {
      margin-bottom: 74px;
    }
  }

  &__table-wrapper {
    margin-bottom: 88px;
    &:last-child {
      margin-bottom: 0;
    }
    @include for-md-down {
      margin-bottom: 74px;
    }
  }
  &__left-col {
    .image-frame-wrapper {
      border-radius: 10px;
      overflow: hidden;
      z-index: 3;
    }
    @include for-md-down {
      margin-bottom: 24px;
    }
  }
  &__subtitle {
    font-weight: bold;
    font-size: em(24);
    line-height: 120%;
    margin-bottom: 24px;
    @include for-md-down {
      text-align: center;
      font-size: em(18);
    }
  }
}
</style>
