import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { SignupResponse } from '../models'

export const postUserSecuritySignup = (firstname: string, lastname: string, email: string, password: string, accept_email_notifications: boolean): Promise<ApiResponse<SignupResponse>> => {
  return fetch(
    `${baseUrl}/v1/usersecurity/signup`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstname, lastname, email, password, accept_email_notifications })
  }
  ).then(async (response) => {
    let json = await response.json()
    return { success: json.success, statusCode: json.statusCode, data: json.data, is_success: json.success }
  })
}
