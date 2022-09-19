<template>
  <div class="cookie-wrapper">
    <p>{{$t('cookie.title')}}</p>
    <UIMyButton :click="acceptCookie">{{$t('cookie.btn')}}</UIMyButton>
  </div>
</template>

<script>
export default {
  name: 'Cookie',

  methods: {
    acceptCookie() {
      this.$cookies.set('accepted-cookie', true, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      this.$store.commit('cookie/setIsOpen', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.cookie {
  &-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    bottom: 46px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: $secondary-black;
    box-shadow: $block-shadow-main;
    padding: 8px 70px;
    border-radius: 4px;
    p {
      color: #fff;
      margin-bottom: 12px;
      text-align: center;
    }
  }
}
</style>
