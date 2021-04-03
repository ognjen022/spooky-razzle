import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'

// PaymentDetails
import paymentDetailsRequestedEpic from './paymentDetails/epics/paymentDetailsRequestedEpic'
// import passwordReceivedEpic from './paymentDetails/epics/passwordReceivedEpic'
import paymentDetailsReducer from './paymentDetails/paymentsReducer'
import { PaymentsDetailsEventTypes } from './paymentDetails/events'

// Subscriptions
import subscriptionDetailsRequestedEpic from './subscriptions/epics/subscriptionDetailsRequestedEpic'
import unsubscribeReceivedEpic from './subscriptions/epics/unsubscribeReceivedEpic';
// import passwordReceivedEpic from './paymentDetails/epics/passwordReceivedEpic'
import subscriptionsReducer from './subscriptions/subscriptionsReducer'
import { SubscriptionDetailsEventTypes } from './subscriptions/events'


// Purchase
import purchaseTagRequestedEpic from './purchase/epics/purchaseTagRequestedEpic'
import purchaseEventRequestedEpic from './purchase/epics/purchaseEventRequestedEpic'
import purchaseWatchItAllRequestedEpic from './purchase/epics/purchaseWatchItAllRequestedEpic'
import purchaseReducer from './purchase/purchaseReducer'
import promoCodeRequestedEpic from './purchase/epics/promoCodeRequestedEpic'
// import { PurchaseEventTypes } from './purchase/events' // not used

// Products
import productsRequestedEpic from './products/epics/productsRequestedEpic'
import productsReducer from './products/productsReducer'

// Epics
const epics = combineEpics(
  ...paymentDetailsRequestedEpic,
  ...subscriptionDetailsRequestedEpic,
  ...purchaseTagRequestedEpic,
  ...purchaseWatchItAllRequestedEpic,
  ...purchaseEventRequestedEpic,
  ...productsRequestedEpic,
  ...unsubscribeReceivedEpic,
  ...promoCodeRequestedEpic
)

// Reducers
const paymentsReducer = combineReducers({
  paymentDetails: paymentDetailsReducer,
  subscriptions: subscriptionsReducer,
  purchase: purchaseReducer,
  products: productsReducer
})

// Module Interface
interface IPaymentsModule {
  readonly epics: any
  readonly reducer: any
}

// Exports
export type PaymentsEventTypes =
  PaymentsDetailsEventTypes
  | SubscriptionDetailsEventTypes
//| PurchaseEventTypes

export const PaymentsModule: IPaymentsModule = {
  epics: epics,
  reducer: paymentsReducer,
}
