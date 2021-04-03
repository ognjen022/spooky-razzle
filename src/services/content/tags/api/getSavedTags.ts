import { baseUrl } from '../../../shared/baseUrl'
import { getHeaders } from '../../../shared/getHeaders'
import { ApiResponse } from '../../../shared/ApiResponse'

export const getSavedTags = (): Promise<ApiResponse<string[]>> => {
  return fetch(
    `${baseUrl}/v1/tags/saved/`, {
    method: 'GET',
    headers: getHeaders(),
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: string[] = json.data
    return { success: json.success, statusCode: json.statusCode, data, is_success: json.success }
  })
}
