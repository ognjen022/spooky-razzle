import { ITagsResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { getHeadersNoAuth } from '../../../shared/getHeaders'
import { ApiResponse } from '../../../shared/ApiResponse'

export const getTags = (): Promise<ApiResponse<ITagsResponse>> => {
  return fetch(
    `${baseUrl}/v1/tags/gettags`, {
    method: 'GET',
    headers: getHeadersNoAuth()
  }
  ).then(async (response) => {
    let json = await response.json()
    const jsonData: any = json.data
    const data: ITagsResponse = {
      tree: jsonData,
      error: '',
      errorDescription: ''
    }
    return { success: json.success, statusCode: json.statusCode, data, is_success: json.success }
  })
}
