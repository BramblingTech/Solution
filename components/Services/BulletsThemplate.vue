<template>
  <section class="service-bullets-section">
    <div class="container">
      <LayoutsBulletsThemplate>
        <template #title>
          <h2 class="title">{{content.title}}</h2>
        </template>
        <template #content>
          <div class="left-col">
            <p>
              {{content.description}}
            </p>
          </div>
          <div class="right-col">
            <UIBulletItem
              v-for="(bullet, i) in content.bullets"
              :key="bullet.title + i"
              :bullet="bullet"
            />
          </div>
        </template>
      </LayoutsBulletsThemplate>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BulletsThemplate',
  props: {
    content: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
};
</script>

