<template>
  <button
    type="button"
    class="btn"
    @click="customClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    click: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    customClick() {
      this.click();
      // here can be custom logic
    },
  },
};
</script>
