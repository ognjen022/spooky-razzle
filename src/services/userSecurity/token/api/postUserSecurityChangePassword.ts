import { TokenPasswordResetRequest, TokenPasswordResetResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'

export const postUserSecurityChangePassword = (request: TokenPasswordResetRequest): Promise<ApiResponse<TokenPasswordResetResponse>> => {
  return fetch(
    `${baseUrl}/v1/usersecurity/changepassword`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: request.email })
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: TokenPasswordResetResponse = json.data
    const result: ApiResponse<TokenPasswordResetResponse> = {
      data,
      statusCode: json.statusCode,
      success: json.success,
      is_success: json['is_success']
    }
    return result
  })
}
