export default function (tipoHeader) {

  const cors = {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  }

  switch (tipoHeader) {
    case 'SEM_TOKEN_FORM': {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ...cors
      }
      return headers
    }
    case 'COM_TOKEN_USUARIO': {
      const token = window.localStorage.getItem('access_token')
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        ...cors,
        Authorization: 'Bearer ' + token,
      }

      return headers
    }
    case 'SEM_TOKEN_JSON': {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        ...cors
      }
      return headers
    }
    case 'COM_TOKEN_PUBLICO': {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        ...cors,
        Authorization: 'Bearer ' + '',
      }
      return headers
    }
    case 'MULTPART': {
      const token = window.localStorage.getItem('access_token')
      const headers = {
        'content-type': 'multipart/form-data',
        ...cors,
        Authorization: 'Bearer ' + token,
      }
      return headers
    }
    default:
      return {}
  }
}
