import axios from 'axios';
import Headers from '~/utils/headers';

export const api = axios.create({
  baseURL: process.env.BASE_URL
});

export async function post(url, param, tipoHeader, converterData) {

  const headers = await Headers(tipoHeader)
  let parametro = param
  if (converterData === 'S') {
    parametro = JSON.stringify(param)
  }

  return await api.post(url, parametro, {
    headers
  });

}

export async function get(url, tipoHeader) {
  const headers = await Headers(tipoHeader)

  return await api.get(url, {
    headers
  })
}

export async function put(url, param, tipoHeader, converterData) {

  const headers = await Headers(tipoHeader)
  let parametro = param
  if (converterData === 'S') {
    parametro = JSON.stringify(param)
  }

  return await api.put(url, parametro, {
    headers
  })
}

export async function del(url, tipoHeader) {
  const headers = await Headers(tipoHeader)

  return await api.delete(url, {
    headers
  });
}


