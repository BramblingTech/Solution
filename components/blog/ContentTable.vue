<template>
  <div class="content-table">
    <div class="content-table__list-wrapper">
      <h3 class="content-table__title">{{$t('content-table.title')}}</h3>
      <ol class="content-table__list">
        <li
          v-for="(item, i) in contentList"
          :key="item.id"
          class="content-table__item"
          @click="setActiveTitle($event, i, item)"
        >
          {{item.title}}
        </li>
      </ol>
    </div>
    <div
      v-if="!isMob"
      class="content-table__progress-bar"
    >
      <div class="box">
        <div class="precent">
          <svg ref="svg">
            <circle
              cx="45"
              cy="45"
              r="45"
              fill="#000000"
            ></circle>
            <circle
              cx="45"
              cy="45"
              r="45"
              fill="#000000"
              :style="{
              'stroke-dasharray': strokeLength,
              'stroke-dashoffset': getStrokeDashoffset,
            }"
            ></circle>
          </svg>
          <div class="number">
            <span>{{activeTitleIndex}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'vue-debounce';

export default {
  name: 'ContentTable',
  props: {
    contentList: {
      type: Array,
      default: () => [],
    },
    isMob: Boolean,
  },
  data: () => ({
    activeTitleIndex: 1,
    strokeLength: 0,
    debounceScrollHandler: null,
  }),
  computed: {
    getStrokeDashoffset() {
      return (
        this.strokeLength -
        (this.strokeLength *
          ((this.activeTitleIndex * 100) / this.contentLength)) /
          100
      );
    },
    contentLength() {
      return this.contentList.length ? this.contentList.length : 1;
    },
  },
  mounted() {
    !this.isMob
      ? (this.strokeLength = this.$refs.svg.children[1].getTotalLength())
      : (this.strokeLength = 0);

    this.debounceScrollHandler = debounce(this.scrollHandler, '50ms');

    window.addEventListener('scroll', this.debounceScrollHandler);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.debounceScrollHandler);
  },

  methods: {
    setActiveTitle(e, i, el = null) {
      this.activeTitleIndex = i + 1;
      if (el) {
        window.scrollTo({
          top: el.position,
          behavior: 'smooth',
        });
      }
    },

    scrollHandler({ target }) {
      this.contentList.forEach((item, i) => {
        const offset = 200;
        if (target.documentElement.scrollTop + offset >= item.position) {
          this.setActiveTitle(null, i);
        }
      });

      if (target.documentElement.scrollTop <= 50) {
        this.activeTitleIndex = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-table {
  &__title {
    font-weight: bold;
    font-size: em(18);
    line-height: 140%;
    text-align: center;
    margin-bottom: 16px;
  }
  &__list-wrapper {
    position: relative;
    box-shadow: 0 18px 80px rgba(51, 50, 50, 0.11),
      0 6.34834px 24.1177px rgba(51, 50, 50, 0.0565587),
      0 2.4091px 10.0172px rgba(51, 50, 50, 0.0363275),
      0 0.966513px 3.62304px rgba(51, 50, 50, 0.0253215);
    border-radius: 4px;
    margin-bottom: 24px;
    background: $secondary-white2;
    padding: 8px;
    overflow: hidden;
    @include for-md-down {
      margin: 0;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: $primary-flat;
    }
  }

  &__list {
    padding-left: 22px;
    li {
      cursor: pointer;
      &::marker {
        font-weight: 700;
      }
    }
  }

  &__item {
    margin-bottom: 16px;
    position: relative;
    @include transition(all);
    &:last-child {
      margin-bottom: 0;
    }
    &::after {
      position: absolute;
      left: 0;
      bottom: -3px;
      content: '';
      width: 0;
      height: 1px;
      background: $primary-flat;
      @include transition(width);
    }
    &:hover {
      color: $primary-flat;
      &::after {
        width: 80%;
      }
      @include transition(all);
    }
  }
}
.box {
  .precent {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      position: relative;
      width: 100px;
      height: 100px;
      transform: rotate(90deg);
      circle {
        fill: none;
        stroke-width: 10;
        stroke: $primary-flat;
        transform: translate(5px, 5px);
        stroke-dasharray: 420;
        stroke-dashoffset: 420;
        @include transition(stroke-dashoffset);
        &:nth-child(1) {
          stroke-dasharray: 0;
          stroke-dashoffset: 0;
          opacity: 0.5;
        }
        &:nth-child(2) {
          stroke-linecap: round;
        }
      }
    }
  }
  .number {
    position: absolute;
    font-weight: bold;
    font-size: 24px;
    line-height: 120%;
  }
}
</style>
