<template>
  <div class="container">
    <h2 class="title">{{$t('form-titles.consult')}}</h2>
    <form
      id="consultation-form"
      ref="consultationForm"
      class="consultation-form"
      @submit.prevent="submitConsultation"
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
        class="consultation-form__btn"
        :click="submitConsultation"
      >{{$t('button-callback')}}</UIMyButton>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { IMaskDirective } from 'vue-imask';
export default {
  name: 'ConsultationForm',
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
  methods: {
    submitConsultation() {
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
      this.openThankYou();
      this.resetForm();
    },
    resetForm() {
      this.name = '';
      this.phone = '';
      this.$refs.consultationForm.reset();
      this.$v.$reset();
    },
    setValidateClass: (validation) => {
      if (validation.$anyDirty && validation.$error) {
        return 'form-group--error';
      } else if (validation.$anyDirty && !validation.$error) {
        return 'form-group--correct';
      }
    },
    openThankYou() {
      this.$store.commit('modals/toggleThankYou');
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 34px;
}
.consultation-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  align-items: center;
  @include for-md-down {
    grid-template-columns: 1fr;
  }

  &__btn {
    max-width: 270px;
    padding: 13px 50px;
    @include for-md-down {
      justify-self: center;
    }
  }
}
</style>
