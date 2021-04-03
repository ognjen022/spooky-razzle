import { baseUrl } from '../../shared/baseUrl'
import { ApiResponse } from '../../shared/ApiResponse'
import { IContactUsResponse } from '../models'

export const postContactUs = (firstname?: string, lastname?: string, email?: string, message?: string): Promise<ApiResponse<IContactUsResponse>> => {
  return fetch(
    `${baseUrl}/v1/contactus`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstname, lastname, email, message })
  }
  ).then(async (response) => {
    let json = await response.json()
    return { success: json.is_success, statusCode: json.statusCode, data: json.data, is_success: json.is_success }
  })
}
