import { SubscriptionDetailsRequest, PurchaseHistory } from '../models'
import { baseUrl } from '../../../shared/baseUrl'
import { ApiResponse } from '../../../shared/ApiResponse'
import { getHeaders } from '../../../shared/getHeaders'

export const getSubscriptionDetails = () => {
  return fetch(
    `${baseUrl}/v1/intents/history`, {
    method: 'GET',
    headers: getHeaders(),
  }
  ).then(async (response) => {
    let json = await response.json()
    return json.body
  }).catch(err => console.log(err))
}