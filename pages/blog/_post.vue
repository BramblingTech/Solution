<template>
  <div class="post">
    <UILoader v-if="loading" />
    <div
      v-else
      class="container"
    >
      <UIBreadcrumbs :title="post.title" />
      <h1 class="post__title">{{post.title}}</h1>
      <ul class="post__info-list">
        <li class="post__info-item">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip01)">
              <mask
                id="path-1-inside-1"
                fill="white"
              >
                <path d="M6.5 15.5127H3.5C3.224 15.5127 3 15.2887 3 15.0127V12.0127C3 11.7367 3.224 11.5127 3.5 11.5127H6.5C6.776 11.5127 7 11.7367 7 12.0127V15.0127C7 15.2887 6.776 15.5127 6.5 15.5127ZM4 14.5127H6V12.5127H4V14.5127Z" />
              </mask>
              <path
                d="M6.5 15.5127H3.5C3.224 15.5127 3 15.2887 3 15.0127V12.0127C3 11.7367 3.224 11.5127 3.5 11.5127H6.5C6.776 11.5127 7 11.7367 7 12.0127V15.0127C7 15.2887 6.776 15.5127 6.5 15.5127ZM4 14.5127H6V12.5127H4V14.5127Z"
                fill="#82B56A"
              />
              <path
                d="M4 14.5127H2.37274V16.14H4V14.5127ZM6 14.5127V16.14H7.62726V14.5127H6ZM6 12.5127H7.62726V10.8854H6V12.5127ZM4 12.5127V10.8854H2.37274V12.5127H4ZM6.5 13.8854H3.5V17.14H6.5V13.8854ZM3.5 13.8854C4.12271 13.8854 4.62726 14.39 4.62726 15.0127H1.37274C1.37274 16.1874 2.32529 17.14 3.5 17.14V13.8854ZM4.62726 15.0127V12.0127H1.37274V15.0127H4.62726ZM4.62726 12.0127C4.62726 12.6354 4.12271 13.14 3.5 13.14V9.88544C2.32529 9.88544 1.37274 10.838 1.37274 12.0127H4.62726ZM3.5 13.14H6.5V9.88544H3.5V13.14ZM6.5 13.14C5.87729 13.14 5.37274 12.6354 5.37274 12.0127H8.62726C8.62726 10.838 7.67471 9.88544 6.5 9.88544V13.14ZM5.37274 12.0127V15.0127H8.62726V12.0127H5.37274ZM5.37274 15.0127C5.37274 14.39 5.87729 13.8854 6.5 13.8854V17.14C7.67471 17.14 8.62726 16.1874 8.62726 15.0127H5.37274ZM4 16.14H6V12.8854H4V16.14ZM7.62726 14.5127V12.5127H4.37274V14.5127H7.62726ZM6 10.8854H4V14.14H6V10.8854ZM2.37274 12.5127V14.5127H5.62726V12.5127H2.37274Z"
                fill="#82B56A"
                mask="url(#path-1-inside-1)"
              />
              <mask
                id="path-3-inside-2"
                fill="white"
              >
                <path d="M6.5 21.5127H3.5C3.224 21.5127 3 21.2887 3 21.0127V18.0127C3 17.7367 3.224 17.5127 3.5 17.5127H6.5C6.776 17.5127 7 17.7367 7 18.0127V21.0127C7 21.2887 6.776 21.5127 6.5 21.5127ZM4 20.5127H6V18.5127H4V20.5127Z" />
              </mask>
              <path
                d="M6.5 21.5127H3.5C3.224 21.5127 3 21.2887 3 21.0127V18.0127C3 17.7367 3.224 17.5127 3.5 17.5127H6.5C6.776 17.5127 7 17.7367 7 18.0127V21.0127C7 21.2887 6.776 21.5127 6.5 21.5127ZM4 20.5127H6V18.5127H4V20.5127Z"
                fill="#82B56A"
              />
              <path
                d="M4 20.5127H2.37274V22.14H4V20.5127ZM6 20.5127V22.14H7.62726V20.5127H6ZM6 18.5127H7.62726V16.8854H6V18.5127ZM4 18.5127V16.8854H2.37274V18.5127H4ZM6.5 19.8854H3.5V23.14H6.5V19.8854ZM3.5 19.8854C4.12271 19.8854 4.62726 20.39 4.62726 21.0127H1.37274C1.37274 22.1874 2.32529 23.14 3.5 23.14V19.8854ZM4.62726 21.0127V18.0127H1.37274V21.0127H4.62726ZM4.62726 18.0127C4.62726 18.6354 4.12271 19.14 3.5 19.14V15.8854C2.32529 15.8854 1.37274 16.838 1.37274 18.0127H4.62726ZM3.5 19.14H6.5V15.8854H3.5V19.14ZM6.5 19.14C5.87729 19.14 5.37274 18.6354 5.37274 18.0127H8.62726C8.62726 16.838 7.67471 15.8854 6.5 15.8854V19.14ZM5.37274 18.0127V21.0127H8.62726V18.0127H5.37274ZM5.37274 21.0127C5.37274 20.39 5.87729 19.8854 6.5 19.8854V23.14C7.67471 23.14 8.62726 22.1874 8.62726 21.0127H5.37274ZM4 22.14H6V18.8854H4V22.14ZM7.62726 20.5127V18.5127H4.37274V20.5127H7.62726ZM6 16.8854H4V20.14H6V16.8854ZM2.37274 18.5127V20.5127H5.62726V18.5127H2.37274Z"
                fill="#82B56A"
                mask="url(#path-3-inside-2)"
              />
              <path
                d="M13.5 15.5127H10.5C10.224 15.5127 10 15.2887 10 15.0127V12.0127C10 11.7367 10.224 11.5127 10.5 11.5127H13.5C13.776 11.5127 14 11.7367 14 12.0127V15.0127C14 15.2887 13.776 15.5127 13.5 15.5127ZM11 14.5127H13V12.5127H11V14.5127Z"
                fill="#82B56A"
              />
              <path
                d="M13.5 21.5127H10.5C10.224 21.5127 10 21.2887 10 21.0127V18.0127C10 17.7367 10.224 17.5127 10.5 17.5127H13.5C13.776 17.5127 14 17.7367 14 18.0127V21.0127C14 21.2887 13.776 21.5127 13.5 21.5127ZM11 20.5127H13V18.5127H11V20.5127Z"
                fill="#82B56A"
              />
              <path
                d="M20.5 15.5127H17.5C17.224 15.5127 17 15.2887 17 15.0127V12.0127C17 11.7367 17.224 11.5127 17.5 11.5127H20.5C20.776 11.5127 21 11.7367 21 12.0127V15.0127C21 15.2887 20.776 15.5127 20.5 15.5127ZM18 14.5127H20V12.5127H18V14.5127Z"
                fill="#82B56A"
              />
              <path
                d="M21.5 24.5127H2.5C1.122 24.5127 0 23.3907 0 22.0127V5.0127C0 3.6347 1.122 2.5127 2.5 2.5127H21.5C22.878 2.5127 24 3.6347 24 5.0127V22.0127C24 23.3907 22.878 24.5127 21.5 24.5127ZM2.5 3.5127C1.673 3.5127 1 4.1857 1 5.0127V22.0127C1 22.8397 1.673 23.5127 2.5 23.5127H21.5C22.327 23.5127 23 22.8397 23 22.0127V5.0127C23 4.1857 22.327 3.5127 21.5 3.5127H2.5Z"
                fill="#82B56A"
              />
              <path
                d="M23.5 9.51269H0.5C0.224 9.51269 0 9.28869 0 9.01269C0 8.7367 0.224 8.5127 0.5 8.5127H23.5C23.776 8.5127 24 8.7367 24 9.01269C24 9.28869 23.776 9.51269 23.5 9.51269Z"
                fill="#82B56A"
              />
              <path
                d="M5.5 5.5127C5.224 5.5127 5 5.2887 5 5.0127V1.0127C5 0.736695 5.224 0.512695 5.5 0.512695C5.776 0.512695 6 0.736695 6 1.0127V5.0127C6 5.2887 5.776 5.5127 5.5 5.5127Z"
                fill="#82B56A"
              />
              <path
                d="M18.5 5.5127C18.224 5.5127 18 5.2887 18 5.0127V1.0127C18 0.736695 18.224 0.512695 18.5 0.512695C18.776 0.512695 19 0.736695 19 1.0127V5.0127C19 5.2887 18.776 5.5127 18.5 5.5127Z"
                fill="#82B56A"
              />
            </g>
            <defs>
              <clipPath id="clip01">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0 0.512695)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>{{date}}</span>
        </li>
        <li class="post__info-item">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M23.9293 12.2386C23.7469 11.9733 19.3646 5.75879 12.4371 5.75879C6.49279 5.75879 1.19585 11.9376 0.972973 12.201C0.821509 12.3805 0.821509 12.6439 0.972973 12.8243C1.19585 13.0877 6.49279 19.2665 12.4371 19.2665C18.3815 19.2665 23.6784 13.0877 23.9013 12.8243C24.0412 12.6583 24.0537 12.4181 23.9293 12.2386ZM12.4371 18.3017C7.67185 18.3017 3.14096 13.7573 1.98994 12.5127C3.13906 11.2671 7.66511 6.72365 12.4371 6.72365C18.0129 6.72365 21.9485 11.2613 22.9095 12.4866C21.7999 13.6917 17.243 18.3017 12.4371 18.3017Z"
                fill="#82B56A"
                stroke="#82B56A"
                stroke-width="0.294038"
              />
              <path
                d="M12.4374 8.65332C10.309 8.65332 8.57812 10.3842 8.57812 12.5126C8.57812 14.6411 10.309 16.372 12.4374 16.372C14.5659 16.372 16.2968 14.6411 16.2968 12.5126C16.2968 10.3842 14.5659 8.65332 12.4374 8.65332ZM12.4374 15.4072C10.8416 15.4072 9.54294 14.1085 9.54294 12.5127C9.54294 10.9169 10.8416 9.61818 12.4374 9.61818C14.0333 9.61818 15.332 10.9169 15.332 12.5127C15.332 14.1085 14.0333 15.4072 12.4374 15.4072Z"
                fill="#82B56A"
                stroke="#82B56A"
                stroke-width="0.294038"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.4375 0.512695)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>{{post.views_count}}</span>
        </li>
      </ul>
      <div
        v-if="isMob"
        class="image-frame-wrapper post__hero-img"
      >
        <img
          :src="post.preview_image"
          :alt="post.title"
        >
      </div>
      <div class="post__content-wrapper">
        <div class="post__contents-table-wrapper">
          <BlogContentTable
            :content-list="contentsTable"
            :is-mob="isMob"
          />
        </div>
        <div class="post__post-content-wrapper">
          <div
            v-if="!isMob"
            class="image-frame-wrapper"
          >
            <img
              :src="post.preview_image"
              :alt="post.title"
            >
          </div>
          <h2>
            {{post.title}}
          </h2>
          <div
            ref="rawHtml"
            v-html="post.content"
          ></div>
        </div>
        <div class="post__shere-icon-wrapper">
          <UIShareLinks :link="post.slug" />
        </div>
      </div>
    </div>
    <section class="post__post-footer post-footer">
      <div class="container">
        <div class="post-footer__comment-grid">
          <div class="post-footer__comments">
            <h2
              v-if="checkComments"
              class="post-footer__title"
            >{{$t('post-page.comment')}}</h2>
            <h2
              v-else
              class="post-footer__title"
            >{{$t('post-page.noComment')}}</h2>
            <LayoutsCommentCard
              v-for="comment in comments.data"
              :key="comment.id"
            >
              <template #outer>
                <UICommentCard
                  :comment="comment"
                  :is-comment="true"
                />
              </template>
              <template
                v-if="comment.threads.length > 0"
                #inner
              >
                <UICommentCard
                  v-for="reply in comment.threads"
                  :key="reply.id"
                  :comment="reply"
                  :parent-comment="comment"
                  :is-comment="true"
                  :is-reply="true"
                />
              </template>
            </LayoutsCommentCard>
            <UIMyButton
              v-if="showBtn"
              :click="showMoreComments"
              class="post__comment-btn"
            >{{$t('button-showmore')}}</UIMyButton>
          </div>
        </div>
        <LayoutsFormWrapper class="no-bg">
          <Form
            :btn-title="$t('post-page.publish')"
            :is-comment="true"
          />
        </LayoutsFormWrapper>
        <div class="post-footer__topical-articles-wrapper">
          <h2 class="post-footer__title">{{$t('post-page.interest')}}</h2>
          <ul class="post-footer__articles-list">
            <li
              v-for="item in posts"
              :key="item.id"
              class="post-footer__article"
            >
              <BlogArticleItem
                :content="item"
                :window-width="windowWidth"
                :is-tab="isTab"
                :is-mob="isMob"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { load } from '@fingerprintjs/fingerprintjs';
import loading from '~/mixins/loading';
import { parseDate } from '~/tools/helpers';

export default {
  name: 'PostPage',
  mixins: [loading],

  data: () => ({
    contentsTable: [],
    topicalArticles: [],
    isBtnShown: false,
    slug: '',
  }),

  async fetch({ store, i18n: { locale }, params: { post } }) {
    const options = {
      locale,
      post,
    };

    const getComments = store.getters['comments/getComments'][locale];
    const getPost = store.getters['currentPost/getPost'][locale];
    const getPostsSorted = store.getters['blog/getBlogPostsSorted'][locale];

    if (!getComments.data || getComments.post !== post) {
      await store.dispatch('comments/getComments', options);
    }

    if (!getPost.data) {
      await store.dispatch('currentPost/getArticle', options);
    }

    if (!getPostsSorted.data) {
      await store.dispatch('blog/setBlogPosts', {
        locale,
      });
    }
  },

  computed: {
    checkComments() {
      return this.comments.data ? this.comments.data.length > 0 : false;
    },

    getSlug() {
      return this.$route.params.post;
    },

    currentLocale() {
      return this.$i18n.locale;
    },

    windowWidth() {
      return this.$store.getters['devices/windowWidth'];
    },

    date() {
      return parseDate(this.post.created_at);
    },

    posts() {
      const posts = this.$store.getters['blog/getBlogPostsSorted'];
      return posts[this.currentLocale].data
        ? [...posts[this.currentLocale].data]
            .filter(({ slug }) => slug !== this.getSlug)
            .splice(0, 3)
        : [];
    },

    post() {
      const getterCurrentPost = this.$store.getters['currentPost/getPost'];

      return getterCurrentPost[this.currentLocale]
        ? getterCurrentPost[this.currentLocale]
        : {};
    },

    comments() {
      const getter = this.$store.getters['comments/getComments'];
      return getter[this.currentLocale];
    },

    showBtn() {
      return this.comments.data
        ? this.comments.data.length > 0 && this.comments.links.next
        : false;
    },

    isTab() {
      return this.$store.getters['devices/isTab']
        ? this.$store.getters['devices/isTab']
        : false;
    },

    isMob() {
      return this.$store.getters['devices/isMob']
        ? this.$store.getters['devices/isMob']
        : false;
    },
  },

  mounted() {
    this.slug = this.getSlug;

    const parentDiv = this.$refs.rawHtml;

    parentDiv.children.forEach((childNode, i) => {
      if (childNode.nodeName.match(/H/g)) {
        childNode.id = `title${i + 1}`;
        this.contentsTable.push({
          id: childNode.id,
          title: childNode.innerText,
          position: childNode.offsetTop,
        });
      }

      if (childNode.nodeName.match(/P/g)) {
        if (childNode.firstChild.nodeName === 'IMG') {
          const imgTag = childNode.innerHTML;
          childNode.innerHTML = `<div class="image-frame-wrapper">${imgTag}</div>`;
        }
      }
    });

    // Initialize an agent at application startup.
    const fpPromise = load();

    (async () => {
      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();

      // This is the visitor identifier:
      const visitorId = result.visitorId;

      if (!localStorage.userVisit) {
        const visit = {
          postId: [this.post.id],
          visitorId,
        };

        localStorage.setItem('userVisit', JSON.stringify(visit));

        this.setFingerPrint({
          fingerprint: visitorId,
        });
      } else {
        const userVisit = JSON.parse(localStorage.getItem('userVisit'));

        if (!userVisit.postId.includes(this.post.id)) {
          userVisit.postId.push(this.post.id);
          localStorage.setItem('userVisit', JSON.stringify(userVisit));

          this.setFingerPrint({
            fingerprint: visitorId,
          });
        }
      }
    })();
  },

  beforeDestroy() {
    this.$store.dispatch('comments/getComments', {
      post: this.slug,
      locale: this.currentLocale,
    });
  },

  methods: {
    showMoreComments() {
      this.$store.dispatch('comments/getMoreComments', {
        locale: this.currentLocale,
        post: this.slug,
      });
    },
    async setFingerPrint(data) {
      const api = `${process.env.API_URL}${this.currentLocale}/posts/${this.slug}/visit`;

      try {
        await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.no-bg {
  background: none;
}
</style>
