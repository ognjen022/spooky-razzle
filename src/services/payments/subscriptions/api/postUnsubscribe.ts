import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const postUnsubscribe = (): Promise<ApiResponse<string>> => {
  return fetch(
    `${baseUrl}/v1/intents/unsubscribe`, {
    method: 'POST',
    headers: getHeaders(),
  }
  ).then(async (response) => {
    let json = await response.json();

    const data: any = json.data
    const result: ApiResponse<any> = {
      data,
      statusCode: json.statusCode,
      success: json.success,
      is_success: json.is_success
    }
    return result;
  })
}