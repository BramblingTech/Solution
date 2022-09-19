<template>
  <div class="footer__center">
    <div class="footer__nav">
      <ul>
        <li
          v-for="item in menu"
          :key="item.text"
        >
          <NuxtLink
            :exact="true"
            :to="localePath(item.link)"
          >
            {{ item.text }}
          </NuxtLink>

        </li>
      </ul>
    </div>
    <div class="footer__services">
      <ul>
        <li
          v-for="item in services"
          :key="item.text"
        >
          <NuxtLink
            :exact="true"
            :to="localePath(item.link)"
          >{{item.title}}</NuxtLink>
        </li>
      </ul>

    </div>
  </div>

</template>

<script>
export default {
  computed: {
    menu() {
      return this.$t('menu');
    },
    services() {
      return this.getPrimeService(this.$t('services'));
    },
  },
  methods: {
    getPrimeService(arr) {
      return arr.filter((el) => el.primary);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  &__center {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 42px 0;
    padding-left: 30px;
    padding-right: 10px;
    font-size: 13px;
    text-transform: uppercase;
    border-left: 1px solid $secondary-white;
    ul {
      padding: 25px 0 35px 0;
      @include for-lg-down {
        text-align: center;
        padding: 25px 0;
      }
      li {
        &:not(:last-child) {
          margin-bottom: 24px;
          @include for-lg-down {
            margin-bottom: 30px;
          }
        }
      }
    }
    @media screen and (max-width: 1260px) {
      font-size: 11px;
    }
    @include for-lg-down {
      grid-template-columns: auto;
      border: unset;
      margin: 29px 0 44px 0;
      padding: 0;
      font-size: 13px;
    }
  }
  &__nav {
    position: relative;
    @include for-lg-down {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 160px;
        height: 1px;
        background: $secondary-white;
      }
    }
  }
  &__services {
    ul {
      @include for-lg-down {
        padding-bottom: 0;
      }
    }
  }
}
</style>
