<template>
  <div class="bullet-item">
    <h3 class="bullet-item__title">{{bullet.title}}</h3>
    <div
      class="bullet-item__icon"
      :style=" bullet.icon && {'background': `url(/images/${bullet.icon}) no-repeat center, linear-gradient(180deg, #8ec674 0%, #719c5d 100%)`}"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'BulletItem',
  props: {
    bullet: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.bullet-item {
  display: flex;
  align-items: center;
  @include for-md-down {
    flex-direction: column;
    max-width: 180px;
    margin: 0 auto;
  }

  &__title {
    order: 2;
    font-style: normal;
    font-weight: bold;
    font-size: em(18);
    line-height: 140%;
    margin-left: 12px;
    @include for-md-down {
      text-align: center;
      font-size: em(15);
      line-height: 120%;
      margin-left: 0;
    }
  }
  &__icon {
    flex: 0 0 64px;
    order: 1;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(19, 19, 19, 0.15);
    @include for-md-down {
      margin-bottom: 12px;
    }
  }
}
</style>

