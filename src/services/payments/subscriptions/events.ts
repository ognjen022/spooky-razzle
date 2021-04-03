import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { PurchaseHistory } from './models'
import { ActionType } from 'typesafe-actions'
import { networkErroredEvent } from '../../shared/networkErroredEvent'

export const subscriptionDetailsRequestedEvent = createAction(
  eventTypes.SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_REQUESTED
)

export const subscriptionDetailsReceivedEvent = createAction(eventTypes.SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_RECEIVED, (resolve) => (data: PurchaseHistory[]) =>
  resolve(data)
)

export const subscriptionDetailsErroredEvent = createAction(eventTypes.SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_ERRORED, (resolve) => (error: any) => resolve(error))


export const unsubscribeRequestedEvent = createAction(
  eventTypes.SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_REQUESTED
)
export const unsubscribeReceivedEvent = createAction(
  eventTypes.SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_RECEIVED
)


export const unsubscribeErroredEvent = createAction(
  eventTypes.SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_ERRORED,  (resolve) => (error: any) => resolve(error))


export type SubscriptionDetailsEventTypes = ActionType<
  typeof subscriptionDetailsRequestedEvent | 
  typeof subscriptionDetailsReceivedEvent | 
  typeof subscriptionDetailsErroredEvent | 
  typeof networkErroredEvent |
  typeof unsubscribeRequestedEvent |
  typeof unsubscribeReceivedEvent |
  typeof unsubscribeErroredEvent
>
