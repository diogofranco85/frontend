import { api } from '../utils/api';

export default function (props) {
  const { store, redirect } = props;

  if (store.state.Auth.auth === false) {
    redirect('/login');
  }

  api.interceptors.request.use(function (config) {
    return config;
  },
    function (error) {
      return Promise.reject(error);
    });

  api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {

    if (error.message === 'Network Error') {
      alert('Não foi possível conectar ao servidor de dados. \n Se o error persistir favor entrar em contato com a Hype Tecnologia');
      redirect('/logout');
    }

    const status = error.response.status;
    if (status === 401) {
      store.dispatch('Auth/SET_MESSAGE_ERROR_LOGIN')
      redirect('/login');
    }
    return Promise.reject(error);
  })


}
