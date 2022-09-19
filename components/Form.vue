<template>
  <div class="container">
    <h2
      v-if="isComment"
      class="title comment-title"
    >{{$t('form-titles.post')}}</h2>
    <h2
      v-if="isContact"
      class="title comment-title"
    >{{$t('form-titles.contact')}}</h2>

    <h2
      v-if="!isComment && !isContact"
      class="title"
    >{{$t('form-titles.consult')}}</h2>

    <div class="form-wrapper">
      <form
        id="form"
        ref="form"
        class="form"
        @submit.prevent="submit"
      >
        <div class="form__left">
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
            v-if="isComment"
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
          <div
            v-else
            class="form-group"
            :class="setValidateClass($v.phone)"
          >
            <label for="phone">{{$t('form-inputs.phone')}}*</label>
            <span
              v-if="$v.phone.$anyDirty && !$v.phone.required"
              class="form-group__error-message"
            >{{$t('form-hints.phone.require')}}</span>
            <span
              v-if="$v.phone.$anyDirty && !$v.phone.minLength"
              class="form-group__error-message"
            >{{$t('form-hints.phone.less')}}</span>

            <input
              id="phone"
              v-model.trim="$v.phone.$model"
              v-imask="mask"
              type="text"
              name="phone"
              placeholder="+ 38 (0XX) XXX-XX-XX"
            />
          </div>
        </div>
        <div class="form__right">
          <div
            class="form-group"
            :class="isComment && setValidateClass($v.comment, isComment ? null : true)"
          >
            <label for="comment">{{$t('form-inputs.comments') + (isComment ? '*' : '')}}</label>
            <span
              v-if="$v.comment.$anyDirty && !$v.comment.minLength && isComment"
              class="form-group__error-message"
            >{{$t('form-hints.review.less')}}</span>
            <span
              v-if="$v.comment.$anyDirty && !$v.comment.maxLength"
              class="form-group__error-message"
            >{{$t('form-hints.review.more')}}</span>
            <span
              v-if="$v.comment.$anyDirty && !$v.comment.required && isComment"
              class="form-group__error-message"
            >{{$t('form-hints.review.require')}}</span>

            <textarea
              id="comment"
              v-model.trim="$v.comment.$model"
              name="comment"
              :placeholder="$t('form-hints.comments.placeholder')"
            ></textarea>
            <div class="form__caption">
              <p>*{{$t('form-hints.require')}}</p>
            </div>
          </div>
        </div>
      </form>
      <div class="form__contact">
        <UIMyButton
          v-if="btnTitle"
          :click="submit"
        >{{btnTitle}}</UIMyButton>
        <UIMyButton
          v-else
          :click="submit"
        >{{$t('form-btn-default')}}</UIMyButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {
  required,
  minLength,
  maxLength,
  email,
} from 'vuelidate/lib/validators';
import { IMaskDirective } from 'vue-imask';

export default {
  name: 'Form',
  directives: {
    imask: IMaskDirective,
  },
  props: {
    isComment: {
      type: Boolean,
      default: false,
    },

    isContact: {
      type: Boolean,
      default: false,
    },

    btnTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    if (this.isComment) {
      return {
        name: '',
        email: '',
        comment: '',
      };
    }
    return {
      name: '',
      phone: '',
      comment: '',
      mask: {
        mask: '+{38}(000)000-00-00',
        lazy: true,
      },
    };
  },
  validations() {
    if (this.isComment) {
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
        comment: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(2000),
        },
      };
    }
    return {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
      phone: {
        required,
        minLength: minLength(17),
      },
      comment: {
        maxLength: maxLength(2000),
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

      if (this.isComment) {
        const api = `${process.env.API_URL}${this.currentLocale}/posts/${this.slug}/comments`;
        const data = {
          email: this.email,
          name: this.name,
          body: this.comment,
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
      } else {
        const api = `${process.env.API_URL}contact-us`;
        const pattern = /[()\s\-\\+\0\t\n\r{a-z}]/g;
        const data = {
          type: 'consultation',
          phone: this.phone.replace(pattern, '').slice(2),
          name: this.name,
          comment: this.comment,
        };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };

        fetch(api, options)
          .then((res) => res.json())
          .catch((err) => console.error(err));
      }

      this.toggleModal();
      console.log('submitted!');
      this.resetForm();
    },
    resetForm() {
      this.name = '';
      this.phone = '';
      this.email = '';
      this.comment = '';
      this.$refs.form.reset();
      this.$v.$reset();
    },
    setValidateClass: (validation, isComment = null) => {
      if (validation.$anyDirty && validation.$error) {
        return 'form-group--error';
      } else if (validation.$anyDirty && !validation.$error && !isComment) {
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
h2 {
  margin-bottom: 30px;
}
.comment-title {
  font-size: em(34);
}
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  @include for-md-down {
    grid-template-columns: auto;
  }
  &-group {
    &:not(:last-child) {
      margin-bottom: 34px;
      @include for-md-down {
        margin-bottom: 44px;
      }
    }
    textarea {
      height: 125px;
      margin-bottom: 5px;
    }
  }
  &-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 30px;
    @include for-md-down {
      grid-template-columns: auto;
    }
  }
  &__left {
    @include for-md-down {
      margin-bottom: 34px;
    }
  }
  &__contact {
    button {
      width: max-content;
      padding: 13px 48px;
      font-size: 13px;
      margin-top: 30px;
      @include for-md-down {
        margin: 0 auto;
        margin-top: 34px;
      }
    }
  }
}
</style>
