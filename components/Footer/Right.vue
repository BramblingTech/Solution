<template>
  <div class="footer__right">
    <div class="footer__row footer__schedule">
      <div class="footer__col footer__phones">
        <ul>
          <li
            v-for="(phone, i) in phones.filter((phone, i) => i <= 1)"
            :key="phone + i"
          >
            <a :href="'tel:'+ phone">{{phone}}</a>
          </li>
        </ul>
      </div>
      <div class="footer__col footer__time">
        <ul>
          <li>{{$t('contact-us-info').workDay}}</li>
          <li>{{$t('contact-us-info').restDay}}</li>
        </ul>
      </div>
    </div>
    <div class="footer__row footer__social">
      <UITelegramBtn />
      <UIViberBtn />

    </div>
    <div class="footer__row footer__address">
      <p class="address">{{getLocation}}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    phones() {
      return this.$store.getters['navigation/getPhones'];
    },
    getLocation() {
      return this.$t('contact-us-info').location;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  &__right {
    margin: 42px 0;
    border-left: 1px solid $secondary-white;
    padding: 20px 0 35px 28px;
    font-weight: 300;
    @media screen and (max-width: 1125px) {
      font-size: 13px;
    }
    @include for-lg-down {
      border: unset;
      margin-top: 0;
      padding: 0;
      margin-bottom: 89px;
      font-size: 15px;
    }
  }
  &__row {
    display: flex;
    max-width: 360px;
    &:first-child {
      justify-content: space-between;
      margin-bottom: 24px;
      @include for-lg-down {
        margin-bottom: 36px;
      }
    }
    @include for-lg-down {
      max-width: 100%;
    }
  }
  &__schedule {
    @include for-e-sm-down {
      font-size: em(13);
    }
  }
  &__phones {
    ul {
      li {
        cursor: pointer;
        a {
          &::before {
            position: relative;
            top: 4px;
            margin-right: 8px;
            content: url(/images/phone.svg);
          }
          &::after {
            bottom: -5px;
          }
        }
        &:not(:last-child) {
          margin-bottom: 18px;
          @include for-lg-down {
            margin-bottom: 36px;
          }
        }
      }
    }
  }
  &__time {
    ul {
      li {
        &:not(:last-child) {
          margin-bottom: 8px;
        }
        &:not(:first-child) {
          padding-left: 26px;
        }
        &:first-child {
          &::before {
            position: relative;
            top: 2px;
            content: url(/images/clock.svg);
            margin-right: 8px;
          }
        }
      }
    }
  }
  &__social {
    margin-bottom: 37px;
    @include for-lg-down {
      margin-bottom: 34px;
    }
    & > div {
      &:not(:last-child) {
        margin-right: 24px;
        @include for-lg-down {
          margin-right: 34px;
        }
      }
    }
  }
}
</style>
