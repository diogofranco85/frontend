export default function (tipoHeader) {
  switch (tipoHeader) {
    case 'SEM_TOKEN_FORM': {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
      return headers
    }
    case 'COM_TOKEN_USUARIO': {
      const token = window.localStorage.getItem('access_token')
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token,
      }

      return headers
    }
    case 'SEM_TOKEN_JSON': {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
      return headers
    }
    case 'COM_TOKEN_PUBLICO': {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + '',
      }
      return headers
    }
    case 'MULTPART': {
      const token = window.localStorage.getItem('access_token')
      const headers = {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token,
      }
      return headers
    }
    default:
      return {}
  }
}
