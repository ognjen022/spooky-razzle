import { PromoInformation } from './../models';
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const getPromoCode = (promoCode: string, productPrice: number ): Promise<ApiResponse<any>> => {
  return fetch(
    `${baseUrl}/v1/payments/checkPromoCode/${promoCode}/${productPrice}`, {
    method: 'GET',
    headers: getHeaders()
  }
  ).then(async (response) => {
    let json = await response.json()
    
    const data: any = json.body
    const result: ApiResponse<PromoInformation> = {
      data: {
          nextPayment: data.next_payment,
          priceAfter: data.price_after
      },
      statusCode: json.statusCode,
      success: json.success,
      is_success: json.is_success
    }
    console.log(result)
    return result
  })
}
