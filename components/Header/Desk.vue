<template>
  <div class="header-desk">
    <NuxtLink
      :to="localePath('/')"
      :exact="true"
      class="header__logo"
    >SOUND INSULATION</NuxtLink>
    <ul class="header-desk__nav">
      <NuxtLink
        v-for="item in menu"
        :key="item.text"
        :exact="true"
        :to="localePath(item.link)"
      >
        <li>{{ item.text }}</li>
      </NuxtLink>
    </ul>
    <div class="header-desk__lang-container">
      <div class="header-desk__lang">
        <NuxtLink :to="switchLocalePath(currentLocale)">{{currentLocale}}</NuxtLink>
        <NuxtLink
          v-for="(locale, i) in locales"
          :key="locale + i"
          :to="switchLocalePath(locale.code)"
        >{{locale.code}}</NuxtLink>
      </div>
    </div>
    <ul class="header-desk__phone">
      <li>
        <a :href="'tel:' + phones[0].replace(/[()-,\s\-]/gm, '')"><span>{{ phones[0] }}</span></a>
      </li>
      <UIDropDown class="header-desk__phone-dropdown">
        <li
          v-for="(phone, i) in phones.filter((el, i) => i !== 0)"
          :key="phone + i"
        >
          <a :href="'tel:' + phone.replace(/[()-,\s\-]/gm, '')"><span>{{ phone }}</span></a>
        </li>
      </UIDropDown>
    </ul>
  </div>

</template>

<script>
export default {
  computed: {
    locales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.currentLocale
      );
    },

    currentLocale() {
      return this.$i18n.locale;
    },
    menu() {
      return this.$t('menu');
    },
    phones() {
      return this.$store.state.navigation.phones;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-desk {
  display: flex;
  align-items: center;
  height: 100%;
  &__nav {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    width: 100%;
    max-width: 525px;
    margin: 0 auto;
  }

  &__lang {
    margin-top: 5px;
    font-size: 13px;
    .nuxt-link-active {
      &::after {
        width: 0;
      }
      &:hover {
        &::after {
          width: 100%;
        }
      }
    }
    a {
      display: block;
      text-align: center;
      padding-top: 0;
      padding-bottom: 0;

      &:hover {
        width: 100%;
      }
      &:first-child {
        margin-bottom: 22px;
      }
      &:nth-child(2) {
        position: relative;
        padding-top: 20px;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: $primary-flat;
        }
      }
    }
    &-container {
      cursor: pointer;
      margin-right: 104px;
      transform-origin: 0 0;
      background: $secondary-white;
      align-self: flex-start;
      top: 12px;
      color: $primary-flat;
      overflow: hidden;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      @include transition(height);
      @include makeCircle(34px, 40px, $primary-flat);
      &:hover {
        height: 96px;
      }
    }
  }
  &__phone {
    position: relative;
    left: -25px;
    align-items: flex-end;
    cursor: pointer;
    padding: 3px 0;
    &::before {
      position: relative;
      top: 4px;
      content: url(/images/phone.svg);
      margin-right: 8px;
    }
    &::after {
      content: url(/images/arrow-down.svg);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -28px;
      padding: 8px;
      @include transition(transform);
    }
    &:hover {
      border-bottom: 1px solid $primary-flat;
      .header-desk__phone-dropdown {
        height: 114px;
        padding: 8px;
      }
      &::after {
        transform: translateY(-50%) rotate(-180deg);
      }
    }
    li {
      display: inline-block;
    }
    & > li {
      a {
        &:hover {
          &::after {
            width: 0;
          }
        }
      }
    }
  }
}
</style>
