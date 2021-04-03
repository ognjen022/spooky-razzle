import { TokenResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'

export const postUpdateToken = (refreshToken: string): Promise<ApiResponse<TokenResponse>> => {
  const body = JSON.stringify({ refresh_token: refreshToken })
  // console.log('postUpdateToken body', body)
  return fetch(
    `${baseUrl}/v1/usersecurity/updatetoken`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: TokenResponse = json.data
    const result: ApiResponse<TokenResponse> = {
      data,
      statusCode: json.statusCode,
      is_success: json.is_success,
      success: json.success
    }

    // console.log('postUpdateToken result', result)
    return result
  })
}
