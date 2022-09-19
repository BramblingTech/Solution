<template>
  <div class="modal-wrapper">
    <UIScrollToTopBtn :is-visible="isVisible" />
    <UICallBackBtn :is-visible="isVisible" />
    <UIThankYou />
    <UICallBackModal />
  </div>
</template>

<script>
import showOnScroll from '@/mixins/showOnScroll';

export default {
  name: 'ModalWrapper',
  mixins: [showOnScroll],
};
</script>

