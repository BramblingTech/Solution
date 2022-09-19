<template>
  <section class="service-steps-list">
    <h2 class="service-steps-list__title title">{{content.title}}</h2>
    <ul class="service-steps-list__list">
      <li
        v-for="(item, i) in content.steps"
        :key="item + i"
        class="service-steps-list__item"
      >
        <div class="service-steps-list__item-title-wrapper">
          <h3 class="service-steps-list__subtitle">{{item.title}}</h3>
          <span class="circle">{{i + 1}}</span>
        </div>
        <p class="service-steps-list__text">{{item.description}}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'StepsList',
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
.service-steps-list {
  &__title {
    margin-bottom: 54px;
  }
  &__list {
    background: url(/images/steps-bg.svg) repeat-y 5% 20%;
    @include for-md-down {
      background: url(/images/steps-bg-mob.svg) repeat-y 50% 20%;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 88px;
    background: $secondary-white2;
    box-shadow: 0 18px 65px rgba(62, 62, 62, 0.07),
      0 2.43391px 25.6132px rgba(62, 62, 62, 0.0317368);
    border-radius: 4px;
    padding: 19px 16px;
    column-gap: 30px;
    @include for-md-down {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__item-title-wrapper {
    display: flex;
    align-items: center;
    @include for-md-down {
      margin-bottom: 34px;
    }
  }
  &__subtitle {
    order: 2;
    font-size: em(18);
    line-height: 140%;
    @include for-md-down {
      font-size: 15px;
      line-height: 120%;
    }
  }
  .circle {
    flex: 0 0 36px;
    order: 1;
  }
  &__text {
    max-width: 635px;
  }
}
</style>
