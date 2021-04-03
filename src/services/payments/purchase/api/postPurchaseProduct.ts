import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const postPurchaseProduct = (stripeProductId: string, promoCode: string | undefined, card: any): Promise<ApiResponse<any>> => {
  return fetch(
    `${baseUrl}/v1/payments/purchaseproduct/${stripeProductId}/${promoCode}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(card)
  }
  ).then(async (response) => {
    let json = await response.json()
    // ('postPurchaseProduct response', response)
    // console.log('postPurchaseProduct json', json)
    const data: any = json.data
    const result: ApiResponse<any> = {
      data,
      statusCode: json.statusCode,
      success: json.success,
      is_success: json.is_success,
      message: json.message
    }
    // console.log('postPurchaseProduct result', result)
    return result
  })
}
