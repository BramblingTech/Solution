<template>
  <transition name="fadeIn">
    <div v-if="show">
      <div
        class="container test"
        style="width: 100%"
      >
        <h2>hello toggle</h2>
        <button
          class="btn"
          @click="hideDialog"
        >Close toggle</button>
      </div>
    </div>
  </transition>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';
export default {
  name: 'TestModal',
  mixins: [toggleMixin],
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
}

.test {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;

  .modal-body {
    transform: scale(0);
    opacity: 0;
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  .modal-body {
    transition: transform 0.3s ease-out, opacity 0.4s ease-out;
  }

  transition: opacity 0.5s ease;
}
</style>
