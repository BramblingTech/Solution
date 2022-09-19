<template>
  <main class="video">
    <LayoutsPageHeader :data="$t('video-surveillance-header')" />
    <ServicesTextImage2Grid1x2
      :is-mob="isMob"
      :content="$t('video-surveillance-description')"
    />
    <section class="video__advantages">
      <div class="container">
        <h2 class="title">{{$t('video-surveillance-advantages.title')}}</h2>

        <LayoutsTextImageBlock
          v-if="!isMob"
          :is-mobile="isMob"
        >
          <div class="video-section-advantages__left-col">
            <p class="video-section-advantages__description">
              {{$t('video-surveillance-advantages.description')}}
            </p>
            <ul class="description-list">
              <li
                v-for="(point, i) in $t('video-surveillance-advantages.points')"
                :key="point + i"
              >
                {{point}}
              </li>
            </ul>
          </div>
          <div class="insulation-section-types__right-col">
            <div class="insulation-section-types__img-wrapper image-frame-wrapper">
              <img
                class="insulation-section-types__img"
                src="/images/service-video-advantages.jpg"
                alt="types 1"
              >
            </div>
          </div>
        </LayoutsTextImageBlock>
        <LayoutsTextImageBlock
          v-else
          :is-mobile="isMob"
          class="insulation-section-types"
        >
          <div class="insulation-section-types__img-wrapper image-frame-wrapper">
            <img
              class="insulation-section-types__img"
              src="/images/service-video-advantages.jpg"
              alt="types 1"
            >
          </div>

          <p>
            {{$t('video-surveillance-advantages.description')}}
          </p>
          <ul class="description-list">
            <li
              v-for="(point, i) in $t('video-surveillance-advantages.points')"
              :key="point + i"
            >
              {{point}}
            </li>
          </ul>
        </LayoutsTextImageBlock>

      </div>
    </section>
    <ServicesBulletsThemplate :content="$t('video-surveillance-installation')" />
    <ServicesTextImgGrid1x2
      :is-mob="isMob"
      :content="$t('video-surveillance-why-us')"
    />
  </main>
</template>

<script>
export default {
  name: 'VideoSurveillance',
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
.video {
  &-section {
    &-advantages {
      &__description {
        margin-bottom: 34px !important;
      }
    }
  }
  &__advantages {
    .title {
      margin-bottom: 24px;
    }
  }
}
</style>
