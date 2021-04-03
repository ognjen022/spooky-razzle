import { INewsMetaDataResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { getHeadersNoAuth } from '../../../shared/getHeaders'
import { ApiResponse } from '../../../shared/ApiResponse'
import { INewsArticle } from '../models'

export const getNews = (): Promise<ApiResponse<INewsMetaDataResponse>> => {
  return fetch(
    `${baseUrl}/v1/tags/getnewsmetadata`, {
    method: 'GET',
    headers: getHeadersNoAuth()
  }
  ).then(async (response) => {
    let json = await response.json()
    const newsMetaData: INewsArticle[] = json.data
    const data: INewsMetaDataResponse = {
      newsMetaData: newsMetaData,
      error: '',
      errorDescription: ''
    }
    return {
      success: json.success,
      statusCode: newsMetaData == null ? 400 : json.statusCode,
      data,
      is_success: json.success
    }
  })
}
