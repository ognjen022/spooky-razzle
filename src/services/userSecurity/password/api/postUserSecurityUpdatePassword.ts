import { PasswordResetRequest, PasswordResetResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const postUserSecurityUpdatePassword = (request: PasswordResetRequest): Promise<ApiResponse<PasswordResetResponse>> => {
  return fetch(
    `${baseUrl}/v1/usersecurity/updatepassword`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ newPassword: request.confirmPassword })
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: PasswordResetResponse = json.data
    const result: ApiResponse<PasswordResetResponse> = {
      data,
      statusCode: json.statusCode,
      success: json.success,
      is_success: json['is_success']
    }
    return result
  })
}
