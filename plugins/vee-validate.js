import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider, setInteractionMode, localize } from 'vee-validate';
import { required, alpha, email, max, min, digits } from 'vee-validate/dist/rules';
import pt_BR from 'vee-validate/dist/locale/pt_BR.json';

localize({
  pt_BR
})

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

setInteractionMode('eager');

extend('required', {
  ...required,
  message: 'Preenchimento obrigatório'
});

extend('alpha', {
  ...alpha,
  message: 'Somente caracteres alfanumérico'
});

extend('email', {
  ...email,
  message: 'O campo deve ser um endereço de e-mail'
});

extend('max', {
  ...max,
  message: 'O campo deve conter no máximo {length} caracteres'
});

extend('min', {
  ...min,
  message: 'O campo deve conter no minímo {_length_} caracteres'
});


extend('digits', {
  ...digits,
  message: 'O campo deve conter somente numéros. ({_value_})'
});
