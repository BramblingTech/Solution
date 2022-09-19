import smoothscroll from 'smoothscroll-polyfill';
import { debounce } from 'vue-debounce';

export default {
  data: () => ({
    isVisible: false,
    scrollValue: 0,
    debounceScrollVisibility: null,
  }),
  methods: {
    setVisabilityBtn() {
      const OFFSET = 100;

      if (window.pageYOffset < 0) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return;
      }

      this.isVisible = window.pageYOffset > 600;
    },
  },
  mounted() {
    smoothscroll.polyfill();
    this.debounceScrollVisibility = debounce(this.setVisabilityBtn, 200);
    window.addEventListener('scroll', this.debounceScrollVisibility);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.debounceScrollVisibility);
  },
};
