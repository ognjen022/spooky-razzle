import { AccountDetailsRequest, AccountDetailsResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const postUserSecurityAccountDetails = (request: AccountDetailsRequest): Promise<ApiResponse<AccountDetailsResponse>> => {
  return fetch(
    `${baseUrl}/v1/customer/updateinformation`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phone: request.phone,
    })
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: AccountDetailsResponse = json.data
    const result: ApiResponse<AccountDetailsResponse> = {
      data,
      statusCode: json['is_success'] ? 200 : 500,
      success: json.success,
      is_success: json['is_success']
    }
    return result
  })
}
