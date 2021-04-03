import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const postPurchaseEvent = (livestreamEventId: string, card: any): Promise<ApiResponse<any>> => {
  return fetch(
    `${baseUrl}/v1/payments/purchaseevent/${livestreamEventId}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(card)
  }
  ).then(async (response) => {
    let json = await response.json()
    // console.log('postPurchaseEvent response', response)
    // console.log('postPurchaseEvent json', json)
    const data: any = json.data
    const result: ApiResponse<any> = {
      data,
      statusCode: json.statusCode,
      success: json.success,
      is_success: json.is_success
    }
    // console.log('postPurchaseEvent result', result)
    return result
  })
}
