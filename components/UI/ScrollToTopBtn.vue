<template>
  <transition name="fadeIn">
    <button
      v-show="isVisible"
      class="go-top-btn"
      @click="toTop"
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.56094 4.55609L0.180933 11.9566C-0.0607219 12.199 -0.0603156 12.5916 0.182183 12.8337C0.424651 13.0755 0.817431 13.0749 1.05927 12.8324L8.00003 5.87243L14.9407 12.8327C15.1826 13.0751 15.5752 13.0757 15.8177 12.8339C15.9392 12.7126 16 12.5536 16 12.3946C16 12.2361 15.9396 12.0777 15.8189 11.9566L8.43909 4.55609C8.3229 4.43931 8.16478 4.37378 8.00003 4.37378C7.83528 4.37378 7.67734 4.4395 7.56094 4.55609Z" />
      </svg>
    </button>
  </transition>
</template>

<script>
export default {
  name: 'ScrollToTopBtn',
  props: {
    isVisible: {
      type: Boolean,
      require: true,
      default: false,
    },
  },

  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.go-top-btn {
  display: block;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: transparent;
  outline: none;
  border: 1px solid $primary-flat;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
  @include transition(all);

  svg {
    path {
      fill: #82b56a;
      @include transition(fill);
    }
  }

  &:hover,
  &:focus {
    background: $primary-flat;
    box-shadow: 0 4px 12px rgba(19, 19, 19, 0.15);
    svg {
      path {
        fill: #fff;
      }
    }
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity $animation-speed;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
