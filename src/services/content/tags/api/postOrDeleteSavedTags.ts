import { ITagsResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { getHeaders } from '../../../shared/getHeaders'
import { ApiResponse } from '../../../shared/ApiResponse'

export const postOrDeleteSavedTags = (tagId: string, method: string): Promise<ApiResponse<any>> => {
  return fetch(
    `${baseUrl}/v1/tags/saved/${tagId}`, {
    method,
    headers: getHeaders(),
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
