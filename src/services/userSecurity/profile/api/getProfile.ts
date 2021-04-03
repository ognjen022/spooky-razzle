import { ProfileResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { getHeaders } from '../../../shared/getHeaders'

export const getProfile = () => {
  return fetch(
    `${baseUrl}/v1/customer/getinformation`, {
    method: 'GET',
    headers: getHeaders()
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: ProfileResponse = json.body
    return { success: json.success, statusCode: json.statusCode, data }
  })
}
