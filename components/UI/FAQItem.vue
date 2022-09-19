<template>
  <li
    ref="wrapper"
    class="faq__question-wrapper"
    :class="{'active-content': isOpen}"
    @click.stop="toggleModal"
  >
    <div class="faq__subtitle-wrapper">
      <h3 class="faq__subtitle">{{question.title}}</h3>
      <button
        class="faq__btn-toggle"
        :class="{'active': isOpen}"
      ><img
          src="~/images/faq-cross.svg"
          alt="cross"
        ></button>

    </div>
    <div
      :style="isOpen ? {height: `${contentHeight}px`} : {height: 0}"
      class="faq__content-wrapper"
    >
      <p ref="content">{{question.answer}}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    windowWidth: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  data: () => ({
    isOpen: false,
    contentHeight: 0,
  }),
  watch: {
    windowWidth() {
      this.setContentHeight();
    },
  },
  mounted() {
    this.contentHeight = this.$refs.content.offsetHeight;
  },

  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    setContentHeight() {
      this.contentHeight = this.$refs.content.offsetHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.faq {
  button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    outline: none;
    background: unset;
    border: none;
    img {
      @include transition(transform);
    }
  }
  &__question-wrapper {
    cursor: pointer;
    overflow: hidden;
    position: relative;
    background: $secondary-white2;
    padding: 17px 24px;
    border-radius: 4px;
    box-shadow: $block-shadow-main;
    @include for-md-down {
      padding: 23px 16px;
    }
  }
  &__content-wrapper {
    @include transition(height);
    p {
      padding-top: 28px;
    }
  }
  &__subtitle {
    position: relative;
    font-weight: 300;
    font-size: em(18);
    padding-right: 24px;
    &-wrapper {
      position: relative;
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -14px;
      width: 0;
      height: 1px;
      background: $grey;
      @include transition(width);
    }
    @include for-md-down {
      font-weight: 500;
      font-size: em(16);
      padding-right: 16px;
    }
  }
  .active {
    img {
      transform: rotate(-45deg);
    }
    &-content {
      .faq__subtitle {
        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>
