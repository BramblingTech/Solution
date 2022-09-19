<template>
  <form
    ref="replyForm"
    class="reply-form"
  >
    <div
      class="form-group"
      :class="setValidateClass($v.name)"
    >
      <label for="name">{{$t('form-inputs.name')}}*</label>
      <span
        v-if="$v.name.$anyDirty && !$v.name.required"
        class="form-group__error-message"
      >{{$t('form-hints.name.require')}}</span>
      <span
        v-if="!$v.name.minLength"
        class="form-group__error-message"
      >{{$t('form-hints.name.less')}}</span>
      <span
        v-if="$v.name.$anyDirty && !$v.name.maxLength"
        class="form-group__error-message"
      >{{$t('form-hints.name.more')}}</span>
      <input
        id="name"
        v-model.trim="$v.name.$model"
        type="text"
        name="name"
        :placeholder="$t('form-hints.name.placeholder')"
      />
    </div>
    <div
      class="form-group"
      :class="setValidateClass($v.email)"
    >
      <label for="email">{{$t('form-inputs.email')}}*</label>
      <span
        v-if="$v.email.$anyDirty && !$v.email.required"
        class="form-group__error-message"
      >{{$t('form-hints.email.require')}}</span>
      <span
        v-if="$v.email.$anyDirty && !$v.email.email"
        class="form-group__error-message"
      >{{$t('form-hints.email.format')}}</span>
      <input
        id="email"
        v-model.trim="$v.email.$model"
        type="text"
        name="email"
        placeholder="mail@mail.com"
      />
    </div>
    <div class="form-group">
      <label for="comment">{{$t('form-inputs.comments')}}</label>
      <textarea
        id="comment"
        v-model.trim="comment"
        name="comment"
        :placeholder="$t('form-hints.comments.placeholder')"
      ></textarea>
      <div class="form__caption">
        <p>*{{$t('form-hints.require')}}</p>
      </div>
    </div>
    <UIMyButton
      class="reply-form__btn"
      :click="submit"
    >{{$t('post-page.publish')}}</UIMyButton>

  </form>
</template>

<script>
import { mapMutations } from 'vuex';
import {
  required,
  minLength,
  maxLength,
  email,
} from 'vuelidate/lib/validators';

export default {
  name: 'FormReply',
  props: {
    parentId: {
      type: Number,
      default: 0,
    },
    commentId: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    name: '',
    email: '',
    comment: '',
  }),

  validations() {
    return {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
      email: {
        required,
        email,
      },
    };
  },

  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    slug() {
      return this.$route.params.post;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      const api = `${process.env.API_URL}${this.currentLocale}/posts/${this.slug}/comments`;
      const data = {
        email: this.email,
        name: this.name,
        body: this.comment,
        parent_id: this.parentId,
        comment_id: this.commentId,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch(api, options)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((err) => console.error(err));

      this.toggleModal();
      console.log('submitted!');
      this.resetForm();
    },

    resetForm() {
      this.name = '';
      this.email = '';
      this.comment = '';
      this.$refs.replyForm.reset();
      this.$v.$reset();
    },
    setValidateClass: (validation) => {
      if (validation.$anyDirty && validation.$error) {
        return 'form-group--error';
      } else if (validation.$anyDirty && !validation.$error) {
        return 'form-group--correct';
      }
    },
    ...mapMutations({
      toggleModal: 'modals/toggleThankYou',
    }),
  },
};
</script>

<style lang="scss" scoped>
.reply-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 34px;
  padding-bottom: 24px;
  .form-group {
    margin-bottom: 0;
  }
  &__btn {
    height: max-content;
    width: max-content;
    padding: 13px 66px;
    margin-top: 33px;
  }
}
</style>
