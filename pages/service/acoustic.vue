<template>
  <main class="acoustic">
    <LayoutsPageHeader :data="$t( 'acoustic-header')" />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('acoustic-description')"
    />

    <section class="acoustic__materials">
      <div class="container">
        <LayoutsTextImageBlock
          v-if="!isMob"
          :is-mobile="isMob"
          class="acoustic-section-materials"
        >
          <div class="acoustic-section-materials__left-col">
            <h2 class="acoustic-section-materials__title title">{{$t('acoustic-materials.title')}}</h2>
            <p
              v-for="(paragraph, i) in $t('acoustic-materials.paragraphs')"
              :key="paragraph+i"
            >
              {{paragraph}}
            </p>
            <ul class="circled-list">
              <li
                v-for="(material, i) in $t('acoustic-materials.bullets')"
                :key="material + i"
              >
                <span class="circle">{{i+1}}</span>{{material}}
              </li>
            </ul>
          </div>
          <div class="acoustic-section-materials__right-col">
            <div class="acoustic-section-materials__img-wrapper image-frame-wrapper">
              <img
                class="acoustic-section-materials__img"
                src="/images/service-acoustic-materials.jpg"
                alt="types 1"
              >
            </div>
          </div>
        </LayoutsTextImageBlock>
        <LayoutsTextImageBlock
          v-else
          :is-mobile="isMob"
          class="acoustic-section-materials"
        >
          <div class="acoustic-section-materials__left-col">
            <h2 class="acoustic-section-materials__title title">{{$t('acoustic-materials.title')}}</h2>
            <div class="acoustic-section-materials__img-wrapper image-frame-wrapper">
              <img
                class="acoustic-section-materials__img"
                src="/images/service-acoustic-materials.jpg"
                alt="types 1"
              >
            </div>

            <p
              v-for="(paragraph, i) in $t('acoustic-materials.paragraphs')"
              :key="paragraph+i"
            >
              {{paragraph}}
            </p>
            <ul class="circled-list">
              <li
                v-for="(material, i) in $t('acoustic-materials.bullets')"
                :key="material + i"
              >
                <span class="circle">{{i+1}}</span>{{material}}
              </li>
            </ul>
          </div>
        </LayoutsTextImageBlock>
      </div>
    </section>
    <ServicesBulletsThemplate :content="$t('acoustic-types')" />
  </main>
</template>

<script>
export default {
  name: 'Acoustic',
  layout: 'service',
  computed: {
    isMob() {
      return this.$store.getters['devices/isMob']
        ? this.$store.getters['devices/isMob']
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.acoustic {
  &-section {
    &-materials {
      &__left-col {
        .circled-list {
          margin-top: 34px;
        }
      }
    }
  }
}
</style>
