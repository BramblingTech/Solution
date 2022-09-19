<template>
  <div class="mobile">
    <UIBurgerBtn :handle-modal="handleModal" />
    <NuxtLink
      :to="localePath('/')"
      :exact="true"
      class="header__logo"
    >SOUND INSULATION
    </NuxtLink>
    <div
      class="mobile__tel-container"
      :class="{'active': isOpenDropdown}"
      @click="openDropdown"
    >

    </div>
    <UIDropDown
      class="mobile__tel-dropdown"
      :class="{'opened': isOpenDropdown}"
    >
      <li
        v-for="(phone, i) in phones"
        :key="phone + i"
      >
        <a :href="'tel:' + phone.replace(/[()-,\s\-]/gm, '')"><span>{{ phone }}</span></a>
      </li>
    </UIDropDown>
    <transition name="modal">
      <HeaderBurgerModal
        v-show="show"
        :show.sync="show"
      />
    </transition>
  </div>

</template>

<script>
export default {
  data: () => ({
    isOpenModal: false,
    show: false,
    isOpenDropdown: false,
  }),

  computed: {
    menu() {
      return this.$store.state.navigation.menu;
    },
    phones() {
      return this.$store.state.navigation.phones;
    },
  },
  methods: {
    handleModal() {
      this.show = !this.show;
    },
    openDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile {
  display: flex;
  height: 100%;
  font-size: 13px;
  align-items: center;
  justify-content: space-between;

  .mobile__tel-dropdown {
    height: 0;
    left: 75%;
    top: 44px;
    right: 0;
    li {
      display: block;
      text-align: center;
      margin-bottom: 24px !important;
    }
    @include for-sm-down {
      left: 50%;
    }
  }

  &__tel {
    &-container {
      background: url(/images/phone-mob.svg) no-repeat center;
      @include makeCircle(34px, 40px, $primary-flat);
      @include transition(all);
      &:active {
        opacity: 0.2;
      }
    }
    &-link {
      position: relative;
      &:hover {
        &::after {
          width: 0;
        }
      }
    }
  }
}
.opened {
  height: 160px !important;
}
.active {
  background: url(/images/close-cross.svg) no-repeat center;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  @include transition(all);
}
</style>
