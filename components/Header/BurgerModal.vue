<template>
  <div
    ref="modal"
    class="modal"
    @click="handleClick"
  >
    <transition name='menu'>
      <div
        v-if="show"
        ref="menu"
        v-scroll-lock="show"
        class="modal__burger-menu"
        :class="{opened: show}"
      >
        <div
          class="modal__close-modal"
          @click.stop="hideDialog"
        >
        </div>
        <div class="modal__langs">
          <p>{{$t('lang')}}</p>
          <div class="modal__langs-container">
            <NuxtLink
              class="modal__langs--link"
              :to="switchLocalePath(locales[0].code)"
            >{{locales[0].code}}
            </NuxtLink>
            <NuxtLink
              class="modal__langs--link"
              :exact="true"
              :to="switchLocalePath(locales[1].code)"
            >{{locales[1].code}}
            </NuxtLink>
          </div>
        </div>
        <HeaderBurgerMenu :hide-dialog="hideDialog" />
      </div>
    </transition>
  </div>
</template>

<script>
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import toggleMixin from '@/mixins/toggleMixin';

export default {
  mixins: [toggleMixin],
  props: {
    isOpenModal: {
      type: Boolean,
    },

    handleModal: {
      type: Function,
      default: () => {},
    },
  },

  computed: {
    locales() {
      return this.$i18n.locales;
    },
  },

  methods: {
    handleClick({ target }) {
      target === this.$refs.modal && this.hideDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(48, 48, 48, 0.5);
  z-index: 10;
  &__burger-menu {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    overflow-x: scroll;
    width: 197px;
    height: 100%;
    background: $secondary-white;
    padding: 5px 16px;
    @include transition(transform);
    @include for-iPhoneX {
      padding-left: 40px;
      padding-bottom: 50px;
    }
  }
  &__close-modal {
    background: url(/images/close-cross.svg) no-repeat center;
    margin-bottom: 54px;
    @include makeCircle(34px, 40px, $primary-flat);
    &:active,
    &:focus {
      opacity: 0.5;
    }
  }
  &__langs {
    p {
      margin-bottom: 16px;
    }
    &-container {
      display: flex;
      justify-content: space-between;
      max-width: 114px;
    }
    &--link {
      color: $primary-flat;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      @include makeCircle(34px, 40px, $primary-flat);
      &:hover {
        &::after {
          width: 0;
        }
      }
    }
    .nuxt-link-active {
      opacity: 0.5;
      &::after {
        width: 0;
      }
    }
  }
  .opened {
    transform: translateX(0);
  }
  .menu-enter,
  .menu-leave-to {
    left: -200px;
  }

  .menu-enter-active,
  .menu-leave-active {
    @include transition(all);
  }
}
</style>
