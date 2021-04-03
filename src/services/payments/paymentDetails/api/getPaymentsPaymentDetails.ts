import { PaymentDetailsRequest, PaymentDetailsResponse } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const getPaymentsPaymentDetails = (request: PaymentDetailsRequest): Promise<ApiResponse<PaymentDetailsResponse>> => {
  return fetch(`${baseUrl}/v1/customer/subscriptions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      name: request.name,
      number: request.card,
      cvc: request.ccv,
      exp_month: request.expiryMonth,
      exp_year: request.expiryYear,
      address_line1: request.address1,
      address_line2: request.address2,
      address_city: request.city,
      address_zip: request.postCode,
      address_country: request.country
    })
  }).then(async response => {
    let json = await response.json()
    const data: PaymentDetailsResponse = json.data
    const result: ApiResponse<PaymentDetailsResponse> = {
      data: data || (json['message'] && { error: json['message'] || '' }) || null,
      statusCode: json['is_success'] ? 200 : 500,
      success: json['is_success'],
      is_success: json['is_success']
    }
    return result
  })
}
