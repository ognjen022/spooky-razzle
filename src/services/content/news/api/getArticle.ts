import { INewsArticleResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { getHeadersNoAuth } from '../../../shared/getHeaders'
import { ApiResponse } from '../../../shared/ApiResponse'
import { INewsArticle } from '../models'

export const getArticle = (articleName: string): Promise<ApiResponse<INewsArticleResponse>> => {
  return fetch(
    `${baseUrl}/v1/tags/getarticle/${articleName}`, {
    method: 'GET',
    headers: getHeadersNoAuth()
  }
  ).then(async (response) => {
    let json = await response.json()
    const articleData: INewsArticle = json.data
    const data: INewsArticleResponse = {
      newsArticle: articleData,
      error: '',
      errorDescription: ''
    }
    return {
      success: json.success,
      statusCode: articleData == null ? 400 : json.statusCode,
      data,
      is_success: json.success
    }
  })
}
