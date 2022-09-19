<template>
  <div class="container">
    <div class="form-app">
      <div class="form-app__description">
        <h2>{{$t('form-titles.callback')}}</h2>
        <p>{{$t('form-description.formApplication')}}</p>
      </div>
      <div class="form-app__form">
        <form
          id="form-application"
          ref="form"
          @submit.prevent="submit"
          @mouseout="handleMouseOut"
          @click.stop="handleSelect"
        >
          <h3>{{$t('form-titles.default')}}</h3>
          <div class="form-app__grid">
            <div class="form-app__grid--left">
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
              <div class="form-group form-group--dropdown">
                <label for="service">{{$t('form-inputs.service')}}</label>

                <ul
                  ref="selectList"
                  class="service-select"
                  @click="pickService($event)"
                  @mouseenter="openSelect"
                >
                  <li
                    ref='currentService'
                    class="link service-select__current"
                  >{{currentService}}</li>
                  <li
                    v-for="(service, i) in getServices.filter((el, i) => el.title !== currentService)"
                    :key="service + i"
                    class="link"
                  >
                    {{service.title}}
                  </li>
                </ul>
              </div>

              <div
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
            <div class="form-app__grid--right">
              <div
                class="form-group"
                :class="setValidateClass($v.comment, true)"
              >
                <label for="comment">{{$t('form-inputs.comments')}}</label>
                <span
                  v-if="!$v.comment.maxLength"
                  class="form-group__error-message"
                >{{$t('form-hints.review.more')}}</span>

                <textarea
                  id="comment"
                  v-model.trim="$v.comment.$model"
                  name="comment"
                  :placeholder="$t('form-hints.comments.placeholder')"
                ></textarea>
                <div class="form__caption">
                  <p>*{{$t('form-hints.require')}}</p>
                </div>
                <UIMyButton :click="submit">{{$t('button-submit')}}</UIMyButton>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { IMaskDirective } from 'vue-imask';

export default {
  directives: {
    imask: IMaskDirective,
  },
  data() {
    return {
      name: '',
      phone: '',
      currentService: '',
      comment: '',
      mask: {
        mask: '+{38}(000)000-00-00',
        lazy: true,
      },
      services: [],
    };
  },

  validations: {
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
      maxLength: maxLength(500),
    },
  },

  computed: {
    getServices() {
      return this.$t('services');
    },
    isTablet() {
      return this.$store.getters['devices/isTab']
        ? this.$store.getters['devices/isTab']
        : false;
    },
  },

  watch: {
    getServices() {
      this.currentService = this.getServices[0].title;
    },
  },

  mounted() {
    this.services = this.getServices;
    this.currentService = this.getServices[0].title;
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      const api = `${process.env.API_URL}contact-us`;
      const pattern = /[()\s\-\\+\0\t\n\r{a-z}]/g;
      const data = {
        type: 'application',
        phone: this.phone.replace(pattern, '').slice(2),
        name: this.name,
        comment: this.comment,
        service: this.currentService,
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
      this.toggleModal();
      this.resetForm();
    },

    resetForm() {
      this.name = '';
      this.phone = '';
      this.currentService = this.services[0].title;
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

    goTop() {
      this.$refs.selectList.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    pickService(e) {
      const select = this.$refs.selectList;
      if (e.target.classList.contains('link')) {
        this.currentService = e.target.innerText;
        this.goTop();
        select.classList.remove('active-select');
      }
    },

    handleSelect({ target }) {
      const select = this.$refs.selectList;
      if (this.isTablet) {
        if (target === select) {
          select.classList.add('active-select');
        } else {
          select.classList.remove('active-select');
          this.goTop();
        }
      }
    },

    openSelect() {
      if (this.isTablet) return;
      const select = this.$refs.selectList;
      select.classList.add('active-select');
    },

    handleMouseOut({ target }) {
      const select = this.$refs.selectList;
      if (target.closest('.service-select') !== select) {
        this.goTop();
        select.classList.remove('active-select');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-app {
  display: grid;
  grid-template-columns: minmax(200px, 413px) 1fr;
  column-gap: 30px;
  @include for-md-down {
    grid-template-columns: auto;
  }
  .form-group {
    input,
    textarea,
    .service-select {
      background: $secondary-white3;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
    @media screen and (max-width: 1000px) {
      grid-template-columns: auto;
    }

    &--left {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media screen and (max-width: 1000px) {
        height: 285px;
        margin-bottom: 34px;
      }
    }
  }
  button {
    margin-top: 28px;
    @include for-md-down {
      margin-left: auto;
      margin-right: auto;
    }
  }
  h2 {
    font-size: em(34);
    margin-bottom: 24px;
    line-height: 40px;
    @include for-md-down {
      font-size: em(22);
      text-align: center;
    }
  }
  h3 {
    font-size: em(24);
    text-align: center;
    margin-bottom: 44px;
    @include for-md-down {
      margin-bottom: 34px;
      font-size: em(18);
    }
  }
  form {
    background: $secondary-white2;
    border-radius: 10px;
    box-shadow: $block-shadow-main;
    padding: 27px 16px 34px 16px;
    @include for-md-down {
      margin-top: 44px;
    }
  }
}
</style>
