import { debounce } from 'vue-debounce';
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    debounceGetWindowWidth: null,
  }),

  methods: {
    getWindowWidth() {
      this.setWindowWidth(document.documentElement.clientWidth);
    },
    ...mapMutations({
      setMobile: 'devices/setMobile',
      setTablet: 'devices/setTablet',
      setWindowWidth: 'devices/setWindowWidth',
    }),
  },

  watch: {
    windowWidth(newHeight) {
      this.windowWidth <= 840 ? this.setMobile(true) : this.setMobile(false);

      this.windowWidth <= 1024 ? this.setTablet(true) : this.setTablet(false);

      return newHeight;
    },
  },

  computed: {
    windowWidth() {
      return this.$store.state.devices.windowWidth;
    },
  },
  mounted() {
    this.getWindowWidth();
    this.debounceGetWindowWidth = debounce(this.getWindowWidth, '500ms');
    this.$nextTick(function () {
      window.addEventListener('resize', this.debounceGetWindowWidth);
      window.addEventListener('orientationchange', this.debounceGetWindowWidth);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.debounceGetWindowWidth);
    window.removeEventListener(
      'orientationchange',
      this.debounceGetWindowWidth
    );
  },
};
