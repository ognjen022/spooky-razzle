import { getAccessToken } from './tokenLocalStorage'

export const getHeaders = () => {
  return {
    'Authorization': `Bearer ${getAccessToken()}`,
    'Content-Type': 'application/json'
  }
}
export const getHeadersNoAuth = () => {
  return {
    'Content-Type': 'application/json'
  }
}