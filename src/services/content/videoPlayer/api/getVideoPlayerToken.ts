import { baseUrl } from '../../../shared/baseUrl'
import { getHeaders } from '../../../shared/getHeaders'
import { ApiResponse } from '../../../shared/ApiResponse'
import { IVideoTokenResponse } from '../models'

export const getVideoPlayerToken = (scope: string): Promise<ApiResponse<IVideoTokenResponse>> => {
  return fetch(
    `${baseUrl}/v1/videostream/token/${scope}`, {
    method: 'GET',
    headers: getHeaders(),
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: IVideoTokenResponse = json.data
    return { success: json.success, statusCode: json.statusCode, data, is_success: json.success }
  })
}
