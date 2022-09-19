<template>
  <transition name="fadeInCallback">
    <div
      v-show="isOpen"
      v-scroll-lock="isOpen"
      class="call-back-modal"
      @click.stop="closeModalWrapper"
    >
      <div class="call-back-modal__content-wrapper">
        <h2 class="call-back-modal__title">{{$t('callback-modal.title')}}</h2>
        <form
          id="callback-form"
          ref="callbackForm"
          class="form"
          @submit.prevent="submitCallBack"
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
          <UIMyButton
            class="call-back-modal__btn"
            :click="submitCallBack"
          >{{$t('button-callback2')}}</UIMyButton>
        </form>
        <button
          type="button"
          class="call-back-modal__closeBtn"
          @click.stop="closeModalBtn"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip1)">
              <path
                d="M8.93781 8.00465L15.7964 1.14611C16.0611 0.890455 16.0684 0.468636 15.8127 0.203925C15.5571 -0.0607856 15.1353 -0.0681257 14.8706 0.187527C14.865 0.192876 14.8596 0.198342 14.8542 0.203925L7.99559 7.06247L1.13705 0.203886C0.872334 -0.0517667 0.450515 -0.0444266 0.194863 0.220284C-0.054543 0.478513 -0.054543 0.887878 0.194863 1.14611L7.0534 8.00465L0.194863 14.8632C-0.0652798 15.1234 -0.0652798 15.5452 0.194863 15.8054C0.455044 16.0655 0.876863 16.0655 1.13705 15.8054L7.99559 8.94683L14.8541 15.8054C15.1188 16.061 15.5407 16.0537 15.7963 15.789C16.0457 15.5307 16.0457 15.1214 15.7963 14.8632L8.93781 8.00465Z"
                fill="#495244"
              />
            </g>
            <defs>
              <clipPath id="clip1">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { IMaskDirective } from 'vue-imask';
export default {
  name: 'CallBackModal',
  directives: {
    imask: IMaskDirective,
  },
  data: () => ({
    name: '',
    phone: '',
    mask: {
      mask: '+{38}(000)000-00-00',
      lazy: true,
    },
  }),
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
  },
  computed: {
    isOpen() {
      return this.$store.state.modals.callBackModalOpen;
    },
  },
  methods: {
    submitCallBack() {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      const api = `${process.env.API_URL}contact-us`;
      const pattern = /[()\s\-\\+\0\t\n\r{a-z}]/g;
      const data = {
        type: 'consultation',
        phone: this.phone.replace(pattern, '').slice(2),
        name: this.name,
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

      console.log('submitted!');
      this.closeModalBtn();
      this.openThankYou();
      this.resetForm();
    },
    resetForm() {
      this.name = '';
      this.phone = '';
      this.$refs.callbackForm.reset();
      this.$v.$reset();
    },
    setValidateClass: (validation) => {
      if (validation.$anyDirty && validation.$error) {
        return 'form-group--error';
      } else if (validation.$anyDirty && !validation.$error) {
        return 'form-group--correct';
      }
    },
    closeModalBtn() {
      this.$store.commit('modals/closeCallback', false);
      this.resetForm();
    },
    closeModalWrapper({ target, currentTarget }) {
      if (target === currentTarget) {
        this.$store.commit('modals/closeCallback', false);
        this.resetForm();
      }
    },
    openThankYou() {
      this.$store.commit('modals/toggleThankYou');
    },
  },
};
</script>

<style lang="scss" scoped>
.call-back-modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(48, 48, 48, 0.5);
  z-index: 11000;
  &__content-wrapper {
    position: relative;
    width: 100%;
    max-width: 474px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    background: $secondary-white;
    padding: 30px 50px;
    z-index: 12;
    @include for-md-down {
      width: 90%;
    }
  }
  &__title {
    font-weight: bold;
    font-size: em(18);
    line-height: 140%;
    text-align: center;
    margin-bottom: 24px;
  }
  &__closeBtn {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 16px;
    height: 16px;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    z-index: 12;
    opacity: 0.5;
    @include transition(opacity);

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
  &__btn {
    max-width: 230px;
    height: 47px;
    padding: 13px 36px;
    margin: 0 auto;
  }
}

.fadeInCallback-enter-active,
.fadeInCallback-leave-active {
  transition: opacity $animation-speed;
}
.fadeInCallback-enter,
.fadeInCallback-leave-to {
  opacity: 0;
}
</style>
