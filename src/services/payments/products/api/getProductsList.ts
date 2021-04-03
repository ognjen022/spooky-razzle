import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeadersNoAuth } from '../../../shared/getHeaders'
import { Product } from '../models'

export const getProductsList = (): Promise<ApiResponse<Product[]>> => {
  return fetch(
    `${baseUrl}/v1/products/list`, {
    method: 'GET',
    headers: getHeadersNoAuth()
  }
  ).then(async (response) => {
    let json = await response.json()
    // console.log('getProductsList response', response)
    // console.log('getProductsList json', json)
    const data: any = json.body
    const result: ApiResponse<Product[]> = {
      data,
      statusCode: json.statusCode,
      success: json.success,
      is_success: json.is_success
    }
    // console.log('getProductsList result', result)
    return result
  })
}
