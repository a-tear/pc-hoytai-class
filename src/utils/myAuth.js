const TokenKey = 'vue-admin-1906'

export function getToken() {
  var token = window.localStorage.getItem(TokenKey);
  if (token == null || undefined) {
    return null
  } else {
    return JSON.parse(token)
  }
}


export function setToken(token) {
  window.localStorage.setItem(TokenKey, JSON.stringify(token))
}

export function removeToken() {
  return window.localStorage.clear(TokenKey)
}
