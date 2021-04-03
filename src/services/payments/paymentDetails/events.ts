import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { PaymentDetailsResponse } from './models'
import { ActionType } from 'typesafe-actions'
import { networkErroredEvent } from '../../shared/networkErroredEvent'

export const paymentDetailsRequestedEvent = createAction(
  eventTypes.PAYMENTS_PAYMENT_DETAILS_REQUESTED,
  (resolve) => (name: string, card: string, ccv: string, expiryMonth: string, expiryYear: string, address1: string, address2: string, city: string, postCode: string, country: string) => resolve({
    name,
    card,
    ccv,
    expiryMonth,
    expiryYear,
    address1,
    address2,
    city,
    postCode,
    country
  })
)

export const paymentDetailsReceivedEvent = createAction(eventTypes.PAYMENTS_PAYMENT_DETAILS_RECEIVED, (resolve) => (data: PaymentDetailsResponse) =>
  resolve(data)
)

export const paymentDetailsErroredEvent = createAction(eventTypes.PAYMENTS_PAYMENT_DETAILS_ERRORED, (resolve) => (error: PaymentDetailsResponse) => resolve(error))

export type PaymentsDetailsEventTypes = ActionType<
  typeof paymentDetailsRequestedEvent | typeof paymentDetailsReceivedEvent | typeof paymentDetailsErroredEvent | typeof networkErroredEvent
>
