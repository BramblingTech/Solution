<template>
  <div
    ref="commentCard"
    class="comments-card"
    :class="{'comments-card-comment': isComment}"
    :style="isReply ? { marginLeft: '10%' } : {}"
  >
    <div class="comments__header">
      <div class="comments__avatar">
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="27.0312"
            cy="27.6074"
            r="26.5"
            stroke="#82B56A"
          />
          <g :clip-path="`url(#clip${comment.id})`">
            <path
              d="M27.0309 27.6514C18.071 27.6514 10.7812 34.9411 10.7812 43.901C10.7812 44.291 11.0978 44.6076 11.4878 44.6076C11.8778 44.6076 12.1943 44.291 12.1943 43.901C12.1943 35.7197 18.8496 29.0644 27.031 29.0644C35.2123 29.0644 41.8676 35.7197 41.8676 43.901C41.8676 44.291 42.1842 44.6076 42.5742 44.6076C42.9642 44.6076 43.2807 44.291 43.2807 43.901C43.2806 34.9397 35.9909 27.6514 27.0309 27.6514Z"
              fill="#82B56A"
            />
            <path
              d="M27.0313 10.6074C22.747 10.6074 19.2598 14.0933 19.2598 18.379C19.2598 22.6647 22.7471 26.1505 27.0313 26.1505C31.3155 26.1505 34.8029 22.6647 34.8029 18.379C34.8029 14.0933 31.3156 10.6074 27.0313 10.6074ZM27.0313 24.7376C23.5256 24.7376 20.6728 21.8847 20.6728 18.379C20.6728 14.8733 23.5256 12.0204 27.0313 12.0204C30.537 12.0204 33.3899 14.8733 33.3899 18.379C33.3899 21.8847 30.537 24.7376 27.0313 24.7376Z"
              fill="#82B56A"
            />
          </g>
          <defs>
            <clipPath :id="`clip${comment.id}`">
              <rect
                width="34"
                height="34"
                fill="white"
                transform="translate(10.0312 10.6074)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="comments__info">
        <h5 class="comments__name">{{comment.name}}</h5>
        <span v-if="isReply">{{`${$t('post-page.answered')} ${replyName}`}}</span>
        <time :datetime="comment.created_at">{{getDate}}</time>
        <p
          v-if="comment.place"
          class="comments__place"
        >
          {{comment.place}}
        </p>
      </div>
    </div>
    <div class="comments__body">
      <p>
        {{comment.body}}
      </p>
    </div>
    <div
      v-if="isComment"
      class="comments-card__btn-wrapper"
    >
      <button
        class="comments-card__btn"
        :class="{'active': isReplyOpen}"
        @click="openReply"
      >{{isReplyOpen ? $t('button-reply-cancel') : $t('button-reply')}}</button>
    </div>
    <transition name="fade">
      <div
        v-show="isReplyOpen"
        class="comments-card__reply"
      >
        <h5>{{$t('button-reply') + ' ' + comment.name}}</h5>
        <UIFormReply
          :parent-id="parentComment.id ? parentComment.id : comment.id"
          :comment-id="comment.id"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { parseDate } from '~/tools/helpers';

export default {
  props: {
    comment: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    parentComment: {
      type: Object,
      default: () => ({}),
    },
    parentName: {
      type: String,
      default: '',
    },
    isComment: {
      type: Boolean,
      default: false,
    },
    isReply: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isReplyOpen: false,
  }),

  computed: {
    getDate() {
      return parseDate(this.comment.created_at);
    },
    replyName() {
      return this.getParentName(
        this.parentComment.threads,
        this.comment.comment_id
      )
        ? this.getParentName(
            this.parentComment.threads,
            this.comment.comment_id
          ).name
        : this.parentComment.name;
    },
  },

  methods: {
    openReply() {
      this.isReplyOpen = !this.isReplyOpen;
    },
    getParentName(array, id) {
      return array.find((el) => el.id === id);
    },
  },
};
</script>

<style lang="scss" scoped>
.comments {
  &__info {
    span {
      color: $primary-flat;
      margin-right: 12px;
      margin-left: -8px;
    }
  }
  &-card {
    background: $secondary-white2;
    padding: 34px 38px 39px 38px;
    border-radius: 4px;
    box-shadow: 0 18px 65px rgba(62, 62, 62, 0.07),
      0 2.43391px 25.6132px rgba(62, 62, 62, 0.0317368);
    margin-bottom: 54px;
    &:last-of-type {
      margin-bottom: 0;
    }
    @include for-md-down {
      padding: 24px 16px 20px 16px;
    }

    &__btn {
      position: relative;
      background: transparent;
      border: none;
      outline: none;
      font-size: 15px;
      line-height: 160%;
      color: $primary-flat;
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: $primary-flat;
        @include transition(width);
      }

      &:hover {
        &::after {
          width: 100%;
        }
      }
      &-wrapper {
        margin-top: 16px;
      }
      &.active {
        color: $incorrect;
        &::after {
          background: $incorrect;
        }
      }
    }

    &__reply {
      margin-top: 34px;
      h5 {
        font-size: 18px;
        margin-bottom: 24px;
      }
    }
    &-comment {
      padding-bottom: 22px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
