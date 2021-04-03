import { baseUrl } from '../../../shared/baseUrl'
import { getHeaders } from '../../../shared/getHeaders'
import { ApiResponse } from '../../../shared/ApiResponse'

export const getSavedStreams = (): Promise<ApiResponse<number[]>> => {
  return fetch(
    `${baseUrl}/v1/videostream/saved/`, {
    method: 'GET',
    headers: getHeaders(),
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: number[] = json.data
    return { success: json.success, statusCode: json.statusCode, data, is_success: json.success }
  })
}
