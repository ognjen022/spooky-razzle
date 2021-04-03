import { TokenResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'

export const postUserSecurityLogin = (username: string, password: string): Promise<ApiResponse<TokenResponse>> => {
  return fetch(
    `${baseUrl}/v1/usersecurity/login`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }
  ).then(async (response) => {
    // console.log('postUserSecurityLogin response', response)
    if (response.status === 401) {
      let text = await response.text()
      const result: ApiResponse<TokenResponse> = {
        data: {
          accessToken: undefined,
          expiresIn: 0,
          expiry: undefined,
          idToken: undefined,
          scope: undefined,
          tokenType: undefined,
          error: text || 'Login unsuccessful.',
          errorDescription: text,
          refreshToken: undefined,
          redirectTo: undefined,
        },
        statusCode: response.status,
        success: false,
        is_success: false
      }
      return result
    }

    let json = await response.json()
    // console.log('postUserSecurityLogin json', json)
    const data: TokenResponse = json.data
    const result: ApiResponse<TokenResponse> = {
      data,
      statusCode: json.statusCode,
      success: json.success,
      is_success: json['is_success']
    }
    return result
  })
}
