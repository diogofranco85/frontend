import axios from 'axios';
import Headers from './headers';


export async function post( url, param, tipoHeader, converterData){
  const urlAcesso = process.env.BASE_URL + url

  const headers = await Headers(tipoHeader)
  let parametro = param
  if (converterData === 'S') {
    parametro = JSON.stringify(param)
  }

  return await axios.post(urlAcesso, parametro, {
    headers,
  })

}

export async function get(url, tipoHeader) {
  const urlAcesso = process.env.BASE_URL + url
  const headers = await Headers(tipoHeader)

  return await axios.get(urlAcesso, {
    headers,
  })
}

export async function put(url, param, tipoHeader, converterData) {
  const urlAcesso = process.env.BASE_URL + url

  const headers = await Headers(tipoHeader)
  let parametro = param
  if (converterData === 'S') {
    parametro = JSON.stringify(param)
  }
  return await axios.put(urlAcesso, parametro, {
    headers,
  })
}

export async function del(url, tipoHeader) {
  const urlAcesso = process.env.BASE_URL + url
  const headers = await Headers(tipoHeader)

  return await axios.delete(urlAcesso, {
    headers,
  })
}


export const apiAuth = axios.create({
    baseURL: process.env.BASE_URL
})

