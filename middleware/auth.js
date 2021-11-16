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
    const status = error.response.status;
    if (status === 401) {
      store.dispatch('Auth/SET_MESSAGE_ERROR_LOGIN')
      redirect('/login');
    }
    return Promise.reject(error);
  })


}
