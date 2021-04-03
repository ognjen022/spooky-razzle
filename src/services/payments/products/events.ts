import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { Product } from './models'
import { ApiResponse } from '../../shared/ApiResponse'

export const paymentsProductsReceivedEvent = createAction(eventTypes.PAYMENTS_PRODUCTS_RECEIVED, (resolve) => (data: ApiResponse<Product[]>) =>
  resolve(data)
)

export const paymentsProductsErroredEvent = createAction(eventTypes.PAYMENTS_PRODUCTS_ERRORED, (resolve) => (error: ApiResponse<Product[]>) =>
  resolve(error)
)
